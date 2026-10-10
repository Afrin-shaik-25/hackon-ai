import { College, AuditLog } from "@/types";

export const DEMO_COLLEGES: College[] = [
  {
    id: "col-01",
    name: "Apex Institute of Technology",
    code: "AIT-BLR",
    location: "Bengaluru, Karnataka",
    studentsCount: 2450,
    facultyCount: 142,
    status: "Active"
  },
  {
    id: "col-02",
    name: "National School of Applied Sciences",
    code: "NSAS-PUN",
    location: "Pune, Maharashtra",
    studentsCount: 1820,
    facultyCount: 98,
    status: "Active"
  },
  {
    id: "col-03",
    name: "Trinity College of Engineering & Research",
    code: "TCER-HYD",
    location: "Hyderabad, Telangana",
    studentsCount: 3100,
    facultyCount: 180,
    status: "Active"
  },
  {
    id: "col-04",
    name: "Metropolitan Institute of Technology",
    code: "MIT-DEL",
    location: "New Delhi, NCR",
    studentsCount: 950,
    facultyCount: 45,
    status: "Onboarding"
  }
];

export const DEMO_USERS_ADMIN = [
  { id: "usr-01", name: "Aarav Sharma", email: "aarav.sharma@apex.edu", role: "student", status: "Active", college: "Apex Institute of Technology", joined: "2024-08-10" },
  { id: "usr-02", name: "Dr. K. Raman", email: "k.raman@apex.edu", role: "faculty", status: "Active", college: "Apex Institute of Technology", joined: "2023-01-15" },
  { id: "usr-03", name: "Priya Patel", email: "priya.patel@apex.edu", role: "student", status: "Active", college: "Apex Institute of Technology", joined: "2024-08-10" },
  { id: "usr-04", name: "Vikram Malhotra", email: "recruitment@nexatech.example.com", role: "company", status: "Verified", company: "NexaTech Systems", joined: "2025-05-20" },
  { id: "usr-05", name: "Sneha Mukherjee", email: "sneha.m@graduate.example.com", role: "graduate", status: "Active", college: "National School of Applied Sciences", joined: "2026-06-12" },
  { id: "usr-06", name: "System Administrator", email: "admin@studylens.ai", role: "admin", status: "SuperAdmin", college: "Platform Root", joined: "2023-01-01" }
];

export const DEMO_PENDING_VERIFICATIONS = [
  {
    id: "ver-fac-1",
    type: "faculty",
    name: "Prof. Arvind Rao",
    email: "arvind.rao@apex.edu",
    institution: "Apex Institute of Technology",
    department: "Computer Science",
    submittedDate: "2026-10-08",
    document: "Faculty_ID_Card_ArvindRao.pdf",
    status: "Pending"
  },
  {
    id: "ver-fac-2",
    type: "faculty",
    name: "Dr. Shalini Menon",
    email: "s.menon@tcer.edu",
    institution: "Trinity College of Engineering",
    department: "Data Science",
    submittedDate: "2026-10-07",
    document: "Appointment_Letter_ShaliniMenon.pdf",
    status: "Pending"
  },
  {
    id: "ver-comp-1",
    type: "company",
    name: "CognitiveEdge AI Corp",
    email: "talent@cognitiveedge.example.com",
    industry: "AI & Autonomous Robotics",
    website: "https://cognitiveedge.example.com",
    submittedDate: "2026-10-06",
    document: "Certificate_of_Incorporation_CIN.pdf",
    status: "Pending"
  }
];

export const DEMO_AUDIT_LOGS: AuditLog[] = [
  { id: "aud-01", action: "CSV Academic Records Ingestion", user: "Dr. K. Raman (faculty)", role: "faculty", timestamp: "2026-10-08 14:22:10", ip: "10.0.12.44", details: "Uploaded CS_Semester5_Midterm_Results_2026.csv (145 accepted, 3 rejected)" },
  { id: "aud-02", action: "Intervention Status Update", user: "Dr. K. Raman (faculty)", role: "faculty", timestamp: "2026-10-08 10:45:02", ip: "10.0.12.44", details: "Marked intervention int-001 for Priya Patel as In Progress" },
  { id: "aud-03", action: "Company Profile Verification", user: "Admin (admin)", role: "admin", timestamp: "2026-10-07 16:30:18", ip: "192.168.1.1", details: "Approved NexaTech Systems verification request" },
  { id: "aud-04", action: "Student Assessment Submission", user: "Aarav Sharma (student)", role: "student", timestamp: "2026-10-05 15:10:00", ip: "10.0.14.89", details: "Submitted Algorithms Mid-Term Exam (Score: 45/50)" }
];
