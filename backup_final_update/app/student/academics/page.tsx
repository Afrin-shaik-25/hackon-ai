'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth/auth-context';
import { DEMO_STUDENTS } from '@/lib/demo-data/students';
import {
  GraduationCap,
  Award,
  BookOpen,
  Filter,
  FileText,
  FileCheck2,
  Download,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  Layers,
  ChevronRight,
  Terminal,
  BookmarkCheck,
  CheckCircle2
} from 'lucide-react';

interface ExamPrepItem {
  id: string;
  subjectCode: string;
  subjectName: string;
  title: string;
  type: 'PYQ (Previous Years)' | 'Formula Sheet' | 'Revision Blueprint' | 'Viva Questions';
  year?: string;
  size: string;
}

const DEMO_EXAM_PREP_DATA: ExamPrepItem[] = [
  {
    id: 'ep-1',
    subjectCode: 'CS501',
    subjectName: 'Design & Analysis of Algorithms',
    title: 'University End-Semester Solved Question Paper 2024-2025',
    type: 'PYQ (Previous Years)',
    year: '2025',
    size: '3.4 MB'
  },
  {
    id: 'ep-2',
    subjectCode: 'CS501',
    subjectName: 'Design & Analysis of Algorithms',
    title: 'Master Recurrence & Dynamic Programming Quick Formula Sheet',
    type: 'Formula Sheet',
    year: '2026',
    size: '1.2 MB'
  },
  {
    id: 'ep-3',
    subjectCode: 'CS502',
    subjectName: 'Database Management Systems',
    title: 'BCNF, 3NF & SQL Query Optimization Exam Blueprint',
    type: 'Revision Blueprint',
    year: '2026',
    size: '2.8 MB'
  },
  {
    id: 'ep-4',
    subjectCode: 'CS502',
    subjectName: 'Database Management Systems',
    title: 'Comprehensive DBMS Lab Practical & Viva Voce Question Bank (100 Qs)',
    type: 'Viva Questions',
    year: '2025',
    size: '1.9 MB'
  },
  {
    id: 'ep-5',
    subjectCode: 'CS503',
    subjectName: 'Operating Systems',
    title: 'Virtual Memory Paging & Deadlock Avoidance Solved Numerical Bank',
    type: 'PYQ (Previous Years)',
    year: '2024',
    size: '2.5 MB'
  },
  {
    id: 'ep-6',
    subjectCode: 'CS504',
    subjectName: 'Computer Networks',
    title: 'Subnetting, CIDR & TCP Congestion Control Formulas',
    type: 'Formula Sheet',
    year: '2026',
    size: '1.1 MB'
  },
  {
    id: 'ep-7',
    subjectCode: 'CS505',
    subjectName: 'Artificial Intelligence Foundations',
    title: 'A* Search Heuristics & Alpha-Beta Pruning End-Sem Preparation Guide',
    type: 'Revision Blueprint',
    year: '2026',
    size: '2.2 MB'
  }
];

export default function StudentAcademicsPage() {
  const { user } = useAuth();
  const student = DEMO_STUDENTS[0];

  const collegeName = user?.college || student.college;
  const degree = user?.degree || student.degree || 'B.Tech';
  const branch = user?.branch || student.branch || 'Computer Science & Engineering';
  const studentType = user?.studentType || student.studentType || 'Undergraduate';

  const [activeTab, setActiveTab] = useState<'grades' | 'syllabus' | 'materials' | 'examprep'>('grades');
  const [selectedSem, setSelectedSem] = useState<number>(user?.semester || 5);
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');

  const filteredSubjects = student.subjects.filter((s) => s.semester === selectedSem);

  const prepItems = selectedSubjectFilter === 'all'
    ? DEMO_EXAM_PREP_DATA
    : DEMO_EXAM_PREP_DATA.filter((ep) => ep.subjectCode === selectedSubjectFilter);

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
              Personalized syllabus, course marks, learning materials, and exam preparation content for <strong className="text-slate-800">{degree} in {branch}</strong>
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

        {/* Demo Data Disclaimer */}
        <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-950 flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-semibold flex items-center gap-2">
              <span>Personalized Syllabus &amp; Exam Prep &mdash; Demo Data</span>
              <span className="text-[10px] font-normal px-1.5 py-0.5 rounded bg-amber-200/70 text-amber-900">
                Institutional Sync Pending
              </span>
            </p>
            <p className="text-[11px] text-amber-900/90">
              Curriculum units and preparation papers below are modeled for {branch} at {collegeName}. In compliance with integrity guidelines, all syllabus outlines and prep packs are labeled as demo data until verified university endpoints are connected.
            </p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2 overflow-x-auto">
            {[
              { id: 'grades', label: 'Marks & Grades', icon: GraduationCap },
              { id: 'syllabus', label: 'Personalized Syllabus', icon: BookOpen },
              { id: 'materials', label: 'Learning Materials', icon: FileText },
              { id: 'examprep', label: 'Exam Preparation', icon: FileCheck2 }
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

          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs shadow-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500">Semester:</span>
            <select
              value={selectedSem}
              onChange={(e) => setSelectedSem(Number(e.target.value))}
              className="font-bold text-slate-800 bg-transparent cursor-pointer focus:outline-none text-xs"
            >
              <option value={5}>Semester 5 (Current)</option>
              <option value={4}>Semester 4 (Completed)</option>
            </select>
          </div>
        </div>

        {/* TAB 1: MARKS & GRADES */}
        {activeTab === 'grades' && (
          <div className="space-y-6">
            {/* Academic Overview Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <p className="text-xs text-slate-500 font-medium">Cumulative CGPA</p>
                <p className="text-2xl font-bold text-indigo-600 mt-1">8.92 / 10</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <p className="text-xs text-slate-500 font-medium">Total Credits Earned</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">94 Credits</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <p className="text-xs text-slate-500 font-medium">Academic Performance Score</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">88 / 100</p>
              </div>
            </div>

            {/* Course Grades Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Enrolled Course Grades &mdash; Semester {selectedSem}</CardTitle>
                <CardDescription>Academic evaluations and grade points breakdown</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold text-[11px]">
                        <th className="p-3">Course Code</th>
                        <th className="p-3">Course Title</th>
                        <th className="p-3">Internal (/30)</th>
                        <th className="p-3">External (/70)</th>
                        <th className="p-3">Total Marks</th>
                        <th className="p-3">Grade</th>
                        <th className="p-3">Credits</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredSubjects.map((sub) => (
                        <tr key={sub.code} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-bold text-indigo-600">{sub.code}</td>
                          <td className="p-3 font-medium text-slate-900">{sub.name}</td>
                          <td className="p-3 font-mono text-slate-600">{sub.internal}</td>
                          <td className="p-3 font-mono text-slate-600">{sub.external}</td>
                          <td className="p-3 font-mono font-bold text-slate-900">{sub.total} / {sub.max}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded font-bold bg-indigo-50 text-indigo-700 text-[11px]">
                              {sub.grade}
                            </span>
                          </td>
                          <td className="p-3 text-slate-600">{sub.credits}</td>
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
                <span>View Full Unit Breakdown</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSubjects.map((sub) => (
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
                      Mandatory Core Course &bull; Target Grade: A+
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs">
                    <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 border border-slate-100 text-[11px]">
                      <p className="font-semibold text-slate-800">Key Focus Units (Demo Model):</p>
                      <ul className="space-y-1 text-slate-600 list-disc pl-4">
                        <li>Unit 1: Fundamentals, formal specifications &amp; architectures</li>
                        <li>Unit 2: Core algorithms, relational structures &amp; memory models</li>
                        <li>Unit 3: Optimization algorithms &amp; concurrency management</li>
                        <li>Unit 4: Advanced systems design &amp; practical implementations</li>
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
                Digital Handouts &amp; Study Notes
              </h2>
              <Badge variant="neutral">Updated Weekly</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'CS501: Dynamic Programming Master Handout', sub: 'Design & Analysis of Algorithms', size: '2.8 MB', updated: 'Yesterday' },
                { title: 'CS502: B+ Tree Indexing & Search Walkthrough', sub: 'Database Management Systems', size: '3.4 MB', updated: '3 days ago' },
                { title: 'CS503: Virtual Memory Paging & TLB Hit Calculations', sub: 'Operating Systems', size: '1.9 MB', updated: 'Oct 04' },
                { title: 'CS504: Subnetting & CIDR Address Calculations', sub: 'Computer Networks', size: '1.5 MB', updated: 'Sep 29' },
                { title: 'CS505: A* Search Admissibility & Monotonicity Proofs', sub: 'Artificial Intelligence Foundations', size: '2.2 MB', updated: 'Oct 02' }
              ].map((item, idx) => (
                <Card key={idx}>
                  <CardContent className="p-4 flex items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <p className="text-[11px] text-slate-500">{item.sub}</p>
                      <span className="inline-block text-[10px] text-slate-400 font-mono">
                        {item.size} &bull; Uploaded {item.updated}
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5 shrink-0 text-xs shadow-2xs"
                      onClick={() => alert(`Downloading note: ${item.title} (Demo)`)}
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
                  <option value="CS501">CS501 - Algorithms</option>
                  <option value="CS502">CS502 - DBMS</option>
                  <option value="CS503">CS503 - OS</option>
                  <option value="CS504">CS504 - Networks</option>
                  <option value="CS505">CS505 - AI</option>
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
                        onClick={() => alert(`Opening exam prep resource: ${item.title} (Demo)`)}
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
      </div>
    </DashboardShell>
  );
}
