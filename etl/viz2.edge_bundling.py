import json
from datetime import datetime
import re
import operator
import itertools
import sys

dict_creators_name = []

class edge_bundling:
    """
    To read the JSON file from swallow, saved in the same folder
    """

    file_path = str(input("Please provide the path to the JSON file: "))
    print(f"[{datetime.now()}] Loading JSON file from {file_path} ...")

    with open(file_path, 'r', encoding="utf-8") as json_file:
        deserialised_json = json.load(json_file)

    total_items = len(deserialised_json)
    print(f"[{datetime.now()}] Loaded {total_items} items from JSON file.\n")

    creators_withcount = []
    json_obj = []
    count_creators = {}
    arr_creators = []

    # --- PHASE 1: Collect and count creators ---
    print(f"[{datetime.now()}] Phase 1: Counting creator occurrences ...")

    for idx, item in enumerate(deserialised_json, start=1):
        if "Item_Description" in item:
            if "title" in item["Item_Description"]:
                if "Creators" in item and "collection" in item:
                    for creator_entry in item["Creators"]:
                        if "name" in creator_entry:
                            creator = re.sub("[^0-9a-zA-Z]+", " ", creator_entry["name"])
                            dict_creators_name.append(creator)
                            count_creators[creator] = count_creators.get(creator, 0) + 1

        # Progress every 5%
        if idx % max(1, total_items // 20) == 0:
            percent = (idx / total_items) * 100
            sys.stdout.write(f"\r    Processed {idx}/{total_items} items ({percent:.1f}%)")
            sys.stdout.flush()

    print(f"\n[{datetime.now()}] Finished counting {len(count_creators)} unique creators.\n")

    # --- PHASE 2: Identify top creators ---
    print(f"[{datetime.now()}] Phase 2: Selecting top creators ...")
    creators_withcount = dict(itertools.islice(
        sorted(count_creators.items(), key=operator.itemgetter(1), reverse=True), 5))

    for creator in creators_withcount:
        json_obj.append({
            'name': creator,
            'color': "Red",
            'imports': []
        })
    print(f"[{datetime.now()}] Added top {len(creators_withcount)} creators to JSON object.\n")

    # --- PHASE 3: Match events with their creators ---
    print(f"[{datetime.now()}] Phase 3: Linking events to creators ...")
    for idx, item in enumerate(deserialised_json, start=1):
        if "Item_Description" in item and "title" in item["Item_Description"]:
            arr_creators = []
            if "Creators" in item and "collection" in item:
                for creator_entry in item["Creators"]:
                    if "name" in creator_entry:
                        creator = re.sub("[^0-9a-zA-Z]+", " ", creator_entry["name"])
                        if creator in creators_withcount:
                            arr_creators.append(creator)
            if arr_creators:
                json_obj.append({
                    'name': item["Item_Description"]["title"],
                    'org': item["collection"]["source_collection"],
                    'imports': arr_creators
                })

        if idx % max(1, total_items // 20) == 0:
            percent = (idx / total_items) * 100
            sys.stdout.write(f"\r    Processed {idx}/{total_items} events ({percent:.1f}%)")
            sys.stdout.flush()

    print(f"\n[{datetime.now()}] Finished linking events.\n")

    # --- PHASE 4: Save output ---
    print(f"[{datetime.now()}] Writing output file Topten.json ...")
    with open("Topten.json", "w", encoding="utf-8") as out_file:
        json.dump(json_obj, out_file, indent=6)

    print(f"[{datetime.now()}] ✅ Done! Output saved to Topten.json")
