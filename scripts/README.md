# Merge export2510.json and cities.csv using swallowmerger.py
python3 swallowmerger.py -m export2510.json -c cities.csv -o new_swallow.json

# How to import exported data to Meilisearch on your local
```curl \
  -X POST 'http://localhost:7700/indexes/Entries/documents?primaryKey=swallow_id' \
  -H 'Content-Type: application/json' \
  --data-binary @export2510.json```

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