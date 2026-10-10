'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import api from '@/lib/api-client';
import { SlidersHorizontal, ShieldCheck, CheckCircle2, AlertCircle, X, Loader2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const [academicWeight, setAcademicWeight] = useState(30);
  const [attendanceWeight, setAttendanceWeight] = useState(20);
  const [assessmentWeight, setAssessmentWeight] = useState(20);
  const [lmsWeight, setLmsWeight] = useState(15);
  const [skillsWeight, setSkillsWeight] = useState(15);
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const total = academicWeight + attendanceWeight + assessmentWeight + lmsWeight + skillsWeight;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (total !== 100) {
      setErrorMsg(`Indicator weights must sum up exactly to 100%! Current sum is ${total}%.`);
      return;
    }
    setSaving(true);
    const weightsConfig = JSON.stringify({
      academic: academicWeight,
      attendance: attendanceWeight,
      assessment: assessmentWeight,
      lms: lmsWeight,
      skills: skillsWeight,
    });
    await api.admin.updateSetting('success_score_weights', weightsConfig);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <DashboardShell>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Platform Configuration &amp; Weights</h1>
          <p className="text-xs text-slate-500 mt-1">
            Institutional performance indicator settings, alert thresholds, and security parameters
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button onClick={() => setErrorMsg(null)} className="text-rose-600 hover:text-rose-900">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {saved && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Performance indicator configuration updated and saved persistently to database.</span>
          </div>
        )}

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm">Performance Indicator Baseline Allocations</CardTitle>
                <CardDescription>Target educational distribution policy</CardDescription>
              </div>
              <Badge variant={total === 100 ? 'success' : 'danger'}>
                Total: {total}%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-800">Academic Examination Marks</p>
                    <p className="text-slate-500 text-[11px]">Theory tests, midterms, and finals</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={academicWeight}
                      onChange={(e) => setAcademicWeight(Number(e.target.value))}
                      className="w-16 px-2 py-1 rounded border border-slate-200 font-bold text-center"
                    />
                    <span className="font-semibold">%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-800">Attendance Consistency</p>
                    <p className="text-slate-500 text-[11px]">Biometric &amp; register presence</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={attendanceWeight}
                      onChange={(e) => setAttendanceWeight(Number(e.target.value))}
                      className="w-16 px-2 py-1 rounded border border-slate-200 font-bold text-center"
                    />
                    <span className="font-semibold">%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-800">Assessments &amp; Quizzes</p>
                    <p className="text-slate-500 text-[11px]">Periodic coding challenges &amp; MCQs</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={assessmentWeight}
                      onChange={(e) => setAssessmentWeight(Number(e.target.value))}
                      className="w-16 px-2 py-1 rounded border border-slate-200 font-bold text-center"
                    />
                    <span className="font-semibold">%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-800">LMS &amp; Digital Engagement</p>
                    <p className="text-slate-500 text-[11px]">Portal logins, video completion</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={lmsWeight}
                      onChange={(e) => setLmsWeight(Number(e.target.value))}
                      className="w-16 px-2 py-1 rounded border border-slate-200 font-bold text-center"
                    />
                    <span className="font-semibold">%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-800">Verified Skills &amp; Projects</p>
                    <p className="text-slate-500 text-[11px]">Capstone deliverables, repositories</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={skillsWeight}
                      onChange={(e) => setSkillsWeight(Number(e.target.value))}
                      className="w-16 px-2 py-1 rounded border border-slate-200 font-bold text-center"
                    />
                    <span className="font-semibold">%</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-3 border-t border-slate-100">
                <Button type="submit" variant="primary">
                  Save Weighting Policy
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
