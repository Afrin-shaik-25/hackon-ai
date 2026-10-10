'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, Star, MessageSquare } from 'lucide-react';

export default function GraduateFeedbackPage() {
  const reviews = [
    { from: 'Dr. K. Raman (Faculty Mentor)', project: 'Distributed Queue Capstone', rating: 5, date: 'Sep 2026', comment: 'Exemplary concurrency handling and clean Docker compose configurations.' },
    { from: 'Vikram Malhotra (NexaTech Systems Recruiter)', project: 'Technical Screen Round 1', rating: 4, date: 'Oct 2026', comment: 'Strong grasp of data structures and RESTful idempotency semantics.' },
  ];

  return (
    <DashboardShell>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Evaluations &amp; Feedback</h1>
          <p className="text-xs text-slate-500 mt-1">
            Constructive peer and faculty evaluations on verified capstone repositories
          </p>
        </div>

        <div className="space-y-4">
          {reviews.map((r, i) => (
            <Card key={i}>
              <CardContent className="p-5 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{r.project}</h3>
                    <p className="text-[11px] text-slate-500">{r.from} &bull; {r.date}</p>
                  </div>
                  <div className="flex items-center text-amber-500">
                    {'★'.repeat(r.rating)}
                  </div>
                </div>

                <p className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-slate-700 leading-relaxed">
                  &ldquo;{r.comment}&rdquo;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
