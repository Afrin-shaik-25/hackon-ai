from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from app.database import Base

class CompanyProfile(Base):
    __tablename__ = "company_profiles"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    company_name = Column(String(255), nullable=False)
    industry = Column(String(255), nullable=False)
    website = Column(String(512), nullable=True)
    location = Column(String(255), nullable=True)
    description = Column(Text, nullable=True)
    verification_status = Column(String(32), default="Verified")  # Pending, Verified, Rejected
    verified_at = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
