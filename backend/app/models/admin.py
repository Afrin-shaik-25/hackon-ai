from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime
from app.database import Base

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), nullable=True, index=True)
    user_email = Column(String(255), nullable=True)
    role = Column(String(32), nullable=False)
    action = Column(String(128), nullable=False, index=True)
    ip_address = Column(String(64), default="127.0.0.1")
    details_json = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)


class PlatformSetting(Base):
    __tablename__ = "platform_settings"

    id = Column(String(64), primary_key=True, index=True)
    key = Column(String(128), unique=True, index=True, nullable=False)
    value = Column(Text, nullable=False)
    description = Column(String(255), nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
