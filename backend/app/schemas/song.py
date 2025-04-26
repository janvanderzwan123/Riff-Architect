from pydantic import BaseModel

class SongSchema(BaseModel):
    id: int
    title: str

    class Config:
        orm_mode = True
