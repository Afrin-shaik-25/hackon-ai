'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DEMO_IMPORT_HISTORY } from '@/lib/demo-data/faculty';
import { FileUp, Eye, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminImportsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System-Wide CSV Data Ingestion Logs</h1>
            <p className="text-xs text-slate-500 mt-1">
              Consortium-level monitoring of spreadsheet reconciliations, accepted lines, and validation rejections
            </p>
          </div>

          <Link href="/faculty/imports">
            <Button variant="primary" size="sm" className="gap-1.5">
              <FileUp className="w-4 h-4" />
              <span>Launch Ingestion Wizard</span>
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Global Data Ingestion Pipeline History</CardTitle>
            <CardDescription>Processed batches across all colleges and departments</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold text-[11px]">
                    <th className="px-4 py-3">Batch ID</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Filename</th>
                    <th className="px-4 py-3">Uploader</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Accepted</th>
                    <th className="px-4 py-3">Rejected</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {DEMO_IMPORT_HISTORY.map((h) => (
                    <tr key={h.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono font-bold text-indigo-600">{h.id}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{h.sourceTitle}</td>
                      <td className="px-4 py-3 font-mono text-slate-600 truncate max-w-xs">{h.fileName}</td>
                      <td className="px-4 py-3 text-slate-700">{h.uploader}</td>
                      <td className="px-4 py-3 font-bold text-slate-800">{h.totalRows}</td>
                      <td className="px-4 py-3 font-bold text-emerald-700">{h.acceptedRows}</td>
                      <td className="px-4 py-3 text-rose-600 font-bold">{h.rejectedRows}</td>
                      <td className="px-4 py-3">
                        <Badge variant="success">{h.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
