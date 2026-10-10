'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { DEMO_STUDENTS } from '@/lib/demo-data/students';
import { ExamItem } from '@/types';
import { Calendar, Clock, MapPin, Plus } from 'lucide-react';

export default function StudentExamsPage() {
  const student = DEMO_STUDENTS[0];
  const [exams, setExams] = useState<ExamItem[]>(student.exams);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [subject, setSubject] = useState('');
  const [code, setCode] = useState('');
  const [date, setDate] = useState('2026-11-25');
  const [time, setTime] = useState('09:30 AM');
  const [venue, setVenue] = useState('Examination Hall A');

  const handleAddExam = (e: React.FormEvent) => {
    e.preventDefault();
    const newEx: ExamItem = {
      id: `ex-${Date.now()}`,
      subject,
      code,
      date,
      time,
      venue,
      type: 'End-Semester',
    };
    setExams([...exams, newEx]);
    setIsModalOpen(false);
    setSubject('');
    setCode('');
  };

  return (
    <DashboardShell>
      <div className="space-y-6 max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Examinations Timetable</h1>
            <p className="text-xs text-slate-500 mt-1">
              End-semester and mid-term examination dates, scheduled halls, and venue details
            </p>
          </div>

          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)} className="gap-1.5 shadow-xs">
            <Plus className="w-4 h-4" />
            <span>Add Personal Exam Note</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exams.map((ex) => (
            <Card key={ex.id}>
              <CardContent className="p-5 space-y-3 text-xs">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {ex.code}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm mt-2">{ex.subject}</h3>
                  </div>
                  <Badge variant="warning">{ex.type}</Badge>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Date: <strong className="text-slate-800">{ex.date}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Time: <strong className="text-slate-800">{ex.time}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Venue: <strong className="text-slate-800">{ex.venue}</strong></span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add Upcoming Examination"
          description="Record an exam paper date and room allocation"
        >
          <form onSubmit={handleAddExam} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Subject Name *</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Theory of Computation"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Course Code *</label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. CS504"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Exam Date *</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Time Slot *</label>
                <input
                  type="text"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Venue / Exam Hall *</label>
              <input
                type="text"
                required
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="e.g. Hall B-201"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save Exam
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardShell>
  );
}
