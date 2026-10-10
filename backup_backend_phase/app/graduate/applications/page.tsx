'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DEMO_CANDIDATE_APPLICATIONS } from '@/lib/demo-data/jobs';
import { Layers, Calendar, Clock, CheckCircle2 } from 'lucide-react';

export default function GraduateApplicationsPage() {
  const myApplications = DEMO_CANDIDATE_APPLICATIONS.slice(0, 3);

  return (
    <DashboardShell>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Job Applications</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time status updates from corporate partner hiring pipelines
          </p>
        </div>

        <div className="space-y-4">
          {myApplications.map((app) => (
            <Card key={app.id}>
              <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">{app.jobTitle}</h3>
                    <Badge
                      variant={
                        app.status === 'Interview' ? 'info' :
                        app.status === 'Shortlisted' ? 'success' : 'neutral'
                      }
                    >
                      {app.status}
                    </Badge>
                  </div>

                  <p className="text-slate-500">
                    Application ID: <span className="font-mono text-slate-700 font-semibold">{app.id}</span> &bull; Submitted: {app.appliedDate}
                  </p>

                  <div className="pt-1 flex items-center gap-2">
                    <span className="text-slate-500">Verified Skill Match:</span>
                    <strong className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono font-bold">
                      {app.matchScore}% Fit
                    </strong>
                  </div>

                  {app.interviewDate && (
                    <div className="p-2.5 rounded-lg bg-indigo-50/70 border border-indigo-100 text-indigo-900 text-[11px] flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Scheduled Technical Round: <strong>{app.interviewDate}</strong></span>
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">Status: Verified by Employer</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
