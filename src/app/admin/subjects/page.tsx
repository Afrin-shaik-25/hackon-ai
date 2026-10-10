'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { GraduationCap, Plus, BookOpen, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminSubjectsPage() {
  const [subjects, setSubjects] = useState([
    { code: 'CS501', name: 'Design & Analysis of Algorithms', dept: 'Computer Science', credits: 4, sem: 5, enrolled: 148 },
    { code: 'CS502', name: 'Database Management Systems', dept: 'Computer Science', credits: 4, sem: 5, enrolled: 148 },
    { code: 'CS503', name: 'Operating Systems', dept: 'Computer Science', credits: 4, sem: 5, enrolled: 148 },
    { code: 'DS501', name: 'Machine Learning Principles', dept: 'Data Science', credits: 4, sem: 5, enrolled: 42 },
    { code: 'EC501', name: 'Embedded Systems Architecture', dept: 'Electronics & Comm', credits: 4, sem: 5, enrolled: 28 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [dept, setDept] = useState('Computer Science');
  const [credits, setCredits] = useState(4);
  const [sem, setSem] = useState(5);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!code.trim() || !name.trim()) {
      setErrorMsg('Course code and course title are required.');
      return;
    }

    if (subjects.some((s) => s.code.toUpperCase() === code.trim().toUpperCase())) {
      setErrorMsg(`Course with code "${code.toUpperCase()}" already exists in the registry.`);
      return;
    }

    const newSubj = {
      code: code.trim().toUpperCase(),
      name: name.trim(),
      dept: dept.trim(),
      credits: Number(credits) || 3,
      sem: Number(sem) || 1,
      enrolled: 0,
    };

    setSubjects([...subjects, newSubj]);
    setSuccessMsg(`Course ${newSubj.code} (${newSubj.name}) added to registry.`);
    setIsModalOpen(false);
    setCode('');
    setName('');
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Curricula &amp; Course Registry</h1>
            <p className="text-xs text-slate-500 mt-1">
              Configure course identifiers, internal/external weightings, and enrolled cohorts
            </p>
          </div>

          <Button variant="primary" size="sm" onClick={() => { setErrorMsg(null); setIsModalOpen(true); }} className="gap-1.5">
            <Plus className="w-4 h-4" />
            <span>Add Course</span>
          </Button>
        </div>

        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((sub) => (
            <Card key={sub.code}>
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {sub.code}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm mt-2">{sub.name}</h3>
                  </div>
                  <Badge variant="outline">{sub.credits} Credits</Badge>
                </div>

                <div className="text-xs text-slate-500 space-y-1 pt-1 border-t border-slate-100">
                  <p>Department: <strong className="text-slate-800">{sub.dept}</strong></p>
                  <p>Semester: <strong className="text-slate-800">{sub.sem}</strong> &bull; Enrolled: <strong className="text-slate-800">{sub.enrolled}</strong> students</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Course Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add New Course Definition"
          description="Register a new academic module into the university curriculum."
        >
          <form onSubmit={handleAddCourse} className="space-y-4 text-xs pt-2">
            {errorMsg && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Course Code *</label>
                <Input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g. CS604"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Credits</label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={credits}
                  onChange={(e) => setCredits(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Course Title *</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Distributed Consensus & Fault Tolerance"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Department</label>
                <Input
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  placeholder="Computer Science"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Semester (1–8)</label>
                <select
                  value={sem}
                  onChange={(e) => setSem(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <option key={s} value={s}>Semester {s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" className="bg-indigo-600 text-white">
                Register Course
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardShell>
  );
}
