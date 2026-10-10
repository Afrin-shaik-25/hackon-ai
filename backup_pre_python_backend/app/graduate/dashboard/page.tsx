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
  Award,
  ChevronRight,
  Clock,
  Building2,
  CheckCircle2
} from 'lucide-react';

export default function GraduateDashboardPage() {
  const recommendedJobs = DEMO_JOBS.slice(0, 3);

  return (
    <DashboardShell>
      <div className="space-y-7 max-w-7xl mx-auto">
        {/* WELCOME BANNER WITH CAREER ILLUSTRATION */}
        <div className="relative overflow-hidden bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-2xl shadow-sm">
          {/* Subtle Career Briefcase watermark */}
          <div className="absolute -right-6 -bottom-10 opacity-10 pointer-events-none select-none">
            <svg width="260" height="260" viewBox="0 0 100 100" fill="currentColor">
              <rect x="20" y="30" width="60" height="48" rx="6" />
              <path d="M38 30 V20 C38 16 62 16 62 20 V30" stroke="currentColor" strokeWidth="6" fill="none" />
              <line x1="20" y1="52" x2="80" y2="52" stroke="white" strokeWidth="3" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  Graduate &amp; Career Hub
                </h1>
                <Badge variant="success">Placement Ready</Badge>
              </div>
              <p className="text-sm sm:text-base text-teal-100 font-medium max-w-xl">
                Build ATS-verified resumes, sharpen technical aptitude, rehearse mock interviews, and connect directly with hiring companies.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/graduate/resume">
                <Button variant="primary" size="md" className="gap-2 bg-teal-600 hover:bg-teal-700 text-white shadow-xs text-sm font-semibold">
                  <FileText className="w-4 h-4" />
                  <span>Open Resume Builder</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 SUMMARY METRIC CARDS (Increased font size, clear labels) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Career Readiness Index"
            value="86 / 100"
            subtitle="Skills + Aptitude + Capstones"
            icon={<Award className="w-5 h-5" />}
            highlightColor="teal"
            trend={{ value: "+4% this month", direction: "up" }}
          />

          <StatCard
            title="Aptitude Mastery"
            value="82% Score"
            subtitle="Quantitative &amp; Logical reasoning"
            icon={<CheckSquare className="w-5 h-5" />}
            highlightColor="indigo"
            trend={{ value: "4 practice sets done", direction: "up" }}
          />

          <StatCard
            title="Mock Interviews"
            value="3 Completed"
            subtitle="Average evaluation score: 88%"
            icon={<MessagesSquare className="w-5 h-5" />}
            highlightColor="emerald"
            trend={{ value: "System design passed", direction: "up" }}
          />

          <StatCard
            title="Job Applications"
            value="4 Active"
            subtitle="1 Shortlisted, 1 Interview scheduled"
            icon={<Briefcase className="w-5 h-5" />}
            highlightColor="amber"
            trend={{ value: "2 pending reviews", direction: "up" }}
          />
        </div>

        {/* CAREER PREPARATION MODULES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-all hover:-translate-y-0.5 border-slate-200/90 flex flex-col justify-between">
            <CardContent className="p-6 space-y-4">
              <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                  Interactive Resume Builder
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Generate structured ATS-friendly resumes with verified capstone projects, academic course credits, and PDF export.
                </p>
              </div>
              <Link href="/graduate/resume" className="inline-flex items-center text-xs sm:text-sm font-semibold text-teal-700 hover:text-teal-900 pt-1">
                <span>Launch Builder</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-all hover:-translate-y-0.5 border-slate-200/90 flex flex-col justify-between">
            <CardContent className="p-6 space-y-4">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                <MessagesSquare className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                  Technical Mock Interviews
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Interactive scenario interviews covering Full-Stack, Distributed Systems, Data Engineering, and Behavioral logic.
                </p>
              </div>
              <Link href="/graduate/interviews" className="inline-flex items-center text-xs sm:text-sm font-semibold text-indigo-700 hover:text-indigo-900 pt-1">
                <span>Start Simulation</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-all hover:-translate-y-0.5 border-slate-200/90 flex flex-col justify-between">
            <CardContent className="p-6 space-y-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <CheckSquare className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                  Aptitude &amp; Reasoning Bank
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Timed practice test sets for quantitative math, logical deduction, and computer science fundamental MCQs.
                </p>
              </div>
              <Link href="/graduate/aptitude" className="inline-flex items-center text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-900 pt-1">
                <span>Practice Aptitude</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* MATCHED CORPORATE OPPORTUNITIES */}
        <Card className="border-slate-200/90 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100 p-5 sm:p-6">
            <div>
              <CardTitle className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-teal-600" />
                <span>Matched Corporate Openings</span>
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Full-time and graduate internship opportunities aligned with your verified coursework
              </CardDescription>
            </div>
            <Link href="/graduate/jobs" className="text-xs sm:text-sm text-teal-700 font-semibold hover:underline">
              View All Jobs &rarr;
            </Link>
          </CardHeader>
          <CardContent className="p-5 space-y-3.5">
            {recommendedJobs.map((j) => (
              <div
                key={j.id}
                className="p-4 sm:p-5 rounded-xl border border-slate-200/80 bg-slate-50/60 hover:bg-slate-100/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h4 className="font-bold text-slate-900 text-base">{j.title}</h4>
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                      {j.type}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    <strong className="text-slate-800">{j.companyName}</strong> &bull; {j.location} &bull; <span className="font-semibold text-slate-700">{j.salary}</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {j.requiredSkills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-xs font-mono font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0">
                  <Link href="/graduate/jobs">
                    <Button variant="primary" size="sm" className="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm px-4">
                      Apply Now
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
