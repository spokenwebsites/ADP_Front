
import json
from types import new_class

from datetime import datetime
import re
import csv
from numpy import empty, number
import operator
import itertools
import reverse_geocoder as rg 
import os
import pandas as pd
from geopy.geocoders import Nominatim

file_path=str(input("Please provide the path to the JSON file: " ))
json_file= open(file_path,'r',encoding="utf-8")

data=json_file.read()
deserialised_json=json.loads(data)
json_file.close()
draftCSV = 'webapp/src/assets/js/Draft.csv'

"""
This function creates a csv file with city,lat,lon,continent,state,no of events
"""
def createcsvwithcoordinates():

  #Nomainatim is used as user_agent to get address of the location, passing inputs as lat,lon 
  geolocator = Nominatim(user_agent="Nominatim")
  #Firstly a draft file is created with city,homelat,homelon,homecontinent,state
  with open(draftCSV, 'w', encoding='UTF8', newline='') as f:
    header = ['city','homelat','homelon','homecontinent','state', 'n']
    writer = csv.writer(f)
    writer.writerow(header)
    for i in range(len(deserialised_json)):
      try:
          if "Location" in deserialised_json[i]:
                  if "address" in deserialised_json[i]["Location"][0]:
                    if "latitude" in deserialised_json[i]["Location"][0]:
                      if "longitude" in deserialised_json[i]["Location"][0]:
                        if(len(deserialised_json[i]["Location"][0]["latitude"]) !=0 and len(deserialised_json[i]["Location"][0]["longitude"]) !=0):
                          if "https://" not in (deserialised_json[i]["Location"][0]["longitude"]):
                                lat=deserialised_json[i]["Location"][0]["latitude"]
                                long=deserialised_json[i]["Location"][0]["longitude"]
                                location = geolocator.reverse(lat+","+long)
                                if not location or not location.raw:
                                    continue
                                address = location.raw['address']
                                if address.get('city', '')!="":
                                    city = address.get('city','')
                                elif address.get('town','')!="":
                                    city = address.get('town','')
                                elif address.get('town')=="" and address.get('region','')!="":
                                    city=address.get('region','')
                                if "Old Toronto" in city:
                                    city = "Toronto"
                                elif "(Old) Ottawa"  in city:
                                  city="Ottawa"
                                state = address.get('state', '')
                                country = address.get('country', '')
                                code = address.get('country_code')
                                if city is not empty and state is not empty and country is not empty:
                                    row = (city,lat,long,country,state,deserialised_json[i]['swallow_id'])
                                    writer.writerow(row)
      except:
        pass

# This function is used to get the cities count from draft.csv, replace then merge the count to a new csv with lat,long,state, and n
#
def getcitiescount():
  df=pd.read_csv(draftCSV)
  df=pd.DataFrame(df, columns= ['city','homelat','homelon','homecontinent','state'])
  getcitycount = df.pivot_table(columns=['city'], aggfunc='size')
  data=getcitycount.to_dict()
  arr_finaldata=[]
  with open(draftCSV, 'r', newline='') as file:
      header = ['city','homelat','homelon','homecontinent','state','n']
      with open('webapp/src/assets/js/final.csv', 'w', encoding='UTF8', newline='') as f:
          writer = csv.writer(f)
          writer.writerow(header)
          myreader = csv.reader(file, delimiter=',')
          next(myreader, None)
          for rows in myreader:
              if rows[0]:
                  if rows[0] not in arr_finaldata:
                      arr_finaldata.append(rows[0])
                      count=data[rows[0]]
                      row = (rows[0],rows[1],rows[2],rows[3],rows[4],count)
                      writer.writerow(row)


createcsvwithcoordinates()
getcitiescount()

# remove unnecessary draft csv file.
os.remove(draftCSV)


