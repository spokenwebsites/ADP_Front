import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PathConstants } from '../constants';
import { SwallowEntry } from '../services/swallow-json-parser/swallow-entry';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  recordingAvailable: boolean = false;
  recordingURL!: string;
  @Input() entry!: SwallowEntry | null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.entry) {
      for (let digital of this.entry.Digital_File_Description) {
        if (digital.content_type == 'Video Recording') {
          this.recordingAvailable = true;
          this.recordingURL = digital.file_url;
          break;
        }
      }
    }
  }

  onClickMore(): void {
    this.router.navigate([PathConstants.Details, this.entry?.swallow_id])
  }

  onOpenVideoURL(): void {
    window.open(this.recordingURL, "_blank");
  }
}
