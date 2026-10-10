'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FolderGit2, GitBranch, ExternalLink, ShieldCheck } from 'lucide-react';

export default function GraduateProjectsPage() {
  const projects = [
    {
      title: 'Distributed Asynchronous Task Scheduler',
      desc: 'High-throughput queue orchestrator implemented in Go with Redis streams and Docker orchestration.',
      tech: ['Go', 'Redis', 'Docker', 'gRPC'],
      github: 'https://github.com/graduate/distributed-queue',
      verified: true,
      verifier: 'Dr. K. Raman (Faculty Advisor)',
    },
    {
      title: 'Real-Time Collaborative Code Playground',
      desc: 'Browser-based IDE with WebSockets, monaco editor, and syntax highlighting.',
      tech: ['TypeScript', 'Next.js', 'WebSockets', 'Tailwind CSS'],
      github: 'https://github.com/graduate/code-playground',
      verified: true,
      verifier: 'Prof. S. Iyer (Software Eng Dept)',
    },
  ];

  return (
    <DashboardShell>
      <div className="space-y-6 max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Verified Project Portfolio</h1>
            <p className="text-xs text-slate-500 mt-1">
              Capstone software artifacts verified by faculty, ready for corporate recruiter review
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((proj) => (
            <Card key={proj.title}>
              <CardContent className="p-5 space-y-3 text-xs">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">{proj.title}</h3>
                  <Badge variant="success">Verified</Badge>
                </div>

                <p className="text-slate-600 leading-relaxed">{proj.desc}</p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {proj.tech.map((t) => (
                    <span key={t} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Certified by: {proj.verifier}</span>
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 hover:underline flex items-center gap-1 font-mono text-[11px]"
                  >
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>Repository</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
