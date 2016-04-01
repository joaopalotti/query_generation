"""
Intructions: A folder with some txt topic is giving as input to this program.
It then parses one by one of the txt posts and retrieves the initial user post,
generating a json file that is accepted by the query_generator django db
"""

import sys
import json
import glob
from os import path

if len(sys.argv) < 1:
    print "python parse_txt_to_create_topics.py folder_with_a_bunch_of_html_files"
    sys.exit(0)

inputf = sys.argv[1]
files = glob.glob(inputf + "/*.txt")

def get_post(fname):
    f = open(fname, "r")
    lines = f.readlines()
    return lines[0] + "\n" + lines[3]

rows = []
for j, fname in enumerate(files):

    row = {}
    post = get_post(fname)

    print "Processing topic %d: %s" % (j+1,fname)

    # fields used by query_generator
    row['description'] = post
    row['queryType'] = "diagnosis"
    row['qId'] = path.basename(fname)
    rows.append(row)

outfile = "topics_clef.json"
outf = open(outfile, "w")

json.dump(rows, outf,  sort_keys=True, indent=4, separators=(",",":"))
outf.close()
print "DONE: %s created." % (outfile)

