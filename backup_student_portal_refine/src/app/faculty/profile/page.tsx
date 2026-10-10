'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth/auth-context';
import { UserCheck, Mail, Building, Award, Calendar, BookOpen } from 'lucide-react';

export default function FacultyProfilePage() {
  const { user } = useAuth();

  return (
    <DashboardShell>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Faculty Academic Profile</h1>
          <p className="text-xs text-slate-500 mt-1">
            Instructor credentials, assigned department, and institutional advising allocations
          </p>
        </div>

        <Card>
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 border-b border-slate-100 pb-6">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-md">
                {user?.name?.charAt(0) || 'K'}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900">{user?.name || 'Dr. K. Raman'}</h2>
                  <Badge variant="success" className="gap-1">
                    <UserCheck className="w-3 h-3" /> Verified Faculty
                  </Badge>
                </div>
                <p className="text-xs text-slate-600">
                  Professor &bull; Department of Computer Science &amp; Engineering
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  Employee ID: {user?.employeeId || 'FAC-CS-042'} &bull; {user?.college || 'Apex Institute of Technology'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  Assigned Teaching Courses (Fall 2026)
                </h4>
                <ul className="space-y-1.5 text-slate-600">
                  <li>&bull; CS501: Design &amp; Analysis of Algorithms (Section A &amp; B)</li>
                  <li>&bull; CS502: Database Management Systems (Section A)</li>
                  <li>&bull; CS506: Distributed Systems Capstone Mentor</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  Advising &amp; Office Hours
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  Tuesdays &amp; Thursdays: 03:00 PM &ndash; 05:00 PM<br />
                  Location: Faculty Block C, Room 304<br />
                  Assigned Cohort: CS Semester 5 (148 students)
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="outline" size="sm" onClick={() => alert("Profile update request queued.")}>
                Request Departmental Updates
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
