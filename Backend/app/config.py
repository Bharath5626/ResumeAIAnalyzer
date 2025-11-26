from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    JWT_SECRET: str
    JWT_ALGORITHM: str = "HS256"
    DATABASE_URL: str = "sqlite:///./resume_ai.db"
    GEMINI_API_KEY: str | None = None

    class Config:
        env_file = ".env"

settings = Settings()
