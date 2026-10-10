from typing import Optional
from pydantic import BaseModel, EmailStr, Field, ConfigDict

class ProfileResponse(BaseModel):
    id: str
    user_id: str
    college: Optional[str] = None
    department: Optional[str] = None
    phone: Optional[str] = None
    student_type: Optional[str] = None
    degree: Optional[str] = None
    branch: Optional[str] = None
    year: Optional[int] = None
    semester: Optional[int] = None
    student_id: Optional[str] = None
    employee_id: Optional[str] = None
    designation: Optional[str] = None
    company_name: Optional[str] = None
    industry: Optional[str] = None
    recruiter_role: Optional[str] = None
    verified: bool = True

    model_config = ConfigDict(from_attributes=True)

class UserResponse(BaseModel):
    id: str
    email: str
    role: str
    name: str
    avatar: Optional[str] = None
    is_active: bool = True
    profile: Optional[ProfileResponse] = None

    model_config = ConfigDict(from_attributes=True)

class UserRegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    name: str = Field(min_length=2)
    role: str = Field(pattern="^(student|faculty|graduate|company|admin)$")
    phone: Optional[str] = None
    
    # Student specific
    student_type: Optional[str] = "Undergraduate"
    college: Optional[str] = "Apex Institute of Technology"
    department: Optional[str] = "Computer Science"
    degree: Optional[str] = "B.Tech"
    branch: Optional[str] = "Computer Science & Engineering"
    year: Optional[int] = 3
    semester: Optional[int] = 5
    student_id: Optional[str] = None

    # Faculty specific
    employee_id: Optional[str] = None
    designation: Optional[str] = None

    # Graduate specific
    grad_degree: Optional[str] = None
    grad_year: Optional[int] = None
    grad_domain: Optional[str] = None

    # Company specific
    company_name: Optional[str] = None
    industry: Optional[str] = None
    recruiter_role: Optional[str] = None

class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str
    role: Optional[str] = None

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    user: UserResponse
