'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DEMO_COMPANY_PROFILE } from '@/lib/demo-data/jobs';
import { ShieldCheck, CheckCircle2, FileText, Building2, AlertCircle } from 'lucide-react';

export default function CompanyVerificationPage() {
  const profile = DEMO_COMPANY_PROFILE;

  return (
    <DashboardShell>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Corporate Verification &amp; Trust</h1>
          <p className="text-xs text-slate-500 mt-1">
            Status of corporate business registration and compliance review
          </p>
        </div>

        <Card className="border-emerald-200 bg-emerald-50/20">
          <CardContent className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Your Company is Fully Verified</h3>
                <p className="text-xs text-emerald-800">
                  Verification Status: <strong>{profile.verificationStatus}</strong> &bull; Authenticated on {profile.verifiedDate}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-emerald-100">
              Verified corporate recruiters are authorized to publish live job and internship vacancies, search consented candidate portfolios, and manage candidate pipelines.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Submitted Verification Documents</CardTitle>
            <CardDescription>Records reviewed by consortium administration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="p-3.5 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                <div>
                  <span className="font-bold text-slate-800">Certificate of Incorporation (CIN)</span>
                  <p className="text-[11px] text-slate-400">PDF Document &bull; Verified</p>
                </div>
              </div>
              <Badge variant="success">Approved</Badge>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <div>
                  <span className="font-bold text-slate-800">Official Work Domain Email (@nexatech.example.com)</span>
                  <p className="text-[11px] text-slate-400">Domain Auth &bull; Verified</p>
                </div>
              </div>
              <Badge variant="success">Approved</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
