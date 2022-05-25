
import json
from types import new_class
from datetime import datetime

class CondeGram:
  def export_condegram_json(self):
    """
    To read the JSON file from swallow, saved in the same folder
    """
    file_path=str(input("Please provide the path to the JSON file: " ))
    json_file= open(file_path,'r',encoding="utf-8")
    data=json_file.read()
    """
    JSON is loaded into a variable deserialised_json
    """
    deserialised_json=json.loads(data)
    json_file.close()
    Count_events=[]
    Events_withcount=[]
    for i in range(len(deserialised_json)):
      if "Dates" in deserialised_json[i]:
        if "date" in deserialised_json[i]["Dates"][0]:          
          Count_events.append(deserialised_json[i]["Dates"][0]["date"])
        #this counts the date and add to the array
        Events_withcount = {i:Count_events.count(i) for i in Count_events}

    json_obj=[]

    for vdate in Events_withcount:

        formatted_date = datetime.strptime(vdate, '%Y-%m-%d')
        updateformat=datetime.strftime(formatted_date,'%m-%d-%Y')
        json_obj.append({
            
            'date':updateformat,
            'value':Events_withcount[vdate]
        })
      
    # the json file where the output must be stored 
    out_file = open("frontend_new/src/assets/js/Spiralcondegram_final.json", "w") 
    #dumps json into the file.
    json.dump(json_obj, out_file, indent = 6) 
    out_file.close() 
      

viz1=CondeGram()
viz1.export_condegram_json()


