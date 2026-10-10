'use client';

import React from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { UserRole } from '@/types';
import { Sparkles, Users, Database } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function DemoBanner() {
  const { role, setRole, isDemoMode } = useAuth();
  const router = useRouter();

  const roleRoutes: Record<UserRole, string> = {
    student: '/student/dashboard',
    faculty: '/faculty/dashboard',
    graduate: '/graduate/dashboard',
    company: '/company/dashboard',
    admin: '/admin/dashboard',
  };

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    router.push(roleRoutes[newRole]);
  };

  if (!isDemoMode) return null;

  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs px-4 py-2 flex flex-wrap items-center justify-between gap-3 shadow-sm z-40">
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-semibold text-[11px] border border-amber-400/30">
          <Sparkles className="w-3 h-3 text-amber-300" />
          HacXLerate 2026 Evaluation Sandbox
        </span>
        <span className="hidden sm:inline text-slate-400">
          Deterministic synthetic dataset active. No live ERP connected.
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-slate-400 font-medium flex items-center gap-1 text-[11px]">
          <Users className="w-3 h-3 text-indigo-400" /> Role Switcher:
        </span>
        <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
          {(['student', 'faculty', 'graduate', 'company', 'admin'] as UserRole[]).map((r) => (
            <button
              key={r}
              onClick={() => handleRoleChange(r)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium capitalize transition-all cursor-pointer ${
                role === r
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              {r === 'admin' ? 'Platform Admin' : r}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
