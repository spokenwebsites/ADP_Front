import { Component, OnInit } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { PathConstants } from '../constants';
import { FilterType } from '../model';
// import { stat } from 'fs';

declare function get_edge_bund_json(json: any, onClick: Function): any;

interface RootObject {
  name: string;
  type: string;
  imports: string[];
}

@Component({
  selector: 'app-viz2',
  templateUrl: './viz2.component.html',
  styleUrls: ['./viz2.component.css']
})



export class Viz2Component implements OnInit {
  public events: Array<object> = [];
  constructor(private http: HttpClient, private router: Router) {
    this.http.get<any>('assets/js/Topten.json')
      .subscribe(
        data => {
          const onClick = this.onClick.bind(this);
          get_edge_bund_json(data, onClick);
        },
        error => {
          console.log(error);
        }
      );
  }

  ngOnInit(): void {
    this.loadJsFile("https://cdnjs.cloudflare.com/ajax/libs/d3/7.3.0/d3.min.js");
    this.loadJsFile("https://d3js.org/d3.v4.js")
    this.loadJsFile("assets/js/d3.min.js");
    this.loadJsFile("assets/js/d3.v4.js")

    //this.loadJsFile("assets/js/Topten.json")
    //  console.log(this.Events)
  }

  public loadJsFile(url: string) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  onClick(creator: string): void {
    this.router.navigate([PathConstants.Dashboard], { queryParams: { q: creator } })
  }
}
