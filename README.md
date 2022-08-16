# Frontend of the ADP

## User Experience Design
- currently available at website: https://adp.spokenweb.ca
- website that was created for the UX process: https://sites.google.com/view/archiveofthedigitalpresent/home 
- webflow prototype: https://adp-v12.webflow.io/

## How to build angular frontend locally from Server
- use SCP: 
```
scp -r username@alt.spokenweb.ca ~/www/adp path/to/local/dir  
```
- cd into ADP_Front/frontend_new, install angular using npm, build the angular components
```
 cd ADP_Front/frontend_new
 npm install  
 ng build   
```
## How to edit/bulk publish entries on strapi
- Strapi is temporarily accessible at https://strapi-adp.spokenweb.ca/admin
- Here entries can be added, deleted, edited, published etc. [It's a fairly intuitive website]
- cd into the strapi folder on the compute canada server at:
> ~/www/adp/strapidb/
- Use MySQL from command line: 
```
mysql -u sweb -p
```
- Enter the password
- Select the right database, look at the tables, select them and change the publishtime to now
```
use adpbase;
show tables;
select * from ...;
update ... SET published_at = now();
```
