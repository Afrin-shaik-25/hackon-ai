'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ScoreBreakdown } from '@/types';
import { HelpCircle, AlertCircle, Info, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SuccessScoreGaugeProps {
  score: number;
  previousScore?: number;
  breakdown: ScoreBreakdown;
  lastUpdated?: string;
  dataCompleteness?: number;
  showDetails?: boolean;
}

export function SuccessScoreGauge({
  score,
  previousScore,
  breakdown,
  lastUpdated = 'Today, 10:00 AM',
  dataCompleteness = 100,
  showDetails = true
}: SuccessScoreGaugeProps) {
  const getScoreColor = (val: number) => {
    if (val >= 80) return { ring: 'text-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Exemplary' };
    if (val >= 65) return { ring: 'text-blue-500', bg: 'bg-blue-50', text: 'text-blue-700', label: 'Satisfactory' };
    if (val >= 50) return { ring: 'text-amber-500', bg: 'bg-amber-50', text: 'text-amber-700', label: 'Needs Support' };
    return { ring: 'text-rose-500', bg: 'bg-rose-50', text: 'text-rose-700', label: 'Critical Review' };
  };

  const statusInfo = getScoreColor(score);
  const delta = previousScore !== undefined ? score - previousScore : 0;

  const components = [
    { key: 'academic', label: 'Academic Performance', weight: '30%', weightVal: 0.30, data: breakdown.academic, iconColor: 'bg-blue-500' },
    { key: 'attendance', label: 'Attendance Consistency', weight: '20%', weightVal: 0.20, data: breakdown.attendance, iconColor: 'bg-emerald-500' },
    { key: 'assessment', label: 'Assessment & Quizzes', weight: '20%', weightVal: 0.20, data: breakdown.assessment, iconColor: 'bg-indigo-500' },
    { key: 'lmsEngagement', label: 'LMS & Learning Engagement', weight: '15%', weightVal: 0.15, data: breakdown.lmsEngagement, iconColor: 'bg-amber-500' },
    { key: 'skillsProjects', label: 'Skills & Verified Projects', weight: '15%', weightVal: 0.15, data: breakdown.skillsProjects, iconColor: 'bg-teal-500' }
  ];

  const hasMissingComponents = components.some(c => c.data.status === 'missing');

  return (
    <Card className="border border-slate-200/90 shadow-sm overflow-hidden">
      <CardHeader className="bg-slate-50/50 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <span>Student Success Score</span>
              {hasMissingComponents && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Provisional Score
                </span>
              )}
            </CardTitle>
            <CardDescription>
              Explainable multi-dimensional success model (30 / 20 / 20 / 15 / 15)
            </CardDescription>
          </div>
          <div className="text-right text-xs text-slate-500">
            <div>Data freshness: <span className="font-semibold text-slate-700">{lastUpdated}</span></div>
            <div>Coverage: <span className="font-semibold text-slate-700">{dataCompleteness}%</span></div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Main Score Visual */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8 pb-8 border-b border-slate-100">
          <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200/70 min-w-[200px]">
            <div className="relative flex items-center justify-center">
              {/* Circular Gauge Representation */}
              <div className="w-28 h-28 rounded-full border-8 border-slate-200 flex flex-col items-center justify-center relative shadow-inner">
                <span className="text-4xl font-extrabold text-slate-900 tracking-tight">{score}</span>
                <span className="text-[10px] uppercase font-bold text-slate-400">out of 100</span>
              </div>
            </div>

            <div className="mt-3 text-center">
              <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', statusInfo.bg, statusInfo.text)}>
                {statusInfo.label}
              </span>
              {delta !== 0 && (
                <p className="text-xs text-slate-500 mt-1.5">
                  {delta > 0 ? `+${delta}` : delta} pts from prior period
                </p>
              )}
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3.5 text-xs text-blue-900 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">Explainability & Weighting Calculation</p>
                <p className="text-blue-800/90 mt-0.5 leading-relaxed">
                  Total Score = (Academics × 0.30) + (Attendance × 0.20) + (Assessments × 0.20) + (LMS Engagement × 0.15) + (Projects & Skills × 0.15).
                  Scores are calculated against verified institutional criteria.
                </p>
              </div>
            </div>

            {hasMissingComponents && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">Missing Source Adjustment Notice</p>
                  <p className="text-amber-800/90 mt-0.5 leading-relaxed">
                    One or more data pipelines have not delivered sync records for this cohort. Unverified categories are labelled &ldquo;Insufficient Data&rdquo; rather than penalized to zero.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Breakdown Table */}
        {showDetails && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Component-Level Weighted Contribution
            </h4>

            <div className="grid grid-cols-1 gap-3">
              {components.map((comp) => {
                const isMissing = comp.data.status === 'missing';
                return (
                  <div
                    key={comp.key}
                    className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 transition-all"
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={cn('w-2 h-2 rounded-full', comp.iconColor)} />
                        <span className="font-semibold text-slate-800">{comp.label}</span>
                        <span className="text-slate-400 font-mono">({comp.weight} weight)</span>
                      </div>

                      <div className="flex items-center gap-3">
                        {isMissing ? (
                          <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                            Insufficient Data
                          </span>
                        ) : (
                          <>
                            <span className="text-slate-500">
                              Raw: <strong className="text-slate-800">{comp.data.rawScore}/100</strong>
                            </span>
                            <span className="text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                              +{comp.data.weightedScore.toFixed(1)} pts
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-500',
                          isMissing ? 'bg-slate-300' : 'bg-indigo-600'
                        )}
                        style={{ width: `${isMissing ? 0 : comp.data.rawScore}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-500 mt-1.5">
                      {comp.data.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
