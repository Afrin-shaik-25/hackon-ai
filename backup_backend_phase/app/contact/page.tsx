'use client';

import React, { useState } from 'react';
import { PublicNavbar } from '@/components/layout/public-navbar';
import { PublicFooter } from '@/components/layout/public-footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('institutional');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PublicNavbar />

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <Badge variant="info">Get in Touch</Badge>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Contact StudyLens AI
            </h1>
            <p className="text-slate-600 text-sm">
              Reach out for institutional partnerships, consortium integration requests, or HacXLerate 2026 inquiry.
            </p>
          </div>

          <Card>
            <CardContent className="p-8">
              {submitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Message Received (Demo Mode)</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Your inquiry has been simulated and recorded in the demo sandbox. For immediate evaluation questions, please refer to the documentation or repository notes.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setSubmitted(false)} className="mt-4">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dr. Ramesh Gupta"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Institutional Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. ramesh.gupta@college.edu"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Topic</label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50 cursor-pointer"
                    >
                      <option value="institutional">Institutional ERP / CSV Integration</option>
                      <option value="evaluation">HacXLerate 2026 Evaluation Inquiries</option>
                      <option value="recruiting">Corporate Recruiter Consortium</option>
                      <option value="general">General Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your inquiry or integration requirements..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50"
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" loading={loading} variant="primary" className="w-full">
                      Submit Message
                    </Button>
                  </div>

                  <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Demo mode active: form submissions are logged locally in state.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
