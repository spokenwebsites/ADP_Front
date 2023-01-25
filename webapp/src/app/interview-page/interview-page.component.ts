import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

const OrgToContentCache: { [key: string]: string } = {
  "Metatron Press": "assets/metatron-press.html"
}

@Component({
  selector: 'app-interview-page',
  templateUrl: './interview-page.component.html',
  styleUrls: ['./interview-page.component.scss']
})
export class InterviewPageComponent implements OnInit {
  org!: string;
  content: any = {};

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      // extract org from the URL
      this.org = String(params.org).trim();
      if (this.org && OrgToContentCache[this.org]) {
        this.http.get(OrgToContentCache[this.org], { responseType: 'text' }).subscribe((res) => {
          this.content = res;
        });
      }
    },
      (err) => {
        // TODO: show errors?
      })
  }
}