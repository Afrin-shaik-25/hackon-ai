import {
  LayoutDashboard,
  Award,
  GraduationCap,
  CalendarCheck,
  FileCheck2,
  Cpu,
  FolderGit2,
  CheckSquare,
  Timer,
  Calendar,
  Compass,
  User,
  Users,
  BarChart3,
  AlertTriangle,
  HeartHandshake,
  FileUp,
  FileText,
  Briefcase,
  Layers,
  MessagesSquare,
  Building2,
  ShieldCheck,
  UserCheck,
  SlidersHorizontal,
  ScrollText,
  HelpCircle,
  Database,
  Building,
  BookOpen,
  Terminal
} from 'lucide-react';
import { UserRole } from '@/types';

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  isAiFeature?: boolean;
}

export const ROLE_NAVIGATION: Record<UserRole, NavItem[]> = {
  student: [
    { title: 'Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
    { title: 'Performance Analytics', href: '/student/success-score', icon: BarChart3 },
    { title: 'Academics & Marks', href: '/student/academics', icon: GraduationCap },
    { title: 'Attendance Tracker', href: '/student/attendance', icon: CalendarCheck },
    { title: 'Semester Subjects', href: '/student/subjects', icon: BookOpen },
    { title: 'Coding Playground', href: '/student/coding', icon: Terminal },
    { title: 'Assessments & Practice', href: '/student/assessments', icon: FileCheck2 },
    { title: 'FocusNest Timer', href: '/student/focus', icon: Timer },
    { title: 'To-Do & Tasks', href: '/student/tasks', icon: CheckSquare },
    { title: 'Upcoming Exams', href: '/student/exams', icon: Calendar },
    { title: 'My Profile', href: '/student/profile', icon: User },
  ],
  faculty: [
    { title: 'Faculty Dashboard', href: '/faculty/dashboard', icon: LayoutDashboard },
    { title: 'Student Directory', href: '/faculty/students', icon: Users, badge: 'Cohort' },
    { title: 'Cohort Analytics', href: '/faculty/analytics', icon: BarChart3 },
    { title: 'Import Student Data', href: '/faculty/imports', icon: FileUp },
    { title: 'Faculty Profile', href: '/faculty/profile', icon: User },
  ],
  graduate: [
    { title: 'Graduate Dashboard', href: '/graduate/dashboard', icon: LayoutDashboard },
    { title: 'Skills & Passport', href: '/graduate/skills', icon: Cpu },
    { title: 'Resume Builder', href: '/graduate/resume', icon: FileText, badge: 'Builder' },
    { title: 'Aptitude & Reasoning', href: '/graduate/aptitude', icon: CheckSquare },
    { title: 'Mock Interview Simulator', href: '/graduate/interviews', icon: MessagesSquare },
    { title: 'Verified Projects', href: '/graduate/projects', icon: FolderGit2 },
    { title: 'Job Opportunities', href: '/graduate/jobs', icon: Briefcase },
    { title: 'My Applications', href: '/graduate/applications', icon: Layers },
    { title: 'Peer Skill Groups', href: '/graduate/groups', icon: Users },
    { title: 'Feedback & Reviews', href: '/graduate/feedback', icon: HelpCircle },
    { title: 'Graduate Profile', href: '/graduate/profile', icon: User },
  ],
  company: [
    { title: 'Recruiter Dashboard', href: '/company/dashboard', icon: LayoutDashboard },
    { title: 'Company Profile & KYC', href: '/company/profile', icon: Building2 },
    { title: 'Verification Status', href: '/company/verification', icon: ShieldCheck, badge: 'Required' },
    { title: 'Job Postings', href: '/company/jobs', icon: Briefcase },
    { title: 'Post New Job', href: '/company/jobs/new', icon: CheckSquare },
    { title: 'Candidate Discovery', href: '/company/candidates', icon: Users, badge: 'Verified' },
    { title: 'Applications Pipeline', href: '/company/applications', icon: Layers },
  ],
  admin: [
    { title: 'Admin Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { title: 'User Management', href: '/admin/users', icon: Users },
    { title: 'Colleges & Campuses', href: '/admin/colleges', icon: Building },
    { title: 'Faculty Verifications', href: '/admin/faculty-verification', icon: UserCheck, badge: 'Pending' },
    { title: 'Company Verifications', href: '/admin/company-verification', icon: ShieldCheck, badge: 'Pending' },
    { title: 'Subjects & Curricula', href: '/admin/subjects', icon: GraduationCap },
    { title: 'Assessments Registry', href: '/admin/assessments', icon: FileCheck2 },
    { title: 'System Data Imports', href: '/admin/imports', icon: FileUp },
    { title: 'Demo Data Sandbox', href: '/admin/demo-data', icon: Database },
    { title: 'System Audit Logs', href: '/admin/audit-logs', icon: ScrollText },
    { title: 'Platform Settings', href: '/admin/settings', icon: SlidersHorizontal },
  ]
};
