import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import MeiliSearch, { SearchResponse } from 'meilisearch';
import { Observable } from 'rxjs';
import { FilterType } from 'src/app/model';
import { environment } from 'src/environments/environment';
import { SwallowEntry } from '../swallow-json-parser/swallow-entry';
import { MSHits, MSSearchHits } from './ms';

const client = new MeiliSearch({
  host: environment.searchUrl,
})

@Injectable({
  providedIn: 'root'
})
export class SwallowEntryService {
  private EntryIndexUID: string = environment.EntryIndex;
  private index: any;

  constructor() {
    this.index = client.index(this.EntryIndexUID)
  }

  getEntry(document_id: string): Promise<SwallowEntry> {
    return this.index.getDocument(document_id);
  }

  searchEntry(query: string, offset: number = 0, limit: number = 20, filterAttributes: any): Promise<SearchResponse<SwallowEntry>> {
    let filter = "";
    let i = 0;
    for (let filterAttribute in filterAttributes) {
      if (i != 0) {
        filter += "AND";
      }
      let subQuery = "";
      let j = 0;
      for (let value in filterAttributes[filterAttribute]) {
        if (j != 0) {
          subQuery += " OR "
        }
        subQuery += `${filterAttribute} = \"${value}\"`;
        j++;
      }
      filter += subQuery;
      i++;
    }
    const params = {
      q: query,
      offset: offset,
      limit: limit,
      facets: [
        FilterType.Organization,
        FilterType.Date,
        FilterType.People,
        FilterType.Place,
        FilterType.TypeOfEvent
      ],
      filter: filter,
    };
    return this.index.search(query, params);
  }
}