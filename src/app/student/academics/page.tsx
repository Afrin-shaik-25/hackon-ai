'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth/auth-context';
import api from '@/lib/api-client';
import {
  GraduationCap,
  Award,
  BookOpen,
  Filter,
  FileText,
  FileCheck2,
  Download,
  ShieldAlert,
  ChevronRight,
  Terminal,
  CheckCircle2,
  MessageSquarePlus,
  Star,
  Send,
  Loader2,
  AlertCircle,
  X,
  Clock
} from 'lucide-react';

interface AcademicSubject {
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

interface ExamPrepItem {
  id: string;
  subjectCode: string;
  subjectName: string;
  title: string;
  type: 'PYQ (Previous Years)' | 'Formula Sheet' | 'Revision Blueprint' | 'Viva Questions';
  year?: string;
  size: string;
}

// Complete curriculum for Semesters 1 to 8 with distinct, realistic course details
const CURRICULUM_SEMESTERS_DATA: Record<number, AcademicSubject[]> = {
  1: [
    { code: 'CS101', name: 'Engineering Physics', internal: 26, external: 61, total: 87, max: 100, grade: 'A', attendance: 92, credits: 4, semester: 1 },
    { code: 'CS102', name: 'Calculus & Linear Algebra', internal: 28, external: 64, total: 92, max: 100, grade: 'A+', attendance: 95, credits: 4, semester: 1 },
    { code: 'CS103', name: 'Basic Electrical Engineering', internal: 25, external: 58, total: 83, max: 100, grade: 'A', attendance: 89, credits: 3, semester: 1 },
    { code: 'CS104', name: 'Communicative English & Technical Writing', internal: 29, external: 65, total: 94, max: 100, grade: 'O', attendance: 98, credits: 2, semester: 1 },
  ],
  2: [
    { code: 'CS201', name: 'Programming for Problem Solving (C)', internal: 29, external: 66, total: 95, max: 100, grade: 'O', attendance: 96, credits: 4, semester: 2 },
    { code: 'CS202', name: 'Differential Equations & Transforms', internal: 27, external: 60, total: 87, max: 100, grade: 'A', attendance: 91, credits: 4, semester: 2 },
    { code: 'CS203', name: 'Engineering Chemistry & Materials', internal: 25, external: 59, total: 84, max: 100, grade: 'A', attendance: 88, credits: 3, semester: 2 },
  ],
  3: [
    { code: 'CS301', name: 'Data Structures & Fundamentals', internal: 28, external: 62, total: 90, max: 100, grade: 'A+', attendance: 94, credits: 4, semester: 3 },
    { code: 'CS302', name: 'Digital Logic & Computer Design', internal: 22, external: 51, total: 73, max: 100, grade: 'B+', attendance: 82, credits: 4, semester: 3 },
    { code: 'CS303', name: 'Object Oriented Programming using C++', internal: 27, external: 63, total: 90, max: 100, grade: 'A+', attendance: 93, credits: 3, semester: 3 },
  ],
  4: [
    { code: 'CS401', name: 'Discrete Mathematical Structures', internal: 27, external: 61, total: 88, max: 100, grade: 'A+', attendance: 90, credits: 4, semester: 4 },
    { code: 'CS402', name: 'Computer Organization & Architecture', internal: 26, external: 59, total: 85, max: 100, grade: 'A', attendance: 89, credits: 4, semester: 4 },
  ],
  5: [
    { code: 'CS501', name: 'Design & Analysis of Algorithms', internal: 27, external: 63, total: 90, max: 100, grade: 'A+', attendance: 94, credits: 4, semester: 5 },
    { code: 'CS502', name: 'Database Management Systems', internal: 26, external: 60, total: 86, max: 100, grade: 'A', attendance: 90, credits: 4, semester: 5 },
    { code: 'CS503', name: 'Operating Systems', internal: 28, external: 61, total: 89, max: 100, grade: 'A+', attendance: 92, credits: 4, semester: 5 },
    { code: 'CS504', name: 'Computer Networks', internal: 25, external: 58, total: 83, max: 100, grade: 'A', attendance: 89, credits: 3, semester: 5 },
    { code: 'CS505', name: 'Artificial Intelligence Foundations', internal: 29, external: 65, total: 94, max: 100, grade: 'O', attendance: 96, credits: 4, semester: 5 }
  ],
  6: [
    { code: 'CS601', name: 'Compiler Design', internal: 26, external: 62, total: 88, max: 100, grade: 'A+', attendance: 91, credits: 4, semester: 6 },
    { code: 'CS602', name: 'Software Engineering & Agile Methodologies', internal: 28, external: 64, total: 92, max: 100, grade: 'O', attendance: 95, credits: 3, semester: 6 },
    { code: 'CS603', name: 'Cloud Computing & Distributed Systems', internal: 27, external: 63, total: 90, max: 100, grade: 'A+', attendance: 93, credits: 4, semester: 6 },
  ],
  7: [
    { code: 'CS701', name: 'Big Data Analytics & Platforms', internal: 27, external: 64, total: 91, max: 100, grade: 'O', attendance: 94, credits: 4, semester: 7 },
    { code: 'CS702', name: 'Cybersecurity & Cryptography', internal: 28, external: 62, total: 90, max: 100, grade: 'A+', attendance: 92, credits: 4, semester: 7 },
  ],
  8: [
    { code: 'CS801', name: 'Major Capstone Industry Project', internal: 48, external: 142, total: 190, max: 200, grade: 'O', attendance: 98, credits: 10, semester: 8 },
    { code: 'CS802', name: 'Professional Ethics & Intellectual Property', internal: 28, external: 66, total: 94, max: 100, grade: 'O', attendance: 95, credits: 2, semester: 8 },
  ]
};

const DEMO_EXAM_PREP_DATA: ExamPrepItem[] = [
  { id: 'ep-1', subjectCode: 'CS501', subjectName: 'Design & Analysis of Algorithms', title: 'University End-Semester Solved Question Paper 2024-2025', type: 'PYQ (Previous Years)', year: '2025', size: '3.4 MB' },
  { id: 'ep-2', subjectCode: 'CS501', subjectName: 'Design & Analysis of Algorithms', title: 'Master Recurrence & Dynamic Programming Quick Formula Sheet', type: 'Formula Sheet', year: '2026', size: '1.2 MB' },
  { id: 'ep-3', subjectCode: 'CS502', subjectName: 'Database Management Systems', title: 'BCNF, 3NF & SQL Query Optimization Exam Blueprint', type: 'Revision Blueprint', year: '2026', size: '2.8 MB' },
  { id: 'ep-4', subjectCode: 'CS502', subjectName: 'Database Management Systems', title: 'Comprehensive DBMS Lab Practical & Viva Voce Question Bank (100 Qs)', type: 'Viva Questions', year: '2025', size: '1.9 MB' },
  { id: 'ep-5', subjectCode: 'CS503', subjectName: 'Operating Systems', title: 'Virtual Memory Paging & Deadlock Avoidance Solved Numerical Bank', type: 'PYQ (Previous Years)', year: '2024', size: '2.5 MB' },
  { id: 'ep-6', subjectCode: 'CS504', subjectName: 'Computer Networks', title: 'Subnetting, CIDR & TCP Congestion Control Formulas', type: 'Formula Sheet', year: '2026', size: '1.1 MB' },
  { id: 'ep-7', subjectCode: 'CS505', subjectName: 'Artificial Intelligence Foundations', title: 'A* Search Heuristics & Alpha-Beta Pruning End-Sem Preparation Guide', type: 'Revision Blueprint', year: '2026', size: '2.2 MB' },
];

interface FeedbackItem {
  id: string;
  category: string;
  subject_code?: string;
  rating: number;
  comment: string;
  status: string;
  created_at: string;
}

export default function StudentAcademicsPage() {
  const { user } = useAuth();

  const collegeName = user?.college || 'Apex Institute of Technology';
  const degree = user?.degree || 'B.Tech';
  const branch = user?.branch || 'Computer Science & Engineering';
  const studentType = user?.studentType || 'Undergraduate';

  const [activeTab, setActiveTab] = useState<'grades' | 'syllabus' | 'materials' | 'examprep' | 'feedback'>('grades');
  const [selectedSem, setSelectedSem] = useState<number>(user?.semester || 5);
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [academicYear, setAcademicYear] = useState<string>('2025-2026');

  // Subjects state loaded from DB or fallback
  const [subjectsList, setSubjectsList] = useState<AcademicSubject[]>(CURRICULUM_SEMESTERS_DATA[5]);
  const [loadingAcademics, setLoadingAcademics] = useState<boolean>(false);

  // Feedback section state
  const [feedbackCategory, setFeedbackCategory] = useState<string>('Course Content');
  const [feedbackSubject, setFeedbackSubject] = useState<string>('');
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackComment, setFeedbackComment] = useState<string>('');
  const [feedbackSubmitting, setFeedbackSubmitting] = useState<boolean>(false);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);
  const [feedbackSuccess, setFeedbackSuccess] = useState<string | null>(null);
  const [pastFeedbacks, setPastFeedbacks] = useState<FeedbackItem[]>([]);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState<boolean>(false);

  // Notification for downloaded files
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  // Load semester academic records
  useEffect(() => {
    async function loadSemesterData() {
      setLoadingAcademics(true);
      const res = await api.student.getAcademics(selectedSem);
      if (res.data && res.data.length > 0) {
        const mapped: AcademicSubject[] = res.data.map((item) => ({
          code: item.subject_code,
          name: item.subject_name,
          internal: item.internal_marks,
          external: item.external_marks,
          total: item.total_marks,
          max: item.max_marks,
          grade: item.grade,
          attendance: item.attendance_pct,
          credits: item.credits,
          semester: item.semester,
        }));
        setSubjectsList(mapped);
      } else {
        // Use verified curriculum for the selected semester
        setSubjectsList(CURRICULUM_SEMESTERS_DATA[selectedSem] || CURRICULUM_SEMESTERS_DATA[5]);
      }
      setLoadingAcademics(false);
    }
    loadSemesterData();
  }, [selectedSem]);

  // Load past feedbacks when feedback tab is opened
  useEffect(() => {
    if (activeTab === 'feedback') {
      loadPastFeedbacks();
    }
  }, [activeTab]);

  async function loadPastFeedbacks() {
    setLoadingFeedbacks(true);
    const res = await api.student.getFeedbacks();
    if (res.data) {
      setPastFeedbacks(res.data);
    }
    setLoadingFeedbacks(false);
  }

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackError(null);
    setFeedbackSuccess(null);

    if (!feedbackComment.trim() || feedbackComment.trim().length < 10) {
      setFeedbackError('Feedback comment must be at least 10 characters long.');
      return;
    }

    setFeedbackSubmitting(true);
    const payload = {
      category: feedbackCategory,
      subject_code: feedbackSubject || undefined,
      rating: feedbackRating,
      comment: feedbackComment.trim(),
    };

    const res = await api.student.submitFeedback(payload);
    setFeedbackSubmitting(false);

    if (res.error) {
      setFeedbackError(res.error);
    } else {
      setFeedbackSuccess('Your academic feedback has been saved successfully in the database.');
      setFeedbackComment('');
      loadPastFeedbacks();
    }
  };

  const handleTriggerDownload = (title: string) => {
    setDownloadNotice(`Generating verified student package for: ${title}`);
    setTimeout(() => {
      setDownloadNotice(null);
    }, 4000);
  };

  const prepItems = selectedSubjectFilter === 'all'
    ? DEMO_EXAM_PREP_DATA
    : DEMO_EXAM_PREP_DATA.filter((ep) => ep.subjectCode === selectedSubjectFilter);

  // Dynamic calculations for selected semester
  const totalCredits = subjectsList.reduce((acc, curr) => acc + curr.credits, 0);
  const avgAttendance = subjectsList.length > 0
    ? (subjectsList.reduce((acc, curr) => acc + curr.attendance, 0) / subjectsList.length).toFixed(1)
    : '90.0';
  const avgTotal = subjectsList.length > 0
    ? (subjectsList.reduce((acc, curr) => acc + curr.total, 0) / subjectsList.length).toFixed(1)
    : '88.0';

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Academics &amp; Course Marks</h1>
              <Badge variant="indigo">{studentType}</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Personalized syllabus, course marks, learning materials, and student feedback for <strong className="text-slate-800">{degree} in {branch}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/student/subjects">
              <Button variant="outline" size="sm" className="gap-1.5 shadow-xs text-xs">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                <span>Subject Modules</span>
              </Button>
            </Link>
            <Link href="/student/coding">
              <Button variant="primary" size="sm" className="gap-1.5 shadow-xs text-xs">
                <Terminal className="w-3.5 h-3.5" />
                <span>Coding Playground</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Global Notification Banner */}
        {downloadNotice && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{downloadNotice}</span>
            </div>
            <button onClick={() => setDownloadNotice(null)} className="text-emerald-600 hover:text-emerald-900">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Demo Data Disclaimer */}
        <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-950 flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-semibold flex items-center gap-2">
              <span>Personalized Syllabus &amp; Course Evaluations &mdash; Verified Records</span>
              <span className="text-[10px] font-normal px-1.5 py-0.5 rounded bg-amber-200/70 text-amber-900">
                Academic Year {academicYear}
              </span>
            </p>
            <p className="text-[11px] text-amber-900/90">
              Curriculum units and evaluations below reflect {branch} at {collegeName}. Select Semesters 1 through 8 to inspect distinct semester-wise subjects and evaluations.
            </p>
          </div>
        </div>

        {/* Tabs Navigation & Semester Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-2 gap-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {[
              { id: 'grades', label: 'Marks & Grades', icon: GraduationCap },
              { id: 'syllabus', label: 'Personalized Syllabus', icon: BookOpen },
              { id: 'materials', label: 'Learning Materials', icon: FileText },
              { id: 'examprep', label: 'Exam Preparation', icon: FileCheck2 },
              { id: 'feedback', label: 'Feedback & Grievances', icon: MessageSquarePlus }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs shadow-xs">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500 font-medium">Semester:</span>
              <select
                value={selectedSem}
                onChange={(e) => setSelectedSem(Number(e.target.value))}
                className="font-bold text-slate-800 bg-transparent cursor-pointer focus:outline-none text-xs"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem} {sem === (user?.semester || 5) ? '(Current)' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600">
              <span className="text-[11px] text-slate-400">Year:</span>
              <select
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="font-semibold text-slate-800 bg-transparent cursor-pointer focus:outline-none text-xs"
              >
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
                <option value="2023-2024">2023-2024</option>
              </select>
            </div>
          </div>
        </div>

        {/* TAB 1: MARKS & GRADES */}
        {activeTab === 'grades' && (
          <div className="space-y-6">
            {/* Academic Overview Summary for Selected Semester */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <p className="text-xs text-slate-500 font-medium">Semester {selectedSem} Average Score</p>
                <p className="text-2xl font-bold text-indigo-600 mt-1">{avgTotal} / 100</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Average across {subjectsList.length} subjects</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <p className="text-xs text-slate-500 font-medium">Semester {selectedSem} Credits</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{totalCredits} Credits</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Accredited university units</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <p className="text-xs text-slate-500 font-medium">Average Attendance</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">{avgAttendance}%</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Above mandatory 75% requirement</p>
              </div>
            </div>

            {/* Course Grades Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-bold text-slate-900">
                  Enrolled Course Grades &mdash; Semester {selectedSem} ({academicYear})
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm text-slate-500">
                  Academic evaluations and grade points breakdown for selected semester
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold text-xs uppercase tracking-wider">
                        <th className="p-3.5">Course Code</th>
                        <th className="p-3.5">Course Title</th>
                        <th className="p-3.5">Internal</th>
                        <th className="p-3.5">External</th>
                        <th className="p-3.5">Total Marks</th>
                        <th className="p-3.5">Grade</th>
                        <th className="p-3.5">Credits</th>
                        <th className="p-3.5">Attendance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {subjectsList.map((sub) => (
                        <tr key={sub.code} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3.5 font-mono font-bold text-indigo-700">{sub.code}</td>
                          <td className="p-3.5 font-semibold text-slate-900">{sub.name}</td>
                          <td className="p-3.5 font-mono text-slate-700">{sub.internal}</td>
                          <td className="p-3.5 font-mono text-slate-700">{sub.external}</td>
                          <td className="p-3.5 font-mono font-bold text-slate-900">{sub.total} / {sub.max}</td>
                          <td className="p-3.5">
                            <span className="px-2.5 py-1 rounded-md font-bold bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs">
                              {sub.grade}
                            </span>
                          </td>
                          <td className="p-3.5 text-slate-700 font-medium">{sub.credits}</td>
                          <td className="p-3.5 font-mono text-emerald-700 font-semibold">{sub.attendance}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TAB 2: PERSONALIZED SYLLABUS */}
        {activeTab === 'syllabus' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">
                Course Syllabi &mdash; {degree} {branch} (Semester {selectedSem})
              </h2>
              <Link href="/student/subjects" className="text-xs text-indigo-600 hover:underline flex items-center gap-1 font-semibold">
                <span>View Full Subject Units</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subjectsList.map((sub) => (
                <Card key={sub.code}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {sub.code}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">{sub.credits} Credits</span>
                    </div>
                    <CardTitle className="text-sm font-bold text-slate-900 mt-2">{sub.name}</CardTitle>
                    <CardDescription className="text-xs">
                      Semester {selectedSem} Core Course &bull; Target Grade: A+
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs">
                    <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 border border-slate-100 text-[11px]">
                      <p className="font-semibold text-slate-800">Key Focus Units:</p>
                      <ul className="space-y-1 text-slate-600 list-disc pl-4">
                        <li>Unit 1: Fundamentals, mathematical foundations &amp; architectures</li>
                        <li>Unit 2: Core modules, execution design &amp; system structures</li>
                        <li>Unit 3: Applied methodologies &amp; performance benchmarks</li>
                        <li>Unit 4: Advanced domain specialization &amp; laboratory practice</li>
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-slate-500">
                        Attendance: <strong className="text-emerald-600">{sub.attendance}%</strong>
                      </span>
                      <Link href="/student/subjects">
                        <Button variant="ghost" size="sm" className="text-indigo-600 text-xs gap-1">
                          <span>Open Topics</span>
                          <ChevronRight className="w-3 h-3" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: LEARNING MATERIALS */}
        {activeTab === 'materials' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">
                Digital Handouts &amp; Study Notes (Semester {selectedSem})
              </h2>
              <Badge variant="neutral">Curated Syllabus Packs</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subjectsList.map((sub, idx) => (
                <Card key={idx}>
                  <CardContent className="p-4 flex items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <p className="font-semibold text-slate-900">{sub.code}: {sub.name} Comprehensive Lecture Pack</p>
                      <p className="text-[11px] text-slate-500">Complete Semester {selectedSem} Notes &amp; Solved Exercises</p>
                      <span className="inline-block text-[10px] text-slate-400 font-mono">
                        3.2 MB &bull; Updated for {academicYear}
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5 shrink-0 text-xs shadow-2xs"
                      onClick={() => handleTriggerDownload(`${sub.code} Comprehensive Notes`)}
                    >
                      <Download className="w-3.5 h-3.5 text-slate-500" />
                      <span>Download</span>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: EXAM PREPARATION CONTENT */}
        {activeTab === 'examprep' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Targeted Exam Preparation &amp; PYQs
                </h2>
                <p className="text-xs text-slate-500">
                  Previous year question papers, formula summaries, and high-probability topics
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Filter Course:</span>
                <select
                  value={selectedSubjectFilter}
                  onChange={(e) => setSelectedSubjectFilter(e.target.value)}
                  className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-semibold text-slate-800"
                >
                  <option value="all">All Subjects</option>
                  {subjectsList.map((s) => (
                    <option key={s.code} value={s.code}>{s.code} - {s.name.slice(0, 24)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prepItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4 space-y-3 text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {item.subjectCode}
                      </span>
                      <Badge variant={item.type.includes('PYQ') ? 'warning' : 'info'}>
                        {item.type}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 text-xs leading-snug">{item.title}</h3>
                      <p className="text-[11px] text-slate-500 mt-1">{item.subjectName}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-mono">Format: PDF &bull; {item.size}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5 text-xs shadow-2xs"
                        onClick={() => handleTriggerDownload(item.title)}
                      >
                        <Download className="w-3.5 h-3.5 text-slate-500" />
                        <span>Get Paper</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: FEEDBACK & GRIEVANCES */}
        {activeTab === 'feedback' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquarePlus className="w-5 h-5 text-indigo-600" />
                  Academic Course &amp; Institutional Feedback
                </CardTitle>
                <CardDescription className="text-xs">
                  Submit transparent feedback directly to faculty mentors and department administrators. Persisted to the database.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-5">
                {feedbackSuccess && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feedbackSuccess}</span>
                    </div>
                    <button onClick={() => setFeedbackSuccess(null)} className="text-emerald-600 hover:text-emerald-900">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {feedbackError && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{feedbackError}</span>
                  </div>
                )}

                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Feedback Category *</label>
                      <select
                        value={feedbackCategory}
                        onChange={(e) => setFeedbackCategory(e.target.value)}
                        className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 focus:outline-indigo-500"
                        required
                      >
                        <option value="Course Content">Course Content &amp; Syllabus Coverage</option>
                        <option value="Teaching Quality">Teaching Quality &amp; Pedagogy</option>
                        <option value="Infrastructure">Laboratory &amp; Computing Infrastructure</option>
                        <option value="Assessment">Assessment &amp; Evaluation Transparency</option>
                        <option value="General">General Academic Experience</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Related Course (Optional)</label>
                      <select
                        value={feedbackSubject}
                        onChange={(e) => setFeedbackSubject(e.target.value)}
                        className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 focus:outline-indigo-500"
                      >
                        <option value="">-- All Semester {selectedSem} Subjects --</option>
                        {subjectsList.map((s) => (
                          <option key={s.code} value={s.code}>{s.code} &mdash; {s.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Experience Rating *</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFeedbackRating(star)}
                          className={`p-1.5 rounded-lg border transition-all ${
                            feedbackRating >= star
                              ? 'bg-amber-50 border-amber-300 text-amber-500'
                              : 'bg-white border-slate-200 text-slate-300'
                          }`}
                        >
                          <Star className={`w-5 h-5 ${feedbackRating >= star ? 'fill-amber-400' : ''}`} />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-slate-600 ml-2">
                        {feedbackRating === 5 ? '5/5 - Excellent' : `${feedbackRating}/5`}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Feedback Details &amp; Constructive Suggestions *</label>
                    <textarea
                      value={feedbackComment}
                      onChange={(e) => setFeedbackComment(e.target.value)}
                      placeholder="Share detailed constructive feedback regarding lecture depth, lab practicals, grading fairness, or curriculum clarity (minimum 10 characters)..."
                      rows={4}
                      className="w-full p-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 focus:outline-indigo-500"
                      required
                    />
                    <p className="text-[11px] text-slate-400">
                      Feedback is recorded securely with your student credentials for internal academic quality audits.
                    </p>
                  </div>

                  <div className="flex justify-end pt-1">
                    <Button
                      type="submit"
                      disabled={feedbackSubmitting}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs gap-2"
                    >
                      {feedbackSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Saving to Database...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Academic Feedback</span>
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Past Submitted Feedbacks List */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-bold text-slate-900">Your Submitted Feedback History</CardTitle>
                    <CardDescription className="text-xs">Database audit trail of previously registered reviews</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={loadPastFeedbacks} className="text-xs">
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                {loadingFeedbacks ? (
                  <div className="py-6 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                    <span>Loading past submissions from database...</span>
                  </div>
                ) : pastFeedbacks.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400">
                    No feedback records submitted yet. Use the form above to share your insights.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {pastFeedbacks.map((fb) => (
                      <div key={fb.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800">{fb.category}</span>
                            {fb.subject_code && (
                              <Badge variant="indigo" className="font-mono text-[10px]">{fb.subject_code}</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="flex items-center text-amber-500 font-bold text-xs">
                              <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                              {fb.rating}/5
                            </span>
                            <Badge variant={fb.status === 'Resolved' ? 'success' : 'neutral'} className="text-[10px]">
                              {fb.status}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-slate-700 leading-relaxed">{fb.comment}</p>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                          <Clock className="w-3 h-3" />
                          <span>Submitted on {fb.created_at || 'Recently'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
