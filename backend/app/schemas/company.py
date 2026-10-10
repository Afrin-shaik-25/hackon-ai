from typing import Optional, List
from pydantic import BaseModel
from app.schemas.graduate import JobPostingResponse, JobApplicationResponse

class JobPostingCreateRequest(BaseModel):
    title: str
    type: str = "Full-time"
    location: str
    remote: bool = False
    salary: str
    deadline: str
    required_skills: List[str]
    preferred_skills: List[str] = []
    experience: str = "0-2 years"
    description: str
    openings: int = 1

class CandidateStatusUpdateRequest(BaseModel):
    status: str  # Shortlisted, Interview, Selected, Rejected
    recruiter_notes: Optional[str] = None
    interview_date: Optional[str] = None

class CandidateTalentCard(BaseModel):
    id: str
    name: str
    degree: str
    branch: str
    college: str
    skills: List[str]
    match_score: int
    verified_projects_count: int
    standing: str

class CompanyDashboardResponse(BaseModel):
    company_name: str
    industry: str
    verification_status: str
    active_jobs_count: int
    total_applicants: int
    shortlisted_count: int
    interviews_scheduled_count: int
    active_jobs: List[JobPostingResponse]
    recent_applications: List[JobApplicationResponse]
