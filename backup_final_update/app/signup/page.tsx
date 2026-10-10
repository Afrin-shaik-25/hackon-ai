'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, ArrowRight, CheckCircle2, ShieldAlert, LogIn, UserPlus } from 'lucide-react';
import { DemoBanner } from '@/components/shared/demo-banner';

export default function SignupPage() {
  const router = useRouter();
  const { login, setRole, updateProfile } = useAuth();

  const [role, setLocalRole] = useState<'student' | 'faculty' | 'graduate' | 'company'>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Required Student Academic Profile Fields
  const [studentType, setStudentType] = useState<'Undergraduate' | 'Graduate'>('Undergraduate');
  const [college, setCollege] = useState('Apex Institute of Technology');
  const [degree, setDegree] = useState('B.Tech');
  const [branch, setBranch] = useState('Computer Science & Engineering');
  const [academicYear, setAcademicYear] = useState('3');
  const [semester, setSemester] = useState('5');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!agreeTerms) {
      setError('You must acknowledge the terms and responsible AI guidelines.');
      return;
    }

    if (!name || !email || !password) {
      setError('Please fill in your name, email, and password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login(email, role);
      setRole(role);

      // Persist profile details
      updateProfile({
        name,
        email,
        college,
        studentType,
        degree,
        branch,
        department: branch,
        year: Number(academicYear),
        semester: Number(semester),
      });

      router.push(`/${role}/dashboard`);
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <DemoBanner />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-xl space-y-6">
          <div className="text-center space-y-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-2xl text-slate-900 tracking-tight">StudyLens AI</span>
            </Link>
            <h1 className="text-xl font-bold text-slate-900">Get Started with StudyLens AI</h1>
            <p className="text-xs text-slate-500">
              Join the student success and academic analytics platform
            </p>
          </div>

          {/* Clean Navigation Toggle: Login vs Signup */}
          <div className="flex items-center justify-center gap-1 p-1 bg-slate-200/80 rounded-xl text-xs font-semibold max-w-sm mx-auto">
            <Link href="/login" className="flex-1 text-center py-2 rounded-lg text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-center gap-1.5">
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>
            <div className="flex-1 text-center py-2 rounded-lg bg-white text-indigo-700 shadow-xs flex items-center justify-center gap-1.5 font-bold">
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create Account</span>
            </div>
          </div>

          <Card className="shadow-lg border-slate-200">
            <CardContent className="p-6 sm:p-8 space-y-5">
              {/* Role Selection */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Select User Role *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'student', label: 'Student' },
                    { id: 'faculty', label: 'Faculty' },
                    { id: 'graduate', label: 'Graduate' },
                    { id: 'company', label: 'Company' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setLocalRole(r.id as 'student' | 'faculty' | 'graduate' | 'company')}
                      className={`p-2.5 rounded-lg font-semibold text-center border transition-all cursor-pointer ${
                        role === r.id
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSignup} className="space-y-4 text-xs">
                {/* Standard Account Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arav Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="arav.sharma@apex.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                {/* STUDENT-SPECIFIC ENROLLMENT FIELDS */}
                {role === 'student' && (
                  <div className="p-4 rounded-xl bg-indigo-50/40 border border-indigo-100 space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-indigo-600" />
                        Academic Enrollment Profile
                      </span>
                      <Badge variant="info" className="text-[10px]">Personalized Syllabus</Badge>
                    </div>

                    {/* Student Type */}
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1.5">Student Level / Type *</label>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {(['Undergraduate', 'Graduate'] as const).map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setStudentType(type)}
                            className={`py-2 px-3 rounded-lg border font-medium text-center transition-all ${
                              studentType === type
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* College & Degree */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">College / University *</label>
                        <select
                          value={college}
                          onChange={(e) => setCollege(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-indigo-600"
                        >
                          <option value="Apex Institute of Technology">Apex Institute of Technology</option>
                          <option value="National Institute of Technology">National Institute of Technology</option>
                          <option value="Consortium Engineering College">Consortium Engineering College</option>
                          <option value="State Institute of Applied Sciences">State Institute of Applied Sciences</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Degree Program *</label>
                        <select
                          value={degree}
                          onChange={(e) => setDegree(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-indigo-600"
                        >
                          <option value="B.Tech">B.Tech (Bachelor of Technology)</option>
                          <option value="B.E.">B.E. (Bachelor of Engineering)</option>
                          <option value="BCA">BCA (Computer Applications)</option>
                          <option value="B.Sc">B.Sc Computer Science</option>
                          <option value="M.Tech">M.Tech (Master of Technology)</option>
                          <option value="MCA">MCA (Master of Computer Applications)</option>
                        </select>
                      </div>
                    </div>

                    {/* Branch / Department */}
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Branch / Major *</label>
                      <select
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-indigo-600"
                      >
                        <option value="Computer Science & Engineering">Computer Science &amp; Engineering</option>
                        <option value="Data Science & AI">Data Science &amp; AI</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Electronics & Communication">Electronics &amp; Communication</option>
                      </select>
                    </div>

                    {/* Academic Year & Semester */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Year of Study *</label>
                        <select
                          value={academicYear}
                          onChange={(e) => setAcademicYear(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-indigo-600"
                        >
                          <option value="1">1st Year</option>
                          <option value="2">2nd Year</option>
                          <option value="3">3rd Year</option>
                          <option value="4">4th Year</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Current Semester *</label>
                        <select
                          value={semester}
                          onChange={(e) => setSemester(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-indigo-600"
                        >
                          <option value="1">Semester 1</option>
                          <option value="2">Semester 2</option>
                          <option value="3">Semester 3</option>
                          <option value="4">Semester 4</option>
                          <option value="5">Semester 5</option>
                          <option value="6">Semester 6</option>
                          <option value="7">Semester 7</option>
                          <option value="8">Semester 8</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Password Field */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Create Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="Minimum 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600"
                  />
                </div>

                {/* Terms Acknowledgement */}
                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-[11px] text-slate-500 leading-snug cursor-pointer">
                    I agree to the <Link href="/terms" className="text-indigo-600 underline">Terms of Service</Link> and{' '}
                    <Link href="/privacy" className="text-indigo-600 underline">Responsible AI Privacy Policy</Link>.
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  variant="primary"
                  className="w-full justify-center gap-1.5 font-bold shadow-md h-10 text-xs mt-2"
                >
                  {loading ? (
                    <span>Creating Account...</span>
                  ) : (
                    <>
                      <span>Complete Signup &amp; Enter Portal</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
              </form>

              <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-500">
                Already have an account?{' '}
                <Link href="/login" className="font-bold text-indigo-600 hover:underline">
                  Sign in here
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
