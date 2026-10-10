from app.routers.auth import router as auth_router
from app.routers.student import router as student_router
from app.routers.code import router as code_router
from app.routers.faculty import router as faculty_router
from app.routers.graduate import router as graduate_router
from app.routers.company import router as company_router
from app.routers.admin import router as admin_router

__all__ = [
    "auth_router",
    "student_router",
    "code_router",
    "faculty_router",
    "graduate_router",
    "company_router",
    "admin_router",
]
