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
import { DEMO_STUDENTS } from '@/lib/demo-data/students';
import {
  Award,
  CalendarCheck,
  GraduationCap,
  Timer,
  CheckSquare,
  ArrowRight,
  Sparkles,
  Calendar,
  AlertTriangle,
  Play,
  TrendingUp,
  FolderGit2,
  CheckCircle2,
  Clock,
  BookOpen,
  Cpu
} from 'lucide-react';

export default function StudentDashboardPage() {
  const student = DEMO_STUDENTS[0]; // Aarav Sharma (signed-in student)
  const [tasks, setTasks] = useState(student.tasks);

  // Toggle task completion
  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  // Calculate average academic marks
  const avgMarks = Math.round(
    student.subjects.reduce((acc, s) => acc + s.total, 0) / student.subjects.length
  );

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Welcome Greeting & Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm shrink-0">
              {student.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                  Welcome back, {student.name.split(' ')[0]}!
                </h1>
                <RiskBadge level={student.riskLevel} />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Roll No: <span className="font-mono font-semibold text-slate-700">{student.studentId}</span> &bull; {student.department} (Semester {student.semester}, Sec {student.section}) &bull; {student.college}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link href="/student/focus">
              <Button variant="outline" size="sm" className="gap-1.5 shadow-xs">
                <Timer className="w-4 h-4 text-indigo-600" />
                <span>Regain Focus (25m)</span>
              </Button>
            </Link>
            <Link href="/student/assessments">
              <Button variant="primary" size="sm" className="gap-1.5 shadow-xs">
                <Play className="w-3.5 h-3.5" />
                <span>Practice Test</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 Primary Top Summary Cards: Separate Performance Indicators */}
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
            value={`${student.attendancePercentage}%`}
            subtitle="Above 75% institutional requirement"
            icon={<CalendarCheck className="w-5 h-5" />}
            highlightColor="emerald"
            trend={{ value: "Safe regular standing", direction: "up" }}
          />

          <StatCard
            title="Assessment Performance"
            value={`${student.assessments.length} Tests Done`}
            subtitle="89% average score across quizzes"
            icon={<CheckSquare className="w-5 h-5" />}
            highlightColor="teal"
            trend={{ value: "100% submission rate", direction: "up" }}
          />

          <StatCard
            title="Learning Progress"
            value="90% Complete"
            subtitle="Active portal study and lecture modules"
            icon={<BookOpen className="w-5 h-5" />}
            highlightColor="amber"
            trend={{ value: "14h weekly activity", direction: "up" }}
          />
        </div>

        {/* Student Performance Analytics (Separate Indicators) */}
        <SuccessScoreGauge
          breakdown={student.scoreBreakdown}
          lastUpdated={student.dataCompleteness.lastUpdated}
          dataCompleteness={student.dataCompleteness.percent}
        />

        {/* Middle Row: Skills & Projects + Focus Timer Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Skills & Project Progress (2 Cols) */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-sm flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-indigo-600" />
                  <span>Skills &amp; Verified Projects</span>
                </CardTitle>
                <CardDescription>Academic capstone achievements and faculty validations</CardDescription>
              </div>
              <Link href="/student/skills" className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1">
                <span>View Passport</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {student.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{proj.title}</span>
                      <Badge variant={proj.verified ? 'success' : 'neutral'}>
                        {proj.verified ? 'Verified by Faculty' : 'Pending Review'}
                      </Badge>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed max-w-xl">
                      {proj.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[10px] font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  {proj.verifiedBy && (
                    <div className="text-right shrink-0 text-[11px] text-slate-500 bg-white sm:bg-transparent p-2 sm:p-0 rounded border sm:border-0 border-slate-200">
                      <span className="text-slate-400 block text-[10px]">Endorsed by</span>
                      <span className="font-semibold text-slate-700">{proj.verifiedBy}</span>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Regain Focus Session Quick Widget (1 Col) */}
          <Card className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="neutral" className="bg-white/10 text-indigo-200 border-white/20 text-[10px]">
                  Regain Focus
                </Badge>
                <Timer className="w-4 h-4 text-indigo-300" />
              </div>
              <CardTitle className="text-white text-base mt-2">Deep Study Session</CardTitle>
              <CardDescription className="text-slate-300 text-xs">
                Block distracting notifications and enter flow state.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>Suggested Duration:</span>
                  <span className="font-bold text-white">25 Minutes</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Distractions to Mute:</span>
                  <span className="text-amber-300 font-semibold">YouTube, Social Media</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 bg-black/20 p-2.5 rounded-lg border border-white/5">
                <span className="font-semibold text-slate-300">Demo Note:</span> Browser focus timer mode. Native OS app-blocking requires companion mobile service.
              </div>

              <Link href="/student/focus" className="block w-full">
                <Button variant="primary" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white shadow-md font-semibold text-xs py-2">
                  <Timer className="w-3.5 h-3.5 mr-1.5" />
                  <span>Launch Focus Session</span>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Lower Row: Upcoming Exams & Pending Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Examinations Countdown */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span>Upcoming Examinations</span>
                </CardTitle>
                <CardDescription>Verified academic timetable and venues</CardDescription>
              </div>
              <Link href="/student/exams" className="text-xs text-indigo-600 font-semibold hover:underline">
                View Timetable &rarr;
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {student.exams.map((ex) => (
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
                    <span className="font-bold text-slate-900 block">{ex.date}</span>
                    <span className="inline-block text-[10px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded mt-0.5">
                      {ex.type}
                    </span>
                  </div>
                </div>
              ))}
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

        {/* Personalized AI Recommendations & Next Steps */}
        <Card className="border-indigo-100 bg-gradient-to-r from-indigo-50/50 via-white to-blue-50/50">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Recommended Next Steps &bull; Student Guidance</span>
            </div>
            <CardTitle className="text-sm text-slate-900">Suggested Action Items for Aarav</CardTitle>
            <CardDescription>Generated from your recent academic performance and upcoming exams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>DAA Exam Prep</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Review Graph Algorithms (Dynamic Programming &amp; Dijkstra) ahead of the November 12 End-Sem exam.
                </p>
                <Link href="/student/assessments" className="text-[11px] text-indigo-600 font-semibold hover:underline inline-block pt-1">
                  Take Practice Quiz &rarr;
                </Link>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span>DBMS Capstone Report</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Submit the Phase 2 B+ Tree Indexing optimization benchmarks before the Oct 18 faculty checkpoint.
                </p>
                <Link href="/student/tasks" className="text-[11px] text-emerald-600 font-semibold hover:underline inline-block pt-1">
                  View Milestone &rarr;
                </Link>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-2 text-amber-600 font-bold text-xs">
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>Networks Attendance</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Attendance is healthy at 89%. Maintain minimum 3 more lectures this month to secure distinction criteria.
                </p>
                <Link href="/student/attendance" className="text-[11px] text-amber-600 font-semibold hover:underline inline-block pt-1">
                  View Attendance Log &rarr;
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
