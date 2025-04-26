from fastapi import APIRouter
from app.database import SessionLocal
from app.models.models import Category

router = APIRouter()

@router.get("/categories/")
def get_categories():
    db = SessionLocal()
    categories = db.query(Category).all()
    db.close()
    return categories
