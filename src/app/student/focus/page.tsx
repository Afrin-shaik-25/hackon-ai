'use client';

import React, { useState, useEffect } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { Timer, Play, Pause, Square, AlertCircle, ShieldAlert, CheckCircle2, RotateCcw } from 'lucide-react';

export default function StudentFocusPage() {
  const [durationMinutes, setDurationMinutes] = useState(25);
  const [selectedApps, setSelectedApps] = useState<string[]>(['Instagram', 'YouTube', 'Reddit']);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [confirmEndModal, setConfirmEndModal] = useState(false);
  const [totalFocusToday, setTotalFocusToday] = useState(75); // minutes

  const supportedApps = [
    { name: 'Instagram', category: 'Social Media' },
    { name: 'YouTube', category: 'Video Streaming' },
    { name: 'Reddit', category: 'Forums & Social' },
    { name: 'Discord', category: 'Chat & Gaming' },
    { name: 'Twitter / X', category: 'Microblogging' },
    { name: 'TikTok', category: 'Short Video' },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsCompleted(true);
            setTotalFocusToday((t) => t + durationMinutes);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, durationMinutes]);

  const handleStartSession = (mins: number) => {
    setDurationMinutes(mins);
    setTimeLeft(mins * 60);
    setIsRunning(true);
    setIsCompleted(false);
  };

  const handleToggleApp = (appName: string) => {
    if (selectedApps.includes(appName)) {
      setSelectedApps(selectedApps.filter((a) => a !== appName));
    } else {
      setSelectedApps([...selectedApps, appName]);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <DashboardShell>
      <div className="space-y-6 max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">FocusNest Study Timer</h1>
            <p className="text-xs text-slate-500 mt-1">
              Deep work productivity sessions with targeted distraction resistance (Provisional feature: FocusNest)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Today&apos;s Focus:</span>
            <span className="font-bold text-sm text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
              {totalFocusToday} mins
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <p className="font-bold">FocusNest Architecture Notice (Evaluation Disclosure)</p>
              <Badge variant="warning" className="text-[10px]">
                FocusNest Demo &mdash; blocking integration not connected
              </Badge>
            </div>
            <p className="leading-relaxed">
              Standard web browsers operate inside an OS security sandbox and cannot terminate external mobile or desktop applications.
              Real mobile application restriction requires our companion native Android accessibility service; desktop website blocking requires our Chrome extension.
              <strong> FocusNest Demo &mdash; blocking integration not connected.</strong>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Timer Display */}
          <Card className="flex flex-col items-center justify-center p-8 text-center space-y-6">
            <div className="w-48 h-48 rounded-full border-8 border-slate-100 flex flex-col items-center justify-center bg-slate-50 relative shadow-inner">
              <span className="text-5xl font-mono font-extrabold text-slate-900 tracking-tight">
                {formatTime(timeLeft)}
              </span>
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mt-1">
                {isRunning ? 'Session Active' : isCompleted ? 'Completed' : 'Ready'}
              </span>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center gap-3">
              {!isRunning ? (
                <Button
                  onClick={() => setIsRunning(true)}
                  disabled={timeLeft === 0}
                  variant="primary"
                  size="lg"
                  className="gap-2 px-6"
                >
                  <Play className="w-4 h-4" />
                  <span>{timeLeft === durationMinutes * 60 ? 'Start Focus' : 'Resume'}</span>
                </Button>
              ) : (
                <Button
                  onClick={() => setIsRunning(false)}
                  variant="outline"
                  size="lg"
                  className="gap-2"
                >
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </Button>
              )}

              {(isRunning || timeLeft < durationMinutes * 60) && (
                <Button
                  onClick={() => setConfirmEndModal(true)}
                  variant="danger"
                  size="lg"
                  className="gap-1.5"
                >
                  <Square className="w-4 h-4" />
                  <span>End</span>
                </Button>
              )}
            </div>

            {/* Quick Duration Buttons */}
            <div className="pt-2">
              <p className="text-xs text-slate-400 font-medium mb-2">Preset Durations</p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {[15, 25, 45, 60].map((m) => (
                  <button
                    key={m}
                    onClick={() => handleStartSession(m)}
                    disabled={isRunning}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      durationMinutes === m && !isRunning
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50'
                    }`}
                  >
                    {m} min{m === 25 ? ' (Pomodoro)' : ''}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Distraction Selection & Restrictions Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Targeted Distractions</CardTitle>
              <CardDescription>Select apps &amp; services to restrict during sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {supportedApps.map((app) => {
                  const isChecked = selectedApps.includes(app.name);
                  return (
                    <div
                      key={app.name}
                      onClick={() => !isRunning && handleToggleApp(app.name)}
                      className={`p-3 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-colors ${
                        isChecked
                          ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      } ${isRunning ? 'opacity-80 cursor-not-allowed' : ''}`}
                    >
                      <div>
                        <p className="font-bold">{app.name}</p>
                        <p className="text-[10px] text-slate-500">{app.category}</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        readOnly
                        className="rounded text-indigo-600 cursor-pointer"
                      />
                    </div>
                  );
                })}
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-500 space-y-1">
                <p>
                  <strong>Restriction Status:</strong>{' '}
                  {isRunning ? (
                    <span className="text-amber-700 font-semibold">Simulated Blocking Active</span>
                  ) : (
                    <span className="text-slate-600">Idle (Standby)</span>
                  )}
                </p>
                <p>Selected apps: {selectedApps.join(', ') || 'None selected'}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Early Termination Confirmation Modal */}
        <Modal
          isOpen={confirmEndModal}
          onClose={() => setConfirmEndModal(false)}
          title="End Focus Session Early?"
          description="Are you sure you want to conclude this session before completion?"
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-600 leading-relaxed">
              Ending early will log focused time up to this moment and restore unrestricted access.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setConfirmEndModal(false)}>
                Continue Focusing
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  setConfirmEndModal(false);
                  setIsRunning(false);
                  setTimeLeft(durationMinutes * 60);
                }}
              >
                Confirm End Session
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardShell>
  );
}
