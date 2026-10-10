import uuid
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User, Profile
from app.models.admin import AuditLog
from app.schemas.auth import (
    UserRegisterRequest,
    UserLoginRequest,
    TokenResponse,
    UserResponse,
    ProfileResponse,
)
from app.services.auth import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user,
)

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(
    req: UserRegisterRequest,
    request: Request,
    db: Session = Depends(get_db)
):
    # Check if user already exists
    existing = db.query(User).filter(User.email == req.email.lower()).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this institutional email is already registered."
        )

    user_id = f"usr-{uuid.uuid4().hex[:8]}"
    hashed_pwd = hash_password(req.password)

    new_user = User(
        id=user_id,
        email=req.email.lower(),
        hashed_password=hashed_pwd,
        role=req.role,
        name=req.name,
        avatar=f"https://api.dicebear.com/7.x/initials/svg?seed={req.name}",
        is_active=True,
    )
    db.add(new_user)

    # Create associated profile based on role
    profile_id = f"prof-{uuid.uuid4().hex[:8]}"
    profile = Profile(
        id=profile_id,
        user_id=user_id,
        college=req.college,
        department=req.department,
        phone=req.phone,
        student_type=req.student_type if req.role == "student" else None,
        degree=req.degree if req.role == "student" else req.grad_degree if req.role == "graduate" else None,
        branch=req.branch if req.role == "student" else req.grad_domain if req.role == "graduate" else None,
        year=req.year if req.role == "student" else req.grad_year if req.role == "graduate" else None,
        semester=req.semester if req.role == "student" else None,
        student_id=req.student_id or (f"2026{req.role.upper()[:2]}{uuid.uuid4().hex[:4].upper()}" if req.role == "student" else None),
        employee_id=req.employee_id if req.role == "faculty" else None,
        designation=req.designation if req.role == "faculty" else None,
        company_name=req.company_name if req.role == "company" else None,
        industry=req.industry if req.role == "company" else None,
        recruiter_role=req.recruiter_role if req.role == "company" else None,
        verified=True
    )
    db.add(profile)

    # Audit Log
    client_ip = request.client.host if request.client else "127.0.0.1"
    audit = AuditLog(
        id=f"audit-{uuid.uuid4().hex[:8]}",
        user_id=user_id,
        user_email=req.email.lower(),
        role=req.role,
        action="USER_REGISTRATION",
        ip_address=client_ip,
        details_json=f'{{"role": "{req.role}", "name": "{req.name}"}}'
    )
    db.add(audit)

    db.commit()
    db.refresh(new_user)

    access_token = create_access_token(data={"sub": new_user.id, "role": new_user.role, "email": new_user.email})

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        role=new_user.role,
        user=UserResponse(
            id=new_user.id,
            email=new_user.email,
            role=new_user.role,
            name=new_user.name,
            avatar=new_user.avatar,
            is_active=new_user.is_active,
            profile=ProfileResponse.model_validate(new_user.profile) if new_user.profile else None
        )
    )

@router.post("/login", response_model=TokenResponse)
def login(
    req: UserLoginRequest,
    request: Request,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == req.email.lower()).first()
    if not user or not verify_password(req.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid institutional email or password."
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="This account has been deactivated. Please contact platform administrator."
        )

    # Optional role check if client asked for specific portal
    if req.role and req.role != user.role:
        # If user has a different primary role, notify them
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"This account is registered as '{user.role}', but you are logging into the '{req.role}' portal. Please select the correct portal."
        )

    client_ip = request.client.host if request.client else "127.0.0.1"
    audit = AuditLog(
        id=f"audit-{uuid.uuid4().hex[:8]}",
        user_id=user.id,
        user_email=user.email,
        role=user.role,
        action="USER_LOGIN",
        ip_address=client_ip,
        details_json=f'{{"role": "{user.role}"}}'
    )
    db.add(audit)
    db.commit()

    access_token = create_access_token(data={"sub": user.id, "role": user.role, "email": user.email})

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        role=user.role,
        user=UserResponse(
            id=user.id,
            email=user.email,
            role=user.role,
            name=user.name,
            avatar=user.avatar,
            is_active=user.is_active,
            profile=ProfileResponse.model_validate(user.profile) if user.profile else None
        )
    )

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        role=current_user.role,
        name=current_user.name,
        avatar=current_user.avatar,
        is_active=current_user.is_active,
        profile=ProfileResponse.model_validate(current_user.profile) if current_user.profile else None
    )

@router.post("/logout")
def logout(
    request: Request,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    client_ip = request.client.host if request.client else "127.0.0.1"
    audit = AuditLog(
        id=f"audit-{uuid.uuid4().hex[:8]}",
        user_id=current_user.id,
        user_email=current_user.email,
        role=current_user.role,
        action="USER_LOGOUT",
        ip_address=client_ip,
        details_json="{}"
    )
    db.add(audit)
    db.commit()
    return {"message": "Logged out successfully", "status": "ok"}
