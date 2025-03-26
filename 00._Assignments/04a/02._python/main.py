from fastapi import FastAPI
from requests import get
from parser import parse_csv, parse_json

app = FastAPI()

# PARSER FOR CSV AND JSON
@app.get("/parsecsvPY")
def get_fast_api_parsing():
    data = parse_csv('./data.csv')
    return data
 
@app.get("/parsejsonPY")
def get_fast_api_parsing_json():
    data = parse_json('./data.json')
    return data
 
 
 # REQUESTING DATA FROM JS-SERVER
@app.get("/requestCSVData")
def get_request_data():
    response = get("http://localhost:8080/parsecsv").json()
    return response

@app.get("/requestJSONData")
def get_json_request_data():
    response = get("http://localhost:8080/parsejson").json()
    return response

