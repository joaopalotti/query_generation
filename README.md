# Information Retrieval Query Generation
Annotator toolkit for creating manual queries from information retrieval experiments / systems.

Uses AnjularJS, Django

## Pre-requiments;
You should have at least the following packages installed on your machine: django==1.8 and djangorestframework
You can install them using pip:

> pip install djangorestframework django==1.8


## Setup 

All the data was provided to in CSV format. The process to setup is as follows:

- Run `./manage.py syncdb` to create the db. Follow the instructions.
- Run `python parse_txt_to_create_topics.py selection-50-queries/` to create a file called topics\_clef.json
- Run the `python import_patients.py db.sqlite3 topics_clef.json` to import the set of queries.
- Start the webserver with `./manage.py runserver`
- Go to `http://localhost:8000/<n>`, where `n` is the nth query you want to start annotating.

## Getting data out

See `http://localhost:8000/queries` for the REST get for all queries and corresponding keywords.
