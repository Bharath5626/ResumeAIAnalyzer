from typing import Annotated
from pydantic import BaseModel, EmailStr, constr

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: Annotated[str, constr(max_length=72)]

class UserLogin(BaseModel):
    email: EmailStr
    password: Annotated[str, constr(max_length=72)]

class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr

    class Config:
        from_attributes = True  # replaces orm_mode in Pydantic v2
