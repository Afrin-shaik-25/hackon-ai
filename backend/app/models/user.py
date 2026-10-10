from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String(64), primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(32), nullable=False, index=True)  # student, faculty, graduate, company, admin
    name = Column(String(255), nullable=False)
    avatar = Column(String(1024), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    profile = relationship("Profile", back_populates="user", uselist=False, cascade="all, delete-orphan")


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    
    # Common academic & institutional fields
    college = Column(String(255), nullable=True)
    department = Column(String(255), nullable=True)
    phone = Column(String(32), nullable=True)
    
    # Student specific
    student_type = Column(String(64), nullable=True)  # Undergraduate, Graduate
    degree = Column(String(128), nullable=True)        # B.Tech, M.Tech, etc.
    branch = Column(String(128), nullable=True)        # Computer Science & Engineering
    year = Column(Integer, nullable=True)              # 1, 2, 3, 4
    semester = Column(Integer, nullable=True)          # 1 to 8
    student_id = Column(String(64), nullable=True)     # Roll/Reg ID
    
    # Faculty specific
    employee_id = Column(String(64), nullable=True)
    designation = Column(String(128), nullable=True)
    
    # Company specific
    company_name = Column(String(255), nullable=True)
    industry = Column(String(255), nullable=True)
    recruiter_role = Column(String(128), nullable=True)
    
    # Verification standing
    verified = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="profile")
