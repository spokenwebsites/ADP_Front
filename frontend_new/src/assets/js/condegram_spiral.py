
import json
from types import new_class
from datetime import datetime

json_file= open('bypartnerinstitution.json','r',encoding="utf-8")
data=json_file.read()
deserialised_json=json.loads(data)
json_file.close()
Count_events=[]
Events_withcount=[]
condegram1={"Date":"","date_Count":""}

for i in range(len(deserialised_json)):
  if "Dates" in deserialised_json[i]:
    if "date" in deserialised_json[i]["Dates"][0]:          
      Count_events.append(deserialised_json[i]["Dates"][0]["date"])
     #this counts the date and add to the array
    Events_withcount = {i:Count_events.count(i) for i in Count_events}

json_obj={}
json_obj['dates']=[]

for vdate in Events_withcount:

     formatted_date = datetime.strptime(vdate, '%Y-%m-%d')
     updateformat=datetime.strftime(formatted_date,'%m-%d-%Y')
     json_obj['dates'].append({
        
        'date':updateformat,
        'value':Events_withcount[vdate]
     })
  
# the json file where the output must be stored 
out_file = open("Spiralcondegram_final.json", "w") 
#dumps json into the file.
json.dump(json_obj, out_file, indent = 6) 
out_file.close() 
  




