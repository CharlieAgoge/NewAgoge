'use client';

import { useState } from 'react';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Mock user data
  const user = {
    name: 'Charlie Peter',
    email: 'charlie@devsecai.io',
    role: 'Admin',
  };

  // Mock notifications
  const notifications = [
    { id: '1', title: 'New task assigned', message: 'You have been assigned to "API Security Review"', time: '5m ago', unread: true },
    { id: '2', title: 'Project completed', message: 'DevSecOps Pipeline project marked as complete', time: '1h ago', unread: true },
    { id: '3', title: 'Comment added', message: 'Sarah commented on your task', time: '3h ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="h-16 bg-[#11151C]/80 backdrop-blur-xl border-b border-[#2d3548] flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left side - Title */}
      <div>
        {title && <h1 className="text-xl font-semibold text-white">{title}</h1>}
        {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 bg-[#1a1f2e] border border-[#2d3548] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3EBBB7] transition-colors"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#3EBBB7] rounded-full" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#1a1f2e] border border-[#2d3548] rounded-xl shadow-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-[#2d3548] flex items-center justify-between">
                <h3 className="font-semibold text-white">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="text-xs text-[#3EBBB7]">{unreadCount} new</span>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer ${notification.unread ? 'bg-[#3EBBB7]/5' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      {notification.unread && (
                        <span className="w-2 h-2 mt-2 bg-[#3EBBB7] rounded-full flex-shrink-0" />
                      )}
                      <div className={notification.unread ? '' : 'ml-5'}>
                        <p className="text-sm font-medium text-white">{notification.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{notification.message}</p>
                        <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-[#2d3548]">
                <button className="text-sm text-[#3EBBB7] hover:text-[#41DC7A] transition-colors">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 hover:bg-white/5 rounded-lg px-2 py-1.5 transition-colors"
          >
            <Avatar name={user.name} size="sm" showStatus status="online" />
            <div className="text-left hidden md:block">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-slate-400">{user.role}</p>
            </div>
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 bg-[#1a1f2e] border border-[#2d3548] rounded-xl shadow-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-[#2d3548]">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-slate-400">{user.email}</p>
              </div>
              <div className="py-2">
                <button className="w-full px-4 py-2 text-sm text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                  Your Profile
                </button>
                <button className="w-full px-4 py-2 text-sm text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                  Settings
                </button>
                <button className="w-full px-4 py-2 text-sm text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                  Help & Support
                </button>
              </div>
              <div className="px-4 py-3 border-t border-[#2d3548]">
                <Button variant="ghost" size="sm" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10">
                  Sign out
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
