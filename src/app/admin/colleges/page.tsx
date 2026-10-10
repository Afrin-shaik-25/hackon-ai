'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DEMO_COLLEGES } from '@/lib/demo-data/admin';
import { Building, Plus, Users, GraduationCap, MapPin } from 'lucide-react';
import { Modal } from '@/components/ui/modal';

export default function AdminCollegesPage() {
  const [colleges, setColleges] = useState(DEMO_COLLEGES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [location, setLocation] = useState('');

  const [configCollege, setConfigCollege] = useState<any | null>(null);
  const [configSuccess, setConfigSuccess] = useState<string | null>(null);

  const handleSaveDepartments = (e: React.FormEvent) => {
    e.preventDefault();
    setConfigSuccess(`Departments updated for ${configCollege?.name}.`);
    setConfigCollege(null);
    setTimeout(() => setConfigSuccess(null), 4000);
  };

  const handleAddCollege = (e: React.FormEvent) => {
    const newCol = {
      id: `col-${Date.now().toString().slice(-4)}`,
      name,
      code,
      location,
      studentsCount: 0,
      facultyCount: 0,
      status: 'Onboarding' as const,
    };
    setColleges([...colleges, newCol]);
    setIsModalOpen(false);
    setName('');
    setCode('');
    setLocation('');
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Colleges &amp; Campuses</h1>
            <p className="text-xs text-slate-500 mt-1">
              Multi-tenant institutional campus onboarding and academic configuration
            </p>
          </div>

          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)} className="gap-1.5">
            <Plus className="w-4 h-4" />
            <span>Onboard New College</span>
          </Button>
        </div>

        {configSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
            <span>{configSuccess}</span>
            <button onClick={() => setConfigSuccess(null)} className="text-emerald-600 hover:text-emerald-900 font-bold">✕</button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {colleges.map((col) => (
            <Card key={col.id} className="hover:shadow-xs transition-shadow">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{col.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{col.location}</span>
                    </div>
                  </div>
                  <Badge variant={col.status === 'Active' ? 'success' : 'warning'}>
                    {col.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-indigo-600" /> Students:
                    </span>
                    <strong className="text-slate-900 text-sm mt-0.5 block">{col.studentsCount}</strong>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-emerald-600" /> Faculty:
                    </span>
                    <strong className="text-slate-900 text-sm mt-0.5 block">{col.facultyCount}</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span className="font-mono">Code: {col.code}</span>
                  <span className="text-indigo-600 hover:underline cursor-pointer" onClick={() => setConfigCollege(col)}>
                    Configure Departments &rarr;
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Onboard Institutional Campus"
          description="Provision a new tenant space for a college or university"
        >
          <form onSubmit={handleAddCollege} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Institution Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. SRM Institute of Science & Technology"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Campus Code *</label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. SRM-KTR"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Campus City / State *</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Chennai, Tamil Nadu"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Provision Campus Tenant
              </Button>
            </div>
          </form>
        </Modal>

        {/* Configure Departments Modal */}
        <Modal
          isOpen={!!configCollege}
          onClose={() => setConfigCollege(null)}
          title={`Configure Departments - ${configCollege?.name || ''}`}
          description="Manage academic department allocations and faculty quotas for this institution."
        >
          <form onSubmit={handleSaveDepartments} className="space-y-4 text-xs pt-2">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
              <p className="font-semibold text-slate-800">Current Assigned Departments:</p>
              <ul className="list-disc pl-4 text-slate-600 space-y-0.5">
                <li>Computer Science &amp; Engineering (CS)</li>
                <li>Information Technology &amp; Data Systems (IT)</li>
                <li>Electronics &amp; Communication (EC)</li>
              </ul>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Add / Update Department Allocations</label>
              <input
                type="text"
                defaultValue="Computer Science, Information Technology, Electronics & Communication"
                className="w-full px-3 py-2 rounded-lg border border-slate-200"
              />
              <p className="text-[11px] text-slate-400 mt-1">Comma-separated list of active institutional departments</p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button type="button" variant="ghost" size="sm" onClick={() => setConfigCollege(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" className="bg-indigo-600 text-white">
                Save Departments
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardShell>
  );
}
