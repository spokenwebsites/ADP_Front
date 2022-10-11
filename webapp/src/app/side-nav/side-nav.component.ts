import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Input() opened!: boolean;
  @Input() facetDistribution: any;

  constructor() {
  }
  ngOnInit() {
  }

  printable(obj: {key: any, value: any}): string {
    return `${obj.key} (${obj.value})`
  }
  
  printableList(obj: any[]): string {
    return `${obj[0]} (${obj[1]})`
  }
}