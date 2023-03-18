import json
import pandas as pd

class FileUtil():
    @staticmethod
    def load_json(file_name: str) -> list:
        try:
            with open(file_name, "r") as file:
                obj = json.loads(file.read())
                return obj
        except:
            raise Exception("Error while reading %s"%file_name)

    @staticmethod
    def load_csv(file_name: str) -> pd.DataFrame:
        try:
            return pd.read_csv(file_name, header=0)
        except:
            raise Exception("Error while reading %s"%file_name)
        
    @staticmethod
    def save_json(obj, filename: str):
        with open(filename, "w") as file:
            print(json.dumps(obj), file=file)
            print("[New JSON] file saved at %s"%filename)