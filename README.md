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
  - Note: you will need to populate the meilisearch index this connects to using the scripts and data in ETL container.
  - See: README in the ETL folder https://github.com/spokenwebsites/ADP_Front/tree/main/etl#readme
