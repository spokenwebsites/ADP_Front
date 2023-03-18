import argparse
import json
import pandas as pd
from utils import valid
import datetime
import os

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