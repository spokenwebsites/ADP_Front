
# import module
import csv
from numpy.core.fromnumeric import sort
import pandas as pd
from geopy.geocoders import Nominatim
import csv

# count_creators=[]
# df = pd.read_csv("only100.csv")
# data=df.sort_values(by='city',ascending=False)
# data=data.to_dict()
# for data['city'][1] in data:
#     count_creators =  {i:data['city'][1].count(i) for i in data['city'][1]}
#     print(count_creators)
#_table(columns=['city','homelat','homelon','homecontinent','state'], aggfunc='size')

df = pd.read_csv("Level3.csv")
df=pd.DataFrame(df, columns= ['city','homelat','homelon','homecontinent','state'])
getcitycount = df.pivot_table(columns=['city'], aggfunc='size')
data=getcitycount.to_dict()
arr_finaldata=[]
with open('Level3.csv', 'r', newline='') as file:
    header = ['city','homelat','homelon','homecontinent','state','n']
    with open('final.csv', 'w', encoding='UTF8', newline='') as f:
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



# arr_toronto=[]
# arr_ottawa=[]
# with open('Level3.csv', 'r', newline='') as file:
#     myreader = csv.reader(file, delimiter=',')
#     next(myreader, None)
#     for rows in myreader:
#         if "Old Toronto" in rows[0]:
#                 city = "Toronto"
#                 arr_toronto.append(city)
#         elif "(Old) Ottawa"  in rows[0]:
#               city="Ottawa" 
#               arr_ottawa.append(city)  
            
# print("ottawa in array is:",len(arr_ottawa))
# print("toronto in array is:",len(arr_toronto))




# # initialize Nominatim API
# geolocator = Nominatim(user_agent="ADP")
  
# address="123 Main Street, Los Angeles, CA 90034, USA"
# # address is a String e.g. 'Berlin, Germany'
# # addressdetails=True does the magic and gives you also the details 
# #211, Bernard O, Montreal, Quebec, Canada
# location = geolocator.geocode("123 Main Street, Los Angeles, CA 90034, USA")
# #235 Queens Quay West Toronto, ON, Canada

# print(location.address)


#123 S Main St, Los Angeles, California, 90012

geolocator = Nominatim(user_agent="ADP1")
  
# address="123 Main Street, Los Angeles, CA 90034, USA"
# # address is a String e.g. 'Berlin, Germany'
# # addressdetails=True does the magic and gives you also the details 
# #211, Bernard O, Montreal, Quebec, Canada
# location = geolocator.geocode("123 Main Street, Los Angeles, CA 90034, USA")
# #235 Queens Quay West Toronto, ON, Canada

# print(location.address)


  
# Latitude & Longitude input
# Latitude = "45.488682"
# Longitude = "-73.584259"


Latitude = "46.52262"
Longitude="-61.05652"

#45.488682,-73.584259 - No city variable in api, has county, region and town exists
#45.5573,-73.8954 - no city found.town:St-Eustache


  
location = geolocator.reverse(Latitude+","+Longitude)
  
address = location.raw['address']
  
# traverse the data


if address.get('city', '')!="":
    city = address.get('city','')
elif address.get('town','')!="":
     city = address.get('town','')
elif address.get('town')=="" and address.get('region','')!="":
    city=address.get('region','')

    state = address.get('state', '')
    country = address.get('country', '')
    code = address.get('country_code')
    zipcode = address.get('postcode')
    print('City : ', city)
    print('State : ', state)
    print('Country : ', country)
    print('Zip Code : ', zipcode)
    

# g = geocoder.osm([Latitude, Longitude], method='reverse')
# g.json['city']




# dups_color_and_shape.to_csv('counts.csv')




