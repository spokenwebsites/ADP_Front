
import json
from types import new_class
from datetime import datetime
import re
import operator
import itertools
dict_creators_name = []
class edge_bundling:
    """
    To read the JSON file from swallow, saved in the same folder
    """
    file_path=str(input("Please provide the path to the JSON file: " ))
    json_file = open(file_path, 'r', encoding="utf-8")
    data = json_file.read()
    """
    JSON is loaded into a variable deserialised_json
    """
    deserialised_json = json.loads(data)
    json_file.close()
    """"
    dict_creators_name -This Array Used to save creators names
    Events_withcount - This array saves the events with counts
    json_obj{}, json_obj['events'] = [] - dictionary to save the name, color, and imports[]
    """
    
    creators_withcount = []
    json_obj = []
    count_creators = []
    arr_creators = []
    """
    This iteration is to retrieve the no of times the creator appeared, to slice the array to top 10.
    """
    for i in range(len(deserialised_json)):
        #Title key is inside Item_description in the swallow JSON, checking here to verify if Item_description exists.
        if "Item_Description" in deserialised_json[i]:
             #If title then check for creators of the event
            if "title" in deserialised_json[i]["Item_Description"]:
                if "Creators" in deserialised_json[i] and "collection" in deserialised_json[i]:
                    #for each event get creators, removed if there are any special characters using regex
                    for j in range(len(deserialised_json[i]["Creators"])):
                        if "name" in deserialised_json[i]["Creators"][j]:
                            creator = re.sub("[^0-9a-zA-Z]+", " ",
                            deserialised_json[i]["Creators"][j]["name"])
                            dict_creators_name.append(creator)
                            #count_creators[] stores repitions of creator in an array 
                            count_creators = {i: dict_creators_name.count(i) for i in dict_creators_name}

    #To slice the creator, sorted the array based on events appeared. Then sliced the array to top 10 entries.
    creators_withcount = dict(itertools.islice(sorted(count_creators.items(), key=operator.itemgetter(1), reverse=True), 10))

    """
    imports[]- This array is left blank for the creators, as they do not have any child elements inherited. 
    Only Events will have a children as creators.
    """
    for creator in creators_withcount:
        json_obj.append({
            'name': creator,
            'color': "Red",
            'imports': []
        })

    """
    Below loop is to retrieve the event name and it's creators with count and save into the array.
    """
    for i in range(len(deserialised_json)):
        if "Item_Description" in deserialised_json[i]:
            if "title" in deserialised_json[i]["Item_Description"]:
                concatenatedstring = ""
                arr_creators = []
                if "Creators" in deserialised_json[i] and "collection" in deserialised_json[i]:
                    for j in range(len(deserialised_json[i]["Creators"])):
                        if "name" in deserialised_json[i]["Creators"][j]:
                            creator = re.sub("[^0-9a-zA-Z]+", " ",deserialised_json[i]["Creators"][j]["name"])
                        if creator in creators_withcount:
                            dict_creators_name.append(creator)
                            arr_creators.append(creator)
                            concatenatedstring += creator + ",:"
                #Here, retrieve the event name and add creators to the array.
                if concatenatedstring != "":
                    json_obj.append({
                        'name': re.sub("[^0-9a-zA-Z]+", "", deserialised_json[i]["collection"]["source_collection"])+"." + re.sub("[^0-9a-zA-Z.]+", " ", deserialised_json[i]["Item_Description"]["title"]+'"'),
                        'imports': arr_creators
                    })

    # the json file where the output must be stored
    out_file = open("webapp/src/assets/js/Topten2.json", "w")
    #dumps json into the file.
    json.dump(json_obj, out_file, indent=6)
    out_file.close()
  




