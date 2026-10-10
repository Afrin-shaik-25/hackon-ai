'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DEMO_PENDING_VERIFICATIONS } from '@/lib/demo-data/admin';
import { ShieldCheck, CheckCircle2, XCircle, FileText, Globe } from 'lucide-react';

export default function AdminCompanyVerificationPage() {
  const [list, setList] = useState(
    DEMO_PENDING_VERIFICATIONS.filter((v) => v.type === 'company')
  );

  const handleAction = (id: string, action: 'Approved' | 'Rejected') => {
    setList(list.map((item) => (item.id === id ? { ...item, status: action } : item)));
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Corporate Recruiter KYC Verification</h1>
          <p className="text-xs text-slate-500 mt-1">
            Review business registration certificates and corporate domains before permitting job postings and candidate discovery
          </p>
        </div>

        <div className="space-y-4">
          {list.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{item.name}</span>
                    <Badge variant={item.status === 'Approved' ? 'success' : item.status === 'Rejected' ? 'danger' : 'warning'}>
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-slate-600">
                    {item.industry} &bull; <span className="font-mono">{item.email}</span>
                  </p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
                    <Globe className="w-3.5 h-3.5 text-indigo-600" />
                    Website: <a href={item.website} target="_blank" rel="noreferrer" className="text-indigo-600 underline font-mono">{item.website}</a>
                  </p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-indigo-600" />
                    Incorporation Certificate: <strong className="font-mono text-slate-700">{item.document}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {item.status === 'Pending' ? (
                    <>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleAction(item.id, 'Rejected')}
                        className="gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleAction(item.id, 'Approved')}
                        className="bg-emerald-600 hover:bg-emerald-700 gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verify Employer</span>
                      </Button>
                    </>
                  ) : (
                    <span className="text-xs text-slate-400 italic">Action confirmed</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
