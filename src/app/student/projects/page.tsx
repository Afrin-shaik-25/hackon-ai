'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { DEMO_STUDENTS } from '@/lib/demo-data/students';
import { ProjectItem } from '@/types';
import { FolderGit2, Plus, GitBranch, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

export default function StudentProjectsPage() {
  const student = DEMO_STUDENTS[0];
  const [projects, setProjects] = useState<ProjectItem[]>(student.projects);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tech, setTech] = useState('');
  const [githubUrl, setGithubUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title,
      description,
      tech: tech.split(',').map((t) => t.trim()),
      verified: false,
      githubUrl,
      date: 'Oct 2026',
      feedback: 'Project submitted for departmental verification. Code analysis scheduled.',
    };
    setProjects([newProj, ...projects]);
    setIsModalOpen(false);
    setTitle('');
    setDescription('');
    setTech('');
    setGithubUrl('');
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Capstone Projects &amp; Evidence</h1>
            <p className="text-xs text-slate-500 mt-1">
              Faculty-verified project repositories demonstrating practical skills and software development competence
            </p>
          </div>

          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)} className="gap-1.5 shadow-xs">
            <Plus className="w-4 h-4" />
            <span>Submit New Project</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((proj) => (
            <Card key={proj.id}>
              <CardContent className="p-5 space-y-3 text-xs">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{proj.title}</h3>
                    <span className="text-[11px] text-slate-400">{proj.date}</span>
                  </div>
                  <Badge variant={proj.verified ? 'success' : 'neutral'}>
                    {proj.verified ? 'Verified by ' + (proj.verifiedBy || 'Faculty') : 'Pending Verification'}
                  </Badge>
                </div>

                <p className="text-slate-600 leading-relaxed">{proj.description}</p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono">
                      {t}
                    </span>
                  ))}
                </div>

                {proj.feedback && (
                  <div className="p-2.5 rounded-lg bg-indigo-50/70 text-indigo-900 border border-indigo-100 text-[11px]">
                    <span className="font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-indigo-600" />
                      Evaluator &amp; AI Analysis:
                    </span>
                    <p className="mt-0.5">{proj.feedback}</p>
                  </div>
                )}

                {proj.githubUrl && (
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 hover:underline flex items-center gap-1 font-mono text-[11px]"
                    >
                      <GitBranch className="w-3.5 h-3.5" />
                      <span>{proj.githubUrl}</span>
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal: Submit Project */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Submit Capstone Project for Verification"
          description="Provide GitHub repository link and architectural summary"
        >
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Project Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Distributed Task Scheduler"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Description *</label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe system architecture and problem solved..."
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Technologies (Comma separated) *</label>
              <input
                type="text"
                required
                value={tech}
                onChange={(e) => setTech(e.target.value)}
                placeholder="e.g. Go, Redis, Docker, gRPC"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">GitHub Evidence URL *</label>
              <input
                type="url"
                required
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username/project"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Submit for Verification
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardShell>
  );
}
