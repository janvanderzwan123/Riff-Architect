from fastapi import APIRouter
from app.database import SessionLocal
from app.models.models import Song

router = APIRouter()

@router.get("/songs/")
def get_songs():
    db = SessionLocal()
    songs = db.query(Song).all()
    db.close()
    return songs
