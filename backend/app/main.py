from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.config import settings
from app.database import engine, Base, get_db
from app.routers import (
    auth_router,
    student_router,
    code_router,
    faculty_router,
    graduate_router,
    company_router,
    admin_router,
)
from app.seed import seed_database

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize tables and seed records on startup
    Base.metadata.create_all(bind=engine)
    if settings.DEMO_DATA_ENABLED:
        try:
            seed_database()
        except Exception as e:
            print(f"Startup seed notice: {e}")
    yield

app = FastAPI(
    title="StudyLens AI Backend API",
    description="Unified backend REST API service for StudyLens AI Student Analytics & Success Platform (HacXLerate 2026)",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
origins = settings.cors_origins_list
if "http://localhost:3000" not in origins:
    origins.append("http://localhost:3000")
if "http://127.0.0.1:3000" not in origins:
    origins.append("http://127.0.0.1:3000")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(auth_router)
app.include_router(student_router)
app.include_router(code_router)
app.include_router(faculty_router)
app.include_router(graduate_router)
app.include_router(company_router)
app.include_router(admin_router)

@app.get("/")
def root():
    return {
        "service": "StudyLens AI Backend API",
        "version": "1.0.0",
        "status": "online",
        "documentation": "/docs",
        "portal_gateways": {
            "student": "/api/student/dashboard",
            "faculty": "/api/faculty/dashboard",
            "graduate": "/api/graduate/dashboard",
            "company": "/api/company/dashboard",
            "admin": "/api/admin/dashboard",
            "code_sandbox": "/api/code/execute"
        }
    }

@app.get("/health")
@app.get("/api/health")
def health_check(db: Session = Depends(get_db)):
    is_pg = "postgres" in settings.DATABASE_URL
    db_type = "PostgreSQL (Supabase Transaction Pooler)" if is_pg else "SQLite (Local Dev)"
    try:
        db.execute(text("SELECT 1"))
        db_status = "healthy"
    except Exception as e:
        db_status = f"unhealthy: {str(e)}"

    return {
        "status": "healthy" if db_status == "healthy" else "degraded",
        "database": db_status,
        "database_type": db_type,
        "pooler_mode": "Transaction Mode (Port 6543)" if is_pg and ":6543" in settings.DATABASE_URL else "Direct/Session",
    }
