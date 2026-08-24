from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from database import get_db
from models.user import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


SECRET_KEY = "임시비밀키_나중에_환경변수로_변경"
ALGORITHM = "HS256"


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=1)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="인증 정보가 유효하지 않습니다")
        return username
    except JWTError:
        raise HTTPException(status_code=401, detail="인증 정보가 유효하지 않습니다")
    
def get_current_admin(username: str = Depends(get_current_user), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user or not user.is_admin:
        raise HTTPException(status_code=403, detail="관리자 권한이 필요합니다")
    return user