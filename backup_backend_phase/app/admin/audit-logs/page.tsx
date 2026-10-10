'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DataTable, Column } from '@/components/shared/data-table';
import { DEMO_AUDIT_LOGS } from '@/lib/demo-data/admin';
import { AuditLog } from '@/types';
import { ScrollText, ShieldCheck } from 'lucide-react';

export default function AdminAuditLogsPage() {
  const columns: Column<AuditLog>[] = [
    { key: 'timestamp', header: 'Timestamp', sortable: true, render: (l) => (
      <span className="font-mono text-slate-500 text-[11px]">{l.timestamp}</span>
    )},
    { key: 'action', header: 'Action', sortable: true, render: (l) => (
      <span className="font-semibold text-slate-900">{l.action}</span>
    )},
    { key: 'user', header: 'User / Identity', sortable: true, render: (l) => (
      <span className="text-slate-700 font-medium">{l.user}</span>
    )},
    { key: 'role', header: 'Role', render: (l) => (
      <Badge variant="outline" className="capitalize">{l.role}</Badge>
    )},
    { key: 'details', header: 'Audit Details', render: (l) => (
      <span className="text-slate-600 text-xs">{l.details}</span>
    )},
    { key: 'ip', header: 'Client IP', render: (l) => (
      <span className="font-mono text-slate-400 text-[11px]">{l.ip}</span>
    )},
  ];

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Audit Trail</h1>
          <p className="text-xs text-slate-500 mt-1">
            Immutable log of data ingestion events, role updates, and intervention status modifications
          </p>
        </div>

        <DataTable
          data={DEMO_AUDIT_LOGS as unknown as Record<string, unknown>[]}
          columns={columns as unknown as Column<Record<string, unknown>>[]}
          searchKey="action"
          searchPlaceholder="Search audit events by action..."
        />
      </div>
    </DashboardShell>
  );
}
