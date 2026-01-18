'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { mockActivities, mockTeamMembers } from '@/lib/mockData';
import type { Activity } from '@/types';

const activityTypes = [
  { value: 'all', label: 'All Activity' },
  { value: 'task_created', label: 'Tasks Created' },
  { value: 'task_completed', label: 'Tasks Completed' },
  { value: 'task_updated', label: 'Tasks Updated' },
  { value: 'project_created', label: 'Projects Created' },
  { value: 'comment_added', label: 'Comments' },
  { value: 'member_joined', label: 'New Members' },
];

export default function ActivityPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedMember, setSelectedMember] = useState('all');

  const filteredActivities = mockActivities.filter((activity) => {
    const matchesType = selectedType === 'all' || activity.type === selectedType;
    const matchesMember = selectedMember === 'all' || activity.userId === selectedMember;
    return matchesType && matchesMember;
  });

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'task_created':
        return (
          <div className="w-10 h-10 rounded-full bg-[#3EBBB7]/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#3EBBB7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        );
      case 'task_completed':
        return (
          <div className="w-10 h-10 rounded-full bg-[#41DC7A]/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#41DC7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'task_updated':
        return (
          <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
        );
      case 'project_created':
        return (
          <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        );
      case 'comment_added':
        return (
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        );
      case 'member_joined':
        return (
          <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const getActivityText = (activity: Activity) => {
    const user = mockTeamMembers.find(m => m.id === activity.userId);
    const userName = user?.name || 'Unknown User';

    switch (activity.type) {
      case 'task_created':
        return <><span className="font-medium text-white">{userName}</span> created a new task <span className="text-[#3EBBB7]">"{activity.entityName}"</span></>;
      case 'task_completed':
        return <><span className="font-medium text-white">{userName}</span> completed <span className="text-[#41DC7A]">"{activity.entityName}"</span></>;
      case 'task_updated':
        return <><span className="font-medium text-white">{userName}</span> updated <span className="text-amber-400">"{activity.entityName}"</span></>;
      case 'project_created':
        return <><span className="font-medium text-white">{userName}</span> created project <span className="text-purple-400">"{activity.entityName}"</span></>;
      case 'comment_added':
        return <><span className="font-medium text-white">{userName}</span> commented on <span className="text-blue-400">"{activity.entityName}"</span></>;
      case 'member_joined':
        return <><span className="font-medium text-white">{userName}</span> <span className="text-pink-400">joined the team</span></>;
      default:
        return activity.type;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 7) return `${days} days ago`;
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <DashboardLayout
      title="Activity"
      subtitle="Track all activity across your team and projects."
    >
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {activityTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`
                px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                ${selectedType === type.value
                  ? 'bg-[#3EBBB7]/20 text-[#3EBBB7] border border-[#3EBBB7]/30'
                  : 'bg-[#1a1f2e] text-slate-400 border border-[#2d3548] hover:text-white hover:border-[#3d4558]'
                }
              `}
            >
              {type.label}
            </button>
          ))}
        </div>
        <select
          value={selectedMember}
          onChange={(e) => setSelectedMember(e.target.value)}
          className="bg-[#1a1f2e] border border-[#2d3548] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#3EBBB7]"
        >
          <option value="all">All Members</option>
          {mockTeamMembers.map((member) => (
            <option key={member.id} value={member.id}>{member.name}</option>
          ))}
        </select>
      </div>

      {/* Activity Timeline */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-[#2d3548]">
            {filteredActivities.map((activity, index) => {
              const user = mockTeamMembers.find(m => m.id === activity.userId);

              return (
                <div key={activity.id} className="p-6 hover:bg-white/5 transition-colors">
                  <div className="flex items-start gap-4">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-300">
                        {getActivityText(activity)}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <Avatar name={user?.name || 'User'} size="sm" />
                          <span className="text-xs text-slate-500">{user?.email}</span>
                        </div>
                        <span className="text-xs text-slate-500">
                          {formatTime(activity.createdAt)}
                        </span>
                      </div>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}

            {filteredActivities.length === 0 && (
              <div className="p-12 text-center">
                <svg className="w-16 h-16 mx-auto text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="text-lg font-medium text-white mb-2">No activity found</h3>
                <p className="text-slate-400">Try adjusting your filters to see more activity.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Load More */}
      {filteredActivities.length > 0 && (
        <div className="text-center mt-8">
          <Button variant="secondary">
            Load more activity
          </Button>
        </div>
      )}
    </DashboardLayout>
  );
}
