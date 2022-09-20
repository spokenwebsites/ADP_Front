import { Component, OnInit } from '@angular/core';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'

const searchClient = instantMeiliSearch(
  "http://localhost:7700"
)

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  config = {
    indexName: 'Entries',
    searchClient,
  }
}
