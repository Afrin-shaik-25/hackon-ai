'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '@/types';
import { api } from '@/lib/api-client';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isDemoMode: boolean;
  isBackendConnected: boolean;
  setRole: (role: UserRole) => void;
  login: (email: string, role: UserRole, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (payload: any) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  toggleDemoMode: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
}

const DEFAULT_USERS: Record<UserRole, UserProfile> = {
  student: {
    id: "std-001",
    name: "Arav Sharma",
    email: "arav.sharma@apex.edu",
    role: "student",
    studentId: "2023CS101",
    college: "Apex Institute of Technology",
    department: "Computer Science",
    studentType: "Undergraduate",
    degree: "B.Tech",
    branch: "Computer Science & Engineering",
    year: 3,
    semester: 5,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    verified: true
  },
  faculty: {
    id: "fac-101",
    name: "Dr. K. Raman",
    email: "k.raman@apex.edu",
    role: "faculty",
    employeeId: "FAC-CS-042",
    college: "Apex Institute of Technology",
    department: "Computer Science & Engineering",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    verified: true
  },
  graduate: {
    id: "grad-001",
    name: "Sneha Mukherjee",
    email: "sneha.m@graduate.example.com",
    role: "graduate",
    college: "National School of Applied Sciences",
    department: "Information Technology",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    verified: true
  },
  company: {
    id: "comp-usr-01",
    name: "Vikram Malhotra",
    email: "recruitment@nexatech.example.com",
    role: "company",
    companyName: "NexaTech Systems",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    verified: true
  },
  admin: {
    id: "adm-001",
    name: "Dr. Elena Rostova",
    email: "admin@studylens.ai",
    role: "admin",
    college: "Apex Consortium Administration",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    verified: true
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedRole = localStorage.getItem('studylens_role') as UserRole;
        if (savedRole && DEFAULT_USERS[savedRole]) return savedRole;
      } catch {}
    }
    return 'student';
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedRole = localStorage.getItem('studylens_role') as UserRole;
        if (savedRole && DEFAULT_USERS[savedRole]) return DEFAULT_USERS[savedRole];
      } catch {}
    }
    return DEFAULT_USERS.student;
  });

  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);

  // Check backend health on initial mount
  useEffect(() => {
    let mounted = true;
    fetch('http://localhost:8000/health')
      .then((res) => {
        if (res.ok && mounted) {
          setIsBackendConnected(true);
        }
      })
      .catch(() => {
        if (mounted) setIsBackendConnected(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    setUser(DEFAULT_USERS[newRole]);
    try {
      localStorage.setItem('studylens_role', newRole);
    } catch {}
  };

  const login = async (email: string, targetRole: UserRole, password?: string) => {
    setRole(targetRole);

    try {
      const res = await api.auth.login(email, password || 'password123', targetRole);
      if (res.isBackendConnected && res.data) {
        setIsBackendConnected(true);
        setIsDemoMode(false);
        const serverUser = res.data.user;
        const profile = serverUser.profile || {};
        const mappedUser: UserProfile = {
          id: serverUser.id,
          name: serverUser.name,
          email: serverUser.email,
          role: serverUser.role as UserRole,
          avatar: serverUser.avatar,
          college: profile.college,
          department: profile.department,
          studentType: profile.student_type,
          degree: profile.degree,
          branch: profile.branch,
          year: profile.year,
          semester: profile.semester,
          studentId: profile.student_id,
          employeeId: profile.employee_id,
          companyName: profile.company_name,
          verified: profile.verified ?? true,
        };
        setUser(mappedUser);
        return { success: true };
      } else if (res.isBackendConnected && res.error) {
        // Backend returned explicit auth error (e.g. wrong credentials)
        return { success: false, error: res.error };
      }
    } catch {
      // Backend offline: gracefully fallback to client demo user
    }

    // Client demo fallback
    setIsDemoMode(true);
    setUser({ ...DEFAULT_USERS[targetRole], email });
    return { success: true };
  };

  const register = async (payload: any) => {
    const targetRole = payload.role as UserRole;
    setRole(targetRole);

    try {
      const res = await api.auth.register(payload);
      if (res.isBackendConnected && res.data) {
        setIsBackendConnected(true);
        setIsDemoMode(false);
        const serverUser = res.data.user;
        const profile = serverUser.profile || {};
        const mappedUser: UserProfile = {
          id: serverUser.id,
          name: serverUser.name,
          email: serverUser.email,
          role: serverUser.role as UserRole,
          avatar: serverUser.avatar,
          college: profile.college,
          department: profile.department,
          studentType: profile.student_type,
          degree: profile.degree,
          branch: profile.branch,
          year: profile.year,
          semester: profile.semester,
          studentId: profile.student_id,
          employeeId: profile.employee_id,
          companyName: profile.company_name,
          verified: profile.verified ?? true,
        };
        setUser(mappedUser);
        return { success: true };
      } else if (res.isBackendConnected && res.error) {
        return { success: false, error: res.error };
      }
    } catch {
      // Backend offline: proceed with client state
    }

    setIsDemoMode(true);
    setUser({
      ...DEFAULT_USERS[targetRole],
      email: payload.email,
      name: payload.name,
      college: payload.college,
      degree: payload.degree,
      branch: payload.branch,
      year: payload.year,
      semester: payload.semester,
    });
    return { success: true };
  };

  const logout = () => {
    api.auth.logout().catch(() => {});
    setUser(null);
  };

  const toggleDemoMode = () => {
    setIsDemoMode((prev) => !prev);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (user) {
      const merged = { ...user, ...updated };
      setUser(merged);
      try {
        localStorage.setItem(`studylens_user_${user.role}`, JSON.stringify(merged));
      } catch {}
      // Sync to backend if connected
      if (user.role === 'student') {
        api.student.updateProfile(updated).catch(() => {});
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isDemoMode,
        isBackendConnected,
        setRole,
        login,
        register,
        logout,
        toggleDemoMode,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
