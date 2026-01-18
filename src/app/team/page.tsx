'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { mockTeamMembers } from '@/lib/mockData';

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  const departments = ['all', 'Engineering', 'Security', 'DevOps'];

  const filteredMembers = mockTeamMembers.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const roleVariants: Record<string, 'info' | 'success' | 'default'> = {
    admin: 'info',
    lead: 'success',
    member: 'default',
  };

  return (
    <DashboardLayout
      title="Team"
      subtitle="Manage your team members and track their progress."
    >
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
          <div className="flex gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${selectedDepartment === dept
                    ? 'bg-[#3EBBB7]/20 text-[#3EBBB7] border border-[#3EBBB7]/30'
                    : 'bg-[#1a1f2e] text-slate-400 border border-[#2d3548] hover:text-white hover:border-[#3d4558]'
                  }
                `}
              >
                {dept === 'all' ? 'All' : dept}
              </button>
            ))}
          </div>
        </div>
        <Button>
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Invite Member
        </Button>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-white">{mockTeamMembers.length}</p>
            <p className="text-sm text-slate-400">Total Members</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-[#41DC7A]">
              {mockTeamMembers.filter(m => m.lastActive && new Date(m.lastActive).getTime() > Date.now() - 300000).length}
            </p>
            <p className="text-sm text-slate-400">Online Now</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-[#3EBBB7]">
              {mockTeamMembers.reduce((sum, m) => sum + m.tasksCompleted, 0)}
            </p>
            <p className="text-sm text-slate-400">Tasks Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-amber-400">
              {Math.max(...mockTeamMembers.map(m => m.streak))}
            </p>
            <p className="text-sm text-slate-400">Longest Streak</p>
          </CardContent>
        </Card>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="group cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar
                  name={member.name}
                  size="lg"
                  showStatus
                  status={member.lastActive && new Date(member.lastActive).getTime() > Date.now() - 300000 ? 'online' : 'offline'}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white group-hover:text-[#3EBBB7] transition-colors truncate">
                      {member.name}
                    </h3>
                    <Badge variant={roleVariants[member.role]} size="sm" className="capitalize flex-shrink-0">
                      {member.role}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400 truncate">{member.email}</p>
                  <p className="text-xs text-slate-500 mt-1">{member.department}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-[#2d3548]">
                <div className="text-center">
                  <p className="text-lg font-semibold text-white">{member.tasksCompleted}</p>
                  <p className="text-xs text-slate-500">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-[#3EBBB7]">{member.tasksInProgress}</p>
                  <p className="text-xs text-slate-500">In Progress</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-[#41DC7A]">{member.streak}</p>
                  <p className="text-xs text-slate-500">Day Streak</p>
                </div>
              </div>

              {/* Projects */}
              <div className="mt-4">
                <p className="text-xs text-slate-500 mb-2">{member.projects.length} Active Projects</p>
                <div className="flex gap-1">
                  {member.projects.slice(0, 3).map((_, index) => (
                    <div
                      key={index}
                      className="w-2 h-2 rounded-full bg-gradient-to-r from-[#3EBBB7] to-[#41DC7A]"
                    />
                  ))}
                  {member.projects.length > 3 && (
                    <span className="text-xs text-slate-500 ml-1">+{member.projects.length - 3}</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h3 className="text-lg font-medium text-white mb-2">No members found</h3>
          <p className="text-slate-400">Try adjusting your search or filters.</p>
        </div>
      )}
    </DashboardLayout>
  );
}
