'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import type { TeamMember } from '@/types';

interface TeamOverviewProps {
  members: TeamMember[];
  title?: string;
}

export function TeamOverview({ members, title = 'Team Members' }: TeamOverviewProps) {
  const roleVariants: Record<string, 'info' | 'success' | 'default'> = {
    admin: 'info',
    lead: 'success',
    member: 'default',
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Link href="/team" className="text-sm text-[#3EBBB7] hover:text-[#41DC7A] transition-colors">
            View all
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-[#2d3548]">
          {members.map((member) => (
            <div
              key={member.id}
              className="px-6 py-4 hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <Avatar
                  name={member.name}
                  size="md"
                  showStatus
                  status={member.lastActive && new Date(member.lastActive).getTime() > Date.now() - 300000 ? 'online' : 'offline'}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">{member.name}</span>
                    <Badge variant={roleVariants[member.role]} size="sm" className="capitalize">
                      {member.role}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400">{member.email}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-center">
                      <p className="font-semibold text-white">{member.tasksCompleted}</p>
                      <p className="text-xs text-slate-500">Completed</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-[#3EBBB7]">{member.tasksInProgress}</p>
                      <p className="text-xs text-slate-500">In Progress</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-[#41DC7A]">{member.streak}</p>
                      <p className="text-xs text-slate-500">Streak</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {members.length === 0 && (
            <div className="px-6 py-8 text-center">
              <svg className="w-12 h-12 mx-auto text-slate-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <p className="text-slate-500">No team members yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
