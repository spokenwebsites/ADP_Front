import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import MeiliSearch, { SearchResponse } from 'meilisearch';
import { Observable } from 'rxjs';
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

  searchEntry(query: string, offset: number = 0, limit: number = 20): Promise<SearchResponse<SwallowEntry>> {
    return this.index.search(query, {
      q: query,
      offset: offset,
      limit: limit,
      facets: ['Item_Description.genre', 'Creators.name', 'Location.address', 'Dates.date', 'collection.source_collection']
    });
  }
}
