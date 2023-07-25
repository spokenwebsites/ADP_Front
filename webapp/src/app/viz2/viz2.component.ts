import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { PathConstants } from '../constants';

declare function get_edge_bund_json(json: any, onClick: Function): any;
declare const EDGE_BOUNDING_SVG_DIAMETER: number;
@Component({
  selector: 'app-viz2',
  templateUrl: './viz2.component.html',
  styleUrls: ['./viz2.component.css']
})
export class Viz2Component implements OnInit {

  isLoading = true;

  @ViewChild('container') container!: ElementRef;

  public events: Array<object> = [];
  constructor(private http: HttpClient, private router: Router) {
    this.http.get<any>('assets/js/Topten.json')
      .subscribe(
        data => {
          get_edge_bund_json(data,  this.onClick.bind(this));
          setTimeout(()=>{
            // try to focus scrollbar on the center of SVG.
            this.container.nativeElement.scrollTo(EDGE_BOUNDING_SVG_DIAMETER / 2, EDGE_BOUNDING_SVG_DIAMETER / 2);
          });
          this.isLoading = false;
        },
        error => {
        }
      );
  }

  ngOnInit(): void {
  }

  onClick(creator: string, organization: string): void {
    this.router.navigate([PathConstants.Dashboard], { queryParams: { q: creator, org: organization } })
  }
}
