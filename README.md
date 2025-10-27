# ADP (Archive of the Digital Present) Front-end

## User Experience Design
- Currently available at: https://adp.spokenweb.ca
- UX process: https://sites.google.com/view/archiveofthedigitalpresent/home 
- Webflow prototype: https://adp-v12.webflow.io/

## Docker container
- A Dockerfile / docker-compose / nginx.conf file allows you to build this inside a Docker container.

- To remove and clean up:
  - docker compose down -v

- To build the container:
  - docker compose build --no-cache
  - docker compose up -d

  - This should give you the ADP interface running locally in the container here: http://localhost:8080/
  - Note: currently, this connects to the live data set hosted in meilisearch

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
When building on the production server, run
$ ng build --prod 
```
