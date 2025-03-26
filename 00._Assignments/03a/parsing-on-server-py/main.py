from fastapi import FastAPI
from parser import parse_csv, parse_json

app = FastAPI()

@app.get("/")
def read_root():
    return {"Data": "Hello world"}

@app.get("/csv")
def read_csv():
    return {parse_csv('./data.csv')}

@app.get("/json")
def read_json():
    return {parse_json('./data.json')}


