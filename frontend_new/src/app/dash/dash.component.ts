import { Component, OnInit } from '@angular/core';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { environment } from 'src/environments/environment'

const searchClient = instantMeiliSearch(
  environment.searchUrl
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