from passlib.context import CryptContext
import hashlib
import bcrypt

pwd_context = CryptContext(
    schemes=["bcrypt"], 
    deprecated="auto",
    bcrypt__truncate_error=False  # ← add this
)

def _sha256_hex(value: str) -> str:
    """Hash a string with SHA-256 and return hex digest."""
    return hashlib.sha256(value.encode('utf-8')).hexdigest()

def _truncate_to_72_bytes(password: str) -> str:
    """Safely truncate a password to 72 bytes for bcrypt compatibility."""
    password_bytes = password.encode('utf-8')
    if len(password_bytes) <= 72:
        return password
    
    # Truncate to 72 bytes
    truncated_bytes = password_bytes[:72]
    
    # Handle potential UTF-8 character boundary issues
    # Try to decode, trimming back if we hit a partial character
    for trim in range(4):  # UTF-8 chars are max 4 bytes
        try:
            return truncated_bytes[:-trim if trim > 0 else None].decode('utf-8')
        except UnicodeDecodeError:
                continue
    
    # Fallback: return first 72 chars (should never reach here)
    return password[:72]

def hash_password(password: str) -> str:
    """
    Hash a password using SHA-256 pre-hashing + bcrypt.
    
    SHA-256 pre-hashing ensures we never exceed bcrypt's 72-byte limit
    while maintaining full password entropy. The hex digest is always 64 bytes.
    """
    password_hash = hashlib.sha256(password.encode('utf-8')).hexdigest()
    return bcrypt.hashpw(password_hash.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(plain: str, hashed: str) -> bool:
    plain_hash = hashlib.sha256(plain.encode('utf-8')).hexdigest()
    return bcrypt.checkpw(plain_hash.encode('utf-8'), hashed.encode('utf-8'))




from datetime import datetime, timedelta
from jose import jwt
from app.config import settings

def create_access_token(data: dict, expires_minutes: int = 60):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_minutes)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.ALGORITHM)
