import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchResponse } from 'meilisearch';
import { PathConstants } from '../constants';
import { FilterType } from '../model';
import { InterviewService } from '../services/interview-service/interview.service';
import { Orgnization } from '../services/interview-service/interview.model';
import { SwallowEntryService } from '../services/swallow-entry/swallow-entry.service';
import { SwallowEntry } from '../services/swallow-json-parser/swallow-entry';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.scss']
})
export class InterviewsComponent implements OnInit {
  organizations: any[] = [];

  constructor(private interviewService: InterviewService, private router: Router) {
  }

  ngOnInit(): void {
    this.interviewService.getOrganizations().subscribe((organizations: Orgnization[]) => {
      this.organizations = organizations;
    }, (error) => {
    })
  }

  onVisitInterviewPage(attribute: string): void {
    this.router.navigate([PathConstants.Interview], { queryParams: { org: attribute } })
  }
}