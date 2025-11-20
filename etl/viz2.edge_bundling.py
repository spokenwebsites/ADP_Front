#!/usr/bin/env python3
import json
from datetime import datetime
import sys
import os
import csv
import itertools
import operator


# ============================================================
#   VALIDATION
# ============================================================

def valid(value: str) -> bool:
    """Check if a field contains meaningful text (keeps Unicode)."""
    return value is not None and len(str(value).strip()) > 0


# ============================================================
#   PHASE 1 — LOAD JSON
# ============================================================

def load_json():
    default_file = "bypartnerinstitution.json"
    user_path = input(f"Please provide the path to the JSON file [{default_file}]: ").strip()
    file_path = user_path if user_path else default_file

    if not os.path.exists(file_path):
        raise SystemExit(f"❌ File not found: {file_path}")

    print(f"📥 Loading JSON data from: {file_path}")

    with open(file_path, 'r', encoding="utf-8") as f:
        data = json.load(f)

    print(f"[{datetime.now()}] Loaded {len(data)} items.\n")
    return data


# ============================================================
#   PHASE 2 — COUNT CREATORS + BUILD creators_index
# ============================================================

def count_creators_and_index(data):

    count_creators = {}
    creators_index = {}
    blank_creators = []

    print(f"[{datetime.now()}] Phase 1: Counting creators ...")

    for idx, item in enumerate(data, start=1):
        if "Item_Description" not in item or "Creators" not in item:
            continue

        title = item["Item_Description"].get("title", "")
        swid = item.get("swallow_id", "")
        creators = item["Creators"]

        for c in creators:
            raw = c.get("name", "")
            if not valid(raw):
                blank_creators.append({
                    "SwallowID": swid,
                    "EventTitle": title,
                    "RawName": raw
                })
                continue

            name = raw.strip()
            count_creators[name] = count_creators.get(name, 0) + 1

            # build creators_index
            if name not in creators_index:
                creators_index[name] = {
                    "Creator": name,
                    "SwallowIDs": set(),
                    "URLs": set()
                }

            creators_index[name]["SwallowIDs"].add(str(swid))
            url = c.get("url", "")
            if url:
                creators_index[name]["URLs"].add(url)

        if idx % max(1, len(data) // 20) == 0:
            percent = (idx / len(data)) * 100
            sys.stdout.write(f"\r    Processed {idx}/{len(data)} ({percent:.1f}%)")
            sys.stdout.flush()

    print(f"\n[{datetime.now()}] Done counting {len(count_creators)} unique creators.\n")

    return count_creators, creators_index, blank_creators


# ============================================================
#   PHASE 3 — SELECT TOP N CREATORS
# ============================================================

def select_top_creators(count_creators, N):
    print(f"[{datetime.now()}] Phase 2: Selecting top {N} creators ...")

    top = dict(itertools.islice(
        sorted(count_creators.items(), key=operator.itemgetter(1), reverse=True),
        N
    ))

    print(f"[{datetime.now()}] Selected top {len(top)} creators.\n")
    return top


# ============================================================
#   PHASE 4 — LINK EVENTS TO CREATORS
# ============================================================

def link_events(data, top_creators):

    full_network = []
    filtered_events = []   # events with >=2 top creators
    connections = {c: set() for c in top_creators}  # track co-occurrence
    blank_creators = []

    print(f"[{datetime.now()}] Phase 3: Linking events ...")

    for idx, item in enumerate(data, start=1):

        if "Item_Description" not in item:
            continue

        title = item["Item_Description"].get("title", "")
        org = item.get("collection", {}).get("source_collection", "")
        event_top_creators = []

        if "Creators" in item:
            for c in item["Creators"]:
                raw = c.get("name", "")
                if not valid(raw):
                    blank_creators.append({
                        "SwallowID": item.get("swallow_id", ""),
                        "EventTitle": title,
                        "RawName": raw
                    })
                    continue

                name = raw.strip()
                if name in top_creators:
                    event_top_creators.append(name)

        # store full network event
        full_network.append({
            "name": title,
            "org": org,
            "imports": event_top_creators
        })

        # store filtered event only if >=2 top creators
        if len(event_top_creators) > 1:
            filtered_events.append({
                "name": title,
                "org": org,
                "imports": event_top_creators
            })

            # update co-occurrence relationships
            for a, b in itertools.combinations(event_top_creators, 2):
                connections[a].add(b)
                connections[b].add(a)

        if idx % max(1, len(data) // 20) == 0:
            percent = (idx / len(data)) * 100
            sys.stdout.write(f"\r    Processed {idx}/{len(data)} ({percent:.1f}%)")
            sys.stdout.flush()

    print(f"\n[{datetime.now()}] Done linking events.\n")

    return full_network, filtered_events, connections, blank_creators


# ============================================================
#   PHASE 5 — FILTER ISOLATED TOP CREATORS
# ============================================================

def filter_isolated_top_creators(top_creators, connections):

    connected = {c for c, neighbors in connections.items() if len(neighbors) > 0}
    isolated = [c for c in top_creators if c not in connected]

    print(f"[{datetime.now()}] Phase 3B: Filtering isolated top creators ...")
    print(f"Found {len(isolated)} isolated top creators.\n")

    return connected, isolated


# ============================================================
#   PHASE 6 — WRITE OUTPUT FILES
# ============================================================

def write_outputs(
    connected_creators,
    isolated_creators,
    creators_index,
    blank_creators_global,
    blank_creators_events,
    full_network,
    filtered_events
):
    print(f"[{datetime.now()}] Phase 4: Writing outputs ...")

    # ---- Write isolated creators
    if isolated_creators:
        with open("isolated_top_creators.csv", "w", newline="", encoding="utf-8") as f:
            w = csv.writer(f)
            w.writerow(["Creator"])
            for c in isolated_creators:
                w.writerow([c])
        print("🆗 isolated_top_creators.csv written.")

    # ---- Write Topten.json (FIXED: ONLY connected creators)
    topten = [
        {"name": c, "color": "Red", "imports": []}
        for c in connected_creators
    ]

    topten.extend(filtered_events)

    with open("Topten.json", "w", encoding="utf-8") as f:
        json.dump(topten, f, indent=6)

    print(f"🆗 Topten.json written. Total entries: {len(topten)}")

    # Optional: show how many creators vs events
    creator_count = sum(1 for x in topten if x.get("imports") == [])
    event_count = len(topten) - creator_count

    print(f"   - Creators in Topten.json: {creator_count}")
    print(f"   - Events in Topten.json:   {event_count}")


    # ---- Write FullNetwork.json
    with open("FullNetwork.json", "w", encoding="utf-8") as f:
        json.dump(full_network, f, indent=6)
    print("🆗 FullNetwork.json written.")

    # ---- Write creators_index.csv
    with open("creators_index.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["Creator", "SwallowIDs", "URLs"])
        for c, info in sorted(creators_index.items()):
            w.writerow([
                c,
                "; ".join(sorted(info["SwallowIDs"])),
                "; ".join(sorted(info["URLs"]))
            ])
    print("🆗 creators_index.csv written.")

    # ---- Write blank creators
    blanks = blank_creators_global + blank_creators_events
    if blanks:
        with open("blank_creators.csv", "w", newline="", encoding="utf-8") as f:
            w = csv.DictWriter(f, fieldnames=["SwallowID", "EventTitle", "RawName"])
            w.writeheader()
            w.writerows(blanks)
        print("🆗 blank_creators.csv written.")

    # ---- Write Gephi nodes & edges
    nodes, edges = [], []

    # creators
    for c in creators_index.keys():
        nodes.append({"id": f"creator::{c}", "label": c, "type": "creator"})

    # events + edges
    for event in full_network:
        eid = f"event::{event['name']}"
        nodes.append({"id": eid, "label": event['name'], "type": "event"})

        for c in event["imports"]:
            edges.append({
                "source": eid,
                "target": f"creator::{c}",
                "type": "undirected"
            })

    # Write nodes
    with open("gephi_nodes.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["id", "label", "type"])
        w.writeheader()
        w.writerows(nodes)
    print("🆗 gephi_nodes.csv written.")

    # Write edges
    with open("gephi_edges.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["source", "target", "type"])
        w.writeheader()
        w.writerows(edges)
    print("🆗 gephi_edges.csv written.\n")



# ============================================================
#   MAIN — ORCHESTRATES ALL PHASES
# ============================================================

def main():

    N=13

    # PHASE 1: Load JSON
    data = load_json()

    # PHASE 2: Count creators + index
    count_creators, creators_index, blanks1 = count_creators_and_index(data)

    # PHASE 3: Select top 10 creators
    top_creators = select_top_creators(count_creators, N)

    # PHASE 4: Link events and track co-occurrence
    full_network, filtered_events, connections, blanks2 = link_events(data, top_creators)

    # PHASE 5: Filter isolated top creators
    connected_creators, isolated_creators = filter_isolated_top_creators(top_creators, connections)

    # PHASE 6: Write outputs
    write_outputs(
        connected_creators,
        isolated_creators,
        creators_index,
        blanks1,
        blanks2,
        full_network,
        filtered_events
    )

    print("\n🎉 All processing complete.\n")


# ============================================================
#   EXECUTE SCRIPT
# ============================================================

if __name__ == "__main__":
    main()
