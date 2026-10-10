'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { DEMO_CANDIDATE_APPLICATIONS } from '@/lib/demo-data/jobs';
import { CandidateApplication } from '@/types';
import { Layers, CheckCircle2, XCircle, Calendar, MessageSquare, ArrowRight, Filter } from 'lucide-react';

export default function CompanyApplicationsPage() {
  const [applications, setApplications] = useState<CandidateApplication[]>(DEMO_CANDIDATE_APPLICATIONS);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [inspectApp, setInspectApp] = useState<CandidateApplication | null>(null);

  const statuses = ['All', 'Applied', 'Shortlisted', 'Interview', 'Selected', 'Rejected'];

  const filtered = applications.filter((app) => {
    return selectedStatus === 'All' || app.status === selectedStatus;
  });

  const handleUpdateStatus = (appId: string, newStatus: CandidateApplication['status']) => {
    setApplications(
      applications.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
    );
    if (inspectApp && inspectApp.id === appId) {
      setInspectApp({ ...inspectApp, status: newStatus });
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Recruitment Pipeline</h1>
            <p className="text-xs text-slate-500 mt-1">
              Screen, interview, and advance applicants through the hiring pipeline
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedStatus === st
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Pipeline Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Candidate Applications ({filtered.length})</CardTitle>
            <CardDescription>Verified skill alignment and interview stages</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold text-[11px]">
                    <th className="p-3">Candidate</th>
                    <th className="p-3">Position Applied</th>
                    <th className="p-3">Skill Match Score</th>
                    <th className="p-3">Applied Date</th>
                    <th className="p-3">Pipeline Stage</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50">
                      <td className="p-3">
                        <p className="font-bold text-slate-900">{app.candidateName}</p>
                        <p className="text-[11px] text-slate-500 font-mono">{app.candidateEmail}</p>
                      </td>
                      <td className="p-3 text-slate-700 font-medium">{app.jobTitle}</td>
                      <td className="p-3">
                        <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono">
                          {app.matchScore}% Fit
                        </span>
                      </td>
                      <td className="p-3 text-slate-500">{app.appliedDate}</td>
                      <td className="p-3">
                        <Badge
                          variant={
                            app.status === 'Selected' ? 'success' :
                            app.status === 'Interview' ? 'info' :
                            app.status === 'Shortlisted' ? 'warning' :
                            app.status === 'Rejected' ? 'danger' : 'neutral'
                          }
                        >
                          {app.status}
                        </Badge>
                      </td>
                      <td className="p-3 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setInspectApp(app)}
                          className="h-7 text-xs"
                        >
                          Review Application
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Modal: Review Application */}
        <Modal
          isOpen={!!inspectApp}
          onClose={() => setInspectApp(null)}
          title={inspectApp ? `Application: ${inspectApp.candidateName}` : ''}
          description={`Applied for: ${inspectApp?.jobTitle || ''}`}
          maxWidth="lg"
        >
          {inspectApp && (
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-slate-500">Candidate Email:</span>
                  <p className="font-mono font-bold text-slate-800">{inspectApp.candidateEmail}</p>
                </div>
                <div className="text-right">
                  <span className="text-slate-500">Skill Match:</span>
                  <p className="font-bold text-emerald-700 text-sm">{inspectApp.matchScore}% Alignment</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 mb-1">Matched Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {inspectApp.matchedSkills.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono text-[11px] border border-emerald-200">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              {inspectApp.missingSkills.length > 0 && (
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">Missing / Unverified Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {inspectApp.missingSkills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-mono text-[11px] border border-amber-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-bold text-slate-800 mb-1">Recruiter Notes</h4>
                <p className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed">
                  {inspectApp.recruiterNotes}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <span className="font-semibold text-slate-700">Update Pipeline Status:</span>
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateStatus(inspectApp.id, 'Shortlisted')}
                  >
                    Shortlist
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleUpdateStatus(inspectApp.id, 'Interview')}
                    className="bg-indigo-600"
                  >
                    Move to Interview
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleUpdateStatus(inspectApp.id, 'Selected')}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Select / Offer
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleUpdateStatus(inspectApp.id, 'Rejected')}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardShell>
  );
}
