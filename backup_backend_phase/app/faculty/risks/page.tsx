'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RiskBadge } from '@/components/shared/risk-badge';
import { DEMO_STUDENTS } from '@/lib/demo-data/students';
import { AlertTriangle, AlertOctagon, Info, HeartHandshake, Eye, Sliders } from 'lucide-react';

export default function FacultyRisksPage() {
  const [attendanceThreshold, setAttendanceThreshold] = useState(75);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Gather all risk indicators across students
  const allRiskItems = DEMO_STUDENTS.flatMap((student) =>
    student.riskIndicators.map((ri) => ({
      ...ri,
      studentId: student.id,
      studentName: student.name,
      studentRoll: student.studentId,
      studentScore: student.successScore,
      studentDept: student.department,
      studentAttendance: student.attendancePercentage,
      studentRiskLevel: student.riskLevel,
    }))
  );

  const filteredRisks = allRiskItems.filter((item) => {
    return selectedCategory === 'All' || item.category === selectedCategory;
  });

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Risk Review &amp; Early Warnings</h1>
            <p className="text-xs text-slate-500 mt-1">
              Multi-factor early identification queue with transparent metrics and configurable thresholds
            </p>
          </div>

          {/* Configurable Threshold Bar */}
          <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200 text-xs shadow-xs">
            <Sliders className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600 font-medium">Attendance Threshold:</span>
            <select
              value={attendanceThreshold}
              onChange={(e) => setAttendanceThreshold(Number(e.target.value))}
              className="font-bold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value={75}>75% (Mandatory Bar)</option>
              <option value={80}>80% (Early Advisory)</option>
              <option value={70}>70% (Critical Only)</option>
            </select>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Attendance', 'Academic', 'Engagement', 'Data Completeness'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Risk Queue Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm">Active Review Queue ({filteredRisks.length} Signals)</CardTitle>
                <CardDescription>
                  Signals flag patterns for advising; they do not predict unavoidable outcomes
                </CardDescription>
              </div>
              <Badge variant="warning">Action Recommended</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold text-[11px]">
                    <th className="px-4 py-3">Student</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Observed Pattern &amp; Evidence</th>
                    <th className="px-4 py-3">Metric</th>
                    <th className="px-4 py-3">Period</th>
                    <th className="px-4 py-3">Suggested Support Action</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRisks.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <Link href={`/faculty/students/${item.studentId}`} className="hover:underline">
                          <p className="font-semibold text-slate-900">{item.studentName}</p>
                          <p className="text-[10px] text-slate-500 font-mono">{item.studentRoll}</p>
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={
                            item.severity === 'critical' ? 'danger' :
                            item.severity === 'warning' ? 'warning' : 'info'
                          }
                        >
                          {item.category}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-800 max-w-xs">
                        {item.reason}
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-indigo-700 bg-indigo-50/40">
                        {item.metric}
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-[11px]">
                        {item.period}
                      </td>
                      <td className="px-4 py-3 text-slate-600 max-w-xs">
                        {item.actionSuggestion}
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <Link href={`/faculty/students/${item.studentId}`}>
                          <Button variant="primary" size="sm" className="h-7 text-[11px] gap-1">
                            <HeartHandshake className="w-3 h-3" />
                            <span>Intervene</span>
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
