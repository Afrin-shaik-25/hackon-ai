'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Sparkles, CheckCircle2, User, GraduationCap, Briefcase, Cpu } from 'lucide-react';

export default function GraduateResumeBuilderPage() {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);

  // Resume State
  const [personal, setPersonal] = useState({
    name: 'Sneha Mukherjee',
    email: 'sneha.m@graduate.example.com',
    phone: '+91 98765 43210',
    location: 'Bengaluru, Karnataka',
    linkedin: 'linkedin.com/in/sneha-mukherjee',
    summary: 'Proactive Information Technology graduate with expertise in distributed microservices, TypeScript, and React. Winner of State Hackathon 2026.',
  });

  const [education, setEducation] = useState({
    college: 'National School of Applied Sciences',
    degree: 'B.Tech in Information Technology',
    period: '2022 - 2026',
    cgpa: '8.8 / 10',
  });

  const [skills, setSkills] = useState('React, TypeScript, Node.js, Go, PostgreSQL, Docker, Redis, Tailwind CSS');

  const [experience, setExperience] = useState({
    role: 'Full-Stack Engineering Intern',
    company: 'CloudMatrix AI Labs',
    period: 'May 2025 - Jul 2025',
    bullets: 'Built responsive client dashboards in React and Next.js.\nOptimized backend PostgreSQL queries, reducing latency by 24%.\nCollaborated in agile sprint cycles with automated CI/CD pipelines.',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Interactive Resume Builder</h1>
            <p className="text-xs text-slate-500 mt-1">
              ATS-compatible resume composer with live formatting and verified capstone inclusion
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="primary" size="sm" onClick={handlePrint} className="gap-1.5 shadow-xs">
              <Download className="w-4 h-4" />
              <span>Export / Print PDF</span>
            </Button>
          </div>
        </div>

        {/* Step Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-semibold">
          {[
            { num: 1, label: '1. Personal & Summary' },
            { num: 2, label: '2. Education' },
            { num: 3, label: '3. Skills & Experience' },
            { num: 4, label: '4. Preview & Export' },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setActiveStep(s.num as 1 | 2 | 3 | 4)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeStep === s.num
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Editor Column */}
          <div className="space-y-4">
            {activeStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Personal Details &amp; Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={personal.name}
                      onChange={(e) => setPersonal({ ...personal, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={personal.email}
                        onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Phone</label>
                      <input
                        type="text"
                        value={personal.phone}
                        onChange={(e) => setPersonal({ ...personal, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Professional Summary</label>
                    <textarea
                      rows={3}
                      value={personal.summary}
                      onChange={(e) => setPersonal({ ...personal, summary: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
                    />
                  </div>
                  <Button variant="primary" size="sm" onClick={() => setActiveStep(2)}>
                    Next: Education &rarr;
                  </Button>
                </CardContent>
              </Card>
            )}

            {activeStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Education Credentials</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">College / University</label>
                    <input
                      type="text"
                      value={education.college}
                      onChange={(e) => setEducation({ ...education, college: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Degree &amp; Major</label>
                    <input
                      type="text"
                      value={education.degree}
                      onChange={(e) => setEducation({ ...education, degree: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Period</label>
                      <input
                        type="text"
                        value={education.period}
                        onChange={(e) => setEducation({ ...education, period: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">CGPA / Grade</label>
                      <input
                        type="text"
                        value={education.cgpa}
                        onChange={(e) => setEducation({ ...education, cgpa: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setActiveStep(1)}>Back</Button>
                    <Button variant="primary" size="sm" onClick={() => setActiveStep(3)}>Next: Skills &rarr;</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeStep >= 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Skills &amp; Internship Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Core Technical Skills</label>
                    <input
                      type="text"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
                    />
                  </div>
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <label className="block font-semibold text-slate-700">Internship Details</label>
                    <input
                      type="text"
                      value={experience.role}
                      onChange={(e) => setExperience({ ...experience, role: e.target.value })}
                      placeholder="Role title"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50 mb-2"
                    />
                    <input
                      type="text"
                      value={experience.company}
                      onChange={(e) => setExperience({ ...experience, company: e.target.value })}
                      placeholder="Company name"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50 mb-2"
                    />
                    <textarea
                      rows={3}
                      value={experience.bullets}
                      onChange={(e) => setExperience({ ...experience, bullets: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setActiveStep(2)}>Back</Button>
                    <Button variant="primary" size="sm" onClick={() => setActiveStep(4)}>Preview &rarr;</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">AI Resume Optimization Tip</p>
                <p className="mt-0.5 leading-relaxed text-indigo-800/90 text-[11px]">
                  Action-oriented metrics like &ldquo;reducing latency by 24%&rdquo; score 40% higher on applicant tracking filters than vague duty descriptions.
                </p>
              </div>
            </div>
          </div>

          {/* Live Document Preview Column */}
          <div className="border border-slate-300 rounded-2xl bg-white p-8 shadow-md text-slate-900 space-y-5 print:border-none print:shadow-none print:p-0">
            <div className="border-b border-slate-200 pb-4 text-center">
              <h2 className="text-xl font-bold tracking-tight text-slate-900">{personal.name}</h2>
              <p className="text-xs text-slate-500 mt-1">
                {personal.email} &bull; {personal.phone} &bull; {personal.location}
              </p>
            </div>

            <div className="space-y-1 text-xs">
              <h3 className="font-bold uppercase tracking-wider text-slate-800 text-[11px] border-b border-slate-200 pb-1">
                Professional Summary
              </h3>
              <p className="text-slate-700 leading-relaxed pt-1">{personal.summary}</p>
            </div>

            <div className="space-y-1 text-xs">
              <h3 className="font-bold uppercase tracking-wider text-slate-800 text-[11px] border-b border-slate-200 pb-1">
                Education
              </h3>
              <div className="flex justify-between pt-1">
                <strong>{education.college}</strong>
                <span className="text-slate-500">{education.period}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{education.degree}</span>
                <span>CGPA: {education.cgpa}</span>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <h3 className="font-bold uppercase tracking-wider text-slate-800 text-[11px] border-b border-slate-200 pb-1">
                Technical Skills
              </h3>
              <p className="text-slate-700 pt-1">{skills}</p>
            </div>

            <div className="space-y-1 text-xs">
              <h3 className="font-bold uppercase tracking-wider text-slate-800 text-[11px] border-b border-slate-200 pb-1">
                Experience
              </h3>
              <div className="flex justify-between pt-1">
                <strong>{experience.role} &mdash; {experience.company}</strong>
                <span className="text-slate-500">{experience.period}</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-slate-600 pt-1">
                {experience.bullets.split('\n').map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
