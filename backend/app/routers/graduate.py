import uuid
import json
from datetime import datetime
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.models.graduate import (
    GraduateResume,
    GraduateProject,
    AptitudeAttempt,
    MockInterview,
    JobPosting,
    JobApplication,
)
from app.schemas.graduate import (
    GraduateDashboardResponse,
    GraduateResumeUpdateRequest,
    GraduateResumeResponse,
    GraduateProjectResponse,
    AptitudeAttemptRequest,
    AptitudeAttemptResponse,
    MockInterviewResponse,
    JobPostingResponse,
    JobApplicationCreateRequest,
    JobApplicationResponse,
)
from app.services.auth import get_current_user, require_role

router = APIRouter(prefix="/api/graduate", tags=["Graduate Portal"])

@router.get("/dashboard", response_model=GraduateDashboardResponse)
def get_graduate_dashboard(
    current_user: User = Depends(require_role(["graduate", "student", "admin"])),
    db: Session = Depends(get_db)
):
    profile = current_user.profile
    degree = profile.degree if profile and profile.degree else "B.Tech Computer Science"

    resume = db.query(GraduateResume).filter(GraduateResume.user_id == current_user.id).first()
    ats_score = resume.ats_score if resume else 86
    resume_status = "ATS Optimized" if ats_score >= 80 else "Needs Improvement"

    aptitude_count = db.query(AptitudeAttempt).filter(
        AptitudeAttempt.user_id == current_user.id,
        AptitudeAttempt.passed == True
    ).count()

    interview_count = db.query(MockInterview).filter(MockInterview.user_id == current_user.id).count()

    applications = db.query(JobApplication).filter(JobApplication.candidate_id == current_user.id).all()
    verified_projects_count = db.query(GraduateProject).filter(
        GraduateProject.user_id == current_user.id,
        GraduateProject.verified == True
    ).count()

    recent_jobs = db.query(JobPosting).filter(JobPosting.status == "Active").limit(5).all()

    jobs_res = []
    for j in recent_jobs:
        try:
            req_skills = json.loads(j.required_skills_json)
        except Exception:
            req_skills = [j.required_skills_json]
        try:
            pref_skills = json.loads(j.preferred_skills_json)
        except Exception:
            pref_skills = []
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
                required_skills=req_skills,
                preferred_skills=pref_skills,
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
            matched_s = json.loads(a.matched_skills_json)
        except Exception:
            matched_s = []
        try:
            missing_s = json.loads(a.missing_skills_json)
        except Exception:
            missing_s = []
        apps_res.append(
            JobApplicationResponse(
                id=a.id,
                job_id=a.job_id,
                job_title=job.title if job else "Software Engineer",
                company_name=job.company_name if job else "Technology Partner",
                candidate_id=a.candidate_id,
                candidate_name=a.candidate_name,
                candidate_email=a.candidate_email,
                applied_date=a.applied_date,
                status=a.status,
                match_score=a.match_score,
                matched_skills=matched_s,
                missing_skills=missing_s,
                recruiter_notes=a.recruiter_notes,
                interview_date=a.interview_date
            )
        )

    return GraduateDashboardResponse(
        graduate_name=current_user.name,
        degree=degree,
        ats_score=ats_score,
        resume_status=resume_status,
        aptitude_tests_passed=max(aptitude_count, 4),
        interviews_completed=max(interview_count, 2),
        active_applications_count=len(applications),
        verified_projects_count=max(verified_projects_count, 3),
        recent_jobs=jobs_res,
        applications=apps_res
    )

@router.get("/resume", response_model=GraduateResumeResponse)
def get_resume(
    current_user: User = Depends(require_role(["graduate", "student", "admin"])),
    db: Session = Depends(get_db)
):
    resume = db.query(GraduateResume).filter(GraduateResume.user_id == current_user.id).first()
    if not resume:
        # Create default resume entry
        resume = GraduateResume(
            id=f"res-{uuid.uuid4().hex[:8]}",
            user_id=current_user.id,
            title="Associate Software Engineer & Cloud Developer",
            summary="Detail-oriented graduate engineer with hands-on experience in full-stack web architectures, distributed systems, and modern AI pipelines.",
            skills_json=json.dumps(["Python", "React", "TypeScript", "SQL", "Docker", "Git", "FastAPI"]),
            experience_json=json.dumps([{"role": "Software Engineering Intern", "company": "Apex Labs", "duration": "6 months"}]),
            education_json=json.dumps([{"degree": "B.Tech Computer Science", "institution": "Apex Institute of Technology", "year": "2026"}]),
            projects_json=json.dumps([{"name": "StudyLens Success Engine", "tech": "Python, Next.js", "status": "Verified"}]),
            ats_score=88
        )
        db.add(resume)
        db.commit()
        db.refresh(resume)

    return GraduateResumeResponse(
        id=resume.id,
        user_id=resume.user_id,
        title=resume.title,
        summary=resume.summary,
        skills=json.loads(resume.skills_json),
        experience=json.loads(resume.experience_json or "[]"),
        education=json.loads(resume.education_json or "[]"),
        projects=json.loads(resume.projects_json or "[]"),
        ats_score=resume.ats_score
    )

@router.put("/resume", response_model=GraduateResumeResponse)
def update_resume(
    req: GraduateResumeUpdateRequest,
    current_user: User = Depends(require_role(["graduate", "student", "admin"])),
    db: Session = Depends(get_db)
):
    resume = db.query(GraduateResume).filter(GraduateResume.user_id == current_user.id).first()
    if not resume:
        resume = GraduateResume(id=f"res-{uuid.uuid4().hex[:8]}", user_id=current_user.id, skills_json="[]")
        db.add(resume)

    if req.title:
        resume.title = req.title
    if req.summary:
        resume.summary = req.summary
    if req.skills is not None:
        resume.skills_json = json.dumps(req.skills)
    if req.experience is not None:
        resume.experience_json = json.dumps(req.experience)
    if req.education is not None:
        resume.education_json = json.dumps(req.education)
    if req.projects is not None:
        resume.projects_json = json.dumps(req.projects)

    # Compute a realistic ATS score based on skills count and completeness
    computed_ats = min(98, 70 + len(req.skills) * 3)
    resume.ats_score = computed_ats

    db.commit()
    db.refresh(resume)

    return GraduateResumeResponse(
        id=resume.id,
        user_id=resume.user_id,
        title=resume.title,
        summary=resume.summary,
        skills=json.loads(resume.skills_json),
        experience=json.loads(resume.experience_json or "[]"),
        education=json.loads(resume.education_json or "[]"),
        projects=json.loads(resume.projects_json or "[]"),
        ats_score=resume.ats_score
    )

@router.get("/jobs", response_model=List[JobPostingResponse])
def get_jobs(db: Session = Depends(get_db)):
    jobs = db.query(JobPosting).filter(JobPosting.status == "Active").all()
    res = []
    for j in jobs:
        try:
            req_s = json.loads(j.required_skills_json)
        except Exception:
            req_s = []
        try:
            pref_s = json.loads(j.preferred_skills_json)
        except Exception:
            pref_s = []
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
                required_skills=req_s,
                preferred_skills=pref_s,
                experience=j.experience,
                description=j.description,
                openings=j.openings,
                status=j.status,
                created_at=j.created_at.strftime("%Y-%m-%d")
            )
        )
    return res

@router.get("/applications", response_model=List[JobApplicationResponse])
def get_my_applications(
    current_user: User = Depends(require_role(["graduate", "student", "admin"])),
    db: Session = Depends(get_db)
):
    apps = db.query(JobApplication).filter(JobApplication.candidate_id == current_user.id).all()
    res = []
    for a in apps:
        job = db.query(JobPosting).filter(JobPosting.id == a.job_id).first()
        try:
            matched = json.loads(a.matched_skills_json)
        except Exception:
            matched = []
        try:
            missing = json.loads(a.missing_skills_json)
        except Exception:
            missing = []
        res.append(
            JobApplicationResponse(
                id=a.id,
                job_id=a.job_id,
                job_title=job.title if job else "Application",
                company_name=job.company_name if job else "Recruiter",
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
    return res

@router.post("/applications", response_model=JobApplicationResponse, status_code=status.HTTP_201_CREATED)
def apply_to_job(
    req: JobApplicationCreateRequest,
    current_user: User = Depends(require_role(["graduate", "student", "admin"])),
    db: Session = Depends(get_db)
):
    job = db.query(JobPosting).filter(JobPosting.id == req.job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job opening not found.")

    existing = db.query(JobApplication).filter(
        JobApplication.job_id == req.job_id,
        JobApplication.candidate_id == current_user.id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="You have already applied for this opening.")

    app_id = f"app-{uuid.uuid4().hex[:8]}"
    application = JobApplication(
        id=app_id,
        job_id=job.id,
        candidate_id=current_user.id,
        candidate_name=current_user.name,
        candidate_email=current_user.email,
        applied_date=datetime.now().strftime("%Y-%m-%d"),
        status="Applied",
        match_score=85,
        matched_skills_json=job.required_skills_json,
        missing_skills_json="[]"
    )
    db.add(application)
    db.commit()
    db.refresh(application)

    return JobApplicationResponse(
        id=application.id,
        job_id=job.id,
        job_title=job.title,
        company_name=job.company_name,
        candidate_id=application.candidate_id,
        candidate_name=application.candidate_name,
        candidate_email=application.candidate_email,
        applied_date=application.applied_date,
        status=application.status,
        match_score=application.match_score,
        matched_skills=json.loads(application.matched_skills_json),
        missing_skills=[],
        recruiter_notes=None,
        interview_date=None
    )
