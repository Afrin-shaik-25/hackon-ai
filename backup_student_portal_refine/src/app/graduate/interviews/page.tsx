'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessagesSquare, Sparkles, CheckCircle2, Play, ArrowRight } from 'lucide-react';

interface InterviewQuestion {
  q: string;
  hint: string;
}

const QUESTIONS_FULLSTACK: InterviewQuestion[] = [
  {
    q: "How does the React virtual DOM reconciliation algorithm identify which component trees to re-render, and how do unique keys optimize this process?",
    hint: "Mention fiber tree diffing, O(N) heuristic comparison, and key stability during list reordering."
  },
  {
    q: "Explain how you would design an idempotent RESTful endpoint in a microservices architecture that handles payment processing.",
    hint: "Discuss idempotency keys in headers, database unique constraints, and atomic distributed transaction locking."
  }
];

export default function GraduateInterviewsPage() {
  const [role, setRole] = useState('Junior Full-Stack Engineer');
  const [started, setStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [answerText, setAnswerText] = useState('');
  const [completed, setCompleted] = useState(false);

  const currentQ = QUESTIONS_FULLSTACK[qIdx];

  const handleNext = () => {
    if (qIdx < QUESTIONS_FULLSTACK.length - 1) {
      setQIdx(qIdx + 1);
      setAnswerText('');
    } else {
      setCompleted(true);
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-6 max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Mock Interview Simulator</h1>
            <p className="text-xs text-slate-500 mt-1">
              Simulated technical screening questions and structural response evaluation (Demo Practice Flow)
            </p>
          </div>

          <Badge variant="warning">Simulated Evaluation Flow</Badge>
        </div>

        {!started && !completed && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Select Target Role &amp; Screening Track</CardTitle>
              <CardDescription>Tailored interview questions reflecting real employer hiring bars</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Position</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50 cursor-pointer"
                >
                  <option value="Junior Full-Stack Engineer">Junior Full-Stack Engineer (React + TypeScript)</option>
                  <option value="Associate Data Scientist">Associate Data Scientist (Python + ML)</option>
                  <option value="Backend Systems Engineer">Backend Systems Engineer (Go + Distributed Queues)</option>
                </select>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 space-y-1">
                <p className="font-bold text-slate-800">Simulator Protocol:</p>
                <p>2 in-depth architectural questions. Submit answers via text prompt for simulated AI feedback.</p>
              </div>

              <Button variant="primary" onClick={() => setStarted(true)} className="gap-2">
                <Play className="w-4 h-4" />
                <span>Start Simulated Interview</span>
              </Button>
            </CardContent>
          </Card>
        )}

        {started && !completed && (
          <Card className="border-indigo-200">
            <CardHeader className="bg-indigo-50/50 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                  Question {qIdx + 1} of {QUESTIONS_FULLSTACK.length} &bull; {role}
                </span>
                <span className="text-xs text-slate-500">Technical Round 1</span>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="font-bold text-slate-900 text-sm leading-relaxed">{currentQ.q}</p>
                <p className="text-[11px] text-slate-500 mt-2 italic">
                  <strong>Evaluator Guidance:</strong> {currentQ.hint}
                </p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Technical Answer *</label>
                <textarea
                  rows={6}
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  placeholder="Structure your answer with system principles, edge case handling, and concrete trade-offs..."
                  className="w-full p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button variant="primary" onClick={handleNext} disabled={!answerText.trim()}>
                  <span>{qIdx < QUESTIONS_FULLSTACK.length - 1 ? 'Next Question' : 'Complete Interview'}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {completed && (
          <Card className="border-emerald-200">
            <CardContent className="p-8 text-center space-y-4 text-xs">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Mock Interview Completed</h3>
              <p className="text-slate-500">Simulated Technical Evaluation for {role}</p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-md mx-auto space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-slate-500">Overall Score:</span>
                  <strong className="text-emerald-700 text-sm">88 / 100 (Strong Hire)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Conceptual Depth:</span>
                  <strong className="text-slate-800">92% &mdash; Accurate architectural terms</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Trade-Off Analysis:</span>
                  <strong className="text-slate-800">84% &mdash; Addressed latency implications</strong>
                </div>
              </div>

              <div className="pt-2 flex justify-center gap-2">
                <Button variant="outline" size="sm" onClick={() => { setStarted(false); setCompleted(false); setQIdx(0); setAnswerText(''); }}>
                  Practice Another Track
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardShell>
  );
}
