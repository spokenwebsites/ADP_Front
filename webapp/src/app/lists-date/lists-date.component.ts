import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchResponse } from 'meilisearch';
import { PathConstants } from '../constants';
import { FilterType } from '../model';
import { SwallowEntryService } from '../services/swallow-entry/swallow-entry.service';
import { SwallowEntry } from '../services/swallow-json-parser/swallow-entry';

@Component({
  selector: 'app-lists-date',
  templateUrl: './lists-date.component.html',
  styleUrls: ['./lists-date.component.scss']
})
export class ListsDateComponent implements OnInit {
  listOfAttributes: { [key: number]: { [key: string]: any[] } } = {};
  categories: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  selectedYear!: number;
  selectedMonth!: string;
  listOfYears: number[] = [];

  isLoading = true;
  loadError = false;

  MonthNames: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  constructor(
    private swallowEntryService: SwallowEntryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.swallowEntryService.getFacetsMetadata([FilterType.Date])
      .then((msHits: SearchResponse<SwallowEntry>) => {

        if (msHits.facetDistribution) {
          // ✅ Support both legacy "Date" and new "Dates.date" facets
          const dateFacet =
            msHits.facetDistribution['Dates.date'] ||
            msHits.facetDistribution[FilterType.Date];

          if (!dateFacet) {
            console.warn('⚠️ No date facet found in Meilisearch facetDistribution');
            this.isLoading = false;
            return;
          }

          this.listOfAttributes = {};

          for (let attribute in dateFacet) {
            const date = new Date(attribute);
            if (!isNaN(date.getTime())) {
              const year = date.getFullYear();
              if (year) {
                if (!this.listOfAttributes[year]) {
                  this.listOfAttributes[year] = {};
                  this.listOfYears.push(year);
                }

                const month = this.MonthNames[date.getMonth()];
                if (!this.listOfAttributes[year][month]) {
                  this.listOfAttributes[year][month] = [];
                }

                this.listOfAttributes[year][month].push({
                  name: attribute,
                  frequency: dateFacet[attribute]
                });
              }
            }
          }

          if (this.listOfYears.length) {
            // ✅ Sort years descending so the newest appear first
            this.listOfYears = this.listOfYears.sort((a, b) => b - a);

            // Select the first available month in the newest year
            for (let year of this.listOfYears) {
              const months = Object.keys(this.listOfAttributes[year]);
              if (months.length > 0) {
                this.selectedYear = year;
                this.selectedMonth = months[0];
                break;
              }
            }
          }
        }

        this.isLoading = false;
      })
      .catch((err) => {
        console.error('Error loading facet metadata:', err);
        this.listOfAttributes = [];
        this.loadError = true;
      });
  }

  onSelectMonth(year: any, month: any): void {
    this.selectedYear = year;
    this.selectedMonth = month;
  }

  onClickAttribute(attribute: string): void {
    this.router.navigate(
      [PathConstants.Dashboard],
      { queryParams: { filter: attribute, type: FilterType.Date } }
    );
  }
}
