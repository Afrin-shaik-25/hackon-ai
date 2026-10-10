'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter
} from 'recharts';
import {
  DEMO_SCORE_DISTRIBUTION,
  DEMO_MONTHLY_TRENDS,
  DEMO_RISK_BY_CATEGORY,
  DEMO_DEPARTMENT_STATS
} from '@/lib/demo-data/faculty';

export default function FacultyAnalyticsPage() {
  const [selectedSem, setSelectedSem] = useState('Fall 2026');

  // Scatter plot data for Attendance vs Academic Marks
  const scatterData = [
    { attendance: 94, marks: 90, name: 'Aarav' },
    { attendance: 65, marks: 67, name: 'Priya' },
    { attendance: 82, marks: 78, name: 'Rohan' },
    { attendance: 58, marks: 55, name: 'Ananya' },
    { attendance: 81, marks: 77, name: 'Devansh' },
    { attendance: 88, marks: 84, name: 'Meera' },
    { attendance: 71, marks: 66, name: 'Kabir' },
    { attendance: 96, marks: 95, name: 'Zoya' },
  ];

  const sourceCoverageData = [
    { source: 'Internal Examination Marks', coverage: 98, status: 'Synced' },
    { source: 'Biometric Attendance Logs', coverage: 100, status: 'Synced' },
    { source: 'Lab Assessment Tests', coverage: 94, status: 'Synced' },
    { source: 'LMS Engagement Sync', coverage: 82, status: 'Partial' },
    { source: 'Verified GitHub Capstones', coverage: 74, status: 'Pending Review' },
  ];

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Performance Analytics &amp; Visualizations</h1>
            <p className="text-xs text-slate-500 mt-1">
              Cross-sectional analysis of student trajectories, risk correlations, and source data completeness (25% Weight)
            </p>
          </div>

          <Badge variant="info">Evaluation Cohort &bull; {selectedSem}</Badge>
        </div>

        {/* Top 2 Charts: Trajectory & Attendance Correlation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trajectory Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Cohort Trajectory: Score vs Attendance</CardTitle>
              <CardDescription>Monthly progression across Fall 2026</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={DEMO_MONTHLY_TRENDS} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} domain={[60, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="avgScore" name="Avg Course Marks %" stroke="#4f46e5" strokeWidth={2.5} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="attendanceRate" name="Attendance Rate %" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Attendance vs Marks Correlation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Attendance vs Academic Marks</CardTitle>
              <CardDescription>Correlation scatter analysis across student records</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis type="number" dataKey="attendance" name="Attendance %" domain={[50, 100]} stroke="#94a3b8" fontSize={11} />
                  <YAxis type="number" dataKey="marks" name="Marks %" domain={[40, 100]} stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                  />
                  <Scatter name="Students" data={scatterData} fill="#3b82f6" />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Lower 2 Charts: Risk Categories & Source Data Coverage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk by Category */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Risk Indicators by Category</CardTitle>
              <CardDescription>Early warning signal frequencies in current cohort</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DEMO_RISK_BY_CATEGORY} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="category" stroke="#94a3b8" fontSize={10} interval={0} angle={-15} textAnchor="end" />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                  />
                  <Bar dataKey="count" name="Identified Students" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Source Data Coverage Matrix */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Data Ingestion Coverage by Source</CardTitle>
              <CardDescription>Ensures fairness and transparency in score computation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {sourceCoverageData.map((item) => (
                <div key={item.source} className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">{item.source}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900">{item.coverage}%</span>
                      <Badge variant={item.coverage >= 95 ? 'success' : item.coverage >= 80 ? 'warning' : 'neutral'}>
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        item.coverage >= 95 ? 'bg-emerald-500' : item.coverage >= 80 ? 'bg-amber-500' : 'bg-slate-400'
                      }`}
                      style={{ width: `${item.coverage}%` }}
                    />
                  </div>
                </div>
              ))}

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600 mt-2">
                <strong>Weighting Integrity:</strong> When a source has partial coverage (such as LMS sync), scores are flagged provisional rather than unfairly penalizing students with zeros.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
