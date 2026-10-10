'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ScoreBreakdown } from '@/types';
import { GraduationCap, CalendarCheck, FileCheck2, BookOpen, Cpu, CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PerformanceAnalyticsProps {
  breakdown: ScoreBreakdown;
  lastUpdated?: string;
  dataCompleteness?: number;
  score?: number; // Kept for backwards-compatibility if passed, but not displayed as combined score
  previousScore?: number;
  showDetails?: boolean;
}

export function SuccessScoreGauge({
  breakdown,
  lastUpdated = 'Today, 10:00 AM',
  dataCompleteness = 100,
}: PerformanceAnalyticsProps) {
  const indicators = [
    {
      key: 'academic',
      title: 'Academic Marks',
      value: `${breakdown.academic.rawScore}%`,
      status: breakdown.academic.rawScore >= 75 ? 'Strong Standing' : breakdown.academic.rawScore >= 60 ? 'Satisfactory' : 'Needs Support',
      variant: (breakdown.academic.rawScore >= 75 ? 'success' : breakdown.academic.rawScore >= 60 ? 'warning' : 'danger') as 'success' | 'warning' | 'danger',
      description: breakdown.academic.description || 'Continuous internal assessments and semester examination marks',
      icon: GraduationCap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      barColor: 'bg-blue-600',
      numericVal: breakdown.academic.rawScore,
      target: 'Target: >75%',
    },
    {
      key: 'attendance',
      title: 'Attendance Record',
      value: `${breakdown.attendance.rawScore}%`,
      status: breakdown.attendance.rawScore >= 75 ? 'Above 75% Requirement' : 'Below 75% Requirement',
      variant: (breakdown.attendance.rawScore >= 75 ? 'success' : 'danger') as 'success' | 'danger',
      description: breakdown.attendance.description || 'Lecture and laboratory session physical/biometric attendance',
      icon: CalendarCheck,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      barColor: 'bg-emerald-600',
      numericVal: breakdown.attendance.rawScore,
      target: 'Institutional Bar: 75%',
    },
    {
      key: 'assessment',
      title: 'Assessment Performance',
      value: `${breakdown.assessment.rawScore}%`,
      status: breakdown.assessment.rawScore >= 70 ? 'On Track' : 'Review Recommended',
      variant: (breakdown.assessment.rawScore >= 70 ? 'success' : 'warning') as 'success' | 'warning',
      description: breakdown.assessment.description || 'Subject quizzes, coding assignments, and periodic problem sets',
      icon: FileCheck2,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      barColor: 'bg-indigo-600',
      numericVal: breakdown.assessment.rawScore,
      target: 'Target: >70%',
    },
    {
      key: 'lmsEngagement',
      title: 'Learning Progress & LMS',
      value: `${breakdown.lmsEngagement.rawScore}%`,
      status: breakdown.lmsEngagement.rawScore >= 70 ? 'Active Learner' : 'Needs Check-in',
      variant: (breakdown.lmsEngagement.rawScore >= 70 ? 'success' : 'warning') as 'success' | 'warning',
      description: breakdown.lmsEngagement.description || 'Course portal engagement, learning modules, and resource access',
      icon: BookOpen,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      barColor: 'bg-teal-600',
      numericVal: breakdown.lmsEngagement.rawScore,
      target: 'Target: Regular weekly study',
    },
    {
      key: 'skillsProjects',
      title: 'Skills & Capstone Projects',
      value: `${breakdown.skillsProjects.rawScore}%`,
      status: breakdown.skillsProjects.rawScore >= 75 ? 'Faculty Verified' : 'In Progress',
      variant: (breakdown.skillsProjects.rawScore >= 75 ? 'success' : 'neutral') as 'success' | 'neutral',
      description: breakdown.skillsProjects.description || 'Applied capstones, verified repositories, and technical skills',
      icon: Cpu,
      color: 'text-violet-600',
      bgColor: 'bg-violet-50',
      barColor: 'bg-violet-600',
      numericVal: breakdown.skillsProjects.rawScore,
      target: 'Target: 2+ verified projects',
    },
  ];

  return (
    <Card className="border border-slate-200/90 shadow-xs overflow-hidden">
      <CardHeader className="bg-slate-50/70 border-b border-slate-100 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base text-slate-900 flex items-center gap-2">
              <span>Student Performance Analytics</span>
              <Badge variant="neutral" className="text-[10px] font-normal">
                Separate Indicators
              </Badge>
            </CardTitle>
            <CardDescription className="text-xs text-slate-500 mt-0.5">
              Independent educational measures evaluated separately — no blended or weighted single score
            </CardDescription>
          </div>
          <div className="text-xs text-slate-500 flex sm:flex-col sm:text-right gap-3 sm:gap-0.5">
            <div>Last Updated: <span className="font-semibold text-slate-700">{lastUpdated}</span></div>
            <div>Data Profile: <span className="font-semibold text-slate-700">{dataCompleteness}% complete</span></div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        {/* 5 Separate Indicator Cards in a responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {indicators.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.key}
                className="p-4 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', ind.bgColor)}>
                        <Icon className={cn('w-4 h-4', ind.color)} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">{ind.title}</h4>
                        <span className="text-[10px] text-slate-400">{ind.target}</span>
                      </div>
                    </div>
                    <Badge variant={ind.variant} className="text-[10px]">
                      {ind.status}
                    </Badge>
                  </div>

                  <div className="mt-3.5 space-y-1.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-extrabold text-slate-900 tracking-tight">{ind.value}</span>
                      <span className="text-[11px] text-slate-500 font-medium">Standard measure</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={cn('h-full rounded-full transition-all duration-500', ind.barColor)}
                        style={{ width: `${Math.min(ind.numericVal, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                  {ind.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Informative Guidance Footer */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Clear Educational Feedback:</strong> Each metric reflects actual student records directly without arbitrary weighting or formula conversions.
            </span>
          </div>
          <span className="text-slate-400 font-mono text-[10px] shrink-0">StudyLens Direct Metrics</span>
        </div>
      </CardContent>
    </Card>
  );
}
