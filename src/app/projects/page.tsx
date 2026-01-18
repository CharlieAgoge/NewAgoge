'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { ProjectCard } from '@/components/dashboard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { mockProjects } from '@/lib/mockData';

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const statuses = ['all', 'planning', 'active', 'on-hold', 'completed'];

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: mockProjects.length,
    planning: mockProjects.filter(p => p.status === 'planning').length,
    active: mockProjects.filter(p => p.status === 'active').length,
    'on-hold': mockProjects.filter(p => p.status === 'on-hold').length,
    completed: mockProjects.filter(p => p.status === 'completed').length,
  };

  return (
    <DashboardLayout
      title="Projects"
      subtitle="Track and manage all your team's projects."
    >
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search projects..."
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
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`
                  px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2
                  ${selectedStatus === status
                    ? 'bg-[#3EBBB7]/20 text-[#3EBBB7] border border-[#3EBBB7]/30'
                    : 'bg-[#1a1f2e] text-slate-400 border border-[#2d3548] hover:text-white hover:border-[#3d4558]'
                  }
                `}
              >
                <span className="capitalize">{status === 'all' ? 'All' : status.replace('-', ' ')}</span>
                <span className="text-xs opacity-60">({statusCounts[status as keyof typeof statusCounts]})</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          {/* View Toggle */}
          <div className="flex gap-1 bg-[#1a1f2e] rounded-lg p-1 border border-[#2d3548]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-[#3EBBB7]/20 text-[#3EBBB7]' : 'text-slate-400 hover:text-white'}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-[#3EBBB7]/20 text-[#3EBBB7]' : 'text-slate-400 hover:text-white'}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
          <Button>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Project
          </Button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="text-lg font-medium text-white mb-2">No projects found</h3>
          <p className="text-slate-400 mb-4">Try adjusting your search or filters.</p>
          <Button>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create your first project
          </Button>
        </div>
      )}
    </DashboardLayout>
  );
}
