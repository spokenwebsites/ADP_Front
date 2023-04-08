import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InterviewPage, Orgnization } from './interview.model';
@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  constructor(private http: HttpClient) { }

  getOrganizations() {
    return this.http.get<Orgnization[]>(environment.InterviewEndpoint, { params: { action: "getOrganizations" } });
  }

  getInterview(organizationID: string) {
    return this.http.get<InterviewPage[]>(environment.InterviewEndpoint, { params: { action: "getInterview", organizationID: organizationID } });
  }
}
