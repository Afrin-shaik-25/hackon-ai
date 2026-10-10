'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Cpu, CheckCircle2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function GraduateSkillsPage() {
  const skills = [
    { name: 'TypeScript & Next.js Full-Stack', level: 'Advanced', score: 92, verified: true },
    { name: 'Distributed Systems & Go', level: 'Proficient', score: 86, verified: true },
    { name: 'SQL Schema Architecture & Tuning', level: 'Proficient', score: 82, verified: true },
    { name: 'Docker & Container Orchestration', level: 'Intermediate', score: 75, verified: false },
    { name: 'Quantitative Aptitude & Logic', level: 'Advanced', score: 88, verified: true },
  ];

  return (
    <DashboardShell>
      <div className="space-y-6 max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Graduate Skill Passport</h1>
            <p className="text-xs text-slate-500 mt-1">
              Verified technical proficiencies certified by university coursework and coding capstones
            </p>
          </div>

          <Link href="/graduate/resume">
            <Button variant="primary" size="sm" className="shadow-xs">
              Add Verified Skills to Resume
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((s) => (
            <Card key={s.name}>
              <CardContent className="p-5 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-indigo-600" />
                    <h3 className="font-bold text-slate-900 text-sm">{s.name}</h3>
                  </div>
                  <Badge variant={s.verified ? 'success' : 'neutral'}>
                    {s.verified ? 'Verified' : 'Self-Reported'}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Proficiency: {s.level}</span>
                    <strong className="text-slate-800">{s.score}%</strong>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${s.score}%` }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
