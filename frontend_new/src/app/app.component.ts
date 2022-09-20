import { Component } from '@angular/core'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'

const searchClient = instantMeiliSearch(
  "http://localhost:7700"
)

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AoDP'
  config = {
    indexName: 'movies',
    searchClient,
  }
}
