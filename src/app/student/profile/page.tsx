'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth/auth-context';
import { DEMO_STUDENTS } from '@/lib/demo-data/students';
import {
  User,
  Mail,
  GraduationCap,
  Building,
  Award,
  CheckCircle2,
  Camera,
  Save,
  ShieldCheck,
  Calendar,
  BookOpen,
  Sparkles
} from 'lucide-react';

const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
];

export default function StudentProfilePage() {
  const { user, updateProfile } = useAuth();
  const defaultStudent = DEMO_STUDENTS[0];

  // Editable Profile States initialized from AuthContext or Demo
  const [name, setName] = useState(user?.name || defaultStudent.name || 'Arav Sharma');
  const [email, setEmail] = useState(user?.email || defaultStudent.email || 'arav.sharma@apex.edu');
  const [avatar, setAvatar] = useState(user?.avatar || defaultStudent.avatar || AVATAR_OPTIONS[0]);
  const [studentType, setStudentType] = useState<'Undergraduate' | 'Graduate'>(user?.studentType || defaultStudent.studentType || 'Undergraduate');
  const [college, setCollege] = useState(user?.college || defaultStudent.college || 'Apex Institute of Technology');
  const [degree, setDegree] = useState(user?.degree || defaultStudent.degree || 'B.Tech');
  const [branch, setBranch] = useState(user?.branch || defaultStudent.branch || 'Computer Science & Engineering');
  const [year, setYear] = useState(user?.year || defaultStudent.year || 3);
  const [semester, setSemester] = useState(user?.semester || defaultStudent.semester || 5);
  const [studentId, setStudentId] = useState(user?.studentId || defaultStudent.studentId || '2023CS101');
  const [section, setSection] = useState(defaultStudent.section || 'A');

  const [isSaved, setIsSaved] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      avatar,
      studentType,
      college,
      degree,
      branch,
      department: branch,
      year: Number(year),
      semester: Number(semester),
      studentId,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 4000);
  };

  return (
    <DashboardShell>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Student Profile &amp; Enrollment</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your academic enrollment details, student avatar logo, and departmental preferences
          </p>
        </div>

        {/* Success Alert */}
        {isSaved && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">
              Profile details successfully updated! Your academic standing is refreshed.
            </span>
          </div>
        )}

        {/* Top Profile Card with User Avatar beside Arav Sharma */}
        <Card>
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 border-b border-slate-100 pb-6">
              {/* Profile Avatar / Logo beside Student's Name */}
              <div className="relative group shrink-0">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-indigo-200 shadow-md bg-indigo-50 flex items-center justify-center">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt={name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="font-extrabold text-3xl text-indigo-600">
                      {name.charAt(0)}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                  className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs cursor-pointer"
                  title="Change Avatar Image"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Student Name & Academic Badges */}
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{name}</h2>
                  <Badge variant="indigo">{studentType}</Badge>
                  <Badge variant="success">Enrolled Full-Time</Badge>
                </div>
                <p className="text-xs text-slate-600">
                  <strong className="text-slate-800">{degree}</strong> in {branch} &bull; Year {year}, Semester {semester} (Section {section})
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  Roll ID: <strong className="text-slate-700 font-semibold">{studentId}</strong> &bull; {college}
                </p>
              </div>
            </div>

            {/* Avatar Selector Dropdown / Row */}
            {showAvatarPicker && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 animate-in fade-in">
                <p className="font-semibold text-slate-800">Select an Avatar Photo Preset:</p>
                <div className="flex items-center gap-3">
                  {AVATAR_OPTIONS.map((opt, i) => (
                    <img
                      key={i}
                      src={opt}
                      alt={`Avatar option ${i + 1}`}
                      onClick={() => {
                        setAvatar(opt);
                        setShowAvatarPicker(false);
                      }}
                      className={`w-12 h-12 rounded-xl object-cover cursor-pointer border-2 transition-all hover:scale-105 ${
                        avatar === opt ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-slate-200'
                      }`}
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Editable Profile Details Form */}
            <form onSubmit={handleSaveProfile} className="space-y-5 text-xs">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-600" />
                <span>Manage Academic &amp; Enrollment Profile</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Student Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Institutional Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Student Classification *</label>
                  <select
                    value={studentType}
                    onChange={(e) => setStudentType(e.target.value as 'Undergraduate' | 'Graduate')}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="Undergraduate">Undergraduate Student (B.Tech / B.Sc / B.E)</option>
                    <option value="Graduate">Graduate Student (M.Tech / M.Sc / Ph.D)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">College / Campus *</label>
                  <input
                    type="text"
                    required
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Degree Program *</label>
                  <input
                    type="text"
                    required
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="e.g. B.Tech"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Branch / Specialization *</label>
                  <input
                    type="text"
                    required
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="e.g. Computer Science & Engineering"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Year of Study *</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value={1}>1st Year</option>
                    <option value={2}>2nd Year</option>
                    <option value={3}>3rd Year</option>
                    <option value={4}>4th Year</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Current Semester *</label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>
                        Semester {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Roll Number / Student ID *</label>
                  <input
                    type="text"
                    required
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Section</label>
                  <input
                    type="text"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-3 border-t border-slate-100">
                <Button type="submit" variant="primary" className="gap-2 shadow-xs">
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Profile Details</span>
                </Button>
              </div>
            </form>

            {/* Academic Standing Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-4 border-t border-slate-100">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-600" />
                  Academic Profile Summary
                </h4>
                <ul className="space-y-1 text-slate-600">
                  <li>&bull; Average Course Marks: <strong>88.4% (Grade A+)</strong></li>
                  <li>&bull; Attendance Percentage: <strong>{defaultStudent.attendancePercentage}%</strong></li>
                  <li>&bull; Program Track: {degree} ({branch})</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  Recruiter Visibility &amp; Consent
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  Your verified coursework and project summaries are visible to vetted employers. Personal attendance logs and private notes remain strictly confidential.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
