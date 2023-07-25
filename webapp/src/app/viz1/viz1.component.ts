import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';
import { PathConstants } from '../constants';
import { FilterType } from '../model';

declare function get_condegram_json(json: any, onCLick: Function): any;

@Component({
  selector: 'app-viz1',
  templateUrl: './viz1.component.html',
  styleUrls: ['./viz1.component.css']
})
export class Viz1Component implements OnInit {

  isLoading = true;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.http.get<any>('assets/js/Spiralcondegram_final.json')
      .subscribe(
        data => {
          const onClick = this.onClick.bind(this);
          get_condegram_json(data, onClick);
          console.log('LOADED JSON DATA');
          this.isLoading = false;
        },
        error => {
        }
      );

    this.loadJsFile("https://cdnjs.cloudflare.com/ajax/libs/d3/7.3.0/d3.min.js");
    this.loadJsFile("https://d3js.org/d3.v4.js")
    this.loadJsFile("assets/js/Condegram_main.js");
  }

  public loadJsFile(url: string) {

    this.isLoading = true;

    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';

    // Add an event listener for the script's load event
    node.onload = () => {
      this.isLoading = false;
      console.log("LOADED: "+url);
    };

    document.getElementsByTagName('body')[0].appendChild(node);
  }

  onClick(dateStr: any): void {
    let date = new Date(dateStr);
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    let d = `${date.getFullYear()}-${month}-${day}`;
    this.router.navigate([PathConstants.Dashboard], { queryParams: { filter: d, type: FilterType.Date }, relativeTo: this.route });
 }
}
