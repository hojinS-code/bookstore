from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime, timedelta

class Loan(Base):
    __tablename__="loans"
    
    id =  Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    book_id = Column(Integer, ForeignKey("books.id"))
    borrowed_at = Column(DateTime, default=datetime.utcnow)
    due_date = Column(DateTime, default=lambda: datetime.utcnow() + timedelta(days=7))
    returned_at = Column(DateTime, nullable=True)
    
    user = relationship("User")
    book = relationship("Book")