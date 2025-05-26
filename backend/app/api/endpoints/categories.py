from fastapi import APIRouter, Form
from app.database import SessionLocal
from app.models.models import Category

router = APIRouter()

@router.get("/categories/")
def get_categories():
    db = SessionLocal()
    categories = db.query(Category).all()
    db.close()
    return categories

@router.post("/categories/")
def create_category(name: str = Form(...)):
    db = SessionLocal()
    new_category = Category(name=name)
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    db.close()
    return new_category
