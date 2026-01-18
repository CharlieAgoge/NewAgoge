'use client';

import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { mockOperators } from '@/lib/mockData';
import type { Operator, UserRole } from '@/types';

export default function AdminPortalPage() {
  const [searchInput, setSearchInput] = useState('');
  const [expandedOperator, setExpandedOperator] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    cohort: '',
    role: '' as '' | UserRole,
    approvalStatus: '' as '' | 'PENDING' | 'APPROVED' | 'REJECTED',
    careerStatus: '' as '' | 'LEARNING' | 'JOB_HUNTING' | 'INTERVIEWING' | 'EMPLOYED',
  });

  const allCohorts = useMemo(() => {
    const cohorts = new Set(mockOperators.map(o => o.cohort).filter(Boolean));
    return Array.from(cohorts) as string[];
  }, []);

  const filteredOperators = useMemo(() => {
    let filtered = [...mockOperators];

    if (filters.cohort) {
      filtered = filtered.filter(o => o.cohort === filters.cohort);
    }
    if (filters.role) {
      filtered = filtered.filter(o => o.role === filters.role);
    }
    if (filters.approvalStatus) {
      filtered = filtered.filter(o => o.approvalStatus === filters.approvalStatus);
    }
    if (filters.careerStatus) {
      filtered = filtered.filter(o => o.careerStatus === filters.careerStatus);
    }
    if (searchInput) {
      const searchLower = searchInput.toLowerCase();
      filtered = filtered.filter(o =>
        o.name?.toLowerCase().includes(searchLower) ||
        o.email?.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [filters, searchInput]);

  const stats = useMemo(() => ({
    total: mockOperators.length,
    approved: mockOperators.filter(o => o.approvalStatus === 'APPROVED').length,
    pending: mockOperators.filter(o => o.approvalStatus === 'PENDING').length,
    totalCerts: mockOperators.reduce((sum, o) => sum + o.certifications.length, 0),
  }), []);

  const toggleExpanded = (operatorId: string) => {
    setExpandedOperator(expandedOperator === operatorId ? null : operatorId);
  };

  const getApprovalBadge = (status: Operator['approvalStatus']) => {
    const variants: Record<string, 'success' | 'warning' | 'error'> = {
      APPROVED: 'success',
      PENDING: 'warning',
      REJECTED: 'error',
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const getCareerStatus = (status?: Operator['careerStatus']) => {
    if (!status) return <span className="text-slate-500">-</span>;

    const colors: Record<string, string> = {
      LEARNING: 'text-blue-400',
      JOB_HUNTING: 'text-yellow-400',
      INTERVIEWING: 'text-orange-400',
      EMPLOYED: 'text-green-400',
    };

    return (
      <span className={`text-sm ${colors[status] || 'text-slate-400'}`}>
        {status.replace('_', ' ')}
      </span>
    );
  };

  const getProgressBar = (percentage: number) => {
    let colorClass = 'bg-red-500';
    if (percentage >= 75) colorClass = 'bg-[#41DC7A]';
    else if (percentage >= 50) colorClass = 'bg-yellow-500';
    else if (percentage >= 25) colorClass = 'bg-orange-500';

    return (
      <div className="flex items-center gap-2">
        <div className="w-20 h-2 bg-[#2d3548] rounded-full overflow-hidden">
          <div
            className={`h-full ${colorClass} transition-all`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-xs text-slate-400 w-8">{percentage}%</span>
      </div>
    );
  };

  const formatLastLogin = (date?: Date) => {
    if (!date) return 'Never';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <DashboardLayout
      title="Admin Portal"
      subtitle="Manage operators, track progress, and review certifications"
    >
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-slate-400">Total Operators</p>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-slate-400">Approved</p>
            <p className="text-2xl font-bold text-[#41DC7A]">{stats.approved}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-slate-400">Pending</p>
            <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-slate-400">Total Certifications</p>
            <p className="text-2xl font-bold text-[#3EBBB7]">{stats.totalCerts}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Search</label>
              <input
                type="text"
                placeholder="Name or email..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-[#11151C] border border-[#2d3548] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#3EBBB7]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Cohort</label>
              <select
                value={filters.cohort}
                onChange={(e) => setFilters({ ...filters, cohort: e.target.value })}
                className="w-full bg-[#11151C] border border-[#2d3548] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#3EBBB7]"
              >
                <option value="">All Cohorts</option>
                {allCohorts.map((cohort) => (
                  <option key={cohort} value={cohort}>{cohort}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Role</label>
              <select
                value={filters.role}
                onChange={(e) => setFilters({ ...filters, role: e.target.value as UserRole | '' })}
                className="w-full bg-[#11151C] border border-[#2d3548] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#3EBBB7]"
              >
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="ambassador">Ambassador</option>
                <option value="lead">Lead</option>
                <option value="member">Member</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Approval Status</label>
              <select
                value={filters.approvalStatus}
                onChange={(e) => setFilters({ ...filters, approvalStatus: e.target.value as 'PENDING' | 'APPROVED' | 'REJECTED' | '' })}
                className="w-full bg-[#11151C] border border-[#2d3548] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#3EBBB7]"
              >
                <option value="">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Career Status</label>
              <select
                value={filters.careerStatus}
                onChange={(e) => setFilters({ ...filters, careerStatus: e.target.value as 'LEARNING' | 'JOB_HUNTING' | 'INTERVIEWING' | 'EMPLOYED' | '' })}
                className="w-full bg-[#11151C] border border-[#2d3548] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#3EBBB7]"
              >
                <option value="">All Status</option>
                <option value="LEARNING">Learning</option>
                <option value="JOB_HUNTING">Job Hunting</option>
                <option value="INTERVIEWING">Interviewing</option>
                <option value="EMPLOYED">Employed</option>
              </select>
            </div>
          </div>

          {(filters.cohort || filters.role || filters.approvalStatus || filters.careerStatus || searchInput) && (
            <button
              onClick={() => {
                setFilters({ cohort: '', role: '', approvalStatus: '', careerStatus: '' });
                setSearchInput('');
              }}
              className="mt-4 text-sm text-slate-400 hover:text-white"
            >
              Clear filters
            </button>
          )}
        </CardContent>
      </Card>

      {/* Operators Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#11151C] border-b border-[#2d3548]">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-400 w-8"></th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Cohort</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Progress</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Certs</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Last Login</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Career</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Approval</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2d3548]">
                {filteredOperators.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-slate-500">
                      No operators found
                    </td>
                  </tr>
                ) : (
                  filteredOperators.map((operator) => (
                    <>
                      <tr
                        key={operator.id}
                        className={`hover:bg-[#1a1f2e] cursor-pointer ${expandedOperator === operator.id ? 'bg-[#1a1f2e]' : ''}`}
                        onClick={() => toggleExpanded(operator.id)}
                      >
                        <td className="px-4 py-3 text-slate-400">
                          <svg
                            className={`w-4 h-4 transition-transform ${expandedOperator === operator.id ? 'rotate-90' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3EBBB7] to-[#41DC7A] flex items-center justify-center text-[#11151C] text-sm font-medium">
                              {operator.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-sm text-white font-medium">{operator.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-400">{operator.email}</td>
                        <td className="px-4 py-3 text-sm text-slate-400">{operator.cohort || '-'}</td>
                        <td className="px-4 py-3">{getProgressBar(operator.completionPercentage)}</td>
                        <td className="px-4 py-3">
                          <span className={`text-sm font-medium ${operator.certifications.length > 0 ? 'text-[#3EBBB7]' : 'text-slate-500'}`}>
                            {operator.certifications.length}
                            {operator.certifications.filter(c => c.verified).length > 0 && (
                              <span className="text-[#41DC7A] ml-1">
                                ({operator.certifications.filter(c => c.verified).length} verified)
                              </span>
                            )}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-400">{formatLastLogin(operator.lastLogin)}</td>
                        <td className="px-4 py-3">{getCareerStatus(operator.careerStatus)}</td>
                        <td className="px-4 py-3">{getApprovalBadge(operator.approvalStatus)}</td>
                      </tr>

                      {/* Expanded Details Row */}
                      {expandedOperator === operator.id && (
                        <tr key={`${operator.id}-details`} className="bg-[#11151C]/50">
                          <td colSpan={9} className="px-4 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {/* Progress Details */}
                              <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-white border-b border-[#2d3548] pb-2">Progress Details</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-slate-400">Lectures Attended:</span>
                                    <span className="text-white">{operator.lecturesAttended} / 12</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-400">Sessions Completed:</span>
                                    <span className="text-white">{operator.sessionsCompleted} / 12</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-400">Projects Completed:</span>
                                    <span className="text-white">{operator.projectsCompleted}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-400">Overall Progress:</span>
                                    <span className="text-white font-medium">{operator.completionPercentage}%</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-400">Login Count:</span>
                                    <span className="text-white">{operator.loginCount}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Certifications */}
                              <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-white border-b border-[#2d3548] pb-2">
                                  Certifications ({operator.certifications.length})
                                </h4>
                                {operator.certifications.length > 0 ? (
                                  <div className="space-y-2 max-h-40 overflow-y-auto">
                                    {operator.certifications.map((cert) => (
                                      <div key={cert.id} className="text-sm p-2 rounded bg-[#1a1f2e] border border-[#2d3548]">
                                        <div className="flex items-start justify-between gap-2">
                                          <div>
                                            <p className="text-white font-medium">{cert.certificationName}</p>
                                            <p className="text-slate-400 text-xs">{cert.issuer}</p>
                                            <p className="text-slate-500 text-xs">
                                              Earned: {cert.dateEarned.toLocaleDateString()}
                                            </p>
                                          </div>
                                          {cert.verified ? (
                                            <span className="px-2 py-0.5 text-xs bg-[#41DC7A]/20 text-[#41DC7A] rounded border border-[#41DC7A]/30">
                                              Verified
                                            </span>
                                          ) : (
                                            <span className="px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-400 rounded border border-yellow-500/30">
                                              Pending
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-slate-500 text-sm">No certifications yet</p>
                                )}
                              </div>

                              {/* Profile Info */}
                              <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-white border-b border-[#2d3548] pb-2">Profile Info</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-slate-400">Role:</span>
                                    <span className="text-white capitalize">{operator.role}</span>
                                  </div>
                                  {operator.headline && (
                                    <div className="flex justify-between">
                                      <span className="text-slate-400">Headline:</span>
                                      <span className="text-white truncate max-w-[200px]">{operator.headline}</span>
                                    </div>
                                  )}
                                  {operator.currentEmployer && (
                                    <div className="flex justify-between">
                                      <span className="text-slate-400">Employer:</span>
                                      <span className="text-white">{operator.currentEmployer}</span>
                                    </div>
                                  )}
                                  {operator.jobTitle && (
                                    <div className="flex justify-between">
                                      <span className="text-slate-400">Job Title:</span>
                                      <span className="text-white">{operator.jobTitle}</span>
                                    </div>
                                  )}
                                  {operator.location && (
                                    <div className="flex justify-between">
                                      <span className="text-slate-400">Location:</span>
                                      <span className="text-white">{operator.location}</span>
                                    </div>
                                  )}
                                  <div className="flex justify-between">
                                    <span className="text-slate-400">Joined:</span>
                                    <span className="text-white">{operator.createdAt.toLocaleDateString()}</span>
                                  </div>
                                  {operator.linkedinUrl && (
                                    <a
                                      href={operator.linkedinUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-[#3EBBB7] hover:text-[#41DC7A] text-xs inline-block mt-2"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      View LinkedIn Profile
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
