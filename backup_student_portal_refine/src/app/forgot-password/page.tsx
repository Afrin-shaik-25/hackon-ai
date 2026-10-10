'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, ArrowLeft, MailCheck } from 'lucide-react';
import { DemoBanner } from '@/components/shared/demo-banner';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 400);
  };

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
            <h1 className="text-xl font-bold text-slate-900">Reset your Password</h1>
            <p className="text-xs text-slate-500">
              Enter your verified email to receive a secure recovery link.
            </p>
          </div>

          <Card>
            <CardContent className="p-6 sm:p-8">
              {sent ? (
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <MailCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">Recovery Link Sent (Demo Mode)</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A password reset link was dispatched to <strong>{email}</strong>. For demonstration purposes, you can jump directly to the reset screen.
                  </p>
                  <Link href="/reset-password">
                    <Button variant="primary" className="w-full mt-2">
                      Proceed to Reset Password
                    </Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Registered Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. k.raman@apex.edu"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50"
                    />
                  </div>

                  <Button type="submit" loading={loading} variant="primary" className="w-full">
                    Send Password Reset Link
                  </Button>

                  <div className="text-center pt-2">
                    <Link href="/login" className="text-xs text-indigo-600 hover:underline inline-flex items-center gap-1 font-semibold">
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Back to Sign In
                    </Link>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
