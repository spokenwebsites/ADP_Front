#!/usr/bin/env python3
"""
move_and_rebuild.py
Runs on the HOST — copies a file between build directories and triggers a Docker rebuild.
"""

import os
import shutil
import subprocess
import sys

# --- Configuration ---
DOCKER_COMPOSE_PATH = "../docker-compose.yaml"          # adjust if in another directory
DOCKER_BUILD_SERVICE = "adp_frontend"                   # service to build
DOCKER_UP_SERVICE    = "adp_frontend"                   # service to (re)start

def run(cmd: list, **kwargs):
    print(f"▶️  {' '.join(cmd)}")
    subprocess.run(cmd, check=True, **kwargs)

def copy_file(source_file: str, dest_file: str):
    """Copy file from source to destination within the host filesystem."""
    if not os.path.exists(source_file):
        sys.exit(f"❌ Source file not found: {source_file}")

    dest_dir = os.path.dirname(dest_file)
    if not os.path.exists(dest_dir):
        sys.exit(f"❌ Target directory does not exist: {dest_dir}. Remember that this script needs to run from the host, not from inside docker.")

    shutil.copy2(source_file, dest_file)
    print(f"✅ Copied {source_file} → {dest_file}")

def rebuild_no_cache():
    """Rebuild the image with no cache for the build service."""
    print(f"🔁 Rebuilding (no cache): {DOCKER_BUILD_SERVICE}")
    run(["docker", "compose", "-f", DOCKER_COMPOSE_PATH, "build", "--no-cache", DOCKER_BUILD_SERVICE])
    print(f"✅ Build complete: {DOCKER_BUILD_SERVICE}")

def up_detached():
    """Start (or restart) the target service in detached mode."""
    print(f"🚀 Starting service detached: {DOCKER_UP_SERVICE}")
    run(["docker", "compose", "-f", DOCKER_COMPOSE_PATH, "up", "-d", DOCKER_UP_SERVICE])
    print(f"✅ Service running: {DOCKER_UP_SERVICE}")

if __name__ == "__main__":
    SOURCE_FILE = "final.csv"   # where the file currently is
    DEST_FILE   = "../webapp/src/assets/js/final.csv"     # where Docker build expects it
    copy_file(SOURCE_FILE, DEST_FILE)
    SOURCE_FILE = "Spiralcondegram_final.json"   # where the file currently is
    DEST_FILE   = "../webapp/src/assets/js/Spiralcondegram_final.json"     # where Docker build expects it
    copy_file(SOURCE_FILE, DEST_FILE)
    SOURCE_FILE = "Topten.json"   # where the file currently is
    DEST_FILE   = "../webapp/src/assets/js/Topten.json"     # where Docker build expects it
    copy_file(SOURCE_FILE, DEST_FILE)
    rebuild_no_cache()
    up_detached()