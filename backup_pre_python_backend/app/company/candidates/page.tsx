'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { DEMO_STUDENTS } from '@/lib/demo-data/students';
import { Student } from '@/types';
import { Search, Cpu, FolderGit2, CheckCircle2, Eye, ShieldCheck, GitBranch, ExternalLink } from 'lucide-react';

export default function CompanyCandidatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<Student | null>(null);

  // Candidates who have consented to recruiter portfolio visibility
  const consentedCandidates = DEMO_STUDENTS.filter((s) => s.projects.length > 0);

  const filtered = consentedCandidates.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.projects.some((p) => p.tech.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Consented Candidate Discovery</h1>
            <p className="text-xs text-slate-500 mt-1">
              Search students and graduates with verified capstones, GitHub code evidence, and technical skills
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by skill (e.g. Go, React, Python)..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Candidate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <Card key={c.id} className="hover:shadow-xs transition-shadow">
              <CardContent className="p-5 space-y-3 text-xs">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center text-sm">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{c.name}</h3>
                      <p className="text-[11px] text-slate-500">{c.department} &bull; Year {c.year}</p>
                    </div>
                  </div>
                  <Badge variant="success">Verified Capstone</Badge>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <p className="text-slate-500 text-[11px] font-semibold">Featured Projects:</p>
                  {c.projects.slice(0, 2).map((p) => (
                    <div key={p.id} className="p-2 rounded bg-slate-50 border border-slate-100 text-[11px]">
                      <p className="font-bold text-slate-800">{p.title}</p>
                      <p className="text-slate-500 line-clamp-1">{p.description}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {p.tech.map((t) => (
                          <span key={t} className="px-1 py-0.2 rounded bg-slate-200 text-slate-700 text-[9px] font-mono">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Candidate Consented
                  </span>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setSelectedCandidate(c)}
                    className="h-7 text-xs"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    View Portfolio
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Candidate Detail Modal */}
        <Modal
          isOpen={!!selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          title={selectedCandidate ? `${selectedCandidate.name}'s Verified Profile` : ''}
          description="Candidate-consented portfolio & skills"
          maxWidth="lg"
        >
          {selectedCandidate && (
            <div className="space-y-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-800">{selectedCandidate.name}</p>
                <p className="text-slate-500">{selectedCandidate.department} &bull; {selectedCandidate.college}</p>
                <p className="text-slate-400 font-mono text-[11px] mt-0.5">{selectedCandidate.email}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">Verified Projects &amp; Code Evidence</h4>
                <div className="space-y-2">
                  {selectedCandidate.projects.map((proj) => (
                    <div key={proj.id} className="p-3 rounded-lg border border-slate-200 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-800 text-sm">{proj.title}</strong>
                        <Badge variant="success">Verified</Badge>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{proj.description}</p>
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-600 hover:underline flex items-center gap-1 font-mono text-[11px] pt-1"
                        >
                          <GitBranch className="w-3.5 h-3.5" />
                          <span>{proj.githubUrl}</span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-blue-50 text-blue-900 border border-blue-100 text-[11px] flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Privacy Firewall:</strong> Internal attendance and faculty notes are not visible to recruiters. Only verified project deliverables and skill passports are shared.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedCandidate(null)}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    alert(`Invitation to apply sent to ${selectedCandidate.name}!`);
                    setSelectedCandidate(null);
                  }}
                >
                  Invite to Apply
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardShell>
  );
}
