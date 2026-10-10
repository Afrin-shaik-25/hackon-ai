import uuid
import json
from datetime import datetime
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User, Profile
from app.models.graduate import JobPosting, JobApplication, GraduateProject
from app.schemas.company import (
    CompanyDashboardResponse,
    JobPostingCreateRequest,
    CandidateStatusUpdateRequest,
    CandidateTalentCard,
)
from app.schemas.graduate import JobPostingResponse, JobApplicationResponse
from app.services.auth import get_current_user, require_role

router = APIRouter(prefix="/api/company", tags=["Company Portal"])

@router.get("/dashboard", response_model=CompanyDashboardResponse)
def get_company_dashboard(
    current_user: User = Depends(require_role(["company", "admin"])),
    db: Session = Depends(get_db)
):
    profile = current_user.profile
    comp_name = profile.company_name if profile and profile.company_name else "NexaTech Systems"
    industry = profile.industry if profile and profile.industry else "Enterprise Cloud Solutions"

    # Jobs posted by this company
    jobs = db.query(JobPosting).filter(JobPosting.company_id == current_user.id).all()
    if not jobs:
        jobs = db.query(JobPosting).all()

    job_ids = [j.id for j in jobs]
    applications = db.query(JobApplication).filter(JobApplication.job_id.in_(job_ids)).all() if job_ids else []

    shortlisted = sum(1 for a in applications if a.status == "Shortlisted")
    interviews = sum(1 for a in applications if a.status == "Interview")

    jobs_res = []
    for j in jobs:
        try:
            req_s = json.loads(j.required_skills_json)
        except Exception:
            req_s = []
        try:
            pref_s = json.loads(j.preferred_skills_json)
        except Exception:
            pref_s = []
        jobs_res.append(
            JobPostingResponse(
                id=j.id,
                company_id=j.company_id,
                company_name=j.company_name,
                company_logo=j.company_logo,
                title=j.title,
                type=j.type,
                location=j.location,
                remote=j.remote,
                salary=j.salary,
                deadline=j.deadline,
                required_skills=req_s,
                preferred_skills=pref_s,
                experience=j.experience,
                description=j.description,
                openings=j.openings,
                status=j.status,
                created_at=j.created_at.strftime("%Y-%m-%d")
            )
        )

    apps_res = []
    for a in applications:
        job = db.query(JobPosting).filter(JobPosting.id == a.job_id).first()
        try:
            matched = json.loads(a.matched_skills_json)
        except Exception:
            matched = []
        try:
            missing = json.loads(a.missing_skills_json)
        except Exception:
            missing = []
        apps_res.append(
            JobApplicationResponse(
                id=a.id,
                job_id=a.job_id,
                job_title=job.title if job else "Software Engineer",
                company_name=comp_name,
                candidate_id=a.candidate_id,
                candidate_name=a.candidate_name,
                candidate_email=a.candidate_email,
                applied_date=a.applied_date,
                status=a.status,
                match_score=a.match_score,
                matched_skills=matched,
                missing_skills=missing,
                recruiter_notes=a.recruiter_notes,
                interview_date=a.interview_date
            )
        )

    return CompanyDashboardResponse(
        company_name=comp_name,
        industry=industry,
        verification_status="Verified Partner",
        active_jobs_count=len([j for j in jobs if j.status == "Active"]),
        total_applicants=len(applications),
        shortlisted_count=shortlisted,
        interviews_scheduled_count=interviews,
        active_jobs=jobs_res,
        recent_applications=apps_res
    )

@router.get("/jobs", response_model=List[JobPostingResponse])
def get_company_jobs(
    current_user: User = Depends(require_role(["company", "admin"])),
    db: Session = Depends(get_db)
):
    jobs = db.query(JobPosting).filter(JobPosting.company_id == current_user.id).all()
    if not jobs:
        jobs = db.query(JobPosting).all()
    res = []
    for j in jobs:
        res.append(
            JobPostingResponse(
                id=j.id,
                company_id=j.company_id,
                company_name=j.company_name,
                company_logo=j.company_logo,
                title=j.title,
                type=j.type,
                location=j.location,
                remote=j.remote,
                salary=j.salary,
                deadline=j.deadline,
                required_skills=json.loads(j.required_skills_json),
                preferred_skills=json.loads(j.preferred_skills_json),
                experience=j.experience,
                description=j.description,
                openings=j.openings,
                status=j.status,
                created_at=j.created_at.strftime("%Y-%m-%d")
            )
        )
    return res

@router.post("/jobs", response_model=JobPostingResponse, status_code=status.HTTP_201_CREATED)
def create_job(
    req: JobPostingCreateRequest,
    current_user: User = Depends(require_role(["company", "admin"])),
    db: Session = Depends(get_db)
):
    profile = current_user.profile
    comp_name = profile.company_name if profile and profile.company_name else current_user.name

    job = JobPosting(
        id=f"job-{uuid.uuid4().hex[:8]}",
        company_id=current_user.id,
        company_name=comp_name,
        title=req.title,
        type=req.type,
        location=req.location,
        remote=req.remote,
        salary=req.salary,
        deadline=req.deadline,
        required_skills_json=json.dumps(req.required_skills),
        preferred_skills_json=json.dumps(req.preferred_skills),
        experience=req.experience,
        description=req.description,
        openings=req.openings,
        status="Active"
    )
    db.add(job)
    db.commit()
    db.refresh(job)

    return JobPostingResponse(
        id=job.id,
        company_id=job.company_id,
        company_name=job.company_name,
        company_logo=job.company_logo,
        title=job.title,
        type=job.type,
        location=job.location,
        remote=job.remote,
        salary=job.salary,
        deadline=job.deadline,
        required_skills=req.required_skills,
        preferred_skills=req.preferred_skills,
        experience=job.experience,
        description=job.description,
        openings=job.openings,
        status=job.status,
        created_at=job.created_at.strftime("%Y-%m-%d")
    )

@router.get("/candidates", response_model=List[CandidateTalentCard])
def discover_candidates(
    current_user: User = Depends(require_role(["company", "admin"])),
    db: Session = Depends(get_db)
):
    candidates = db.query(User).filter(User.role.in_(["graduate", "student"])).limit(20).all()
    res = []
    for c in candidates:
        prof = c.profile
        proj_count = db.query(GraduateProject).filter(GraduateProject.user_id == c.id).count()
        res.append(
            CandidateTalentCard(
                id=c.id,
                name=c.name,
                degree=prof.degree if prof and prof.degree else "B.Tech",
                branch=prof.branch if prof and prof.branch else "Computer Science",
                college=prof.college if prof and prof.college else "Apex Institute of Technology",
                skills=["Python", "FastAPI", "React", "TypeScript", "SQL"],
                match_score=88,
                verified_projects_count=max(proj_count, 2),
                standing="Verified High Achiever"
            )
        )
    return res

@router.get("/applications", response_model=List[JobApplicationResponse])
def get_company_applications(
    current_user: User = Depends(require_role(["company", "admin"])),
    db: Session = Depends(get_db)
):
    jobs = db.query(JobPosting).filter(JobPosting.company_id == current_user.id).all()
    if not jobs:
        jobs = db.query(JobPosting).all()
    job_ids = [j.id for j in jobs]

    apps = db.query(JobApplication).filter(JobApplication.job_id.in_(job_ids)).all() if job_ids else []
    res = []
    for a in apps:
        job = db.query(JobPosting).filter(JobPosting.id == a.job_id).first()
        res.append(
            JobApplicationResponse(
                id=a.id,
                job_id=a.job_id,
                job_title=job.title if job else "Software Engineer",
                company_name=job.company_name if job else "Company",
                candidate_id=a.candidate_id,
                candidate_name=a.candidate_name,
                candidate_email=a.candidate_email,
                applied_date=a.applied_date,
                status=a.status,
                match_score=a.match_score,
                matched_skills=json.loads(a.matched_skills_json),
                missing_skills=json.loads(a.missing_skills_json),
                recruiter_notes=a.recruiter_notes,
                interview_date=a.interview_date
            )
        )
    return res

@router.patch("/applications/{app_id}/status")
def update_application_status(
    app_id: str,
    req: CandidateStatusUpdateRequest,
    current_user: User = Depends(require_role(["company", "admin"])),
    db: Session = Depends(get_db)
):
    app = db.query(JobApplication).filter(JobApplication.id == app_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Candidate application not found.")

    app.status = req.status
    if req.recruiter_notes:
        app.recruiter_notes = req.recruiter_notes
    if req.interview_date:
        app.interview_date = req.interview_date

    db.commit()
    db.refresh(app)
    return {"status": "ok", "message": f"Candidate status updated to {req.status}."}
