from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user_schema import UserCreate
from app.utils.security import hash_password, verify_password, create_access_token

def create_user(db: Session, user_data: UserCreate):
    hashed = hash_password(user_data.password)
    user = User(full_name=user_data.full_name, email=user_data.email, hashed_password=hashed)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user

def login_user(user: User):
    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}
