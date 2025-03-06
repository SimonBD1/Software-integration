from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import StreamingResponse
from datetime import datetime
import asyncio
import random


app = FastAPI()

templates = Jinja2Templates(directory="templates")


@app.get("/")
def serve_root_page(req: Request):
    return templates.TemplateResponse("index.html", {"request": req})


async def date_generator():
    while True:
        now = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
        yield f"data: {now}\n\n"
        await asyncio.sleep(1)
    
    
async def random_word_generator():
    words = ["Hello", "Ur momma", "FC SEJR", "Lars lars-dag", "Sniddy doin the griddy", "svaneflex", "Kødsovspizz", "Money talks", "Sig til lars seier det bliver en sejr lars", "Karry", "Kanin", "Køleskab", "Køkken", "København er byen", "hvor drenge bliver til mænd", "Big Mads Mikkelsen"]
    while True:
        word = random.choice(words)
        yield f"data: {word}\n\n"
        await asyncio.sleep(1)

@app.get("/sse")
def sse():
    return StreamingResponse(date_generator(), media_type="text/event-stream")

@app.get("/sse2")
def sse2():
    return StreamingResponse(random_word_generator(), media_type="text/event-stream")