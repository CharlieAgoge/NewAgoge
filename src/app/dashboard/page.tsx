'use client';

import { DashboardLayout } from '@/components/layout';
import { StatsCard, ProjectCard, TaskList, ActivityFeed, TeamOverview } from '@/components/dashboard';
import { Button } from '@/components/ui/Button';
import { mockProjects, mockTasks, mockTeamMembers, mockActivities, mockDashboardStats } from '@/lib/mockData';

export default function DashboardPage() {
  const stats = mockDashboardStats;
  const recentProjects = mockProjects.slice(0, 4);
  const myTasks = mockTasks.filter(t => t.status !== 'done').slice(0, 5);
  const recentActivities = mockActivities.slice(0, 5);
  const teamMembers = mockTeamMembers.slice(0, 4);

  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="Welcome back! Here's what's happening with your projects."
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Active Projects"
          value={stats.activeProjects}
          change={{ value: 12, type: 'increase' }}
          color="teal"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
        />
        <StatsCard
          title="Tasks Completed"
          value={`${stats.completedTasks}/${stats.totalTasks}`}
          change={{ value: stats.weeklyProgress, type: 'increase' }}
          color="lime"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatsCard
          title="Team Members"
          value={stats.teamMembers}
          change={{ value: 8, type: 'increase' }}
          color="teal"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        />
        <StatsCard
          title="Weekly Progress"
          value={`${stats.weeklyProgress}%`}
          change={{ value: 5, type: 'increase' }}
          color="lime"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-4 mb-8">
        <Button>
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Project
        </Button>
        <Button variant="secondary">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Task
        </Button>
        <Button variant="secondary">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Invite Member
        </Button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects Section - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Projects */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Recent Projects</h2>
              <a href="/projects" className="text-sm text-[#3EBBB7] hover:text-[#41DC7A] transition-colors">
                View all
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

          {/* My Tasks */}
          <TaskList tasks={myTasks} title="My Tasks" />
        </div>

        {/* Sidebar - Takes 1 column */}
        <div className="space-y-6">
          {/* Activity Feed */}
          <ActivityFeed activities={recentActivities} />

          {/* Team Overview */}
          <TeamOverview members={teamMembers} />
        </div>
      </div>
    </DashboardLayout>
  );
}
