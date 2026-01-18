'use client';

import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { mockOperatorProjects } from '@/lib/mockData';
import type { OperatorProject } from '@/types';

type Category = OperatorProject['category'] | 'all';
type Difficulty = OperatorProject['difficulty'] | 'all';
type Tier = OperatorProject['tier'] | 'all';

const categoryConfig: Record<OperatorProject['category'], { label: string; color: string }> = {
  'devsecops': { label: 'DevSecOps', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  'cloud-security': { label: 'Cloud Security', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  'threat-hunting': { label: 'Threat Hunting', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  'data-security': { label: 'Data Security', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  'ai-security': { label: 'AI Security', color: 'bg-[#3EBBB7]/20 text-[#3EBBB7] border-[#3EBBB7]/30' },
};

const difficultyConfig: Record<OperatorProject['difficulty'], { label: string; color: string }> = {
  'beginner': { label: 'Beginner', color: 'text-green-400' },
  'intermediate': { label: 'Intermediate', color: 'text-yellow-400' },
  'advanced': { label: 'Advanced', color: 'text-red-400' },
};

const tierConfig: Record<OperatorProject['tier'], { label: string; color: string }> = {
  'starter': { label: 'Starter', color: 'bg-slate-500/20 text-slate-400 border-slate-500/30' },
  'professional': { label: 'Professional', color: 'bg-[#3EBBB7]/20 text-[#3EBBB7] border-[#3EBBB7]/30' },
  'expert': { label: 'Expert', color: 'bg-[#41DC7A]/20 text-[#41DC7A] border-[#41DC7A]/30' },
};

function ProjectCard({ project }: { project: OperatorProject }) {
  const category = categoryConfig[project.category];
  const difficulty = difficultyConfig[project.difficulty];
  const tier = tierConfig[project.tier];

  return (
    <Card className="hover:border-[#3EBBB7]/50 transition-all group">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{project.icon}</span>
            <div>
              <h3 className="text-lg font-semibold text-white group-hover:text-[#3EBBB7] transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-slate-400">{project.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-2 py-1 text-xs rounded border ${category.color}`}>
            {category.label}
          </span>
          <span className={`px-2 py-1 text-xs rounded border ${tier.color}`}>
            {tier.label}
          </span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-slate-400">{project.estimatedHours} hours</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className={difficulty.color}>{difficulty.label}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 text-xs bg-[#11151C] text-slate-400 rounded"
            >
              {skill}
            </span>
          ))}
          {project.skills.length > 4 && (
            <span className="px-2 py-0.5 text-xs text-slate-500">
              +{project.skills.length - 4} more
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-4 border-t border-[#2d3548]">
          <Button size="sm" className="flex-1">
            Start Project
          </Button>
          <Button variant="secondary" size="sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function OperatorProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('all');
  const [selectedTier, setSelectedTier] = useState<Tier>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return mockOperatorProjects.filter((project) => {
      if (selectedCategory !== 'all' && project.category !== selectedCategory) return false;
      if (selectedDifficulty !== 'all' && project.difficulty !== selectedDifficulty) return false;
      if (selectedTier !== 'all' && project.tier !== selectedTier) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          project.title.toLowerCase().includes(query) ||
          project.subtitle.toLowerCase().includes(query) ||
          project.skills.some(s => s.toLowerCase().includes(query))
        );
      }
      return true;
    });
  }, [selectedCategory, selectedDifficulty, selectedTier, searchQuery]);

  const stats = useMemo(() => ({
    total: mockOperatorProjects.length,
    devsecops: mockOperatorProjects.filter(p => p.category === 'devsecops').length,
    cloudSecurity: mockOperatorProjects.filter(p => p.category === 'cloud-security').length,
    aiSecurity: mockOperatorProjects.filter(p => p.category === 'ai-security').length,
  }), []);

  return (
    <DashboardLayout
      title="DevSecAI Operator Projects"
      subtitle="Hands-on security projects to build real-world skills"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-slate-400">Total Projects</p>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-slate-400">DevSecOps</p>
            <p className="text-2xl font-bold text-purple-400">{stats.devsecops}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-slate-400">Cloud Security</p>
            <p className="text-2xl font-bold text-blue-400">{stats.cloudSecurity}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-slate-400">AI Security</p>
            <p className="text-2xl font-bold text-[#3EBBB7]">{stats.aiSecurity}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Search</label>
              <input
                type="text"
                placeholder="Search projects or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#11151C] border border-[#2d3548] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#3EBBB7]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Category)}
                className="w-full bg-[#11151C] border border-[#2d3548] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#3EBBB7]"
              >
                <option value="all">All Categories</option>
                <option value="devsecops">DevSecOps</option>
                <option value="cloud-security">Cloud Security</option>
                <option value="threat-hunting">Threat Hunting</option>
                <option value="data-security">Data Security</option>
                <option value="ai-security">AI Security</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty)}
                className="w-full bg-[#11151C] border border-[#2d3548] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#3EBBB7]"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Tier</label>
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value as Tier)}
                className="w-full bg-[#11151C] border border-[#2d3548] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#3EBBB7]"
              >
                <option value="all">All Tiers</option>
                <option value="starter">Starter</option>
                <option value="professional">Professional</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          </div>

          {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || selectedTier !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDifficulty('all');
                setSelectedTier('all');
                setSearchQuery('');
              }}
              className="mt-4 text-sm text-slate-400 hover:text-white"
            >
              Clear filters
            </button>
          )}
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-slate-500">No projects found matching your filters.</p>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </div>

      {/* Legend */}
      <Card className="mt-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <span className="text-slate-400 font-medium">Tiers:</span>
            {Object.entries(tierConfig).map(([tier, config]) => (
              <div key={tier} className="flex items-center gap-1">
                <span className={`px-2 py-0.5 rounded border ${config.color}`}>{config.label}</span>
              </div>
            ))}
            <div className="border-l border-[#2d3548] pl-6 flex items-center gap-4">
              <span className="text-slate-400 font-medium">Difficulty:</span>
              {Object.entries(difficultyConfig).map(([level, config]) => (
                <span key={level} className={`${config.color}`}>{config.label}</span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
