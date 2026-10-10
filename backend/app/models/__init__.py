from app.models.user import User, Profile
from app.models.academic import College, Subject, SubjectUnit, LearningMaterial, VideoLecture
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
from app.models.faculty import FacultyClass, AcademicIntervention, StudentDataImport
from app.models.graduate import (
    GraduateResume,
    GraduateProject,
    AptitudeAttempt,
    MockInterview,
    JobPosting,
    JobApplication,
)
from app.models.company import CompanyProfile
from app.models.admin import AuditLog, PlatformSetting

__all__ = [
    "User",
    "Profile",
    "College",
    "Subject",
    "SubjectUnit",
    "LearningMaterial",
    "VideoLecture",
    "StudentEnrollment",
    "StudentBacklog",
    "AttendanceRecord",
    "Assessment",
    "StudentTask",
    "StudentExam",
    "ExamNotification",
    "FocusSession",
    "StudentFeedback",
    "FacultyClass",
    "AcademicIntervention",
    "StudentDataImport",
    "GraduateResume",
    "GraduateProject",
    "AptitudeAttempt",
    "MockInterview",
    "JobPosting",
    "JobApplication",
    "CompanyProfile",
    "AuditLog",
    "PlatformSetting",
]
