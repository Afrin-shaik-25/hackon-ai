'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { ROLE_NAVIGATION } from '@/lib/navigation';
import {
  Menu,
  X,
  Bell,
  LogOut,
  ChevronDown,
  Shield,
  GraduationCap,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { DemoBanner } from '@/components/shared/demo-banner';
import { cn } from '@/lib/utils';

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { user, role, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navItems = ROLE_NAVIGATION[role] || [];

  const roleLabels: Record<string, string> = {
    student: 'Student Portal',
    faculty: 'Faculty Portal',
    graduate: 'Graduate & Career Portal',
    company: 'Verified Recruiter Portal',
    admin: 'Platform Admin',
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      {/* Top Demo Banner & Role Switcher */}
      <DemoBanner />

      {/* Main App Container */}
      <div className="flex flex-1 relative overflow-hidden">
        {/* Mobile Navigation Drawer Overlay */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0',
            isMobileOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          {/* Logo Header */}
          <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-base tracking-tight leading-tight">StudyLens AI</span>
                <span className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider">
                  {roleLabels[role] || 'Portal'}
                </span>
              </div>
            </Link>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
              aria-label="Close mobile navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Navigation
            </div>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group',
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400')} />
                    <span className="truncate">{item.title}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={cn(
                        'text-[10px] font-semibold px-1.5 py-0.5 rounded',
                        isActive ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-indigo-300'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Profile Mini Block */}
          <div className="p-3 border-t border-slate-800 bg-slate-900/80">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/60">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center text-xs border border-indigo-400/30">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-[calc(100vh-41px)]">
          {/* Top Bar */}
          <header className="h-14 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
                aria-label="Open mobile navigation"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-800 capitalize">{role}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-600 font-medium">StudyLens Portal</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Public Site Link */}
              <Link
                href="/"
                className="hidden md:flex items-center gap-1 text-xs text-slate-500 hover:text-indigo-600 transition-colors px-2 py-1 rounded-md hover:bg-slate-50"
              >
                <span>Landing Page</span>
                <ExternalLink className="w-3 h-3" />
              </Link>

              {/* Notifications */}
              <button
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 relative transition-colors cursor-pointer"
                aria-label="Notifications"
                onClick={() => alert("Notification Center: 3 system updates regarding mid-term CSV ingestion and attendance logs.")}
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600" />
              </button>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs">
                    <div className="px-3.5 py-2 border-b border-slate-100">
                      <p className="font-semibold text-slate-900 truncate">{user?.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                      <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 capitalize">
                        {role}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        router.push('/login');
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5 text-slate-500" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Page Body */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
