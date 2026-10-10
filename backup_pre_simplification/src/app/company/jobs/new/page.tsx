'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Job posting published successfully into recruitment pipeline.");
      router.push('/company/jobs');
    }, 500);
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

        <Card>
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Position / Job Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Associate Software Development Engineer"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Employment Type *</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as 'Full-time' | 'Internship' | 'Contract')}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 cursor-pointer"
                  >
                    <option value="Full-time">Full-time (Graduate Placement)</option>
                    <option value="Internship">Internship (Pre-final / Final Year)</option>
                    <option value="Contract">Contract / Apprenticeship</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Work Location *</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Hyderabad, Telangana (Hybrid)"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Compensation / Stipend *</label>
                  <input
                    type="text"
                    required
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="e.g. ₹7.5 - ₹10.0 LPA"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Application Deadline *</label>
                  <input
                    type="date"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Open Positions</label>
                  <input
                    type="number"
                    min={1}
                    value={openings}
                    onChange={(e) => setOpenings(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Required Skills (Comma separated) *</label>
                <input
                  type="text"
                  required
                  value={requiredSkills}
                  onChange={(e) => setRequiredSkills(e.target.value)}
                  placeholder="e.g. React, TypeScript, Node.js, SQL"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Preferred Skills</label>
                <input
                  type="text"
                  value={preferredSkills}
                  onChange={(e) => setPreferredSkills(e.target.value)}
                  placeholder="e.g. Docker, Next.js, Redis"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Job Description &amp; Responsibilities *</label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Outline core responsibilities, team structure, and qualifications..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button type="button" variant="ghost" onClick={() => router.push('/company/jobs')}>
                  Cancel
                </Button>
                <Button type="submit" loading={loading} variant="primary">
                  Publish Job Posting
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
