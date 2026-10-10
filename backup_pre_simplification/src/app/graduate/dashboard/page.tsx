'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DEMO_JOBS } from '@/lib/demo-data/jobs';
import {
  Briefcase,
  FileText,
  MessagesSquare,
  Cpu,
  CheckSquare,
  ArrowRight,
  Sparkles,
  Award
} from 'lucide-react';

export default function GraduateDashboardPage() {
  const recommendedJobs = DEMO_JOBS.slice(0, 2);

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Graduate Career Readiness</h1>
            <p className="text-xs text-slate-500 mt-1">
              Resume builder, aptitude mastery, simulated technical interviews, and corporate job applications
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/graduate/resume">
              <Button variant="primary" size="sm" className="gap-1.5 shadow-xs">
                <FileText className="w-4 h-4" />
                <span>Build Resume</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Graduate KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Career Readiness Index"
            value="86 / 100"
            subtitle="Skills + Aptitude + Projects"
            icon={<Award className="w-5 h-5" />}
            highlightColor="indigo"
            trend={{ value: "+4% this month", direction: "up" }}
          />

          <StatCard
            title="Aptitude Mastery"
            value="82%"
            subtitle="Quantitative &amp; Logical"
            icon={<CheckSquare className="w-5 h-5" />}
            highlightColor="teal"
          />

          <StatCard
            title="Mock Interviews"
            value="3 Completed"
            subtitle="Avg Score: 88%"
            icon={<MessagesSquare className="w-5 h-5" />}
            highlightColor="emerald"
          />

          <StatCard
            title="Applications Submitted"
            value="4 Jobs"
            subtitle="1 Shortlisted, 1 Interview"
            icon={<Briefcase className="w-5 h-5" />}
            highlightColor="amber"
          />
        </div>

        {/* Quick Career Launch Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-xs transition-shadow">
            <CardContent className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Interactive Resume Builder</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Step-by-step ATS-friendly resume creator with verified capstone embeds and PDF export.
              </p>
              <Link href="/graduate/resume" className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 pt-1">
                Open Resume Builder &rarr;
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xs transition-shadow">
            <CardContent className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <MessagesSquare className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Mock Interview Simulator</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Practice role-specific technical questions for Full-Stack, Data Science, and Systems Engineering.
              </p>
              <Link href="/graduate/interviews" className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 pt-1">
                Start Mock Interview &rarr;
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xs transition-shadow">
            <CardContent className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <CheckSquare className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Aptitude &amp; Reasoning</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Timed quantitative aptitude, verbal logic, and data interpretation practice tests.
              </p>
              <Link href="/graduate/aptitude" className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 pt-1">
                Practice Aptitude &rarr;
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Jobs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm">Matched Corporate Opportunities</CardTitle>
              <CardDescription>Roles matching your verified skill passport</CardDescription>
            </div>
            <Link href="/graduate/jobs" className="text-xs text-indigo-600 hover:underline">
              Explore All Jobs &rarr;
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendedJobs.map((j) => (
              <div key={j.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-bold text-slate-900">{j.title}</h4>
                  <p className="text-slate-600 mt-0.5">{j.companyName} &bull; {j.location} &bull; {j.salary}</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {j.requiredSkills.map((s) => (
                      <span key={s} className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <Link href="/graduate/jobs">
                  <Button variant="primary" size="sm" className="h-7 text-xs">
                    Apply Now
                  </Button>
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
