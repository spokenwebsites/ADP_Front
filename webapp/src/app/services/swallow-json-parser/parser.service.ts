import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Constants, creator, itemDescription, location, SwallowEntry } from './swallow-entry';


@Injectable({
  providedIn: 'root'
})
export class ParserService {
  constructor(private sanitizer: DomSanitizer) {
  }

  parser(hit: any) {
    if (hit != null && hit["schema"] == Constants.Schema && hit["schema_version"] == Constants.SchemaVersion) {
      let entry: SwallowEntry = Object.assign(new SwallowEntry(), hit);
      entry.partner_institution = hit["partner institution"]
      return entry;
    }
    return null;
  }

  getGenres(itemDescription: itemDescription): string {
    return itemDescription.genre.map(g => g.value).join(", ")
  }

  getRoles(creator: creator): string {
    return creator.role.map(r => r.value).join(", ")
  }

  getMapLink(locations: location[]): (SafeResourceUrl | string) {
    if (locations?.length > 0) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://maps.google.com/maps?q=${locations[0].latitude},${Number(locations[0].longitude)}&hl=es&z=14&amp&output=embed`
      );
    }
    return "";
  }
}
