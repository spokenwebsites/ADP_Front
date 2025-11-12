import requests

# URL to download the JSON from
url = "https://swallow.library.concordia.ca/Service/bypartnerinstitution.php?name=Archive%20of%20the%20Digital%20Present "

# Prompt for file name, with default
default_filename = "bypartnerinstitution.json"
filename = input(f"Enter file name to save to [{default_filename}]: ").strip()
if not filename:
    filename = default_filename

try:
    print(f"Downloading JSON data from {url} ...")
    response = requests.get(url)
    response.raise_for_status()  # Raise error if download failed

    with open(filename, "w", encoding="utf-8") as f:
        f.write(response.text)

    print(f"JSON data saved to '{filename}' successfully.")
except requests.exceptions.RequestException as e:
    print(f"Error downloading data: {e}")
