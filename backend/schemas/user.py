from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    
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