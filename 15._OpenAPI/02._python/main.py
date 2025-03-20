from fastapi import FastAPI
from routers import spacecrafts_router

app = FastAPI()
app.include_router(spacecrafts_router)