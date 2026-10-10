'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileCheck2, Plus } from 'lucide-react';

export default function AdminAssessmentsPage() {
  const tests = [
    { title: 'Algorithms Mid-Term Examination', type: 'MCQ', sub: 'CS501', maxScore: 50, submissions: 148, date: '2026-09-28' },
    { title: 'SQL & Query Optimization Lab Test', type: 'Coding', sub: 'CS502', maxScore: 50, submissions: 142, date: '2026-10-02' },
    { title: 'OS Kernel Threads Quiz', type: 'Assignment', sub: 'CS503', maxScore: 20, submissions: 139, date: '2026-10-05' },
    { title: 'ML Scikit-Learn Pipeline Test', type: 'MCQ', sub: 'DS501', maxScore: 50, submissions: 42, date: '2026-10-01' },
  ];

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Assessments &amp; Testing Registry</h1>
            <p className="text-xs text-slate-500 mt-1">
              Administer standardized examinations, objective quizzes, and coding challenges
            </p>
          </div>

          <Button variant="primary" size="sm" onClick={() => alert("Create assessment template")} className="gap-1.5">
            <Plus className="w-4 h-4" />
            <span>Register Assessment</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tests.map((t, idx) => (
            <Card key={idx}>
              <CardContent className="p-5 space-y-2 text-xs">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-bold">
                      {t.sub}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm mt-1">{t.title}</h3>
                  </div>
                  <Badge variant={t.type === 'Coding' ? 'info' : 'default'}>{t.type}</Badge>
                </div>

                <div className="flex items-center justify-between text-slate-500 pt-2 border-t border-slate-100">
                  <span>Submissions: <strong className="text-slate-800">{t.submissions}</strong></span>
                  <span>Max Score: <strong className="text-slate-800">{t.maxScore} pts</strong></span>
                  <span>Date: {t.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
