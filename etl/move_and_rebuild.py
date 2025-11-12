#!/usr/bin/env python3
"""
move_and_rebuild.py
Runs on the HOST — copies a file between build directories and triggers a Docker rebuild.
"""

import os
import shutil
import subprocess

# --- Configuration ---
SOURCE_FILE = "final.csv"   # where the file currently is
DEST_FILE   = "../webapp/src/assets/js/final.csv"     # where Docker build expects it
DOCKER_COMPOSE_PATH = "../docker-compose.yaml"          # adjust if in another directory
DOCKER_BUILD_SERVICE = "adp_frontend"                   # service to build
DOCKER_UP_SERVICE    = "adp_frontend"                   # service to (re)start

def run(cmd: list, **kwargs):
    print(f"▶️  {' '.join(cmd)}")
    subprocess.run(cmd, check=True, **kwargs)

def copy_file():
    """Copy file from source to destination within the host filesystem."""
    if not os.path.exists(SOURCE_FILE):
        sys.exit(f"❌ Source file not found: {SOURCE_FILE}")

    dest_dir = os.path.dirname(DEST_FILE)
    if not os.path.exists(dest_dir):
        sys.exit(f"❌ Target directory does not exist: {dest_dir}")

    shutil.copy2(SOURCE_FILE, DEST_FILE)
    print(f"✅ Copied {SOURCE_FILE} → {DEST_FILE}")

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
    copy_file()
    rebuild_no_cache()
    up_detached()