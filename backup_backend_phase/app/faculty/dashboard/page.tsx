'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RiskBadge } from '@/components/shared/risk-badge';
import {
  Users,
  GraduationCap,
  AlertTriangle,
  CalendarCheck,
  Upload,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronRight,
  BookOpen,
  FileCheck2,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import {
  DEMO_COHORT_OVERVIEW,
  DEMO_MONTHLY_TRENDS
} from '@/lib/demo-data/faculty';
import { DEMO_STUDENTS } from '@/lib/demo-data/students';

export default function FacultyDashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Filter students based on search, department, and support status
  const filteredStudents = DEMO_STUDENTS.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || s.department === selectedDept;
    const matchesStatus =
      selectedStatus === 'All' ||
      (selectedStatus === 'needs_review' && s.riskLevel === 'high') ||
      (selectedStatus === 'may_need_support' && s.riskLevel === 'moderate') ||
      (selectedStatus === 'good_standing' && s.riskLevel === 'low');
    return matchesSearch && matchesDept && matchesStatus;
  });

  const studentsNeedingSupport = DEMO_STUDENTS.filter(
    (s) => s.riskLevel === 'high' || s.riskLevel === 'moderate'
  ).length;

  return (
    <DashboardShell>
      <div className="space-y-7 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Faculty Mentorship Dashboard
              </h1>
              <Badge variant="success">Active Cohort Term</Badge>
            </div>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Apex Institute of Technology &bull; Dr. K. Raman (Computer Science &amp; Engineering)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/faculty/imports">
              <Button variant="primary" size="md" className="gap-2 shadow-xs text-sm font-semibold">
                <Upload className="w-4 h-4" />
                <span>Upload Student Data</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 ESSENTIAL SUMMARY CARDS (Clear labels, increased font size, no duplicate percentages) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Assigned Students"
            value={DEMO_COHORT_OVERVIEW.totalStudents}
            subtitle="Fall 2026 enrolled cohort"
            icon={<Users className="w-5 h-5" />}
            highlightColor="indigo"
            trend={{ value: "All active", direction: "up" }}
          />

          <StatCard
            title="Cohort Performance"
            value="76.4% Avg"
            subtitle="Semester average across classes"
            icon={<GraduationCap className="w-5 h-5" />}
            highlightColor="teal"
            trend={{ value: "+2.1% this month", direction: "up" }}
          />

          <StatCard
            title="Class Attendance Rate"
            value="81.4%"
            subtitle="Above mandatory 75% threshold"
            icon={<CalendarCheck className="w-5 h-5" />}
            highlightColor="emerald"
            trend={{ value: "Safe regular standing", direction: "up" }}
          />

          <StatCard
            title="Students Needing Support"
            value={studentsNeedingSupport}
            subtitle="Attendance <75% or grade dip"
            icon={<AlertTriangle className="w-5 h-5" />}
            highlightColor="rose"
            trend={{ value: "Follow-up flagged", direction: "down" }}
          />
        </div>

        {/* FACULTY CLASSES & ACTIVE ASSIGNMENTS OVERVIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
          {/* Active Assigned Courses (7 Cols) */}
          <Card className="lg:col-span-7 border-slate-200/90 shadow-xs">
            <CardHeader className="pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                    <span>Assigned Courses &amp; Classes</span>
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-slate-500">
                    Active lecture sections and pending lab evaluations
                  </CardDescription>
                </div>
                <Badge variant="info">Semester 5</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-4 text-sm">
              <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/60 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded">
                      CS501
                    </span>
                    <h4 className="font-bold text-slate-900 text-base mt-1.5">
                      Design &amp; Analysis of Algorithms
                    </h4>
                  </div>
                  <Badge variant="success">60 Students</Badge>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  Lectures: Mon / Wed / Fri 09:30 AM (Hall A-102) &bull; Average Class Attendance: <strong className="text-emerald-700">84.2%</strong>
                </p>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                  <span>Current Unit: Dynamic Programming &amp; Graph Shortest Paths</span>
                  <span className="font-semibold text-indigo-600">Assignment 3 Active</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/60 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded">
                      CS502
                    </span>
                    <h4 className="font-bold text-slate-900 text-base mt-1.5">
                      Database Management Systems
                    </h4>
                  </div>
                  <Badge variant="success">60 Students</Badge>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  Lectures: Tue / Thu 11:00 AM (Hall A-104) &bull; Average Class Attendance: <strong className="text-emerald-700">79.8%</strong>
                </p>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                  <span>Current Unit: B+ Tree Indexing &amp; Query Plans</span>
                  <span className="font-semibold text-emerald-600">Lab Test Graded</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Insights Diagram (5 Cols) */}
          <Card className="lg:col-span-5 border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <span>Cohort Performance Distribution</span>
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm text-slate-500">
                  Grade band analysis across enrolled students
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 space-y-3.5 text-xs sm:text-sm">
                <div className="space-y-1.5">
                  <div className="flex justify-between font-semibold text-slate-800">
                    <span>Outstanding (Grade O &bull; 90-100%)</span>
                    <span className="text-indigo-600">22 Students (18%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: '18%' }} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between font-semibold text-slate-800">
                    <span>Excellent / Good (Grade A+ / A &bull; 75-89%)</span>
                    <span className="text-emerald-600">65 Students (54%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: '54%' }} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between font-semibold text-slate-800">
                    <span>Satisfactory (Grade B &bull; 60-74%)</span>
                    <span className="text-amber-600">19 Students (16%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '16%' }} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between font-semibold text-slate-800">
                    <span>Requires Academic Support (&lt;60%)</span>
                    <span className="text-rose-600">14 Students (12%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: '12%' }} />
                  </div>
                </div>
              </CardContent>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
              <strong className="text-slate-800">Advising Observation:</strong> 14 students flagged for proactive mentoring ahead of upcoming mid-term exams.
            </div>
          </Card>
        </div>

        {/* SEARCHABLE, FILTERABLE STUDENT DIRECTORY TABLE (Clean design, larger fonts) */}
        <Card className="border-slate-200/90 shadow-xs">
          <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 p-5 sm:p-6">
            <div>
              <CardTitle className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <span>Assigned Student Cohort Roster</span>
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Review student progress, academic standing, and mentoring notes ({filteredStudents.length} of {DEMO_STUDENTS.length} students displayed)
              </CardDescription>
            </div>

            {/* Filter & Search Controls */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search student or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48"
                />
              </div>

              <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-2 rounded-lg shadow-2xs">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="bg-transparent font-medium text-slate-700 focus:outline-none cursor-pointer text-xs sm:text-sm"
                >
                  <option value="All">All Departments</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Electronics & Comm">Electronics &amp; Comm</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-2 rounded-lg shadow-2xs">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-transparent font-medium text-slate-700 focus:outline-none cursor-pointer text-xs sm:text-sm"
                >
                  <option value="All">All Statuses</option>
                  <option value="needs_review">Needs Review</option>
                  <option value="may_need_support">May Need Support</option>
                  <option value="good_standing">Good Standing</option>
                </select>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-600 font-semibold text-xs uppercase tracking-wider">
                    <th className="px-5 py-3.5">Student Name &amp; Roll ID</th>
                    <th className="px-5 py-3.5">Department</th>
                    <th className="px-5 py-3.5">Academic Marks</th>
                    <th className="px-5 py-3.5">Attendance</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs shrink-0">
                            {s.avatar ? (
                              <img src={s.avatar} alt={s.name} className="w-full h-full object-cover rounded-xl" referrerPolicy="no-referrer" />
                            ) : (
                              s.name.charAt(0)
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{s.name}</p>
                            <p className="font-mono text-xs text-slate-500">{s.studentId} &bull; Sec {s.section}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-slate-700 text-sm">
                        {s.department}
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-bold text-slate-900 text-sm">
                          {Math.round(s.subjects.reduce((a, b) => a + b.total, 0) / s.subjects.length)}%
                        </span>
                        <span className="text-xs text-slate-500 block">{s.subjects.length} Subjects</span>
                      </td>

                      <td className="px-5 py-4">
                        <span className={`font-bold text-sm ${s.attendancePercentage < 75 ? 'text-rose-600' : 'text-emerald-700'}`}>
                          {s.attendancePercentage}%
                        </span>
                        <span className="text-xs text-slate-500 block">
                          {s.attendancePercentage < 75 ? 'Shortage Warning' : 'Regular Standing'}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <RiskBadge level={s.riskLevel} />
                      </td>

                      <td className="px-5 py-4 text-right">
                        <Link href={`/faculty/students/${s.id}`}>
                          <Button variant="outline" size="sm" className="text-xs font-semibold hover:bg-indigo-50 hover:text-indigo-700">
                            <span>View Profile</span>
                            <ChevronRight className="w-3.5 h-3.5 ml-1" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
