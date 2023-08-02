import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchResponse } from 'meilisearch';
import { PathConstants } from '../constants';
import { FilterType } from '../model';
import { SwallowEntryService } from '../services/swallow-entry/swallow-entry.service';
import { SwallowEntry } from '../services/swallow-json-parser/swallow-entry';

@Component({
  selector: 'app-lists-lang',
  templateUrl: './lists-lang.component.html',
  styleUrls: ['./lists-lang.component.scss']
})
export class ListsLangComponent implements OnInit {
  listOfAttributes: any[] = [];

  isLoading = true;
  loadError = false;

  constructor(private swallowEntryService: SwallowEntryService, private router: Router) {
  }

  ngOnInit(): void {
    this.swallowEntryService.getFacetsMetadata([
      FilterType.Language
    ]).then((msHits: SearchResponse<SwallowEntry>) => {
      if (msHits.facetDistribution) {
        for (let attribute in msHits.facetDistribution[FilterType.Language]) {
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
    this.router.navigate([PathConstants.Dashboard], { queryParams: { filter: attribute, type: FilterType.Language } })
  }
}
