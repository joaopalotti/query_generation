import json
import sqlite3
import argparse

JSON_FILE = "some.json"
DB_FILE = "some.db"

def import_json(db_file, json_file):

	json_data = json.load(open(json_file))
	conn = sqlite3.connect(db_file)

	data = [] # list of values for single row

	c = conn.cursor()
	for item in json_data:
		row = [ item["qId"], item["title"], item["description"] ]
		c.execute('insert into restapp_query (qId, title, description) values (?,?,?)', row)
	conn.commit()
	c.close()


if __name__ == '__main__':
	argparser = argparse.ArgumentParser(description='Import JSON into sqlite')
	argparser.add_argument('db_file', help='The DB file.')
	argparser.add_argument('json_file', help='The JSON file to import.')
	args = argparser.parse_args()

	import_json(args.db_file, args.json_file)
