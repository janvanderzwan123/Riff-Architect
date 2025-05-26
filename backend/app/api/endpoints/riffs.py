from fastapi import APIRouter, UploadFile, File, Form, HTTPException
import os
from app.database import SessionLocal
from app.models.models import Riff

router = APIRouter()

UPLOAD_DIR = "app/media/riffs/"

@router.get("/riffs/")
def get_riffs():
    db = SessionLocal()
    riffs = db.query(Riff).all()
    db.close()
    return riffs

@router.post("/riffs/upload/")
async def upload_riff(
    file: UploadFile = File(...),
    name: str = Form("Unnamed"),
    category: str = Form("Uncategorized")
):
    if not file.filename.endswith((".mp3", ".wav", ".webm")):
        raise HTTPException(status_code=400, detail="Invalid file type")
    
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    db = SessionLocal()
    new_riff = Riff(name=name, category=category, file_path=file_path)
    db.add(new_riff)
    db.commit()
    db.refresh(new_riff)
    db.close()

    return {"id": new_riff.id, "name": new_riff.name, "category": new_riff.category, "file_path": new_riff.file_path}
