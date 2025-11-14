# Step 1. Fetching raw json data from Swallow
The script fetch.py [https://github.com/spokenwebsites/ADP_Front/blob/main/etl/fetch.py] is used to fetch ADP data from Swallow.
Run this script from within the ETL container in Docker.
It will download and by default place the json into this file: bypartnerinstitutions.json.

```python fetch.py```

When successful, it will say: JSON data saved to 'bypartnerinstitution.json' successfully.

The data file (bypartnerinstitutions.json) is included in this repo as well, so do this step only if the raw data has changed.

# Step 2. Run geocoding scripts to enrich the dataset with normalized city/place names.
The script viz3.geolocations.py [https://github.com/spokenwebsites/ADP_Front/blob/main/etl/viz3.geolocations.py] peforms geocoding to enrich the dataset with place/city names.  Run this script from within the ETL container in Docker. It enriches the dataset, producing a new JSON file with city names included for each record that it could find.  By default, it takes the bypartnerinstitution.json file and produces the file bypartnerinstitution.withCities.json

These city/place names are also used by the "Places" visualization on the home page by generating the final.csv file need/used by the ADP front end.  This final.csv file needs to be moved into this folder: [https://github.com/spokenwebsites/ADP_Front/tree/main/webapp/src/assets/js]. The file is already there in the repo in its correct place, but you will need to re-copy it there if it changes.

This script also generates a series of CSV report files about what it found along the way.

Run this script from the ETL container, like this:

```python viz3.geolocations.py```

Note that this script can take a while to complete, for this ADP dataset, approximately an hour on typical laptop.

# Step 3. Run processor.py script to enrich the dataset with hosting_platform and video_availability

Run the processor.py script from within the ETL container in Docker. This script takes by default the bypartnerinstitution.withCities.json file, and extracts/enriches the data with hosting_platform and is_video_available fields (based on existing data). 

```python processor.py```

It produces a result file bypartnerinstitution.withCities.withHostingVideoAvailability.json
It also produces some report CSV files about what it found along the way.

# Step 4. Run script to generate the data file used for the Timeline visualization on the homepage

Run the viz1.condegram_spiral.py script from within the ETL container in Docker.  It takes by default, the raw data file from Swallow (bypartnerinstitutions.json) and produces Spiralcondegram_final.json used by the timeline visulization, so it needs to be moved into this folder: [https://github.com/spokenwebsites/ADP_Front/tree/main/webapp/src/assets/js]. The file is already there in the repo in its correct place, but you will need to re-copy it there if it changes.

```python viz1.condegram_spiral.py```

The script also produces an error log (errorlog-date.json), flagging any swallowIDs where the dates are empty or problematic/incomplete.

# How to import exported data to Meilisearch on your localhost
```
curl \
  -X POST 'http://localhost:7700/indexes/Entries/documents?primaryKey=swallow_id' \
  -H 'Content-Type: application/json' \
  --data-binary @new_collection.json
```

# Delete existing dataset
```
curl \
  -X DELETE 'http://localhost:7700/indexes/Entries'
```

# Set up the faceting in meilisearch
Define which fields are facetable/filterable:
```
{
    "filterableAttributes": [
      "Item_Description.genre",
      "Creators.name",
      "Location.address",
      "Dates.date",
      "collection.source_collection",
      "Item_Description.language",
      "Location.notes",
      "Location.city",
      "Digital_File_Description.content_type"
    ]
}
```
The curl command for that is:
```
curl -X PATCH 'http://localhost:7700/indexes/Entries/settings' -H 'Content-Type: application/json' --data-binary '{"filterableAttributes":["Item_Description.genre","Creators.name","Location.address","Dates.date","collection.source_collection","Item_Description.language","Location.notes","Location.city","Digital_File_Description.content_type"]}'
```

# Increase the total amount of hits, as the interface needs to provide total counts
The curl command for that is:
```
curl -X PATCH 'http://localhost:7700/indexes/Entries/settings/pagination' -H 'Content-Type: application/json' --data-binary '{"maxTotalHits":5000}'
```

# Increase the total amount of hits per facet, as the interface needs to provide total counts (defaults to 100 only)
The curl command for that is:
```
curl -X PATCH 'http://localhost:7700/indexes/Entries/settings/faceting' -H 'Content-Type: application/json' --data-binary '{"maxValuesPerFacet":10000}'
```
