'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DEMO_COMPANY_PROFILE } from '@/lib/demo-data/jobs';
import { Building2, ShieldCheck, Globe, Mail, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CompanyProfilePage() {
  const profile = DEMO_COMPANY_PROFILE;

  return (
    <DashboardShell>
      <div className="space-y-6 max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Company Profile &amp; Recruiter Info</h1>
            <p className="text-xs text-slate-500 mt-1">
              Organization details, industry sector, and authorized talent acquisition contacts
            </p>
          </div>

          <Link href="/company/verification">
            <Badge variant="success" className="gap-1.5 py-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>KYC Verified Partner</span>
            </Badge>
          </Link>
        </div>

        <Card>
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 border-b border-slate-100 pb-6">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-md">
                {profile.name.charAt(0)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900">{profile.name}</h2>
                  <Badge variant="success">Verified Employer</Badge>
                </div>
                <p className="text-xs text-slate-600">{profile.industry}</p>
                <p className="text-[11px] text-slate-400 font-mono">
                  Website: {profile.website}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-slate-800">About the Organization</h4>
              <p className="text-slate-600 leading-relaxed">{profile.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-slate-100">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Recruiter Lead:</span>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{profile.recruiterName}</p>
                <p className="text-slate-500 font-mono text-[11px]">{profile.recruiterEmail}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Verification Date:</span>
                <p className="font-bold text-emerald-700 text-sm mt-0.5">{profile.verifiedDate}</p>
                <p className="text-slate-400 text-[11px]">Authorized by Platform Admin</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
