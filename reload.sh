rm db.sqlite3
./manage.py syncdb
./import_patients.py db.sqlite3 clef_topics.json
./manage.py runserver