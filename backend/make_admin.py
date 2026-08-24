from database import SessionLocal
from models.user import User

db = SessionLocal()
username = input("관리자로 만들 아이디를 입력하세요: ")
user = db.query(User).filter(User.username == username).first()

if user:
    user.is_admin = True
    db.commit()
    print(f"{username} 계정이 관리자로 설정되었습니다!")
else:
    print("해당 아이디를 찾을 수 없습니다")
    
db.close()