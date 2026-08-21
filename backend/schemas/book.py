from pydantic import BaseModel, field_validator

class BookCreate(BaseModel):
    title: str
    author: str
    isbn: str
    quantity: int = 1
    
    @field_validator("title", "author", "isbn")
    @classmethod
    def not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError("빈 값은 입력할 수 없습니다")
        return v
    
class BookUpdate(BaseModel):
    title: str
    author: str
    isbn: str
    quantity: int
    
class BookResponse(BaseModel):
    id: int
    title: str
    author: str
    isbn: str
    quantity: int
    
    class Config:
        from_attributes = True