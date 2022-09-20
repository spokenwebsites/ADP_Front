import { Component, OnInit } from '@angular/core';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'

const searchClient = instantMeiliSearch(
  "http://localhost:7700"
)

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  config = {
    indexName: 'Entries',
    searchClient,
  }

}