import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchResponse } from 'meilisearch';
import { PathConstants } from '../constants';
import { FilterType } from '../model';
import { SwallowEntryService } from '../services/swallow-entry/swallow-entry.service';
import { SwallowEntry } from '../services/swallow-json-parser/swallow-entry';

@Component({
  selector: 'app-lists-people',
  templateUrl: './lists-people.component.html',
  styleUrls: ['./lists-people.component.scss']
})
export class ListsPeopleComponent implements OnInit {
  listOfAttributes: any = {};
  categories: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  selectedCategory: string;

  constructor(private swallowEntryService: SwallowEntryService, private router: Router) {
    this.selectedCategory = this.categories[0];
  }

  ngOnInit(): void {
    this.swallowEntryService.getFacetsMetadata([
      FilterType.People
    ]).then((msHits: SearchResponse<SwallowEntry>) => {
      if (msHits.facetDistribution) {
        this.listOfAttributes = {};
        for (let attribute in msHits.facetDistribution[FilterType.People]) {
          if (!this.listOfAttributes[attribute[0].toUpperCase()]) {
            this.listOfAttributes[attribute[0].toUpperCase()] = [];
          }
          let mAttr = {
            name: attribute,
            frequency: msHits.facetDistribution[FilterType.People][attribute]
          }
          this.listOfAttributes[attribute[0].toUpperCase()].push(mAttr);
        }
      }
    }).catch((err) => {
      // TODO: show errors?
      this.listOfAttributes = [];
    });
  }

  onSelectCategory(category: string): void {
    this.selectedCategory = category;
  }

  onClickAttribute(attribute: string): void {
    this.router.navigate([PathConstants.Dashboard], { queryParams: { filter: attribute, type: FilterType.People } })
  }
}
