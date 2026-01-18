'use client';

import { HTMLAttributes, forwardRef } from 'react';

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className = '', value, max = 100, size = 'md', showLabel, variant = 'default', ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const sizes = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    };

    const variants = {
      default: 'from-accent-teal to-accent-lime',
      success: 'from-accent-lime to-emerald-400',
      warning: 'from-amber-500 to-orange-400',
      error: 'from-red-500 to-rose-400',
    };

    return (
      <div ref={ref} className={`w-full ${className}`} {...props}>
        {showLabel && (
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-slate-400">Progress</span>
            <span className="text-xs font-medium text-white">{Math.round(percentage)}%</span>
          </div>
        )}
        <div className={`w-full ${sizes[size]} bg-devsecai-light rounded-full overflow-hidden`}>
          <div
            className={`h-full bg-gradient-to-r ${variants[variant]} rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = 'Progress';
