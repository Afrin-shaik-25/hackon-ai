'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { SuccessScoreGauge } from '@/components/shared/success-score-gauge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DEMO_STUDENTS } from '@/lib/demo-data/students';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  Cpu
} from 'lucide-react';
import Link from 'next/link';

export default function StudentPerformanceAnalyticsPage() {
  const student = DEMO_STUDENTS[0]; // Aarav Sharma

  const actionRecommendations = [
    {
      indicator: 'Learning Progress & LMS',
      current: '90% Modules Completed',
      icon: BookOpen,
      recommendation: 'Complete optional reading on distributed Paxos consensus in Module 4 to stay ahead of the syllabus.',
      link: '/student/academics',
      actionLabel: 'Open Modules',
    },
    {
      indicator: 'Assessment Performance',
      current: '85% Practice Average',
      icon: FileCheck2,
      recommendation: 'Practice graph shortest path and dynamic programming exercises on the Assessments module.',
      link: '/student/assessments',
      actionLabel: 'Practice Quiz',
    },
    {
      indicator: 'Semester Subjects & Learning',
      current: '5 Active Courses',
      icon: BookOpen,
      recommendation: 'Review Unit 4 lecture notes for CS501 DAA and complete DBMS lab indexing modules.',
      link: '/student/subjects',
      actionLabel: 'View Subjects',
    },
    {
      indicator: 'Academic Marks',
      current: '88.4% Semester Average',
      icon: GraduationCap,
      recommendation: 'Focus revision on Operating Systems Virtual Memory Paging before next week\'s class test.',
      link: '/student/academics',
      actionLabel: 'View Marks',
    },
    {
      indicator: 'Attendance Record',
      current: '92% (Above 75% Requirement)',
      icon: CalendarCheck,
      recommendation: 'Maintain regular attendance in Computer Networks to secure honors grade eligibility.',
      link: '/student/attendance',
      actionLabel: 'View Log',
    },
  ];

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Student Performance Analytics
            </h1>
            <Badge variant="neutral" className="text-[11px]">Direct Indicators</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Independent educational indicators &mdash; academic marks, attendance, assessment performance, learning progress, and verified skills
          </p>
        </div>

        {/* 5 Separate Indicators Component */}
        <SuccessScoreGauge
          breakdown={student.scoreBreakdown}
          lastUpdated={student.dataCompleteness.lastUpdated}
          dataCompleteness={student.dataCompleteness.percent}
        />

        {/* Focused Guidance & Next Steps */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Targeted Academic Recommendations</span>
                </CardTitle>
                <CardDescription>
                  Practical action steps aligned with each specific performance area
                </CardDescription>
              </div>
              <Badge variant="success">Guidance Active</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {actionRecommendations.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="font-bold text-slate-900">{item.indicator}:</span>
                      <span className="font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px]">
                        {item.current}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[11px]">{item.recommendation}</p>
                  </div>
                  <Link href={item.link}>
                    <Button variant="outline" size="sm" className="h-7 text-xs shrink-0 gap-1 bg-white">
                      <span>{item.actionLabel}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
