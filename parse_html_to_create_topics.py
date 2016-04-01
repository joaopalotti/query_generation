"""
Intructions: A folder with some html topic is giving as input to this program.
It then parses one by one of the original html posts and retrieves the initial user post,
generating a json file that is accepted by the query_generator django db
"""

import bs4
import sys
import json
import glob
from os import path

if len(sys.argv) < 1:
    print "python parse_html_to_create_topics.py folder_with_a_bunch_of_html_files"
    sys.exit(0)

inputf = sys.argv[1]
files = glob.glob(inputf + "/*.html")

def get_post(fname):
    f = open(fname, "r")
    soup = bs4.BeautifulSoup(f, "html.parser")

    mydivs = soup.findAll("div", { "class" : "thing" })
    d0 = mydivs[0]
    t = d0.findAll("a", { "class" : "title" })
    title = ""
    if len(t) > 0:
        title = t[0].get_text()

    c = d0.findAll("div", { "class" : "md" })
    content = ""
    if len(c) > 0:
        content = c[0].get_text()
    return title, content

rows = []
for j, fname in enumerate(files):

    row = {}
    title, post = get_post(fname)

    print "Processing topic %d: %s" % (j+1,fname)

    # fields used by query_generator
    row['title'] = title
    row['description'] = post
    row['qId'] = path.basename(fname).split(".html")[0]
    rows.append(row)

outfile = "topics_clef.json"
outf = open(outfile, "w")

json.dump(rows, outf,  sort_keys=True, indent=4, separators=(",",":"))
outf.close()
print "DONE: %s created." % (outfile)

