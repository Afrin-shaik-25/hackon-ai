'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GraduationCap, ArrowLeft, MailCheck, Loader2 } from 'lucide-react';

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
              Reset Password
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
              Enter your verified email to receive a secure recovery link.
            </p>
          </div>

          {sent ? (
            <div className="text-center space-y-4 py-2">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <MailCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Recovery Link Dispatched</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A password reset instruction was sent to <strong>{email}</strong>. For demonstration purposes, you can jump directly to the password reset form.
              </p>
              <Link
                href="/reset-password"
                className="inline-flex items-center justify-center w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm text-sm transition-colors mt-2"
              >
                Proceed to Reset Password
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Registered Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. user@institution.edu"
                  className="w-full h-11 px-3.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Link...</span>
                  </>
                ) : (
                  <span>Send Password Reset Link</span>
                )}
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
          &copy; 2026 StudyLens AI &bull; Account Recovery
        </p>
      </div>
    </div>
  );
}
