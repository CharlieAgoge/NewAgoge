'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Progress } from '@/components/ui/Progress';
import { mockLearningPaths, mockLearningProgress, mockCertificates, mockTeamMembers } from '@/lib/mockData';
import type { LearningPath, LearningModule } from '@/types';

const categoryConfig: Record<LearningPath['category'], { color: string; icon: string; bgColor: string }> = {
  'security': { color: 'text-red-400', icon: '🔒', bgColor: 'bg-red-500/10' },
  'devops': { color: 'text-blue-400', icon: '🔧', bgColor: 'bg-blue-500/10' },
  'cloud': { color: 'text-orange-400', icon: '☁️', bgColor: 'bg-orange-500/10' },
  'programming': { color: 'text-purple-400', icon: '💻', bgColor: 'bg-purple-500/10' },
  'soft-skills': { color: 'text-pink-400', icon: '🤝', bgColor: 'bg-pink-500/10' },
};

const difficultyConfig: Record<LearningPath['difficulty'], { variant: 'default' | 'info' | 'warning' | 'error' }> = {
  'beginner': { variant: 'success' as any },
  'intermediate': { variant: 'info' },
  'advanced': { variant: 'warning' },
  'expert': { variant: 'error' },
};

const moduleTypeIcons: Record<LearningModule['type'], string> = {
  'video': '🎥',
  'article': '📄',
  'quiz': '❓',
  'project': '🚀',
  'lab': '🔬',
};

export default function LearningPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'paths' | 'my-learning' | 'certificates' | 'leaderboard'>('paths');

  // Current user ID (would come from auth in real app)
  const currentUserId = '1';
  const currentUser = mockTeamMembers.find(m => m.id === currentUserId);

  const myProgress = mockLearningProgress.filter(p => p.userId === currentUserId);
  const myCertificates = mockCertificates.filter(c => c.userId === currentUserId);

  const filteredPaths = mockLearningPaths.filter(path =>
    selectedCategory === 'all' || path.category === selectedCategory
  );

  const getPathProgress = (pathId: string) => {
    const progress = myProgress.find(p => p.pathId === pathId);
    if (!progress) return null;
    const path = mockLearningPaths.find(p => p.id === pathId);
    if (!path) return null;
    return {
      ...progress,
      percentage: Math.round((progress.completedModules.length / path.modules.length) * 100),
      totalModules: path.modules.length,
    };
  };

  // Calculate leaderboard
  const leaderboard = mockTeamMembers.map(member => {
    const progress = mockLearningProgress.filter(p => p.userId === member.id);
    const certificates = mockCertificates.filter(c => c.userId === member.id);
    const totalCompleted = progress.filter(p => p.completedAt).length;
    const totalInProgress = progress.filter(p => !p.completedAt).length;
    const avgScore = certificates.length > 0
      ? Math.round(certificates.reduce((sum, c) => sum + c.score, 0) / certificates.length)
      : 0;

    return {
      ...member,
      pathsCompleted: totalCompleted,
      pathsInProgress: totalInProgress,
      certificates: certificates.length,
      avgScore,
      totalPoints: totalCompleted * 100 + certificates.length * 50 + avgScore,
    };
  }).sort((a, b) => b.totalPoints - a.totalPoints);

  return (
    <DashboardLayout
      title="Learning Tracker"
      subtitle="Track your learning journey and earn certifications"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-white">{mockLearningPaths.length}</p>
            <p className="text-sm text-slate-400">Available Paths</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-[#3EBBB7]">{myProgress.filter(p => !p.completedAt).length}</p>
            <p className="text-sm text-slate-400">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-[#41DC7A]">{myProgress.filter(p => p.completedAt).length}</p>
            <p className="text-sm text-slate-400">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-amber-400">{myCertificates.length}</p>
            <p className="text-sm text-slate-400">Certificates Earned</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'paths', label: 'All Paths' },
          { id: 'my-learning', label: 'My Learning' },
          { id: 'certificates', label: 'Certificates' },
          { id: 'leaderboard', label: 'Leaderboard' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${activeTab === tab.id
                ? 'bg-[#3EBBB7]/20 text-[#3EBBB7] border border-[#3EBBB7]/30'
                : 'bg-[#1a1f2e] text-slate-400 border border-[#2d3548] hover:text-white hover:border-[#3d4558]'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* All Paths Tab */}
      {activeTab === 'paths' && (
        <>
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[#3EBBB7]/20 text-[#3EBBB7]'
                  : 'bg-[#1a1f2e] text-slate-400 hover:text-white'
              }`}
            >
              All
            </button>
            {Object.entries(categoryConfig).map(([cat, config]) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                  selectedCategory === cat
                    ? `${config.bgColor} ${config.color}`
                    : 'bg-[#1a1f2e] text-slate-400 hover:text-white'
                }`}
              >
                <span>{config.icon}</span>
                <span className="capitalize">{cat.replace('-', ' ')}</span>
              </button>
            ))}
          </div>

          {/* Learning Paths Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPaths.map((path) => {
              const progress = getPathProgress(path.id);
              const catConfig = categoryConfig[path.category];

              return (
                <Card key={path.id} className="group cursor-pointer">
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl ${catConfig.bgColor} flex items-center justify-center text-2xl`}>
                        {catConfig.icon}
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={difficultyConfig[path.difficulty].variant} size="sm" className="capitalize">
                          {path.difficulty}
                        </Badge>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-semibold text-white group-hover:text-[#3EBBB7] transition-colors mb-2">
                      {path.title}
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-2 mb-4">
                      {path.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                      <span>{path.modules.length} modules</span>
                      <span>{path.estimatedHours}h estimated</span>
                    </div>

                    {/* Progress or Start Button */}
                    {progress ? (
                      <div>
                        <Progress value={progress.percentage} showLabel />
                        {progress.completedAt ? (
                          <div className="flex items-center gap-2 mt-2 text-sm text-[#41DC7A]">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Completed - Score: {progress.score}%
                          </div>
                        ) : (
                          <p className="text-xs text-slate-500 mt-2">
                            {progress.completedModules.length}/{progress.totalModules} modules completed
                          </p>
                        )}
                      </div>
                    ) : (
                      <Button variant="secondary" className="w-full">
                        Start Learning
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}

      {/* My Learning Tab */}
      {activeTab === 'my-learning' && (
        <div className="space-y-6">
          {myProgress.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-lg font-medium text-white mb-2">No learning paths started</h3>
                <p className="text-slate-400 mb-6">Start your learning journey by enrolling in a path</p>
                <Button onClick={() => setActiveTab('paths')}>Browse Paths</Button>
              </CardContent>
            </Card>
          ) : (
            myProgress.map((progress) => {
              const path = mockLearningPaths.find(p => p.id === progress.pathId);
              if (!path) return null;

              const catConfig = categoryConfig[path.category];
              const percentage = Math.round((progress.completedModules.length / path.modules.length) * 100);
              const currentModule = path.modules.find(m => m.id === progress.currentModule);

              return (
                <Card key={progress.pathId}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <div className={`w-16 h-16 rounded-xl ${catConfig.bgColor} flex items-center justify-center text-3xl flex-shrink-0`}>
                        {catConfig.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-white text-lg">{path.title}</h3>
                            <p className="text-sm text-slate-400">{path.description}</p>
                          </div>
                          {progress.completedAt ? (
                            <Badge variant="success">Completed</Badge>
                          ) : (
                            <Badge variant="info">In Progress</Badge>
                          )}
                        </div>

                        <div className="mt-4">
                          <Progress value={percentage} showLabel />
                        </div>

                        {!progress.completedAt && currentModule && (
                          <div className="mt-4 p-4 bg-[#11151C] rounded-lg">
                            <p className="text-xs text-slate-500 mb-1">Continue with:</p>
                            <div className="flex items-center gap-2">
                              <span>{moduleTypeIcons[currentModule.type]}</span>
                              <span className="text-white font-medium">{currentModule.title}</span>
                              <span className="text-xs text-slate-500">({currentModule.duration} min)</span>
                            </div>
                            <Button size="sm" className="mt-3">
                              Resume Learning
                            </Button>
                          </div>
                        )}

                        {/* Module Progress */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {path.modules.map((module) => {
                            const isCompleted = progress.completedModules.includes(module.id);
                            const isCurrent = module.id === progress.currentModule;

                            return (
                              <div
                                key={module.id}
                                className={`px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 ${
                                  isCompleted
                                    ? 'bg-[#41DC7A]/10 text-[#41DC7A]'
                                    : isCurrent
                                    ? 'bg-[#3EBBB7]/10 text-[#3EBBB7] ring-1 ring-[#3EBBB7]'
                                    : 'bg-[#1a1f2e] text-slate-500'
                                }`}
                                title={module.title}
                              >
                                {moduleTypeIcons[module.type]}
                                {isCompleted && <span>✓</span>}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      )}

      {/* Certificates Tab */}
      {activeTab === 'certificates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myCertificates.length === 0 ? (
            <Card className="col-span-full">
              <CardContent className="p-12 text-center">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-lg font-medium text-white mb-2">No certificates yet</h3>
                <p className="text-slate-400 mb-6">Complete learning paths to earn certificates</p>
                <Button onClick={() => setActiveTab('paths')}>Start Learning</Button>
              </CardContent>
            </Card>
          ) : (
            myCertificates.map((cert) => (
              <Card key={cert.id} className="relative overflow-hidden">
                {/* Certificate Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#3EBBB7]/10 to-[#41DC7A]/5" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#41DC7A]/20 to-transparent rounded-bl-full" />

                <CardContent className="relative p-6">
                  <div className="text-center">
                    <div className="text-5xl mb-4">🎓</div>
                    <h3 className="font-bold text-white text-lg mb-1">Certificate of Completion</h3>
                    <p className="text-[#3EBBB7] font-medium mb-4">{cert.pathTitle}</p>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Avatar name={currentUser?.name || 'User'} size="sm" />
                      <span className="text-white">{currentUser?.name}</span>
                    </div>
                    <div className="flex justify-center gap-6 text-sm">
                      <div>
                        <p className="text-slate-400">Score</p>
                        <p className="text-2xl font-bold text-[#41DC7A]">{cert.score}%</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Issued</p>
                        <p className="text-white font-medium">
                          {new Date(cert.issuedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm" className="mt-4">
                      Download PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <Card>
          <CardHeader>
            <CardTitle>Team Learning Leaderboard</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2d3548]">
                    <th className="text-left py-4 px-6 text-sm font-medium text-slate-400">Rank</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-slate-400">Team Member</th>
                    <th className="text-center py-4 px-6 text-sm font-medium text-slate-400">Paths Completed</th>
                    <th className="text-center py-4 px-6 text-sm font-medium text-slate-400">In Progress</th>
                    <th className="text-center py-4 px-6 text-sm font-medium text-slate-400">Certificates</th>
                    <th className="text-center py-4 px-6 text-sm font-medium text-slate-400">Avg Score</th>
                    <th className="text-center py-4 px-6 text-sm font-medium text-slate-400">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((member, index) => (
                    <tr
                      key={member.id}
                      className={`border-b border-[#2d3548] hover:bg-white/5 ${member.id === currentUserId ? 'bg-[#3EBBB7]/5' : ''}`}
                    >
                      <td className="py-4 px-6">
                        <span className={`text-lg font-bold ${
                          index === 0 ? 'text-amber-400' :
                          index === 1 ? 'text-slate-300' :
                          index === 2 ? 'text-orange-400' :
                          'text-slate-500'
                        }`}>
                          {index === 0 && '🥇'}
                          {index === 1 && '🥈'}
                          {index === 2 && '🥉'}
                          {index > 2 && `#${index + 1}`}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <Avatar name={member.name} size="sm" />
                          <div>
                            <p className="font-medium text-white">{member.name}</p>
                            <p className="text-xs text-slate-500">{member.department}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center font-medium text-[#41DC7A]">{member.pathsCompleted}</td>
                      <td className="py-4 px-6 text-center font-medium text-[#3EBBB7]">{member.pathsInProgress}</td>
                      <td className="py-4 px-6 text-center font-medium text-amber-400">{member.certificates}</td>
                      <td className="py-4 px-6 text-center font-medium text-white">
                        {member.avgScore > 0 ? `${member.avgScore}%` : '-'}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="font-bold text-white">{member.totalPoints}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
}
