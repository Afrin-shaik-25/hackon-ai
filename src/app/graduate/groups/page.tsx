'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, MessagesSquare, CheckCircle2, X } from 'lucide-react';

export default function GraduateGroupsPage() {
  const [joinedGroups, setJoinedGroups] = useState<string[]>(['Full-Stack & React Engineering Cohort']);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  const groups = [
    { name: 'Full-Stack & React Engineering Cohort', members: 42, topic: 'Next.js 16, TypeScript, SSR Patterns', lead: 'Aarav Sharma' },
    { name: 'Distributed Systems & Go Architecture', members: 28, topic: 'Raft Consensus, Redis Streams, gRPC', lead: 'Devansh Kulkarni' },
    { name: 'Machine Learning & Data Science Labs', members: 35, topic: 'PyTorch, Tabular Modeling, FastAPI', lead: 'Zoya Akhtar' },
  ];

  const handleJoin = (groupName: string) => {
    if (!joinedGroups.includes(groupName)) {
      setJoinedGroups([...joinedGroups, groupName]);
      setSuccessBanner(`Successfully enrolled in peer group: "${groupName}".`);
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Peer Skill Groups</h1>
          <p className="text-xs text-slate-500 mt-1">
            Collaborative study circles, open source project peer groups, and technical mock review rooms
          </p>
        </div>

        {successBanner && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successBanner}</span>
            </div>
            <button onClick={() => setSuccessBanner(null)} className="text-emerald-600 hover:text-emerald-900">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {groups.map((g) => {
            const isJoined = joinedGroups.includes(g.name);
            return (
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
                    <span>{g.members + (isJoined && g.name !== 'Full-Stack & React Engineering Cohort' ? 1 : 0)} Peers</span>
                    {isJoined ? (
                      <Badge variant="success" className="h-6 text-[11px]">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Joined
                      </Badge>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => handleJoin(g.name)} className="h-7 text-xs">
                        Join Group
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardShell>
  );
}
