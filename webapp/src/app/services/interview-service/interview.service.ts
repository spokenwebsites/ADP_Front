import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InterviewPage, Orgnization } from './interview.model';
@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  constructor(private http: HttpClient) { }

  getOrganizations() {
    return this.http.get<Orgnization[]>('/api', { params: { action: "getOrganizations" } });
  }

  getInterview(organizationID: string) {
    return this.http.get<InterviewPage[]>('/api', { params: { action: "getInterview", organizationID: organizationID } });
  }
}
