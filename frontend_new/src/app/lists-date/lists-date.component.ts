import { Component, OnInit } from '@angular/core';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'

const searchClient = instantMeiliSearch(
  "http://localhost:7700"
)

@Component({
  selector: 'app-lists-date',
  templateUrl: './lists-date.component.html',
  styleUrls: ['./lists-date.component.css']
})
export class ListsDateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  config = {
    indexName: 'Entries',
    searchClient,
  }

}
