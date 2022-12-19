import argparse
import json
import pandas as pd
from utils import valid
import datetime
import os

swallow_id_col = 'swallow_id'

# log file to track the errors
class Logger():
    def __init__(self) -> None:
        container_dir = "logs"
        if not os.path.exists(container_dir):
            os.mkdir(container_dir)
        self.log_file_name =  os.path.join(container_dir, "%d.logs.json"%datetime.datetime.now().timestamp())
        self.errors = []

    def write(self, error: str) -> None:
        self.errors.append(error)
    
    def save(self) -> None:
        with open(self.log_file_name, "w") as log_file:
            print(json.dumps(self.errors), file=log_file)
            print("[Logs] file saved at %s"%self.log_file_name)

def load_json(file_name: str) -> list:
    try:
        with open(file_name, "r") as file:
            obj = json.loads(file.read())
            return obj
    except:
        raise Exception("Error while reading %s"%file_name)

def load_csv(file_name: str) -> pd.DataFrame:
    try:
        return pd.read_csv(file_name, header=0)
    except:
        raise Exception("Error while reading %s"%file_name)

class SwallowMerger():
    def __init__(self, mainfile: str, childfile: str, logger:Logger):
        self.main_obj = load_json(mainfile)
        print("# of elements: %s"%(len(self.main_obj)))
        self.new_df = load_csv(childfile)
        self.logger = logger
        
    def build(self):
        for entry in self.main_obj:
            if swallow_id_col not in entry:
                logger.write("%s doesn't have %s"%(json.dumps(entry), swallow_id_col))
                continue
            current_entry_df = self.new_df[self.new_df[swallow_id_col] == int(entry[swallow_id_col])]
            if 'Location' not in entry:
                logger.write("%s doesn't have location"%entry[swallow_id_col])
                continue
            for location in entry['Location']:
                for city, homelat, homelon, homecontinent, state, _ in current_entry_df.values:
                    location['city'] = city
                    location['homelat'] = homelat
                    location['homelon'] = homelon
                    location['homecontinent'] = homecontinent
                    location['state'] = state


    def save(self, filename: str):
        with open(filename, "w") as file:
            print(json.dumps(self.main_obj), file=file)
            print("[New JSON] file saved at %s"%filename)
        

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
    merger.build()
    merger.save(output)
    logger.save()
