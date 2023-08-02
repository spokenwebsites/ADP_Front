import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchResponse } from 'meilisearch';
import { PathConstants } from '../constants';
import { FilterType } from '../model';
import { SwallowEntryService } from '../services/swallow-entry/swallow-entry.service';
import { SwallowEntry } from '../services/swallow-json-parser/swallow-entry';

@Component({
  selector: 'app-lists-events',
  templateUrl: './lists-events.component.html',
  styleUrls: ['./lists-events.component.scss']
})
export class ListsEventsComponent implements OnInit {
  // listOfAttributes: { [key: string]: boolean } = {};
  listOfAttributes: string[] = [];

  isLoading = true;
  loadError = false;

  constructor(private swallowEntryService: SwallowEntryService, private router: Router) {
  }

  ngOnInit(): void {
    this.swallowEntryService.getFacetsMetadata([
      FilterType.TypeOfEvent
    ]).then((msHits: SearchResponse<SwallowEntry>) => {
      if (msHits.facetDistribution) {
        this.listOfAttributes = [];
        for (let attribute in msHits.facetDistribution[FilterType.TypeOfEvent]) {
          if (attribute.trim() == "-1") {
            continue;
          }
          this.listOfAttributes.push(attribute);
        }
      }
      this.isLoading = false;
    }).catch((err) => {
      // TODO: show errors?
      this.listOfAttributes = [];
      this.loadError = true;
    });
  }

  onClickAttribute(attribute: string): void {
    this.router.navigate([PathConstants.Dashboard], { queryParams: { filter: attribute, type: FilterType.TypeOfEvent } })
  }
}
