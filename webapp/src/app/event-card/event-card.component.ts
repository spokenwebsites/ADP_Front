import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PathConstants } from '../constants';
import { ParserService } from '../services/swallow-json-parser/parser.service';
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
  duration: string = "";
  genre: string = "";

  constructor(private router: Router, public parser: ParserService) { }

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
    this.duration = this.getDuration();
    this.genre = this.getGenre();
  }

  onClickMore(): void {
    this.router.navigate([PathConstants.Details, this.entry?.swallow_id])
  }

  onOpenVideoURL(): void {
    window.open(this.recordingURL, "_blank");
  }

  getDuration(): string {
    if (!this.entry) {
      return "";
    }
    const durations = this.entry.Digital_File_Description.map((fileDesc) => {
      return fileDesc.duration;
    }).filter((duration) => {
      return duration && duration.trim().length > 0
    });
    let maxDuration = this.durationToSeconds(durations[0]);
    for (let i = 1; i < durations.length; i++) {
      let duration = this.durationToSeconds(durations[i]);
      if (duration > maxDuration) {
        maxDuration = duration;
      }
    }

    let hours = Math.floor(maxDuration / 3600);
    let minutes = Math.floor((maxDuration % 3600) / 60);
    let seconds = Math.floor(maxDuration % 3600 % 60);

    if (hours > 0) {
      return hours + (hours > 1 ? " hours +" : " hour +");
    } else if (minutes > 0) {
      return minutes + (minutes > 1 ? " minutes +" : " minute +");
    }
    return seconds + (seconds > 1 ? " seconds +" : " second +");
  }

  durationToSeconds(duration: string): number {
    if (!duration || !duration.trim().length) {
      return 0;
    }
    const durationInt = duration.split(":").map((t) => {
      try {
        return Number(t);
      } catch (e) {
        return 0;
      }
    });
    let seconds = durationInt[durationInt.length - 1];
    for (let i = durationInt.length - 2; i >= 0; i--) {
      seconds += durationInt[i] * Math.pow(60, durationInt.length - 1 - i);
    }
    return seconds;
  }

  getGenre(): string {
    if (!this.entry) {
      return "";
    }
    return this.parser.getGenres(this.entry.Item_Description);
  }
}
