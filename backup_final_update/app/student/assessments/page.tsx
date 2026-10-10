'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { FileCheck2, Clock, CheckCircle2, AlertCircle, Play, Code, Check } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  type: 'mcq' | 'coding';
  options?: string[];
  correctAnswer?: number;
}

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 1,
    type: 'mcq',
    question: "What is the worst-case time complexity of QuickSort when the pivot chosen is always the maximum element?",
    options: ["O(N log N)", "O(N²)", "O(N)", "O(log N)"],
    correctAnswer: 1
  },
  {
    id: 2,
    type: 'mcq',
    question: "Which of the following data structures is optimal for implementing Dijkstra's single-source shortest path algorithm?",
    options: ["Binary Search Tree", "Min-Heap / Priority Queue", "Stack", "Circular Queue"],
    correctAnswer: 1
  },
  {
    id: 3,
    type: 'coding',
    question: "Write an algorithm or function in Python/TypeScript to check if a binary tree is symmetric (mirror reflection of itself).",
  }
];

export default function StudentAssessmentsPage() {
  const [activeTest, setActiveTest] = useState<boolean>(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [codeAnswer, setCodeAnswer] = useState('def is_symmetric(root):\n    # Write your solution here\n    pass');
  const [confirmModal, setConfirmModal] = useState(false);

  const currentQ = SAMPLE_QUESTIONS[currentQIndex];

  const handleSelectOption = (optIndex: number) => {
    setAnswers({ ...answers, [currentQ.id]: optIndex });
  };

  const handleSubmitTest = () => {
    setConfirmModal(false);
    setSubmitted(true);
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Assessments &amp; Coding Practice</h1>
          <p className="text-xs text-slate-500 mt-1">
            Interactive practice assessments and algorithm challenges (Simulated sandbox environment)
          </p>
        </div>

        {!activeTest && !submitted && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm">Available Practice Challenge: Algorithm Foundations</CardTitle>
                    <CardDescription>3 Questions &bull; 15 Minutes &bull; Data Structures &amp; Complexity</CardDescription>
                  </div>
                  <Badge variant="info">Practice Sandbox</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 leading-relaxed">
                  <p className="font-semibold text-slate-800 mb-1">Assessment Instructions:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Assessment contains 2 Multiple Choice Questions and 1 Algorithm Code Prompt.</li>
                    <li>Browser sandbox execution is purely client-side simulation. No server sandbox claimed.</li>
                    <li>Ensure you review all questions prior to final submission.</li>
                  </ul>
                </div>

                <Button variant="primary" onClick={() => setActiveTest(true)} className="gap-2">
                  <Play className="w-4 h-4" />
                  <span>Begin Assessment</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ACTIVE TEST EXPERIENCE */}
        {activeTest && !submitted && (
          <Card className="border-indigo-200">
            <CardHeader className="bg-indigo-50/50 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                    Question {currentQIndex + 1} of {SAMPLE_QUESTIONS.length}
                  </span>
                  <span className="text-xs text-slate-500">Algorithm Foundations Practice</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-mono">
                  <Clock className="w-3.5 h-3.5 text-indigo-600" />
                  <span>14:22 remaining</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-relaxed">
                  {currentQ.question}
                </h3>
              </div>

              {currentQ.type === 'mcq' && currentQ.options && (
                <div className="space-y-2">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = answers[currentQ.id] === optIdx;
                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`p-3.5 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                      </div>
                    );
                  })}
                </div>
              )}

              {currentQ.type === 'coding' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Code className="w-3.5 h-3.5" /> Python 3 Solution Sandbox
                    </span>
                    <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      Practice editor (simulated execution)
                    </span>
                  </div>
                  <textarea
                    rows={6}
                    value={codeAnswer}
                    onChange={(e) => setCodeAnswer(e.target.value)}
                    className="w-full p-3 font-mono text-xs bg-slate-900 text-slate-100 rounded-xl focus:outline-none"
                  />
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex((i) => i - 1)}
                >
                  Previous
                </Button>

                <div className="flex items-center gap-2">
                  {currentQIndex < SAMPLE_QUESTIONS.length - 1 ? (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setCurrentQIndex((i) => i + 1)}
                    >
                      Next Question
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setConfirmModal(true)}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      Submit Assessment
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* SUBMISSION CONFIRMATION MODAL */}
        <Modal
          isOpen={confirmModal}
          onClose={() => setConfirmModal(false)}
          title="Confirm Submission"
          description="Are you ready to submit your assessment answers?"
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              You have answered {Object.keys(answers).length + 1} of {SAMPLE_QUESTIONS.length} items. Once submitted, your practice score will be updated immediately.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setConfirmModal(false)}>
                Return to Review
              </Button>
              <Button variant="primary" size="sm" onClick={handleSubmitTest}>
                Confirm &amp; Finalize
              </Button>
            </div>
          </div>
        </Modal>

        {/* COMPLETED ASSESSMENT RESULT VIEW */}
        {submitted && (
          <Card className="border-emerald-200">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Assessment Submitted Successfully</h3>
                <p className="text-xs text-slate-500 mt-1">Algorithm Foundations Practice</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-sm mx-auto text-xs space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-slate-500">Score Earned:</span>
                  <strong className="text-indigo-600 font-bold text-sm">28 / 30 (93%)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">MCQ Accuracy:</span>
                  <strong className="text-emerald-700">2 / 2 Correct</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Code Syntax Validation:</span>
                  <strong className="text-emerald-700">Passed Simulated Lints</strong>
                </div>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <Button variant="outline" size="sm" onClick={() => { setSubmitted(false); setActiveTest(false); }}>
                  Back to Assessments
                </Button>
                <Link href="/student/success-score">
                  <Button variant="primary" size="sm">
                    View Performance Analytics
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardShell>
  );
}
