'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DEMO_STUDENTS } from '@/lib/demo-data/students';
import { ExtracurricularActivity } from '@/types';
import { Compass, Trophy, Users, CalendarCheck, CheckCircle2 } from 'lucide-react';

export default function StudentActivitiesPage() {
  const student = DEMO_STUDENTS[0];
  const [activities, setActivities] = useState<ExtracurricularActivity[]>(student.activities);

  const availableEvents = [
    { id: 'ev-1', title: 'Smart India Hackathon 2026', org: 'AICTE / MoE', category: 'Hackathon', date: '2026-11-10' },
    { id: 'ev-2', title: 'Open-Source AI Fellowship Seminar', org: 'Campus ACM Chapter', category: 'Seminar', date: '2026-10-28' },
    { id: 'ev-3', title: 'Robotics & Microcontroller Workshop', org: 'IEEE Robotics Branch', category: 'Workshop', date: '2026-11-04' },
  ];

  const handleRegister = (ev: typeof availableEvents[0]) => {
    const newAct: ExtracurricularActivity = {
      id: `act-${ev.id}-${activities.length + 1}`,
      title: ev.title,
      category: ev.category as 'Hackathon' | 'Workshop' | 'Club' | 'Seminar',
      date: ev.date,
      role: 'Participant',
      status: 'Registered',
      organization: ev.org,
    };
    setActivities([newAct, ...activities]);
    alert(`Registered for ${ev.title} (Simulated Event Enrollment)`);
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Extracurricular Activities &amp; Hackathons</h1>
          <p className="text-xs text-slate-500 mt-1">
            Discover student competitions, technical clubs, and regional symposiums
          </p>
        </div>

        {/* My Registered Activities */}
        <div>
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">
            My Participation Records
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activities.map((act) => (
              <Card key={act.id}>
                <CardContent className="p-5 space-y-2 text-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-[10px]">
                        {act.category}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm mt-1">{act.title}</h3>
                    </div>
                    <Badge variant={act.status === 'Completed' ? 'success' : 'warning'}>
                      {act.status}
                    </Badge>
                  </div>

                  <p className="text-slate-500 text-[11px]">
                    Role: <strong className="text-slate-700">{act.role}</strong> &bull; Org: {act.organization}
                  </p>
                  <p className="text-slate-400 text-[10px]">Date: {act.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Discover & Register Opportunities */}
        <div className="pt-4 border-t border-slate-200">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">
            Available Campus Opportunities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {availableEvents.map((ev) => (
              <Card key={ev.id}>
                <CardContent className="p-5 space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-[10px] text-slate-500 uppercase">{ev.category}</span>
                    <h4 className="font-bold text-slate-900 text-sm mt-0.5">{ev.title}</h4>
                    <p className="text-[11px] text-slate-500">{ev.org}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-slate-400 text-[10px]">Scheduled: {ev.date}</span>
                    <Button variant="primary" size="sm" onClick={() => handleRegister(ev)} className="h-7 text-[11px]">
                      Register
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
