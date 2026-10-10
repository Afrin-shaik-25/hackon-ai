'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DemoBanner } from '@/components/shared/demo-banner';
import {
  GraduationCap,
  Users,
  Briefcase,
  Building2,
  ArrowRight,
  ShieldAlert,
  LogIn,
  UserPlus,
  CheckCircle2,
  Lock,
  Mail,
  User,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { UserRole } from '@/types';

interface PortalConfig {
  role: UserRole;
  name: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  colorScheme: {
    bg: string;
    text: string;
    border: string;
    button: string;
  };
  defaultEmail: string;
  dashboardPath: string;
}

const PORTAL_CONFIGS: Record<string, PortalConfig> = {
  student: {
    role: 'student',
    name: 'Student Portal',
    badge: 'Academic & Learning Hub',
    icon: GraduationCap,
    tagline: 'Track performance analytics, personalized syllabus, FocusNest timer, and upcoming exams',
    colorScheme: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
      border: 'border-indigo-200',
      button: 'bg-indigo-600 hover:bg-indigo-700',
    },
    defaultEmail: 'arav.sharma@apex.edu',
    dashboardPath: '/student/dashboard',
  },
  faculty: {
    role: 'faculty',
    name: 'Faculty Portal',
    badge: 'Cohort Mentorship & Advising',
    icon: Users,
    tagline: 'Monitor assigned student cohorts, review academic progress, and log advising notes',
    colorScheme: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      button: 'bg-emerald-600 hover:bg-emerald-700',
    },
    defaultEmail: 'k.raman@apex.edu',
    dashboardPath: '/faculty/dashboard',
  },
  graduate: {
    role: 'graduate',
    name: 'Graduate / Job Seeker Portal',
    badge: 'Career & Placement Readiness',
    icon: Briefcase,
    tagline: 'Build verified ATS resumes, practice aptitude assessments, and apply for corporate jobs',
    colorScheme: {
      bg: 'bg-teal-50',
      text: 'text-teal-700',
      border: 'border-teal-200',
      button: 'bg-teal-600 hover:bg-teal-700',
    },
    defaultEmail: 'sneha.m@graduate.example.com',
    dashboardPath: '/graduate/dashboard',
  },
  company: {
    role: 'company',
    name: 'Company / Recruiter Portal',
    badge: 'Campus Talent & Recruitment',
    icon: Building2,
    tagline: 'Discover candidates with verified skills, post job openings, and manage interview pipelines',
    colorScheme: {
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      border: 'border-purple-200',
      button: 'bg-purple-600 hover:bg-purple-700',
    },
    defaultEmail: 'recruitment@nexatech.example.com',
    dashboardPath: '/company/dashboard',
  },
};

function PortalAuthContent() {
  const params = useParams();
  const router = useRouter();
  const { login, setRole, updateProfile } = useAuth();

  const roleKey = (params?.role as string)?.toLowerCase() || 'student';
  const config = PORTAL_CONFIGS[roleKey] || PORTAL_CONFIGS.student;
  const PortalIcon = config.icon;

  // Login State
  const [loginEmail, setLoginEmail] = useState(config.defaultEmail);
  const [loginPassword, setLoginPassword] = useState('password123');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Signup State (Shared)
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState('');

  // Student specific signup fields
  const [studentType, setStudentType] = useState<'Undergraduate' | 'Graduate'>('Undergraduate');
  const [college, setCollege] = useState('Apex Institute of Technology');
  const [degree, setDegree] = useState('B.Tech');
  const [branch, setBranch] = useState('Computer Science & Engineering');
  const [academicYear, setAcademicYear] = useState('3');
  const [semester, setSemester] = useState('5');

  // Faculty specific signup fields
  const [facultyDept, setFacultyDept] = useState('Computer Science & Engineering');
  const [facultyDesignation, setFacultyDesignation] = useState('Associate Professor');
  const [employeeId, setEmployeeId] = useState('FAC-CS-042');

  // Graduate specific signup fields
  const [gradDegree, setGradDegree] = useState('B.Tech Computer Science');
  const [gradYear, setGradYear] = useState('2026');
  const [gradDomain, setGradDomain] = useState('Software Engineering & Cloud');

  // Company specific signup fields
  const [companyName, setCompanyName] = useState('NexaTech Systems');
  const [industry, setIndustry] = useState('Enterprise Cloud Solutions');
  const [recruiterDesignation, setRecruiterDesignation] = useState('University Talent Lead');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginEmail || !loginPassword) {
      setLoginError('Please enter your institutional email and password.');
      return;
    }

    setLoginLoading(true);
    setTimeout(() => {
      setLoginLoading(false);
      login(loginEmail, config.role);
      setRole(config.role);
      router.push(config.dashboardPath);
    }, 450);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');
    if (!signupName || !signupEmail || !signupPassword) {
      setSignupError('Please fill in your name, email, and password.');
      return;
    }

    setSignupLoading(true);
    setTimeout(() => {
      setSignupLoading(false);
      login(signupEmail, config.role);
      setRole(config.role);

      // Save custom profile attributes according to portal type
      if (config.role === 'student') {
        updateProfile({
          name: signupName,
          email: signupEmail,
          studentType,
          college,
          degree,
          branch,
          department: branch,
          year: Number(academicYear),
          semester: Number(semester),
        });
      } else if (config.role === 'faculty') {
        updateProfile({
          name: signupName,
          email: signupEmail,
          college,
          department: facultyDept,
          employeeId,
        });
      } else if (config.role === 'graduate') {
        updateProfile({
          name: signupName,
          email: signupEmail,
          college,
          degree: gradDegree,
          year: Number(gradYear),
        });
      } else if (config.role === 'company') {
        updateProfile({
          name: signupName,
          email: signupEmail,
          companyName,
          department: industry,
        });
      }

      router.push(config.dashboardPath);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 antialiased">
      <DemoBanner />

      {/* Top Header Bar */}
      <header className="bg-white border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors text-sm font-semibold">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portals Hub</span>
        </Link>

        {/* Portal Quick Switcher Pills */}
        <div className="hidden md:flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          {(['student', 'faculty', 'graduate', 'company'] as const).map((r) => {
            const p = PORTAL_CONFIGS[r];
            const isActive = r === roleKey;
            return (
              <Link
                key={r}
                href={`/portal/${r}`}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {p.name.split(' ')[0]}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg ${config.colorScheme.bg} flex items-center justify-center ${config.colorScheme.text}`}>
            <PortalIcon className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-900 text-sm hidden sm:inline">{config.name}</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Portal Title Banner */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 text-slate-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>{config.badge}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {config.name} Gateway
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            {config.tagline}
          </p>
        </div>

        {/* Frontend Demo Disclosure Notice */}
        <div className="max-w-4xl mx-auto p-4 rounded-xl bg-amber-50/90 border border-amber-200/90 text-amber-950 text-xs sm:text-sm flex items-start gap-3 shadow-xs">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-amber-900">
              Frontend Demo Mode Notice &bull; Authentication Transparency
            </p>
            <p className="leading-relaxed text-xs text-amber-900/90">
              This portal authentication workflow operates in <strong>frontend demonstration mode</strong>. Form submissions simulate realistic profile session updates in client state. Actual production user verification and role authorization require connection to your institution&apos;s identity provider (e.g. NextAuth, Auth0, or university LDAP/SSO).
            </p>
          </div>
        </div>

        {/* Side-by-Side: Portal Login (Left) & Portal Sign Up (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto items-stretch">
          {/* LEFT: LOGIN (EXISTING USERS) */}
          <Card className="border-slate-200/90 shadow-md flex flex-col justify-between">
            <div>
              <CardHeader className="border-b border-slate-100 bg-slate-50/70 p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                      <LogIn className="w-4 h-4" />
                    </div>
                    <div>
                      <CardTitle className="text-base sm:text-lg font-bold text-slate-900">
                        Sign In (Existing User)
                      </CardTitle>
                      <CardDescription className="text-xs text-slate-500">
                        Log in with your existing {config.name.split(' ')[0]} credentials
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="info">Existing Account</Badge>
                </div>
              </CardHeader>

              <CardContent className="p-5 sm:p-6 space-y-4">
                {loginError && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
                    {loginError}
                  </div>
                )}

                <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      Institutional Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="e.g. username@institution.edu"
                        className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block font-semibold text-slate-700">Password *</label>
                      <span className="text-xs text-indigo-600 hover:underline cursor-pointer">
                        Forgot Password?
                      </span>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-800"
                      />
                    </div>
                  </div>

                  {/* Preloaded Demo Account Quick-Fill */}
                  <div className="p-3 rounded-lg bg-indigo-50/60 border border-indigo-100 space-y-1">
                    <p className="font-semibold text-xs text-indigo-900 flex items-center justify-between">
                      <span>Default Demo Account:</span>
                      <span className="font-mono text-[11px] text-indigo-700">{config.defaultEmail}</span>
                    </p>
                    <p className="text-[11px] text-indigo-800/80">
                      Click below to sign in instantly with this preset test account.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={loginLoading}
                    className={`w-full py-2.5 text-white font-semibold text-sm rounded-lg shadow-sm ${config.colorScheme.button}`}
                  >
                    {loginLoading ? 'Signing in...' : `Sign In to ${config.name}`}
                  </Button>
                </form>
              </CardContent>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 text-center">
              Existing users receive immediate access to their saved records &bull; Verified 2026 Session
            </div>
          </Card>

          {/* RIGHT: SIGN UP (NEW USERS) */}
          <Card className="border-slate-200/90 shadow-md flex flex-col justify-between">
            <div>
              <CardHeader className="border-b border-slate-100 bg-slate-50/70 p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      <UserPlus className="w-4 h-4" />
                    </div>
                    <div>
                      <CardTitle className="text-base sm:text-lg font-bold text-slate-900">
                        Create Account (New User)
                      </CardTitle>
                      <CardDescription className="text-xs text-slate-500">
                        Register a new {config.name.split(' ')[0]} profile
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="success">New Registration</Badge>
                </div>
              </CardHeader>

              <CardContent className="p-5 sm:p-6 space-y-4">
                {signupError && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
                    {signupError}
                  </div>
                )}

                <form onSubmit={handleSignupSubmit} className="space-y-3.5 text-xs sm:text-sm">
                  {/* Basic Credentials */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        placeholder="e.g. Arav Sharma"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        placeholder="e.g. student@apex.edu"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Create Password *</label>
                    <input
                      type="password"
                      required
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
                    />
                  </div>

                  {/* PORTAL-SPECIFIC PROFILE FIELDS */}

                  {/* 1. STUDENT FIELDS (Explicitly requested in Req 2) */}
                  {config.role === 'student' && (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                      <p className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                        Student Academic Classification
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-medium text-slate-700 mb-1">Student Type *</label>
                          <select
                            value={studentType}
                            onChange={(e) => setStudentType(e.target.value as 'Undergraduate' | 'Graduate')}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800"
                          >
                            <option value="Undergraduate">Undergraduate (B.Tech / B.E)</option>
                            <option value="Graduate">Graduate (M.Tech / M.Sc / Ph.D)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-medium text-slate-700 mb-1">College / Campus *</label>
                          <input
                            type="text"
                            required
                            value={college}
                            onChange={(e) => setCollege(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-medium text-slate-700 mb-1">Degree Program *</label>
                          <input
                            type="text"
                            required
                            value={degree}
                            onChange={(e) => setDegree(e.target.value)}
                            placeholder="e.g. B.Tech"
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block font-medium text-slate-700 mb-1">Branch / Stream *</label>
                          <input
                            type="text"
                            required
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                            placeholder="e.g. Computer Science"
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-medium text-slate-700 mb-1">Academic Year *</label>
                          <select
                            value={academicYear}
                            onChange={(e) => setAcademicYear(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800"
                          >
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-medium text-slate-700 mb-1">Current Semester *</label>
                          <select
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                              <option key={s} value={s}>Semester {s}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 2. FACULTY FIELDS */}
                  {config.role === 'faculty' && (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                      <p className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                        Faculty Institutional Credentials
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-medium text-slate-700 mb-1">Department *</label>
                          <input
                            type="text"
                            required
                            value={facultyDept}
                            onChange={(e) => setFacultyDept(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800"
                          />
                        </div>
                        <div>
                          <label className="block font-medium text-slate-700 mb-1">Employee / Staff ID *</label>
                          <input
                            type="text"
                            required
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 font-mono"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">Designation *</label>
                        <input
                          type="text"
                          required
                          value={facultyDesignation}
                          onChange={(e) => setFacultyDesignation(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800"
                        />
                      </div>
                    </div>
                  )}

                  {/* 3. GRADUATE FIELDS */}
                  {config.role === 'graduate' && (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                      <p className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                        Graduate Academic Background
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-medium text-slate-700 mb-1">Degree &amp; Major *</label>
                          <input
                            type="text"
                            required
                            value={gradDegree}
                            onChange={(e) => setGradDegree(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800"
                          />
                        </div>
                        <div>
                          <label className="block font-medium text-slate-700 mb-1">Passing Year *</label>
                          <input
                            type="text"
                            required
                            value={gradYear}
                            onChange={(e) => setGradYear(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">Primary Career Focus *</label>
                        <input
                          type="text"
                          required
                          value={gradDomain}
                          onChange={(e) => setGradDomain(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800"
                        />
                      </div>
                    </div>
                  )}

                  {/* 4. COMPANY FIELDS */}
                  {config.role === 'company' && (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                      <p className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                        Company &amp; Recruiter Identification
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-medium text-slate-700 mb-1">Company Name *</label>
                          <input
                            type="text"
                            required
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800"
                          />
                        </div>
                        <div>
                          <label className="block font-medium text-slate-700 mb-1">Industry Domain *</label>
                          <input
                            type="text"
                            required
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">Recruiter Role / Title *</label>
                        <input
                          type="text"
                          required
                          value={recruiterDesignation}
                          onChange={(e) => setRecruiterDesignation(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800"
                        />
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={signupLoading}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-lg shadow-sm"
                  >
                    {signupLoading ? 'Registering...' : `Complete Signup & Enter ${config.name}`}
                  </Button>
                </form>
              </CardContent>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 text-center">
              New accounts enter with default verified standing for academic and recruitment evaluation
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default function PortalAuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-sm text-slate-500">
        Loading Portal Gateway...
      </div>
    }>
      <PortalAuthContent />
    </Suspense>
  );
}
