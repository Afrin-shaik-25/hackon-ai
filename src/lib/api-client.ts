/**
 * StudyLens AI - Centralized FastAPI Client
 * Provides typed, resilient communication with the Python FastAPI backend.
 * Falls back gracefully when the backend server is offline or in client demo mode.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  isBackendConnected: boolean;
}

export interface CodeExecutionResult {
  language: string;
  stdout: string;
  stderr: string;
  exit_code: number;
  execution_time_ms: number;
  status: 'success' | 'compilation_error' | 'runtime_error' | 'timeout' | 'service_unavailable';
  service_configured: boolean;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem('studylens_token');
    } catch {
      return null;
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        let errorMsg = `Server error (${response.status})`;
        try {
          const errData = await response.json();
          errorMsg = errData.detail || errorMsg;
        } catch {
          // ignore parsing error
        }
        return { data: null, error: errorMsg, isBackendConnected: true };
      }

      const data = await response.json();
      return { data, error: null, isBackendConnected: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network connection error';
      return { data: null, error: msg, isBackendConnected: false };
    }
  }

  // 1. AUTHENTICATION APIS
  auth = {
    login: async (email: string, password: string, role?: string) => {
      const res = await this.request<{ access_token: string; role: string; user: any }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password, role }),
      });
      if (res.data?.access_token && typeof window !== 'undefined') {
        try {
          localStorage.setItem('studylens_token', res.data.access_token);
          localStorage.setItem('studylens_role', res.data.role);
        } catch {}
      }
      return res;
    },

    register: async (payload: any) => {
      const res = await this.request<{ access_token: string; role: string; user: any }>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      if (res.data?.access_token && typeof window !== 'undefined') {
        try {
          localStorage.setItem('studylens_token', res.data.access_token);
          localStorage.setItem('studylens_role', res.data.role);
        } catch {}
      }
      return res;
    },

    getMe: () => this.request<any>('/api/auth/me'),

    logout: async () => {
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('studylens_token');
        } catch {}
      }
      return this.request<{ status: string }>('/api/auth/logout', { method: 'POST' });
    },
  };

  // 2. STUDENT PORTAL APIS
  student = {
    getDashboard: () => this.request<any>('/api/student/dashboard'),
    getProfile: () => this.request<any>('/api/student/profile'),
    updateProfile: (data: any) => this.request<any>('/api/student/profile', { method: 'PUT', body: JSON.stringify(data) }),
    getAcademics: (semester?: number) => this.request<any[]>(`/api/student/academics${semester ? `?semester=${semester}` : ''}`),
    getBacklogs: () => this.request<any[]>('/api/student/backlogs'),
    getSubjects: (semester?: number, degree?: string, branch?: string) => {
      const params = new URLSearchParams();
      if (semester) params.append('semester', semester.toString());
      if (degree) params.append('degree', degree);
      if (branch) params.append('branch', branch);
      return this.request<any[]>(`/api/student/subjects?${params.toString()}`);
    },
    getAttendance: () => this.request<any[]>('/api/student/attendance'),
    getAssessments: () => this.request<any[]>('/api/student/assessments'),
    getTasks: () => this.request<any[]>('/api/student/tasks'),
    createTask: (task: { title: string; due_date: string; priority?: string; category?: string; description?: string }) =>
      this.request<any>('/api/student/tasks', { method: 'POST', body: JSON.stringify(task) }),
    toggleTask: (taskId: string) => this.request<any>(`/api/student/tasks/${taskId}/toggle`, { method: 'PATCH' }),
    deleteTask: (taskId: string) => this.request<any>(`/api/student/tasks/${taskId}`, { method: 'DELETE' }),
    getExams: () => this.request<any[]>('/api/student/exams'),
    toggleExamReminders: (examId: string) => this.request<any>(`/api/student/exams/${examId}/reminders`, { method: 'PATCH' }),
    logFocus: (durationMinutes: number, targetTask?: string) =>
      this.request<any>('/api/student/focus', { method: 'POST', body: JSON.stringify({ duration_minutes: durationMinutes, target_task: targetTask }) }),
    submitFeedback: (data: { category: string; rating: number; comment: string; subject_code?: string }) =>
      this.request<any>('/api/student/feedback', { method: 'POST', body: JSON.stringify(data) }),
    getFeedbacks: () => this.request<any[]>('/api/student/feedback'),
  };

  // 3. CODING PLAYGROUND EXECUTION API
  code = {
    execute: (language: string, code: string, stdinInput?: string) =>
      this.request<CodeExecutionResult>('/api/code/execute', {
        method: 'POST',
        body: JSON.stringify({ language, code, stdin_input: stdinInput || null }),
      }),
  };

  // 4. FACULTY PORTAL APIS
  faculty = {
    getDashboard: () => this.request<any>('/api/faculty/dashboard'),
    getProfile: () => this.request<any>('/api/faculty/profile'),
    updateProfile: (data: { department?: string; designation?: string; college?: string; name?: string }) =>
      this.request<any>('/api/faculty/profile', { method: 'PUT', body: JSON.stringify(data) }),
    getClasses: () => this.request<any[]>('/api/faculty/classes'),
    getStudents: (search?: string, riskOnly?: boolean) => {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (riskOnly) params.append('risk_only', 'true');
      return this.request<any[]>(`/api/faculty/students?${params.toString()}`);
    },
    getInterventions: () => this.request<any[]>('/api/faculty/interventions'),
    createIntervention: (data: any) => this.request<any>('/api/faculty/interventions', { method: 'POST', body: JSON.stringify(data) }),
  };

  // 5. GRADUATE PORTAL APIS
  graduate = {
    getDashboard: () => this.request<any>('/api/graduate/dashboard'),
    getResume: () => this.request<any>('/api/graduate/resume'),
    updateResume: (data: any) => this.request<any>('/api/graduate/resume', { method: 'PUT', body: JSON.stringify(data) }),
    getJobs: () => this.request<any[]>('/api/graduate/jobs'),
    getApplications: () => this.request<any[]>('/api/graduate/applications'),
    applyJob: (jobId: string) => this.request<any>('/api/graduate/applications', { method: 'POST', body: JSON.stringify({ job_id: jobId }) }),
  };

  // 6. COMPANY PORTAL APIS
  company = {
    getDashboard: () => this.request<any>('/api/company/dashboard'),
    getJobs: () => this.request<any[]>('/api/company/jobs'),
    createJob: (data: any) => this.request<any>('/api/company/jobs', { method: 'POST', body: JSON.stringify(data) }),
    getCandidates: () => this.request<any[]>('/api/company/candidates'),
    getApplications: () => this.request<any[]>('/api/company/applications'),
    updateApplicationStatus: (appId: string, status: string, notes?: string) =>
      this.request<any>(`/api/company/applications/${appId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status, recruiter_notes: notes }),
      }),
  };

  // 7. PLATFORM ADMIN APIS
  admin = {
    getDashboard: () => this.request<any>('/api/admin/dashboard'),
    getUsers: (role?: string) => this.request<any[]>(`/api/admin/users${role ? `?role=${role}` : ''}`),
    getColleges: () => this.request<any[]>('/api/admin/colleges'),
    getVerifications: () => this.request<any[]>('/api/admin/verifications'),
    approveVerification: (id: string) => this.request<any>(`/api/admin/verifications/${id}/approve`, { method: 'POST' }),
    getAuditLogs: (role?: string) => this.request<any[]>(`/api/admin/audit-logs${role ? `?role=${role}` : ''}`),
    getSettings: () => this.request<any[]>('/api/admin/settings'),
    updateSetting: (key: string, value: string) =>
      this.request<any>('/api/admin/settings', { method: 'PUT', body: JSON.stringify({ key, value }) }),
  };
}

export const api = new ApiClient(API_BASE_URL);
export default api;
