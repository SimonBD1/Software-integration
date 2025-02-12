from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Data": "Hello world"}

@app.get("greet/{name}")
def read_item(name: str):
    return {"Data": f"Hello {name}"}

# Run the server
# uvicorn main:app --reload