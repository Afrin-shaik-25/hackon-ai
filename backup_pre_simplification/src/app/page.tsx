'use client';

import React from 'react';
import Link from 'next/link';
import { PublicNavbar } from '@/components/layout/public-navbar';
import { PublicFooter } from '@/components/layout/public-footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  GraduationCap,
  ArrowRight,
  BarChart3,
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  FileUp,
  AlertTriangle,
  HeartHandshake,
  Timer,
  Cpu,
  Layers,
  Sparkles,
  Database,
  ExternalLink
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PublicNavbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/60 pt-16 pb-20 md:pt-24 md:pb-28 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-semibold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>HacXLerate 2026 Innovation Challenge Entry</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Turn Student Data Into{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                  Student Success
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Unify academic marks, attendance patterns, assessment scores, LMS engagement, and verified skill portfolios into an explainable <strong>Student Success Score</strong>. Catch risk signals early and guide every learner to graduation and career readiness.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link href="/student/dashboard">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-md">
                    <span>Enter Student Portal</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
                <Link href="/faculty/dashboard">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white">
                    <span>Faculty Dashboard</span>
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="ghost" size="lg" className="w-full sm:w-auto text-slate-700">
                    <span>Switch Role</span>
                  </Button>
                </Link>
              </div>

              {/* Evaluation criteria highlight pill */}
              <div className="pt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Official Evaluation Matrix:</span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 font-medium">Data Integration 30%</span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 font-medium">Success Score & Risk 25%</span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 font-medium">Visualization 25%</span>
              </div>
            </div>

            {/* PRODUCT PREVIEW HERO MOCKUP */}
            <div className="mt-14 max-w-5xl mx-auto">
              <div className="rounded-2xl border border-slate-200/90 bg-white shadow-2xl p-4 sm:p-6 overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="ml-2 text-xs font-semibold text-slate-600">Faculty Analytics Console &mdash; Fall 2026 Cohort</span>
                  </div>
                  <Badge variant="warning">Synthetic Demo Sandbox</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-xs text-slate-500 font-medium">Total Students</p>
                    <h3 className="text-2xl font-bold text-slate-900 mt-1">148</h3>
                    <p className="text-[11px] text-emerald-600 font-medium mt-1">134 With Full Data</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-xs text-slate-500 font-medium">Average Success Score</p>
                    <h3 className="text-2xl font-bold text-indigo-600 mt-1">73.8<span className="text-xs text-slate-400">/100</span></h3>
                    <p className="text-[11px] text-slate-500 mt-1">Explainable 5-Pillar Model</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-xs text-slate-500 font-medium">Early Risk Alerts</p>
                    <h3 className="text-2xl font-bold text-rose-600 mt-1">16</h3>
                    <p className="text-[11px] text-rose-600 font-medium mt-1">Attendance &lt;75% / Drop</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-xs text-slate-500 font-medium">Active Interventions</p>
                    <h3 className="text-2xl font-bold text-emerald-600 mt-1">9</h3>
                    <p className="text-[11px] text-slate-500 mt-1">Follow-ups Scheduled</p>
                  </div>
                </div>

                <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
                      AIT
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Apex Institute of Technology &bull; Computer Science (Semester 5)</p>
                      <p className="text-[11px] text-slate-500">Validated CSV pipeline with biometric attendance, lab test marks, and LMS sync.</p>
                    </div>
                  </div>
                  <Link href="/faculty/dashboard">
                    <Button variant="primary" size="sm" className="whitespace-nowrap">
                      Open Live Faculty Portal
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPLAINABLE SUCCESS SCORE SECTION (25% CRITERIA) */}
        <section className="py-16 md:py-24 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <Badge variant="info">Explainable Algorithm</Badge>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Transparent 30 / 20 / 20 / 15 / 15 Success Score
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Unlike black-box AI scores, StudyLens AI computes a deterministic, multi-factor success index directly traceable to verifiable institutional evidence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Card className="border-t-4 border-t-blue-500 shadow-xs">
                <CardContent className="p-5">
                  <div className="text-xs font-bold text-blue-600 uppercase">Weight: 30%</div>
                  <h4 className="text-base font-bold text-slate-900 mt-2">Academic Performance</h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Internal and external examination scores, theory and practical split, assignment marks.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-emerald-500 shadow-xs">
                <CardContent className="p-5">
                  <div className="text-xs font-bold text-emerald-600 uppercase">Weight: 20%</div>
                  <h4 className="text-base font-bold text-slate-900 mt-2">Attendance Consistency</h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Subject-wise lecture and laboratory presence against the 75% institutional threshold.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-indigo-500 shadow-xs">
                <CardContent className="p-5">
                  <div className="text-xs font-bold text-indigo-600 uppercase">Weight: 20%</div>
                  <h4 className="text-base font-bold text-slate-900 mt-2">Assessment Results</h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Periodic MCQ quizzes, coding challenges, and objective aptitude test performance.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-amber-500 shadow-xs">
                <CardContent className="p-5">
                  <div className="text-xs font-bold text-amber-600 uppercase">Weight: 15%</div>
                  <h4 className="text-base font-bold text-slate-900 mt-2">LMS Engagement</h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Course portal access frequency, digital lecture completion, and active participation.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-teal-500 shadow-xs">
                <CardContent className="p-5">
                  <div className="text-xs font-bold text-teal-600 uppercase">Weight: 15%</div>
                  <h4 className="text-base font-bold text-slate-900 mt-2">Skills & Projects</h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Verified GitHub code repositories, faculty-approved capstone deliverables, and certifications.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* DATA INGESTION WORKFLOW (30% CRITERIA) */}
        <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <Badge variant="success">Data Integration</Badge>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Robust Multi-Source CSV Ingestion Pipeline
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Institutions rely on disparate ERPs and spreadsheets. Our 5-step data import pipeline reconciles student IDs, validates formats, rejects corrupted rows with transparent logging, and updates cohort scores.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-5 bg-white rounded-xl border border-slate-200/90 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-sm mb-3">1</div>
                <h4 className="font-bold text-slate-900 text-sm">Select Source Category</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Choose Academic Records, Biometric Attendance, Assessments, LMS Logs, or Skills.
                </p>
              </div>

              <div className="p-5 bg-white rounded-xl border border-slate-200/90 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-sm mb-3">2</div>
                <h4 className="font-bold text-slate-900 text-sm">Smart Column Mapping</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Map arbitrary CSV headers to standard student identifiers, course codes, and marks.
                </p>
              </div>

              <div className="p-5 bg-white rounded-xl border border-slate-200/90 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-sm mb-3">3</div>
                <h4 className="font-bold text-slate-900 text-sm">Validation & Rejected Rows</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Detect unregistered student IDs, out-of-range marks, or duplicates with row-level error reports.
                </p>
              </div>

              <div className="p-5 bg-white rounded-xl border border-slate-200/90 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-sm mb-3">4</div>
                <h4 className="font-bold text-slate-900 text-sm">Audit & Score Update</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Confirm ingestion, generate audit log timestamp, and recalculate cohort Success Scores.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link href="/faculty/imports">
                <Button variant="primary" size="md">
                  <span>Try CSV Ingestion Pipeline</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 5 DEDICATED PORTALS OVERVIEW */}
        <section className="py-16 md:py-24 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <Badge variant="default">Five Dedicated Portals</Badge>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Designed for the Entire Education Ecosystem
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Role-governed navigation and customized dashboards ensure every stakeholder has the right data and tools at their fingertips.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Student Portal */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Student Portal</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Track your Success Score breakdown, upcoming examinations, attendance alert threshold, to-do list, and run focus sessions.
                  </p>
                  <Link href="/student/dashboard" className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 pt-2">
                    Open Student Portal &rarr;
                  </Link>
                </CardContent>
              </Card>

              {/* Faculty Portal */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Faculty Analytics Portal</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Review assigned cohorts, filter student directories, inspect multi-factor risk signals, log interventions, and ingest CSV records.
                  </p>
                  <Link href="/faculty/dashboard" className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 pt-2">
                    Open Faculty Portal &rarr;
                  </Link>
                </CardContent>
              </Card>

              {/* Graduate Portal */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Graduate & Career Portal</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Aptitude practice, step-by-step resume builder, role-specific simulated mock interviews, job discovery, and application tracking.
                  </p>
                  <Link href="/graduate/dashboard" className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 pt-2">
                    Open Graduate Portal &rarr;
                  </Link>
                </CardContent>
              </Card>

              {/* Company Portal */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Company & Recruiter Portal</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    First-class portal for verified employers to publish job openings, discover candidates with verified skill evidence, and manage pipelines.
                  </p>
                  <Link href="/company/dashboard" className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 pt-2">
                    Open Company Portal &rarr;
                  </Link>
                </CardContent>
              </Card>

              {/* Admin Portal */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Platform Admin Portal</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Consortium overview, college onboarding, faculty & recruiter KYC verification queues, system audit logs, and demo sandbox reset.
                  </p>
                  <Link href="/admin/dashboard" className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 pt-2">
                    Open Admin Portal &rarr;
                  </Link>
                </CardContent>
              </Card>

              {/* Responsible AI Card */}
              <Card className="hover:shadow-md transition-shadow bg-slate-900 text-white">
                <CardContent className="p-6 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">Responsible & Explainable AI</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    We never label learners as permanent failures. Risk labels are cautious decision-support suggestions (&ldquo;Needs Review&rdquo;) with explicit data backing.
                  </p>
                  <Link href="/privacy" className="inline-flex items-center text-xs font-semibold text-indigo-400 hover:text-indigo-300 pt-2">
                    Read Ethics Architecture &rarr;
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA STRIP */}
        <section className="py-16 bg-gradient-to-r from-indigo-900 to-slate-900 text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Ready to Evaluate StudyLens AI?</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              Switch between all five roles using the top banner. Test the CSV import pipeline, review risk explainability, and drill into student portfolios.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/faculty/dashboard">
                <Button variant="primary" size="lg" className="bg-white text-indigo-900 hover:bg-slate-100 shadow-md">
                  Launch Faculty Portal
                </Button>
              </Link>
              <Link href="/student/dashboard">
                <Button variant="outline" size="lg" className="border-slate-700 text-white hover:bg-slate-800">
                  Launch Student Portal
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
