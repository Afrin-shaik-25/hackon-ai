from typing import Optional, List, Dict, Any
from pydantic import BaseModel, ConfigDict

class FacultyClassResponse(BaseModel):
    id: str
    course_code: str
    course_name: str
    section: str
    schedule_time: str
    room: str
    enrolled_count: int

    model_config = ConfigDict(from_attributes=True)

class AcademicInterventionCreateRequest(BaseModel):
    student_id: str
    student_name: str
    student_code: str
    reason: str
    recommended_action: str
    follow_up_date: str
    notes: Optional[str] = None
    private_notes: Optional[str] = None

class AcademicInterventionResponse(BaseModel):
    id: str
    faculty_id: str
    student_id: str
    student_name: str
    student_code: str
    faculty_name: str
    reason: str
    recommended_action: str
    follow_up_date: str
    status: str
    notes: Optional[str] = None
    private_notes: Optional[str] = None
    created_at: str

class StudentRosterItem(BaseModel):
    id: str
    student_id: str
    name: str
    email: str
    degree: str
    branch: str
    semester: int
    attendance_pct: float
    grade: str
    status: str
    risk_level: str

class FacultyDashboardResponse(BaseModel):
    faculty_name: str
    department: str
    college: str
    employee_id: str
    total_students: int
    active_classes_count: int
    pending_interventions_count: int
    cohort_distribution: Dict[str, int]
    assigned_classes: List[FacultyClassResponse]
    students_requiring_support: List[StudentRosterItem]

class FacultyProfileUpdateRequest(BaseModel):
    department: Optional[str] = None
    designation: Optional[str] = None
    college: Optional[str] = None
    name: Optional[str] = None

class FacultyProfileResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str
    employee_id: str
    department: str
    designation: str
    college: str
    phone: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)
