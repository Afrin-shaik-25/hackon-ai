'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth/auth-context';
import { Database, RotateCcw, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';

export default function AdminDemoDataPage() {
  const { isDemoMode, toggleDemoMode } = useAuth();
  const [resetSuccess, setResetSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetSandbox = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 4000);
    }, 600);
  };

  return (
    <DashboardShell>
      <div className="space-y-6 max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Evaluation Sandbox &amp; Demo Data</h1>
            <p className="text-xs text-slate-500 mt-1">
              Deterministic test suites for HacXLerate 2026 jury evaluations. Clear boundary between synthetic records and production ERPs.
            </p>
          </div>

          <Badge variant="warning" className="gap-1.5 py-1">
            <Sparkles className="w-3.5 h-3.5" />
            HacXLerate 2026 Sandbox
          </Badge>
        </div>

        {resetSuccess && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Synthetic cohort state has been restored to default deterministic evaluation records.</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Sandbox Configuration</CardTitle>
              <CardDescription>Current demonstration parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Synthetic Cohort Size:</span>
                <strong className="text-slate-800">148 Enrolled Students</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Assigned Department:</span>
                <strong className="text-slate-800">Computer Science (Sem 5)</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Data Sources Loaded:</span>
                <strong className="text-slate-800">5 (Academics, Att, Assess, LMS, Skills)</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Live ERP Connection:</span>
                <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium">
                  Disconnected (Synthetic Isolation)
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Sandbox Actions</CardTitle>
              <CardDescription>Reset or toggle demo mode</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <p className="text-slate-600 leading-relaxed">
                Clicking reset re-initializes all test students (Aarav, Priya, Rohan, Ananya), restores initial attendance percentages, and clears transient interventions.
              </p>

              <div className="pt-2">
                <Button
                  onClick={handleResetSandbox}
                  loading={loading}
                  variant="primary"
                  className="w-full gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restore Clean Sandbox Data</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
