from pydantic import BaseModel

class RiffSchema(BaseModel):
    id: int
    name: str
    category: str

    class Config:
        orm_mode = True
