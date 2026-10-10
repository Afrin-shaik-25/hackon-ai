'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import api from '@/lib/api-client';
import { ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function CompanyNewJobPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [type, setType] = useState<'Full-time' | 'Internship' | 'Contract'>('Full-time');
  const [location, setLocation] = useState('Bengaluru, Karnataka (Hybrid)');
  const [salary, setSalary] = useState('₹8.0 - ₹11.0 LPA');
  const [deadline, setDeadline] = useState('2026-11-30');
  const [experience, setExperience] = useState('0 - 1 Years (Entry Level)');
  const [openings, setOpenings] = useState(2);
  const [requiredSkills, setRequiredSkills] = useState('React, TypeScript, SQL, Git');
  const [preferredSkills, setPreferredSkills] = useState('Next.js, Tailwind CSS, Docker');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!title.trim()) {
      setErrorMsg('Job title is required.');
      return;
    }
    if (!description.trim() || description.trim().length < 20) {
      setErrorMsg('Role description must be at least 20 characters long.');
      return;
    }

    setLoading(true);

    const payload = {
      title: title.trim(),
      type,
      location: location.trim(),
      remote: location.toLowerCase().includes('remote'),
      salary: salary.trim(),
      deadline,
      required_skills: requiredSkills.split(',').map((s) => s.trim()).filter(Boolean),
      preferred_skills: preferredSkills.split(',').map((s) => s.trim()).filter(Boolean),
      experience,
      description: description.trim(),
      openings: Number(openings) || 1,
    };

    const res = await api.company.createJob(payload);
    setLoading(false);

    if (res.error) {
      setErrorMsg(res.error);
    } else {
      setSuccessMsg('Job posting published successfully into recruitment pipeline.');
      setTimeout(() => {
        router.push('/company/jobs');
      }, 1500);
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-6 max-w-3xl">
        <div className="flex items-center gap-3">
          <Link href="/company/jobs">
            <Button variant="outline" size="sm" className="h-8">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              <span>Back to Jobs</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Post New Opportunity</h1>
            <p className="text-xs text-slate-500">
              Publish a verified role opening to participating college cohorts
            </p>
          </div>
        </div>

        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg} Redirecting to active listings...</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <Card>
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Position / Job Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Associate Software Engineer - Cloud Platforms"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Employment Type *</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as typeof type)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Internship">Internship (6 Months)</option>
                    <option value="Contract">Contract / Apprenticeship</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location *</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Compensation Range</label>
                  <input
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Experience Required</label>
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Openings</label>
                  <input
                    type="number"
                    min="1"
                    value={openings}
                    onChange={(e) => setOpenings(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mandatory Skills (comma-separated) *</label>
                <input
                  type="text"
                  value={requiredSkills}
                  onChange={(e) => setRequiredSkills(e.target.value)}
                  placeholder="React, TypeScript, SQL, Docker"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Preferred Skills (comma-separated)</label>
                <input
                  type="text"
                  value={preferredSkills}
                  onChange={(e) => setPreferredSkills(e.target.value)}
                  placeholder="Next.js, Tailwind CSS, Kubernetes"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Role Description &amp; Responsibilities *</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Outline key project expectations, daily responsibilities, mentor allocations, and campus recruitment evaluation benchmarks (minimum 20 characters)..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-indigo-500"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <Link href="/company/jobs">
                  <Button type="button" variant="ghost" size="sm" disabled={loading}>
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" variant="primary" size="sm" disabled={loading} className="gap-2 bg-indigo-600 text-white">
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Publishing to Database...</span>
                    </>
                  ) : (
                    <span>Publish Role Opening</span>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
