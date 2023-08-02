import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InterviewPage } from '../services/interview-service/interview.model';
import { InterviewService } from '../services/interview-service/interview.service';

@Component({
  selector: 'app-interview-page',
  templateUrl: './interview-page.component.html',
  styleUrls: ['./interview-page.component.scss']
})
export class InterviewPageComponent implements OnInit {
  content: any = {};
  isLoading: boolean = true;
  errorLoading: boolean = false;

  constructor(private route: ActivatedRoute,
    private interviewService: InterviewService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      // extract org from the URL
      let org = String(params.org).trim();
      if (org) {
        this.isLoading = true;
        this.interviewService.getInterview(org).subscribe((interviewPage: InterviewPage[]) => {
          if (interviewPage.length > 0) {
            this.content = interviewPage[0];
          }
          this.isLoading = false;
        }, (error) => {
          this.isLoading = false;
          this.errorLoading = true;
        });
      }
    }, (err) => {
      this.isLoading = false;
      this.errorLoading = true;
    })
  }

  onBack(): void {
    window.history.back();
  }
}
