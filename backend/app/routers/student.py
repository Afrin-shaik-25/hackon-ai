import json
import uuid
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User, Profile
from app.models.academic import Subject, SubjectUnit, LearningMaterial, VideoLecture
from app.models.student import (
    StudentEnrollment,
    StudentBacklog,
    AttendanceRecord,
    Assessment,
    StudentTask,
    StudentExam,
    ExamNotification,
    FocusSession,
    StudentFeedback,
)
from app.schemas.student import (
    StudentDashboardResponse,
    StudentEnrollmentResponse,
    StudentBacklogResponse,
    AttendanceRecordResponse,
    AssessmentResponse,
    SubjectDetailResponse,
    SubjectUnitResponse,
    LearningMaterialResponse,
    VideoLectureResponse,
    TaskCreateRequest,
    TaskResponse,
    ExamResponse,
    ExamNotificationResponse,
    FocusLogRequest,
    StudentProfileUpdateRequest,
    StudentFeedbackCreateRequest,
    StudentFeedbackResponse,
)
from app.schemas.auth import ProfileResponse, UserResponse
from app.services.auth import get_current_user, require_role
from app.services.exam_notifications import ExamNotificationService

router = APIRouter(prefix="/api/student", tags=["Student Portal"])

@router.get("/dashboard", response_model=StudentDashboardResponse)
def get_student_dashboard(
    current_user: User = Depends(require_role(["student", "admin"])),
    db: Session = Depends(get_db)
):
    profile = current_user.profile
    degree = profile.degree if profile and profile.degree else "B.Tech"
    branch = profile.branch if profile and profile.branch else "Computer Science & Engineering"
    college = profile.college if profile and profile.college else "Apex Institute of Technology"
    semester = profile.semester if profile and profile.semester else 5
    student_type = profile.student_type if profile and profile.student_type else "Undergraduate"
    student_id = profile.student_id if profile and profile.student_id else current_user.id

    # 1. Enrollments
    enrollments = db.query(StudentEnrollment).filter(
        StudentEnrollment.student_id == current_user.id,
        StudentEnrollment.semester == semester
    ).all()

    enrolled_res: List[StudentEnrollmentResponse] = []
    total_attendance = 0.0
    for e in enrollments:
        subject = db.query(Subject).filter(Subject.id == e.subject_id).first()
        subj_code = subject.code if subject else "CS501"
        subj_name = subject.name if subject else "Course Module"
        total_attendance += e.attendance_pct
        enrolled_res.append(
            StudentEnrollmentResponse(
                id=e.id,
                subject_code=subj_code,
                subject_name=subj_name,
                semester=e.semester,
                internal_marks=e.internal_marks,
                external_marks=e.external_marks,
                total_marks=e.total_marks,
                max_marks=e.max_marks,
                grade=e.grade,
                attendance_pct=e.attendance_pct,
                credits=e.credits,
                status=e.status,
                is_demo=e.is_demo
            )
        )

    # 2. Backlogs count
    active_backlogs_count = db.query(StudentBacklog).filter(
        StudentBacklog.student_id == current_user.id,
        StudentBacklog.status == "Active"
    ).count()

    # 3. Tasks
    tasks = db.query(StudentTask).filter(StudentTask.student_id == current_user.id).all()
    tasks_res = [TaskResponse.model_validate(t) for t in tasks]

    # 4. Upcoming Exams
    exams = db.query(StudentExam).filter(StudentExam.student_id == current_user.id).all()
    exams_res: List[ExamResponse] = []
    for ex in exams:
        # Prepare 5-day reminders if not already scheduled
        ExamNotificationService.prepare_5_day_reminders(db, ex)
        days_rem = ExamNotificationService.calculate_days_remaining(ex.exam_date)
        notifs = db.query(ExamNotification).filter(ExamNotification.exam_id == ex.id).all()
        exams_res.append(
            ExamResponse(
                id=ex.id,
                student_id=ex.student_id,
                subject_code=ex.subject_code,
                subject_name=ex.subject_name,
                exam_date=ex.exam_date,
                exam_time=ex.exam_time,
                venue=ex.venue,
                exam_type=ex.exam_type,
                reminder_enabled=ex.reminder_enabled,
                days_remaining=days_rem,
                notifications=[ExamNotificationResponse.model_validate(n) for n in notifs]
            )
        )

    avg_att = round(total_attendance / max(1, len(enrollments)), 1) if enrollments else 92.4
    att_label = f"{avg_att}% Regular" if avg_att >= 85 else f"{avg_att}% Need Attention"
    standing = "Good Standing" if active_backlogs_count == 0 else f"{active_backlogs_count} Active Backlog(s)"

    return StudentDashboardResponse(
        student_name=current_user.name,
        avatar=current_user.avatar,
        student_type=student_type,
        college=college,
        degree=degree,
        branch=branch,
        semester=semester,
        student_id=student_id,
        standing=standing,
        academic_indicator="Grade A+ (SGPA 8.84)",
        attendance_indicator=att_label,
        assessment_indicator="3 of 3 Tests Complete",
        curriculum_credits=19,
        progress_percent=78,
        enrolled_subjects=enrolled_res,
        active_backlogs_count=active_backlogs_count,
        upcoming_exams=exams_res,
        tasks=tasks_res,
        is_demo=True
    )

@router.get("/profile", response_model=UserResponse)
def get_student_profile(current_user: User = Depends(require_role(["student", "admin"]))):
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        role=current_user.role,
        name=current_user.name,
        avatar=current_user.avatar,
        is_active=current_user.is_active,
        profile=ProfileResponse.model_validate(current_user.profile) if current_user.profile else None
    )

@router.put("/profile", response_model=UserResponse)
def update_student_profile(
    req: StudentProfileUpdateRequest,
    current_user: User = Depends(require_role(["student", "admin"])),
    db: Session = Depends(get_db)
):
    if req.name:
        current_user.name = req.name
    if req.avatar:
        current_user.avatar = req.avatar

    profile = current_user.profile
    if not profile:
        profile = Profile(id=f"prof-{uuid.uuid4().hex[:8]}", user_id=current_user.id)
        db.add(profile)

    if req.student_type is not None:
        profile.student_type = req.student_type
    if req.college is not None:
        profile.college = req.college
    if req.degree is not None:
        profile.degree = req.degree
    if req.branch is not None:
        profile.branch = req.branch
    if req.year is not None:
        profile.year = req.year
    if req.semester is not None:
        profile.semester = req.semester
    if req.student_id is not None:
        profile.student_id = req.student_id

    db.commit()
    db.refresh(current_user)

    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        role=current_user.role,
        name=current_user.name,
        avatar=current_user.avatar,
        is_active=current_user.is_active,
        profile=ProfileResponse.model_validate(current_user.profile) if current_user.profile else None
    )

@router.get("/academics", response_model=List[StudentEnrollmentResponse])
def get_student_academics(
    semester: Optional[int] = Query(None, description="Optional semester filter"),
    academic_year: Optional[str] = Query(None, description="Optional academic year filter"),
    current_user: User = Depends(require_role(["student", "admin"])),
    db: Session = Depends(get_db)
):
    query = db.query(StudentEnrollment).filter(StudentEnrollment.student_id == current_user.id)
    if semester:
        query = query.filter(StudentEnrollment.semester == semester)
    if academic_year:
        query = query.filter(StudentEnrollment.academic_year == academic_year)
    enrollments = query.all()

    res = []
    for e in enrollments:
        subject = db.query(Subject).filter(Subject.id == e.subject_id).first()
        res.append(
            StudentEnrollmentResponse(
                id=e.id,
                subject_code=subject.code if subject else "CS501",
                subject_name=subject.name if subject else "Course Module",
                semester=e.semester,
                internal_marks=e.internal_marks,
                external_marks=e.external_marks,
                total_marks=e.total_marks,
                max_marks=e.max_marks,
                grade=e.grade,
                attendance_pct=e.attendance_pct,
                credits=e.credits,
                status=e.status,
                is_demo=e.is_demo
            )
        )
    return res

@router.get("/backlogs", response_model=List[StudentBacklogResponse])
def get_student_backlogs(
    current_user: User = Depends(require_role(["student", "admin"])),
    db: Session = Depends(get_db)
):
    backlogs = db.query(StudentBacklog).filter(StudentBacklog.student_id == current_user.id).all()
    res = []
    for b in backlogs:
        subj = db.query(Subject).filter(Subject.id == b.subject_id).first()
        res.append(
            StudentBacklogResponse(
                id=b.id,
                subject_code=subj.code if subj else "CS302",
                subject_name=subj.name if subj else "Backlog Course",
                originating_semester=b.originating_semester,
                status=b.status,
                attempts_count=b.attempts_count,
                remarks=b.remarks,
                is_demo=b.is_demo
            )
        )
    return res

@router.get("/subjects", response_model=List[SubjectDetailResponse])
def get_semester_subjects(
    semester: Optional[int] = Query(5, description="Academic semester (1 to 8)"),
    degree: Optional[str] = Query(None),
    branch: Optional[str] = Query(None),
    current_user: User = Depends(require_role(["student", "admin"])),
    db: Session = Depends(get_db)
):
    """
    Returns subjects, curriculum units, textbooks, handouts, and video lectures
    filtered dynamically by the student's degree, branch, and requested semester.
    """
    profile = current_user.profile
    target_degree = degree or (profile.degree if profile and profile.degree else "B.Tech")
    target_branch = branch or (profile.branch if profile and profile.branch else "Computer Science & Engineering")
    sem = semester or (profile.semester if profile and profile.semester else 5)

    subjects = db.query(Subject).filter(
        Subject.semester == sem,
        Subject.degree == target_degree,
        Subject.branch == target_branch
    ).all()

    # If database has no subjects for this exact branch, fallback to semester and degree
    if not subjects:
        subjects = db.query(Subject).filter(
            Subject.semester == sem,
            Subject.degree == target_degree
        ).all()

    # If still not found, fetch any subjects for this semester
    if not subjects:
        subjects = db.query(Subject).filter(Subject.semester == sem).all()

    res: List[SubjectDetailResponse] = []
    for s in subjects:
        units_res = []
        for u in s.units:
            try:
                top_list = json.loads(u.topics_json)
            except Exception:
                top_list = [u.topics_json]
            units_res.append(
                SubjectUnitResponse(
                    unit_number=u.unit_number,
                    title=u.title,
                    topics=top_list,
                    hours=u.hours
                )
            )

        notes_res = [
            LearningMaterialResponse(
                title=m.title,
                type=m.type,
                file_size=m.file_size,
                file_url=m.file_url,
                is_demo=m.is_demo
            )
            for m in s.learning_materials
        ]

        videos_res = [
            VideoLectureResponse(
                title=v.title,
                duration=v.duration,
                platform=v.platform,
                url=v.url
            )
            for v in s.video_lectures
        ]

        res.append(
            SubjectDetailResponse(
                id=s.id,
                code=s.code,
                name=s.name,
                semester=s.semester,
                credits=s.credits,
                instructor=s.instructor_name or "Faculty Department Lead",
                attendance=92.0,
                progress_percent=78 if sem == 5 else (100 if sem < 5 else 30),
                units=units_res,
                notes=notes_res,
                video_lectures=videos_res,
                is_demo=s.is_demo
            )
        )

    return res

@router.get("/attendance", response_model=List[AttendanceRecordResponse])
def get_attendance_records(
    current_user: User = Depends(require_role(["student", "admin"])),
    db: Session = Depends(get_db)
):
    records = db.query(AttendanceRecord).filter(AttendanceRecord.student_id == current_user.id).all()
    return [AttendanceRecordResponse.model_validate(r) for r in records]

@router.get("/assessments", response_model=List[AssessmentResponse])
def get_assessments(
    current_user: User = Depends(require_role(["student", "admin"])),
    db: Session = Depends(get_db)
):
    assessments = db.query(Assessment).filter(Assessment.student_id == current_user.id).all()
    return [AssessmentResponse.model_validate(a) for a in assessments]

@router.get("/tasks", response_model=List[TaskResponse])
def get_tasks(
    current_user: User = Depends(require_role(["student", "admin"])),
    db: Session = Depends(get_db)
):
    tasks = db.query(StudentTask).filter(StudentTask.student_id == current_user.id).all()
    return [TaskResponse.model_validate(t) for t in tasks]

@router.post("/tasks", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(
    req: TaskCreateRequest,
    current_user: User = Depends(require_role(["student", "admin"])),
    db: Session = Depends(get_db)
):
    task = StudentTask(
        id=f"tsk-{uuid.uuid4().hex[:8]}",
        student_id=current_user.id,
        title=req.title,
        description=req.description,
        due_date=req.due_date,
        priority=req.priority,
        category=req.category,
        completed=False
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return TaskResponse.model_validate(task)

@router.patch("/tasks/{task_id}/toggle", response_model=TaskResponse)
def toggle_task(
    task_id: str,
    current_user: User = Depends(require_role(["student", "admin"])),
    db: Session = Depends(get_db)
):
    task = db.query(StudentTask).filter(
        StudentTask.id == task_id,
        StudentTask.student_id == current_user.id
    ).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found or not owned by you.")
    task.completed = not task.completed
    db.commit()
    db.refresh(task)
    return TaskResponse.model_validate(task)

@router.delete("/tasks/{task_id}")
def delete_task(
    task_id: str,
    current_user: User = Depends(require_role(["student", "admin"])),
    db: Session = Depends(get_db)
):
    task = db.query(StudentTask).filter(
        StudentTask.id == task_id,
        StudentTask.student_id == current_user.id
    ).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found.")
    db.delete(task)
    db.commit()
    return {"status": "ok", "message": "Task removed."}

@router.get("/exams", response_model=List[ExamResponse])
def get_upcoming_exams(
    current_user: User = Depends(require_role(["student", "admin"])),
    db: Session = Depends(get_db)
):
    exams = db.query(StudentExam).filter(StudentExam.student_id == current_user.id).all()
    res: List[ExamResponse] = []
    for ex in exams:
        ExamNotificationService.prepare_5_day_reminders(db, ex)
        days_rem = ExamNotificationService.calculate_days_remaining(ex.exam_date)
        notifs = db.query(ExamNotification).filter(ExamNotification.exam_id == ex.id).all()
        res.append(
            ExamResponse(
                id=ex.id,
                student_id=ex.student_id,
                subject_code=ex.subject_code,
                subject_name=ex.subject_name,
                exam_date=ex.exam_date,
                exam_time=ex.exam_time,
                venue=ex.venue,
                exam_type=ex.exam_type,
                reminder_enabled=ex.reminder_enabled,
                days_remaining=days_rem,
                notifications=[ExamNotificationResponse.model_validate(n) for n in notifs]
            )
        )
    return res

@router.patch("/exams/{exam_id}/reminders", response_model=ExamResponse)
def toggle_exam_reminders(
    exam_id: str,
    current_user: User = Depends(require_role(["student", "admin"])),
    db: Session = Depends(get_db)
):
    ex = db.query(StudentExam).filter(
        StudentExam.id == exam_id,
        StudentExam.student_id == current_user.id
    ).first()
    if not ex:
        raise HTTPException(status_code=404, detail="Exam not found.")
    ex.reminder_enabled = not ex.reminder_enabled
    db.commit()
    db.refresh(ex)
    days_rem = ExamNotificationService.calculate_days_remaining(ex.exam_date)
    notifs = db.query(ExamNotification).filter(ExamNotification.exam_id == ex.id).all()
    return ExamResponse(
        id=ex.id,
        student_id=ex.student_id,
        subject_code=ex.subject_code,
        subject_name=ex.subject_name,
        exam_date=ex.exam_date,
        exam_time=ex.exam_time,
        venue=ex.venue,
        exam_type=ex.exam_type,
        reminder_enabled=ex.reminder_enabled,
        days_remaining=days_rem,
        notifications=[ExamNotificationResponse.model_validate(n) for n in notifs]
    )

@router.post("/focus")
def log_focus_session(
    req: FocusLogRequest,
    current_user: User = Depends(require_role(["student", "admin"])),
    db: Session = Depends(get_db)
):
    session = FocusSession(
        id=f"foc-{uuid.uuid4().hex[:8]}",
        student_id=current_user.id,
        duration_minutes=req.duration_minutes,
        target_task=req.target_task
    )
    db.add(session)
    db.commit()
    return {"status": "ok", "duration_minutes": req.duration_minutes, "message": "Focus session logged."}

@router.post("/feedback", response_model=StudentFeedbackResponse)
def submit_student_feedback(
    req: StudentFeedbackCreateRequest,
    current_user: User = Depends(require_role(["student", "admin"])),
    db: Session = Depends(get_db)
):
    if not (1 <= req.rating <= 5):
        raise HTTPException(status_code=400, detail="Rating must be between 1 and 5.")
    if not req.comment.strip():
        raise HTTPException(status_code=400, detail="Comment cannot be empty.")
    
    feedback = StudentFeedback(
        id=f"fb-{uuid.uuid4().hex[:8]}",
        student_id=current_user.id,
        category=req.category,
        subject_code=req.subject_code,
        rating=req.rating,
        comment=req.comment.strip(),
        status="Submitted"
    )
    db.add(feedback)
    db.commit()
    db.refresh(feedback)
    return StudentFeedbackResponse(
        id=feedback.id,
        student_id=feedback.student_id,
        category=feedback.category,
        subject_code=feedback.subject_code,
        rating=feedback.rating,
        comment=feedback.comment,
        status=feedback.status,
        created_at=feedback.created_at.strftime("%Y-%m-%d %H:%M") if feedback.created_at else ""
    )

@router.get("/feedback", response_model=List[StudentFeedbackResponse])
def get_student_feedbacks(
    current_user: User = Depends(require_role(["student", "admin"])),
    db: Session = Depends(get_db)
):
    query = db.query(StudentFeedback)
    if current_user.role != "admin":
        query = query.filter(StudentFeedback.student_id == current_user.id)
    feedbacks = query.order_by(StudentFeedback.created_at.desc()).all()
    return [
        StudentFeedbackResponse(
            id=f.id,
            student_id=f.student_id,
            category=f.category,
            subject_code=f.subject_code,
            rating=f.rating,
            comment=f.comment,
            status=f.status,
            created_at=f.created_at.strftime("%Y-%m-%d %H:%M") if f.created_at else ""
        )
        for f in feedbacks
    ]
