'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { DEMO_STUDENTS } from '@/lib/demo-data/students';
import { ExamItem } from '@/types';
import {
  Calendar,
  Clock,
  MapPin,
  Plus,
  Bell,
  BellRing,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  Send,
  CalendarDays,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ReminderScheduleStep {
  daysBefore: number;
  scheduledDate: string;
  time: string;
  message: string;
  status: 'Scheduled' | 'Delivered' | 'Pending Backend Integration';
}

export default function StudentExamsPage() {
  const student = DEMO_STUDENTS[0];
  const [exams, setExams] = useState<ExamItem[]>(student.exams);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedExamId, setExpandedExamId] = useState<string | null>(exams[0]?.id || null);
  const [remindersEnabled, setRemindersEnabled] = useState<Record<string, boolean>>({
    'ex-1': true,
    'ex-2': true,
    'ex-3': true
  });
  const [simulatedAlert, setSimulatedAlert] = useState<string | null>(null);

  // Form state for adding exams
  const [subject, setSubject] = useState('');
  const [code, setCode] = useState('');
  const [date, setDate] = useState('2026-11-25');
  const [time, setTime] = useState('09:30 AM');
  const [venue, setVenue] = useState('Examination Hall A');

  // Calculate days remaining from a reference date (e.g. 2026-10-10)
  const calculateDaysRemaining = (examDateStr: string): number => {
    const today = new Date('2026-10-10');
    const examDate = new Date(examDateStr);
    const diffTime = examDate.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  // Generate 5-day daily morning reminder schedule
  const getReminderSchedule = (exam: ExamItem): ReminderScheduleStep[] => {
    const examDate = new Date(exam.date);
    const schedule: ReminderScheduleStep[] = [];

    for (let i = 5; i >= 1; i--) {
      const reminderDate = new Date(examDate);
      reminderDate.setDate(examDate.getDate() - i);
      const dateString = reminderDate.toISOString().split('T')[0];

      let msg = `${i} days countdown: ${exam.subject} (${exam.code}) on ${exam.date}. Review priority units.`;
      if (i === 4) {
        msg = `4-day countdown: ${exam.subject} (${exam.code}) exam is on ${exam.date}. Review formula sheets & past year questions.`;
      } else if (i === 1) {
        msg = `1-day countdown: Tomorrow is ${exam.subject} at ${exam.time}. Venue: ${exam.venue}.`;
      }

      schedule.push({
        daysBefore: i,
        scheduledDate: dateString,
        time: '07:30 AM',
        message: msg,
        status: 'Scheduled'
      });
    }

    // Exam day reminder
    schedule.push({
      daysBefore: 0,
      scheduledDate: exam.date,
      time: '07:00 AM',
      message: `Exam Day: ${exam.subject} starts at ${exam.time} in ${exam.venue}. Good luck!`,
      status: 'Scheduled'
    });

    return schedule;
  };

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
    setRemindersEnabled((prev) => ({ ...prev, [newEx.id]: true }));
    setIsModalOpen(false);
    setSubject('');
    setCode('');
  };

  const toggleReminder = (examId: string) => {
    setRemindersEnabled((prev) => ({ ...prev, [examId]: !prev[examId] }));
  };

  const handleSimulateNotification = (exam: ExamItem, daysRemaining: number) => {
    const text = `[StudyLens Morning Alert &bull; 07:30 AM]: 4-day countdown for ${exam.subject} (${exam.code})! Exam date: ${exam.date} at ${exam.time} (${exam.venue}). Keep revising!`;
    setSimulatedAlert(text);
    setTimeout(() => setSimulatedAlert(null), 6000);
  };

  return (
    <DashboardShell>
      <div className="space-y-6 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Examinations &amp; Reminders</h1>
              <Badge variant="warning">5-Day Morning Alerts</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              End-semester timetables, live exam countdowns, and automated morning reminder schedules
            </p>
          </div>

          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)} className="gap-1.5 shadow-xs">
            <Plus className="w-4 h-4" />
            <span>Add Personal Exam Note</span>
          </Button>
        </div>

        {/* Simulated Alert Toast */}
        {simulatedAlert && (
          <div className="p-4 rounded-xl bg-indigo-600 text-white text-xs shadow-lg flex items-start justify-between gap-3 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-start gap-2.5">
              <BellRing className="w-4 h-4 mt-0.5 text-indigo-200 shrink-0" />
              <div>
                <p className="font-bold text-sm">Morning Reminder Preview</p>
                <p className="text-indigo-100 mt-0.5 leading-relaxed">{simulatedAlert}</p>
              </div>
            </div>
            <button
              onClick={() => setSimulatedAlert(null)}
              className="text-indigo-200 hover:text-white font-bold cursor-pointer text-xs"
            >
              &times;
            </button>
          </div>
        )}

        {/* Backend Notification Integration Notice */}
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-950 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold flex items-center gap-2">
              <span>Exam Notification Service Status</span>
              <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-amber-200/70 text-amber-900">
                Backend Service Required
              </span>
            </p>
            <p className="leading-relaxed text-[11px] text-amber-900/90">
              The 5-day daily morning reminder schedule (including the 4-day countdown and exam date) is active and configured in this student portal interface. Actual external delivery (via SMS, WhatsApp, institutional email, or browser WebPush daemon) requires connection to a backend notification worker (e.g. AWS SNS, Twilio, or Firebase Cloud Messaging cron service).
            </p>
          </div>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 gap-5">
          {exams.map((ex) => {
            const daysLeft = calculateDaysRemaining(ex.date);
            const isReminderOn = remindersEnabled[ex.id] ?? true;
            const isExpanded = expandedExamId === ex.id;
            const schedule = getReminderSchedule(ex);

            return (
              <Card key={ex.id} className="overflow-hidden border-slate-200">
                <CardContent className="p-5 space-y-4 text-xs">
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-md">
                        {ex.code}
                      </span>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{ex.subject}</h3>
                        <p className="text-[11px] text-slate-500">{ex.type} Examination</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Live Countdown Badge */}
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Countdown</span>
                        <span className="font-bold text-sm text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                          {daysLeft > 0 ? `In ${daysLeft} Days` : 'Today'}
                        </span>
                      </div>

                      {/* Reminder Toggle */}
                      <button
                        onClick={() => toggleReminder(ex.id)}
                        className={`p-2 rounded-lg border flex items-center gap-1.5 transition-colors cursor-pointer text-xs font-semibold ${
                          isReminderOn
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                            : 'bg-slate-100 border-slate-200 text-slate-500'
                        }`}
                        title="Toggle 5-day morning reminder schedule"
                      >
                        <Bell className={`w-3.5 h-3.5 ${isReminderOn ? 'text-emerald-600 fill-emerald-600' : 'text-slate-400'}`} />
                        <span className="hidden sm:inline">{isReminderOn ? 'Reminder Active' : 'Reminder Paused'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Metadata Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 text-xs">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-indigo-500" />
                      <span>Exam Date: <strong className="text-slate-900">{ex.date}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-indigo-500" />
                      <span>Time: <strong className="text-slate-900">{ex.time}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-indigo-500" />
                      <span>Hall / Venue: <strong className="text-slate-900">{ex.venue}</strong></span>
                    </div>
                  </div>

                  {/* 5-Day Morning Reminder Schedule Accordion */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setExpandedExamId(isExpanded ? null : ex.id)}
                        className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                      >
                        <CalendarDays className="w-3.5 h-3.5" />
                        <span>Daily Morning Reminder Schedule (Starting 5 Days Prior)</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1" />}
                      </button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSimulateNotification(ex, daysLeft)}
                        className="text-[11px] text-slate-600 hover:text-indigo-600 gap-1 h-7 px-2"
                      >
                        <Send className="w-3 h-3 text-slate-400" />
                        <span>Test 4-Day Alert</span>
                      </Button>
                    </div>

                    {isExpanded && (
                      <div className="mt-3 space-y-2 p-3 bg-slate-50/70 rounded-xl border border-slate-100 text-xs">
                        <div className="text-[11px] text-slate-500 mb-2 font-medium">
                          Reminders trigger every morning at <strong>07:30 AM</strong> starting five days before {ex.date}:
                        </div>

                        <div className="space-y-1.5">
                          {schedule.map((step, idx) => (
                            <div
                              key={idx}
                              className={`p-2.5 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] ${
                                step.daysBefore === 4
                                  ? 'bg-indigo-50/60 border-indigo-200 font-medium'
                                  : 'bg-white border-slate-200'
                              }`}
                            >
                              <div className="flex items-start sm:items-center gap-2">
                                <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                                  step.daysBefore === 4
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-slate-100 text-slate-700'
                                }`}>
                                  {step.daysBefore === 0 ? 'Exam Day' : `${step.daysBefore} Days Before`}
                                </span>
                                <span className="text-slate-800">{step.message}</span>
                              </div>

                              <div className="flex items-center gap-2 text-slate-400 shrink-0 font-mono text-[10px]">
                                <span>{step.scheduledDate} &bull; {step.time}</span>
                                <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-sans font-semibold">
                                  Configured
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Modal: Add Exam */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add Upcoming Examination"
          description="Record an exam paper date, room allocation, and activate 5-day reminders"
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

            <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-100 text-[11px] text-indigo-900">
              <p className="font-semibold flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-indigo-600" />
                <span>Automated 5-Day Morning Alerts</span>
              </p>
              <p className="text-indigo-700 mt-0.5">
                Saving this exam automatically adds the daily 07:30 AM countdown reminder starting 5 days prior.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save &amp; Schedule Reminders
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardShell>
  );
}
