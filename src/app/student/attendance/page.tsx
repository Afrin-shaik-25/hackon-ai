'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DEMO_STUDENTS } from '@/lib/demo-data/students';
import { CalendarCheck, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

export default function StudentAttendancePage() {
  const student = DEMO_STUDENTS[0];
  const threshold = 75;

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Attendance Consistency</h1>
            <p className="text-xs text-slate-500 mt-1">
              Biometric check-ins and lecture presence against the 75% institutional requirement threshold
            </p>
          </div>

          <Badge variant="success" className="gap-1.5 py-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Eligible for Examinations (&gt;75%)</span>
          </Badge>
        </div>

        {/* Overall Attendance Metric Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200">
            <p className="text-xs text-slate-500 font-medium uppercase">Overall Attendance</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-emerald-600">{student.attendancePercentage}%</span>
              <span className="text-xs text-slate-400">/ 100%</span>
            </div>
            <p className="text-[11px] text-emerald-700 font-medium mt-1">
              +17% above mandatory 75% threshold
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200">
            <p className="text-xs text-slate-500 font-medium uppercase">Total Classes Conducted</p>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">112</p>
            <p className="text-[11px] text-slate-500 mt-1">Attended 103 lectures</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200">
            <p className="text-xs text-slate-500 font-medium uppercase">Allowed Absences Buffer</p>
            <p className="text-3xl font-extrabold text-indigo-600 mt-1">19</p>
            <p className="text-[11px] text-slate-500 mt-1">Buffer before falling under 75%</p>
          </div>
        </div>

        {/* Subject-Wise Attendance Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Course-Wise Attendance Breakdown</CardTitle>
            <CardDescription>Individual subject attendance against institutional minimum</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {student.subjects.map((sub) => (
              <div key={sub.code} className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-indigo-600 font-bold">{sub.code}</span>
                    <span className="font-semibold text-slate-800">{sub.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold font-mono ${sub.attendance < threshold ? 'text-rose-600' : 'text-slate-900'}`}>
                      {sub.attendance}%
                    </span>
                    <Badge variant={sub.attendance >= threshold ? 'success' : 'danger'}>
                      {sub.attendance >= threshold ? 'Compliant' : 'Shortage'}
                    </Badge>
                  </div>
                </div>

                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${sub.attendance >= threshold ? 'bg-emerald-500' : 'bg-rose-500'}`}
                    style={{ width: `${sub.attendance}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Attendance Session Logs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Biometric Session Check-Ins</CardTitle>
            <CardDescription>Latest scanned class attendances</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold text-[11px]">
                    <th className="p-3">Date</th>
                    <th className="p-3">Course</th>
                    <th className="p-3">Topic Covered</th>
                    <th className="p-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {student.attendanceRecords.map((att) => (
                    <tr key={att.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono text-slate-500">{att.date}</td>
                      <td className="p-3 font-semibold text-slate-900">{att.subject}</td>
                      <td className="p-3 text-slate-600">{att.topic}</td>
                      <td className="p-3 text-right">
                        <Badge variant={att.status === 'Present' ? 'success' : 'danger'}>
                          {att.status}
                        </Badge>
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
