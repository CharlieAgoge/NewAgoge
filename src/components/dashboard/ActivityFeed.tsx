'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import type { Activity } from '@/types';

interface ActivityFeedProps {
  activities: Activity[];
  title?: string;
}

export function ActivityFeed({ activities, title = 'Recent Activity' }: ActivityFeedProps) {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'task_created':
        return (
          <div className="w-8 h-8 rounded-full bg-[#3EBBB7]/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#3EBBB7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        );
      case 'task_completed':
        return (
          <div className="w-8 h-8 rounded-full bg-[#41DC7A]/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#41DC7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'task_updated':
        return (
          <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
        );
      case 'project_created':
        return (
          <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        );
      case 'comment_added':
        return (
          <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        );
      case 'member_joined':
        return (
          <div className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'task_created':
        return <><span className="font-medium text-white">created a new task</span> "{activity.entityName}"</>;
      case 'task_completed':
        return <><span className="font-medium text-white">completed</span> "{activity.entityName}"</>;
      case 'task_updated':
        return <><span className="font-medium text-white">updated</span> "{activity.entityName}"</>;
      case 'project_created':
        return <><span className="font-medium text-white">created project</span> "{activity.entityName}"</>;
      case 'comment_added':
        return <><span className="font-medium text-white">commented on</span> "{activity.entityName}"</>;
      case 'member_joined':
        return <><span className="font-medium text-white">joined the team</span></>;
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
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Mock user names
  const mockUsers: Record<string, string> = {
    '1': 'Charlie Peter',
    '2': 'Sarah Chen',
    '3': 'Mike Johnson',
    '4': 'Emily Davis',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-[#2d3548]">
          {activities.map((activity) => (
            <div key={activity.id} className="px-6 py-4 hover:bg-white/5 transition-colors">
              <div className="flex items-start gap-4">
                {getActivityIcon(activity.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Avatar name={mockUsers[activity.userId] || 'User'} size="sm" />
                    <span className="text-sm font-medium text-white">
                      {mockUsers[activity.userId] || 'Unknown User'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">
                    {getActivityText(activity)}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {formatTime(activity.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {activities.length === 0 && (
            <div className="px-6 py-8 text-center">
              <svg className="w-12 h-12 mx-auto text-slate-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <p className="text-slate-500">No recent activity</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
