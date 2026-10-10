'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth/auth-context';
import { DEMO_STUDENTS } from '@/lib/demo-data/students';
import {
  GraduationCap,
  CalendarCheck,
  CheckSquare,
  Timer,
  ArrowRight,
  Calendar,
  Play,
  BookOpen,
  Terminal,
  FileText,
  Clock,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Plus
} from 'lucide-react';

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const defaultStudent = DEMO_STUDENTS[0];

  const studentName = user?.name || defaultStudent.name;
  const avatarUrl = user?.avatar || defaultStudent.avatar;
  const degree = user?.degree || defaultStudent.degree || 'B.Tech';
  const branch = user?.branch || defaultStudent.branch || 'Computer Science & Engineering';
  const college = user?.college || defaultStudent.college;
  const semester = user?.semester || defaultStudent.semester || 5;
  const studentId = user?.studentId || defaultStudent.studentId;

  const [tasks, setTasks] = useState(defaultStudent.tasks);

  // Toggle task completion
  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
    api.student.toggleTask(taskId).catch(() => {});
  };

  // Calculate days remaining helper
  const calculateDaysRemaining = (examDateStr: string): number => {
    const today = new Date('2026-10-10');
    const examDate = new Date(examDateStr);
    const diffTime = examDate.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  return (
    <DashboardShell>
      <div className="space-y-7 max-w-7xl mx-auto">
        {/* WELCOME BANNER WITH USER AVATAR BESIDE NAME */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-sm">
          {/* Subtle Educational Illustration watermark */}
          <div className="absolute -right-6 -bottom-10 opacity-10 pointer-events-none select-none">
            <svg width="260" height="260" viewBox="0 0 200 200" fill="currentColor">
              <path d="M100 20 L180 65 L100 110 L20 65 Z" />
              <path d="M40 85 L40 135 C40 160 160 160 160 135 L160 85" stroke="currentColor" strokeWidth="12" fill="none" />
              <path d="M180 65 L180 145" stroke="currentColor" strokeWidth="8" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              {/* User Avatar Logo beside Student Name */}
              <div className="relative shrink-0">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-indigo-300/80 shadow-md bg-indigo-700/60 flex items-center justify-center">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={studentName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="font-extrabold text-2xl sm:text-3xl text-white">
                      {studentName.charAt(0)}
                    </span>
                  )}
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-indigo-900 rounded-full" title="Active Enrollment" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    Welcome back, {studentName}!
                  </h1>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    Good Standing
                  </span>
                </div>
                <p className="text-sm sm:text-base text-indigo-100 font-medium flex items-center gap-2 flex-wrap">
                  <span>{degree}</span>
                  <span>&bull;</span>
                  <span>{branch}</span>
                  <span>&bull;</span>
                  <span>Semester {semester}</span>
                </p>
                <p className="text-xs sm:text-sm text-indigo-200/80 font-mono">
                  Roll ID: {studentId} &bull; {college}
                </p>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/student/focus">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-white/10 hover:bg-white/20 text-white border-white/20 shadow-xs text-sm font-semibold backdrop-blur-sm"
                >
                  <Timer className="w-4 h-4 text-indigo-300" />
                  <span>FocusNest (25m)</span>
                </Button>
              </Link>

              <Link href="/student/coding">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-white/10 hover:bg-white/20 text-white border-white/20 shadow-xs text-sm font-semibold backdrop-blur-sm"
                >
                  <Terminal className="w-4 h-4 text-emerald-300" />
                  <span>Coding Playground</span>
                </Button>
              </Link>

              <Link href="/student/assessments">
                <Button
                  variant="primary"
                  size="sm"
                  className="gap-2 bg-indigo-500 hover:bg-indigo-600 text-white shadow-xs text-sm font-semibold"
                >
                  <Play className="w-4 h-4" />
                  <span>Practice Test</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* FOUR CLEAN, READABLE PERFORMANCE INDICATORS (No repeated percentage clutter) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card className="border-slate-200/80 shadow-xs hover:border-indigo-300 transition-colors">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Academic Standing
                </span>
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-slate-900">Grade A+</p>
              <p className="text-xs sm:text-sm text-slate-600">
                88% Aggregate &bull; 5 Enrolled Subjects
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 shadow-xs hover:border-emerald-300 transition-colors">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Class Attendance
                </span>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CalendarCheck className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-emerald-700">92% Regular</p>
              <p className="text-xs sm:text-sm text-slate-600">
                Safely above 75% institutional requirement
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 shadow-xs hover:border-teal-300 transition-colors">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Assessments Completed
                </span>
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                  <CheckSquare className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-slate-900">3 of 3 Tests</p>
              <p className="text-xs sm:text-sm text-slate-600">
                100% on-time submission rate
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 shadow-xs hover:border-amber-300 transition-colors">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Semester Curriculum
                </span>
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-slate-900">19 Credits</p>
              <p className="text-xs sm:text-sm text-slate-600">
                Semester 5 &bull; CS Core Curriculum
              </p>
            </CardContent>
          </Card>
        </div>

        {/* VISUAL ACADEMIC PROGRESS DIAGRAM STRIP */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Semester 5 Curriculum Progress Overview
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Course unit completion progress across your enrolled subjects
              </p>
            </div>
            <Link href="/student/academics" className="text-xs sm:text-sm text-indigo-600 font-semibold hover:underline flex items-center gap-1">
              <span>View Detailed Marks &amp; Syllabus</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Visual Progress Bar Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
            {[
              { code: 'CS501', name: 'Algorithms', progress: 78, color: 'bg-indigo-600' },
              { code: 'CS502', name: 'DBMS', progress: 82, color: 'bg-blue-600' },
              { code: 'CS503', name: 'Operating Systems', progress: 74, color: 'bg-teal-600' },
              { code: 'CS504', name: 'Networks', progress: 70, color: 'bg-emerald-600' },
              { code: 'CS505', name: 'AI Foundations', progress: 86, color: 'bg-purple-600' },
            ].map((s) => (
              <div key={s.code} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="font-mono text-slate-800">{s.code}</span>
                  <span className="text-slate-600">{s.progress}%</span>
                </div>
                <p className="text-[11px] text-slate-500 truncate">{s.name}</p>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MAIN SECTION: CURRENT SEMESTER SUBJECTS & SIDEBAR WIDGETS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
          {/* LEFT: Current Semester Subjects & Learning Materials (8 Cols) */}
          <Card className="lg:col-span-8 border-slate-200/90 shadow-xs">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <CardTitle className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  <span>Enrolled Semester Subjects &amp; Learning Materials</span>
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Access course outlines, lecture notes, and textbook citations
                </CardDescription>
              </div>
              <Link href="/student/subjects" className="text-xs sm:text-sm text-indigo-600 font-semibold hover:underline flex items-center gap-1">
                <span>All Subjects</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              {defaultStudent.subjects.map((sub) => (
                <div
                  key={sub.code}
                  className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/60 hover:bg-slate-100/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-md">
                        {sub.code}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">{sub.name}</h4>
                    </div>
                    <p className="text-xs text-slate-600">
                      Credits: <strong className="text-slate-800">{sub.credits}</strong> &bull; Attendance: <strong className="text-emerald-700">{sub.attendance}%</strong> &bull; Standing: <strong className="text-indigo-700">{sub.grade}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link href="/student/subjects">
                      <Button variant="outline" size="sm" className="h-8 text-xs font-semibold gap-1.5 bg-white hover:bg-indigo-50 hover:text-indigo-700">
                        <FileText className="w-3.5 h-3.5 text-slate-500" />
                        <span>Lecture Notes</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* RIGHT: FocusNest Hub & Coding Playground (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            {/* FocusNest Widget */}
            <Card className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border-0 shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="neutral" className="bg-white/10 text-indigo-200 border-white/20 text-xs font-semibold">
                    FocusNest Timer
                  </Badge>
                  <Timer className="w-5 h-5 text-indigo-300" />
                </div>
                <CardTitle className="text-white text-base sm:text-lg mt-2">Deep Study Session</CardTitle>
                <CardDescription className="text-slate-300 text-xs sm:text-sm">
                  Enter an uninterrupted focus block to prepare for upcoming tests
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-1">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm space-y-1.5">
                  <div className="flex justify-between text-slate-300">
                    <span>Suggested Session:</span>
                    <span className="font-bold text-white">25 Minutes</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Target Subject:</span>
                    <span className="text-indigo-300 font-semibold">CS501 Algorithms</span>
                  </div>
                </div>

                <Link href="/student/focus" className="block w-full">
                  <Button variant="primary" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white shadow-xs font-semibold text-sm py-2.5">
                    <Timer className="w-4 h-4 mr-2" />
                    <span>Launch FocusNest Timer</span>
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Coding Playground Quick Launcher */}
            <Card className="border-slate-200 bg-white shadow-xs">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="info" className="text-xs font-mono">Multi-Language Sandbox</Badge>
                  <Terminal className="w-5 h-5 text-indigo-600" />
                </div>
                <CardTitle className="text-slate-900 text-base mt-1">Coding Playground</CardTitle>
                <CardDescription className="text-slate-500 text-xs sm:text-sm">
                  Test and compile C, Java, and Python coursework algorithms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <div className="flex gap-2 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-semibold">C</span>
                  <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-semibold">Java</span>
                  <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-semibold">Python</span>
                </div>
                <Link href="/student/coding" className="block w-full">
                  <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm font-semibold gap-1.5 text-slate-700 hover:text-indigo-600 py-2">
                    <span>Open Code Editor</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* BOTTOM SECTION: UPCOMING EXAMS & TO-DO QUEUE (PRESERVED PER REQ 3 & REQ 7) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {/* Upcoming Examinations Countdown */}
          <Card className="border-slate-200/90 shadow-xs">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <CardTitle className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-600" />
                  <span>Upcoming Examinations</span>
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  End-semester dates and 5-day morning reminder countdowns
                </CardDescription>
              </div>
              <Link href="/student/exams" className="text-xs sm:text-sm text-indigo-600 font-semibold hover:underline">
                View Timetable &rarr;
              </Link>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              {defaultStudent.exams.map((ex) => {
                const daysLeft = calculateDaysRemaining(ex.date);
                return (
                  <div
                    key={ex.id}
                    className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-center justify-between text-xs sm:text-sm"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-indigo-700 font-bold bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                          {ex.code}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base">{ex.subject}</h4>
                      </div>
                      <p className="text-xs text-slate-500">
                        Venue: <strong className="text-slate-700">{ex.venue}</strong> &bull; Time: <strong className="text-slate-700">{ex.time}</strong>
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded text-xs sm:text-sm block">
                        {daysLeft > 0 ? `In ${daysLeft} Days` : 'Today'}
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-0.5 font-mono">{ex.date}</span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Pending Tasks & Action Items */}
          <Card className="border-slate-200/90 shadow-xs">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <CardTitle className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-teal-600" />
                  <span>Academic To-Do &amp; Deadlines</span>
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Priority coursework milestones and deliverables
                </CardDescription>
              </div>
              <Link href="/student/tasks" className="text-xs sm:text-sm text-indigo-600 font-semibold hover:underline">
                Manage Tasks &rarr;
              </Link>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              {tasks.map((tsk) => (
                <div
                  key={tsk.id}
                  onClick={() => handleToggleTask(tsk.id)}
                  className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-center justify-between text-xs sm:text-sm hover:bg-slate-100/70 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={tsk.completed}
                      onChange={() => handleToggleTask(tsk.id)}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer w-4 h-4"
                    />
                    <div>
                      <p className={`font-semibold ${tsk.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {tsk.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        Category: {tsk.category} &bull; Due: {tsk.dueDate}
                      </p>
                    </div>
                  </div>
                  <Badge variant={tsk.priority === 'high' ? 'danger' : tsk.priority === 'medium' ? 'warning' : 'neutral'}>
                    {tsk.priority}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
