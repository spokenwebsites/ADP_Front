import argparse
import json
from utils import valid
from logger import Logger
from fileutil import FileUtil

swallow_id = 'swallow_id'
swallow_id_col = 'n'

class SwallowMerger():
    def __init__(self, mainfile: str, childfile: str, logger:Logger):
        self.main_obj = FileUtil.load_json(mainfile)
        print("# of elements: %s"%(len(self.main_obj)))
        self.new_df = FileUtil.load_csv(childfile)
        print(self.new_df.head(5))
        self.logger = logger
        
    def build(self):
        for entry in self.main_obj:
            if swallow_id not in entry:
                self.logger.write("%s doesn't have %s"%(entry[swallow_id], swallow_id))
                continue
            current_entry_df = self.new_df[self.new_df[swallow_id_col] == float(entry[swallow_id])]
            # print(current_entry_df.values)
            if 'Location' not in entry:
                self.logger.write("%s entry doesn't have location at JSON file"%entry[swallow_id])
                continue
            if len(current_entry_df.values) == 0:
                self.logger.write("%s entry doesn't have parsed location at CSV file"%entry[swallow_id])
                continue
            for location in entry['Location']:
                for city, homelat, homelon, homecontinent, state, _ in current_entry_df.values:
                    location['city'] = city
                    location['homelat'] = homelat
                    location['homelon'] = homelon
                    location['homecontinent'] = homecontinent
                    location['state'] = state
        return self.main_obj

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
    FileUtil.save_json(obj, output)
    logger.save()
