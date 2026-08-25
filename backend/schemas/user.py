from pydantic import BaseModel, EmailStr, field_validator

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    
    @field_validator("password")
    @classmethod
    def validate_password(cls, v):
        if len(v) < 5:
            raise ValueError("비밀번호는 5자리 이상이어야 합니다")
        return v
    
class UserLogin(BaseModel):
    username: str
    password: str
    
class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    
    class Config:
        from_attributes = True
        
class FindIdRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    username: str
    email: EmailStr
    new_password: str