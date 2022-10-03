import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SwallowEntry } from '../services/swallow-json-parser/swallow-entry';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {

  @Input() entry!: SwallowEntry | null;

  constructor() { }

  ngOnInit(): void {
  }

}
