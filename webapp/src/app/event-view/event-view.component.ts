import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute,
    private service: SwallowEntryService,
    public parser: ParserService) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let entryId = params.get('entryId');
      if (entryId != null) {
        this.service.getEntry(entryId).toPromise().then((entry) => {
          this.loading = false;
          this.entry = entry;
          console.log("entry", entry);
        }).catch((err) => {
          this.loading = false;
        })
      }
    });
  }
}
