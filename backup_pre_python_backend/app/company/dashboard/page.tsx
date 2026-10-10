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
  ExternalLink,
  Building2,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export default function CompanyDashboardPage() {
  const profile = DEMO_COMPANY_PROFILE;
  const activeJobs = DEMO_JOBS.filter((j) => j.status === 'Active');
  const shortlistedCount = DEMO_CANDIDATE_APPLICATIONS.filter((a) => a.status === 'Shortlisted').length;
  const interviewCount = DEMO_CANDIDATE_APPLICATIONS.filter((a) => a.status === 'Interview').length;

  return (
    <DashboardShell>
      <div className="space-y-7 max-w-7xl mx-auto">
        {/* WELCOME BANNER WITH TALENT DISCOVERY ILLUSTRATION */}
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-2xl shadow-sm">
          {/* Subtle Corporate Building watermark */}
          <div className="absolute -right-6 -bottom-10 opacity-10 pointer-events-none select-none">
            <svg width="260" height="260" viewBox="0 0 100 100" fill="currentColor">
              <rect x="18" y="25" width="34" height="60" rx="3" />
              <rect x="52" y="42" width="30" height="43" rx="3" />
              <rect x="26" y="35" width="6" height="8" rx="1" fill="white" />
              <rect x="38" y="35" width="6" height="8" rx="1" fill="white" />
              <rect x="26" y="50" width="6" height="8" rx="1" fill="white" />
              <rect x="38" y="50" width="6" height="8" rx="1" fill="white" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {profile.name} Recruitment Console
                </h1>
                <Badge variant="success" className="gap-1 bg-emerald-500/20 text-emerald-300 border-emerald-400/30">
                  <ShieldCheck className="w-4 h-4" /> Verified Recruiter
                </Badge>
              </div>
              <p className="text-sm sm:text-base text-purple-100 font-medium max-w-xl">
                Campus Talent Sourcing &bull; Discover pre-vetted students with faculty-verified coursework and capstone code evidence.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/company/jobs/new">
                <Button variant="primary" size="md" className="gap-2 bg-purple-600 hover:bg-purple-700 text-white shadow-xs text-sm font-semibold">
                  <Plus className="w-4 h-4" />
                  <span>Post New Opening</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 SUMMARY METRIC CARDS (Increased font size, clear labels) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Active Job Openings"
            value={activeJobs.length}
            subtitle="Full-time &amp; Internships"
            icon={<Briefcase className="w-5 h-5" />}
            highlightColor="purple"
            trend={{ value: "Accepting applicants", direction: "up" }}
          />

          <StatCard
            title="Total Applications"
            value={DEMO_CANDIDATE_APPLICATIONS.length}
            subtitle="Received this recruitment cycle"
            icon={<Layers className="w-5 h-5" />}
            highlightColor="teal"
            trend={{ value: "100% skill matched", direction: "up" }}
          />

          <StatCard
            title="Shortlisted Candidates"
            value={shortlistedCount}
            subtitle="Passed faculty verification bar"
            icon={<Users className="w-5 h-5" />}
            highlightColor="emerald"
            trend={{ value: "Ready for screening", direction: "up" }}
          />

          <StatCard
            title="Interviews In Progress"
            value={interviewCount}
            subtitle="Active technical rounds"
            icon={<Sparkles className="w-5 h-5" />}
            highlightColor="amber"
            trend={{ value: "Feedback pending", direction: "up" }}
          />
        </div>

        {/* ACTIVE POSTINGS & PIPELINE OVERVIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {/* Active Job Openings */}
          <Card className="border-slate-200/90 shadow-xs">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100 p-5 sm:p-6">
              <div>
                <CardTitle className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                  <span>Published Job Openings</span>
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Positions currently published across campus portals
                </CardDescription>
              </div>
              <Link href="/company/jobs" className="text-xs sm:text-sm text-purple-700 font-semibold hover:underline">
                Manage All &rarr;
              </Link>
            </CardHeader>
            <CardContent className="p-5 space-y-3.5">
              {activeJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/60 hover:bg-slate-100/70 transition-colors flex items-center justify-between text-sm"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-base">{job.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-600">
                      {job.location} &bull; <span className="font-semibold text-slate-800">{job.salary}</span> &bull; Deadline: {job.deadline}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-purple-700 text-base block">{job.applicationsCount}</span>
                    <span className="text-xs text-slate-500">Applicants</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Pipeline Activity */}
          <Card className="border-slate-200/90 shadow-xs">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100 p-5 sm:p-6">
              <div>
                <CardTitle className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <span>Applicant Review Pipeline</span>
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Recent applicants with verified faculty skill endorsements
                </CardDescription>
              </div>
              <Link href="/company/applications" className="text-xs sm:text-sm text-emerald-700 font-semibold hover:underline">
                Full Pipeline &rarr;
              </Link>
            </CardHeader>
            <CardContent className="p-5 space-y-3.5">
              {DEMO_CANDIDATE_APPLICATIONS.map((app) => (
                <div
                  key={app.id}
                  className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/60 hover:bg-slate-100/70 transition-colors flex items-center justify-between text-sm"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h4 className="font-bold text-slate-900 text-base">{app.candidateName}</h4>
                      <Badge
                        variant={
                          app.status === 'Shortlisted' ? 'success' :
                          app.status === 'Interview' ? 'info' : 'neutral'
                        }
                      >
                        {app.status}
                      </Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Target Role: <strong className="text-slate-800">{app.jobTitle}</strong> &bull; Applied: {app.appliedDate}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-bold text-emerald-700 text-base block">{app.matchScore}%</span>
                    <span className="text-xs text-slate-500">Skill Fit</span>
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
