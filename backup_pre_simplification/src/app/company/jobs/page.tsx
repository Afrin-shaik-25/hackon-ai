'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DEMO_JOBS } from '@/lib/demo-data/jobs';
import { Briefcase, Plus, MapPin, Users, Calendar } from 'lucide-react';

export default function CompanyJobsPage() {
  const [jobs, setJobs] = useState(DEMO_JOBS);

  const handleToggleStatus = (id: string) => {
    setJobs(
      jobs.map((j) =>
        j.id === id ? { ...j, status: j.status === 'Active' ? 'Closed' : 'Active' } : j
      )
    );
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Job &amp; Internship Postings</h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage active campus placement requisitions, view application counts, and edit eligibility criteria
            </p>
          </div>

          <Link href="/company/jobs/new">
            <Button variant="primary" size="sm" className="gap-1.5 shadow-xs">
              <Plus className="w-4 h-4" />
              <span>Create New Posting</span>
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">{job.title}</h3>
                    <Badge variant={job.status === 'Active' ? 'success' : 'neutral'}>
                      {job.status}
                    </Badge>
                    <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      {job.type}
                    </span>
                  </div>

                  <p className="text-slate-600 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
                    </span>
                    <span>&bull;</span>
                    <span>Salary: <strong className="text-slate-700">{job.salary}</strong></span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> Deadline: {job.deadline}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1 font-semibold text-indigo-600">
                      <Users className="w-3.5 h-3.5" /> {job.applicationsCount} Applications
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {job.requiredSkills.map((s) => (
                      <span key={s} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 md:flex-col md:items-end justify-end">
                  <Link href="/company/applications">
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      View Applicants
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleStatus(job.id)}
                    className="h-8 text-xs text-slate-500"
                  >
                    {job.status === 'Active' ? 'Pause Posting' : 'Reactivate'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
