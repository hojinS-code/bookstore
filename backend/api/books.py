from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.book import Book
from schemas.book import BookCreate, BookUpdate, BookResponse
from core.security import get_current_user, get_current_admin

router = APIRouter(prefix="/books", tags=["books"])

@router.get("/", response_model=list[BookResponse])
def get_books(db: Session = Depends(get_db)):
    return db.query(Book).all()

@router.get("/search/", response_model=list[BookResponse])
def search_books(q: str = "", db: Session = Depends(get_db)):
    if not q:
        return db.query(Book).all()
    return db.query(Book).filter(
        Book.title.ilike(f"%{q}%") | Book.author.ilike(f"%{q}%")
    ).all()

@router.get("/{book_id}", response_model=BookResponse)
def get_book(book_id: int, db: Session = Depends(get_db)):
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="도서를 찾을 수 없습니다")
    return book

@router.post("/", response_model=BookResponse)
def create_book(book: BookCreate, db: Session = Depends(get_db), current_user = Depends(get_current_admin)):
    new_book = Book(**book.dict())
    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    return new_book


@router.put("/{book_id}", response_model=BookResponse)
def update_book(book_id: int, book: BookUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_admin)):
    db_book = db.query(Book).filter(Book.id == book_id).first()
    if not db_book:
        raise HTTPException(status_code=404, detail="도서를 찾을 수 없습니다")
    for key, value in book.dict().items():
        setattr(db_book, key, value)
    db.commit()
    db.refresh(db_book)
    return db_book

@router.delete("/{book_id}")
def delete_book(book_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_admin)):
    db_book = db.query(Book).filter(Book.id == book_id).first()
    if not db_book:
        raise HTTPException(status_code=404, detail="도서를 찾을 수 없습니다")
    try:
        db.delete(db_book)
        db.commit()
    except Exception:
        db.rollback()
        raise HTTPException(status_code= 400, detail="대출 기록이 있는 도서는 삭제할 수 없습니다")
    return {"message": "삭제되었습니다"}