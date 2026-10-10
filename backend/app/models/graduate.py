from datetime import datetime
from sqlalchemy import Column, String, Integer, Text, Boolean, DateTime, ForeignKey
from app.database import Base

class GraduateResume(Base):
    __tablename__ = "graduate_resumes"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    title = Column(String(255), default="Full Stack Software Engineer")
    summary = Column(Text, nullable=True)
    skills_json = Column(Text, nullable=False)        # JSON array
    experience_json = Column(Text, nullable=True)    # JSON array
    education_json = Column(Text, nullable=True)     # JSON array
    projects_json = Column(Text, nullable=True)      # JSON array
    ats_score = Column(Integer, default=85)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class GraduateProject(Base):
    __tablename__ = "graduate_projects"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    tech_json = Column(Text, nullable=False)          # JSON array
    github_url = Column(String(512), nullable=True)
    live_url = Column(String(512), nullable=True)
    verified = Column(Boolean, default=False)
    verified_by = Column(String(255), nullable=True)
    date = Column(String(32), default="2026-09-15")
    created_at = Column(DateTime, default=datetime.utcnow)


class AptitudeAttempt(Base):
    __tablename__ = "aptitude_attempts"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    category = Column(String(64), nullable=False)  # Quantitative, Logical Reasoning, Verbal, Technical
    score = Column(Integer, nullable=False)
    total_questions = Column(Integer, default=20)
    time_spent_secs = Column(Integer, default=600)
    passed = Column(Boolean, default=True)
    attempted_at = Column(DateTime, default=datetime.utcnow)


class MockInterview(Base):
    __tablename__ = "mock_interviews"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    role_targeted = Column(String(128), nullable=False)
    score = Column(Integer, default=82)
    feedback = Column(Text, nullable=False)
    strengths_json = Column(Text, nullable=False)     # JSON array
    improvements_json = Column(Text, nullable=False)  # JSON array
    conducted_at = Column(DateTime, default=datetime.utcnow)


class JobPosting(Base):
    __tablename__ = "job_postings"

    id = Column(String(64), primary_key=True, index=True)
    company_id = Column(String(64), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    company_name = Column(String(255), nullable=False)
    company_logo = Column(String(512), nullable=True)
    title = Column(String(255), nullable=False)
    type = Column(String(64), default="Full-time")  # Full-time, Internship, Contract
    location = Column(String(255), nullable=False)
    remote = Column(Boolean, default=False)
    salary = Column(String(128), nullable=False)
    deadline = Column(String(32), nullable=False)
    required_skills_json = Column(Text, nullable=False)  # JSON array
    preferred_skills_json = Column(Text, nullable=False) # JSON array
    experience = Column(String(64), default="0-1 years")
    description = Column(Text, nullable=False)
    openings = Column(Integer, default=1)
    status = Column(String(32), default="Active")  # Active, Draft, Closed
    created_at = Column(DateTime, default=datetime.utcnow)


class JobApplication(Base):
    __tablename__ = "job_applications"

    id = Column(String(64), primary_key=True, index=True)
    job_id = Column(String(64), ForeignKey("job_postings.id", ondelete="CASCADE"), nullable=False, index=True)
    candidate_id = Column(String(64), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    candidate_name = Column(String(255), nullable=False)
    candidate_email = Column(String(255), nullable=False)
    applied_date = Column(String(32), nullable=False)
    status = Column(String(32), default="Applied")  # Applied, Shortlisted, Interview, Selected, Rejected
    match_score = Column(Integer, default=80)
    matched_skills_json = Column(Text, nullable=False)
    missing_skills_json = Column(Text, nullable=False)
    recruiter_notes = Column(Text, nullable=True)
    interview_date = Column(String(64), nullable=True)
    resume_url = Column(String(512), nullable=True)
