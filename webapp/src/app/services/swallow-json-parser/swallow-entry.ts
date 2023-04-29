export interface cataloguer {
    name: string,
    lastname: string,
    email: string
}
export interface collection {
    contributing_unit: string,
    source_collection: string,
    source_collection_description: string,
    source_collection_id: string
}
export interface date {
    id: string,
    date: string,
    type: string,
    notes: string,
    source: string
}
export interface note {
    id: string,
    note: string,
    type: string
}
export interface content {
    notes: string,
    contents: string
}
export interface creatorRole {
    id: string,
    value: string
}
export interface creator {
    id: string,
    url: string,
    name: string,
    role: creatorRole[],
    dates: string,
    notes: string
}
export interface location {
    id: string,
    url: string,
    notes: string,
    venue: string,
    address: string,
    latitude: string,
    longitude: string,
    hosting_platform: string,
}
export interface contributor {

}
export interface itemDescriptionGenre {
    id: string,
    value: string
}
export interface itemDescription {
    genre: itemDescriptionGenre[],
    title: string,
    language: string,
    title_note: string,
    series_title: string,
    title_source: string,
    subseries_title: string,
    production_context: string,
}
export interface materialDescription {
    id: string,
    side: string,
    image: string,
    other: string,
    extent: string,
    AV_type: string,
    tape_brand: string,
    generations: string,
    Conservation: string,
    equalization: string,
    playback_mode: string,
    playing_speed: string,
    sound_quality: string,
    recording_type: string,
    storage_capacity: string,
    physical_condition: string,
    track_configuration: string,
    material_designation: string,
    physical_composition: string,
    accompanying_material: string,
    other_physical_description: string
}
export interface digitalFileDescription {
    id: string,
    size: string,
    notes: string,
    title: string,
    credit: string,
    bitrate: string,
    caption: string,
    contents: string,
    duration: string,
    encoding: string,
    featured: string,
    file_url: string,
    filename: string,
    file_path: string,
    precision: string,
    sample_rate: string,
    content_type: string,
    channel_field: string,
}
export interface institutionAndCollection {
    item_ID: string,
    persistent_URL: string
}
export interface relatedWork {
    id: string,
    URL: string,
    citation: string,
}
export class Constants {
   static Schema: string = "Swallow JSON";
   static SchemaVersion: string = "3";
}
export class SwallowEntry {
    schema!: string
    schema_version!: string;
    swallow_id!: string;
    cataloguer!: cataloguer;
    partner_institution!: string;
    collection!: collection;
    Dates!: date[];
    Note!: note[];
    Content!: content;
    Creators!: creator[];
    Location!: location[];
    Contributors!: contributor[];
    Item_Description!: itemDescription;
    Material_Description!: materialDescription[];
    Digital_File_Description!: digitalFileDescription[];
    Institution_and_Collection!: institutionAndCollection;
    Related_Works!: relatedWork[];
} 