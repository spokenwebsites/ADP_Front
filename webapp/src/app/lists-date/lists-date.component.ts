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

  MonthNames: string[] = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  constructor(private swallowEntryService: SwallowEntryService, private router: Router) {
  }

  ngOnInit(): void {
    this.swallowEntryService.getFacetsMetadata([
      FilterType.Date
    ]).then((msHits: SearchResponse<SwallowEntry>) => {
      if (msHits.facetDistribution) {
        this.listOfAttributes = {};
        for (let attribute in msHits.facetDistribution[FilterType.Date]) {
          const date = new Date(attribute);
          if (date) {
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
              let mAttr = {
                name: attribute,
                frequency: msHits.facetDistribution[FilterType.Date][attribute]
              }
              this.listOfAttributes[year][month].push(mAttr);
            }
          }
        }
        if (this.listOfYears.length) {
          // sort the list of year
          this.listOfYears = this.listOfYears.sort();

          // select by default the first month of the first year from listOfAttributes.
          for (let year of this.listOfYears) {
            for (let month in this.listOfAttributes[year]) {
              this.selectedYear = year;
              this.selectedMonth = month;
              break;
            }
          }
        }
      }
      this.isLoading = false;
    }).catch((err) => {
      // TODO: show errors?
      this.listOfAttributes = [];
      this.loadError = true;
    });
  }

  onSelectMonth(year: any, month: any): void {
    this.selectedYear = year;
    this.selectedMonth = month;
  }

  onClickAttribute(attribute: string): void {
    this.router.navigate([PathConstants.Dashboard], { queryParams: { filter: attribute, type: FilterType.Date } })
  }
}
