from typing import Optional, List, Any
from pydantic import BaseModel

class GraduateResumeUpdateRequest(BaseModel):
    title: Optional[str] = None
    summary: Optional[str] = None
    skills: List[str]
    experience: Optional[List[Any]] = None
    education: Optional[List[Any]] = None
    projects: Optional[List[Any]] = None

class GraduateResumeResponse(BaseModel):
    id: str
    user_id: str
    title: str
    summary: Optional[str] = None
    skills: List[str]
    experience: List[Any] = []
    education: List[Any] = []
    projects: List[Any] = []
    ats_score: int

class GraduateProjectResponse(BaseModel):
    id: str
    title: str
    description: str
    tech: List[str]
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    verified: bool
    verified_by: Optional[str] = None
    date: str

class AptitudeAttemptRequest(BaseModel):
    category: str
    score: int
    total_questions: int = 20
    time_spent_secs: int = 600

class AptitudeAttemptResponse(BaseModel):
    id: str
    category: str
    score: int
    total_questions: int
    time_spent_secs: int
    passed: bool
    attempted_at: str

class MockInterviewResponse(BaseModel):
    id: str
    role_targeted: str
    score: int
    feedback: str
    strengths: List[str]
    improvements: List[str]
    conducted_at: str

class JobPostingResponse(BaseModel):
    id: str
    company_id: str
    company_name: str
    company_logo: Optional[str] = None
    title: str
    type: str
    location: str
    remote: bool
    salary: str
    deadline: str
    required_skills: List[str]
    preferred_skills: List[str]
    experience: str
    description: str
    openings: int
    status: str
    created_at: str

class JobApplicationCreateRequest(BaseModel):
    job_id: str

class JobApplicationResponse(BaseModel):
    id: str
    job_id: str
    job_title: str
    company_name: str
    candidate_id: str
    candidate_name: str
    candidate_email: str
    applied_date: str
    status: str
    match_score: int
    matched_skills: List[str]
    missing_skills: List[str]
    recruiter_notes: Optional[str] = None
    interview_date: Optional[str] = None

class GraduateDashboardResponse(BaseModel):
    graduate_name: str
    degree: str
    ats_score: int
    resume_status: str
    aptitude_tests_passed: int
    interviews_completed: int
    active_applications_count: int
    verified_projects_count: int
    recent_jobs: List[JobPostingResponse]
    applications: List[JobApplicationResponse]
