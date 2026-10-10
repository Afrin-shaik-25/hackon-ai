'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DEMO_COMPANY_PROFILE, DEMO_JOBS, DEMO_CANDIDATE_APPLICATIONS } from '@/lib/demo-data/jobs';
import {
  Briefcase,
  Layers,
  Users,
  ShieldCheck,
  Plus,
  ArrowRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function CompanyDashboardPage() {
  const profile = DEMO_COMPANY_PROFILE;
  const activeJobs = DEMO_JOBS.filter((j) => j.status === 'Active');
  const shortlistedCount = DEMO_CANDIDATE_APPLICATIONS.filter((a) => a.status === 'Shortlisted').length;
  const interviewCount = DEMO_CANDIDATE_APPLICATIONS.filter((a) => a.status === 'Interview').length;

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{profile.name}</h1>
              <Badge variant="success" className="gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Recruiter
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Recruitment Console &bull; Campus Talent Sourcing &amp; Verified Skill Discovery
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/company/jobs/new">
              <Button variant="primary" size="sm" className="gap-1.5 shadow-xs">
                <Plus className="w-4 h-4" />
                <span>Post New Opening</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Recruiter Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Active Job Postings"
            value={activeJobs.length}
            subtitle="Full-time &amp; Internships"
            icon={<Briefcase className="w-5 h-5" />}
            highlightColor="indigo"
          />

          <StatCard
            title="Total Applications"
            value={DEMO_CANDIDATE_APPLICATIONS.length}
            subtitle="Received this cycle"
            icon={<Layers className="w-5 h-5" />}
            highlightColor="teal"
          />

          <StatCard
            title="Shortlisted Candidates"
            value={shortlistedCount}
            subtitle="Passed initial skill match"
            icon={<Users className="w-5 h-5" />}
            highlightColor="emerald"
          />

          <StatCard
            title="Interviews In Progress"
            value={interviewCount}
            subtitle="Technical screens active"
            icon={<Sparkles className="w-5 h-5" />}
            highlightColor="amber"
          />
        </div>

        {/* Active Postings & Pipeline Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Job Postings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm">Active Job Openings</CardTitle>
                <CardDescription>Published roles visible to students and graduates</CardDescription>
              </div>
              <Link href="/company/jobs" className="text-xs text-indigo-600 hover:underline">
                Manage All &rarr;
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeJobs.map((job) => (
                <div key={job.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900">{job.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {job.location} &bull; {job.salary} &bull; Deadline: {job.deadline}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-indigo-600 block">{job.applicationsCount}</span>
                    <span className="text-[10px] text-slate-400">Applications</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Pipeline Activity */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm">Candidate Pipeline Activity</CardTitle>
                <CardDescription>Recent applicants with verified skill matches</CardDescription>
              </div>
              <Link href="/company/applications" className="text-xs text-indigo-600 hover:underline">
                Open Pipeline &rarr;
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {DEMO_CANDIDATE_APPLICATIONS.map((app) => (
                <div key={app.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900">{app.candidateName}</h4>
                      <Badge
                        variant={
                          app.status === 'Shortlisted' ? 'success' :
                          app.status === 'Interview' ? 'info' : 'neutral'
                        }
                      >
                        {app.status}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Role: {app.jobTitle} &bull; Applied: {app.appliedDate}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-emerald-700 block">{app.matchScore}%</span>
                    <span className="text-[10px] text-slate-400">Skill Fit</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
