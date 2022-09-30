import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SwallowEntry } from '../swallow-json-parser/swallow-entry';
import { MSHits, MSSearchHits } from './ms';

@Injectable({
  providedIn: 'root'
})
export class SwallowEntryService {

  private searchUrl: string = environment.searchUrl;
  private EntryIndex: string = environment.EntryIndex;

  constructor(private http: HttpClient) { }

  getEntry(document_id: string): Observable<SwallowEntry> {
    return this.http.get<SwallowEntry>(this.searchUrl + `/indexes/${this.EntryIndex}/documents/${document_id}`);
  }

  searchEntry(query: string, offset: number = 0, limit: number = 20): Observable<MSSearchHits<SwallowEntry>> {
    return this.http.post<MSSearchHits<SwallowEntry>>(this.searchUrl + `/indexes/${this.EntryIndex}/search`, { q: query, offset: offset, limit: limit });
  }

  getEntries(offset: number, limit: number): Observable<MSHits<SwallowEntry>> {
    // Setup query parameters
    const params = new HttpParams().set('offset', offset + "").set('limit', limit + "");
    return this.http.get<MSHits<SwallowEntry>>(this.searchUrl + `/indexes/${this.EntryIndex}/documents`, { params: params });
  }
}
