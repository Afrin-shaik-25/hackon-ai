'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable, Column } from '@/components/shared/data-table';
import { DEMO_USERS_ADMIN } from '@/lib/demo-data/admin';
import { ShieldCheck, UserPlus, Filter } from 'lucide-react';

export default function AdminUsersPage() {
  const [roleFilter, setRoleFilter] = useState('All');

  const filtered = DEMO_USERS_ADMIN.filter((u) => {
    return roleFilter === 'All' || u.role === roleFilter;
  });

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

          <Button variant="primary" size="sm" onClick={() => alert("User provisioning dialog: Add faculty or admin account.")}>
            <UserPlus className="w-4 h-4 mr-1" />
            Provision User
          </Button>
        </div>

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
      </div>
    </DashboardShell>
  );
}
