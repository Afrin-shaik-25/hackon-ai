import React from 'react';
import { PublicNavbar } from '@/components/layout/public-navbar';
import { PublicFooter } from '@/components/layout/public-footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Users, ShieldCheck, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PublicNavbar />

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <Badge variant="info">HacXLerate 2026 Project</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              About StudyLens AI
            </h1>
            <p className="text-slate-600 text-sm max-w-2xl mx-auto leading-relaxed">
              An intelligent, transparent analytics platform engineered to bridge the gap between academic data silos and student success.
            </p>
          </div>

          <Card>
            <CardContent className="p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
              <h2 className="text-lg font-bold text-slate-900">The Problem We Solve</h2>
              <p>
                In conventional higher education institutions, student performance data lives in disconnected systems: attendance in biometric logs or paper registers, internal marks in departmental spreadsheets, assessment scores in LMS platforms, and project skills across personal GitHub accounts.
              </p>
              <p>
                Because these signals are fragmented, faculty only discover that a student is struggling when end-semester examination results are declared &mdash; often far too late for timely interventions.
              </p>

              <h2 className="text-lg font-bold text-slate-900 pt-4">Our Approach & Methodology</h2>
              <p>
                StudyLens AI unifies this fragmented ecosystem into an explainable <strong>Student Success Score</strong> computed along five weighted dimensions:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li><strong>Academic Performance (30%)</strong>: Internal tests, assignments, and exam results.</li>
                <li><strong>Attendance Consistency (20%)</strong>: Lecture attendance against the mandatory 75% bar.</li>
                <li><strong>Assessment Results (20%)</strong>: Periodic quizzes, coding problems, and aptitude assessments.</li>
                <li><strong>LMS Engagement (15%)</strong>: Portal logins, resource downloads, and active study time.</li>
                <li><strong>Skills & Verified Projects (15%)</strong>: Peer-reviewed and faculty-verified capstone work.</li>
              </ul>

              <h2 className="text-lg font-bold text-slate-900 pt-4">Responsible & Human-Centric AI</h2>
              <p>
                We firmly believe that predictive models in education should assist human educators, never replace them. We do not apply fatalistic labels like &ldquo;Guaranteed Failure.&rdquo; Instead, we highlight specific, actionable patterns (such as &ldquo;Needs Review: OS Attendance 58%&rdquo;) so advisors can schedule supportive tutoring sessions.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
