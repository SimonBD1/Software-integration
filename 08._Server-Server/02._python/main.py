from fastapi import FastAPI
from requests import get


app = FastAPI()

@app.get("/fastapiData")
def get_fast_api_data():
    return {"Data": "Hello world"}
 
@app.get("/requestData")
def get_request_data():
    response = get("http://localhost:8080/expressData").json()
    return response



#my_dict = {"name": "John", "age": 30, "city": "New York"}
#print(my_dict["age"])