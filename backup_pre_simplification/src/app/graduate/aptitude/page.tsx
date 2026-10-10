'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, CheckCircle2, Clock, Play } from 'lucide-react';

export default function GraduateAptitudePage() {
  const [selectedCat, setSelectedCat] = useState<'Quant' | 'Logical' | 'Verbal'>('Quant');
  const [activeQuiz, setActiveQuiz] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const sampleQuestion = {
    q: "A train running at 54 km/hr takes 20 seconds to pass a platform. If the length of the train is 120 metres, what is the length of the platform?",
    options: ["180 metres", "200 metres", "240 metres", "300 metres"],
    correct: 0,
    explanation: "Speed in m/s = 54 × (5/18) = 15 m/s. Total distance = speed × time = 15 × 20 = 300 m. Platform length = 300 - 120 = 180 metres.",
  };

  return (
    <DashboardShell>
      <div className="space-y-6 max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Aptitude &amp; Reasoning Practice</h1>
            <p className="text-xs text-slate-500 mt-1">
              Timed placement mock tests for Quantitative Aptitude, Logical Reasoning, and Verbal Ability
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200">
            {(['Quant', 'Logical', 'Verbal'] as const).map((c) => (
              <button
                key={c}
                onClick={() => { setSelectedCat(c); setActiveQuiz(false); setSubmitted(false); }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCat === c ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {!activeQuiz && !submitted && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">{selectedCat} Placement Aptitude Test Module</CardTitle>
              <CardDescription>Industry standard assessment problems with instant step-by-step breakdown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <p className="font-bold text-slate-800">Test Specifications:</p>
                <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                  <li>Timed or untimed practice modes available.</li>
                  <li>Instant mathematical derivation and shortcut explanations.</li>
                  <li>Tracks toward overall Career Readiness Index score.</li>
                </ul>
              </div>

              <Button variant="primary" onClick={() => setActiveQuiz(true)} className="gap-2">
                <Play className="w-4 h-4" />
                <span>Begin Practice Problem</span>
              </Button>
            </CardContent>
          </Card>
        )}

        {activeQuiz && !submitted && (
          <Card>
            <CardHeader className="bg-slate-50/50 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded">
                  {selectedCat} Practice Question #1
                </span>
                <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 02:45
                </span>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-5 text-xs">
              <h3 className="text-sm font-bold text-slate-900 leading-relaxed">
                {sampleQuestion.q}
              </h3>

              <div className="space-y-2">
                {sampleQuestion.options.map((opt, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedOpt(i)}
                    className={`p-3.5 rounded-xl border cursor-pointer font-medium transition-all ${
                      selectedOpt === i
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {opt}
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-3 border-t border-slate-100">
                <Button
                  variant="primary"
                  disabled={selectedOpt === null}
                  onClick={() => setSubmitted(true)}
                >
                  Submit &amp; View Explanation
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {submitted && (
          <Card className="border-emerald-200">
            <CardContent className="p-6 space-y-4 text-xs">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>{selectedOpt === sampleQuestion.correct ? 'Correct Answer!' : 'Incorrect Answer'}</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <p className="font-bold text-slate-900">Step-by-Step Derivation:</p>
                <p className="text-slate-700 leading-relaxed font-mono text-[11px]">
                  {sampleQuestion.explanation}
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <Button variant="outline" size="sm" onClick={() => { setSubmitted(false); setActiveQuiz(false); setSelectedOpt(null); }}>
                  Next Practice Problem
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardShell>
  );
}
