'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth/auth-context';
import { User, Mail, GraduationCap, Building, Award, CheckCircle2 } from 'lucide-react';

export default function GraduateProfilePage() {
  const { user } = useAuth();

  return (
    <DashboardShell>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Graduate Profile</h1>
          <p className="text-xs text-slate-500 mt-1">
            Alumni career credentials, verified educational background, and recruiter contact preferences
          </p>
        </div>

        <Card>
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 border-b border-slate-100 pb-6">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-md">
                {user?.name?.charAt(0) || 'S'}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900">{user?.name || 'Sneha Mukherjee'}</h2>
                  <Badge variant="success">Graduate &bull; Class of 2026</Badge>
                </div>
                <p className="text-xs text-slate-600">
                  {user?.department || 'Information Technology'} &bull; {user?.college || 'National School of Applied Sciences'}
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  {user?.email || 'sneha.m@graduate.example.com'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <Award className="w-4 h-4 text-indigo-600" />
                  Career Readiness Summary
                </h4>
                <ul className="space-y-1 text-slate-600">
                  <li>&bull; Career Index: <strong>86 / 100 (Strong Candidate)</strong></li>
                  <li>&bull; Verified Capstone Repositories: <strong>2 Live Projects</strong></li>
                  <li>&bull; Technical Screening Accuracy: <strong>88%</strong></li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Recruiter Outreach Status
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  Active for placement invitations. Your verified skill passport and portfolio links are visible to verified partner employers.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="outline" size="sm" onClick={() => alert("Career preferences updated.")}>
                Edit Job Search Preferences
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
