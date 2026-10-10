import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPercentage(val: number): string {
  return `${Math.round(val)}%`;
}

export function getScoreBadgeColor(score: number): { bg: string; text: string; border: string } {
  if (score >= 80) return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' };
  if (score >= 65) return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' };
  if (score >= 50) return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
  return { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' };
}

export function getRiskLevelBadge(risk: 'low' | 'moderate' | 'high' | 'incomplete_data') {
  switch (risk) {
    case 'low':
      return { label: 'Good Standing', class: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    case 'moderate':
      return { label: 'Moderate Watch', class: 'bg-amber-50 text-amber-700 border-amber-200' };
    case 'high':
      return { label: 'Needs Immediate Review', class: 'bg-rose-50 text-rose-700 border-rose-200' };
    case 'incomplete_data':
      return { label: 'Data Incomplete', class: 'bg-slate-100 text-slate-700 border-slate-200' };
  }
}
