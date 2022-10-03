# ADP (Archive of the Digital Present) Front-end

## User Experience Design
- Currently available at: https://adp.spokenweb.ca
- UX process: https://sites.google.com/view/archiveofthedigitalpresent/home 
- Webflow prototype: https://adp-v12.webflow.io/

## How to build Angular frontend locally from Server
- Use SCP to download the contents of the folder: 
```
$ scp -r username@alt.spokenweb.ca:~/www/adp path/to/local/dir  
```
- Follow the below commands to run the project:
```
$ cd ADP_Front/webapp
$ npm install  
$ ng build   
```
## How to edit/bulk publish entries on strapi
- Strapi is temporarily accessible at [https://strapi-adp.spokenweb.ca/admin](https://strapi-adp.spokenweb.ca/admin)
- Here, entries can be added, deleted, edited, published, etc. (It's a reasonably intuitive website)
- `cd` into the `strapi` directory on the compute canada server at:
> ~/www/adp/strapidb/
- Use MySQL from command line: 
```
$ mysql -u sweb -p
```
- Enter the password
- Please, select the correct database, look at the tables, select them and change the publish time to now:
```
use adpbase;
show tables;
select * from ...;
update ... SET published_at = now();
```
