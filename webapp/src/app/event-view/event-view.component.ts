import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoRecordingContentType } from '../constants/recordings';
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
  errorLoading: boolean = false;
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
          this.errorLoading = true;
        })
      }
    });
  }

  onLoaded(): void {
    this.genre = this.parser.getGenres(this.entry.Item_Description);
    for (let digital of this.entry.Digital_File_Description) {
      if (digital.content_type == VideoRecordingContentType) {
        this.recordingAvailable = true;
        this.recordingURL = new URL(digital.file_url);
        break;
      }
    }
    this.platforms = this.getOnlinePlatforms();
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

  getPersistentURL(): string {
    const url = this.entry?.Institution_and_Collection?.persistent_URL;
    return url ? url.trim() : '';
  }

getPhysicalLocations(): string[] {
  const locations: string[] = [];

  for (const loc of this.entry.Location || []) {
    if (!loc) continue;

    const city = loc.city?.trim();
    const address = loc.address?.trim();

    // Skip completely empty or URL-only addresses
    if (!address && !city) continue;
    if (address && /^https?:\/\//i.test(address)) continue;

    // Always show address first; add city in parentheses if present
    let combined = '';
    if (address && city) {
      combined = `${address} (city: ${city})`;
    } else if (address) {
      combined = address;
    } else if (city) {
      combined = `(city: ${city})`;
    }

    if (combined && !locations.includes(combined)) {
      locations.push(combined);
    }
  }

  return locations;
}


getOnlinePlatforms(): string {
  const platforms: string[] = [];

  for (const loc of this.entry.Location || []) {
    const notes = loc.notes?.trim();
    if (!notes) continue;

    // Only handle entries that mention "Online platform"
    if (notes.toLowerCase().includes('online platform')) {
      // Take text after the first colon, if any
      const parts = notes.split(':');
      const value = parts.length > 1 ? parts.slice(1).join(':').trim() : notes;

      // Remove all double quotes and leading/trailing spaces
      const cleaned = value.replace(/"/g, '').trim();

      // ✅ Skip useless entries like "Online platform" with no value
      if (!cleaned || cleaned.toLowerCase() === 'online platform') continue;

      if (cleaned) platforms.push(cleaned);
    }
  }

  // Remove duplicates
  const unique = Array.from(new Set(platforms));

  // Combine into one readable line
  return unique.join(' | ');
}

hasCoordinates(entry: any): boolean {
  if (!entry || !entry.Location) return false;

  // Ensure at least one location has valid coordinates
  return entry.Location.some((loc: any) =>
    loc.latitude && loc.longitude &&
    loc.latitude.trim() !== '' && loc.longitude.trim() !== ''
  );
}

  onOpenVideoURL(): void {
    window.open(this.recordingURL.toString(), "_blank");
  }
}
