'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DEMO_STUDENTS } from '@/lib/demo-data/students';
import { GraduationCap, Award, BookOpen, Filter } from 'lucide-react';

export default function StudentAcademicsPage() {
  const student = DEMO_STUDENTS[0];
  const [selectedSem, setSelectedSem] = useState(5);

  const filteredSubjects = student.subjects.filter((s) => s.semester === selectedSem);

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Academics &amp; Course Marks</h1>
            <p className="text-xs text-slate-500 mt-1">
              Internal assessment splits, external exam grades, and subject-wise credit records
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs shadow-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500">Semester:</span>
            <select
              value={selectedSem}
              onChange={(e) => setSelectedSem(Number(e.target.value))}
              className="font-bold text-slate-800 bg-transparent cursor-pointer focus:outline-none"
            >
              <option value={5}>Semester 5 (Current)</option>
              <option value={4}>Semester 4 (Completed)</option>
            </select>
          </div>
        </div>

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
            <CardDescription>Verified academic marks from latest departmental CSV sync</CardDescription>
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
    </DashboardShell>
  );
}
