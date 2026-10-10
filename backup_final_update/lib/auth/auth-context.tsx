'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '@/types';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isDemoMode: boolean;
  setRole: (role: UserRole) => void;
  login: (email: string, role: UserRole) => void;
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

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    setUser(DEFAULT_USERS[newRole]);
    try {
      localStorage.setItem('studylens_role', newRole);
    } catch {
      // Ignore storage errors
    }
  };

  const login = (email: string, targetRole: UserRole) => {
    setRole(targetRole);
    if (user) {
      setUser({ ...DEFAULT_USERS[targetRole], email });
    }
  };

  const logout = () => {
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
      } catch {
        // Ignore storage errors
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, isDemoMode, setRole, login, logout, toggleDemoMode, updateProfile }}>
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
