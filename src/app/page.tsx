'use client';

import React from 'react';
import Link from 'next/link';
import { PublicNavbar } from '@/components/layout/public-navbar';
import { PublicFooter } from '@/components/layout/public-footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  GraduationCap,
  Users,
  Briefcase,
  Building2,
  ArrowRight,
  Sparkles,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  Terminal,
  ShieldCheck,
  Award,
  Layers,
  HeartHandshake
} from 'lucide-react';

export default function LandingPage() {
  const portalCards = [
    {
      id: 'student',
      title: 'Student Portal',
      subtitle: 'Academic & Learning Hub',
      description:
        'Track your academic marks, personalized semester syllabus, FocusNest study timer, multi-language coding playground, and upcoming examination reminders.',
      features: [
        'Personalized Semester Subjects & Syllabi',
        'Coding Playground (C, Java, Python)',
        'FocusNest Timer & 5-Day Exam Alerts'
      ],
      href: '/portal/student',
      color: 'indigo',
      badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      borderHover: 'hover:border-indigo-400',
      buttonClass: 'bg-indigo-600 hover:bg-indigo-700 text-white',
      accentBg: 'bg-indigo-50/70',
      iconBg: 'bg-indigo-600 text-white',
      icon: GraduationCap,
      illustration: (
        <svg className="w-16 h-16 text-indigo-500/20" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 15 L90 35 L50 55 L10 35 Z" />
          <path d="M25 45 L25 70 C25 85 75 85 75 70 L75 45" stroke="currentColor" strokeWidth="6" fill="none" />
          <path d="M90 35 L90 75" stroke="currentColor" strokeWidth="4" />
        </svg>
      )
    },
    {
      id: 'faculty',
      title: 'Faculty Portal',
      subtitle: 'Cohort Mentorship & Advising',
      description:
        'Monitor assigned student classes, review academic performance, identify students who may need academic support, and log remedial mentoring notes.',
      features: [
        'Assigned Student Cohort Rosters',
        'Students Needing Academic Support',
        'Attendance & Subject Performance Insights'
      ],
      href: '/portal/faculty',
      color: 'emerald',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      borderHover: 'hover:border-emerald-400',
      buttonClass: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      accentBg: 'bg-emerald-50/70',
      iconBg: 'bg-emerald-600 text-white',
      icon: Users,
      illustration: (
        <svg className="w-16 h-16 text-emerald-500/20" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="35" r="18" />
          <path d="M20 80 C20 62 35 58 50 58 C65 58 80 62 80 80 Z" />
          <circle cx="80" cy="40" r="12" />
          <path d="M70 75 C72 65 80 62 90 62" stroke="currentColor" strokeWidth="4" fill="none" />
        </svg>
      )
    },
    {
      id: 'graduate',
      title: 'Graduate / Job Seeker Portal',
      subtitle: 'Career & Placement Readiness',
      description:
        'Build ATS-optimized resumes, practice quantitative and logical aptitude tests, simulate technical interviews, and apply for verified corporate job openings.',
      features: [
        'Step-by-Step Resume Builder',
        'Timed Aptitude & Mock Interview Simulators',
        'Verified Project Evidence & Job Pipeline'
      ],
      href: '/portal/graduate',
      color: 'teal',
      badgeClass: 'bg-teal-50 text-teal-700 border-teal-200',
      borderHover: 'hover:border-teal-400',
      buttonClass: 'bg-teal-600 hover:bg-teal-700 text-white',
      accentBg: 'bg-teal-50/70',
      iconBg: 'bg-teal-600 text-white',
      icon: Briefcase,
      illustration: (
        <svg className="w-16 h-16 text-teal-500/20" viewBox="0 0 100 100" fill="currentColor">
          <rect x="20" y="30" width="60" height="48" rx="6" />
          <path d="M38 30 V20 C38 16 62 16 62 20 V30" stroke="currentColor" strokeWidth="6" fill="none" />
          <line x1="20" y1="52" x2="80" y2="52" stroke="white" strokeWidth="3" />
        </svg>
      )
    },
    {
      id: 'graduated-person',
      title: 'Graduated Person Portal',
      subtitle: 'Alumni Network & Career Mentorship',
      description:
        'Connect with fellow university alumni, mentor active students, access verified graduation credentials, and share industry referrals.',
      features: [
        'Alumni Directory & Mentorship Network',
        'Verified Degree & Capstone Credentials',
        'Campus Placement & Referral Hub'
      ],
      href: '/portal/graduated-person',
      color: 'blue',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
      borderHover: 'hover:border-blue-400',
      buttonClass: 'bg-blue-600 hover:bg-blue-700 text-white',
      accentBg: 'bg-blue-50/70',
      iconBg: 'bg-blue-600 text-white',
      icon: Award,
      illustration: (
        <svg className="w-16 h-16 text-blue-500/20" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="40" r="22" />
          <path d="M30 65 L20 95 L50 82 L80 95 L70 65 Z" />
        </svg>
      )
    },
    {
      id: 'company',
      title: 'Company / Recruiter Portal',
      subtitle: 'Campus Talent & Recruitment',
      description:
        'Discover high-potential students with faculty-verified skills and code repositories, publish job openings, and manage candidate interview pipelines.',
      features: [
        'Candidate Discovery with Skill Passports',
        'Post Full-Time Openings & Internships',
        'End-to-End Applications Pipeline Review'
      ],
      href: '/portal/company',
      color: 'purple',
      badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
      borderHover: 'hover:border-purple-400',
      buttonClass: 'bg-purple-600 hover:bg-purple-700 text-white',
      accentBg: 'bg-purple-50/70',
      iconBg: 'bg-purple-600 text-white',
      icon: Building2,
      illustration: (
        <svg className="w-16 h-16 text-purple-500/20" viewBox="0 0 100 100" fill="currentColor">
          <rect x="18" y="25" width="34" height="60" rx="3" />
          <rect x="52" y="42" width="30" height="43" rx="3" />
          <rect x="26" y="35" width="6" height="8" rx="1" fill="white" />
          <rect x="38" y="35" width="6" height="8" rx="1" fill="white" />
          <rect x="26" y="50" width="6" height="8" rx="1" fill="white" />
          <rect x="38" y="50" width="6" height="8" rx="1" fill="white" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 antialiased selection:bg-indigo-600 selection:text-white">
      <PublicNavbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/60 pt-14 pb-12 sm:pt-20 sm:pb-16 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/70 text-indigo-700 text-xs sm:text-sm font-semibold shadow-2xs">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>AI-Powered Student Analytics and Success Platform</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Empowering Students, Faculty &amp; Industry{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                  Through One Unified Hub
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto pt-1">
                Select your designated portal below to access personalized dashboards, academic progress tracking, career readiness tools, or verified talent discovery.
              </p>
            </div>
          </div>
        </section>

        {/* PRIMARY FOCUS: THE FOUR PORTAL CARDS (2x2 GRID) */}
        <section id="portals" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Select Your StudyLens Portal
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1">
                Each portal features dedicated Login and Sign Up options for immediate access
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-200/70 text-slate-700 self-start sm:self-auto">
              5 Official Portals
            </span>
          </div>

          {/* EXACTLY 4 PROMINENT PORTAL CARDS IN CLEAN 2x2 GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {portalCards.map((portal) => {
              const Icon = portal.icon;
              return (
                <div
                  key={portal.id}
                  className={`group relative rounded-2xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${portal.borderHover} flex flex-col justify-between`}
                >
                  {/* Background Illustration watermark */}
                  <div className="absolute right-6 top-6 pointer-events-none select-none transition-transform duration-300 group-hover:scale-110">
                    {portal.illustration}
                  </div>

                  <div className="space-y-5 relative z-10">
                    {/* Header: Icon & Badge */}
                    <div className="flex items-center justify-between gap-3">
                      <div className={`w-12 h-12 rounded-xl ${portal.iconBg} flex items-center justify-center shadow-sm`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${portal.badgeClass}`}>
                        {portal.subtitle}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {portal.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                        {portal.description}
                      </p>
                    </div>

                    {/* Key Feature Bullets */}
                    <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs sm:text-sm text-slate-700">
                      {portal.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Area */}
                  <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
                    <span className="text-xs text-slate-500 font-medium">
                      Separate Login &amp; Sign Up entry
                    </span>

                    <Link href={portal.href} className="w-full sm:w-auto">
                      <Button
                        size="md"
                        className={`w-full sm:w-auto px-5 py-2.5 font-semibold text-sm rounded-xl shadow-xs gap-2 group-hover:gap-3 transition-all ${portal.buttonClass}`}
                      >
                        <span>Open {portal.title.split(' ')[0]} Portal</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* COMPACT PLATFORM PILLARS STRIP */}
        <section className="py-12 bg-white border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">Independent Indicators</h4>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Marks, attendance, assessment practice, and study progress are displayed separately without arbitrary weighted score blending.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">Transparent Data Ethics</h4>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Strict role boundaries ensure confidential counseling and medical excuses remain isolated from external recruiter visibility.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">Industry Readiness</h4>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Connecting faculty-verified skill passports with active corporate internship pipelines for seamless graduate placements.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
