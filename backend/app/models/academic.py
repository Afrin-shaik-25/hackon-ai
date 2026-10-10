from datetime import datetime
from sqlalchemy import Column, String, Integer, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class College(Base):
    __tablename__ = "colleges"

    id = Column(String(64), primary_key=True, index=True)
    name = Column(String(255), unique=True, nullable=False)
    code = Column(String(64), unique=True, nullable=False)
    location = Column(String(255), nullable=False)
    students_count = Column(Integer, default=0)
    faculty_count = Column(Integer, default=0)
    status = Column(String(64), default="Active")  # Active, Onboarding, Suspended
    created_at = Column(DateTime, default=datetime.utcnow)


class Subject(Base):
    __tablename__ = "subjects"

    id = Column(String(64), primary_key=True, index=True)
    code = Column(String(64), index=True, nullable=False)
    name = Column(String(255), nullable=False)
    degree = Column(String(128), default="B.Tech")
    branch = Column(String(128), default="Computer Science & Engineering")
    semester = Column(Integer, index=True, nullable=False)
    credits = Column(Integer, default=4)
    department = Column(String(128), default="Computer Science")
    instructor_name = Column(String(255), nullable=True)
    description = Column(Text, nullable=True)
    is_demo = Column(Boolean, default=True)

    units = relationship("SubjectUnit", back_populates="subject", cascade="all, delete-orphan")
    learning_materials = relationship("LearningMaterial", back_populates="subject", cascade="all, delete-orphan")
    video_lectures = relationship("VideoLecture", back_populates="subject", cascade="all, delete-orphan")


class SubjectUnit(Base):
    __tablename__ = "subject_units"

    id = Column(String(64), primary_key=True, index=True)
    subject_id = Column(String(64), ForeignKey("subjects.id", ondelete="CASCADE"), nullable=False)
    unit_number = Column(Integer, nullable=False)
    title = Column(String(255), nullable=False)
    topics_json = Column(Text, nullable=False)  # JSON array string
    hours = Column(Integer, default=8)

    subject = relationship("Subject", back_populates="units")


class LearningMaterial(Base):
    __tablename__ = "learning_materials"

    id = Column(String(64), primary_key=True, index=True)
    subject_id = Column(String(64), ForeignKey("subjects.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    type = Column(String(64), nullable=False)  # Handout, Cheat Sheet, Source Code, Lab Manual
    file_size = Column(String(64), default="2.5 MB")
    file_url = Column(String(512), nullable=True)
    is_demo = Column(Boolean, default=True)

    subject = relationship("Subject", back_populates="learning_materials")


class VideoLecture(Base):
    __tablename__ = "video_lectures"

    id = Column(String(64), primary_key=True, index=True)
    subject_id = Column(String(64), ForeignKey("subjects.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    duration = Column(String(64), default="45 mins")
    platform = Column(String(128), default="Institutional LMS")
    url = Column(String(512), nullable=True)

    subject = relationship("Subject", back_populates="video_lectures")
