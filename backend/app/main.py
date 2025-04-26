from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models import models
from app.database import engine
from app.api.endpoints import riffs, songs, categories

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Middleware: Allow all CORS (for Electron frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(riffs.router, prefix="/api")
app.include_router(songs.router, prefix="/api")
app.include_router(categories.router, prefix="/api")

@app.get("/ping")
async def ping():
    return {"message": "pong"}
