import { Injectable } from '@angular/core';
import MeiliSearch, { SearchResponse } from 'meilisearch';
import { FilterType } from 'src/app/model';
import { environment } from 'src/environments/environment';
import { SwallowEntry } from '../swallow-json-parser/swallow-entry';

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

  searchEntry(query: string, offset: number = 0, limit: number = 20, filterAttributes: any, facets: FilterType[]): Promise<SearchResponse<SwallowEntry>> {
    let filter = "";
    let i = 0;
    for (let filterAttribute in filterAttributes) {
      if (i != 0) {
        filter += " AND ";
      }
      let subQuery = "";
      let j = 0;
      for (let value in filterAttributes[filterAttribute]) {
        if (j != 0) {
          subQuery += " OR "
        }
        if (filterAttributes[filterAttribute][value]) {
          subQuery += ` ${filterAttribute} = \"${value}\" `;
        } else {
          subQuery += ` NOT ${filterAttribute} = \"${value}\" `;
        }
        j++;
      }

      filter += subQuery;
      i++;
    }
    const params = {
      q: query,
      offset: offset,
      limit: limit,
      facets: facets,
      filter: filter,
    };
    return this.index.search(query, params);
  }

  // Efficient way to get the metadata of the particular facet.
  getFacetsMetadata(facets: FilterType[]): Promise<SearchResponse<SwallowEntry>> {
    const params = {
      offset: 0,
      limit: 0,
      facets: facets
    };
    return this.index.search("", params);
  }

  // Efficient way to get the metadata of the particular facet.
  getAttributes(attributes: FilterType[]): Promise<SearchResponse<SwallowEntry>> {
    const params = {
      attributesToRetrieve: attributes,
      limit: 20000 /* Better approach? */
    };
    return this.index.search("", params);
  }
}