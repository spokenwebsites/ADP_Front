import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FilterType } from '../model';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Input() opened!: boolean;
  @Input() facetDistribution: any;
  @Output() sidenavToggle: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any[]> = new EventEmitter();
  public FilterType = FilterType;
  @ViewChild('sidenav') public sidenav!: MatSidenav;

  constructor() {

  }
  ngOnInit() {
  }

  printable(obj: { name: any, frequency: any }): string {
    return `${obj.name} (${obj.frequency})`
  }

  handleChange(filter: FilterType) {
    let selectedAttributes: any[] = this.facetDistribution[filter].filter((attribute: any) => attribute.selected);
    let selectedObj: any = {};
    for (let attribute of selectedAttributes) {
      selectedObj[attribute.name] = true;
    }
    this.change.emit([filter, selectedObj]);
  }

  onClose(): void {
    if (this.sidenav) {
      this.sidenav.close();
      this.sidenavToggle.emit(false);
    }
  }
}