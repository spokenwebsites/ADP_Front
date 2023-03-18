
/** Adding a new field in FilterType requires the same field to be added at ListsGenericComponent.*/
export enum FilterType {
  NULL = "", /** this shouldn't be send to the meilisearch; NULL is for the front-end only */
  People = "Creators.name",
  Organization = "collection.source_collection",
  TypeOfEvent = "Item_Description.genre.value",
  Place = "Location.city",
  Recordings = "Digital_File_Description.content_type",
  IsRecordingAvailable = "is_video_available",
  Date = "Dates.date",
  Language = "Item_Description.language",
  HostingPlatform = "Location.notes"
}