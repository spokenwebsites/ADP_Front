#!/usr/bin/env python3
"""
viz3.geolocations.qa.py
Final integrated script:
- uses reverse_geocoder first (fast, offline), then geopy.Nominatim for address or reverse fallback
- persistent JSON cache `geocache.json` in same folder
- adds "city" to Location items when available (address preferred)
- detects "outside Canada" by address or latlon and records which method
- writes all original summary CSVs and a .withCities.json output
"""

import json
import csv
import os
import time
from collections import Counter
from typing import Tuple, Optional


province_map = {
    "Montreal": "QC",
    "Ottawa": "ON",
    "Toronto": "ON",
    "Vancouver": "BC",
    "Westmount": "QC",
    "Windsor": "ON",
    "Calgary": "AB",
    "Moncton": "NB",
    "London": "ON",
    "Victoria": "BC",
    "Halifax": "NS",
    "Parksville": "BC",
    "Kingston": "ON",
    "Thunder Bay": "ON",
    "Owen Sound": "ON",
    "Neyaashiinigmiing": "ON",
    "Princeville": "QC",
    "Regina": "SK",
    "Richmond": "BC",
    "Edmonton": "AB",
    "Winnipeg": "MB",
    "Greater Sudbury": "ON",
    "Guelph": "ON",
    "Hamilton": "ON",
    "Moose Jaw": "SK",
    "Scugog": "ON",
    "Fredericton": "NB",
    "Saint John": "NB",
    "Gagetown Parish": "NB",
    "Antigonish": "NS",
    "Sussex": "NB",
    "Pictou": "NS",
    "Sydney": "NS",
    "Okotoks": "AB",
    "Hornby Island": "BC",
    "St. Albert": "AB",
    "Wolfville": "NS",
    "Banff": "AB",
    "West End": "BC",
    "Hampstead": "QC",
    "Saskatoon": "SK",
    "Sechelt": "BC",
    "LaHave": "NS",
    "Lac-Brome": "QC",
    "La Ronge": "SK",
    "Swift Current": "SK",
    "Big River": "SK",
    "Shaunavon": "SK",
    "Rosetown": "SK",
    "Lampman": "SK",
    "Indian Head": "SK",
    "Bridgetown": "NS",
    "Langford": "BC",
    "Whitehorse": "YT",
    "Sherbrooke": "QC",
    "Gibbons": "AB",
    "Carstairs": "AB",
    "Canmore": "AB",
    "Camrose": "AB",
    "Sumas": "BC",
    "Steinbach": "MB",
    "Hallock": "MN",
    "Waterloo": "ON",
    "Whistler": "BC",
    "Gatineau": "QC",
    "Stony Plain": "AB",
    "Salmo": "BC",
    "Dryden": "ON",
    "Montréal-Ouest": "QC",
    "Gibsons": "BC",
    "Courtenay": "BC",
    "Yellowknife": "NT",
    "Baddeck": "NS",
    "Whycocomagh 2": "NS",
    "Margaree Forks": "NS",
    "Cheticamp": "NS",
    "Mont-Royal": "QC",
    "La Pêche": "QC",
    "Corner Brook": "NL",
    "Nelson": "BC",
    "North Saanich": "BC",
    "Salmon Arm": "BC",
    "Lethbridge": "AB",
    "Quebec": "QC",
    "Timmins": "ON",
    "Burnaby": "BC",
    "Côte-Saint-Luc": "QC",
    "L'Ancienne-Lorette": "QC",
    "Charlottetown": "PE",
    "Cornwall": "PE",
    "Summerside": "PE",
    "Surrey": "BC",
    "Scarborough": "ON",
    "Nanaimo": "BC",
    "Markham": "ON",
}


# geocoding libs
import reverse_geocoder as rg          # fast offline lat/lon -> nearest place
from geopy.geocoders import Nominatim
from geopy.extra.rate_limiter import RateLimiter
# -----------------------
# Configuration / Filenames
# -----------------------
default_file = "bypartnerinstitution.json"

# CSV output names (same style as your original)
final_csv = "city_summary.csv"
resolved_by_address_csv = "resolved_by_address.csv"
discrepancy_csv = "discrepancies.csv"
unresolved_no_address_csv = "unresolved_no_address.csv"
unresolved_with_address_csv = "unresolved_with_address.csv"
outside_csv = "outside_entries.csv"

# persistent cache file (same folder)
GEOCACHE_FILE = "geocache.json"

# geopy / nominatim settings (increase timeout and rate limits to avoid timeouts)
NOMINATIM_USER_AGENT = "viz3_geolocations_qa"
NOMINATIM_TIMEOUT = 10  # seconds
NOMINATIM_MIN_DELAY = 1  # seconds between calls (be polite); raise to 2 if you still hit issues
NOMINATIM_MAX_RETRIES = 3
NOMINATIM_ERROR_WAIT = 5  # wait on error before retrying
def load_cache(path: str = GEOCACHE_FILE) -> dict:
    if os.path.exists(path):
        try:
            with open(path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            # If cache is corrupt, back it up and start fresh
            try:
                os.rename(path, path + ".corrupt")
            except Exception:
                pass
            return {}
    return {}


def save_cache(cache: dict, path: str = GEOCACHE_FILE) -> None:
    # write atomically
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(cache, f, indent=2, ensure_ascii=False)
    os.replace(tmp, path)
# geopy / nominatim setup
_nominatim = Nominatim(user_agent=NOMINATIM_USER_AGENT, timeout=NOMINATIM_TIMEOUT)
_geocode_rl = RateLimiter(
    _nominatim.geocode,
    min_delay_seconds=NOMINATIM_MIN_DELAY,
    max_retries=NOMINATIM_MAX_RETRIES,
    error_wait_seconds=NOMINATIM_ERROR_WAIT,
)
_reverse_rl = RateLimiter(
    _nominatim.reverse,
    min_delay_seconds=NOMINATIM_MIN_DELAY,
    max_retries=NOMINATIM_MAX_RETRIES,
    error_wait_seconds=NOMINATIM_ERROR_WAIT,
)

# Load persistent cache once
CACHE = load_cache()

def cache_get(key: str):
    return CACHE.get(key)

def cache_set(key: str, value):
    CACHE[key] = value
    # save periodically to avoid too many writes; we save every set for persistence
    save_cache(CACHE)


# Keys:
# addr::<address>  -> { "lat":..., "lon":..., "raw": {...}, "city":..., "country_code":... }
# latlon_rg::<lat>,<lon> -> reverse_geocoder result (dict) : { "name":..., "admin1":..., "cc":... }
# latlon_nom::<lat>,<lon> -> nominatim reverse -> { "raw": {...}, "city":..., "country_code":... }

def geocode_address_cached(address: str) -> Optional[dict]:
    """
    Use geopy.Nominatim to geocode an address (forward geocode), with caching.
    Returns dict with keys: lat, lon, raw, city (if present), country_code (if present)
    """
    if not address:
        return None
    key = f"addr::{address}"
    cached = cache_get(key)
    if cached:
        return cached
    try:
        loc = _geocode_rl(address, addressdetails=True)
        if not loc:
            cache_set(key, None)
            return None
        raw = getattr(loc, "raw", {})
        addr = raw.get("address", {}) if raw else {}
        city = next((addr.get(k) for k in ("city", "town", "village", "municipality") if addr.get(k)), None)
        country_code = addr.get("country_code", "").upper() if addr.get("country_code") else None
        out = {
            "lat": str(getattr(loc, "latitude", "")),
            "lon": str(getattr(loc, "longitude", "")),
            "raw": raw,
            "city": city,
            "country_code": country_code
        }
        cache_set(key, out)
        return out
    except Exception as e:
        # store None to avoid repeated failing lookups in same run; leave as None or delete depending on preference
        cache_set(key, None)
        return None


def reverse_geocode_rg_cached(lat: str, lon: str) -> Optional[dict]:
    """
    Use reverse_geocoder (fast, offline) to lookup nearest place for lat/lon.
    Returns dict with keys: name, admin1, cc (country code)
    """
    if not lat or not lon:
        return None
    key = f"latlon_rg::{lat},{lon}"
    cached = cache_get(key)
    if cached:
        return cached
    try:
        # reverse_geocoder expects floats or strings convertible to floats
        coords = (float(lat), float(lon))
        results = rg.search(coords, mode=1)  # returns a list of matches
        if results:
            r = results[0]
            out = {
                "name": r.get("name"),
                "admin1": r.get("admin1"),
                "cc": r.get("cc")  # country code, uppercase
            }
            cache_set(key, out)
            return out
    except Exception:
        # store None to avoid repeated failing lookups in same run
        cache_set(key, None)
        return None


def reverse_geocode_nom_cached(lat: str, lon: str) -> Optional[dict]:
    """
    Use Nominatim reverse (slower) as fallback for lat/lon.
    Returns dict with keys: raw, city, country_code
    """
    if not lat or not lon:
        return None
    key = f"latlon_nom::{lat},{lon}"
    cached = cache_get(key)
    if cached:
        return cached
    try:
        loc = _reverse_rl((lat, lon), exactly_one=True, addressdetails=True)
        if not loc:
            cache_set(key, None)
            return None
        raw = getattr(loc, "raw", {})
        addr = raw.get("address", {}) if raw else {}
        city = next((addr.get(k) for k in ("city", "town", "village", "municipality") if addr.get(k)), None)
        country_code = addr.get("country_code", "").upper() if addr.get("country_code") else None
        out = {
            "raw": raw,
            "city": city,
            "country_code": country_code
        }
        cache_set(key, out)
        return out
    except Exception:
        cache_set(key, None)
        return None
def safe_strip(val):
    if val is None:
        return ""
    return str(val).strip()


import unicodedata

# ---------------- Manual normalization ----------------
normalized_log = []  # global list to collect manual normalizations

# ---------------- Manual normalization ----------------
# ---------------- Case-by-case city normalization ----------------
def normalize_city(city_name: str, sw_id: str = None) -> str:
    """
    Normalize city names using a manual mapping.
    Example: "City of Edmonton" -> "Edmonton", "Montréal" -> "Montreal"
    """
    if not city_name:
        return ""

    # Define the mapping of specific inputs -> normalized outputs
    city_map = {
        "Montréal": "Montreal",
        "City of Saint John": "Saint John",
        "City of New York": "New York",
        "Whistler Resort Municipality": "Whistler",
        "North Vancouver": "Vancouver",
        "Guelph/Eramosa": "Guelph",
        "Area A (Baynes Sound)": "Hornby Island",
        # add more specific mappings as needed
    }

    city_name_clean = city_name.strip()
    normalized = city_map.get(city_name_clean, city_name_clean)

    # ✅ if changed, log it
    if normalized != city_name_clean:
        normalized_log.append({
            "SwallowID": sw_id,
            "Original_City": city_name_clean,
            "Normalized_City": normalized
        })

    return normalized


# ---------------- Record ID ----------------
def get_record_id(rec: dict) -> str:
    """
    Return the record's ID. Assumes the ID field is 'swallow_id'.
    """
    return str(rec.get("swallow_id", ""))


def normalize_city_from_address(address: str) -> Optional[str]:
    """
    Detect specific address patterns that require manual city override.
    Returns a normalized city name if matched, otherwise None.
    """
    if not address:
        return None

    addr = address.lower().strip()

    # Specific known exceptions or Indigenous community addresses
    if "neyaashiinigmiing" in addr:
        return "Neyaashiinigmiing"

    if "woody point" in addr:
        return "Woody Point"

    if "meaford" in addr:
        return "Meaford"

    # Add more as needed:
    # if "six nations" in addr: return "Six Nations of the Grand River"
    # if "kanesatake" in addr: return "Kanesatake"
    # if "wikwemikong" in addr: return "Wiikwemkoong"

    return None



def process_records(records: list):
    """
    Process all records, injecting Location.city when resolved and collecting report structures.
    Order of resolution:
      1) reverse_geocoder (offline) for coords -> coord_city, coord_country (cc)
      2) geocode_address_cached (Nominatim) for address -> addr_city, addr_country
      3) reverse_geocode_nom_cached (Nominatim reverse) fallback for coords if needed
      4) existing 'city' in the record if present
    """

    resolved_by_address = {}
    resolved_by_existing_city = []
    unresolved_no_address = []
    unresolved_with_address = []
    outside_entries = []
    discrepancies = []
    city_data = {}
    nominatim_resolved_count = 0

    for rec in records:
        sw_id = get_record_id(rec)
        locs = rec.get("Location", []) or []
        for loc in locs:
            address = safe_strip(loc.get("address", ""))
            lat = safe_strip(loc.get("latitude", ""))
            lon = safe_strip(loc.get("longitude", ""))

            # ⚙️ Remove any pre-existing 'city' to avoid false positives
            existing_city = safe_strip(loc.get("city", ""))
            if existing_city:
                # Keep it aside but remove from dict for clean classification
                loc.pop("city", None)

            # 1️⃣ Manual override for known address patterns
            manual_city = normalize_city_from_address(address)
            if manual_city:
                loc["city"] = manual_city
                key = manual_city
                if key not in city_data:
                    city_data[key] = {
                        "city": manual_city,
                        "lat": lat or "",
                        "lon": lon or "",
                        "country": "CA",
                        "state": "",
                        "count": 0
                    }
                city_data[key]["count"] += 1
                # Skip geocoding for this record
                continue

            # 1️⃣ coord-based quick offline check via reverse_geocoder
            coord_city = None
            coord_country = None
            if lat and lon:
                rg_res = reverse_geocode_rg_cached(lat, lon)
                if rg_res:
                    coord_city = rg_res.get("name")
                    coord_country = (rg_res.get("cc") or "").upper()

            # 2️⃣ address-based geocode (Nominatim, cached)
            addr_city = None
            addr_country = None
            if address:
                geocode_res = geocode_address_cached(address)
                if geocode_res:
                    addr_city = geocode_res.get("city")
                    addr_country = geocode_res.get("country_code")

            # 3️⃣ fallback: if no coord_city but coords exist, try nominatim reverse (cached)
            if not coord_city and lat and lon:
                nom_rev = reverse_geocode_nom_cached(lat, lon)
                if nom_rev:
                    coord_city = nom_rev.get("city")
                    coord_country = nom_rev.get("country_code")
                    if coord_city:
                        nominatim_resolved_count += 1

            # 🧭 Determine final city (preference order)
            city_used = addr_city or coord_city

            # 4️⃣ If neither geocoding succeeded but existing_city was present, use it
            if not city_used and existing_city:
                city_used = existing_city
                resolved_by_existing_city.append(
                    (sw_id, json.dumps({**loc, "city": existing_city}, ensure_ascii=False))
                )

            # 🏙️ Normalize manually (custom list)
            city_used = normalize_city(city_used, sw_id)

            # Inject normalized city if available
            if city_used:
                loc["city"] = city_used
                key = city_used
                if key not in city_data:
                    city_data[key] = {
                        "city": city_used,
                        "lat": lat or "",
                        "lon": lon or "",
                        "country": addr_country or coord_country or "",
                        "state": "",
                        "count": 0
                    }
                city_data[key]["count"] += 1

            # Track resolution categories
            if addr_city:
                resolved_by_address[sw_id] = {"address": address, "latitude": lat, "longitude": lon}
            elif not address:
                unresolved_no_address.append((sw_id, json.dumps(loc, ensure_ascii=False)))
            elif not city_used:
                # address present but unresolved
                unresolved_with_address.append((sw_id, json.dumps(loc, ensure_ascii=False)))

            # Discrepancy detection (accent-insensitive)
            if addr_city and coord_city and normalize_city(addr_city).lower() != normalize_city(coord_city).lower():
                discrepancies.append({
                    "SwallowID": sw_id,
                    "Address_City": addr_city,
                    "LatLon_City": coord_city,
                    "Latitude": lat,
                    "Longitude": lon,
                    "city_used": city_used,
                })

            # Outside Canada detection
            outside_by = None
            if addr_country and addr_country.upper() != "CA":
                outside_by = "address"
            elif coord_country and coord_country.upper() != "CA":
                outside_by = "latlon"
            if outside_by:
                outside_entries.append((sw_id, json.dumps(loc, ensure_ascii=False), outside_by))

    return {
        "resolved_by_address": resolved_by_address,
        "resolved_by_existing_city": resolved_by_existing_city,
        "unresolved_no_address": unresolved_no_address,
        "unresolved_with_address": unresolved_with_address,
        "outside_entries": outside_entries,
        "discrepancies": discrepancies,
        "city_data": city_data,
        "nominatim_resolved_count": nominatim_resolved_count,
    }



# ---------------- Universal CSV Writer ----------------
def write_final_csv(data, path: str):
    """
    Write CSV reports. Handles both:
      - dict-based inputs (e.g. resolved_by_address)
      - list-based inputs (e.g. unresolved_no_address)
    """
    with open(path, "w", encoding="UTF8", newline="") as f:
        writer = csv.writer(f)

        # Case 1: dict with SwallowID -> dict of fields
        if isinstance(data, dict):
            if data:
                first_val = next(iter(data.values()))
                fieldnames = ["SwallowID"] + list(first_val.keys())
                writer.writerow(fieldnames)
                for sw_id, d in data.items():
                    writer.writerow([sw_id] + [d.get(k, "") for k in first_val.keys()])
            else:
                writer.writerow(["SwallowID"])

        # Case 2: list of tuples (SwallowID, json_str) or similar
        elif isinstance(data, list):
            writer.writerow(["SwallowID", "Location"])
            for row in data:
                if isinstance(row, (list, tuple)) and len(row) == 2:
                    writer.writerow(row)
                else:
                    writer.writerow([row])
        else:
            writer.writerow(["Unexpected data format"])

    print(f"✅ Wrote CSV: {path}")



def write_resolved_by_address_csv(path: str, resolved_by_address: dict):
    with open(path, "w", encoding="UTF8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["SwallowID", "Address", "Latitude", "Longitude"])
        for sw_id, d in resolved_by_address.items():
            writer.writerow([sw_id, d.get("address", ""), d.get("latitude", ""), d.get("longitude", "")])
    print(f"✅ Wrote resolved-by-address CSV: {path}")


def write_discrepancy_csv(path: str, discrepancies: list):
    # columns: SwallowID, Address_City, LatLon_City, Latitude, Longitude, city_used
    fieldnames = ["SwallowID", "Address_City", "LatLon_City", "Latitude", "Longitude", "city_used"]
    with open(path, "w", encoding="UTF8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for d in discrepancies:
            # ✅ filter out unexpected keys before writing
            writer.writerow({k: d.get(k, "") for k in fieldnames})
    print(f"✅ Wrote discrepancy CSV: {path}")

def write_normalizations_csv(path: str, normalizations: list):
    fieldnames = ["SwallowID", "Original_City", "Normalized_City"]
    with open(path, "w", encoding="UTF8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for n in normalizations:
            writer.writerow(n)
    print(f"✅ Wrote manual normalization CSV: {path}")

def write_unresolved_csv(path: str, unresolved_list: list):
    with open(path, "w", encoding="UTF8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["SwallowID", "Location"])
        for sw_id, loc_str in unresolved_list:
            writer.writerow([sw_id, loc_str])
    print(f"✅ Wrote unresolved CSV: {path}")


def write_outside_csv(path: str, outside_list: list):
    with open(path, "w", encoding="UTF8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["SwallowID", "Location", "Outside_Determined_By"])
        for sw_id, loc_str, outside_by in outside_list:
            writer.writerow([sw_id, loc_str, outside_by])
    print(f"✅ Wrote outside CSV: {path}")

def write_city_data_csv(city_data, path: str, province_map: dict):
    with open(path, "w", encoding="UTF-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["city", "homelat", "homelon", "homecontinent", "state", "n"])
        for city, info in city_data.items():
            state = province_map.get(city, "")
            writer.writerow([
                city,
                info.get("lat", ""),
                info.get("lon", ""),
                "Canada" if info.get("country", "").upper() == "CA" else info.get("country", ""),
                state,
                info.get("count", "")
            ])
    print(f"✅ Wrote final CSV: {path}")


def main():
    file_path = input(f"Please provide the path to the JSON file [{default_file}]: ").strip()
    if not file_path:
        file_path = default_file

    if not os.path.exists(file_path):
        print(f"❌ File not found: {file_path}")
        return

    print(f"📥 Loading JSON data from: {file_path}")
    with open(file_path, "r", encoding="utf-8") as f:
        deserialised_json = json.load(f)

    print("🔎 Processing records (reverse_geocoder -> address geocode -> nominatim reverse fallback)...")
    stats = process_records(deserialised_json)

    # Write enriched JSON: append .withCities before ext
    root, ext = os.path.splitext(file_path)
    output_path = f"{root}.withCities{ext}"
    print(f"💾 Writing enriched JSON (with 'city' added where available) to: {output_path}")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(deserialised_json, f, indent=4, ensure_ascii=False)

    # Write CSVs
    write_final_csv(stats["resolved_by_address"], "Resolved (by address).csv")
    write_final_csv(stats["resolved_by_existing_city"], "Resolved (by existing city).csv")
    write_final_csv(stats["unresolved_no_address"], "Unresolved (no address).csv")
    write_final_csv(stats["unresolved_with_address"], "Unresolved (with address but unresolved).csv")
    write_final_csv(stats["outside_entries"], "Outside Canada.csv")
    write_final_csv(stats["city_data"], "City Data.csv")
    write_city_data_csv(stats["city_data"], "final.csv", province_map)
    write_discrepancy_csv("Discrepancies.csv", stats["discrepancies"])
    if normalized_log:
        write_normalizations_csv("ManualNormalizations.csv", normalized_log)

    # Summary
    print("\n===== Processing Summary =====")
    print(f"Total JSON entries: {len(deserialised_json)}")
    print(f"Resolved by address geocoding: {len(stats['resolved_by_address'])}")
    print(f"Resolved with Nominatim fallback: {stats.get('nominatim_resolved_count', 0)}")
    print(f"Unresolved (no address): {len(stats['unresolved_no_address'])}")
    print(f"Unresolved (with address but unresolved): {len(stats['unresolved_with_address'])}")
    print(f"Outside Canada: {len(stats['outside_entries'])}")
    print(f"Discrepancies detected: {len(stats['discrepancies'])}")
    print("==============================")

if __name__ == "__main__":
    main()
