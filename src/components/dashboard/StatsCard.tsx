'use client';

import { Card, CardContent } from '@/components/ui/Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon: React.ReactNode;
  color?: 'teal' | 'lime' | 'amber' | 'red';
}

export function StatsCard({ title, value, change, icon, color = 'teal' }: StatsCardProps) {
  const colorClasses = {
    teal: 'from-[#3EBBB7]/20 to-transparent text-[#3EBBB7]',
    lime: 'from-[#41DC7A]/20 to-transparent text-[#41DC7A]',
    amber: 'from-amber-500/20 to-transparent text-amber-400',
    red: 'from-red-500/20 to-transparent text-red-400',
  };

  const iconBgClasses = {
    teal: 'bg-[#3EBBB7]/10 text-[#3EBBB7]',
    lime: 'bg-[#41DC7A]/10 text-[#41DC7A]',
    amber: 'bg-amber-500/10 text-amber-400',
    red: 'bg-red-500/10 text-red-400',
  };

  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-50`} />
      <CardContent className="relative p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-400 font-medium">{title}</p>
            <p className="text-3xl font-bold text-white mt-2">{value}</p>
            {change && (
              <div className="flex items-center gap-1 mt-2">
                {change.type === 'increase' ? (
                  <svg className="w-4 h-4 text-[#41DC7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
                <span className={`text-sm font-medium ${change.type === 'increase' ? 'text-[#41DC7A]' : 'text-red-400'}`}>
                  {change.value}%
                </span>
                <span className="text-xs text-slate-500">vs last week</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-xl ${iconBgClasses[color]}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
