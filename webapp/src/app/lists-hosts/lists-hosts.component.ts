import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchResponse } from 'meilisearch';
import { PathConstants } from '../constants';
import { FilterType } from '../model';
import { SwallowEntryService } from '../services/swallow-entry/swallow-entry.service';
import { SwallowEntry } from '../services/swallow-json-parser/swallow-entry';

@Component({
  selector: 'app-lists-hosts',
  templateUrl: './lists-hosts.component.html',
  styleUrls: ['./lists-hosts.component.scss']
})
export class ListsHostsComponent implements OnInit {
  listOfAttributes: { [key: string]: boolean } = {};
  isLoading = true;
  loadError = false;
  constructor(private swallowEntryService: SwallowEntryService, private router: Router) {
  }

  ngOnInit(): void {
    this.swallowEntryService.getAttributes([
      FilterType.HostingPlatform,
    ]).then((msHits: SearchResponse<SwallowEntry>) => {
      for (let hit of msHits.hits) {
        if (hit.Location && hit.Location.length > 0) {
          for (let location of hit.Location) {
            if (location.hosting_platform && location.hosting_platform.length) {
              for (let platform of location.hosting_platform) {
                const hostingPlatform = String(platform).trim();
                if (hostingPlatform.length > 0) {
                  this.listOfAttributes[hostingPlatform] = true;
                }
              }
            }
          }
        }
      }
      this.isLoading = false;
    }).catch((err) => {
      // TODO: show errors?
      this.listOfAttributes = {};
      this.loadError = true;
    });
  }

  onClickAttribute(attribute: string): void {
    this.router.navigate([PathConstants.Dashboard], { queryParams: { filter: attribute, type: FilterType.HostingPlatform } })
  }
}
