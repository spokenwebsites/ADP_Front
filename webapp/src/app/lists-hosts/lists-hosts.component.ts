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

  constructor(private swallowEntryService: SwallowEntryService, private router: Router) {
  }

  ngOnInit(): void {
    this.swallowEntryService.getAttributes([
      FilterType.HostingPlatform
    ]).then((msHits: SearchResponse<SwallowEntry>) => {
      for (let hit of msHits.hits) {
        if (!hit.Location) {
          continue;
        }
        for (let location of hit.Location) {
          // const re = new RegExp('.*Online platform.*"(.*?)"');
          // const matches = re.exec(location.notes);
          // if (matches && matches.length > 1 ) {
          let startingOfPlatforms = location.notes.indexOf(":");
          let platforms = location.notes.substring(startingOfPlatforms + 1).trim();
          if (platforms) {
            const re = /\s*\"([^"]+)"/g;
            // console.log("notes", location.notes);
            let matches;
            do {
              matches = re.exec(platforms);
              if (matches && matches.length > 1) {
                let match = matches[1].trim();
                if (match.length) {
                  // console.log("matches", matches[1]);
                  this.listOfAttributes[match] = true;
                }
              }
            } while (matches);
          }
        }
      }
    }).catch((err) => {
      // TODO: show errors?
      this.listOfAttributes = {};
    });
  }

  onClickAttribute(attribute: string): void {
    this.router.navigate([PathConstants.Dashboard], { queryParams: { filter: attribute, type: FilterType.HostingPlatform } })
  }
}
