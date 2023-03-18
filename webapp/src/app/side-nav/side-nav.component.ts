import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { VideoRecordingContentType } from '../constants/recordings';
import { FilterType } from '../model';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnChanges {
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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.facetDistribution) {
      this.onCheckClearVisibility();
    }
  }

  printable(obj: { name: any, frequency: any }): string {
    return `${obj.name} (${obj.frequency})`
  }

  handleChange(filter: FilterType) {
    if (!filter) return;
    let selectedAttributes: any[] = this.facetDistribution[filter.toString()].filter((attribute: any) => attribute.selected);
    let selectedObj: any = {};
    for (let attribute of selectedAttributes) {
      selectedObj[attribute.name] = true;
    }
    // check visibility of clear button.
    if (selectedAttributes.length > 0) {
      this.clearVisibility = true;
    } else {
      this.onCheckClearVisibility();
    }
    this.change.emit([filter, selectedObj]);
  }

  onCheckClearVisibility() {
    this.clearVisibility = Object.keys(this.facetDistribution).filter((filter) => {
      return this.facetDistribution[filter].filter((attribute: any) => attribute.selected).length > 0;
    }).length > 0;
  }

  handleRecordingsChange() {
    let selectedAttributes: any[] = this.facetDistribution[FilterType.Recordings.toString()].filter((attribute: any) => attribute.selected);
    let selectedObj: any = {}; // in case of: both recording options selected or neither of the recording options not selected
    if (selectedAttributes.length == 1) {
      if (selectedAttributes[0].value) {
        selectedObj[1] = true; // with recording option selected
      } else {
        selectedObj[0] = true;  // without recording option selected
      }
    }
    this.change.emit([FilterType.IsRecordingAvailable, selectedObj]);
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