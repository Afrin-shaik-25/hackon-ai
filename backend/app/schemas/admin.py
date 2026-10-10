from typing import Optional, List, Dict, Any
from pydantic import BaseModel, ConfigDict

class AuditLogResponse(BaseModel):
    id: str
    user_email: Optional[str] = None
    role: str
    action: str
    ip_address: str
    details: Optional[str] = None
    created_at: str

class PlatformSettingRequest(BaseModel):
    key: str
    value: str
    description: Optional[str] = None

class PlatformSettingResponse(BaseModel):
    id: str
    key: str
    value: str
    description: Optional[str] = None
    updated_at: str

class CollegeResponse(BaseModel):
    id: str
    name: str
    code: str
    location: str
    students_count: int
    faculty_count: int
    status: str

    model_config = ConfigDict(from_attributes=True)

class VerificationQueueItem(BaseModel):
    id: str
    type: str  # faculty or company
    name: str
    email: str
    organization: str
    identifier: str  # employee ID or company domain
    submitted_date: str
    status: str

class AdminDashboardResponse(BaseModel):
    total_users: int
    students_count: int
    faculty_count: int
    companies_count: int
    colleges_count: int
    active_curricula_count: int
    pending_verifications_count: int
    recent_audit_logs: List[AuditLogResponse]
