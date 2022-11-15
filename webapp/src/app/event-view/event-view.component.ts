import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterType } from '../model';
import { SwallowEntryService } from '../services/swallow-entry/swallow-entry.service';
import { ParserService } from '../services/swallow-json-parser/parser.service';
import { SwallowEntry } from '../services/swallow-json-parser/swallow-entry';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {
  loading: boolean = false;
  entry!: SwallowEntry;
  locations: string[] = [];
  recordingAvailable: boolean = false;
  recordingURL!: URL;

  constructor(private route: ActivatedRoute,
    private service: SwallowEntryService,
    public parser: ParserService) {
    this.loading = true;
  }

  ngOnInit(): void {
    // VideoURL = "Digital_File_Description.file_url"
    // let urls: any[] = [];
    // this.service.getAttributes([FilterType.VideoURL]).then((records) => {
    //   console.log("records", records)
    //   records.hits.forEach((record) => {
    //     if (record.Digital_File_Description) {

    //       record.Digital_File_Description.forEach((digitalFile) => {
    //         if (digitalFile.file_url)
    //           urls.push(digitalFile.file_url);
    //       })
    //     }
    //   });
    //   console.log("urls", urls);
    // })
    this.route.paramMap.subscribe(params => {
      let entryId = params.get('entryId');
      if (entryId != null) {
        this.service.getEntry(entryId).then((entry) => {
          this.loading = false;
          this.entry = entry;
          for (let digital of this.entry.Digital_File_Description) {
            if (digital.content_type == 'Video Recording') {
              this.recordingAvailable = true;
              this.recordingURL = new URL(digital.file_url);
              break;
            }
          }
          this.locations = [];
          for (let location of entry.Location) {
            let startingOfPlatforms = location.notes.indexOf(":");
            let platforms = location.notes.substring(startingOfPlatforms + 1).trim();
            if (platforms) {
              const re = /\s*\"([^"]+)"/g;
              let matches;
              do {
                matches = re.exec(platforms);
                if (matches && matches.length > 1) {
                  let match = matches[1].trim();
                  if (match.length) {
                    this.locations.push(match);
                  }
                }
              } while (matches);
            }
          }
        }).catch((err) => {
          this.loading = false;
        })
      }
    });
  }

  getLocations(): string {
    if (this.locations.length) {
      let locations = this.locations[0];
      for (let i = 1; i < this.locations.length; i++) {
        locations += ", " + this.locations[i];
      }
      return locations;
    }
    return "";
  }

  onOpenVideoURL(): void {
    window.open(this.recordingURL.toString(), "_blank");
  }
}
