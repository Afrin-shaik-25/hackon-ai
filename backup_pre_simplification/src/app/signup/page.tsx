'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { UserRole } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { DemoBanner } from '@/components/shared/demo-banner';

export default function SignupPage() {
  const router = useRouter();
  const { login, setRole } = useAuth();

  const [role, setLocalRole] = useState<'student' | 'faculty' | 'graduate' | 'company'>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!agreeTerms) {
      setError('You must acknowledge the terms and responsible AI guidelines.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login(email, role);
      setRole(role);
      router.push(`/${role}/dashboard`);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <DemoBanner />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-lg space-y-6">
          <div className="text-center space-y-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-2xl text-slate-900 tracking-tight">StudyLens AI</span>
            </Link>
            <h1 className="text-xl font-bold text-slate-900">Create your Account</h1>
            <p className="text-xs text-slate-500">
              Join the institutional analytics and career readiness network.
            </p>
          </div>

          <Card className="shadow-lg border-slate-200">
            <CardContent className="p-6 sm:p-8 space-y-5">
              {/* Role Selection (No Admin here!) */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Select User Role *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'student', label: 'Student' },
                    { id: 'faculty', label: 'Faculty' },
                    { id: 'graduate', label: 'Graduate' },
                    { id: 'company', label: 'Company' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setLocalRole(r.id as 'student' | 'faculty' | 'graduate' | 'company')}
                      className={`p-2.5 rounded-lg font-semibold text-center border transition-all cursor-pointer ${
                        role === r.id
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 mt-1.5 flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3 text-slate-400" />
                  Platform Admin access requires internal enterprise provisioning.
                </p>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSignup} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {role === 'company' ? 'Corporate Work Email *' : 'Institutional Email Address *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={role === 'company' ? 'recruiter@company.com' : 'student@apex.edu'}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {role === 'company' ? 'Company / Organization Name *' : 'College / University Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder={role === 'company' ? 'NexaTech Systems' : 'Apex Institute of Technology'}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Password *</label>
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

                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-[11px] text-slate-600">
                    I agree to the <Link href="/terms" className="text-indigo-600 underline">Terms of Service</Link> and <Link href="/privacy" className="text-indigo-600 underline">Responsible AI Privacy Policy</Link>.
                  </label>
                </div>

                <Button type="submit" loading={loading} variant="primary" className="w-full py-2.5 mt-2">
                  <span>Complete Onboarding & Enter Portal</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </form>

              <div className="pt-2 text-center text-xs text-slate-500">
                Already registered?{' '}
                <Link href="/login" className="text-indigo-600 font-semibold hover:underline">
                  Sign In
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
