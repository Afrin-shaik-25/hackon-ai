# StudyLens AI &mdash; Evaluator Credentials & Access Directory

This document contains synthetic evaluation credentials created specifically for testing and grading the StudyLens AI platform across all five user roles.

> **Important Security & Integrity Note:**
> All user accounts listed below are reproducible synthetic evaluation records. Passwords are never stored in plaintext — each account's password (`password123`) is hashed using industry-standard `bcrypt` (12 rounds) and persisted directly in the live Supabase PostgreSQL database. No personal data from real people is used.

---

## Quick Reference Summary

| Role | Portal URL | Test Accounts Count | Standard Password |
| :--- | :--- | :--- | :--- |
| **Student** | `http://localhost:3000/student/dashboard` | 20 Accounts | `password123` |
| **Faculty** | `http://localhost:3000/faculty/dashboard` | 10 Accounts | `password123` |
| **Graduate / Alumni** | `http://localhost:3000/graduate/dashboard` | 10 Accounts | `password123` |
| **Corporate Recruiter** | `http://localhost:3000/company/dashboard` | 5 Accounts | `password123` |
| **Platform Administrator** | `http://localhost:3000/admin/dashboard` | 1 Account | `password123` |

---

## 1. Student Accounts (20 Accounts &bull; Semesters 1 through 8)

Students have least-privilege access restricted exclusively to student features (Academics, Personalized Syllabus, Tasks, Focus Sessions, and Academic Feedback). They cannot access faculty, company, or admin functions.

| # | Email Login | Password | Name | Semester | Reg / Student ID | Phone |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `student01@studylens.ai` | `password123` | Synthetic Student 01 - Aarav | Semester 1 | STU2025001 | `9800000001` |
| 2 | `student02@studylens.ai` | `password123` | Synthetic Student 02 - Ananya | Semester 1 | STU2025002 | `9800000002` |
| 3 | `student03@studylens.ai` | `password123` | Synthetic Student 03 - Rohan | Semester 2 | STU2025003 | `9800000003` |
| 4 | `student04@studylens.ai` | `password123` | Synthetic Student 04 - Ishita | Semester 2 | STU2025004 | `9800000004` |
| 5 | `student05@studylens.ai` | `password123` | Synthetic Student 05 - Kabir | Semester 3 | STU2025005 | `9800000005` |
| 6 | `student06@studylens.ai` | `password123` | Synthetic Student 06 - Tanvi | Semester 3 | STU2025006 | `9800000006` |
| 7 | `student07@studylens.ai` | `password123` | Synthetic Student 07 - Aditya | Semester 4 | STU2025007 | `9800000007` |
| 8 | `student08@studylens.ai` | `password123` | Synthetic Student 08 - Meera | Semester 4 | STU2025008 | `9800000008` |
| 9 | `student09@studylens.ai` | `password123` | Synthetic Student 09 - Vihaan | Semester 5 | STU2025009 | `9800000009` |
| 10 | `student10@studylens.ai` | `password123` | Synthetic Student 10 - Diya | Semester 5 | STU2025010 | `9800000010` |
| 11 | `student11@studylens.ai` | `password123` | Synthetic Student 11 - Arjun | Semester 5 | STU2025011 | `9800000011` |
| 12 | `student12@studylens.ai` | `password123` | Synthetic Student 12 - Riya | Semester 6 | STU2025012 | `9800000012` |
| 13 | `student13@studylens.ai` | `password123` | Synthetic Student 13 - Devansh | Semester 6 | STU2025013 | `9800000013` |
| 14 | `student14@studylens.ai` | `password123` | Synthetic Student 14 - Sneha | Semester 6 | STU2025014 | `9800000014` |
| 15 | `student15@studylens.ai` | `password123` | Synthetic Student 15 - Siddharth | Semester 7 | STU2025015 | `9800000015` |
| 16 | `student16@studylens.ai` | `password123` | Synthetic Student 16 - Pooja | Semester 7 | STU2025016 | `9800000016` |
| 17 | `student17@studylens.ai` | `password123` | Synthetic Student 17 - Varun | Semester 7 | STU2025017 | `9800000017` |
| 18 | `student18@studylens.ai` | `password123` | Synthetic Student 18 - Neha | Semester 8 | STU2025018 | `9800000018` |
| 19 | `student19@studylens.ai` | `password123` | Synthetic Student 19 - Yash | Semester 8 | STU2025019 | `9800000019` |
| 20 | `student20@studylens.ai` | `password123` | Synthetic Student 20 - Kritika | Semester 8 | STU2025020 | `9800000020` |

*Original test student also preserved:* `arav.sharma@apex.edu` / `password123` (Semester 5).

---

## 2. Faculty Accounts (10 Accounts)

Faculty have access to their assigned cohorts, class rosters, academic interventions, and department profile updates.

| # | Email Login | Password | Name | Department | Employee ID | Phone |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `faculty01@studylens.ai` | `password123` | Dr. K. Raman | Computer Science & Engineering | FAC-CS-001 | `9810000001` |
| 2 | `faculty02@studylens.ai` | `password123` | Prof. S. Iyer | Computer Science & Engineering | FAC-CS-002 | `9810000002` |
| 3 | `faculty03@studylens.ai` | `password123` | Dr. Anita Desai | Information Technology | FAC-IT-003 | `9810000003` |
| 4 | `faculty04@studylens.ai` | `password123` | Prof. Rajesh Verma | Information Technology | FAC-IT-004 | `9810000004` |
| 5 | `faculty05@studylens.ai` | `password123` | Dr. Priya Nambiar | Data Science & AI | FAC-DS-005 | `9810000005` |
| 6 | `faculty06@studylens.ai` | `password123` | Prof. Amit Sengupta | Data Science & AI | FAC-DS-006 | `9810000006` |
| 7 | `faculty07@studylens.ai` | `password123` | Dr. Vikram Rao | Electronics & Communication | FAC-EC-007 | `9810000007` |
| 8 | `faculty08@studylens.ai` | `password123` | Prof. Neha Kapoor | Electrical Engineering | FAC-EE-008 | `9810000008` |
| 9 | `faculty09@studylens.ai` | `password123` | Dr. Manoj Joshi | Applied Mathematics & Computing | FAC-MA-009 | `9810000009` |
| 10 | `faculty10@studylens.ai` | `password123` | Prof. Sunita Roy | Humanities & Management | FAC-HU-010 | `9810000010` |

*Original test faculty also preserved:* `k.raman@apex.edu` / `password123`.

---

## 3. Graduate / Alumni Accounts (10 Accounts)

Graduates have access to career portals, 10-question Aptitude & Reasoning sets, 16-question Mock Interview simulator, job applications, and career profiles.

| # | Email Login | Password | Name | Degree / Specialization | Year | Phone |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `graduate01@studylens.ai` | `password123` | Sneha M. | B.Tech Computer Science | 2025 | `9820000001` |
| 2 | `graduate02@studylens.ai` | `password123` | Rohan K. | B.Tech Information Technology | 2025 | `9820000002` |
| 3 | `graduate03@studylens.ai` | `password123` | Ananya B. | B.Tech Data Science | 2025 | `9820000003` |
| 4 | `graduate04@studylens.ai` | `password123` | Siddharth P. | B.Tech Computer Science | 2026 | `9820000004` |
| 5 | `graduate05@studylens.ai` | `password123` | Tanvi N. | B.Tech Electronics & Comm | 2025 | `9820000005` |
| 6 | `graduate06@studylens.ai` | `password123` | Kabir S. | B.Tech Computer Science | 2026 | `9820000006` |
| 7 | `graduate07@studylens.ai` | `password123` | Pooja D. | B.Tech Information Technology | 2025 | `9820000007` |
| 8 | `graduate08@studylens.ai` | `password123` | Aditya V. | B.Tech Data Science | 2026 | `9820000008` |
| 9 | `graduate09@studylens.ai` | `password123` | Meera T. | B.Tech Computer Science | 2025 | `9820000009` |
| 10 | `graduate10@studylens.ai` | `password123` | Varun R. | B.Tech Computer Science | 2026 | `9820000010` |

*Original test graduate also preserved:* `sneha.m@graduate.example.com` / `password123`.

---

## 4. Corporate Partner Accounts (5 Accounts)

Recruiters have access to job publishing, applicant review, and candidate talent discovery. Internal student records (attendance, internal marks) remain protected by the privacy firewall.

| # | Email Login | Password | Recruiter / Company Name | Industry | Location | Phone |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `company01@studylens.ai` | `password123` | NexaTech Systems | Enterprise Cloud Solutions | Bengaluru, KA | `9830000001` |
| 2 | `company02@studylens.ai` | `password123` | CloudCore Dynamics | Distributed Telemetry & SRE | Hyderabad, TS | `9830000002` |
| 3 | `company03@studylens.ai` | `password123` | DataVantage AI | Predictive Analytics & LLMs | Pune, MH | `9830000003` |
| 4 | `company04@studylens.ai` | `password123` | CyberShield Labs | Enterprise Cybersecurity & DevSecOps | Mumbai, MH | `9830000004` |
| 5 | `company05@studylens.ai` | `password123` | QuantumBit Solutions | High Performance Computing & FinTech | Gurugram, HR | `9830000005` |

*Original test company also preserved:* `recruitment@nexatech.example.com` / `password123`.

---

## 5. Platform Administrator Account (1 Account)

Administrators have full system rights to manage users, colleges, subjects, assessments, audit logs, and global platform weights.

| Email Login | Password | Name | Department | Phone |
| :--- | :--- | :--- | :--- | :--- |
| `admin@studylens.ai` | `password123` | Platform Administrator &bull; Antigravity Root | Academic Operations &amp; QA | `9899999999` |

*Original test admin also preserved:* `admin@apex.edu` / `password123`.

---

## Instructions for Evaluators

1. Visit the web application at `http://localhost:3000/login`.
2. Select any role preset or enter one of the credentials above.
3. Test authentication, role-based navigation, semester selections, feedback submission, updates, aptitude sets, mock interview sessions, and role permissions.
