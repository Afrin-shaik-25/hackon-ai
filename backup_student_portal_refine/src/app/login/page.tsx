'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { UserRole } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Eye, EyeOff, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { DemoBanner } from '@/components/shared/demo-banner';

export default function LoginPage() {
  const router = useRouter();
  const { login, setRole } = useAuth();

  const [role, setLocalRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('aarav.sharma@apex.edu');
  const [password, setPassword] = useState('********');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const roleRedirects: Record<UserRole, string> = {
    student: '/student/dashboard',
    faculty: '/faculty/dashboard',
    graduate: '/graduate/dashboard',
    company: '/company/dashboard',
    admin: '/admin/dashboard',
  };

  const handleRolePreset = (selectedRole: UserRole) => {
    setLocalRole(selectedRole);
    switch (selectedRole) {
      case 'student':
        setEmail('aarav.sharma@apex.edu');
        break;
      case 'faculty':
        setEmail('k.raman@apex.edu');
        break;
      case 'graduate':
        setEmail('sneha.m@graduate.example.com');
        break;
      case 'company':
        setEmail('recruitment@nexatech.example.com');
        break;
      case 'admin':
        setEmail('admin@studylens.ai');
        break;
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please provide both institutional email and password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login(email, role);
      setRole(role);
      router.push(roleRedirects[role]);
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <DemoBanner />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-2xl text-slate-900 tracking-tight">StudyLens AI</span>
            </Link>
            <h1 className="text-xl font-bold text-slate-900">Sign in to your Portal</h1>
            <p className="text-xs text-slate-500">
              Select your role preset below for instant evaluation access.
            </p>
          </div>

          <Card className="shadow-lg border-slate-200">
            <CardContent className="p-6 sm:p-8 space-y-5">
              {/* Quick Preset Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Select Role Preset (Demo Mode)
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {(['student', 'faculty', 'graduate', 'company', 'admin'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => handleRolePreset(r)}
                      className={`p-2 rounded-lg font-semibold text-center border capitalize transition-all cursor-pointer ${
                        role === r
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {r === 'admin' ? 'Platform Admin' : r}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Institutional Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-slate-700">Password *</label>
                    <Link href="/forgot-password" className="text-indigo-600 hover:underline text-[11px]">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" loading={loading} variant="primary" className="w-full py-2.5 mt-2">
                  <span>Sign In as {role === 'admin' ? 'Admin' : role.charAt(0).toUpperCase() + role.slice(1)}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </form>

              <div className="pt-2 text-center text-xs text-slate-500">
                Don&apos;t have an institutional account?{' '}
                <Link href="/signup" className="text-indigo-600 font-semibold hover:underline">
                  Create Account
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
