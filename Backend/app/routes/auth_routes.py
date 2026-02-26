from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas.user_schema import UserCreate, UserLogin
from app.services.auth_service import create_user, authenticate_user, login_user

router = APIRouter(prefix="/auth", tags=["Auth"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/signup")
def signup(user_data: UserCreate, db: Session = Depends(get_db)):
    try:
        print(f"[SIGNUP] Received data: full_name={user_data.full_name}, email={user_data.email}")
        user = create_user(db, user_data)
        return {"message": "User created", "user": user.email}
    except Exception as e:
        print(f"[SIGNUP ERROR] {type(e).__name__}: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    auth_user = authenticate_user(db, user.email, user.password)
    if not auth_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = login_user(auth_user)
    return token
