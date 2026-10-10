'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Cpu, CheckCircle2, Sparkles, FolderGit2, ArrowRight, ExternalLink, Plus, BookOpen } from 'lucide-react';
import { DEMO_STUDENTS } from '@/lib/demo-data/students';
import { Modal } from '@/components/ui/modal';
import Link from 'next/link';

export default function StudentSkillsPage() {
  const student = DEMO_STUDENTS[0];
  const [activeTab, setActiveTab] = useState<'skills' | 'projects'>('skills');

  const skills = [
    { name: 'Data Structures & Algorithms', level: 'Advanced', proficiency: 88, verified: true, source: 'CS501 Exam' },
    { name: 'Go (Golang) & Systems Programming', level: 'Proficient', proficiency: 84, verified: true, source: 'Distributed Queue Capstone' },
    { name: 'TypeScript & React', level: 'Advanced', proficiency: 90, verified: true, source: 'Extension Project' },
    { name: 'Relational DBMS & SQL Optimization', level: 'Proficient', proficiency: 80, verified: true, source: 'CS502 Lab' },
    { name: 'Docker & Microservices', level: 'Intermediate', proficiency: 72, verified: false, source: 'Self-Reported' },
    { name: 'Artificial Intelligence Foundations', level: 'Proficient', proficiency: 85, verified: true, source: 'CS505 Coursework' },
  ];

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Skills &amp; Projects</h1>
              <Badge variant="info" className="text-[11px]">Faculty Verified</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Competencies backed by faculty lab evaluations, course exams, and verified GitHub repositories
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/student/subjects">
              <Button variant="primary" size="sm" className="gap-1.5 shadow-xs">
                <BookOpen className="w-3.5 h-3.5" />
                <span>View Semester Subjects</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Replaced Section Banner */}
        <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-indigo-600 shrink-0" />
            <div>
              <p className="font-bold">Upgraded to Semester Subjects &amp; Learning Content</p>
              <p className="text-[11px] text-indigo-700">Curriculum units, lecture handouts, and exam prep resources have replaced static skills according to your academic profile.</p>
            </div>
          </div>
          <Link href="/student/subjects" className="shrink-0">
            <Button variant="outline" size="sm" className="gap-1.5 bg-white text-indigo-700 border-indigo-300 hover:bg-indigo-50 text-xs font-semibold">
              <span>Open Semester Subjects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'skills'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Verified Skills ({skills.length})
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Verified Capstone Projects ({student.projects.length})
          </button>
        </div>

        {/* Tab Content: Skills */}
        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <Card key={skill.name}>
                <CardContent className="p-5 space-y-3 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-indigo-600 shrink-0" />
                      <h3 className="font-bold text-slate-900 text-sm leading-snug">{skill.name}</h3>
                    </div>
                    <Badge variant={skill.verified ? 'success' : 'neutral'}>
                      {skill.verified ? 'Verified' : 'Self-Reported'}
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>Proficiency Level: <strong>{skill.level}</strong></span>
                      <span className="font-mono font-bold text-slate-700">{skill.proficiency}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${skill.proficiency}%` }} />
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    Source: <strong className="text-slate-700">{skill.source}</strong>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Tab Content: Projects */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {student.projects.map((proj) => (
              <Card key={proj.id}>
                <CardContent className="p-5 space-y-3 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{proj.title}</h3>
                      <span className="text-[11px] text-slate-400">{proj.date}</span>
                    </div>
                    <Badge variant={proj.verified ? 'success' : 'neutral'}>
                      {proj.verified ? `Verified by ${proj.verifiedBy || 'Faculty'}` : 'Pending Verification'}
                    </Badge>
                  </div>

                  <p className="text-slate-600 leading-relaxed text-[11px]">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono border border-slate-200">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 font-semibold hover:underline flex items-center gap-1"
                    >
                      <FolderGit2 className="w-3.5 h-3.5" />
                      <span>View GitHub Repository</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
