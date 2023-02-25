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
  recordingAvailable: boolean = false;
  recordingURL!: URL;
  sourceCollectionDescription: any;
  genre: string = "";
  platforms: string = "";
  expansionPanelState: any = {
    people: false,
    date: false,
    typeOfEvent: false,
    location: false,
    platforms: false,
    relatedImages: false,
    relatedWorks: false
  }

  constructor(private route: ActivatedRoute,
    private service: SwallowEntryService,
    public parser: ParserService) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let entryId = params.get('entryId');
      if (entryId != null) {
        this.service.getEntry(entryId).then((entry) => {
          this.loading = false;
          this.entry = entry;
          this.onLoaded();
        }).catch((err) => {
          this.loading = false;
        })
      }
    });
  }

  onLoaded(): void {
    this.genre = this.parser.getGenres(this.entry.Item_Description);
    for (let digital of this.entry.Digital_File_Description) {
      if (digital.content_type == 'Video Recording') {
        this.recordingAvailable = true;
        this.recordingURL = new URL(digital.file_url);
        break;
      }
    }
    this.platforms = this.getLocations();
    // parse source_collection_description to extract twitter and facebook details.

    try {
      this.sourceCollectionDescription = {}
      const source_collection_description = this.entry.collection.source_collection_description.replace(/“/gi, "\"").replace(/”/gi, "\"");
      const valueReg = /\s*\"([^"]+)"/g;
      let valueMatches;
      let lastKey: string = "";
      do {
        valueMatches = valueReg.exec(source_collection_description);
        let match;
        if (valueMatches && valueMatches.length > 1) {
          match = valueMatches[1].trim();
          if (!match.length) {
            continue;
          }
        } else {
          continue;
        }
        if (!lastKey.length) { // ignore key.
          lastKey = match;
          continue;
        }
        this.sourceCollectionDescription[lastKey] = match;
        lastKey = "";
      } while (valueMatches);
      // parse links
      // Twitter: concatenate twitter username with https://twitter.com/ if it doesn't exist. 
      if (this.sourceCollectionDescription.hasOwnProperty("Twitter")) {
        let twitter: string = String(this.sourceCollectionDescription.Twitter);
        if (!twitter.startsWith("http")) {
          twitter = "https://twitter.com/" + twitter;
        }
        this.sourceCollectionDescription.Twitter = twitter;
      }
    } catch (e) {
      // catch JSON parsing exceptions
      console.error(e);
    }
  }

  getLocations(): string {
    const locations: any[] = [];
    for (let location of this.entry.Location) {
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
              locations.push(match);
            }
          }
        } while (matches);
      }
    }
    if (locations.length) {
      let location: string = locations[0];
      for (let i = 1; i < locations.length; i++) {
        location += ", " + locations[i];
      }
      return location;
    }
    return "";
  }

  onOpenVideoURL(): void {
    window.open(this.recordingURL.toString(), "_blank");
  }
}
