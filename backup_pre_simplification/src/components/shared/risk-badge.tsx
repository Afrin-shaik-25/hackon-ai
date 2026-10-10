import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle2, AlertOctagon, HelpCircle } from 'lucide-react';

interface RiskBadgeProps {
  level: 'low' | 'moderate' | 'high' | 'incomplete_data';
  showIcon?: boolean;
}

export function RiskBadge({ level, showIcon = true }: RiskBadgeProps) {
  switch (level) {
    case 'low':
      return (
        <Badge variant="success" className="gap-1.5 font-medium">
          {showIcon && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
          <span>Good Standing</span>
        </Badge>
      );
    case 'moderate':
      return (
        <Badge variant="warning" className="gap-1.5 font-medium">
          {showIcon && <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
          <span>May Need Support</span>
        </Badge>
      );
    case 'high':
      return (
        <Badge variant="danger" className="gap-1.5 font-medium">
          {showIcon && <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />}
          <span>Needs Review</span>
        </Badge>
      );
    case 'incomplete_data':
      return (
        <Badge variant="neutral" className="gap-1.5 font-medium">
          {showIcon && <HelpCircle className="w-3.5 h-3.5 text-slate-500" />}
          <span>Data Incomplete</span>
        </Badge>
      );
  }
}
