from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import os
from Routers import endpoint
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")

os.makedirs(STATIC_DIR, exist_ok=True)

app.mount(
    "/static",
    StaticFiles(directory=STATIC_DIR),
    name="static"
)
app.include_router(endpoint.router)
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173"], allow_methods=["*"], allow_headers=["*"])