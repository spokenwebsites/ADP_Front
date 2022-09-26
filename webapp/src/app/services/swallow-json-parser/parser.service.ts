import { Injectable } from '@angular/core';
import { Constants, SwallowEntry } from './swallow-entry';


@Injectable({
  providedIn: 'root'
})
export class ParserService {
  constructor() {
  }

  parser(hit: any) {
    if (hit != null && hit["schema"] == Constants.Schema && hit["schema_version"] == Constants.SchemaVersion) {
      let entry: SwallowEntry = Object.assign(new SwallowEntry(), hit);
      entry.partner_institution = hit["partner institution"]
      return entry;
    }
    return null;
  }
}
