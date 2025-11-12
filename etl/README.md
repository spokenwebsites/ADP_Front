# Step 1. Fetching raw json data from Swallow
The script fetch.py [https://github.com/spokenwebsites/ADP_Front/blob/main/etl/fetch.py] is used to fetch ADP data from Swallow.
Run this script from within the ETL container in Docker.
It will download and by default place the json into this file: bypartnerinstitutions.json.

```python fetch.py```

When successful, it will say: JSON data saved to 'bypartnerinstitution.json' successfully.

The data file (bypartnerinstitutions.json) is included in this repo as well, so do this step only if the raw data has changed.




# Prerequisites
### Before using this swallow-tool or running py scripts at webapp/src/assets/js
> `cd ADP_FRONT/`

- Create python env (MacOS) [https://docs.python.org/3/tutorial/venv.html]
> `python -m venv adp-env`
> `source tutorial-env/bin/activate`

- After creating python enviroment, install requirements from `requirements.txt`.
> `pip install -r requirements.txt`


# Run Swallow Tool for swallow dataset processing
> `cd ADP_FRONT/swallow-tool/`

### Merge export.json and cities.csv using swallowmerger.py
> python3 merger.py -m export.json -c Draft.csv -o new_collection.json

### Process entries to include 'is_video_available' information
> python3 processor.py -m export.json -o new_collection.json
### Run pipeline to do the followings:
- Merge export.json and cities.csv using swallowmerger.py
- Process entries to include 'is_video_available' information
> python3 main.py -m export.json -c Draft.csv -o new_collection.json

# How to import exported data to Meilisearch on your local
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
