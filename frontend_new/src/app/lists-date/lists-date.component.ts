import { Component, OnInit } from '@angular/core';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { environment } from 'src/environments/environment';

const searchClient = instantMeiliSearch(
  environment.searchUrl
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
