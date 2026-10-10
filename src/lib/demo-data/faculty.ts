import { InterventionRecord, ImportRecord } from "@/types";

export interface CohortOverview {
  totalStudents: number;
  sufficientDataCount: number;
  incompleteDataCount: number;
  avgSuccessScore: number;
  highRiskCount: number;
  moderateRiskCount: number;
  activeInterventionsCount: number;
  attendanceAvg: number;
}

export const DEMO_COHORT_OVERVIEW: CohortOverview = {
  totalStudents: 148,
  sufficientDataCount: 134,
  incompleteDataCount: 14,
  avgSuccessScore: 73.8,
  highRiskCount: 16,
  moderateRiskCount: 27,
  activeInterventionsCount: 9,
  attendanceAvg: 81.4
};

export const DEMO_SCORE_DISTRIBUTION = [
  { range: "< 50 (Critical)", count: 12, fill: "#ef4444" },
  { range: "50 - 64 (Review)", count: 28, fill: "#f59e0b" },
  { range: "65 - 79 (Average)", count: 68, fill: "#3b82f6" },
  { range: "80 - 100 (Exemplary)", count: 40, fill: "#10b981" }
];

export const DEMO_MONTHLY_TRENDS = [
  { month: "Jun", avgScore: 75.1, attendanceRate: 88.4, lmsLogins: 420 },
  { month: "Jul", avgScore: 74.8, attendanceRate: 85.2, lmsLogins: 510 },
  { month: "Aug", avgScore: 73.2, attendanceRate: 82.0, lmsLogins: 480 },
  { month: "Sep", avgScore: 71.9, attendanceRate: 78.5, lmsLogins: 610 },
  { month: "Oct", avgScore: 73.8, attendanceRate: 81.4, lmsLogins: 590 }
];

export const DEMO_RISK_BY_CATEGORY = [
  { category: "Low Attendance (<75%)", count: 22, severity: "critical" },
  { category: "Declining Academic Marks", count: 15, severity: "warning" },
  { category: "Missed Assessments", count: 11, severity: "warning" },
  { category: "Incomplete Data Sources", count: 14, severity: "info" },
  { category: "Low LMS Activity", count: 8, severity: "warning" }
];

export const DEMO_DEPARTMENT_STATS = [
  { department: "Computer Science", students: 78, avgScore: 74.6, riskPercent: 12 },
  { department: "Data Science", students: 42, avgScore: 76.2, riskPercent: 9 },
  { department: "Electronics & Comm", students: 28, avgScore: 70.4, riskPercent: 18 }
];

export const DEMO_INTERVENTIONS: InterventionRecord[] = [
  {
    id: "int-001",
    studentId: "std-002",
    studentName: "Priya Patel",
    studentCode: "2023CS109",
    facultyId: "fac-101",
    facultyName: "Dr. K. Raman",
    reason: "Attendance dropped to 62% and OS mid-term score 52%",
    recommendedAction: "Assigned peer mentor; scheduled weekly OS tutorial and health check-in",
    followUpDate: "2026-10-16",
    status: "In Progress",
    notes: "Student informed of medical leaves. Discussed plan to submit remedial assignments.",
    privateNotes: "Parent contacted; confirmed outpatient treatment. Faculty to support catch-up.",
    createdAt: "2026-10-06",
    updatedAt: "2026-10-08"
  },
  {
    id: "int-002",
    studentId: "std-004",
    studentName: "Ananya Verma",
    studentCode: "2023CS115",
    facultyId: "fac-101",
    facultyName: "Dr. K. Raman",
    reason: "DBMS Mid-Term failed (19/50), consecutive Friday absences",
    recommendedAction: "Mandatory tutorial session every Thursday 3 PM; lab practice worksheet",
    followUpDate: "2026-10-15",
    status: "Scheduled",
    notes: "Needs conceptual reinforcement on relational normalization.",
    privateNotes: "Student seemed anxious about placement exams. Recommended campus counselor.",
    createdAt: "2026-10-05",
    updatedAt: "2026-10-05"
  },
  {
    id: "int-003",
    studentId: "std-007",
    studentName: "Kabir Sengupta",
    studentCode: "2023CS132",
    facultyId: "fac-102",
    facultyName: "Prof. S. Iyer",
    reason: "Attendance below 75% bar; missed 2 algorithm quizzes",
    recommendedAction: "Counselor advisory; attendance warning slip issued",
    followUpDate: "2026-10-22",
    status: "Completed",
    notes: "Attended remedial quiz; scored 80%. Attendance restored to 74.8%.",
    privateNotes: "Resolved. Will monitor during final exams.",
    createdAt: "2026-09-22",
    updatedAt: "2026-10-04"
  }
];

export const DEMO_IMPORT_HISTORY: ImportRecord[] = [
  {
    id: "imp-001",
    source: "academics",
    sourceTitle: "Mid-Term Examination Marks",
    fileName: "CS_Semester5_Midterm_Results_2026.csv",
    uploadedAt: "2026-10-05 14:22",
    totalRows: 148,
    acceptedRows: 145,
    rejectedRows: 3,
    status: "Completed",
    uploader: "Dr. K. Raman",
    rejectedDetails: [
      { row: 14, studentId: "2023CS999", reason: "Student ID not found in enrolled semester cohort" },
      { row: 42, studentId: "2023CS107", reason: "Marks value 'AB' out of expected range (0-100)" },
      { row: 89, studentId: "2023CS112", reason: "Duplicate entry for subject code CS501" }
    ]
  },
  {
    id: "imp-002",
    source: "attendance",
    sourceTitle: "Biometric Attendance - Week 1-6",
    fileName: "Attendance_Consolidated_Sep2026.csv",
    uploadedAt: "2026-10-02 09:15",
    totalRows: 880,
    acceptedRows: 880,
    rejectedRows: 0,
    status: "Completed",
    uploader: "Registrar Office",
    rejectedDetails: []
  },
  {
    id: "imp-003",
    source: "assessments",
    sourceTitle: "Algorithm Coding Lab Quiz 1",
    fileName: "HackerEarth_Sync_CS501_Quiz1.csv",
    uploadedAt: "2026-09-28 17:40",
    totalRows: 148,
    acceptedRows: 142,
    rejectedRows: 6,
    status: "Completed",
    uploader: "Prof. S. Iyer",
    rejectedDetails: [
      { row: 22, studentId: "UNMAPPED_EMAIL_1", reason: "No matching institutional email found" },
      { row: 35, studentId: "UNMAPPED_EMAIL_2", reason: "No matching institutional email found" }
    ]
  }
];
