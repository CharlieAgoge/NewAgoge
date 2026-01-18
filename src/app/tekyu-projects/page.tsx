'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { mockTekyuProjects, mockTeamMembers } from '@/lib/mockData';
import type { TekyuProject } from '@/types';

const categoryConfig: Record<TekyuProject['category'], { label: string; icon: string; color: string; bgColor: string }> = {
  'security-tools': { label: 'Security Tools', icon: '🔒', color: 'text-red-400', bgColor: 'bg-red-500/10' },
  'automation': { label: 'Automation', icon: '⚙️', color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
  'infrastructure': { label: 'Infrastructure', icon: '🏗️', color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
  'training': { label: 'Training', icon: '📚', color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
  'client-projects': { label: 'Client Projects', icon: '👥', color: 'text-pink-400', bgColor: 'bg-pink-500/10' },
};

const statusVariants: Record<TekyuProject['status'], 'info' | 'success' | 'default'> = {
  'active': 'info',
  'completed': 'success',
  'archived': 'default',
};

export default function TekyuProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = mockTekyuProjects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const stats = {
    total: mockTekyuProjects.length,
    active: mockTekyuProjects.filter(p => p.status === 'active').length,
    completed: mockTekyuProjects.filter(p => p.status === 'completed').length,
  };

  return (
    <DashboardLayout
      title="Tekyu Projects"
      subtitle="Access all Tekyu/DevSecAI internal projects - Free for approved employees"
    >
      {/* Access Notice */}
      <div className="mb-6 p-4 bg-gradient-to-r from-[#3EBBB7]/10 to-[#41DC7A]/10 border border-[#3EBBB7]/30 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#3EBBB7]/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#3EBBB7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <p className="text-white font-medium">DevSecAI Employee Access</p>
            <p className="text-sm text-slate-400">
              All projects below are available free of charge to approved DevSecAI team members.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-white">{stats.total}</p>
            <p className="text-sm text-slate-400">Total Projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-[#3EBBB7]">{stats.active}</p>
            <p className="text-sm text-slate-400">Active Projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-[#41DC7A]">{stats.completed}</p>
            <p className="text-sm text-slate-400">Completed Projects</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search projects, tech stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1f2e] border border-[#2d3548] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3EBBB7]"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#1a1f2e] border border-[#2d3548] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#3EBBB7]"
          >
            <option value="all">All Categories</option>
            {Object.entries(categoryConfig).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#1a1f2e] border border-[#2d3548] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#3EBBB7]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-[#3EBBB7]/20 text-[#3EBBB7]'
              : 'bg-[#1a1f2e] text-slate-400 hover:text-white'
          }`}
        >
          All ({mockTekyuProjects.length})
        </button>
        {Object.entries(categoryConfig).map(([key, config]) => {
          const count = mockTekyuProjects.filter(p => p.category === key).length;
          return (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                selectedCategory === key
                  ? `${config.bgColor} ${config.color}`
                  : 'bg-[#1a1f2e] text-slate-400 hover:text-white'
              }`}
            >
              <span>{config.icon}</span>
              <span>{config.label}</span>
              <span className="text-xs opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const catConfig = categoryConfig[project.category];
          const creator = mockTeamMembers.find(m => m.id === project.createdBy);

          return (
            <Card key={project.id} className="group cursor-pointer flex flex-col">
              <CardContent className="p-6 flex flex-col flex-1">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${catConfig.bgColor} flex items-center justify-center text-2xl`}>
                    {catConfig.icon}
                  </div>
                  <Badge variant={statusVariants[project.status]} className="capitalize">
                    {project.status}
                  </Badge>
                </div>

                {/* Title & Description */}
                <h3 className="font-semibold text-white group-hover:text-[#3EBBB7] transition-colors mb-2 text-lg">
                  {project.name}
                </h3>
                <p className="text-sm text-slate-400 line-clamp-3 mb-4 flex-1">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs bg-[#11151C] text-slate-400 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-2 py-0.5 text-xs text-slate-500">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-[#3EBBB7] hover:text-[#41DC7A] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      Repository
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-[#41DC7A] hover:text-[#3EBBB7] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                  {project.docsUrl && (
                    <a
                      href={project.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Docs
                    </a>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-[#2d3548]">
                  <div className="flex items-center gap-2">
                    {creator && <Avatar name={creator.name} size="sm" />}
                    <span className="text-xs text-slate-500">{creator?.name}</span>
                  </div>
                  <span className="text-xs text-slate-500">
                    {new Date(project.updatedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="text-lg font-medium text-white mb-2">No projects found</h3>
          <p className="text-slate-400">Try adjusting your search or filters.</p>
        </div>
      )}
    </DashboardLayout>
  );
}
