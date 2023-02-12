import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchResponse } from 'meilisearch';
import { PathConstants } from '../constants';
import { FilterType } from '../model';
import { SwallowEntryService } from '../services/swallow-entry/swallow-entry.service';
import { SwallowEntry } from '../services/swallow-json-parser/swallow-entry';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.scss']
})
export class InterviewsComponent implements OnInit {
  listOfAttributes: any[] = [];

  constructor(private swallowEntryService: SwallowEntryService, private router: Router) {
  }

  ngOnInit(): void {
    this.swallowEntryService.getFacetsMetadata([
      FilterType.Organization
    ]).then((msHits: SearchResponse<SwallowEntry>) => {
      if (msHits.facetDistribution) {
        let listOfAttributes: any = [];
        for (let attribute in msHits.facetDistribution[FilterType.Organization]) {
          listOfAttributes.push({
            key: attribute.toLowerCase().trim(),
            value: attribute
          });
        }

        this.listOfAttributes = listOfAttributes.sort((a: any, b: any) => a.key.localeCompare(b.key));
      }
    }).catch((err) => {
      // TODO: show errors?
      this.listOfAttributes = [];
    });
  }

  onVisitInterviewPage(attribute: string): void {
    this.router.navigate([PathConstants.Interview], { queryParams: { org: attribute } })
  }
}