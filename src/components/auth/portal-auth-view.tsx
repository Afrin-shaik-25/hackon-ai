'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { UserRole } from '@/types';
import {
  GraduationCap,
  Briefcase,
  Award,
  Users,
  Building2,
  Shield,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

export type PortalKey = 'student' | 'graduate' | 'graduated-person' | 'faculty' | 'company' | 'admin';

export interface PortalConfig {
  key: PortalKey;
  label: string;
  title: string;
  loginSubtitle: string;
  signupSubtitle: string;
  backendRole: UserRole;
  dashboardPath: string;
  defaultEmail: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const PORTAL_METADATA: Record<PortalKey, PortalConfig> = {
  student: {
    key: 'student',
    label: 'Student',
    title: 'Student Portal',
    loginSubtitle: 'Sign in to access your student academic dashboard and performance metrics',
    signupSubtitle: 'Create your student account to track courses, assignments, and grades',
    backendRole: 'student',
    dashboardPath: '/student/dashboard',
    defaultEmail: 'student01@studylens.ai',
    icon: GraduationCap,
  },
  graduate: {
    key: 'graduate',
    label: 'Graduate',
    title: 'Graduate Portal',
    loginSubtitle: 'Sign in to access placement prep, ATS resume builder, and aptitude simulators',
    signupSubtitle: 'Create your graduate profile to simulate interviews and apply for jobs',
    backendRole: 'graduate',
    dashboardPath: '/graduate/dashboard',
    defaultEmail: 'graduate01@studylens.ai',
    icon: Briefcase,
  },
  'graduated-person': {
    key: 'graduated-person',
    label: 'Graduated Person',
    title: 'Graduated Person Portal',
    loginSubtitle: 'Sign in to access alumni network, career records, and student mentorship',
    signupSubtitle: 'Create your alumni account to connect with current students and campus peers',
    backendRole: 'graduate',
    dashboardPath: '/graduate/dashboard',
    defaultEmail: 'graduate05@studylens.ai',
    icon: Award,
  },
  faculty: {
    key: 'faculty',
    label: 'Faculty',
    title: 'Faculty Portal',
    loginSubtitle: 'Sign in to access faculty cohort mentoring and academic advising',
    signupSubtitle: 'Register your faculty credentials to manage student advising rosters',
    backendRole: 'faculty',
    dashboardPath: '/faculty/dashboard',
    defaultEmail: 'faculty01@studylens.ai',
    icon: Users,
  },
  company: {
    key: 'company',
    label: 'Company',
    title: 'Company Portal',
    loginSubtitle: 'Sign in to access candidate discovery, skill passports, and job postings',
    signupSubtitle: 'Register your organization to hire verified students and review capstones',
    backendRole: 'company',
    dashboardPath: '/company/dashboard',
    defaultEmail: 'company01@studylens.ai',
    icon: Building2,
  },
  admin: {
    key: 'admin',
    label: 'Administrator',
    title: 'Administrator Portal',
    loginSubtitle: 'Sign in with institutional admin privileges to manage platform operations',
    signupSubtitle: 'System administrator provisioning console',
    backendRole: 'admin',
    dashboardPath: '/admin/dashboard',
    defaultEmail: 'admin@studylens.ai',
    icon: Shield,
  },
};

interface PortalAuthViewProps {
  initialPortal?: PortalKey;
  initialMode?: 'login' | 'signup';
  allowPortalSwitch?: boolean;
}

export function PortalAuthView({
  initialPortal = 'student',
  initialMode = 'login',
  allowPortalSwitch = true,
}: PortalAuthViewProps) {
  const router = useRouter();
  const { login, register, setRole } = useAuth();

  const [activePortal, setActivePortal] = useState<PortalKey>(initialPortal);
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);

  // Sync when initialPortal changes
  useEffect(() => {
    if (initialPortal) {
      setActivePortal(initialPortal);
    }
  }, [initialPortal]);

  useEffect(() => {
    if (initialMode) {
      setMode(initialMode);
    }
  }, [initialMode]);

  const currentConfig = PORTAL_METADATA[activePortal] || PORTAL_METADATA.student;

  // Login form state
  const [loginEmail, setLoginEmail] = useState(currentConfig.defaultEmail);
  const [loginPassword, setLoginPassword] = useState('password123');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Update default email when active portal changes
  const handlePortalSwitch = (portalKey: PortalKey) => {
    setActivePortal(portalKey);
    const cfg = PORTAL_METADATA[portalKey];
    setLoginEmail(cfg.defaultEmail);
    setLoginPassword('password123');
    setLoginError('');
    setSignupError('');
  };

  // Signup form state (common)
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [signupAgree, setSignupAgree] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState('');

  // Portal-specific signup fields
  // Student
  const [degree, setDegree] = useState('B.Tech');
  const [branch, setBranch] = useState('Computer Science & Engineering');
  const [semester, setSemester] = useState('5');
  const [college, setCollege] = useState('Apex Institute of Technology');

  // Graduate
  const [gradDegree, setGradDegree] = useState('B.Tech Computer Science');
  const [gradYear, setGradYear] = useState('2026');
  const [gradDomain, setGradDomain] = useState('Full-Stack Software Engineering');

  // Graduated Person / Alumni
  const [alumniDegree, setAlumniDegree] = useState('B.Tech Computer Science');
  const [alumniPassYear, setAlumniPassYear] = useState('2024');
  const [alumniCompany, setAlumniCompany] = useState('CloudScale Solutions');
  const [alumniRole, setAlumniRole] = useState('Associate Software Engineer');

  // Faculty
  const [facultyDept, setFacultyDept] = useState('Computer Science & Engineering');
  const [facultyDesignation, setFacultyDesignation] = useState('Associate Professor');
  const [employeeId, setEmployeeId] = useState('FAC-CS-042');

  // Company
  const [companyName, setCompanyName] = useState('NexaTech Systems');
  const [industry, setIndustry] = useState('Enterprise Cloud Solutions');
  const [recruiterDesignation, setRecruiterDesignation] = useState('University Talent Lead');

  // Handle Login submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const emailTrimmed = loginEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed || !emailRegex.test(emailTrimmed)) {
      setLoginError('Please enter a valid institutional email address.');
      return;
    }

    if (!loginPassword) {
      setLoginError('Please enter your password.');
      return;
    }

    setLoginLoading(true);
    try {
      const res = await login(emailTrimmed, currentConfig.backendRole, loginPassword);
      setLoginLoading(false);

      if (!res.success) {
        setLoginError(res.error || 'Invalid institutional email or password. Please verify your credentials.');
        return;
      }

      setRole(currentConfig.backendRole);
      router.push(currentConfig.dashboardPath);
    } catch {
      setLoginLoading(false);
      setLoginError('Connection failure. Please verify the backend service is running.');
    }
  };

  // Handle Signup submission
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');

    if (!signupName.trim()) {
      setSignupError('Please enter your full name.');
      return;
    }

    const emailTrimmed = signupEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed || !emailRegex.test(emailTrimmed)) {
      setSignupError('Please enter a valid institutional email address.');
      return;
    }

    const cleanedPhone = signupPhone.replace(/\D/g, '');
    if (cleanedPhone.length !== 10) {
      setSignupError('Phone number must contain exactly 10 digits.');
      return;
    }

    if (!signupPassword || signupPassword.length < 8) {
      setSignupError('Password must be at least 8 characters long.');
      return;
    }

    if (!signupAgree) {
      setSignupError('Please agree to the Terms of Service & Privacy Policy.');
      return;
    }

    setSignupLoading(true);

    const payload: any = {
      name: signupName.trim(),
      email: emailTrimmed,
      phone: cleanedPhone,
      password: signupPassword,
      role: currentConfig.backendRole,
      college,
      department: facultyDept || branch,
    };

    if (activePortal === 'student') {
      payload.student_type = 'Undergraduate';
      payload.degree = degree;
      payload.branch = branch;
      payload.semester = Number(semester);
      payload.year = Math.ceil(Number(semester) / 2);
    } else if (activePortal === 'graduate') {
      payload.grad_degree = gradDegree;
      payload.grad_year = Number(gradYear);
      payload.grad_domain = gradDomain;
      payload.degree = gradDegree;
    } else if (activePortal === 'graduated-person') {
      payload.degree = alumniDegree;
      payload.grad_year = Number(alumniPassYear);
      payload.company_name = alumniCompany;
      payload.designation = alumniRole;
      payload.grad_domain = alumniRole;
    } else if (activePortal === 'faculty') {
      payload.department = facultyDept;
      payload.designation = facultyDesignation;
      payload.employee_id = employeeId;
    } else if (activePortal === 'company') {
      payload.company_name = companyName;
      payload.industry = industry;
      payload.recruiter_role = recruiterDesignation;
    }

    try {
      const res = await register(payload);
      setSignupLoading(false);

      if (!res.success) {
        setSignupError(res.error || 'Registration failed. Please check your details.');
        return;
      }

      setRole(currentConfig.backendRole);
      router.push(currentConfig.dashboardPath);
    } catch {
      setSignupLoading(false);
      setSignupError('Registration request could not be processed. Please check backend connection.');
    }
  };

  const portalKeys: PortalKey[] = ['student', 'graduate', 'graduated-person', 'faculty', 'company'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 flex flex-col justify-between p-4 sm:p-6 lg:p-8 antialiased selection:bg-blue-500 selection:text-white">
      {/* Top Header: Back to Home & Portal Switcher */}
      <div className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-xs sm:text-sm font-medium bg-white/10 hover:bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {allowPortalSwitch && (
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 overflow-x-auto max-w-full">
            {portalKeys.map((pKey) => {
              const cfg = PORTAL_METADATA[pKey];
              const isActive = pKey === activePortal;
              return (
                <button
                  key={pKey}
                  type="button"
                  onClick={() => handlePortalSwitch(pKey)}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-white text-blue-700 shadow-md'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cfg.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Centered Authentication Area */}
      <div className="flex-1 flex flex-col items-center justify-center my-8">
        {/* Brand Logo, App Name & Tagline */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 text-white shadow-lg mx-auto mb-1">
            <GraduationCap className="w-8 h-8 drop-shadow-sm" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-xs">
            StudyLens AI
          </h1>
          <p className="text-xs sm:text-sm text-blue-100/90 font-medium max-w-md mx-auto">
            Smart Academic &amp; Career Analytics Platform
          </p>
        </div>

        {/* Single Centered White Card (CampusFind Design Reference) */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20 transition-all duration-200">
          {mode === 'login' ? (
            /* ========================================================
               LOGIN FORM VIEW
               ======================================================== */
            <div>
              {/* Heading & Subtitle */}
              <div className="mb-6 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold uppercase tracking-wider mb-2">
                  <span>{currentConfig.title}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Welcome Back
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                  {currentConfig.loginSubtitle}
                </p>
              </div>

              {/* Red Inline Error Banner */}
              {loginError && (
                <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Email Field */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. user@institution.edu"
                    className="w-full h-11 px-3.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Password Field with Eye Icon */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full h-11 pl-3.5 pr-10 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                    >
                      {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span>Remember Me</span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Full-width Blue Login Button */}
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg shadow-sm transition-all duration-150 text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                  {loginLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <span>Login</span>
                  )}
                </button>
              </form>

              {/* Bottom Switch: Don't have an account? Create New Account */}
              <div className="mt-6 pt-5 border-t border-slate-100 text-center">
                <p className="text-xs sm:text-sm text-slate-600">
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setLoginError('');
                    }}
                    className="text-blue-600 hover:text-blue-700 font-bold hover:underline cursor-pointer"
                  >
                    Create New Account
                  </button>
                </p>
              </div>
            </div>
          ) : (
            /* ========================================================
               SIGN-UP FORM VIEW (Single card, never side-by-side)
               ======================================================== */
            <div>
              {/* Heading & Subtitle */}
              <div className="mb-6 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold uppercase tracking-wider mb-2">
                  <span>{currentConfig.title} &bull; Registration</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Create Account
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                  {currentConfig.signupSubtitle}
                </p>
              </div>

              {/* Red Inline Error Banner */}
              {signupError && (
                <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{signupError}</span>
                </div>
              )}

              {/* Registration Form */}
              <form onSubmit={handleSignupSubmit} className="space-y-3.5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="e.g. user@institution.edu"
                    className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Phone Number (Strictly 10 digits) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number (10 Digits) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={signupPhone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setSignupPhone(val);
                    }}
                    placeholder="e.g. 9876543210"
                    className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {signupPhone.length > 0 && signupPhone.length < 10 && (
                    <p className="text-[10px] text-amber-600 mt-0.5">
                      Enter {10 - signupPhone.length} more digits
                    </p>
                  )}
                </div>

                {/* Password with Eye Icon */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password (Min 8 Characters) *
                  </label>
                  <div className="relative">
                    <input
                      type={showSignupPassword ? 'text' : 'password'}
                      required
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                      className="w-full h-10 pl-3 pr-10 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      aria-label={showSignupPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                    >
                      {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* ================= PORTAL-SPECIFIC REGISTRATION FIELDS ================= */}
                {activePortal === 'student' && (
                  <div className="space-y-3 pt-1 border-t border-slate-100">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Degree</label>
                        <select
                          value={degree}
                          onChange={(e) => setDegree(e.target.value)}
                          className="w-full h-9 px-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                        >
                          <option>B.Tech</option>
                          <option>B.E.</option>
                          <option>BCA</option>
                          <option>M.Tech</option>
                          <option>MCA</option>
                          <option>B.Sc</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Semester</label>
                        <select
                          value={semester}
                          onChange={(e) => setSemester(e.target.value)}
                          className="w-full h-9 px-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                            <option key={s} value={s}>Semester {s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Branch / Major</label>
                      <input
                        type="text"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        placeholder="e.g. Computer Science & Engineering"
                        className="w-full h-9 px-2.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                {activePortal === 'graduate' && (
                  <div className="space-y-3 pt-1 border-t border-slate-100">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Grad Degree</label>
                        <input
                          type="text"
                          value={gradDegree}
                          onChange={(e) => setGradDegree(e.target.value)}
                          placeholder="e.g. B.Tech CSE"
                          className="w-full h-9 px-2.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Graduation Year</label>
                        <select
                          value={gradYear}
                          onChange={(e) => setGradYear(e.target.value)}
                          className="w-full h-9 px-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                        >
                          <option>2025</option>
                          <option>2026</option>
                          <option>2027</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Target Career Domain</label>
                      <input
                        type="text"
                        value={gradDomain}
                        onChange={(e) => setGradDomain(e.target.value)}
                        placeholder="e.g. Full-Stack Engineering / Cloud"
                        className="w-full h-9 px-2.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                {activePortal === 'graduated-person' && (
                  <div className="space-y-3 pt-1 border-t border-slate-100">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Alumni Degree</label>
                        <input
                          type="text"
                          value={alumniDegree}
                          onChange={(e) => setAlumniDegree(e.target.value)}
                          placeholder="e.g. B.Tech Computer Science"
                          className="w-full h-9 px-2.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Passing Year</label>
                        <select
                          value={alumniPassYear}
                          onChange={(e) => setAlumniPassYear(e.target.value)}
                          className="w-full h-9 px-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                        >
                          <option>2024</option>
                          <option>2023</option>
                          <option>2022</option>
                          <option>2021</option>
                          <option>2020</option>
                          <option>2019</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Current Company</label>
                        <input
                          type="text"
                          value={alumniCompany}
                          onChange={(e) => setAlumniCompany(e.target.value)}
                          placeholder="e.g. CloudScale Solutions"
                          className="w-full h-9 px-2.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Current Role</label>
                        <input
                          type="text"
                          value={alumniRole}
                          onChange={(e) => setAlumniRole(e.target.value)}
                          placeholder="e.g. Software Engineer"
                          className="w-full h-9 px-2.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activePortal === 'faculty' && (
                  <div className="space-y-3 pt-1 border-t border-slate-100">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Department Name</label>
                      <input
                        type="text"
                        value={facultyDept}
                        onChange={(e) => setFacultyDept(e.target.value)}
                        placeholder="e.g. Computer Science & Engineering"
                        className="w-full h-9 px-2.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Designation</label>
                        <input
                          type="text"
                          value={facultyDesignation}
                          onChange={(e) => setFacultyDesignation(e.target.value)}
                          placeholder="e.g. Associate Professor"
                          className="w-full h-9 px-2.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Employee ID</label>
                        <input
                          type="text"
                          value={employeeId}
                          onChange={(e) => setEmployeeId(e.target.value)}
                          placeholder="e.g. FAC-CS-042"
                          className="w-full h-9 px-2.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activePortal === 'company' && (
                  <div className="space-y-3 pt-1 border-t border-slate-100">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Company Name</label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. NexaTech Systems"
                        className="w-full h-9 px-2.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Industry Domain</label>
                        <input
                          type="text"
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                          placeholder="e.g. Cloud & AI"
                          className="w-full h-9 px-2.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Recruiter Role</label>
                        <input
                          type="text"
                          value={recruiterDesignation}
                          onChange={(e) => setRecruiterDesignation(e.target.value)}
                          placeholder="e.g. Talent Lead"
                          className="w-full h-9 px-2.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Terms & Conditions Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-2 cursor-pointer select-none text-xs text-slate-600">
                    <input
                      type="checkbox"
                      checked={signupAgree}
                      onChange={(e) => setSignupAgree(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span>
                      I agree to the <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                    </span>
                  </label>
                </div>

                {/* Full-width Blue Create Account Button */}
                <button
                  type="submit"
                  disabled={signupLoading}
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg shadow-sm transition-all duration-150 text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-3"
                >
                  {signupLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <span>Create Account</span>
                  )}
                </button>
              </form>

              {/* Bottom Switch: Already have an account? Login */}
              <div className="mt-5 pt-4 border-t border-slate-100 text-center">
                <p className="text-xs sm:text-sm text-slate-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setSignupError('');
                    }}
                    className="text-blue-600 hover:text-blue-700 font-bold hover:underline cursor-pointer"
                  >
                    Login
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Branding */}
      <div className="w-full max-w-5xl mx-auto text-center pb-2">
        <p className="text-xs text-blue-100/70">
          &copy; {new Date().getFullYear()} StudyLens AI &bull; Secure Institutional Portal
        </p>
      </div>
    </div>
  );
}
