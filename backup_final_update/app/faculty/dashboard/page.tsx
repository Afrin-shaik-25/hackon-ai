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
  ChevronRight
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
      <div className="space-y-6">
        {/* Top Header & Simple Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Faculty Dashboard</h1>
              <Badge variant="neutral" className="text-[11px]">Supporting Portal</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Apex Institute of Technology &bull; Student Progress Monitoring &amp; Academic Support
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/faculty/imports">
              <Button variant="primary" size="sm" className="gap-1.5 shadow-xs">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Student Records</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 Essential Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Assigned Students"
            value={DEMO_COHORT_OVERVIEW.totalStudents}
            subtitle="Fall 2026 active semester cohort"
            icon={<Users className="w-5 h-5" />}
            highlightColor="indigo"
            trend={{ value: "All enrolled", direction: "up" }}
          />

          <StatCard
            title="Academic Performance"
            value="76.4% Avg"
            subtitle="Average course marks across cohort"
            icon={<GraduationCap className="w-5 h-5" />}
            highlightColor="teal"
            trend={{ value: "+2.1% this term", direction: "up" }}
          />

          <StatCard
            title="Attendance Overview"
            value="81.4%"
            subtitle="Above 75% institutional requirement"
            icon={<CalendarCheck className="w-5 h-5" />}
            highlightColor="emerald"
            trend={{ value: "Stable regular attendance", direction: "up" }}
          />

          <StatCard
            title="Students Needing Support"
            value={studentsNeedingSupport}
            subtitle="Attendance <75% or grade dip"
            icon={<AlertTriangle className="w-5 h-5" />}
            highlightColor="rose"
            trend={{ value: "Consider follow-up", direction: "down" }}
          />
        </div>

        {/* 1 Focused, Clean Trend Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-sm">Cohort Academic &amp; Attendance Progression</CardTitle>
              <CardDescription>Monthly semester progress tracking student attendance and average marks</CardDescription>
            </div>
            <Badge variant="success">Fall 2026 Term</Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-3 text-center pt-1">
              {DEMO_MONTHLY_TRENDS.map((m) => (
                <div
                  key={m.month}
                  className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 flex flex-col items-center"
                >
                  <span className="text-xs font-bold text-slate-500 uppercase">{m.month}</span>
                  <span className="text-xl font-extrabold text-indigo-600 mt-1">{m.avgScore}%</span>
                  <span className="text-[10px] text-slate-400">Avg Marks</span>
                  <span className="text-xs font-semibold text-emerald-700 mt-2 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    {m.attendanceRate}% Attendance
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-slate-900">Cohort Observation:</span> Attendance recovered to 81.4% in October following mid-term academic check-ins.
              </div>
              <Link href="/faculty/students" className="font-semibold text-indigo-600 hover:underline shrink-0">
                View All Student Details &rarr;
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Central Searchable, Filterable Student Table */}
        <Card>
          <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" />
                <span>Assigned Student Directory</span>
              </CardTitle>
              <CardDescription>
                Search and review student academic standing and support indicators ({filteredStudents.length} of {DEMO_STUDENTS.length} students shown)
              </CardDescription>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search student or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-indigo-500 w-44"
                />
              </div>

              <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1.5 rounded-lg shadow-2xs">
                <Filter className="w-3 h-3 text-slate-400" />
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="bg-transparent font-medium text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value="All">All Departments</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Electronics & Comm">Electronics &amp; Comm</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1.5 rounded-lg shadow-2xs">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-transparent font-medium text-slate-700 focus:outline-none cursor-pointer"
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
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-600 font-semibold text-[11px]">
                    <th className="px-4 py-3">Student Name &amp; ID</th>
                    <th className="px-4 py-3">Dept &amp; Section</th>
                    <th className="px-4 py-3">Academic Marks</th>
                    <th className="px-4 py-3">Attendance</th>
                    <th className="px-4 py-3">Trend</th>
                    <th className="px-4 py-3">Support Status</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => {
                      const avgStudentMarks = Math.round(
                        student.subjects.reduce((acc, sub) => acc + sub.total, 0) / student.subjects.length
                      );

                      const trendIcon =
                        student.trend === 'up' ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                            <TrendingUp className="w-3 h-3" /> Upward
                          </span>
                        ) : student.trend === 'down' ? (
                          <span className="inline-flex items-center gap-1 text-rose-600 font-medium">
                            <TrendingDown className="w-3 h-3" /> Declining
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                            <Minus className="w-3 h-3" /> Stable
                          </span>
                        );

                      return (
                        <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3">
                            <Link href={`/faculty/students/${student.id}`} className="hover:underline">
                              <p className="font-semibold text-slate-900">{student.name}</p>
                              <p className="text-[10px] text-slate-500 font-mono">{student.studentId}</p>
                            </Link>
                          </td>
                          <td className="px-4 py-3 text-slate-600">
                            {student.department} (Sec {student.section})
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-bold text-slate-900">{avgStudentMarks}%</span>
                            <span className="text-[10px] text-slate-400 ml-1">avg</span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`font-semibold ${
                                student.attendancePercentage < 75 ? 'text-rose-600' : 'text-slate-700'
                              }`}
                            >
                              {student.attendancePercentage}%
                            </span>
                            {student.attendancePercentage < 75 && (
                              <span className="block text-[10px] text-rose-500 font-medium">&lt;75% Bar</span>
                            )}
                          </td>
                          <td className="px-4 py-3">{trendIcon}</td>
                          <td className="px-4 py-3">
                            <RiskBadge level={student.riskLevel} />
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Link href={`/faculty/students/${student.id}`}>
                              <Button variant="outline" size="sm" className="h-7 text-[11px] gap-1">
                                <span>View Student</span>
                                <ChevronRight className="w-3 h-3 text-slate-400" />
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                        No students matching the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
