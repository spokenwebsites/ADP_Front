export enum FilterType {
  NULL = "", /** this shouldn't be send to the meilisearch; NULL is for the front-end only */
  People = "Creators.name",
  Organization = "collection.source_collection",
  TypeOfEvent = "Item_Description.genre.value",
  Place = "Location.address",
  // Recording = "recording",
  Date = "Dates.date",
  Language = "Item_Description.language",
  HostingPlatform = "Location.notes"
}