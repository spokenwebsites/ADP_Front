import argparse
from utils import valid
from logger import Logger
from merger import SwallowMerger
from fileutil import FileUtil
from processor import SwallowProcessor

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="""
    Use this script to merge the main exported data collection and new data collection by swallow_id. 
    """)
    parser.add_argument('-m', '--mainfile', default=None,
                        help='Swallow EXPORTED JSON',  required=True)
    parser.add_argument('-c', '--childfile', default=None,
                        help='New CSV file',  required=True)
    parser.add_argument('-o', '--output', default=None,
                        help='output file',  required=True)

    args = parser.parse_args()

    mainfile = args.mainfile
    childfile = args.childfile
    output = args.output

    if not valid(mainfile):
        raise Exception("mainfile is invalid!")
    if not valid(childfile):
        raise Exception("childfile is invalid!")
    if not valid(output):
        raise Exception("output is invalid!")

    logger = Logger()
    merger = SwallowMerger(mainfile, childfile, logger)
    obj = merger.build()
    obj = SwallowProcessor.build(obj)
    FileUtil.save_json(obj, output)
    logger.save()
