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
  @Input() facetDistribution: { [key: string]: any[] } = {};
  @Output() sidenavToggle: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any[]> = new EventEmitter();
  @Output() clear: EventEmitter<any[]> = new EventEmitter();
  clearVisibility: boolean = false;
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
    let selectedAttributes: any[] = this.facetDistribution[filter.toString()].filter((attribute: any) => attribute.selected);
    let selectedObj: any = {};
    for (let attribute of selectedAttributes) {
      selectedObj[attribute.name] = true;
    }
    // check visibility of clear button.
    if (selectedAttributes.length > 0) {
      this.clearVisibility = true;
    } else {
      this.clearVisibility = Object.keys(this.facetDistribution).filter((filter) => {
        return this.facetDistribution[filter].filter((attribute: any) => attribute.selected).length > 0;
      }).length > 0;
    }
    this.change.emit([filter, selectedObj]);
  }

  onClear(): void {
    this.clearVisibility = false;
    if (this.clear) {
      const filters = Object.keys(this.facetDistribution);
      filters.forEach((filter) => {
        this.facetDistribution[filter].forEach((attribute: any) => {
          attribute.selected = false;
        });
      });

      this.clear.emit();
    }
  }

  onClose(): void {
    if (this.sidenav) {
      this.sidenav.close();
      this.sidenavToggle.emit(false);
    }
  }
}