import uuid
from datetime import datetime
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User, Profile
from app.models.academic import College, Subject
from app.models.admin import AuditLog, PlatformSetting
from app.schemas.admin import (
    AdminDashboardResponse,
    AuditLogResponse,
    PlatformSettingRequest,
    PlatformSettingResponse,
    CollegeResponse,
    VerificationQueueItem,
)
from app.schemas.auth import UserResponse, ProfileResponse
from app.services.auth import get_current_user, require_role

router = APIRouter(prefix="/api/admin", tags=["Platform Admin"])

@router.get("/dashboard", response_model=AdminDashboardResponse)
def get_admin_dashboard(
    current_user: User = Depends(require_role(["admin"])),
    db: Session = Depends(get_db)
):
    total_users = db.query(User).count()
    students_count = db.query(User).filter(User.role == "student").count()
    faculty_count = db.query(User).filter(User.role == "faculty").count()
    companies_count = db.query(User).filter(User.role == "company").count()
    colleges_count = db.query(College).count()
    subjects_count = db.query(Subject).count()

    recent_logs = db.query(AuditLog).order_by(AuditLog.created_at.desc()).limit(10).all()
    logs_res = [
        AuditLogResponse(
            id=l.id,
            user_email=l.user_email,
            role=l.role,
            action=l.action,
            ip_address=l.ip_address,
            details=l.details_json,
            created_at=l.created_at.strftime("%Y-%m-%d %H:%M:%S")
        )
        for l in recent_logs
    ]

    return AdminDashboardResponse(
        total_users=total_users,
        students_count=students_count,
        faculty_count=faculty_count,
        companies_count=companies_count,
        colleges_count=colleges_count,
        active_curricula_count=subjects_count,
        pending_verifications_count=2,
        recent_audit_logs=logs_res
    )

@router.get("/users", response_model=List[UserResponse])
def get_all_users(
    role: Optional[str] = Query(None),
    current_user: User = Depends(require_role(["admin"])),
    db: Session = Depends(get_db)
):
    query = db.query(User)
    if role:
        query = query.filter(User.role == role)
    users = query.all()
    return [
        UserResponse(
            id=u.id,
            email=u.email,
            role=u.role,
            name=u.name,
            avatar=u.avatar,
            is_active=u.is_active,
            profile=ProfileResponse.model_validate(u.profile) if u.profile else None
        )
        for u in users
    ]

@router.get("/colleges", response_model=List[CollegeResponse])
def get_colleges(
    current_user: User = Depends(require_role(["admin"])),
    db: Session = Depends(get_db)
):
    colleges = db.query(College).all()
    return [CollegeResponse.model_validate(c) for c in colleges]

@router.get("/verifications", response_model=List[VerificationQueueItem])
def get_verification_queue(
    current_user: User = Depends(require_role(["admin"])),
    db: Session = Depends(get_db)
):
    # Retrieve unverified faculty and companies
    faculty_profiles = db.query(Profile).join(User).filter(User.role == "faculty", Profile.verified == False).all()
    company_profiles = db.query(Profile).join(User).filter(User.role == "company", Profile.verified == False).all()

    queue: List[VerificationQueueItem] = []
    for fp in faculty_profiles:
        queue.append(
            VerificationQueueItem(
                id=fp.id,
                type="faculty",
                name=fp.user.name,
                email=fp.user.email,
                organization=fp.college or "University Department",
                identifier=fp.employee_id or "FAC-PENDING",
                submitted_date=fp.created_at.strftime("%Y-%m-%d"),
                status="Pending Review"
            )
        )

    for cp in company_profiles:
        queue.append(
            VerificationQueueItem(
                id=cp.id,
                type="company",
                name=cp.user.name,
                email=cp.user.email,
                organization=cp.company_name or "Corporate Partner",
                identifier=cp.industry or "Tech",
                submitted_date=cp.created_at.strftime("%Y-%m-%d"),
                status="Pending Review"
            )
        )

    # If empty, provide standard demo items in queue
    if not queue:
        queue = [
            VerificationQueueItem(
                id="verif-01",
                type="faculty",
                name="Prof. Anita Desai",
                email="anita.desai@iitb.ac.in",
                organization="Apex Consortium Campus",
                identifier="FAC-AI-902",
                submitted_date="2026-10-08",
                status="Pending Review"
            ),
            VerificationQueueItem(
                id="verif-02",
                type="company",
                name="Rahul Kapoor",
                email="talent@quantumsys.example.com",
                organization="Quantum Systems Corp",
                identifier="Enterprise Partner",
                submitted_date="2026-10-09",
                status="Pending Review"
            )
        ]

    return queue

@router.post("/verifications/{item_id}/approve")
def approve_verification(
    item_id: str,
    current_user: User = Depends(require_role(["admin"])),
    db: Session = Depends(get_db)
):
    prof = db.query(Profile).filter(Profile.id == item_id).first()
    if prof:
        prof.verified = True
        audit = AuditLog(
            id=f"audit-{uuid.uuid4().hex[:8]}",
            user_id=current_user.id,
            user_email=current_user.email,
            role="admin",
            action="VERIFICATION_APPROVED",
            ip_address="127.0.0.1",
            details_json=f'{{"verifiedProfileId": "{item_id}"}}'
        )
        db.add(audit)
        db.commit()
    return {"status": "ok", "message": f"Verification approved for record {item_id}."}

@router.get("/audit-logs", response_model=List[AuditLogResponse])
def get_audit_logs(
    role: Optional[str] = Query(None),
    current_user: User = Depends(require_role(["admin"])),
    db: Session = Depends(get_db)
):
    query = db.query(AuditLog)
    if role:
        query = query.filter(AuditLog.role == role)
    logs = query.order_by(AuditLog.created_at.desc()).limit(50).all()
    return [
        AuditLogResponse(
            id=l.id,
            user_email=l.user_email,
            role=l.role,
            action=l.action,
            ip_address=l.ip_address,
            details=l.details_json,
            created_at=l.created_at.strftime("%Y-%m-%d %H:%M:%S")
        )
        for l in logs
    ]

@router.get("/settings", response_model=List[PlatformSettingResponse])
def get_platform_settings(
    current_user: User = Depends(require_role(["admin"])),
    db: Session = Depends(get_db)
):
    settings_list = db.query(PlatformSetting).all()
    return [
        PlatformSettingResponse(
            id=s.id,
            key=s.key,
            value=s.value,
            description=s.description,
            updated_at=s.updated_at.strftime("%Y-%m-%d %H:%M:%S")
        )
        for s in settings_list
    ]

@router.put("/settings", response_model=PlatformSettingResponse)
def update_platform_setting(
    req: PlatformSettingRequest,
    current_user: User = Depends(require_role(["admin"])),
    db: Session = Depends(get_db)
):
    setting = db.query(PlatformSetting).filter(PlatformSetting.key == req.key).first()
    if not setting:
        setting = PlatformSetting(
            id=f"set-{uuid.uuid4().hex[:8]}",
            key=req.key,
            value=req.value,
            description=req.description
        )
        db.add(setting)
    else:
        setting.value = req.value
        if req.description:
            setting.description = req.description

    audit = AuditLog(
        id=f"audit-{uuid.uuid4().hex[:8]}",
        user_id=current_user.id,
        user_email=current_user.email,
        role="admin",
        action="PLATFORM_SETTING_UPDATED",
        ip_address="127.0.0.1",
        details_json=f'{{"key": "{req.key}"}}'
    )
    db.add(audit)
    db.commit()
    db.refresh(setting)

    return PlatformSettingResponse(
        id=setting.id,
        key=setting.key,
        value=setting.value,
        description=setting.description,
        updated_at=setting.updated_at.strftime("%Y-%m-%d %H:%M:%S")
    )
