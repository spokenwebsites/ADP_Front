import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
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
  listOfAttributes: string[] = [];
  typeOfListsPage: FilterType = FilterType.NULL;
  FilterType = FilterType;
  FilterTypeObject = {
    [FilterType.NULL]: {
      title: "",
    },
    [FilterType.TypeOfEvent]: {
      title: "Type of Event"
    },
    [FilterType.People]: {
      title: "People"
    },
    [FilterType.Date]: {
      title: "Date"
    },
    [FilterType.Place]: {
      title: "Places"
    },
    [FilterType.Organization]: {
      title: "Organizers"
    }
  }

  constructor(private swallowEntryService: SwallowEntryService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        switch (event.url.substring(1)) {
          case PathConstants.TypeOfEvents:
            this.typeOfListsPage = FilterType.TypeOfEvent;
            break;
          case PathConstants.Organizers:
            this.typeOfListsPage = FilterType.Organization;
            break;
          case PathConstants.Places:
            this.typeOfListsPage = FilterType.Place;
            break;
          default:
            this.typeOfListsPage = FilterType.NULL;
            break;
        }
      }
    });
  }

  ngOnInit(): void {
    if (this.typeOfListsPage != FilterType.NULL) {
      this.swallowEntryService.getFacetsMetadata([
        this.typeOfListsPage
      ]).then((msHits: SearchResponse<SwallowEntry>) => {
        if (msHits.facetDistribution) {
          this.listOfAttributes = [];
          for (let attribute in msHits.facetDistribution[this.typeOfListsPage]) {
            this.listOfAttributes.push(attribute);
          }
        }
      }).catch((err) => {
        // TODO: show errors?
        this.listOfAttributes = [];
      });
    }
  }

  onClickAttribute(attribute: string): void {
    this.router.navigate([PathConstants.Dashboard], { queryParams: { filter: attribute, type: this.typeOfListsPage } })
  }
}
