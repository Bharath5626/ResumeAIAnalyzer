from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    JWT_SECRET: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    DATABASE_URL: str

    GEMINI_API_KEY: str   # 🔥 ADD THIS

    class Config:
        env_file = ".env"

settings = Settings()
