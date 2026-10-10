# StudyLens AI — Comprehensive Test Plan (Frontend, Python Backend & Supabase PostgreSQL)

## 1. Executive Summary & Scope

**StudyLens AI** is an enterprise AI-augmented educational intelligence and career progression platform. The application is built as a full-stack system consisting of:
1. **Frontend**: Next.js 16.4.0 (Turbopack, App Router, React 19, TypeScript, Tailwind CSS).
2. **Backend**: Python 3.14 / FastAPI REST API with SQLAlchemy 2.0 ORM and Pydantic v2 validation.
3. **Database**: Supabase Managed PostgreSQL (`aws-0-ap-northeast-2.pooler.supabase.com`) with transactional connection pooling on port `6543` and session-mode direct connection on port `5432` for Alembic migrations.

This test plan defines the testing methodology, prerequisites, feature-to-database mapping, test environments, and execution workflows across all **five user roles**:
- **Student**: Academic tracking, backlogs, multi-semester subjects, assessment tests, focus sessions, exam reminders, and real-time coding playground.
- **Faculty**: Cohort analytics, student risk identification, attendance/marks CSV batch import with row-level validation, and mentoring interventions.
- **Graduate**: Skill passports, ATS resume optimization, verified projects, aptitude evaluations, mock interview feedback, and job applications.
- **Company / Recruiter**: Verification status, job vacancy management, talent candidate discovery, and applicant pipeline progression.
- **Platform Admin**: System-wide statistics, college/campus directory, role verifications, curriculum configuration, platform settings, and audit logs.

---

## 2. Architecture & Feature Inventory Mapping

| Frontend Feature | Route | Backend API Endpoint | HTTP Method | Database Table(s) | Role Authorization |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Authentication: Login** | `/login` | `/api/auth/login` | `POST` | `users` | Public |
| **Authentication: Signup** | `/signup` | `/api/auth/register` | `POST` | `users`, `user_profiles` | Public |
| **Authentication: Current User** | Global / Header | `/api/auth/me` | `GET` | `users`, `user_profiles` | Authenticated |
| **Student Dashboard** | `/student/dashboard` | `/api/student/dashboard` | `GET` | `users`, `academic_records`, `student_tasks`, `upcoming_exams` | `student`, `admin` |
| **Student Academics** | `/student/academics` | `/api/student/academics` | `GET` | `academic_records` | `student`, `admin` |
| **Student Backlogs** | `/student/academics` | `/api/student/backlogs` | `GET` | `backlog_records` | `student`, `admin` |
| **Student Subjects** | `/student/subjects` | `/api/student/subjects` | `GET` | `curriculum_subjects`, `subject_units`, `study_notes`, `video_lectures` | `student`, `admin` |
| **Student Attendance** | `/student/attendance` | `/api/student/attendance` | `GET` | `attendance_records` | `student`, `admin` |
| **Student Assessments** | `/student/assessments` | `/api/student/assessments` | `GET` | `assessment_results` | `student`, `admin` |
| **Student Tasks** | `/student/tasks` | `/api/student/tasks` | `GET`, `POST` | `student_tasks` | `student`, `admin` |
| **Student Task Toggle** | `/student/tasks` | `/api/student/tasks/{id}/toggle` | `PATCH` | `student_tasks` | `student`, `admin` |
| **Student Task Delete** | `/student/tasks` | `/api/student/tasks/{id}` | `DELETE` | `student_tasks` | `student`, `admin` |
| **Upcoming Exams & Reminders** | `/student/exams` | `/api/student/exams` | `GET` | `upcoming_exams`, `exam_notifications` | `student`, `admin` |
| **Focus Session Logger** | `/student/focus` | `/api/student/focus` | `POST` | `focus_logs` | `student`, `admin` |
| **Code Runner Sandbox** | `/student/coding` | `/api/code/execute` | `POST` | Local Subprocess Execution (`python`, `gcc`, `javac`) | Authenticated |
| **Faculty Dashboard** | `/faculty/dashboard` | `/api/faculty/dashboard` | `GET` | `faculty_classes`, `users`, `user_profiles`, `academic_records` | `faculty`, `admin` |
| **Faculty Class Roster** | `/faculty/students` | `/api/faculty/classes` | `GET` | `faculty_classes` | `faculty`, `admin` |
| **Faculty Student Directory** | `/faculty/students` | `/api/faculty/students` | `GET` | `users`, `user_profiles`, `academic_records` | `faculty`, `admin` |
| **Faculty Interventions** | `/faculty/interventions` | `/api/faculty/interventions` | `GET`, `POST` | `faculty_interventions` | `faculty`, `admin` |
| **Faculty CSV Import** | `/faculty/imports` | `/api/faculty/import` | `POST` | `academic_records` | `faculty`, `admin` |
| **Graduate Dashboard** | `/graduate/dashboard` | `/api/graduate/dashboard` | `GET` | `graduate_resumes`, `aptitude_attempts`, `mock_interviews`, `job_postings`, `job_applications` | `graduate`, `admin` |
| **Graduate Resume & ATS** | `/graduate/resume` | `/api/graduate/resume` | `GET`, `PUT` | `graduate_resumes` | `graduate`, `admin` |
| **Graduate Job Discovery** | `/graduate/jobs` | `/api/graduate/jobs` | `GET` | `job_postings`, `company_profiles` | `graduate`, `admin` |
| **Graduate Applications** | `/graduate/applications` | `/api/graduate/applications` | `GET`, `POST` | `job_applications` | `graduate`, `admin` |
| **Company Dashboard** | `/company/dashboard` | `/api/company/dashboard` | `GET` | `company_profiles`, `job_postings`, `job_applications` | `company`, `admin` |
| **Company Job Postings** | `/company/jobs` | `/api/company/jobs` | `GET`, `POST` | `job_postings` | `company`, `admin` |
| **Company Talent Discovery** | `/company/candidates` | `/api/company/candidates` | `GET` | `users`, `user_profiles`, `graduate_resumes` | `company`, `admin` |
| **Company Application Pipeline** | `/company/applications` | `/api/company/applications` | `GET` | `job_applications` | `company`, `admin` |
| **Company Application Status** | `/company/applications` | `/api/company/applications/{id}/status` | `PATCH` | `job_applications` | `company`, `admin` |
| **Admin Dashboard** | `/admin/dashboard` | `/api/admin/dashboard` | `GET` | `users`, `colleges`, `audit_logs` | `admin` |
| **Admin User Directory** | `/admin/users` | `/api/admin/users` | `GET` | `users`, `user_profiles` | `admin` |
| **Admin Colleges** | `/admin/colleges` | `/api/admin/colleges` | `GET` | `colleges` | `admin` |
| **Admin Verifications Queue** | `/admin/faculty-verification` | `/api/admin/verifications` | `GET` | `verification_requests` | `admin` |
| **Admin Verification Approval** | `/admin/company-verification` | `/api/admin/verifications/{id}/approve` | `POST` | `verification_requests`, `company_profiles` | `admin` |
| **Admin Audit Logs** | `/admin/audit-logs` | `/api/admin/audit-logs` | `GET` | `audit_logs` | `admin` |
| **Admin Platform Settings** | `/admin/settings` | `/api/admin/settings` | `GET`, `PUT` | `platform_settings` | `admin` |

---

## 3. Test Methodology & Test Levels

### Level 1: Static Analysis, Types & Frontend Build
- **Tooling**: TypeScript compiler (`tsc --noEmit`), ESLint 9 (`eslint.config.mjs`), Next.js Turbopack (`next build`).
- **Goal**: Guarantee zero build-time type mismatches, zero broken imports, and that all 66 static and dynamic application routes prerender without runtime exceptions.

### Level 2: Backend API & Schema Contract Validation
- **Tooling**: `pytest`, `fastapi.testclient.TestClient`, `pydantic`.
- **Goal**: Verify every REST endpoint responds with correct HTTP status codes, validates required payloads, enforces Bearer JWT tokens, and returns data strictly adhering to Pydantic v2 schemas.

### Level 3: Real Supabase PostgreSQL Persistence & Integrity
- **Tooling**: SQLAlchemy 2.0 with PostgreSQL driver (`psycopg2-binary`), Alembic migrations.
- **Connection**:
  - App pooler: `postgresql://...aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres?sslmode=require` (using `NullPool`).
  - DDL migration direct connection: port `5432`.
- **Validation**:
  - Alembic version `e85139f30c83` applied to Supabase `public` schema.
  - Foreign key cascades and referential integrity between parent (`users`, `job_postings`) and child (`user_profiles`, `job_applications`) tables.
  - Unique email constraints rejection.
  - Transactional rollback on failed operations without corrupting database state.

### Level 4: End-to-End Integration Data Flow
- **Goal**: Validate that data created by an authenticated user travels from API input, through ORM validation, persists in Supabase PostgreSQL, and is faithfully retrieved across subsequent sessions and reboots.
- **Safety**: Isolates test records with synthetic prefixes (`test-student-...@studylens.test`), cleans up records post-execution, and never alters production or seed records.

### Level 5: Security & Reliability
- **Goal**:
  - Test SQL injection immunity using SQLMap-style injection vectors in authentication forms.
  - Verify Role-Based Access Control (RBAC): student cannot access admin or company endpoints.
  - Verify Insecure Direct Object Reference (IDOR) prevention: student cannot toggle or delete another user's private tasks.
  - Verify bcrypt password hashing (minimum 60-character bcrypt hash `$2b$...`, zero plaintext).

---

## 4. Test Environment Configuration & Credentials

### Backend Environment (`backend/.env`)
- `ENVIRONMENT=development`
- `DATABASE_URL=postgresql://postgres.eahricrphplmenwzntkg:***@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres?sslmode=require`
- `DIRECT_URL=postgresql://postgres.eahricrphplmenwzntkg:***@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres?sslmode=require`
- `JWT_SECRET=studylens_ai_production_jwt_secret_key_2026_secure`
- `JWT_ALGORITHM=HS256`
- `ACCESS_TOKEN_EXPIRE_MINUTES=1440`

### Seed Test Accounts in Supabase

| Role | Email | Password | Display Name / Identifier |
| :--- | :--- | :--- | :--- |
| **Student** | `student@studylens.ai` | `password123` | Arav Sharma (ID: `std-001`, Semester: 5) |
| **Faculty** | `faculty@studylens.ai` | `password123` | Dr. K. Raman (ID: `fac-101`, Dept: CSE) |
| **Graduate** | `graduate@studylens.ai` | `password123` | Sneha Mukherjee (ID: `grad-001`, Degree: B.Tech) |
| **Company** | `company@studylens.ai` | `password123` | NexaTech Systems (ID: `comp-201`, Verified) |
| **Admin** | `admin@studylens.ai` | `password123` | Dr. Suresh Rao (ID: `adm-001`, Superadmin) |

---

## 5. Execution Instructions

### A. Frontend Linting & Build Verification
```powershell
# In repository root
npm run lint
npx tsc --noEmit
npm run build
```

### B. Backend Pytest Execution against Supabase
```powershell
# In backend directory
cd backend
python -m pytest -v
```

### C. Launching Full Application Locally
```powershell
# Terminal 1 - Backend FastAPI Server
cd backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# Terminal 2 - Frontend Next.js Server
npm run dev
```
Navigate browser to: `http://localhost:3000`
