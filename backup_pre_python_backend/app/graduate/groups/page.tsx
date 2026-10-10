'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, MessagesSquare, CheckCircle2 } from 'lucide-react';

export default function GraduateGroupsPage() {
  const groups = [
    { name: 'Full-Stack & React Engineering Cohort', members: 42, topic: 'Next.js 16, TypeScript, SSR Patterns', lead: 'Aarav Sharma' },
    { name: 'Distributed Systems & Go Architecture', members: 28, topic: 'Raft Consensus, Redis Streams, gRPC', lead: 'Devansh Kulkarni' },
    { name: 'Machine Learning & Data Science Labs', members: 35, topic: 'PyTorch, Tabular Modeling, FastAPI', lead: 'Zoya Akhtar' },
  ];

  return (
    <DashboardShell>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Peer Skill Groups</h1>
          <p className="text-xs text-slate-500 mt-1">
            Collaborative study circles, open source project peer groups, and technical mock review rooms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {groups.map((g) => (
            <Card key={g.name}>
              <CardContent className="p-5 space-y-3 text-xs">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{g.name}</h3>
                  <p className="text-[11px] text-slate-500 mt-1">{g.topic}</p>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                  <span>{g.members} Peers</span>
                  <Button variant="outline" size="sm" onClick={() => alert(`Joined ${g.name}`)} className="h-7 text-xs">
                    Join Group
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
