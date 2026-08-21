from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class Loan(Base):
    __tablename__="loans"
    
    id =  Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    book_id = Column(Integer, ForeignKey("books.id"))
    borrowed_at = Column(DateTime, default=datetime.utcnow)
    returned_at = Column(DateTime, nullable=True)
    
    user = relationship("User")
    book = relationship("Book")