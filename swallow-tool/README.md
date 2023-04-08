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

### Merge export2510.json and cities.csv using swallowmerger.py
> python3 merger.py -m export2774.json -c cities.csv -o collection.json

### Process entries to include 'is_video_available' information
> python3 processor.py -m export2774.json -o collection.json
### Run pipeline to do the followings:
- Merge export2510.json and cities.csv using swallowmerger.py
- Process entries to include 'is_video_available' information
> python3 main.py -m collection.json -c final.csv -o new_collection.json

# How to import exported data to Meilisearch on your local
```curl \
  -X POST 'http://localhost:7700/indexes/Entries/documents?primaryKey=swallow_id' \
  -H 'Content-Type: application/json' \
  --data-binary @collection.json```

# [PATCH] Set filtereable attributes at http://localhost:7700/indexes/Entries/settings
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
      "Location.city"
    ]
}
```

# [PATCH] Increase pagination limit at http://localhost:7700/indexes/Entries/settings/pagination
```
{
    "maxTotalHits": 4000
}
```