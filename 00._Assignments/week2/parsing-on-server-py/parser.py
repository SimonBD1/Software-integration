import csv
import json

filecsv = './data.csv'
filejson = './data.json'

def parse_csv(filecsv):
    text = ''
    try:
        with open(filecsv, 'r', encoding='utf-8', errors='replace') as file:
            reader = csv.reader(file)
            for row in reader:
                text += ' '.join(row) + '\n'
    except Exception as e:
        print(f"Error parsing CSV file: {e}")
        return ''
    return text
    

def parse_json(filejson):
    text = ''
    try:
        with open(filejson, 'r', encoding='utf-8', errors='replace') as file:
            data = json.load(file)
            for key, value in data.items():
                text += f'{key}: {value}\n'
    except Exception as e:
        print(f"Error parsing JSON file: {e}")
        return ''
    return text