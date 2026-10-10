'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GraduationCap, ArrowLeft, CheckCircle2, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setDone(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 flex flex-col justify-between p-4 sm:p-6 lg:p-8 antialiased selection:bg-blue-500 selection:text-white">
      {/* Top Header */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between pt-2">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-xs sm:text-sm font-medium bg-white/10 hover:bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </Link>
      </div>

      {/* Main Centered Content */}
      <div className="flex-1 flex flex-col items-center justify-center my-8">
        {/* Brand Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 text-white shadow-lg mx-auto mb-1">
            <GraduationCap className="w-8 h-8 drop-shadow-sm" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-xs">
            StudyLens AI
          </h1>
          <p className="text-xs sm:text-sm text-blue-100/90 font-medium max-w-md mx-auto">
            Smart Academic &amp; Career Analytics Platform
          </p>
        </div>

        {/* White Card */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20">
          <div className="mb-6 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Set New Password
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
              Create a new secure password for your StudyLens account.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {done ? (
            <div className="text-center space-y-4 py-2">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Password Reset Complete</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your credentials have been securely updated. You can now log in with your new password.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center justify-center w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm text-sm transition-colors mt-2"
              >
                Proceed to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  New Password (Min 8 Characters)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full h-11 pl-3.5 pr-10 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full h-11 pl-3.5 pr-10 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                Update Password
              </button>

              <div className="text-center pt-3 border-t border-slate-100">
                <Link
                  href="/login"
                  className="text-xs text-blue-600 hover:text-blue-700 font-semibold hover:underline inline-flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Login</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Footer Branding */}
      <div className="w-full max-w-5xl mx-auto text-center pb-2">
        <p className="text-xs text-blue-100/70">
          &copy; {new Date().getFullYear()} StudyLens AI &bull; Security
        </p>
      </div>
    </div>
  );
}
