'use client';

import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockSalesTrainingModules } from '@/lib/mockData';
import type { SalesTrainingModule } from '@/types';

type Category = SalesTrainingModule['category'] | 'all';

const categoryConfig: Record<SalesTrainingModule['category'], { label: string; color: string; bgColor: string }> = {
  'product-knowledge': { label: 'Product Knowledge', color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
  'outreach': { label: 'Outreach', color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
  'sales-skills': { label: 'Sales Skills', color: 'text-amber-400', bgColor: 'bg-amber-500/10' },
  'workshop-delivery': { label: 'Workshop Delivery', color: 'text-[#41DC7A]', bgColor: 'bg-[#41DC7A]/10' },
  'closing': { label: 'Closing', color: 'text-[#3EBBB7]', bgColor: 'bg-[#3EBBB7]/10' },
};

function ModuleCard({
  module,
  isCompleted,
  onSelect
}: {
  module: SalesTrainingModule;
  isCompleted: boolean;
  onSelect: () => void;
}) {
  const category = categoryConfig[module.category];

  return (
    <Card
      className={`cursor-pointer hover:border-[#3EBBB7]/50 transition-all ${isCompleted ? 'border-[#41DC7A]/30' : ''}`}
      onClick={onSelect}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{module.icon}</span>
            <div>
              <h3 className="text-base font-semibold text-white">{module.title}</h3>
              <p className="text-xs text-slate-400">{module.description}</p>
            </div>
          </div>
          {isCompleted && (
            <div className="w-6 h-6 rounded-full bg-[#41DC7A]/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-[#41DC7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 text-sm">
          <span className={`px-2 py-0.5 rounded ${category.bgColor} ${category.color}`}>
            {category.label}
          </span>
          <span className="text-slate-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {module.duration} min
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function SalesTrainingPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedModule, setSelectedModule] = useState<SalesTrainingModule | null>(null);
  const [completedModules, setCompletedModules] = useState<string[]>(['st-1']); // Mock: first module completed

  const filteredModules = useMemo(() => {
    if (selectedCategory === 'all') return mockSalesTrainingModules;
    return mockSalesTrainingModules.filter(m => m.category === selectedCategory);
  }, [selectedCategory]);

  const stats = useMemo(() => ({
    total: mockSalesTrainingModules.length,
    completed: completedModules.length,
    totalDuration: mockSalesTrainingModules.reduce((sum, m) => sum + m.duration, 0),
    completedDuration: mockSalesTrainingModules
      .filter(m => completedModules.includes(m.id))
      .reduce((sum, m) => sum + m.duration, 0),
  }), [completedModules]);

  const progressPercentage = Math.round((stats.completed / stats.total) * 100);

  const handleMarkComplete = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  if (selectedModule) {
    return (
      <DashboardLayout
        title={selectedModule.title}
        subtitle="Sales Training Module"
      >
        <div className="mb-6">
          <Button variant="secondary" onClick={() => setSelectedModule(null)}>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Training
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[#2d3548]">
                  <span className="text-4xl">{selectedModule.icon}</span>
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedModule.title}</h2>
                    <p className="text-slate-400">{selectedModule.description}</p>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <div className="text-slate-300 whitespace-pre-wrap">
                    {selectedModule.content.split('\n').map((line, i) => {
                      if (line.startsWith('# ')) {
                        return <h1 key={i} className="text-2xl font-bold text-white mt-6 mb-4">{line.slice(2)}</h1>;
                      } else if (line.startsWith('## ')) {
                        return <h2 key={i} className="text-xl font-semibold text-white mt-5 mb-3">{line.slice(3)}</h2>;
                      } else if (line.startsWith('### ')) {
                        return <h3 key={i} className="text-lg font-medium text-[#3EBBB7] mt-4 mb-2">{line.slice(4)}</h3>;
                      } else if (line.startsWith('- ')) {
                        return <li key={i} className="ml-4 text-slate-300">{line.slice(2)}</li>;
                      } else if (line.startsWith('**') && line.endsWith('**')) {
                        return <p key={i} className="font-bold text-white my-2">{line.slice(2, -2)}</p>;
                      } else if (line.match(/^\d+\.\s/)) {
                        return <li key={i} className="ml-4 text-slate-300 list-decimal">{line.slice(line.indexOf(' ') + 1)}</li>;
                      } else if (line.startsWith('- [ ]')) {
                        return <div key={i} className="flex items-center gap-2 ml-4"><input type="checkbox" className="rounded" /><span>{line.slice(6)}</span></div>;
                      } else if (line.trim() === '') {
                        return <br key={i} />;
                      }
                      return <p key={i} className="text-slate-300 my-1">{line}</p>;
                    })}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#2d3548] flex items-center justify-between">
                  <div className="text-sm text-slate-400">
                    Duration: {selectedModule.duration} minutes
                  </div>
                  {completedModules.includes(selectedModule.id) ? (
                    <Badge variant="success">Completed</Badge>
                  ) : (
                    <Button onClick={() => handleMarkComplete(selectedModule.id)}>
                      Mark as Complete
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-white mb-3">Resources</h3>
                <ul className="space-y-2">
                  {selectedModule.resources.map((resource, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-400 hover:text-[#3EBBB7] cursor-pointer">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {resource}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-white mb-3">Next Module</h3>
                {(() => {
                  const currentIndex = mockSalesTrainingModules.findIndex(m => m.id === selectedModule.id);
                  const nextModule = mockSalesTrainingModules[currentIndex + 1];
                  if (nextModule) {
                    return (
                      <div
                        className="flex items-center gap-3 cursor-pointer hover:bg-[#1a1f2e] p-2 rounded-lg -mx-2"
                        onClick={() => setSelectedModule(nextModule)}
                      >
                        <span className="text-xl">{nextModule.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-white">{nextModule.title}</p>
                          <p className="text-xs text-slate-400">{nextModule.duration} min</p>
                        </div>
                      </div>
                    );
                  }
                  return <p className="text-sm text-slate-400">You&apos;ve reached the end!</p>;
                })()}
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Sales Training"
      subtitle="Master AI Security Workshop sales - from outreach to closing"
    >
      {/* Progress Overview */}
      <Card className="mb-6 border-[#3EBBB7]/30">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">Your Progress</h2>
              <p className="text-sm text-slate-400">
                {stats.completed} of {stats.total} modules completed ({stats.completedDuration} of {stats.totalDuration} min)
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-48 h-3 bg-[#2d3548] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#3EBBB7] to-[#41DC7A] transition-all"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="text-lg font-bold text-[#3EBBB7]">{progressPercentage}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-slate-400">Total Modules</p>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-slate-400">Completed</p>
            <p className="text-2xl font-bold text-[#41DC7A]">{stats.completed}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-slate-400">Total Time</p>
            <p className="text-2xl font-bold text-white">{Math.round(stats.totalDuration / 60)}h {stats.totalDuration % 60}m</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-slate-400">Time Invested</p>
            <p className="text-2xl font-bold text-[#3EBBB7]">{Math.round(stats.completedDuration / 60)}h {stats.completedDuration % 60}m</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={selectedCategory === 'all' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setSelectedCategory('all')}
        >
          All
        </Button>
        {Object.entries(categoryConfig).map(([key, config]) => (
          <Button
            key={key}
            variant={selectedCategory === key ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setSelectedCategory(key as Category)}
          >
            {config.label}
          </Button>
        ))}
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredModules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            isCompleted={completedModules.includes(module.id)}
            onSelect={() => setSelectedModule(module)}
          />
        ))}
      </div>

      {/* Key Workshop Info */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">AI Security Workshop Offerings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-[#11151C] rounded-lg">
              <h4 className="font-medium text-white mb-2">AI Security Fundamentals</h4>
              <p className="text-sm text-slate-400 mb-2">1-day workshop covering OWASP Top 10 for LLMs</p>
              <p className="text-lg font-bold text-[#3EBBB7]">£5,000 - £8,000</p>
            </div>
            <div className="p-4 bg-[#11151C] rounded-lg">
              <h4 className="font-medium text-white mb-2">LLM Security Deep Dive</h4>
              <p className="text-sm text-slate-400 mb-2">2-day workshop on prompt injection & red teaming</p>
              <p className="text-lg font-bold text-[#3EBBB7]">£10,000 - £15,000</p>
            </div>
            <div className="p-4 bg-[#11151C] rounded-lg">
              <h4 className="font-medium text-white mb-2">AI Agent Security</h4>
              <p className="text-sm text-slate-400 mb-2">2-day workshop on securing autonomous agents</p>
              <p className="text-lg font-bold text-[#3EBBB7]">£12,000 - £18,000</p>
            </div>
            <div className="p-4 bg-[#11151C] rounded-lg">
              <h4 className="font-medium text-white mb-2">Custom Enterprise</h4>
              <p className="text-sm text-slate-400 mb-2">3-5 day tailored program with assessment</p>
              <p className="text-lg font-bold text-[#3EBBB7]">£25,000 - £50,000</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
