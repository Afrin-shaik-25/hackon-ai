'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Award, Plus, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminAssessmentsPage() {
  const [tests, setTests] = useState([
    { title: 'CS501 Midterm MCQ Screening', sub: 'CS501 - Algorithms', type: 'MCQ', submissions: 148, maxScore: 50, date: '2026-09-28' },
    { title: 'SQL Schema Optimization Practical', sub: 'CS502 - DBMS', type: 'Coding', submissions: 146, maxScore: 50, date: '2026-10-02' },
    { title: 'OS Paging & Virtual Memory Quiz', sub: 'CS503 - Operating Systems', type: 'MCQ', submissions: 142, maxScore: 25, date: '2026-10-05' },
    { title: 'DSA Trees & Graphs Benchmarking', sub: 'CS301 - Data Structures', type: 'Coding', submissions: 130, maxScore: 100, date: '2026-09-18' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [sub, setSub] = useState('CS501 - Algorithms');
  const [type, setType] = useState('MCQ');
  const [maxScore, setMaxScore] = useState(50);
  const [date, setDate] = useState('2026-11-15');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleCreateAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!title.trim()) {
      setErrorMsg('Assessment title is required.');
      return;
    }

    const newTest = {
      title: title.trim(),
      sub,
      type,
      submissions: 0,
      maxScore: Number(maxScore) || 50,
      date,
    };

    setTests([newTest, ...tests]);
    setSuccessMsg(`Assessment template "${newTest.title}" registered successfully.`);
    setIsModalOpen(false);
    setTitle('');
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Assessments &amp; Testing Registry</h1>
            <p className="text-xs text-slate-500 mt-1">
              Administer standardized examinations, objective quizzes, and coding challenges
            </p>
          </div>

          <Button variant="primary" size="sm" onClick={() => { setErrorMsg(null); setIsModalOpen(true); }} className="gap-1.5">
            <Plus className="w-4 h-4" />
            <span>Register Assessment</span>
          </Button>
        </div>

        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tests.map((t, idx) => (
            <Card key={idx}>
              <CardContent className="p-5 space-y-2 text-xs">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-bold">
                      {t.sub}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm mt-1">{t.title}</h3>
                  </div>
                  <Badge variant={t.type === 'Coding' ? 'info' : 'default'}>{t.type}</Badge>
                </div>

                <div className="flex items-center justify-between text-slate-500 pt-2 border-t border-slate-100">
                  <span>Submissions: <strong className="text-slate-800">{t.submissions}</strong></span>
                  <span>Max Score: <strong className="text-slate-800">{t.maxScore} pts</strong></span>
                  <span>Date: {t.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Register Assessment Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Register Assessment Template"
          description="Create a standardized evaluation rubric and schedule."
        >
          <form onSubmit={handleCreateAssessment} className="space-y-4 text-xs pt-2">
            {errorMsg && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Assessment Title *</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. End-Semester Algorithmic Efficiency Test"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Course Subject</label>
                <select
                  value={sub}
                  onChange={(e) => setSub(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs"
                >
                  <option value="CS501 - Algorithms">CS501 - Algorithms</option>
                  <option value="CS502 - DBMS">CS502 - DBMS</option>
                  <option value="CS503 - Operating Systems">CS503 - Operating Systems</option>
                  <option value="CS504 - Computer Networks">CS504 - Computer Networks</option>
                  <option value="CS505 - Artificial Intelligence">CS505 - Artificial Intelligence</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Format</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs"
                >
                  <option value="MCQ">MCQ Objective Exam</option>
                  <option value="Coding">Coding / Lab Practical</option>
                  <option value="Assignment">Theory Assignment</option>
                  <option value="Viva">Viva Voce</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Max Score (Marks)</label>
                <Input
                  type="number"
                  min="10"
                  max="200"
                  value={maxScore}
                  onChange={(e) => setMaxScore(Number(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Scheduled Date</label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" className="bg-indigo-600 text-white">
                Create Assessment
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardShell>
  );
}
