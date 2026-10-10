'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { SuccessScoreGauge } from '@/components/shared/success-score-gauge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DEMO_STUDENTS } from '@/lib/demo-data/students';
import {
  Award,
  Sparkles,
  TrendingUp,
  Info,
  ArrowRight,
  BookOpen,
  CalendarCheck,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

export default function StudentSuccessScorePage() {
  const student = DEMO_STUDENTS[0]; // Aarav Sharma

  const improvementRoadmap = [
    {
      area: 'LMS Engagement (Current: 90/100, +13.5 pts)',
      recommendation: 'Complete optional reading on distributed Paxos consensus in Module 4 to reach exemplary status.',
      link: '/student/academics',
    },
    {
      area: 'Assessment & Quizzes (Current: 85/100, +17.0 pts)',
      recommendation: 'Practice graph shortest path and network flow exercises on the Practice module.',
      link: '/student/assessments',
    },
    {
      area: 'Skills & Capstones (Current: 91/100, +13.65 pts)',
      recommendation: 'Request faculty verification for your StudyLens extension project.',
      link: '/student/projects',
    },
  ];

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Student Success Score &amp; Explainability
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Institutional 5-Pillar Holistic Success Framework (30% Academics, 20% Attendance, 20% Assessments, 15% LMS, 15% Skills)
          </p>
        </div>

        {/* Core Component Gauge */}
        <SuccessScoreGauge
          score={student.successScore}
          previousScore={student.previousScore}
          breakdown={student.scoreBreakdown}
          lastUpdated={student.dataCompleteness.lastUpdated}
          dataCompleteness={student.dataCompleteness.percent}
        />

        {/* Improvement Action Roadmap */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Personalized Action Recommendations</span>
                </CardTitle>
                <CardDescription>
                  Empirical paths to enhance your holistic success composite
                </CardDescription>
              </div>
              <Badge variant="success">Optimization Active</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {improvementRoadmap.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <span className="font-bold text-indigo-900">{item.area}</span>
                  <p className="text-slate-600 leading-relaxed">{item.recommendation}</p>
                </div>
                <Link href={item.link}>
                  <Button variant="outline" size="sm" className="h-7 text-xs shrink-0">
                    <span>Take Action</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Mathematical Methodology Transparency */}
        <Card className="bg-slate-900 text-white border-slate-800">
          <CardHeader>
            <CardTitle className="text-sm text-white">Mathematical Computation Transparency</CardTitle>
            <CardDescription className="text-slate-400">
              Zero black-box obscurity: exactly how each point is calculated
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-300 leading-relaxed font-mono">
            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700">
              Success_Score = (Academic_Raw × 0.30) + (Attendance_Raw × 0.20) + (Assessments_Raw × 0.20) + (LMS_Raw × 0.15) + (Skills_Raw × 0.15)
            </div>
            <p className="text-[11px] text-slate-400">
              When a source is unavailable (e.g. during delayed CSV sync), the platform normalizes the denominator or flags the composite as &ldquo;Provisional&rdquo; to protect the student from being unfairly penalized.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
