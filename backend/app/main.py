from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth_routes
from app.database import Base, engine
from app.routes import ats_routes

app = FastAPI(
    title="ResumeAIAnalyzer API",
    version="1.0.0",
    description="AI-powered Resume ATS Analyzer API"
)

# ✅ Root endpoint
@app.get("/")
def root():
    return {
        "status": "running",
        "message": "ResumeAIAnalyzer API 🚀",
        "docs": "/docs",
        "health": "/health"
    }

# ✅ Health check endpoint
@app.get("/health")
def health():
    return {"status": "healthy"}

# ✅ Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "https://resumeaianalyzer-geqk.onrender.com",
        "https://resumeaianalyzer-geqk.onrender.com/docs",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Create tables
Base.metadata.create_all(bind=engine)

# ✅ Include routes
app.include_router(auth_routes.router)
app.include_router(ats_routes.router)