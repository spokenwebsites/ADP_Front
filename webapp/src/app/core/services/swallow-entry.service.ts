import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SwallowEntry } from '../models/swallow-entry';


@Injectable({
  providedIn: 'root'
})
export class SwallowEntryService {
  private eventsPath = 'swallow-entry';

  constructor(private http: HttpClient) { }

  getEvents(){
    return this.http.get<SwallowEntry[]>(environment.apiUrl+this.eventsPath);
  }
}
