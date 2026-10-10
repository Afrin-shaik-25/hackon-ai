'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DEMO_STUDENTS } from '@/lib/demo-data/students';
import { User, Mail, GraduationCap, Building, Award, CheckCircle2 } from 'lucide-react';

export default function StudentProfilePage() {
  const student = DEMO_STUDENTS[0];

  return (
    <DashboardShell>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Student Profile</h1>
          <p className="text-xs text-slate-500 mt-1">
            Personal enrollment details, academic standing, and privacy preferences
          </p>
        </div>

        <Card>
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 border-b border-slate-100 pb-6">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-md">
                {student.name.charAt(0)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900">{student.name}</h2>
                  <Badge variant="success">Enrolled Full-Time</Badge>
                </div>
                <p className="text-xs text-slate-600">
                  {student.department} &bull; Semester {student.semester} (Section {student.section})
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  Roll ID: {student.studentId} &bull; {student.college}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-600" />
                  Academic Profile
                </h4>
                <ul className="space-y-1 text-slate-600">
                  <li>&bull; Overall Success Score: <strong>{student.successScore}/100</strong></li>
                  <li>&bull; Attendance Percentage: <strong>{student.attendancePercentage}%</strong></li>
                  <li>&bull; Year of Study: Year {student.year}</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  Recruiter Visibility &amp; Consent
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  Your verified skills and capstone repositories are visible to verified recruiters on the Company Portal. Private counseling and attendance logs remain strictly confidential.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="outline" size="sm" onClick={() => alert("Privacy preferences saved.")}>
                Update Privacy Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
