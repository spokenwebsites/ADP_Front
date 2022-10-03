import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SwallowEntry } from '../swallow-json-parser/swallow-entry';

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
}
