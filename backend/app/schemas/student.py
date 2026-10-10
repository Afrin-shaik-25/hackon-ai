from typing import Optional, List
from pydantic import BaseModel, ConfigDict

class TaskCreateRequest(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: str
    priority: str = "medium"
    category: str = "Academic"

class TaskResponse(BaseModel):
    id: str
    student_id: str
    title: str
    description: Optional[str] = None
    due_date: str
    priority: str
    category: str
    completed: bool

    model_config = ConfigDict(from_attributes=True)

class ExamNotificationResponse(BaseModel):
    id: str
    scheduled_for: str
    status: str
    channel: str
    message: str
    days_before: int

    model_config = ConfigDict(from_attributes=True)

class ExamCreateRequest(BaseModel):
    subject_code: str
    subject_name: str
    exam_date: str
    exam_time: str
    venue: str
    exam_type: str = "End-Semester"
    reminder_enabled: bool = True

class ExamResponse(BaseModel):
    id: str
    student_id: str
    subject_code: str
    subject_name: str
    exam_date: str
    exam_time: str
    venue: str
    exam_type: str
    reminder_enabled: bool
    days_remaining: int
    notifications: List[ExamNotificationResponse] = []

    model_config = ConfigDict(from_attributes=True)

class SubjectUnitResponse(BaseModel):
    unit_number: int
    title: str
    topics: List[str]
    hours: int

class LearningMaterialResponse(BaseModel):
    title: str
    type: str
    file_size: str
    file_url: Optional[str] = None
    is_demo: bool = True

class VideoLectureResponse(BaseModel):
    title: str
    duration: str
    platform: str
    url: Optional[str] = None

class SubjectDetailResponse(BaseModel):
    id: str
    code: str
    name: str
    semester: int
    credits: int
    instructor: Optional[str] = None
    attendance: float = 90.0
    progress_percent: int = 75
    units: List[SubjectUnitResponse] = []
    notes: List[LearningMaterialResponse] = []
    video_lectures: List[VideoLectureResponse] = []
    is_demo: bool = True

class StudentEnrollmentResponse(BaseModel):
    id: str
    subject_code: str
    subject_name: str
    semester: int
    internal_marks: float
    external_marks: float
    total_marks: float
    max_marks: float
    grade: str
    attendance_pct: float
    credits: int
    status: str
    is_demo: bool = True

class StudentBacklogResponse(BaseModel):
    id: str
    subject_code: str
    subject_name: str
    originating_semester: int
    status: str  # Active, Cleared
    attempts_count: int
    remarks: Optional[str] = None
    is_demo: bool = True

class AttendanceRecordResponse(BaseModel):
    id: str
    date: str
    subject_code: str
    status: str
    topic: str

    model_config = ConfigDict(from_attributes=True)

class AssessmentResponse(BaseModel):
    id: str
    title: str
    category: str
    subject_code: str
    score: float
    max_score: float
    date: str
    status: str
    feedback: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

class FocusLogRequest(BaseModel):
    duration_minutes: int
    target_task: Optional[str] = None

class StudentProfileUpdateRequest(BaseModel):
    name: Optional[str] = None
    student_type: Optional[str] = None
    college: Optional[str] = None
    degree: Optional[str] = None
    branch: Optional[str] = None
    year: Optional[int] = None
    semester: Optional[int] = None
    student_id: Optional[str] = None
    avatar: Optional[str] = None

class StudentDashboardResponse(BaseModel):
    student_name: str
    avatar: Optional[str] = None
    student_type: str
    college: str
    degree: str
    branch: str
    semester: int
    student_id: str
    standing: str
    academic_indicator: str
    attendance_indicator: str
    assessment_indicator: str
    curriculum_credits: int
    progress_percent: int
    enrolled_subjects: List[StudentEnrollmentResponse]
    active_backlogs_count: int
    upcoming_exams: List[ExamResponse]
    tasks: List[TaskResponse]
    is_demo: bool = True

class StudentFeedbackCreateRequest(BaseModel):
    category: str
    subject_code: Optional[str] = None
    rating: int
    comment: str

class StudentFeedbackResponse(BaseModel):
    id: str
    student_id: str
    category: str
    subject_code: Optional[str] = None
    rating: int
    comment: str
    status: str
    created_at: str

    model_config = ConfigDict(from_attributes=True)
