'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { SuccessScoreGauge } from '@/components/shared/success-score-gauge';
import { RiskBadge } from '@/components/shared/risk-badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { DEMO_STUDENTS } from '@/lib/demo-data/students';
import { DEMO_INTERVENTIONS } from '@/lib/demo-data/faculty';
import {
  ArrowLeft,
  AlertTriangle,
  HeartHandshake,
  CalendarCheck,
  GraduationCap,
  FolderGit2,
  CheckCircle2,
  Info,
  Clock,
  Sparkles
} from 'lucide-react';

function StudentDetailContent() {
  const params = useParams();
  const id = params?.id as string;
  const student = DEMO_STUDENTS.find((s) => s.id === id) || DEMO_STUDENTS[0];

  const [isInterventionModalOpen, setIsInterventionModalOpen] = useState(false);
  const [actionNotes, setActionNotes] = useState('');
  const [recommendedAction, setRecommendedAction] = useState('Schedule 1-on-1 Academic Remedial Tutorial');
  const [followUpDate, setFollowUpDate] = useState('2026-10-20');
  const [privateNotes, setPrivateNotes] = useState('');
  const [interventionsList, setInterventionsList] = useState(
    DEMO_INTERVENTIONS.filter((i) => i.studentId === student.id)
  );

  const handleCreateIntervention = (e: React.FormEvent) => {
    e.preventDefault();
    const newInt = {
      id: `int-${interventionsList.length + 101}`,
      studentId: student.id,
      studentName: student.name,
      studentCode: student.studentId,
      facultyId: 'fac-101',
      facultyName: 'Dr. K. Raman',
      reason: student.riskIndicators[0]?.reason || 'Routine Academic Check-in',
      recommendedAction,
      followUpDate,
      status: 'Scheduled' as const,
      notes: actionNotes,
      privateNotes,
      createdAt: 'Just now',
      updatedAt: 'Just now',
    };
    setInterventionsList([newInt, ...interventionsList]);
    setIsInterventionModalOpen(false);
    setActionNotes('');
    setPrivateNotes('');
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Navigation Breadcrumb & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/faculty/students">
              <Button variant="outline" size="sm" className="h-8">
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                <span>Back to Directory</span>
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">{student.name}</h1>
                <span className="font-mono text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded font-semibold">
                  {student.studentId}
                </span>
                <RiskBadge level={student.riskLevel} />
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {student.department} &bull; Semester {student.semester} &bull; Section {student.section} &bull; {student.college}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsInterventionModalOpen(true)}
              className="gap-1.5 shadow-xs"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Add Follow-up Action</span>
            </Button>
          </div>
        </div>

        {/* Explainable 30/20/20/15/15 Success Score Gauge */}
        <SuccessScoreGauge
          score={student.successScore}
          previousScore={student.previousScore}
          breakdown={student.scoreBreakdown}
          lastUpdated={student.dataCompleteness.lastUpdated}
          dataCompleteness={student.dataCompleteness.percent}
        />

        {/* Identified Review Indicators & Evidence */}
        {student.riskIndicators.length > 0 ? (
          <Card className="border-amber-200 bg-amber-50/20">
            <CardHeader className="border-b border-amber-100">
              <CardTitle className="text-sm flex items-center gap-2 text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Identified Review Indicators &amp; Traceable Evidence</span>
              </CardTitle>
              <CardDescription className="text-amber-800/80">
                Data-backed decision support signals &mdash; not fatalistic evaluations
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {student.riskIndicators.map((ri) => (
                <div
                  key={ri.id}
                  className="p-3.5 rounded-xl bg-white border border-amber-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{ri.category}:</span>
                      <span className="text-slate-800">{ri.reason}</span>
                      <span className="font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[11px] font-semibold">
                        Metric: {ri.metric}
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px]">
                      Suggested Action: <strong className="text-slate-700">{ri.actionSuggestion}</strong> ({ri.period})
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setRecommendedAction(ri.actionSuggestion);
                      setIsInterventionModalOpen(true);
                    }}
                    className="shrink-0 text-indigo-600 h-7"
                  >
                    Act on this Alert
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>This student is currently in good standing across all five evaluation dimensions. Zero risk thresholds triggered.</span>
          </div>
        )}

        {/* Academics & Attendance Drill-Down */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Subject-Wise Marks */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                <span>Subject-Wise Marks &amp; Assessment Split</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold text-[11px]">
                      <th className="p-3">Course</th>
                      <th className="p-3">Internal /30</th>
                      <th className="p-3">External /70</th>
                      <th className="p-3">Total /100</th>
                      <th className="p-3">Grade</th>
                      <th className="p-3">Attendance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {student.subjects.map((sub) => (
                      <tr key={sub.code} className="hover:bg-slate-50">
                        <td className="p-3 font-medium text-slate-900">
                          <div>{sub.name}</div>
                          <span className="font-mono text-[10px] text-slate-400">{sub.code}</span>
                        </td>
                        <td className="p-3 font-mono text-slate-600">{sub.internal}</td>
                        <td className="p-3 font-mono text-slate-600">{sub.external}</td>
                        <td className="p-3 font-bold text-slate-900 font-mono">{sub.total}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded font-bold bg-slate-100 text-slate-800 text-[11px]">
                            {sub.grade}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={`font-semibold ${sub.attendance < 75 ? 'text-rose-600' : 'text-slate-700'}`}>
                            {sub.attendance}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Attendance & Activity Log */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-emerald-600" />
                <span>Attendance Log &amp; Verified Projects</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Recent Biometric Attendance Records
                </h4>
                {student.attendanceRecords.length > 0 ? (
                  <div className="space-y-2">
                    {student.attendanceRecords.map((att) => (
                      <div key={att.id} className="p-2.5 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-semibold text-slate-800">{att.subject}</p>
                          <p className="text-[11px] text-slate-500">{att.topic} &bull; {att.date}</p>
                        </div>
                        <Badge variant={att.status === 'Present' ? 'success' : 'danger'}>
                          {att.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No recent absence records logged.</p>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Verified Skills &amp; Projects
                </h4>
                {student.projects.length > 0 ? (
                  <div className="space-y-2">
                    {student.projects.map((proj) => (
                      <div key={proj.id} className="p-2.5 rounded-lg border border-slate-100 bg-slate-50 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{proj.title}</span>
                          <Badge variant={proj.verified ? 'success' : 'neutral'}>
                            {proj.verified ? 'Faculty Verified' : 'Pending Verification'}
                          </Badge>
                        </div>
                        <p className="text-[11px] text-slate-600">{proj.description}</p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {proj.tech.map((t) => (
                            <span key={t} className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-mono">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No capstone projects submitted yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Follow-up History for this student */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Faculty Follow-up &amp; Support History</CardTitle>
            <CardDescription>Confidential academic support and advising records</CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {interventionsList.length > 0 ? (
              interventionsList.map((intv) => (
                <div key={intv.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{intv.recommendedAction}</span>
                    <Badge variant={intv.status === 'Completed' ? 'success' : 'warning'}>
                      {intv.status}
                    </Badge>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Advising Notes:</strong> {intv.notes || 'In progress.'}
                  </p>
                  {intv.privateNotes && (
                    <div className="p-2.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-[11px]">
                      <strong>Confidential Faculty Note (Hidden from Recruiters):</strong> {intv.privateNotes}
                    </div>
                  )}
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span>Logged by: <strong>{intv.facultyName}</strong></span>
                    <span>Follow-up Date: <strong>{intv.followUpDate}</strong></span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 py-4 text-center">
                No prior follow-up records logged for {student.name}.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Modal: Add Follow-up Action */}
        <Modal
          isOpen={isInterventionModalOpen}
          onClose={() => setIsInterventionModalOpen(false)}
          title={`Add Follow-up Support: ${student.name}`}
          description={`Student ID: ${student.studentId} • Semester ${student.semester} CS`}
          maxWidth="lg"
        >
          <form onSubmit={handleCreateIntervention} className="space-y-4 text-xs">
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
              <label className="block font-semibold text-slate-700 mb-1">Follow-Up Date *</label>
              <input
                type="date"
                required
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Action Notes (Shared with Student)</label>
              <textarea
                rows={3}
                value={actionNotes}
                onChange={(e) => setActionNotes(e.target.value)}
                placeholder="Guidance on worksheets, peer tutoring, and expected deliverables..."
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Private Faculty Notes (Protected &mdash; Never Shared with Recruiters)
              </label>
              <textarea
                rows={2}
                value={privateNotes}
                onChange={(e) => setPrivateNotes(e.target.value)}
                placeholder="Internal faculty observations regarding health, personal factors, or counseling referrals..."
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsInterventionModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save &amp; Schedule Intervention
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardShell>
  );
}

export default function StudentDetailPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500 font-medium">Loading student record...</div>}>
      <StudentDetailContent />
    </Suspense>
  );
}

