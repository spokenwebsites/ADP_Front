import { MeiliSearch } from 'meilisearch'
import movies from '../small_movies.json'

const { MeiliSearch } = require('meilisearch')
const movies = require('./movies.json')

const client = new MeiliSearch({ host: 'http://localhost:7700' })
client.index('movies').addDocuments(movies)
  .then((res) => console.log(res))
