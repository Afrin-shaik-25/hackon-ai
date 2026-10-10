import React from 'react';
import { PublicNavbar } from '@/components/layout/public-navbar';
import { PublicFooter } from '@/components/layout/public-footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PublicNavbar />

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <Badge variant="info">Ethics & Governance</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Responsible AI & Privacy Policy
            </h1>
            <p className="text-slate-600 text-sm max-w-2xl mx-auto">
              Our principles on educational data integrity, student dignity, and algorithmic transparency.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">Institutional Review Disclaimer</p>
              <p className="mt-0.5 leading-relaxed">
                This document describes the intended architectural data controls of StudyLens AI. It does not constitute formal legal certification under FERPA, GDPR, or DPDP Act until audited with an adopting university partner.
              </p>
            </div>
          </div>

          <Card>
            <CardContent className="p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
              <h2 className="text-base font-bold text-slate-900">1. Student Dignity & Non-Fatalistic Scoring</h2>
              <p>
                StudyLens AI rejects fatalistic predictive scoring models. Educational algorithms must never brand a student as &ldquo;doomed to drop out.&rdquo; All risk signals are categorized as &ldquo;Needs Review&rdquo; and paired with supporting empirical evidence (e.g., &ldquo;Missed 3 laboratory sessions in Operating Systems&rdquo;) and concrete corrective actions.
              </p>

              <h2 className="text-base font-bold text-slate-900 pt-3">2. Strict Role-Governed Access Boundary</h2>
              <p>
                We enforce four strict privacy firewalls:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
                <li><strong>Students</strong>: Can view their own comprehensive score breakdown, marks, attendance, and tasks. Cannot view peer academic records.</li>
                <li><strong>Faculty & Mentors</strong>: Can view assigned cohort records, enter intervention notes, and upload CSV spreadsheets.</li>
                <li><strong>Corporate Recruiters</strong>: Have zero access to internal attendance logs, medical notes, or confidential faculty comments. They can only view verified skill passports and projects shared with explicit candidate consent.</li>
                <li><strong>Platform Admins</strong>: Manage consortium tenants, verification queues, and system audit logs without altering graded coursework.</li>
              </ul>

              <h2 className="text-base font-bold text-slate-900 pt-3">3. Data Retention & Erasure</h2>
              <p>
                Colleges retain complete ownership over their student records. Demo environments use synthetic, deterministic personas that can be regenerated or purged at any time from the Platform Admin sandbox.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
