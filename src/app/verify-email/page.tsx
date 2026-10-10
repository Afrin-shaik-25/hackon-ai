'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, MailCheck } from 'lucide-react';
import { DemoBanner } from '@/components/shared/demo-banner';

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <DemoBanner />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-2xl text-slate-900 tracking-tight">StudyLens AI</span>
            </Link>
            <h1 className="text-xl font-bold text-slate-900">Email Verification</h1>
          </div>

          <Card>
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                <MailCheck className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Institutional Email Verified</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                In this HacXLerate 2026 evaluation sandbox, institutional accounts are automatically marked verified for immediate portal exploration.
              </p>
              <Link href="/login">
                <Button variant="primary" className="w-full mt-2">
                  Proceed to Login
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
