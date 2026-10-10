'use client';

import React, { useState, useEffect } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth/auth-context';
import api from '@/lib/api-client';
import { UserCheck, Mail, Building, Award, Calendar, BookOpen, Edit3, CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';

export default function FacultyProfilePage() {
  const { user } = useAuth();
  
  const [department, setDepartment] = useState<string>('Department of Computer Science & Engineering');
  const [designation, setDesignation] = useState<string>('Professor');
  const [college, setCollege] = useState<string>('Apex Institute of Technology');
  const [employeeId, setEmployeeId] = useState<string>('FAC-CS-042');
  
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editDept, setEditDept] = useState<string>('');
  const [editDesignation, setEditDesignation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadFacultyProfile() {
      const res = await api.faculty.getProfile();
      if (res.data) {
        if (res.data.department) setDepartment(res.data.department);
        if (res.data.designation) setDesignation(res.data.designation);
        if (res.data.college) setCollege(res.data.college);
        if (res.data.employee_id) setEmployeeId(res.data.employee_id);
      } else if (user) {
        if (user.department) setDepartment(user.department);
        if (user.college) setCollege(user.college);
        if (user.employeeId) setEmployeeId(user.employeeId);
      }
    }
    loadFacultyProfile();
  }, [user]);

  const handleOpenEdit = () => {
    setEditDept(department);
    setEditDesignation(designation);
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsEditing(true);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editDept.trim()) {
      setErrorMsg('Department name is required and cannot be empty.');
      return;
    }
    
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const res = await api.faculty.updateProfile({
      department: editDept.trim(),
      designation: editDesignation.trim() || designation,
    });

    setLoading(false);

    if (res.error) {
      setErrorMsg(res.error);
    } else if (res.data) {
      setDepartment(res.data.department);
      if (res.data.designation) setDesignation(res.data.designation);
      setSuccessMsg('Department and profile successfully updated in the database.');
      setIsEditing(false);
    } else {
      // Local fallback if offline mode
      setDepartment(editDept.trim());
      setSuccessMsg('Department updated successfully.');
      setIsEditing(false);
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Faculty Academic Profile</h1>
          <p className="text-xs text-slate-500 mt-1">
            Instructor credentials, assigned department, and institutional advising allocations
          </p>
        </div>

        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
            <button onClick={() => setSuccessMsg(null)} className="text-emerald-600 hover:text-emerald-900">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <Card>
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 border-b border-slate-100 pb-6">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-md">
                {user?.name?.charAt(0) || 'K'}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900">{user?.name || 'Dr. K. Raman'}</h2>
                  <Badge variant="success" className="gap-1">
                    <UserCheck className="w-3 h-3" /> Verified Faculty
                  </Badge>
                </div>
                <p className="text-xs text-slate-600">
                  {designation} &bull; {department}
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  Employee ID: {employeeId} &bull; {college}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 self-start sm:self-auto"
                onClick={handleOpenEdit}
              >
                <Edit3 className="w-4 h-4 text-indigo-600" />
                Update Department
              </Button>
            </div>

            {isEditing && (
              <form onSubmit={handleSaveProfile} className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Building className="w-4 h-4 text-indigo-600" />
                    Update Departmental Profile
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Department Name *</label>
                    <Input
                      value={editDept}
                      onChange={(e) => setEditDept(e.target.value)}
                      placeholder="e.g. Department of Computer Science & Engineering"
                      className="bg-white text-xs"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Academic Designation</label>
                    <Input
                      value={editDesignation}
                      onChange={(e) => setEditDesignation(e.target.value)}
                      placeholder="e.g. Professor / Associate Professor"
                      className="bg-white text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(false)}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                        Saving to Database...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  Assigned Teaching Courses (Fall 2026)
                </h4>
                <ul className="space-y-1.5 text-slate-600">
                  <li>&bull; CS501: Design &amp; Analysis of Algorithms (Section A &amp; B)</li>
                  <li>&bull; CS502: Database Management Systems (Section A)</li>
                  <li>&bull; CS506: Distributed Systems Capstone Mentor</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  Advising &amp; Office Hours
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  Tuesdays &amp; Thursdays: 03:00 PM &ndash; 05:00 PM<br />
                  Location: Faculty Block C, Room 304<br />
                  Assigned Cohort: {department} (148 students)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
