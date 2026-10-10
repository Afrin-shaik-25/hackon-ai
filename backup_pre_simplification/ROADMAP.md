# StudyLens AI — Frontend Development Roadmap

## Project Overview
StudyLens AI is an AI-powered Student Analytics and Success Platform developed for HacXLerate 2026. The platform integrates academic marks, biometric attendance, lab assessments, LMS engagement, and verified skill portfolios into an explainable **Student Success Score** (30/20/20/15/15 model). It identifies early risk patterns, coordinates intervention workflows, and bridges the gap to career readiness for students, graduates, faculty, and corporate recruiters.

---

## Evaluation Priority Weighting
- **Data Integration & Analysis** — 30% `[HIGH PRIORITY - COMPLETED]`
- **Student Success Score & Risk Identification** — 25% `[HIGH PRIORITY - COMPLETED]`
- **Dashboard & Visualization** — 25% `[HIGH PRIORITY - COMPLETED]`
- **Problem Understanding** — 10% `[COMPLETED]`
- **Presentation & Demo** — 10% `[COMPLETED]`

---

## Implementation Phases & Real Progress Status

### Phase 1: Inspection, Recovery & Environment Setup `[COMPLETED]`
- [x] Initialized Next.js 16 with App Router, TypeScript, Turbopack, and Tailwind CSS v4.
- [x] Installed `lucide-react`, `recharts`, `clsx`, `tailwind-merge`.
- [x] Configured project metadata, global styling tokens, and scrollbar utilities in `globals.css`.
- [x] Confirmed zero-error compilation with Turbopack.

### Phase 2: Design System, Core UI & Role-Aware Shell `[COMPLETED]`
- [x] Established curated color palette: deep indigo nav (`#1e293b`), emerald/teal analytics progress (`#0d9488`, `#10b981`), amber warning alert (`#f59e0b`), crimson danger (`#ef4444`).
- [x] Core accessible UI components: `Badge`, `Button`, `Card`, `Modal`, `Tabs`, `StatCard`, `RiskBadge`.
- [x] Reusable responsive `DataTable` with live client search, sortable headers, category filters, and pagination.
- [x] Central role-based navigation configuration in `src/lib/navigation.ts` supporting 5 distinct portals without unauthorized cross-portal links.
- [x] Shared `DashboardShell` with collapsible desktop sidebar, mobile responsive drawer, user menu, and notification pill.
- [x] Persistent `DemoBanner` with instant 1-click role switcher between Student, Faculty, Graduate, Company, and Platform Admin.
- [x] Global `AuthProvider` with persistent role selection and evaluation presets.

### Phase 3: Public Website & Authentication `[COMPLETED]`
- [x] **Landing Page** (`/`): Value proposition, 30/20/20/15/15 model explanation, interactive dashboard preview, CSV ingestion workflow, and ethical AI architecture.
- [x] **About Page** (`/about`): Problem statement, data fragmentation solution, and human-centric advising philosophy.
- [x] **Help & FAQ Page** (`/help`): Searchable, categorized FAQs covering accounts, calculations, CSV pipelines, and recruiter firewalls.
- [x] **Contact Page** (`/contact`): Validated institutional inquiry form with demo sandbox logging.
- [x] **Privacy & Ethics** (`/privacy`): Responsible AI guidelines, non-fatalistic scoring, and role-governed privacy boundaries.
- [x] **Terms of Service** (`/terms`): Platform evaluation agreement, Regain focus timer limitations, and verification disclaimers.
- [x] **Authentication Suite**:
  - `/login`: 1-click test role presets for all 5 personas, password toggle, validation.
  - `/signup`: Restricted to Student, Faculty, Graduate, and Company (Admin excluded from public signup).
  - `/forgot-password`, `/reset-password`, `/verify-email`.

### Phase 4: Faculty & Admin Analytics (Core 80% Weight) `[COMPLETED]`
- [x] **Faculty Dashboard** (`/faculty/dashboard`): Cohort totals, score distribution breakdown, trajectory cards, early risk alerts, and intervention action queue.
- [x] **5-Step CSV Ingestion Pipeline** (`/faculty/imports`): Source selection, upload, column schema mapping, validation preview with rejected rows analysis (e.g. invalid score 'AB', unenrolled ID), and batch audit history.
- [x] **Student Directory** (`/faculty/students`): Filterable directory by department, section, and risk tier; sortable columns; direct drill-down.
- [x] **Student Detail & Explainability** (`/faculty/students/[id]`): 5-pillar success gauge, identified risk indicators with evidence, subject marks breakdown, biometric logs, and "Log Support Intervention" modal.
- [x] **Risk Review Queue** (`/faculty/risks`): Multi-factor early warnings with configurable attendance threshold slider (75% bar).
- [x] **Intervention Tracking** (`/faculty/interventions`): Action creation, follow-up scheduling, progress completion, and private confidential faculty notes protected from recruiters.
- [x] **Performance Analytics** (`/faculty/analytics`): Interactive Recharts visualizations (Monthly score trajectory, Attendance vs marks scatter plot, Risk category distribution, and Data coverage matrix).
- [x] **Faculty Profile** (`/faculty/profile`): Teaching allocations, advising hours, and verification status.
- [x] **Platform Admin Portal** (`/admin/*`):
  - Dashboard (`/admin/dashboard`): Cross-consortium statistics and verification queues.
  - User Directory (`/admin/users`): Multi-role user administration.
  - Campus Onboarding (`/admin/colleges`): Tenant management and college provisioning modal.
  - KYC Queues (`/admin/faculty-verification`, `/admin/company-verification`): Review and approve/reject workflows.
  - Curricula & Assessments (`/admin/subjects`, `/admin/assessments`).
  - System Imports (`/admin/imports`): Global spreadsheet ingestion logs.
  - Demo Sandbox (`/admin/demo-data`): Deterministic data state reset.
  - Audit Trail (`/admin/audit-logs`): Tamper-evident system activity log.
  - Platform Settings (`/admin/settings`): Live Success Score weight distribution adjustments.

### Phase 5: Student Portal `[COMPLETED]`
- [x] **Student Dashboard** (`/student/dashboard`): Success score overview, attendance consistency, exam countdown, pending tasks, and quick action launches.
- [x] **Explainable Success Score** (`/student/success-score`): Transparent 30/20/20/15/15 weighting formula, raw vs weighted score breakdown, missing-data adjustments, and personalized improvement roadmap.
- [x] **Academics & Course Marks** (`/student/academics`): Semester filters, internal/external mark splits, grades, and credit tallies.
- [x] **Attendance Tracker** (`/student/attendance`): Overall percentage, subject-wise attendance bars, 75% compliance indicator, and biometric logs.
- [x] **Assessments & Practice** (`/student/assessments`): Interactive MCQ test module with question navigation, timer, code editor sandbox, and submit confirmation modal.
- [x] **Skills Passport** (`/student/skills`): Certified proficiencies backed by lab tests and GitHub capstones.
- [x] **Capstone Projects** (`/student/projects`): Repository showcase, faculty verification badges, AI project feedback, and new project submission modal.
- [x] **To-Do & Tasks** (`/student/tasks`): Academic task manager with filtering (all/pending/completed), priority flags, and task creation modal.
- [x] **Regain Focus Timer** (`/student/focus`): Deep work timer with Pomodoro presets, distraction app selection, countdown, and explicit architecture disclosure explaining browser sandboxing limitations.
- [x] **Exam Countdown** (`/student/exams`): Official paper timetable with hall allocations and add exam modal.
- [x] **Extracurricular Activities** (`/student/activities`): Hackathons, campus clubs, and registration workflow.
- [x] **Student Profile** (`/student/profile`): Enrollment dossier and recruiter privacy consent controls.

### Phase 6: Company & Recruiter Portal `[COMPLETED]`
- [x] Dedicated first-class portal for corporate employers (no standalone AI Assistant portal).
- [x] **Company Dashboard** (`/company/dashboard`): Verification banner, active job requisitions, applicant metrics, and pipeline stages.
- [x] **Company Profile & KYC** (`/company/profile`, `/company/verification`): Official website, recruiter contact, and corporate CIN verification review.
- [x] **Job Management** (`/company/jobs`, `/company/jobs/new`): Comprehensive requisition creator with required/preferred skills, salary, deadline, and status toggle.
- [x] **Candidate Discovery** (`/company/candidates`): Privacy-respecting directory of students with verified capstone deliverables and code evidence.
- [x] **Applications Pipeline** (`/company/applications`): Applied -> Shortlisted -> Interview -> Selected / Rejected stages with candidate inspection modal and recruiter notes.

### Phase 7: Graduate & Career Portal `[COMPLETED]`
- [x] Dedicated portal for alumni and job seekers separate from active student views.
- [x] **Graduate Dashboard** (`/graduate/dashboard`): Career Readiness Index (86/100), aptitude mastery, and recommended jobs.
- [x] **Resume Builder** (`/graduate/resume`): 4-step ATS-compatible resume creator (Personal, Education, Skills, Experience) with live preview and PDF export/print handler.
- [x] **Aptitude Practice** (`/graduate/aptitude`): Quantitative, Logical, and Verbal reasoning tests with instant step-by-step mathematical explanations.
- [x] **Mock Interview Simulator** (`/graduate/interviews`): Role-specific technical screening prompts (Full-Stack, Data Science, Systems) with text prompt response and feedback analysis.
- [x] **Jobs & Applications** (`/graduate/jobs`, `/graduate/applications`): Corporate job discovery, 1-click apply, and status tracking.
- [x] **Peer Groups & Feedback** (`/graduate/groups`, `/graduate/feedback`, `/graduate/profile`, `/graduate/skills`, `/graduate/projects`).

### Phase 8: Verification, Responsive QA & Build Verification `[COMPLETED]`
- [x] **Next.js Production Build**: All 63 routes generated statically and pre-rendered with **0 errors**.
- [x] **TypeScript Validation**: Strict type-checking verified with **0 errors**.
- [x] **ESLint Verification**: Evaluated with **0 errors**.
- [x] Zero broken links or non-functional placeholder buttons.
- [x] Clear demo sandbox labelling with honest technical disclaimers across all modules.

### Phase 9: Student-First Frontend Refinement `[COMPLETED]`
- [x] **Student Dashboard as Primary Experience**:
  - Set as default post-authentication landing screen (`/student/dashboard`) and primary CTA on public landing page.
  - Focused hierarchy with exactly 4 primary summary cards: Success Score (89/100), Attendance (92%), Academic Performance (88.4% Avg), and Assessments & LMS (3 completed, 0 overdue).
  - Transparent 30/20/20/15/15 Success Score breakdown with raw vs weighted points.
  - Skills & Verified Projects showcase and Regain Focus quick study launcher.
  - Interactive Study To-Do queue, Upcoming Exam timetable, and personalized next-step guidance.
- [x] **Simplified Faculty Experience**:
  - One unified Faculty Dashboard with 4 essential cards, 2 focused charts (trajectory and tier distribution), and a searchable/filterable student table.
  - Removed duplicate separate Risk Review Queue and Intervention Tracking links from the faculty navigation menu.
  - Consolidated follow-up actions and confidential advising notes directly into the Student Detail page (`/faculty/students/[id]`).
- [x] **Evidence-Based, Non-Fatalistic Terminology**:
  - Standardized status badges to "Needs Review", "May Need Support", and "Good Standing".
- [x] **Regain Focus Timer Compliance**:
  - Prominent "Focus Timer Demo — blocking integration not connected" notice and browser sandboxing disclosure.
- [x] **Zero Regressions & Full Route Integrity**:
  - 63 routes verified and build passing cleanly with 0 TypeScript/ESLint warnings or errors.

---

## Technical & Integration Summary
- **Backend / ERP Requirement**: Production deployment requires connecting institutional LMS/SIS endpoints to replace the synthetic deterministic dataset in `src/lib/demo-data/`.
- **Regain Focus Timer Blocking**: Native OS-level application restriction requires compiling the companion native Android accessibility service or installing our Chrome extension. Web sandbox displays appropriate disclaimers.
- **AI Feedback Services**: Project feedback and interview scoring operate in simulated demonstration mode; production requires supplying `OPENAI_API_KEY` or `GEMINI_API_KEY` for live generative model inference.

