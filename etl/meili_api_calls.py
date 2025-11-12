#!/usr/bin/env python3
import os
import sys
import json
import requests
from pprint import pprint
import time 

# ---------------------------------
# Configuration
# ---------------------------------
BASE_URL = "http://meilisearch:7700/indexes/Entries"
MASTER_KEY = os.getenv("MEILI_MASTER_KEY")

if not MASTER_KEY:
    raise EnvironmentError("Please set MEILI_MASTER_KEY environment variable before running this script.")

HEADERS = {
    "Authorization": f"Bearer {MASTER_KEY}",
    "Content-Type": "application/json",
}


def wait_for_task(task_id):
    """Poll MeiliSearch until a given async task completes."""
    print(f"⏳ Waiting for task {task_id} to complete...")
    while True:
        resp = requests.get(f"http://meilisearch:7700/tasks/{task_id}", headers=HEADERS)
        if resp.status_code != 200:
            print(f"Error retrieving task {task_id}: {resp.status_code}")
            break
        t = resp.json()
        status = t.get("status")
        if status in ("succeeded", "failed"):
            print(f"✅ Task {task_id} status: {status}")
            break
        time.sleep(0.5)

def delete_index():
    """Delete the existing index if it exists"""
    print(f"\nChecking if index at {BASE_URL} exists...")
    check = requests.get(BASE_URL, headers=HEADERS)
    if check.status_code == 200:
        print("Index found — deleting...")
        response = requests.delete(BASE_URL, headers=HEADERS)
        print_response(f"DELETE {BASE_URL}", response)
        tid = response.json().get("taskUid")
        if tid:
            wait_for_task(tid)
    else:
        print("No existing index found — skipping delete.")


def print_response(label, response):
    print(f"\n=== {label} ===")
    print(f"Status: {response.status_code}")
    try:
        pprint(response.json())
    except Exception:
        print(response.text)
    print("=" * 60)

def get_document(swallow_id):
    """Retrieve a single document by swallow_id"""
    response = requests.get(f"{BASE_URL}/documents/{swallow_id}", headers=HEADERS)
    print_response(f"GET /documents/{swallow_id}", response)

# ---------------------------------
# Check for retrieval-only mode
# ---------------------------------
if len(sys.argv) > 1 and sys.argv[1] == "--get":
    if len(sys.argv) < 3:
        print("Usage: python3 meili_api_calls.py --get <swallow_id>")
        sys.exit(1)
    swallow_id = sys.argv[2]
    get_document(swallow_id)
    sys.exit(0)

# ---------------------------------
# 0️⃣ DELETE — remove existing index (clean start)
# ---------------------------------
delete_index()
print("Deleted existing index for clean start.")

# ---------------------------------
# Ask for JSON file path (default provided)
# ---------------------------------
default_file = "bypartnerinstitution.withCities.withHostingVideoAvailability.json"
file_path = input(f"Enter JSON file to upload [{default_file}]: ").strip()

if not file_path:
    file_path = default_file

if not os.path.exists(file_path):
    raise FileNotFoundError(f"Cannot find file: {file_path}")

# ---------------------------------
# 1️⃣ PATCH — set filterableAttributes
# ---------------------------------
payload_patch = {
    "filterableAttributes": [
        "Item_Description.genre",
        "Creators.name",
        "Location.address",
        "Dates.date",
        "collection.source_collection",
        "Item_Description.language",
        "Location.notes",
        "Location.city",
        "Digital_File_Description.content_type",
        "is_video_available",
        "Location.hosting_platform",
    ]
}

response_patch = requests.patch(
    f"{BASE_URL}/settings",
    headers=HEADERS,
    data=json.dumps(payload_patch)
)
print_response("PATCH /settings (filterableAttributes)", response_patch)
tid = response_patch.json().get("taskUid")
if tid:
    wait_for_task(tid)

# ---------------------------------
# 2️⃣ POST — upload documents from JSON file
# ---------------------------------
with open(file_path, "r", encoding="utf-8") as f:
    json_data = f.read()

response_post = requests.post(
    f"{BASE_URL}/documents?primaryKey=swallow_id",
    headers=HEADERS,
    data=json_data.encode("utf-8")
)
print_response(f"POST /documents (bulk upload from {file_path})", response_post)
tid = response_post.json().get("taskUid")
if tid:
    wait_for_task(tid)

# ---------------------------------
# 2️⃣ PATCH — update pagination settings
# ---------------------------------
payload_pagination = {
    "pagination": {
        "maxTotalHits": 5000
    }
}

response_pagination = requests.patch(
    f"{BASE_URL}/settings",
    headers=HEADERS,
    data=json.dumps(payload_pagination)
)
print_response("PATCH /settings (pagination)", response_pagination)
tid = response_pagination.json().get("taskUid")
if tid:
    wait_for_task(tid)
# ---------------------------------
# 3️⃣ PATCH — faceting settings
# ---------------------------------
payload_faceting = {
    "maxValuesPerFacet": 10000
}

response_faceting = requests.patch(
    f"{BASE_URL}/settings/faceting",
    headers=HEADERS,
    data=json.dumps(payload_faceting)
)
print_response("PATCH /settings/faceting (maxValuesPerFacet)", response_faceting)
tid = response_faceting.json().get("taskUid")
if tid:
    wait_for_task(tid)


# ---------------------------------
# 3️⃣ GET — verify updated settings
# ---------------------------------
response_get = requests.get(f"{BASE_URL}/settings", headers=HEADERS)
print_response("GET /settings", response_get)

# ---------------------------------
# ✅ VERIFY — total document count
# ---------------------------------
print("\nVerifying total document count in MeiliSearch...")
stats_resp = requests.get(f"{BASE_URL}/stats", headers=HEADERS)
if stats_resp.status_code == 200:
    stats = stats_resp.json()
    total_docs = stats.get("numberOfDocuments")
    print(f"📊 Total documents in index '{stats.get('indexUid', 'Entries')}': {total_docs}")
else:
    print(f"⚠️ Failed to retrieve stats. Status code: {stats_resp.status_code}")

# ---------------------------------
# 4️⃣ GET — retrieve document by swallow_id (interactive)
# ---------------------------------
swallow_id = input("Enter swallow_id to retrieve (or leave blank to skip): ").strip()
if swallow_id:
    get_document(swallow_id)
