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
  Award,
  AlertTriangle,
  CalendarCheck,
  FileUp,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import {
  DEMO_COHORT_OVERVIEW,
  DEMO_SCORE_DISTRIBUTION,
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
        {/* Top Header & Fast Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Faculty Dashboard</h1>
              <Badge variant="neutral" className="text-[11px]">Supporting Portal</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Apex Institute of Technology &bull; Student Progress Monitoring &amp; Early Support
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/faculty/imports">
              <Button variant="primary" size="sm" className="gap-1.5 shadow-xs">
                <FileUp className="w-3.5 h-3.5" />
                <span>Ingest CSV Data</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 Essential Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Assigned Students"
            value={DEMO_COHORT_OVERVIEW.totalStudents}
            subtitle={`${DEMO_COHORT_OVERVIEW.sufficientDataCount} with complete data profiles`}
            icon={<Users className="w-5 h-5" />}
            highlightColor="indigo"
            trend={{ value: "Fall 2026 Cohort", direction: "up" }}
          />

          <StatCard
            title="Average Success Score"
            value={`${DEMO_COHORT_OVERVIEW.avgSuccessScore}/100`}
            subtitle="Transparent 30/20/20/15/15 weighting"
            icon={<Award className="w-5 h-5" />}
            highlightColor="teal"
            trend={{ value: "+1.9 pts vs mid-term", direction: "up" }}
          />

          <StatCard
            title="Cohort Attendance Overview"
            value="81.4%"
            subtitle="Above 75% institutional baseline"
            icon={<CalendarCheck className="w-5 h-5" />}
            highlightColor="emerald"
            trend={{ value: "Stable attendance", direction: "up" }}
          />

          <StatCard
            title="Students Needing Review"
            value={studentsNeedingSupport}
            subtitle="Triggered support signals (e.g. <75% att)"
            icon={<AlertTriangle className="w-5 h-5" />}
            highlightColor="rose"
            trend={{ value: "Consider follow-up", direction: "down" }}
          />
        </div>

        {/* Visual Charts: 1 Academic Trend Chart + 1 Score/Attendance Distribution Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart 1: Success Score Tier Distribution (1 Col) */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Cohort Score Distribution</CardTitle>
              <CardDescription>Composite success scores out of 100</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3.5">
              {DEMO_SCORE_DISTRIBUTION.map((tier) => {
                const total = 148;
                const pct = Math.round((tier.count / total) * 100);
                return (
                  <div key={tier.range} className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-700">{tier.range}</span>
                      <span className="text-slate-500 font-mono text-[11px]">
                        {tier.count} students ({pct}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, backgroundColor: tier.fill }}
                      />
                    </div>
                  </div>
                );
              })}
              <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 leading-relaxed">
                Weights: Academics (30%), Attendance (20%), Assessments (20%), LMS (15%), Skills (15%).
              </p>
            </CardContent>
          </Card>

          {/* Chart 2: Academic & Attendance Performance Trajectory (2 Cols) */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-sm">Semester Academic &amp; Attendance Trajectory</CardTitle>
                <CardDescription>Monthly cohort progression tracking recovery patterns</CardDescription>
              </div>
              <Badge variant="success">Fall 2026</Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2 text-center pt-1">
                {DEMO_MONTHLY_TRENDS.map((m) => (
                  <div
                    key={m.month}
                    className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 flex flex-col items-center"
                  >
                    <span className="text-xs font-bold text-slate-500 uppercase">{m.month}</span>
                    <span className="text-lg font-extrabold text-indigo-600 mt-1">{m.avgScore}</span>
                    <span className="text-[10px] text-slate-400">Score</span>
                    <span className="text-xs font-semibold text-emerald-700 mt-2 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      {m.attendanceRate}% Att.
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-bold">Evidence-Based Insight:</span> Attendance recovered to 81.4% in October following Week 6 academic advisories.
                </div>
                <Link href="/faculty/analytics" className="font-semibold text-indigo-600 hover:underline shrink-0">
                  Detailed Cohort Analytics &rarr;
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Central Searchable, Filterable Student Table */}
        <Card>
          <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" />
                <span>Assigned Cohort Directory</span>
              </CardTitle>
              <CardDescription>
                Search and filter students to inspect evidence-based support indicators ({filteredStudents.length} of {DEMO_STUDENTS.length} students shown)
              </CardDescription>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {/* Search input */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search name or roll no..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-indigo-500 w-44"
                />
              </div>

              {/* Department filter */}
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

              {/* Status filter */}
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
                    <th className="px-4 py-3">Success Score</th>
                    <th className="px-4 py-3">Attendance</th>
                    <th className="px-4 py-3">Academic Trend</th>
                    <th className="px-4 py-3">Support Status</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => {
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
                            <span className="font-bold text-slate-900">{student.successScore}</span>
                            <span className="text-[10px] text-slate-400">/100</span>
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
                                <span>View Details</span>
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
