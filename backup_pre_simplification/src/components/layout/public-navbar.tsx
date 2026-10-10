'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GraduationCap, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DemoBanner } from '@/components/shared/demo-banner';

export function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <DemoBanner />
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 text-lg tracking-tight leading-tight">StudyLens AI</span>
              <span className="text-[10px] text-indigo-600 font-semibold uppercase tracking-wider">
                Student Analytics & Success
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Platform</Link>
            <Link href="/about" className="hover:text-indigo-600 transition-colors">About Us</Link>
            <Link href="/help" className="hover:text-indigo-600 transition-colors">Help & FAQ</Link>
            <Link href="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-indigo-600 transition-colors">Ethics & Privacy</Link>
          </nav>

          {/* CTA Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/student/dashboard">
              <Button variant="primary" size="sm" className="gap-1.5 shadow-sm">
                <span>Explore Portals</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
            <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 rounded-md hover:bg-slate-50">Platform</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 rounded-md hover:bg-slate-50">About Us</Link>
              <Link href="/help" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 rounded-md hover:bg-slate-50">Help & FAQ</Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 rounded-md hover:bg-slate-50">Contact</Link>
              <Link href="/privacy" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 rounded-md hover:bg-slate-50">Ethics & Privacy</Link>
              <Link href="/terms" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 rounded-md hover:bg-slate-50">Terms of Service</Link>
            </nav>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">Sign In</Button>
              </Link>
              <Link href="/student/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full">Launch Portal</Button>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
