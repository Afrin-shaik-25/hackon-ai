import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
    label?: string;
  };
  highlightColor?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'teal';
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  highlightColor = 'indigo',
  className
}: StatCardProps) {
  const iconBgClasses = {
    indigo: 'bg-indigo-50 text-indigo-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    rose: 'bg-rose-50 text-rose-600',
    teal: 'bg-teal-50 text-teal-600',
  };

  return (
    <Card className={cn('hover:shadow-md transition-shadow', className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{title}</p>
            <h4 className="text-2xl font-bold text-slate-900 mt-1 tracking-tight">{value}</h4>
          </div>
          {icon && (
            <div className={cn('p-2.5 rounded-xl', iconBgClasses[highlightColor])}>
              {icon}
            </div>
          )}
        </div>

        {(subtitle || trend) && (
          <div className="mt-3 flex items-center gap-2 text-xs">
            {trend && (
              <span
                className={cn(
                  'inline-flex items-center gap-0.5 font-semibold px-1.5 py-0.5 rounded',
                  trend.direction === 'up' && 'text-emerald-700 bg-emerald-50',
                  trend.direction === 'down' && 'text-rose-700 bg-rose-50',
                  trend.direction === 'neutral' && 'text-slate-600 bg-slate-100'
                )}
              >
                {trend.direction === 'up' && <TrendingUp className="w-3 h-3" />}
                {trend.direction === 'down' && <TrendingDown className="w-3 h-3" />}
                {trend.direction === 'neutral' && <Minus className="w-3 h-3" />}
                {trend.value}
              </span>
            )}
            {subtitle && <span className="text-slate-500">{subtitle}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
