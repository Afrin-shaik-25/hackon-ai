'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { StatCard } from '@/components/shared/stat-card';
import { SuccessScoreGauge } from '@/components/shared/success-score-gauge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RiskBadge } from '@/components/shared/risk-badge';
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
  Award,
  Layers,
  CheckCircle2
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
  };

  // Average academic marks
  const avgMarks = Math.round(
    defaultStudent.subjects.reduce((acc, s) => acc + s.total, 0) / defaultStudent.subjects.length
  );

  // Calculate days remaining helper
  const calculateDaysRemaining = (examDateStr: string): number => {
    const today = new Date('2026-10-10');
    const examDate = new Date(examDateStr);
    const diffTime = examDate.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Modern, Clean Welcome Greeting with User Avatar beside Name */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 sm:p-7 rounded-2xl shadow-sm">
          {/* Subtle Educational Background Accents */}
          <div className="absolute -right-8 -bottom-10 opacity-10 pointer-events-none select-none">
            <svg width="280" height="280" viewBox="0 0 200 200" fill="currentColor">
              <path d="M100 20 L180 65 L100 110 L20 65 Z" />
              <path d="M40 85 L40 135 C40 160 160 160 160 135 L160 85" stroke="currentColor" strokeWidth="12" fill="none" />
              <path d="M180 65 L180 145" stroke="currentColor" strokeWidth="8" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              {/* User Avatar Logo beside Student Name */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-indigo-300/60 shadow-md bg-indigo-700/50 flex items-center justify-center">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={studentName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="font-extrabold text-2xl text-white">
                      {studentName.charAt(0)}
                    </span>
                  )}
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-indigo-900 rounded-full" title="Active Student" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    Welcome back, {studentName}!
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    Good Standing
                  </span>
                </div>
                <p className="text-xs text-indigo-100/90 flex items-center gap-1.5 flex-wrap">
                  <span>{degree}</span>
                  <span>&bull;</span>
                  <span>{branch}</span>
                  <span>&bull;</span>
                  <span>Semester {semester}</span>
                  <span>&bull;</span>
                  <span className="text-indigo-200">{college}</span>
                </p>
                <p className="text-[11px] text-indigo-200/70 font-mono">
                  Roll ID: {studentId} &bull; Section {defaultStudent.section}
                </p>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Link href="/student/focus">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 bg-white/10 hover:bg-white/20 text-white border-white/20 shadow-xs text-xs backdrop-blur-sm"
                >
                  <Timer className="w-3.5 h-3.5 text-indigo-300" />
                  <span>FocusNest (25m)</span>
                </Button>
              </Link>

              <Link href="/student/coding">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 bg-white/10 hover:bg-white/20 text-white border-white/20 shadow-xs text-xs backdrop-blur-sm"
                >
                  <Terminal className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Coding Playground</span>
                </Button>
              </Link>

              <Link href="/student/assessments">
                <Button
                  variant="primary"
                  size="sm"
                  className="gap-1.5 bg-indigo-500 hover:bg-indigo-600 text-white shadow-xs text-xs"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Practice Test</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Clean Top Stat Cards: Separate Performance Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Academic Marks"
            value={`${avgMarks}% Avg`}
            subtitle="Semester 5 aggregate across 5 subjects"
            icon={<GraduationCap className="w-5 h-5" />}
            highlightColor="indigo"
            trend={{ value: "A+ grade band", direction: "up" }}
          />

          <StatCard
            title="Attendance Record"
            value={`${defaultStudent.attendancePercentage}%`}
            subtitle="Above 75% institutional requirement"
            icon={<CalendarCheck className="w-5 h-5" />}
            highlightColor="emerald"
            trend={{ value: "Safe regular standing", direction: "up" }}
          />

          <StatCard
            title="Assessment Practice"
            value={`${defaultStudent.assessments.length} Tests Done`}
            subtitle="89% average score across quizzes"
            icon={<CheckSquare className="w-5 h-5" />}
            highlightColor="teal"
            trend={{ value: "100% submission rate", direction: "up" }}
          />

          <StatCard
            title="Semester Subjects"
            value={`${defaultStudent.subjects.length} Enrolled`}
            subtitle={`${degree} ${branch}`}
            icon={<BookOpen className="w-5 h-5" />}
            highlightColor="amber"
            trend={{ value: "19 Total Credits", direction: "up" }}
          />
        </div>

        {/* Performance Analytics Gauge */}
        <SuccessScoreGauge
          breakdown={defaultStudent.scoreBreakdown}
          lastUpdated={defaultStudent.dataCompleteness.lastUpdated}
          dataCompleteness={defaultStudent.dataCompleteness.percent}
        />

        {/* Middle Section: Semester Subjects & Learning Materials (Replaced Skills & Projects!) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Semester Subjects & Learning Content (8 Cols) */}
          <Card className="lg:col-span-8">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-sm flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>Current Semester Subjects &amp; Learning Content</span>
                </CardTitle>
                <CardDescription>
                  Curriculum modules, syllabus topics, and notes based on your academic profile
                </CardDescription>
              </div>
              <Link href="/student/subjects" className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1">
                <span>View Full Syllabus</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {defaultStudent.subjects.map((sub) => (
                <div
                  key={sub.code}
                  className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-100/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                        {sub.code}
                      </span>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{sub.name}</h4>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Credits: <strong className="text-slate-700">{sub.credits}</strong> &bull; Attendance: <strong className="text-emerald-700">{sub.attendance}%</strong> &bull; Target Grade: <strong className="text-indigo-700">{sub.grade}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link href={`/student/subjects`}>
                      <Button variant="outline" size="sm" className="h-7 text-[11px] gap-1 bg-white hover:bg-indigo-50 hover:text-indigo-700">
                        <FileText className="w-3 h-3 text-slate-400" />
                        <span>Lecture Notes</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Right Column: FocusNest & Coding Playground Launchers (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* FocusNest Widget (Provisional name per Req 6) */}
            <Card className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border-0 shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="neutral" className="bg-white/10 text-indigo-200 border-white/20 text-[10px]">
                    FocusNest Hub
                  </Badge>
                  <Timer className="w-4 h-4 text-indigo-300" />
                </div>
                <CardTitle className="text-white text-sm mt-2">Deep Study Timer</CardTitle>
                <CardDescription className="text-slate-300 text-xs">
                  Block distractions and enter uninterrupted study flow
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-1">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs space-y-1">
                  <div className="flex justify-between text-slate-300 text-[11px]">
                    <span>Suggested Session:</span>
                    <span className="font-bold text-white">25 Minutes</span>
                  </div>
                  <div className="flex justify-between text-slate-300 text-[11px]">
                    <span>Target Subject:</span>
                    <span className="text-indigo-300 font-semibold">CS501 Algorithms</span>
                  </div>
                </div>

                <Link href="/student/focus" className="block w-full">
                  <Button variant="primary" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white shadow-xs font-semibold text-xs py-2">
                    <Timer className="w-3.5 h-3.5 mr-1.5" />
                    <span>Launch FocusNest Session</span>
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Coding Playground Quick Access */}
            <Card className="border-slate-200 bg-white">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="info" className="text-[10px] font-mono">Sandbox</Badge>
                  <Terminal className="w-4 h-4 text-indigo-600" />
                </div>
                <CardTitle className="text-slate-900 text-sm mt-1">Coding Playground</CardTitle>
                <CardDescription className="text-slate-500 text-xs">
                  Compile and test C, Java, and Python coursework
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2.5 pt-0">
                <div className="flex gap-1.5 text-[10px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">C (GCC)</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">Java 21</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">Python 3.11</span>
                </div>
                <Link href="/student/coding" className="block w-full">
                  <Button variant="outline" size="sm" className="w-full text-xs font-semibold gap-1 text-slate-700 hover:text-indigo-600">
                    <span>Open Editor</span>
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Lower Row: Upcoming Exams & Pending Tasks (Preserved per Req 7!) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Examinations Countdown */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span>Upcoming Examinations</span>
                </CardTitle>
                <CardDescription>Timetable countdown &amp; scheduled morning reminders</CardDescription>
              </div>
              <Link href="/student/exams" className="text-xs text-indigo-600 font-semibold hover:underline">
                View Timetable &rarr;
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {defaultStudent.exams.map((ex) => {
                const daysLeft = calculateDaysRemaining(ex.date);
                return (
                  <div
                    key={ex.id}
                    className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-center justify-between text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-indigo-700 font-bold bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                          {ex.code}
                        </span>
                        <h4 className="font-bold text-slate-900">{ex.subject}</h4>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Venue: <span className="text-slate-700 font-medium">{ex.venue}</span> &bull; Time: <span className="text-slate-700 font-medium">{ex.time}</span>
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded text-xs block">
                        {daysLeft > 0 ? `In ${daysLeft} Days` : 'Today'}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{ex.date}</span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Pending Tasks & Action Items */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-teal-600" />
                  <span>To-Do List &amp; Study Queue</span>
                </CardTitle>
                <CardDescription>Priority academic deadlines and milestones</CardDescription>
              </div>
              <Link href="/student/tasks" className="text-xs text-indigo-600 font-semibold hover:underline">
                Manage Tasks &rarr;
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks.map((tsk) => (
                <div
                  key={tsk.id}
                  onClick={() => handleToggleTask(tsk.id)}
                  className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-center justify-between text-xs hover:bg-slate-100/60 cursor-pointer transition-colors"
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
                      <p className="text-[11px] text-slate-500">
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
