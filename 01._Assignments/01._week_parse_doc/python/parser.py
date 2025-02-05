import csv
import json


filescsv = ['./data.csv']
filesjson = ['./data.json']


def parse_csv(filescsv):
    text = ''
    try:
        with open(filescsv, 'r', encoding='utf-8', errors='replace') as file:
            reader = csv.reader(file)
            for row in reader:
                text += ' '.join(row) + '\n'
    except Exception as e:
        print(f"Error parsing CSV file: {e}")
        return ''
    return text
    
print("CSV:\n",parse_csv(filescsv[0]))

def parse_json(filesjson):
    text = ''
    try:
        with open(filesjson, 'r', encoding='utf-8', errors='replace') as file:
            data = json.load(file)
            for key, value in data.items():
                text += f'{key}: {value}\n'
    except Exception as e:
        print(f"Error parsing JSON file: {e}")
        return ''
    return text
    
print("JSON:\n",parse_json(filesjson[0]))