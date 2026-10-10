'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { DataTable, Column } from '@/components/shared/data-table';
import { RiskBadge } from '@/components/shared/risk-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DEMO_STUDENTS } from '@/lib/demo-data/students';
import { Student } from '@/types';
import { TrendingUp, TrendingDown, Minus, Eye, Filter } from 'lucide-react';

export default function FacultyStudentsPage() {
  const router = useRouter();
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedRisk, setSelectedRisk] = useState('All');

  // Filter students
  const filteredStudents = DEMO_STUDENTS.filter((s) => {
    const matchDept = selectedDept === 'All' || s.department === selectedDept;
    const matchRisk = selectedRisk === 'All' || s.riskLevel === selectedRisk;
    return matchDept && matchRisk;
  });

  const columns: Column<Student>[] = [
    {
      key: 'studentId',
      header: 'Student ID',
      sortable: true,
      render: (s) => (
        <span className="font-mono font-bold text-indigo-600">{s.studentId}</span>
      ),
    },
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      render: (s) => (
        <div>
          <p className="font-semibold text-slate-900">{s.name}</p>
          <p className="text-[11px] text-slate-500">{s.email}</p>
        </div>
      ),
    },
    {
      key: 'department',
      header: 'Dept & Sec',
      sortable: true,
      render: (s) => (
        <span className="text-slate-700">
          {s.department} &bull; Sec {s.section}
        </span>
      ),
    },
    {
      key: 'successScore',
      header: 'Success Score',
      sortable: true,
      render: (s) => {
        const delta = s.successScore - s.previousScore;
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold text-slate-900">{s.successScore}</span>
            <span
              className={`text-[10px] font-semibold flex items-center ${
                delta > 0 ? 'text-emerald-600' : delta < 0 ? 'text-rose-600' : 'text-slate-400'
              }`}
            >
              {delta > 0 && <TrendingUp className="w-3 h-3 mr-0.5" />}
              {delta < 0 && <TrendingDown className="w-3 h-3 mr-0.5" />}
              {delta === 0 && <Minus className="w-3 h-3 mr-0.5" />}
              {delta > 0 ? `+${delta}` : delta}
            </span>
          </div>
        );
      },
    },
    {
      key: 'attendancePercentage',
      header: 'Attendance',
      sortable: true,
      render: (s) => (
        <div>
          <span
            className={`font-semibold ${
              s.attendancePercentage < 75 ? 'text-rose-600' : 'text-slate-800'
            }`}
          >
            {s.attendancePercentage}%
          </span>
          {s.attendancePercentage < 75 && (
            <p className="text-[10px] text-rose-500 font-medium">&lt;75% Threshold</p>
          )}
        </div>
      ),
    },
    {
      key: 'riskLevel',
      header: 'Review Status',
      sortable: true,
      render: (s) => <RiskBadge level={s.riskLevel} />,
    },
    {
      key: 'dataCompleteness',
      header: 'Coverage',
      render: (s) => (
        <div className="text-[11px]">
          <span className="font-semibold text-slate-700">{s.dataCompleteness.percent}%</span>
          {s.dataCompleteness.missingSources.length > 0 && (
            <p className="text-[10px] text-amber-600 font-medium">Missing 1 source</p>
          )}
        </div>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (s) => (
        <Link href={`/faculty/students/${s.id}`}>
          <Button variant="outline" size="sm" className="h-7 text-xs">
            <Eye className="w-3 h-3 mr-1" />
            Inspect
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Assigned Student Cohort</h1>
            <p className="text-xs text-slate-500 mt-1">
              Active directory of enrolled students with multi-factor risk scoring and completeness indicators
            </p>
          </div>
        </div>

        {/* Directory Table with Custom Filter Bar */}
        <DataTable
          data={filteredStudents as unknown as Record<string, unknown>[]}
          columns={columns as unknown as Column<Record<string, unknown>>[]}
          searchKey="name"
          searchPlaceholder="Search by student name or roll..."
          onRowClick={(item) => router.push(`/faculty/students/${(item as unknown as Student).id}`)}
          filterComponent={
            <div className="flex items-center gap-2">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-700 cursor-pointer"
              >
                <option value="All">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Data Science">Data Science</option>
                <option value="Electronics & Comm">Electronics &amp; Comm</option>
              </select>

              <select
                value={selectedRisk}
                onChange={(e) => setSelectedRisk(e.target.value)}
                className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-700 cursor-pointer"
              >
                <option value="All">All Review Statuses</option>
                <option value="high">Needs Immediate Review</option>
                <option value="moderate">Moderate Watch</option>
                <option value="low">Good Standing</option>
                <option value="incomplete_data">Data Incomplete</option>
              </select>
            </div>
          }
        />
      </div>
    </DashboardShell>
  );
}
