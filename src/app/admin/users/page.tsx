'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { DataTable, Column } from '@/components/shared/data-table';
import { DEMO_USERS_ADMIN } from '@/lib/demo-data/admin';
import api from '@/lib/api-client';
import { ShieldCheck, UserPlus, Filter, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminUsersPage() {
  const [roleFilter, setRoleFilter] = useState('All');
  const [usersList, setUsersList] = useState(DEMO_USERS_ADMIN);
  const [isProvisionOpen, setIsProvisionOpen] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'student' | 'faculty' | 'graduate' | 'company' | 'admin'>('faculty');
  const [college, setCollege] = useState('Apex Institute of Technology');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const filtered = usersList.filter((u) => {
    return roleFilter === 'All' || u.role === roleFilter;
  });

  const handleProvisionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim() || !email.trim()) {
      setErrorMsg('Full name and email address are required.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Please enter a valid email format.');
      return;
    }

    setSubmitting(true);

    const payload = {
      name: name.trim(),
      email: email.trim(),
      password: 'TemporaryPassword123!',
      role,
      college: college.trim(),
      department: department.trim(),
    };

    const res = await api.auth.register(payload);
    setSubmitting(false);

    if (res.error) {
      setErrorMsg(res.error);
    } else {
      const newUser = {
        id: `usr-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        role,
        college: college.trim(),
        status: 'Active',
        joined: 'Just Now',
      };
      setUsersList([newUser, ...usersList]);
      setSuccessMsg(`Successfully provisioned account for ${name} (${role}).`);
      setIsProvisionOpen(false);
      setName('');
      setEmail('');
      setTimeout(() => setSuccessMsg(null), 5000);
    }
  };

  const columns: Column<typeof DEMO_USERS_ADMIN[0]>[] = [
    { key: 'name', header: 'User', sortable: true, render: (u) => (
      <div>
        <p className="font-semibold text-slate-900">{u.name}</p>
        <p className="text-[11px] text-slate-500 font-mono">{u.email}</p>
      </div>
    )},
    { key: 'role', header: 'Role', sortable: true, render: (u) => (
      <Badge variant={u.role === 'admin' ? 'danger' : u.role === 'faculty' ? 'info' : 'default'} className="capitalize">
        {u.role}
      </Badge>
    )},
    { key: 'college', header: 'Institution / Company', render: (u) => (
      <span className="text-slate-600">{u.college || (u as unknown as { company?: string }).company || 'Platform Root'}</span>
    )},
    { key: 'status', header: 'Account Status', render: (u) => (
      <Badge variant="success">{u.status}</Badge>
    )},
    { key: 'joined', header: 'Joined Date', sortable: true, render: (u) => (
      <span className="text-slate-500">{u.joined}</span>
    )},
  ];

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">User &amp; Role Management</h1>
            <p className="text-xs text-slate-500 mt-1">
              Active directory of registered student, faculty, graduate, and corporate recruiter accounts
            </p>
          </div>

          <Button variant="primary" size="sm" onClick={() => { setErrorMsg(null); setIsProvisionOpen(true); }}>
            <UserPlus className="w-4 h-4 mr-1" />
            Provision User
          </Button>
        </div>

        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <DataTable
          data={filtered as unknown as Record<string, unknown>[]}
          columns={columns as unknown as Column<Record<string, unknown>>[]}
          searchKey="name"
          searchPlaceholder="Search users by name or email..."
          filterComponent={
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-700 cursor-pointer"
            >
              <option value="All">All Roles</option>
              <option value="student">Students</option>
              <option value="faculty">Faculty</option>
              <option value="graduate">Graduates</option>
              <option value="company">Company Recruiters</option>
              <option value="admin">Administrators</option>
            </select>
          }
        />

        {/* User Provisioning Modal */}
        <Modal
          isOpen={isProvisionOpen}
          onClose={() => setIsProvisionOpen(false)}
          title="Provision Institutional Account"
          description="Create and register a verified account in the directory."
        >
          <form onSubmit={handleProvisionSubmit} className="space-y-4 text-xs pt-2">
            {errorMsg && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Full Legal Name *</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dr. Ramesh Kumar"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Institutional Email Address *</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. ramesh.kumar@apex.edu"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">System Role *</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as typeof role)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs"
                >
                  <option value="faculty">Faculty</option>
                  <option value="student">Student</option>
                  <option value="graduate">Graduate / Alumni</option>
                  <option value="company">Company Recruiter</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">College / Organization</label>
                <Input
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="Apex Institute of Technology"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Department / Division</label>
              <Input
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Computer Science & Engineering"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsProvisionOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" disabled={submitting} className="bg-indigo-600 text-white gap-2">
                {submitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Provisioning...</span>
                  </>
                ) : (
                  'Create User'
                )}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardShell>
  );
}
