import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PathConstants } from '../constants';
import { VideoRecordingContentType } from '../constants/recordings';
import { LanguageIconType } from '../models/languages.model';
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
  durationToDisplay: string = "";
  duration: number = 0;
  genre: string = "";
  LanguageIconType = LanguageIconType;
  languageIconType: any = LanguageIconType.Null;
  isLoading = true;

  constructor(private router: Router, public parser: ParserService) { }

  ngOnInit(): void {
    if (this.entry) {
      for (let digital of this.entry.Digital_File_Description) {
        if (digital.content_type == VideoRecordingContentType) {
          this.recordingAvailable = true;
          this.recordingURL = digital.file_url;
          break;
        }
      }
    }
    this.calculateDuration();
    this.genre = this.getGenre();
    const languages = this.entry?.Item_Description?.language.toLowerCase().trim().split(",");
    if (languages) {
      for (let i = 0; i < languages.length; i++) {
        languages[i] = languages[i].trim();
        if (languages[i] == LanguageIconType.English) {
          languages[i] = LanguageIconType.English;
        } else if (languages[i] == LanguageIconType.French) {
          languages[i] = LanguageIconType.French;
        }
      }
      this.languageIconType = LanguageIconType.Null;
      if (languages.indexOf(LanguageIconType.English) != -1) {
        this.languageIconType = LanguageIconType.English;
      }
      if (languages.indexOf(LanguageIconType.French) != -1) {
        if (this.languageIconType == LanguageIconType.English) {
          this.languageIconType = LanguageIconType.Multi;
        } else {
          this.languageIconType = LanguageIconType.French;
        }
      }
    }
  }

  getPersistentURL(): string {
    const url = this.entry?.Institution_and_Collection?.persistent_URL;
    return url ? url.trim() : '';
  }

  onClickMore(): void {
    this.router.navigate([PathConstants.Details, this.entry?.swallow_id])
  }

  onOpenVideoURL(): void {
    if (!this.recordingURL) return;
    window.open(this.recordingURL, "_blank");
  }

  calculateDuration(): void {
    if (!this.entry) {
      return;
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

    this.durationToDisplay = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`

    this.duration = maxDuration;
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

  onCreatorLinkClick(creatorName: string): void {
    this.router.navigate([PathConstants.Dashboard], { queryParams: { q: creatorName } })
  }
}
