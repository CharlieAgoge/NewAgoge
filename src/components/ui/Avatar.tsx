'use client';

import { HTMLAttributes, forwardRef } from 'react';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showStatus?: boolean;
  status?: 'online' | 'offline' | 'busy' | 'away';
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className = '', src, name, size = 'md', showStatus, status = 'offline', ...props }, ref) => {
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const sizes = {
      sm: 'w-8 h-8 text-xs',
      md: 'w-10 h-10 text-sm',
      lg: 'w-12 h-12 text-base',
      xl: 'w-16 h-16 text-lg',
    };

    const statusSizes = {
      sm: 'w-2 h-2',
      md: 'w-2.5 h-2.5',
      lg: 'w-3 h-3',
      xl: 'w-4 h-4',
    };

    const statusColors = {
      online: 'bg-accent-lime',
      offline: 'bg-slate-500',
      busy: 'bg-red-500',
      away: 'bg-amber-500',
    };

    // Generate a consistent color based on name
    const colors = [
      'from-accent-teal to-accent-lime',
      'from-blue-500 to-cyan-400',
      'from-purple-500 to-pink-500',
      'from-orange-500 to-amber-400',
      'from-emerald-500 to-teal-400',
    ];
    const colorIndex = name.charCodeAt(0) % colors.length;

    return (
      <div ref={ref} className={`relative inline-flex ${className}`} {...props}>
        {src ? (
          <img
            src={src}
            alt={name}
            className={`${sizes[size]} rounded-full object-cover ring-2 ring-border`}
          />
        ) : (
          <div
            className={`
              ${sizes[size]} rounded-full
              bg-gradient-to-br ${colors[colorIndex]}
              flex items-center justify-center
              font-semibold text-devsecai-dark
              ring-2 ring-border
            `}
          >
            {initials}
          </div>
        )}
        {showStatus && (
          <span
            className={`
              absolute bottom-0 right-0
              ${statusSizes[size]}
              ${statusColors[status]}
              rounded-full
              ring-2 ring-devsecai-dark
            `}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
