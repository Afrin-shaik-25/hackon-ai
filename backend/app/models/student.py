from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class StudentEnrollment(Base):
    __tablename__ = "student_enrollments"

    id = Column(String(64), primary_key=True, index=True)
    student_id = Column(String(64), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    subject_id = Column(String(64), ForeignKey("subjects.id", ondelete="CASCADE"), nullable=False, index=True)
    semester = Column(Integer, nullable=False, index=True)
    academic_year = Column(String(32), default="2025-2026")
    
    internal_marks = Column(Float, default=0.0)
    external_marks = Column(Float, default=0.0)
    total_marks = Column(Float, default=0.0)
    max_marks = Column(Float, default=100.0)
    grade = Column(String(8), default="A")
    attendance_pct = Column(Float, default=90.0)
    credits = Column(Integer, default=4)
    status = Column(String(32), default="Enrolled")  # Enrolled, Completed, Backlog
    is_demo = Column(Boolean, default=True)


class StudentBacklog(Base):
    __tablename__ = "student_backlogs"

    id = Column(String(64), primary_key=True, index=True)
    student_id = Column(String(64), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    subject_id = Column(String(64), ForeignKey("subjects.id", ondelete="CASCADE"), nullable=False, index=True)
    originating_semester = Column(Integer, nullable=False, index=True)
    status = Column(String(32), default="Active")  # Active, Cleared
    attempts_count = Column(Integer, default=1)
    remarks = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    cleared_at = Column(DateTime, nullable=True)
    is_demo = Column(Boolean, default=True)


class AttendanceRecord(Base):
    __tablename__ = "attendance_records"

    id = Column(String(64), primary_key=True, index=True)
    student_id = Column(String(64), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    subject_code = Column(String(64), nullable=False)
    date = Column(String(32), nullable=False)
    status = Column(String(16), nullable=False)  # Present, Absent, Late
    topic = Column(String(255), nullable=False)


class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(String(64), primary_key=True, index=True)
    student_id = Column(String(64), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    title = Column(String(255), nullable=False)
    category = Column(String(64), default="MCQ")  # MCQ, Coding, Aptitude, Assignment
    subject_code = Column(String(64), nullable=False)
    score = Column(Float, nullable=False)
    max_score = Column(Float, default=100.0)
    date = Column(String(32), nullable=False)
    status = Column(String(32), default="Completed")  # Completed, Pending, Upcoming
    feedback = Column(Text, nullable=True)


class StudentTask(Base):
    __tablename__ = "student_tasks"

    id = Column(String(64), primary_key=True, index=True)
    student_id = Column(String(64), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    due_date = Column(String(32), nullable=False)
    priority = Column(String(16), default="medium")  # low, medium, high
    category = Column(String(32), default="Academic")  # Academic, Project, Assessment, Career
    completed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class StudentExam(Base):
    __tablename__ = "student_exams"

    id = Column(String(64), primary_key=True, index=True)
    student_id = Column(String(64), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    subject_code = Column(String(64), nullable=False)
    subject_name = Column(String(255), nullable=False)
    exam_date = Column(String(32), nullable=False)  # YYYY-MM-DD
    exam_time = Column(String(64), nullable=False)
    venue = Column(String(128), nullable=False)
    exam_type = Column(String(64), default="End-Semester")  # Mid-Term, End-Semester, Practical, Quiz
    reminder_enabled = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    notifications = relationship("ExamNotification", back_populates="exam", cascade="all, delete-orphan")


class ExamNotification(Base):
    __tablename__ = "exam_notifications"

    id = Column(String(64), primary_key=True, index=True)
    exam_id = Column(String(64), ForeignKey("student_exams.id", ondelete="CASCADE"), nullable=False)
    student_id = Column(String(64), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    scheduled_for = Column(String(64), nullable=False)  # YYYY-MM-DD HH:MM
    status = Column(String(32), default="Scheduled")    # Scheduled, Prepared, Sent
    channel = Column(String(64), default="Email & SMS Notification")
    message = Column(Text, nullable=False)
    days_before = Column(Integer, nullable=False)

    exam = relationship("StudentExam", back_populates="notifications")


class FocusSession(Base):
    __tablename__ = "focus_sessions"

    id = Column(String(64), primary_key=True, index=True)
    student_id = Column(String(64), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    duration_minutes = Column(Integer, nullable=False)
    target_task = Column(String(255), nullable=True)
    completed_at = Column(DateTime, default=datetime.utcnow)


class StudentFeedback(Base):
    __tablename__ = "student_feedbacks"

    id = Column(String(64), primary_key=True, index=True)
    student_id = Column(String(64), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    category = Column(String(64), nullable=False)  # Course Content, Teaching Quality, Infrastructure, Assessment, General
    subject_code = Column(String(64), nullable=True)
    rating = Column(Integer, nullable=False)        # 1 to 5
    comment = Column(Text, nullable=False)
    status = Column(String(32), default="Submitted") # Submitted, Under Review, Resolved
    created_at = Column(DateTime, default=datetime.utcnow)
