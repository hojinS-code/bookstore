from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.loan import Loan
from models.book import Book
from models.user import User
from schemas.loan import LoanCreate, LoanResponse
from core.security import get_current_user
from datetime import datetime

router = APIRouter(prefix="/loans", tags=["loans"])

@router.post("/", response_model=LoanResponse)
def borrow_book(loan: LoanCreate, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    user = db.query(User).filter(User.username == current_user).first()
    book = db.query(Book).filter(Book.id == loan.book_id).first()
    
    if not book:
        raise HTTPException(status_code=404, detail="도서를 찾을 수 없습니다")
    if book.quantity <= 0:
        raise HTTPException(status_code=400, detail="대출 가능한 재고가 없습니다")
    
    new_loan = Loan(user_id=user.id, book_id=book.id)
    book.quantity -= 1
    db.add(new_loan)
    db.commit()
    db.refresh(new_loan)
    return new_loan

@router.get("/my", response_model=list[LoanResponse])
def my_loans(db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    user = db.query(User).filter(User.username == current_user).first()
    return db.query(Loan).filter(Loan.user_id == user.id, Loan.returned_at == None).all()

@router.post("/{loan_id}/return")
def return_book(loan_id: int, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    user = db.query(User).filter(User.username == current_user).first()
    loan = db.query(Loan).filter(Loan.id == loan_id, Loan.user_id == user.id).first()
    
    if not loan:
        raise HTTPException(status_code=404, detail="대출 기록을 찾을 수 없습니다")
    if loan.returned_at:
        raise HTTPException(status_code=400, detail="이미 반납된 도서입니다")
    
    loan.returned_at = datetime.utcnow()
    book = db.query(Book).filter(Book.id == loan.book_id).first()
    book.quantity += 1
    db.commit()
    return {"message": "반납이 완료되었습니다"} 