
# Visualizations Data Processing 

This document will help how to run the Visualizations python scripts which will read the JSON file from swallow end point and process it.


## Visualization -1: Spiral Condegram

**Filename:** webapp/src/assets/js/viz1.condegram_spiral.py
**Path:** webapp/src/assets/js/viz1.condegram_spiral.py
**Output File Name:** webapp/src/assets/js/Spiralcondegram_final.json

**How to Execute:**

**Prerequisites**:

Python should be installed. These scripts are developed and executed on python3.

The input file, the swallow JSON file(src/assets/js/bypartnerinstitution.json) should be downloaded from the swallow endpoint (https://swallow.library.concordia.ca/Service/bypartnerinstitution.php?name=Archive%20of%20the%20Digital%20Present ) and saved in this location (src/assets/js).

## Execution

Open this python file in any IDE or can be executed in a command prompt. Navigate to the location path(src/assets/pythonscripts/viz1.condegram_spiral.py) to start the execution. 

Provide the path to the json file, ex: webapp/src/assets/js/bypartnerinstitution.json

If successfully started this will take a minute or two to read the src/assets/js/bypartnerinstitution.json file and create a new JSON (Spiralcondegram_final.json) with date in the key (“date”) and count in the (“value”) key.

To better understand added comments in the code file to understand what each array and function does.


## Visualization -2: Edge Bundling:

**Filename**: webapp/src/assets/js/viz2.edge_bundling.py.

**Path**: webapp/src/assets/js/viz2.edge_bundling.py

**Output File Name**: webapp/src/assets/js/Topten.json

**How to Execute**

**Prerequisites:**

•	Python should be installed.
•	The input file, the swallow JSON file(src/assets/js/bypartnerinstitution.json) should be downloaded from the swallow endpoint (https://swallow.library.concordia.ca/Service/bypartnerinstitution.php?name=Archive%20of%20the%20Digital%20Present ) and saved in this location (src/assets/js).

**Execution**:

•	Open this python file in any IDE or can be executed in a command prompt. Navigate to the location path(src/assets/pythonscripts/viz2.edge_bundling.py) to start the execution. 

.     Provide the path to the json file, ex: webapp/src/assets/js/bypartnerinstitution.json

•	If successfully started this will take a minute or two to read the bypartnerinstitution.json file and create a new JSON (webapp/src/assets/js/Topten.json) with keys:

  	{
            "name": "Lieberman Moti",
            "type": "Red",
            "imports": []
      },

Type: “Red” – is to differentiate the author and event name. Type is used to add CSS colour to the node in the HTML file. In the JS script file, based on type CSS class is added to the node.


{
            "name": "ArgoBooks.Argo Zoom Reading Series Verse Prose Song ",
            "imports": [
                  "Martonfi Ilona",
                  "Lieberman Moti",
                  "Prevost Adele Elise"
            ]
      },



•	To better understand added comments in the code file to understand what each array and function does.



## Visualization -3: Map

**Filename:** src/assets/js/viz3.geolocations.py

**Input File Name:**/src/assets/js/canadageo.json

**Path:** src/assets/js/viz3.geolocations.py

**Output File Name:** /src/assets/js/final.csv

**How to Execute:**

**Prerequisites:**

•	Python should be installed.

•	The input file, the swallow JSON file(src/assets/js/bypartnerinstitution.json /bypartnerinstitution.json) should be downloaded from the swallow endpoint (https://swallow.library.concordia.ca/Service/bypartnerinstitution.php?name=Archive%20of%20the%20Digital%20Present ) and saved in this location (src/assets/js).

•	/src/assets/js/canadageo.json is used to create the map boundaries first.


**Execution:**
•	Open this python file in any IDE or can be executed in a command prompt. Navigate to the location path(src/assets/pythonscripts/viz3.geolocations.py) to start the execution. 

.     Provide the path to the json file, ex: webapp/src/assets/js/bypartnerinstitution.json

•	If successfully started this will take a minute or two to read the src/assets/js/bypartnerinstitution.json file and creates a file(draft.csv) then it further proceeds to get the count of events in each city and adds it to a new file src/assets/js/final.csv.

**Note**:
This takes a bit long time to execute as this runs twice internally in the script, once to take all the city names, state and continent using coordinates and creates a file Draft.csv, then count the repititions from this file and form a single line with city name, state and etc into Final.csv.

•	To better understand added comments in the code file to understand what each array and function does.


