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
  CalendarCheck,
  FileCheck2,
  BookOpen,
  Users,
  CheckCircle2,
  Upload,
  HeartHandshake,
  Timer,
  Cpu,
  Layers,
  Sparkles,
  Database
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
                <span>AI-Powered Student Analytics and Success Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Turn Student Data Into{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                  Student Success
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Unify academic marks, attendance patterns, assessment scores, learning progress, and verified skills into actionable <strong>Student Performance Analytics</strong>. Catch support needs early and guide every learner to academic and career success.
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

              {/* Highlights pill */}
              <div className="pt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Platform Highlights:</span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 font-medium">Independent Performance Indicators</span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 font-medium">Early Faculty Advising</span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 font-medium">Verified Career Readiness</span>
              </div>
            </div>

            {/* PRODUCT PREVIEW HERO MOCKUP: STUDENT DASHBOARD AS PRIMARY EXPERIENCE */}
            <div className="mt-14 max-w-5xl mx-auto">
              <div className="rounded-2xl border border-slate-200/90 bg-white shadow-2xl p-4 sm:p-6 overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="ml-2 text-xs font-semibold text-slate-700">
                      Student Performance Dashboard &mdash; Aarav Sharma (CS Semester 5)
                    </span>
                  </div>
                  <Badge variant="success">Primary Student Portal</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-xs text-slate-500 font-medium">Academic Marks</p>
                    <h3 className="text-2xl font-bold text-slate-900 mt-1">88.4%</h3>
                    <p className="text-[11px] text-emerald-600 font-medium mt-1">5 Courses &bull; Grade A+</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-xs text-slate-500 font-medium">Attendance Record</p>
                    <h3 className="text-2xl font-bold text-emerald-600 mt-1">92.0%</h3>
                    <p className="text-[11px] text-slate-500 mt-1">Above 75% Requirement</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-xs text-slate-500 font-medium">Assessments</p>
                    <h3 className="text-2xl font-bold text-indigo-600 mt-1">89.2%</h3>
                    <p className="text-[11px] text-indigo-600 font-medium mt-1">3 Practice Tests Done</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-xs text-slate-500 font-medium">Learning Progress</p>
                    <h3 className="text-2xl font-bold text-teal-600 mt-1">90%</h3>
                    <p className="text-[11px] text-slate-500 mt-1">14h Weekly Study Time</p>
                  </div>
                </div>

                <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
                      AS
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        Aarav Sharma &bull; Apex Institute of Technology
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Next Exam: Design &amp; Analysis of Algorithms (Nov 12) &bull; 2 Verified Capstone Projects
                      </p>
                    </div>
                  </div>
                  <Link href="/student/dashboard">
                    <Button variant="primary" size="sm" className="whitespace-nowrap">
                      Open Student Dashboard &rarr;
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STUDENT PERFORMANCE ANALYTICS SECTION */}
        <section className="py-16 md:py-24 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <Badge variant="info">Student Performance Analytics</Badge>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Clear, Independent Educational Indicators
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Rather than merging diverse achievements into an arbitrary combined formula, StudyLens AI evaluates each key educational dimension independently for clear, actionable feedback.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Card className="border-t-4 border-t-blue-500 shadow-xs">
                <CardContent className="p-5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Academic Marks</h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Subject-wise theory and practical examination splits, internal marks, and cumulative grade progression.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-emerald-500 shadow-xs">
                <CardContent className="p-5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                    <CalendarCheck className="w-4 h-4" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Attendance Record</h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Course-level lecture and laboratory attendance monitored against the mandatory 75% institutional requirement.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-indigo-500 shadow-xs">
                <CardContent className="p-5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Assessment Results</h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Periodic practice quizzes, laboratory coding exercises, and timed aptitude test performance.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-teal-500 shadow-xs">
                <CardContent className="p-5">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Learning Progress</h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Course portal access consistency, digital lecture completion, and active weekly study habits.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-violet-500 shadow-xs">
                <CardContent className="p-5">
                  <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center mb-3">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Skills &amp; Projects</h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Faculty-verified code repositories, hands-on capstone deliverables, and technical skills passport.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* STUDENT DATA INTEGRATION & IMPORT SECTION */}
        <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <Badge variant="success">Data Integration</Badge>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Seamless Student Data Import &amp; Validation
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Easily upload student records across academics, attendance, assessments, and learning modules with automatic format validation and transparent error reporting.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-5 bg-white rounded-xl border border-slate-200/90 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-sm mb-3">1</div>
                <h4 className="font-bold text-slate-900 text-sm">Select Category</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Choose Academic Records, Attendance Logs, Assessments, or Projects.
                </p>
              </div>

              <div className="p-5 bg-white rounded-xl border border-slate-200/90 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-sm mb-3">2</div>
                <h4 className="font-bold text-slate-900 text-sm">Upload Records</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Upload file with student IDs and data columns.
                </p>
              </div>

              <div className="p-5 bg-white rounded-xl border border-slate-200/90 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-sm mb-3">3</div>
                <h4 className="font-bold text-slate-900 text-sm">Validate Columns</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Inspect preview table and detect invalid or missing values before committing.
                </p>
              </div>

              <div className="p-5 bg-white rounded-xl border border-slate-200/90 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-sm mb-3">4</div>
                <h4 className="font-bold text-slate-900 text-sm">Confirm &amp; Update</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Confirm import to update student performance records.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ROLE PORTALS */}
        <section className="py-16 md:py-24 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <Badge variant="default">Unified Roles</Badge>
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
                  <h3 className="text-base font-bold text-slate-900">Student Portal (Primary)</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Track your performance analytics, upcoming examinations, attendance status, to-do list, and run focus sessions.
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
                  <h3 className="text-base font-bold text-slate-900">Faculty Dashboard</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Review assigned cohorts, filter student directories, review students who may need support, and add follow-up notes.
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
                  <h3 className="text-base font-bold text-slate-900">Graduate &amp; Career Portal</h3>
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
                  <h3 className="text-base font-bold text-slate-900">Company &amp; Recruiter Portal</h3>
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
                  <h3 className="text-base font-bold text-slate-900">Platform Admin</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Manage institutional accounts, college settings, verification approvals, and platform configuration.
                  </p>
                  <Link href="/admin/dashboard" className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 pt-2">
                    Open Admin Portal &rarr;
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
