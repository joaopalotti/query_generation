# Information Retrieval Query Generation
Annotator toolkit for creating manual queries from clinical decision support scenarios.

Uses AnjularJS, Django

## Setup 

All the data was provided to in CSV format. The process to index with ElasticSearch was as follows:

- Run `./manage.py syncdb` to create the db. Follow the instructions.
- Run the `python import_patients.py db.sqlite3 all-trec-cds-topics.json` to import the set of queries. Or choose alternative JSON import file.
- Start the webserver with `./manage.py runserver`
- Go to `http://localhost:8000/<n>`, where `n` is the nth query you want to start annotating.

## Getting data out

See `http://localhost:8000/queries` for the REST get for all queries and corresponding keywords.
