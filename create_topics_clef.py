"""
Intructions: Once a list of topic ids from askdocs is entered, this program goes into one by one of the original posts and
retrieve it, generating a json file that is accepted by the query_generator django db
"""

import praw
import sys
import json

if len(sys.argv) < 1:
    print "python create_topics_clef.py file_with_a_postid_per_line"
    sys.exit(0)

inputf = open(sys.argv[1], "r")

def startclient():
    return praw.Reddit('my_test')
    #return r.get_subreddit('askdocs')

askdocs = startclient()

rows = []
for j, line in enumerate(inputf):

    row = {}
    postid = line.strip()
    submission = askdocs.get_submission(submission_id = postid)

    print "Processing topic %d: %s" % (j,postid)

    # fields used by query_generator
    row['description'] = submission.selftext
    row['queryType'] = "diagnosis"
    row['qId'] = j
    rows.append(row)
inputf.close()

outfile = "topics_clef.json"
outf = open(outfile, "w")

json.dump(rows, outf,  sort_keys=True, indent=4, separators=(",",":"))
outf.close()
print "DONE: %s created." % (outfile)

