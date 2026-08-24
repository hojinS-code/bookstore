from database import SessionLocal
from models.user import User

db = SessionLocal()
users = db.query(User).all()
for user in users:
    print(user.username)
db.close()