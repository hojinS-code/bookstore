from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class LoanCreate(BaseModel):
    book_id: int
    
class LoanResponse(BaseModel):
    id: int
    book_id: int
    user_id: int
    borrowed_at: datetime
    returned_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True