'use client';

import { DashboardLayout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { mockProjects, mockTasks, mockTeamMembers } from '@/lib/mockData';

export default function ReportsPage() {
  // Calculate statistics
  const totalTasks = mockTasks.length;
  const completedTasks = mockTasks.filter(t => t.status === 'done').length;
  const inProgressTasks = mockTasks.filter(t => t.status === 'in-progress').length;
  const todoTasks = mockTasks.filter(t => t.status === 'todo').length;
  const reviewTasks = mockTasks.filter(t => t.status === 'review').length;

  const activeProjects = mockProjects.filter(p => p.status === 'active').length;
  const avgProgress = Math.round(mockProjects.reduce((sum, p) => sum + p.progress, 0) / mockProjects.length);

  // Team productivity
  const teamProductivity = mockTeamMembers.map(member => ({
    ...member,
    productivity: Math.round((member.tasksCompleted / (member.tasksCompleted + member.tasksInProgress)) * 100) || 0,
  })).sort((a, b) => b.productivity - a.productivity);

  return (
    <DashboardLayout
      title="Reports"
      subtitle="Analytics and insights for your team's performance."
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-slate-400">Task Completion Rate</p>
              <div className="w-10 h-10 rounded-lg bg-[#41DC7A]/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#41DC7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-white mb-2">{Math.round((completedTasks / totalTasks) * 100)}%</p>
            <Progress value={completedTasks} max={totalTasks} variant="success" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-slate-400">Average Project Progress</p>
              <div className="w-10 h-10 rounded-lg bg-[#3EBBB7]/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#3EBBB7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-white mb-2">{avgProgress}%</p>
            <Progress value={avgProgress} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-slate-400">Active Projects</p>
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{activeProjects}</p>
            <p className="text-sm text-slate-500 mt-2">of {mockProjects.length} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-slate-400">Team Members</p>
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{mockTeamMembers.length}</p>
            <p className="text-sm text-[#41DC7A] mt-2">All active</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Task Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Task Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { status: 'To Do', count: todoTasks, color: 'bg-slate-500' },
                { status: 'In Progress', count: inProgressTasks, color: 'bg-[#3EBBB7]' },
                { status: 'Review', count: reviewTasks, color: 'bg-amber-500' },
                { status: 'Done', count: completedTasks, color: 'bg-[#41DC7A]' },
              ].map((item) => (
                <div key={item.status} className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-slate-400">{item.status}</span>
                      <span className="text-sm font-medium text-white">{item.count}</span>
                    </div>
                    <div className="w-full h-2 bg-[#11151C] rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all`}
                        style={{ width: `${(item.count / totalTasks) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Status */}
        <Card>
          <CardHeader>
            <CardTitle>Project Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProjects.map((project) => (
                <div key={project.id} className="p-4 bg-[#11151C] rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white">{project.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full capitalize
                      ${project.status === 'active' ? 'bg-[#3EBBB7]/10 text-[#3EBBB7]' :
                        project.status === 'completed' ? 'bg-[#41DC7A]/10 text-[#41DC7A]' :
                        project.status === 'on-hold' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-slate-500/10 text-slate-400'}
                    `}>
                      {project.status}
                    </span>
                  </div>
                  <Progress value={project.progress} size="sm" />
                  <p className="text-xs text-slate-500 mt-2">{project.progress}% complete</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Performance */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Team Performance</CardTitle>
            <Button variant="secondary" size="sm">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2d3548]">
                  <th className="text-left py-4 px-4 text-sm font-medium text-slate-400">Team Member</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-slate-400">Department</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-slate-400">Tasks Completed</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-slate-400">In Progress</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-slate-400">Streak</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-slate-400">Productivity</th>
                </tr>
              </thead>
              <tbody>
                {teamProductivity.map((member) => (
                  <tr key={member.id} className="border-b border-[#2d3548] hover:bg-white/5">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3EBBB7] to-[#41DC7A] flex items-center justify-center text-xs font-semibold text-[#11151C]">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium text-white">{member.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-400">{member.department}</td>
                    <td className="py-4 px-4 text-center font-medium text-[#41DC7A]">{member.tasksCompleted}</td>
                    <td className="py-4 px-4 text-center font-medium text-[#3EBBB7]">{member.tasksInProgress}</td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-amber-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        {member.streak} days
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <Progress value={member.productivity} size="sm" className="w-24" />
                        <span className="text-sm text-white">{member.productivity}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
