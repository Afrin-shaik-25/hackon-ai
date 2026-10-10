'use client';

import React, { useState } from 'react';
import { PublicNavbar } from '@/components/layout/public-navbar';
import { PublicFooter } from '@/components/layout/public-footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  category: 'Accounts' | 'Performance Analytics' | 'Data Imports' | 'Recruiters' | 'Focus Timer';
}

const FAQS: FaqItem[] = [
  {
    q: "How does Student Performance Analytics work?",
    a: "StudyLens AI tracks five distinct educational pillars independently: Academic Marks, Attendance Records, Assessment Performance, Learning Progress, and Verified Skills/Projects. Rather than blending them into one arbitrary formula score, each dimension provides direct, actionable feedback so students and faculty can target specific areas for improvement.",
    category: "Performance Analytics"
  },
  {
    q: "How does the student data import process handle invalid or corrupted rows?",
    a: "During import, our validation engine checks each student ID against the enrolled cohort and verifies that scores fall within 0-100. Erroneous rows are separated into a 'Rejected Rows' report with explicit reasons, allowing faculty to proceed with accepted rows without data corruption.",
    category: "Data Imports"
  },
  {
    q: "Does the Regain Focus Timer actually block mobile apps?",
    a: "No ordinary browser webpage can directly block third-party mobile applications on iOS or Android. True mobile app blocking requires a native companion application with accessibility/device permissions. On this web interface, the timer operates with full session timing, but displays an honest disclaimer that system-level app blocking requires our native integration.",
    category: "Focus Timer"
  },
  {
    q: "Can recruiters view private faculty notes or academic details?",
    a: "Never. StudyLens AI enforces strict role-based data boundaries. Recruiters can only access candidate-consented profiles, verified skill passports, and public project evidence. Internal faculty notes, medical justifications, and remedial logs are strictly confidential.",
    category: "Recruiters"
  },
  {
    q: "How do I switch between different roles during testing?",
    a: "Use the persistent top demo banner available on any page. You can click 'Student', 'Faculty', 'Graduate', 'Company', or 'Admin' to test each portal's dedicated workflows immediately.",
    category: "Accounts"
  }
];

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const categories = ['All', 'Performance Analytics', 'Data Imports', 'Recruiters', 'Focus Timer', 'Accounts'];

  const filteredFaqs = FAQS.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = faq.q.toLowerCase().includes(searchTerm.toLowerCase()) || faq.a.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PublicNavbar />

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <Badge variant="info">Support & Documentation</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              Find answers regarding our explainable metrics, data pipeline, recruiter permissions, and evaluation sandbox.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search questions or keywords..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-xs"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isExpanded = expandedIndex === idx;
              return (
                <Card key={idx} className="overflow-hidden">
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {faq.category}
                      </span>
                      <h3 className="text-sm font-semibold text-slate-900">{faq.q}</h3>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-600 border-t border-slate-100 leading-relaxed bg-slate-50/40">
                      {faq.a}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
