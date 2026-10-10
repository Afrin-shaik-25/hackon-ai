'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, CheckCircle2, Lock } from 'lucide-react';
import { DemoBanner } from '@/components/shared/demo-banner';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setDone(true);
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
            <h1 className="text-xl font-bold text-slate-900">Set New Password</h1>
          </div>

          <Card>
            <CardContent className="p-6 sm:p-8">
              {done ? (
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">Password Successfully Reset</h3>
                  <p className="text-xs text-slate-600">
                    Your credentials have been updated in the sandbox. You can now sign in.
                  </p>
                  <Link href="/login">
                    <Button variant="primary" className="w-full mt-2">
                      Proceed to Sign In
                    </Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleReset} className="space-y-4 text-xs">
                  {error && (
                    <div className="p-2.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">New Password *</label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Confirm New Password *</label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50"
                    />
                  </div>

                  <Button type="submit" variant="primary" className="w-full">
                    Update Password
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
