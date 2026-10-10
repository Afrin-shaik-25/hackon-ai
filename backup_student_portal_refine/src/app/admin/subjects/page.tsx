'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Plus, BookOpen } from 'lucide-react';

export default function AdminSubjectsPage() {
  const subjects = [
    { code: 'CS501', name: 'Design & Analysis of Algorithms', dept: 'Computer Science', credits: 4, sem: 5, enrolled: 148 },
    { code: 'CS502', name: 'Database Management Systems', dept: 'Computer Science', credits: 4, sem: 5, enrolled: 148 },
    { code: 'CS503', name: 'Operating Systems', dept: 'Computer Science', credits: 4, sem: 5, enrolled: 148 },
    { code: 'DS501', name: 'Machine Learning Principles', dept: 'Data Science', credits: 4, sem: 5, enrolled: 42 },
    { code: 'EC501', name: 'Embedded Systems Architecture', dept: 'Electronics & Comm', credits: 4, sem: 5, enrolled: 28 },
  ];

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Curricula &amp; Course Registry</h1>
            <p className="text-xs text-slate-500 mt-1">
              Configure course identifiers, internal/external weightings, and enrolled cohorts
            </p>
          </div>

          <Button variant="primary" size="sm" onClick={() => alert("Add course definition dialog")} className="gap-1.5">
            <Plus className="w-4 h-4" />
            <span>Add Course</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((sub) => (
            <Card key={sub.code}>
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {sub.code}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm mt-2">{sub.name}</h3>
                  </div>
                  <Badge variant="outline">{sub.credits} Credits</Badge>
                </div>

                <div className="text-xs text-slate-500 space-y-1 pt-1 border-t border-slate-100">
                  <p>Department: <strong className="text-slate-800">{sub.dept}</strong></p>
                  <p>Semester: <strong className="text-slate-800">{sub.sem}</strong> &bull; Enrolled: <strong className="text-slate-800">{sub.enrolled}</strong> students</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
