'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { DEMO_INTERVENTIONS } from '@/lib/demo-data/faculty';
import { DEMO_STUDENTS } from '@/lib/demo-data/students';
import { InterventionRecord } from '@/types';
import { HeartHandshake, CheckCircle2, Clock, Calendar, Plus, ShieldCheck } from 'lucide-react';

export default function FacultyInterventionsPage() {
  const [interventions, setInterventions] = useState<InterventionRecord[]>(DEMO_INTERVENTIONS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [studentId, setStudentId] = useState('std-002');
  const [reason, setReason] = useState('Operating Systems midterm score 52%, attendance 62%');
  const [recommendedAction, setRecommendedAction] = useState('Assign peer tutor and schedule weekly review');
  const [followUpDate, setFollowUpDate] = useState('2026-10-24');
  const [notes, setNotes] = useState('');
  const [privateNotes, setPrivateNotes] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const st = DEMO_STUDENTS.find((s) => s.id === studentId) || DEMO_STUDENTS[0];
    const newRecord: InterventionRecord = {
      id: `int-${Date.now().toString().slice(-4)}`,
      studentId: st.id,
      studentName: st.name,
      studentCode: st.studentId,
      facultyId: 'fac-101',
      facultyName: 'Dr. K. Raman',
      reason,
      recommendedAction,
      followUpDate,
      status: 'Scheduled',
      notes,
      privateNotes,
      createdAt: 'Just now',
      updatedAt: 'Just now',
    };
    setInterventions([newRecord, ...interventions]);
    setIsModalOpen(false);
    setNotes('');
    setPrivateNotes('');
  };

  const handleMarkCompleted = (id: string) => {
    setInterventions(
      interventions.map((item) =>
        item.id === id ? { ...item, status: 'Completed', updatedAt: 'Just now' } : item
      )
    );
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Intervention &amp; Advising Management</h1>
            <p className="text-xs text-slate-500 mt-1">
              Coordinate proactive tutoring, mental health check-ins, and remedial tracking with role-governed note privacy
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Create Support Record</span>
          </Button>
        </div>

        {/* Status Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200">
            <p className="text-xs text-slate-500 font-medium">Scheduled Follow-Ups</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">
              {interventions.filter((i) => i.status === 'Scheduled').length}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200">
            <p className="text-xs text-slate-500 font-medium">In Active Progress</p>
            <p className="text-2xl font-bold text-indigo-600 mt-1">
              {interventions.filter((i) => i.status === 'In Progress').length}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200">
            <p className="text-xs text-slate-500 font-medium">Completed / Resolved</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">
              {interventions.filter((i) => i.status === 'Completed').length}
            </p>
          </div>
        </div>

        {/* Interventions Records List */}
        <div className="space-y-4">
          {interventions.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-sm">{item.studentName}</h3>
                      <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {item.studentCode}
                      </span>
                      <Badge
                        variant={
                          item.status === 'Completed' ? 'success' :
                          item.status === 'In Progress' ? 'info' : 'warning'
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Reason: <strong className="text-slate-700">{item.reason}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.status !== 'Completed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkCompleted(item.id)}
                        className="h-8 text-xs text-emerald-700 border-emerald-300 hover:bg-emerald-50"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                        Mark as Completed
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                    <p className="font-bold text-slate-800">Action Plan:</p>
                    <p className="text-slate-600 leading-relaxed">{item.recommendedAction}</p>
                    <p className="text-[11px] text-slate-500 pt-1">
                      <strong>Notes:</strong> {item.notes || 'None logged.'}
                    </p>
                  </div>

                  {item.privateNotes ? (
                    <div className="p-3 bg-amber-50/80 rounded-lg border border-amber-200/80 space-y-1 text-amber-900">
                      <p className="font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                        Confidential Faculty Log (Protected):
                      </p>
                      <p className="text-[11px] leading-relaxed">{item.privateNotes}</p>
                      <p className="text-[10px] text-amber-700/80 italic pt-1">
                        Accessible strictly to authorized faculty advisors. Hidden from recruiters.
                      </p>
                    </div>
                  ) : (
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-slate-400 text-xs flex items-center">
                      No private confidential notes attached to this case.
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-50">
                  <span>Assigned Faculty: <strong>{item.facultyName}</strong></span>
                  <span>Follow-Up Due: <strong className="text-slate-700">{item.followUpDate}</strong></span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal: Create Support Record */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create Student Support Intervention"
          description="Record guidance, assign remedial actions, and schedule follow-up"
          maxWidth="lg"
        >
          <form onSubmit={handleCreate} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Select Student *</label>
              <select
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50 cursor-pointer"
              >
                {DEMO_STUDENTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.studentId}) &mdash; Score: {s.successScore}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Reason for Intervention *</label>
              <input
                type="text"
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Recommended Action *</label>
              <input
                type="text"
                required
                value={recommendedAction}
                onChange={(e) => setRecommendedAction(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Follow-up Review Date *</label>
              <input
                type="date"
                required
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Advising Notes</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Study plan discussed, assignments to review..."
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Private Faculty Notes (Protected)
              </label>
              <textarea
                rows={2}
                value={privateNotes}
                onChange={(e) => setPrivateNotes(e.target.value)}
                placeholder="Sensitive observations, parent discussions, health details..."
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save Intervention
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardShell>
  );
}
