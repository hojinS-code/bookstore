from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class LoanCreate(BaseModel):
    book_id: int
    
class BookInfo(BaseModel):
    title: str
    author: str
    
    class Config:
        from_attributes = True
class LoanResponse(BaseModel):
    id: int
    book_id: int
    user_id: int
    borrowed_at: datetime
    due_date: datetime
    returned_at: Optional[datetime] = None
    book: BookInfo
    
    class Config:
        from_attributes = True