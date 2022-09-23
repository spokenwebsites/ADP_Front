from datetime import date
from itertools import count
from numpy import empty, number
import pandas as pd
import reverse_geocoder as rg 
import pprint 
import csv
import re
from geopy.geocoders import Nominatim


def reverseGeocode(coordinates): 
    result = rg.search(coordinates) 
      
    # result is a list containing ordered dictionary. 
    pprint.pprint(result) 

# with open('countries.csv','r') as in_file, open('ouput.csv','w') as out_file:
  
#     seen = set() # set for fast O(1) amortized lookup
    
#     for line in in_file:
#         if line in seen: 
#           continue # skip duplicate

#         seen.add(line)
#         out_file.write(line)
# df = pd.read_csv("countries.csv")


# df=pd.DataFrame(df, columns= ['latitude','longitude'])

# dups_color_and_shape = df.pivot_table(columns=['latitude','longitude'], aggfunc= 'size').reset_index().rename()

# dups_color_and_shape.to_csv('simplified.csv')


#45.488682,-73.584259 - No city variable in api, has county
#45.5573,-73.8954 - no city found.


geolocator = Nominatim(user_agent="Nominatim")
regex = re.compile('[@_!#$%^&*()<>?/\|}{~:]')
with open('countries.csv', 'r', newline='') as file:
  
  header = ['city','homelat','homelon','homecontinent','state']
  with open('Level3.csv', 'w', encoding='UTF8', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(header)
 
    myreader = csv.reader(file, delimiter=',')
    next(myreader, None)
    citycounter=0
    towncounter=0 
    regioncounter=0
    for rows in myreader:
            location = geolocator.reverse(rows[0]+","+rows[1])
            address = location.raw['address']
            if address.get('city', '')!="":
                city = address.get('city','')
                citycounter=citycounter+1
            elif address.get('town','')!="":
                city = address.get('town','')
                towncounter=towncounter+1
            elif address.get('town')=="" and address.get('region','')!="":
                city=address.get('region','')
                regioncounter=regioncounter+1
            if "Old Toronto" in city:
                city = "Toronto"
            elif "(Old) Ottawa"  in city:
              city="Ottawa"
            state = address.get('state', '')
            country = address.get('country', '')
            code = address.get('country_code')
            zipcode = address.get('postcode')
            if city is not empty and state is not empty and country is not empty:
                row = (city,rows[0],rows[1],country,state)
                writer.writerow(row)

    print("number of cities are:", citycounter)
    print("number of towns picked are:", towncounter)
    print("number of regions picked are:", regioncounter)

df = pd.read_csv("Level3.csv")
df=pd.DataFrame(df, columns= ['city','homelat','homelon','homecontinent','state'])
print(df)
dups_color_and_shape = df.pivot_table(columns=['city'], aggfunc='size')

dups_color_and_shape.to_csv('level4.csv')
  
#can pass the address to the nomantin.