'use client';

import React, { useState, useEffect } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth/auth-context';
import api from '@/lib/api-client';
import { User, Mail, GraduationCap, Building, Award, CheckCircle2, Edit3, X, Loader2, AlertCircle } from 'lucide-react';

export default function GraduateProfilePage() {
  const { user } = useAuth();

  const [title, setTitle] = useState<string>('Associate Software Engineer & Cloud Developer');
  const [summary, setSummary] = useState<string>('Detail-oriented graduate engineer with hands-on experience in full-stack web architectures, distributed systems, and modern AI pipelines.');
  const [skills, setSkills] = useState<string[]>(['Python', 'React', 'TypeScript', 'SQL', 'Docker', 'Git', 'FastAPI']);
  const [atsScore, setAtsScore] = useState<number>(88);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>('');
  const [editSummary, setEditSummary] = useState<string>('');
  const [editSkills, setEditSkills] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadResume() {
      const res = await api.graduate.getResume();
      if (res.data) {
        if (res.data.title) setTitle(res.data.title);
        if (res.data.summary) setSummary(res.data.summary);
        if (res.data.skills) setSkills(res.data.skills);
        if (res.data.ats_score) setAtsScore(res.data.ats_score);
      }
    }
    loadResume();
  }, []);

  const handleOpenEdit = () => {
    setEditTitle(title);
    setEditSummary(summary);
    setEditSkills(skills.join(', '));
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitle.trim()) {
      setErrorMsg('Target job title is required.');
      return;
    }
    
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const parsedSkills = editSkills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const res = await api.graduate.updateResume({
      title: editTitle.trim(),
      summary: editSummary.trim(),
      skills: parsedSkills,
    });

    setLoading(false);

    if (res.error) {
      setErrorMsg(res.error);
    } else if (res.data) {
      setTitle(res.data.title);
      setSummary(res.data.summary);
      setSkills(res.data.skills);
      if (res.data.ats_score) setAtsScore(res.data.ats_score);
      setSuccessMsg('Career profile and job preferences updated persistently in the database.');
      setIsEditing(false);
    } else {
      setTitle(editTitle.trim());
      setSummary(editSummary.trim());
      setSkills(parsedSkills);
      setSuccessMsg('Career preferences updated successfully.');
      setIsEditing(false);
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Graduate Profile</h1>
          <p className="text-xs text-slate-500 mt-1">
            Alumni career credentials, verified educational background, and recruiter contact preferences
          </p>
        </div>

        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
            <button onClick={() => setSuccessMsg(null)} className="text-emerald-600 hover:text-emerald-900">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <Card>
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 border-b border-slate-100 pb-6">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-md">
                {user?.name?.charAt(0) || 'S'}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900">{user?.name || 'Sneha Mukherjee'}</h2>
                  <Badge variant="success">Graduate &bull; Class of 2026</Badge>
                </div>
                <p className="text-xs text-indigo-700 font-semibold">
                  {title}
                </p>
                <p className="text-xs text-slate-600">
                  {user?.department || 'Information Technology'} &bull; {user?.college || 'National School of Applied Sciences'}
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  {user?.email || 'sneha.m@graduate.example.com'}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 self-start sm:self-auto"
                onClick={handleOpenEdit}
              >
                <Edit3 className="w-4 h-4 text-indigo-600" />
                <span>Edit Preferences</span>
              </Button>
            </div>

            {isEditing && (
              <form onSubmit={handleSave} className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    Edit Job Search Preferences &amp; Skills
                  </h3>
                  <button type="button" onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Target Role / Professional Title *</label>
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="e.g. Associate Software Engineer & Cloud Developer"
                      className="bg-white text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Skills (comma-separated)</label>
                    <Input
                      value={editSkills}
                      onChange={(e) => setEditSkills(e.target.value)}
                      placeholder="Python, React, TypeScript, SQL, Docker"
                      className="bg-white text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Career Summary</label>
                    <textarea
                      value={editSummary}
                      onChange={(e) => setEditSummary(e.target.value)}
                      rows={3}
                      className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 focus:outline-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setIsEditing(false)} disabled={loading}>
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                        Saving to Database...
                      </>
                    ) : (
                      'Save Preferences'
                    )}
                  </Button>
                </div>
              </form>
            )}

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800">Professional Summary</h4>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                {summary}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800">Verified Technical Skills</h4>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, idx) => (
                  <Badge key={idx} variant="indigo" className="text-xs">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <Award className="w-4 h-4 text-indigo-600" />
                  Career Readiness Summary
                </h4>
                <ul className="space-y-1 text-slate-600">
                  <li>&bull; Career Index: <strong>{atsScore} / 100 (Strong Candidate)</strong></li>
                  <li>&bull; Verified Capstone Repositories: <strong>2 Live Projects</strong></li>
                  <li>&bull; Technical Screening Accuracy: <strong>88%</strong></li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Recruiter Outreach Status
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  Active for placement invitations. Your verified skill passport and portfolio links are visible to verified partner employers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
