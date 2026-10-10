export type UserRole = 'student' | 'faculty' | 'graduate' | 'company' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  college?: string;
  department?: string;
  studentId?: string;
  employeeId?: string;
  companyName?: string;
  verified?: boolean;
}

export interface ScoreComponent {
  rawScore: number;
  weight: number; // e.g. 0.30
  weightedScore: number; // rawScore * weight
  status: 'complete' | 'provisional' | 'missing';
  description: string;
}

export interface ScoreBreakdown {
  academic: ScoreComponent; // 30%
  attendance: ScoreComponent; // 20%
  assessment: ScoreComponent; // 20%
  lmsEngagement: ScoreComponent; // 15%
  skillsProjects: ScoreComponent; // 15%
}

export interface RiskIndicator {
  id: string;
  category: 'Attendance' | 'Academic' | 'Assessment' | 'Engagement' | 'Data Completeness';
  reason: string;
  metric: string;
  severity: 'warning' | 'critical' | 'info';
  period: string;
  actionSuggestion: string;
}

export interface SubjectGrade {
  code: string;
  name: string;
  internal: number;
  external: number;
  total: number;
  max: number;
  grade: string;
  attendance: number;
  credits: number;
  semester: number;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  subject: string;
  status: 'Present' | 'Absent' | 'Late';
  topic: string;
}

export interface AssessmentItem {
  id: string;
  title: string;
  category: 'MCQ' | 'Coding' | 'Aptitude' | 'Assignment';
  subject: string;
  score: number;
  maxScore: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Upcoming';
  feedback?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tech: string[];
  verified: boolean;
  verifiedBy?: string;
  githubUrl?: string;
  liveUrl?: string;
  feedback?: string;
  date: string;
}

export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  category: 'Academic' | 'Project' | 'Assessment' | 'Career';
  completed: boolean;
}

export interface ExamItem {
  id: string;
  subject: string;
  code: string;
  date: string;
  time: string;
  venue: string;
  type: 'Mid-Term' | 'End-Semester' | 'Practical' | 'Quiz';
}

export interface ExtracurricularActivity {
  id: string;
  title: string;
  category: 'Hackathon' | 'Workshop' | 'Club' | 'Seminar';
  date: string;
  role: string;
  status: 'Upcoming' | 'Registered' | 'Completed';
  organization: string;
}

export interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  avatar?: string;
  college: string;
  department: string;
  year: number;
  semester: number;
  section: string;
  successScore: number; // 0-100
  previousScore: number;
  trend: 'up' | 'down' | 'stable';
  scoreBreakdown: ScoreBreakdown;
  riskLevel: 'low' | 'moderate' | 'high' | 'incomplete_data';
  reviewStatus: 'good_standing' | 'needs_review' | 'under_intervention' | 'review_completed';
  riskIndicators: RiskIndicator[];
  dataCompleteness: {
    percent: number;
    missingSources: string[];
    lastUpdated: string;
  };
  attendancePercentage: number;
  subjects: SubjectGrade[];
  attendanceRecords: AttendanceRecord[];
  assessments: AssessmentItem[];
  projects: ProjectItem[];
  tasks: TaskItem[];
  exams: ExamItem[];
  activities: ExtracurricularActivity[];
}

export interface InterventionRecord {
  id: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  facultyId: string;
  facultyName: string;
  reason: string;
  recommendedAction: string;
  followUpDate: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Deferred';
  notes: string;
  privateNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImportRecord {
  id: string;
  source: 'academics' | 'attendance' | 'assessments' | 'lms' | 'skills';
  sourceTitle: string;
  fileName: string;
  uploadedAt: string;
  totalRows: number;
  acceptedRows: number;
  rejectedRows: number;
  status: 'Completed' | 'Pending' | 'Failed';
  uploader: string;
  rejectedDetails: Array<{ row: number; studentId: string; reason: string }>;
}

export interface JobPosting {
  id: string;
  companyId: string;
  companyName: string;
  companyLogo?: string;
  title: string;
  type: 'Full-time' | 'Internship' | 'Contract';
  location: string;
  remote: boolean;
  salary: string;
  deadline: string;
  requiredSkills: string[];
  preferredSkills: string[];
  experience: string;
  description: string;
  openings: number;
  status: 'Active' | 'Draft' | 'Closed';
  createdAt: string;
  applicationsCount: number;
}

export interface CandidateApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  appliedDate: string;
  status: 'Applied' | 'Shortlisted' | 'Interview' | 'Selected' | 'Rejected';
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  recruiterNotes: string;
  interviewDate?: string;
  portfolioUrl?: string;
  resumeUrl?: string;
}

export interface College {
  id: string;
  name: string;
  code: string;
  location: string;
  studentsCount: number;
  facultyCount: number;
  status: 'Active' | 'Onboarding' | 'Suspended';
}

export interface AuditLog {
  id: string;
  action: string;
  user: string;
  role: UserRole;
  timestamp: string;
  ip: string;
  details: string;
}
