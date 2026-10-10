'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Building,
  UserCheck,
  ShieldCheck,
  FileUp,
  ScrollText,
  RotateCcw,
  Database,
  ArrowRight
} from 'lucide-react';
import { DEMO_COLLEGES, DEMO_USERS_ADMIN, DEMO_PENDING_VERIFICATIONS, DEMO_AUDIT_LOGS } from '@/lib/demo-data/admin';

export default function AdminDashboardPage() {
  const pendingFaculty = DEMO_PENDING_VERIFICATIONS.filter((v) => v.type === 'faculty').length;
  const pendingCompany = DEMO_PENDING_VERIFICATIONS.filter((v) => v.type === 'company').length;

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Platform Administration Console</h1>
            <p className="text-xs text-slate-500 mt-1">
              Consortium governance, institutional tenant onboarding, identity verification, and system integrity
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/admin/demo-data">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <Database className="w-3.5 h-3.5 text-indigo-600" />
                <span>Demo Sandbox Manager</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Admin KPI Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Consortium Campuses"
            value={DEMO_COLLEGES.length}
            subtitle="4 Active institutional tenants"
            icon={<Building className="w-5 h-5" />}
            highlightColor="indigo"
          />

          <StatCard
            title="Total Users Across Roles"
            value="8,320"
            subtitle="Students, Faculty, Recruiters"
            icon={<Users className="w-5 h-5" />}
            highlightColor="teal"
          />

          <StatCard
            title="Pending Faculty KYC"
            value={pendingFaculty}
            subtitle="Awaiting appointment verification"
            icon={<UserCheck className="w-5 h-5" />}
            highlightColor="amber"
          />

          <StatCard
            title="Pending Company KYC"
            value={pendingCompany}
            subtitle="Corporate business verification"
            icon={<ShieldCheck className="w-5 h-5" />}
            highlightColor="rose"
          />
        </div>

        {/* Verification Queues & System Audit Log */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Verifications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm">Verification Review Queues</CardTitle>
                <CardDescription>Review applicant identities before granting access</CardDescription>
              </div>
              <Badge variant="warning">{DEMO_PENDING_VERIFICATIONS.length} Pending</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {DEMO_PENDING_VERIFICATIONS.map((item) => (
                <div key={item.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{item.name}</span>
                      <Badge variant={item.type === 'faculty' ? 'info' : 'default'}>
                        {item.type}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {item.type === 'faculty' ? `${item.institution} • ${item.department}` : `${item.industry}`}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      Doc: {item.document}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link href={item.type === 'faculty' ? '/admin/faculty-verification' : '/admin/company-verification'}>
                      <Button variant="primary" size="sm" className="h-7 text-xs">
                        Review
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Audit Logs */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm">System Audit Events</CardTitle>
                <CardDescription>Tamper-evident logs of data operations</CardDescription>
              </div>
              <Link href="/admin/audit-logs" className="text-xs text-indigo-600 hover:underline">
                View All &rarr;
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {DEMO_AUDIT_LOGS.map((log) => (
                <div key={log.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">{log.action}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{log.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-600">{log.details}</p>
                  <p className="text-[10px] text-slate-400 font-mono">
                    User: {log.user} &bull; IP: {log.ip}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Admin Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <Link href="/admin/users" className="p-4 rounded-xl bg-white border border-slate-200 hover:shadow-xs transition-shadow">
            <h4 className="font-bold text-slate-900 text-xs flex items-center justify-between">
              <span>Manage Users</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </h4>
            <p className="text-[11px] text-slate-500 mt-1">Directory across all 5 roles</p>
          </Link>

          <Link href="/admin/colleges" className="p-4 rounded-xl bg-white border border-slate-200 hover:shadow-xs transition-shadow">
            <h4 className="font-bold text-slate-900 text-xs flex items-center justify-between">
              <span>Campus Tenants</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </h4>
            <p className="text-[11px] text-slate-500 mt-1">Colleges &amp; departments</p>
          </Link>

          <Link href="/admin/imports" className="p-4 rounded-xl bg-white border border-slate-200 hover:shadow-xs transition-shadow">
            <h4 className="font-bold text-slate-900 text-xs flex items-center justify-between">
              <span>Global Ingestion Logs</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </h4>
            <p className="text-[11px] text-slate-500 mt-1">CSV validation pipelines</p>
          </Link>

          <Link href="/admin/demo-data" className="p-4 rounded-xl bg-white border border-slate-200 hover:shadow-xs transition-shadow">
            <h4 className="font-bold text-slate-900 text-xs flex items-center justify-between">
              <span>Demo Sandbox</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </h4>
            <p className="text-[11px] text-slate-500 mt-1">Reset synthetic cohort data</p>
          </Link>
        </div>
      </div>
    </DashboardShell>
  );
}
