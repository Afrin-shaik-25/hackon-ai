from datetime import datetime
from sqlalchemy import Column, String, Integer, Text, DateTime, ForeignKey
from app.database import Base

class FacultyClass(Base):
    __tablename__ = "faculty_classes"

    id = Column(String(64), primary_key=True, index=True)
    faculty_id = Column(String(64), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    course_code = Column(String(64), nullable=False)
    course_name = Column(String(255), nullable=False)
    section = Column(String(32), default="Section A")
    schedule_time = Column(String(128), nullable=False)
    room = Column(String(64), nullable=False)
    enrolled_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)


class AcademicIntervention(Base):
    __tablename__ = "academic_interventions"

    id = Column(String(64), primary_key=True, index=True)
    faculty_id = Column(String(64), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    student_id = Column(String(64), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    student_name = Column(String(255), nullable=False)
    student_code = Column(String(64), nullable=False)
    faculty_name = Column(String(255), nullable=False)
    reason = Column(String(255), nullable=False)
    recommended_action = Column(Text, nullable=False)
    follow_up_date = Column(String(32), nullable=False)
    status = Column(String(32), default="Scheduled")  # Scheduled, In Progress, Completed, Deferred
    notes = Column(Text, nullable=True)
    private_notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class StudentDataImport(Base):
    __tablename__ = "student_data_imports"

    id = Column(String(64), primary_key=True, index=True)
    uploader_id = Column(String(64), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    source = Column(String(64), nullable=False)  # academics, attendance, assessments, lms, skills
    source_title = Column(String(255), nullable=False)
    file_name = Column(String(255), nullable=False)
    total_rows = Column(Integer, default=0)
    accepted_rows = Column(Integer, default=0)
    rejected_rows = Column(Integer, default=0)
    status = Column(String(32), default="Completed")  # Completed, Pending, Failed
    rejected_details_json = Column(Text, nullable=True)  # JSON array of reasons
    uploaded_at = Column(DateTime, default=datetime.utcnow)
