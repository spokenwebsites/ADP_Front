import argparse
import re
import csv
from collections import Counter
from utils import valid
from fileutil import FileUtil


# -----------------------------------------------
# Helper: normalize hosting platform names
# -----------------------------------------------
def normalize_platform_name(raw):
    """Clean and normalize hosting platform names into consistent forms."""
    name = raw.strip().strip(':').replace('"', '').replace("’", "'")

    # Normalize case (capitalize if all lower or all upper)
    name = name.capitalize() if name.isupper() or name.islower() else name

    replacements = {
        # YouTube and variants
        "youtube": "YouTube",
        "youtube live": "YouTube",
        "youtube and zoom": "YouTube; Zoom",
        "youtube and youtube live": "YouTube",
        # Facebook
        "facebook live": "Facebook Live",
        "facebook watch": "Facebook Live",
        "facebook or twitter or youtube": "Facebook; Twitter; YouTube",
        # Zoom combos
        "zoom and youtube live": "Zoom; YouTube",
        "zoom and youtube": "Zoom; YouTube",
        "zoom and facebook live": "Zoom; Facebook Live",
        # Online / Virtual
        "online": "Online",
        "online platform": "Online",
        "online platform:": "Online",
        "online location": "Online",
        "online platform: zoom": "Online; Zoom",
        "virtual location": "Online",
        "virtual location:": "Online",
        "digital platform": "Online",
        "digital platform:": "Online",
        # Hybrid
        "hybrid": "Hybrid",
        "hybrid event": "Hybrid",
        # In-person
        "in person": "In-person",
        "in-person": "In-person",
        "in-person event": "In-person",
        # Misc known ones
        "demio": "Demio",
        "crowdcast": "Crowdcast",
        "crowd cast": "Crowdcast",
        "discord": "Discord",
        "webex": "Webex",
        "google meet": "Google Meet",
        "vimeo": "Vimeo",
        "spotify": "Spotify",
        "twitch": "Twitch",
        "twitter": "Twitter",
        "instagram": "Instagram",
        "instagram live": "Instagram Live",
        "caffeine tv": "Caffeine TV",
    }

    key = name.lower().strip()
    return replacements.get(key, name)


# -----------------------------------------------
# Main Processor Class
# -----------------------------------------------
class SwallowProcessor:
    """Processes Swallow JSON exports to add video availability and hosting platform metadata."""

    DigitalFileDescKey = 'Digital_File_Description'
    NewField_RecordingAvailable = 'is_video_available'
    LocationKey = 'Location'
    NewField_HostingPlatform = 'hosting_platform'
    SwallowIDKey = 'swallow_id'

    @staticmethod
    def parseVideoRecordingFileUrl(obj):
        """Add is_video_available flag based on Digital_File_Description."""
        try:
            for entry in obj:
                if SwallowProcessor.DigitalFileDescKey not in entry:
                    continue

                is_video_available = 0
                for digitalFileDesc in entry[SwallowProcessor.DigitalFileDescKey]:
                    if (
                        digitalFileDesc.get('content_type') == 'Video Recording'
                        and len(digitalFileDesc.get('file_url', '').strip()) > 0
                    ):
                        is_video_available = 1
                        break

                entry[SwallowProcessor.NewField_RecordingAvailable] = is_video_available
            return obj
        except Exception as e:
            print(f"⚠️ Error in parseVideoRecordingFileUrl: {e}")
            return obj

    
    @staticmethod
    def parseHostingPlatform(obj):
        """Extract quoted platform names from Location.notes and store in location.hosting_platform."""
        try:
            for entry in obj:
                if SwallowProcessor.LocationKey not in entry:
                    continue

                for location in entry[SwallowProcessor.LocationKey]:
                    notes = location.get('notes', '')
                    matches = re.findall(r'\s*"([^"]+)"', notes)
                    normalized = []
                    for m in matches:
                        norm = normalize_platform_name(m).strip()
                        # Skip any mention of 'online platform' completely
                        if 'online platform' in norm.lower():
                            continue
                        for part in norm.split(';'):
                            normalized.append(part.strip())

                    # Apply noise filter
                    filtered = [n for n in normalized if is_valid_platform(n)]

                    # Remove all variants of "online" or "virtual" (case-insensitive)
                    filtered = [
                        n for n in filtered
                        if n and 'online' not in n.lower() and 'virtual' not in n.lower()
                    ]

                    # Only keep field if we have meaningful values
                    if filtered:
                        location[SwallowProcessor.NewField_HostingPlatform] = sorted(set(filtered))
                    else:
                        # Ensure field is completely absent
                        if SwallowProcessor.NewField_HostingPlatform in location:
                            del location[SwallowProcessor.NewField_HostingPlatform]

            return obj
        except Exception as e:
            print(f"⚠️ Error in parseHostingPlatform: {e}")
            return obj


    @staticmethod
    def build(obj):
        """Run the full enrichment pipeline."""
        obj = SwallowProcessor.parseVideoRecordingFileUrl(obj)
        obj = SwallowProcessor.parseHostingPlatform(obj)
        return obj

    @staticmethod
    def export_csv_summaries(obj, csv_summary_path, csv_platforms_path):
        """
        Write two CSV files:
        1) Per-record summary (SwallowID, is_video_available, hosting_platform)
        2) Unique hosting platforms
        """
        summary_rows = []
        platform_list = []

        for entry in obj:
            swallow_id = entry.get(SwallowProcessor.SwallowIDKey, "")
            is_video = entry.get(SwallowProcessor.NewField_RecordingAvailable, 0)
            hosting_list = []

            if SwallowProcessor.LocationKey in entry:
                for loc in entry[SwallowProcessor.LocationKey]:
                    platforms = loc.get(SwallowProcessor.NewField_HostingPlatform, [])
                    if platforms:
                        hosting_list.extend(platforms)
                        platform_list.extend(platforms)

            summary_rows.append({
                "SwallowID": swallow_id,
                "is_video_available": is_video,
                "hosting_platform": "; ".join(sorted(set(hosting_list))) if hosting_list else ""
            })

        # Write per-record CSV
        with open(csv_summary_path, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=["SwallowID", "is_video_available", "hosting_platform"])
            writer.writeheader()
            writer.writerows(summary_rows)

        # Write unique platforms CSV
        unique_platforms = sorted(set(platform_list))
        with open(csv_platforms_path, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(["hosting_platform"])
            for platform in unique_platforms:
                writer.writerow([platform])

        print(f"✅ Summary CSV written to: {csv_summary_path}")
        print(f"✅ Unique hosting platforms written to: {csv_platforms_path}")

        # Print brief statistics
        total_records = len(summary_rows)
        video_count = sum(1 for row in summary_rows if row["is_video_available"] == 1)
        print(f"\n📊 Summary:")
        print(f"   Total records processed: {total_records}")
        print(f"   Records with video available: {video_count}")
        print(f"   Unique hosting platforms: {len(unique_platforms)}")

        # Show top 10 most frequent platforms
        counter = Counter(platform_list)
        print("\n🏷️ Top 10 most common hosting platforms:")
        for name, count in counter.most_common(10):
            print(f"   {name}: {count}")
        print("")

def is_valid_platform(name):
    """Generic filter to exclude obvious non-platform noise."""
    if not name:
        return False
    n = name.strip().lower()
    # Exclude simple conjunctions, junk, and online/virtual platforms
    if n in {
        "and", "or",
        "online", "online platform", "virtual", "virtual location",
        "digital platform", "digital platform:", "online event",
        "location and method of delivery not disclosed"
    }:
        return False
    # Exclude very long descriptive phrases
    if len(n.split()) > 6:
        return False
    return True


# -----------------------------------------------
# Main entry point
# -----------------------------------------------
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="""
    Enrich Swallow JSON export by detecting available video recordings
    and extracting hosting platforms from Location.notes.
    Outputs enriched JSON and CSV summaries.
    """)

    parser.add_argument(
        '-m', '--mainfile',
        default='bypartnerinstitution.withCities.json',
        help='Swallow EXPORTED JSON (default: bypartnerinstitution.withCities.json)'
    )
    parser.add_argument(
        '-o', '--output',
        default=None,
        help='Output enriched JSON (default: adds .withHostingVideoAvailability.json to input filename)'
    )
    parser.add_argument(
        '-s', '--summary',
        default=None,
        help='Output CSV summary (default: same basename + .summary.csv)'
    )
    parser.add_argument(
        '-p', '--platforms',
        default=None,
        help='Output unique hosting platforms CSV (default: same basename + .hosting_platforms.csv)'
    )

    args = parser.parse_args()

    # Validate input file
    if not valid(args.mainfile):
        raise Exception(f"mainfile is invalid or not found: {args.mainfile}")

    # Derive default output filenames
    base_name = args.mainfile.rsplit(".json", 1)[0]
    output_file = args.output or f"{base_name}.withHostingVideoAvailability.json"
    summary_csv = args.summary or f"{base_name}.summary.csv"
    platforms_csv = args.platforms or f"{base_name}.hosting_platforms.csv"

    print(f"Input file: {args.mainfile}")
    print(f"Output JSON: {output_file}")
    print(f"Summary CSV: {summary_csv}")
    print(f"Platforms CSV: {platforms_csv}")

    # Load JSON
    obj = FileUtil.load_json(args.mainfile)
    print(f"Loaded {len(obj)} records from {args.mainfile}")

    # Enrich data
    obj = SwallowProcessor.build(obj)

    # Save enriched JSON
    FileUtil.save_json(obj, output_file)
    print(f"Enriched JSON written to {output_file}")

    # Export CSV summaries
    SwallowProcessor.export_csv_summaries(obj, summary_csv, platforms_csv)
