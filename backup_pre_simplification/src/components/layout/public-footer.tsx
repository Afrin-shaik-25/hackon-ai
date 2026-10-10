import React from 'react';
import Link from 'next/link';
import { GraduationCap, ShieldCheck, HeartHandshake } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-base tracking-tight">StudyLens AI</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              AI-driven student analytics & success platform built for HacXLerate 2026. Empowering higher-ed institutions, educators, and career-ready graduates.
            </p>
            <div className="pt-2 text-[11px] text-slate-500">
              Deterministic evaluation sandbox active.
            </div>
          </div>

          {/* Portals */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Role Portals</h4>
            <ul className="space-y-2">
              <li><Link href="/student/dashboard" className="hover:text-white transition-colors">Student Portal</Link></li>
              <li><Link href="/faculty/dashboard" className="hover:text-white transition-colors">Faculty Analytics Portal</Link></li>
              <li><Link href="/graduate/dashboard" className="hover:text-white transition-colors">Graduate & Career Portal</Link></li>
              <li><Link href="/company/dashboard" className="hover:text-white transition-colors">Company & Recruiter Portal</Link></li>
              <li><Link href="/admin/dashboard" className="hover:text-white transition-colors">Platform Admin Portal</Link></li>
            </ul>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Core Capabilities</h4>
            <ul className="space-y-2">
              <li><Link href="/faculty/imports" className="hover:text-white transition-colors">Multi-Source CSV Pipeline (30%)</Link></li>
              <li><Link href="/student/success-score" className="hover:text-white transition-colors">30/20/20/15/15 Success Score (25%)</Link></li>
              <li><Link href="/faculty/risks" className="hover:text-white transition-colors">Early Risk & Review Queue</Link></li>
              <li><Link href="/faculty/interventions" className="hover:text-white transition-colors">Intervention Workflows</Link></li>
              <li><Link href="/student/focus" className="hover:text-white transition-colors">Regain Focus Timer</Link></li>
            </ul>
          </div>

          {/* Institutional / Legal */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Governance & Trust</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-white transition-colors">About the Project</Link></li>
              <li><Link href="/help" className="hover:text-white transition-colors">Help & FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Responsible AI & Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-3">
          <p>© 2026 StudyLens AI — Developed for HacXLerate 2026. Built with Next.js & TypeScript.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Role-Governed Access
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
