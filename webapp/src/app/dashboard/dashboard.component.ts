import { Component, OnInit } from '@angular/core';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { environment } from 'src/environments/environment'
import { ParserService } from '../services/swallow-json-parser/parser.service';
import { SwallowEntry } from '../services/swallow-json-parser/swallow-entry';

const searchClient = instantMeiliSearch(
  environment.searchUrl
)

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private parserService: ParserService) { }

  ngOnInit(): void {
  }
  config = {
    indexName: 'Entries',
    searchClient,
  }

  parse(hit: any) {
    return this.parserService.parser(hit)
  }

  parseHits(hits: any[]){
    let entries: SwallowEntry[] = []
    for(let hit of hits){
      let entry: (SwallowEntry | null) = this.parserService.parser(hit);
      if(entry != null) entries.push(entry);
    }
    return entries
  }

}