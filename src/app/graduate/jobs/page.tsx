'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DEMO_JOBS } from '@/lib/demo-data/jobs';
import api from '@/lib/api-client';
import { Briefcase, MapPin, Calendar, CheckCircle2, Search, X } from 'lucide-react';
import Link from 'next/link';

export default function GraduateJobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedJobs, setAppliedJobs] = useState<string[]>(['job-001']);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  const filteredJobs = DEMO_JOBS.filter((j) =>
    j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.requiredSkills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleApply = async (id: string, jobTitle: string) => {
    if (!appliedJobs.includes(id)) {
      setAppliedJobs([...appliedJobs, id]);
      await api.graduate.applyJob(id);
      setSuccessBanner(`Application submitted for "${jobTitle}". You can track status on My Applications.`);
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Campus &amp; Corporate Opportunities</h1>
            <p className="text-xs text-slate-500 mt-1">
              Verified job postings and internships from participating corporate partners
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by role, company, or skill..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {successBanner && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successBanner}</span>
            </div>
            <button onClick={() => setSuccessBanner(null)} className="text-emerald-600 hover:text-emerald-900">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div className="space-y-4">
          {filteredJobs.map((job) => {
            const isApplied = appliedJobs.includes(job.id);
            return (
              <Card key={job.id}>
                <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-sm">{job.title}</h3>
                      <Badge variant="default">{job.type}</Badge>
                      <span className="font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        {job.companyName}
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
                      <span>Compensation: <strong className="text-slate-800">{job.salary}</strong></span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" /> Deadline: {job.deadline}
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

                  <div className="flex items-center gap-2">
                    {isApplied ? (
                      <Badge variant="success" className="py-1 px-3">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                        Applied
                      </Badge>
                    ) : (
                      <Button variant="primary" size="sm" onClick={() => handleApply(job.id, job.title)}>
                        Apply with Resume
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardShell>
  );
}
