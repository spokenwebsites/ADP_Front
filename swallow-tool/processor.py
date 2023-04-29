import argparse
from utils import valid
from fileutil import FileUtil
import re
class SwallowProcessor:
    DigitalFileDescKey = 'Digital_File_Description'
    NewField_RecordingAvailable = 'is_video_available'
    LocationKey = 'Location'
    NewField_HostingPlatform = 'hosting_platform'

    
    @staticmethod
    def parseVideoRecordingFileUrl(obj):
        try:
            for entry in obj:
                if SwallowProcessor.DigitalFileDescKey not in entry:
                    continue
                is_video_available = 0
                for digitalFileDesc in entry[SwallowProcessor.DigitalFileDescKey]:
                    if digitalFileDesc['content_type'] == 'Video Recording' and len(digitalFileDesc['file_url']) > 0:
                        is_video_available = 1
                        break
                entry[SwallowProcessor.NewField_RecordingAvailable] = is_video_available
            return obj
        except:
            return obj
    
    @staticmethod
    def parseHostingPlatform(obj):
        # exportObj = {}
        try:
            for entry in obj:
                if SwallowProcessor.LocationKey not in entry:
                    continue
                for location in entry[SwallowProcessor.LocationKey]:
                    matches = re.findall('\s*\"([^"]+)"', location['notes'])
                    # if len(matches) > 0:
                    #     for m in matches:
                    #         if m not in exportObj:
                    #             exportObj[m] = []
                    #         exportObj[m].append(entry['swallow_id'])
                    location[SwallowProcessor.NewField_HostingPlatform] = matches[0:-1]
            # import json
            # with open("hosting_platform_to_swallow_ids.json", "w") as log_file:
            #     print(json.dumps(exportObj), file=log_file)
            return obj
        except:
            return obj

    @staticmethod
    def build(obj):
        obj = SwallowProcessor.parseVideoRecordingFileUrl(obj)
        return SwallowProcessor.parseHostingPlatform(obj)
        
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="""
    Use this script to process the main exported data collection.
    1. Parses the Digital_File_Description to collection information to know if the entry has a file url for video recording or not.
    """)
    parser.add_argument('-m', '--mainfile', default=None,
                        help='Swallow EXPORTED JSON',  required=True)
    parser.add_argument('-o', '--output', default=None,
                        help='output file',  required=True)

    args = parser.parse_args()

    mainfile = args.mainfile
    output = args.output

    if not valid(mainfile):
        raise Exception("mainfile is invalid!")
    if not valid(output):
        raise Exception("output is invalid!")

    obj = FileUtil.load_json(mainfile)
    obj = SwallowProcessor.build(obj)
    FileUtil.save_json(obj, output)
