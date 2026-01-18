'use client';

import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockPipelineDeals, mockOutreachActivities, mockTeamMembers } from '@/lib/mockData';
import type { PipelineDeal, OutreachActivity } from '@/types';

type Stage = PipelineDeal['stage'];

const stageConfig: Record<Stage, { label: string; color: string; bgColor: string }> = {
  'lead': { label: 'Lead', color: 'text-slate-300', bgColor: 'bg-slate-500/20' },
  'contacted': { label: 'Contacted', color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
  'meeting-scheduled': { label: 'Meeting Scheduled', color: 'text-purple-400', bgColor: 'bg-purple-500/20' },
  'proposal-sent': { label: 'Proposal Sent', color: 'text-amber-400', bgColor: 'bg-amber-500/20' },
  'negotiation': { label: 'Negotiation', color: 'text-orange-400', bgColor: 'bg-orange-500/20' },
  'closed-won': { label: 'Closed Won', color: 'text-[#41DC7A]', bgColor: 'bg-[#41DC7A]/20' },
  'closed-lost': { label: 'Closed Lost', color: 'text-red-400', bgColor: 'bg-red-500/20' },
};

const workshopTypes = {
  'ai-security-fundamentals': { label: 'AI Security Fundamentals', shortLabel: 'Fundamentals' },
  'llm-security': { label: 'LLM Security Deep Dive', shortLabel: 'LLM Security' },
  'ai-agent-security': { label: 'AI Agent Security', shortLabel: 'Agent Security' },
  'custom': { label: 'Custom Enterprise', shortLabel: 'Custom' },
};

const outreachMethods = {
  'linkedin': { label: 'LinkedIn', icon: '💼' },
  'email': { label: 'Email', icon: '📧' },
  'cold-call': { label: 'Cold Call', icon: '📞' },
  'referral': { label: 'Referral', icon: '🤝' },
  'inbound': { label: 'Inbound', icon: '📥' },
  'event': { label: 'Event', icon: '🎪' },
};

function DealCard({ deal, onClick }: { deal: PipelineDeal; onClick: () => void }) {
  const stage = stageConfig[deal.stage];
  const workshop = workshopTypes[deal.workshopType];
  const outreach = outreachMethods[deal.outreachMethod];

  return (
    <Card
      className="cursor-pointer hover:border-[#3EBBB7]/50 transition-all mb-3"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="font-semibold text-white text-sm truncate">{deal.company.name}</h4>
          <span className="text-lg" title={outreach.label}>{outreach.icon}</span>
        </div>

        <p className="text-xs text-slate-400 mb-2">{deal.company.industry}</p>

        <div className="flex items-center gap-2 mb-2">
          <Badge variant="info" size="sm">{workshop.shortLabel}</Badge>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-[#3EBBB7] font-semibold">
            £{deal.value.toLocaleString()}
          </span>
          <span className="text-slate-500">
            {deal.probability}% prob
          </span>
        </div>

        {deal.nextFollowUp && (
          <div className="mt-2 pt-2 border-t border-[#2d3548]">
            <p className="text-xs text-amber-400">
              Follow up: {new Date(deal.nextFollowUp).toLocaleDateString()}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function PipelineColumn({
  stage,
  deals,
  onDealClick
}: {
  stage: Stage;
  deals: PipelineDeal[];
  onDealClick: (deal: PipelineDeal) => void;
}) {
  const config = stageConfig[stage];
  const totalValue = deals.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="flex-shrink-0 w-72">
      <div className={`p-3 rounded-t-lg ${config.bgColor}`}>
        <div className="flex items-center justify-between">
          <h3 className={`font-semibold text-sm ${config.color}`}>{config.label}</h3>
          <span className="text-xs text-slate-400 bg-[#11151C]/50 px-2 py-0.5 rounded">
            {deals.length}
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          £{totalValue.toLocaleString()}
        </p>
      </div>
      <div className="bg-[#11151C]/50 p-3 rounded-b-lg min-h-[400px]">
        {deals.map(deal => (
          <DealCard key={deal.id} deal={deal} onClick={() => onDealClick(deal)} />
        ))}
        {deals.length === 0 && (
          <p className="text-xs text-slate-500 text-center py-4">No deals</p>
        )}
      </div>
    </div>
  );
}

function DealDetailModal({
  deal,
  activities,
  onClose
}: {
  deal: PipelineDeal;
  activities: OutreachActivity[];
  onClose: () => void;
}) {
  const stage = stageConfig[deal.stage];
  const workshop = workshopTypes[deal.workshopType];
  const outreach = outreachMethods[deal.outreachMethod];
  const assignee = mockTeamMembers.find(m => m.id === deal.assignedTo);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">{deal.company.name}</h2>
              <p className="text-slate-400">{deal.company.industry} • {deal.company.size}</p>
            </div>
            <Button variant="secondary" size="sm" onClick={onClose}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-3 bg-[#11151C] rounded-lg">
              <p className="text-xs text-slate-400 mb-1">Deal Value</p>
              <p className="text-lg font-bold text-[#3EBBB7]">£{deal.value.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-[#11151C] rounded-lg">
              <p className="text-xs text-slate-400 mb-1">Probability</p>
              <p className="text-lg font-bold text-white">{deal.probability}%</p>
            </div>
            <div className="p-3 bg-[#11151C] rounded-lg">
              <p className="text-xs text-slate-400 mb-1">Stage</p>
              <Badge variant={deal.stage === 'closed-won' ? 'success' : deal.stage === 'closed-lost' ? 'error' : 'info'}>
                {stage.label}
              </Badge>
            </div>
            <div className="p-3 bg-[#11151C] rounded-lg">
              <p className="text-xs text-slate-400 mb-1">Workshop Type</p>
              <p className="text-sm font-medium text-white">{workshop.label}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Outreach Method</h4>
              <p className="text-sm text-slate-300">
                {outreach.icon} {outreach.label}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Assigned To</h4>
              <p className="text-sm text-slate-300">{assignee?.name || 'Unassigned'}</p>
            </div>
          </div>

          {/* Contacts */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-white mb-3">Contacts</h4>
            <div className="space-y-2">
              {deal.contacts.map(contact => (
                <div key={contact.id} className="p-3 bg-[#11151C] rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{contact.name}</p>
                    <p className="text-xs text-slate-400">{contact.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#3EBBB7]">{contact.email}</p>
                    {contact.isPrimary && <Badge variant="success" size="sm">Primary</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          {deal.notes && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white mb-2">Notes</h4>
              <p className="text-sm text-slate-300 bg-[#11151C] p-3 rounded-lg">{deal.notes}</p>
            </div>
          )}

          {/* Activity Timeline */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Activity Timeline</h4>
            <div className="space-y-3">
              {activities.length > 0 ? activities.map(activity => (
                <div key={activity.id} className="flex gap-3 p-3 bg-[#11151C] rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-[#3EBBB7]/20 flex items-center justify-center flex-shrink-0">
                    {activity.type === 'email' && '📧'}
                    {activity.type === 'call' && '📞'}
                    {activity.type === 'linkedin-message' && '💼'}
                    {activity.type === 'meeting' && '🤝'}
                    {activity.type === 'demo' && '🖥️'}
                    {activity.type === 'proposal' && '📄'}
                    {activity.type === 'follow-up' && '🔄'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-white">{activity.subject}</p>
                      <span className="text-xs text-slate-500">
                        {new Date(activity.performedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{activity.notes}</p>
                    {activity.outcome && (
                      <Badge
                        variant={activity.outcome === 'positive' ? 'success' : activity.outcome === 'negative' ? 'error' : 'default'}
                        size="sm"
                        className="mt-2"
                      >
                        {activity.outcome}
                      </Badge>
                    )}
                  </div>
                </div>
              )) : (
                <p className="text-sm text-slate-500 text-center py-4">No activities recorded yet</p>
              )}
            </div>
          </div>

          {/* Key Dates */}
          <div className="mt-6 pt-4 border-t border-[#2d3548] grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-slate-400">Last Contact</p>
              <p className="text-sm text-white">
                {deal.lastContactDate ? new Date(deal.lastContactDate).toLocaleDateString() : 'Never'}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Next Follow-up</p>
              <p className="text-sm text-amber-400">
                {deal.nextFollowUp ? new Date(deal.nextFollowUp).toLocaleDateString() : 'Not scheduled'}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Expected Close</p>
              <p className="text-sm text-[#3EBBB7]">
                {deal.expectedCloseDate ? new Date(deal.expectedCloseDate).toLocaleDateString() : 'TBD'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SalesPipelinePage() {
  const [selectedDeal, setSelectedDeal] = useState<PipelineDeal | null>(null);
  const [filterWorkshop, setFilterWorkshop] = useState<string>('all');
  const [filterAssignee, setFilterAssignee] = useState<string>('all');

  const filteredDeals = useMemo(() => {
    return mockPipelineDeals.filter(deal => {
      if (filterWorkshop !== 'all' && deal.workshopType !== filterWorkshop) return false;
      if (filterAssignee !== 'all' && deal.assignedTo !== filterAssignee) return false;
      return true;
    });
  }, [filterWorkshop, filterAssignee]);

  const dealsByStage = useMemo(() => {
    const stages: Stage[] = ['lead', 'contacted', 'meeting-scheduled', 'proposal-sent', 'negotiation', 'closed-won', 'closed-lost'];
    return stages.reduce((acc, stage) => {
      acc[stage] = filteredDeals.filter(d => d.stage === stage);
      return acc;
    }, {} as Record<Stage, PipelineDeal[]>);
  }, [filteredDeals]);

  const stats = useMemo(() => {
    const activeDeals = filteredDeals.filter(d => !['closed-won', 'closed-lost'].includes(d.stage));
    const wonDeals = filteredDeals.filter(d => d.stage === 'closed-won');
    const lostDeals = filteredDeals.filter(d => d.stage === 'closed-lost');

    return {
      totalPipeline: activeDeals.reduce((sum, d) => sum + d.value, 0),
      weightedPipeline: activeDeals.reduce((sum, d) => sum + (d.value * d.probability / 100), 0),
      wonValue: wonDeals.reduce((sum, d) => sum + d.value, 0),
      activeDeals: activeDeals.length,
      winRate: wonDeals.length + lostDeals.length > 0
        ? Math.round((wonDeals.length / (wonDeals.length + lostDeals.length)) * 100)
        : 0,
    };
  }, [filteredDeals]);

  const selectedDealActivities = useMemo(() => {
    if (!selectedDeal) return [];
    return mockOutreachActivities.filter(a => a.dealId === selectedDeal.id);
  }, [selectedDeal]);

  const stages: Stage[] = ['lead', 'contacted', 'meeting-scheduled', 'proposal-sent', 'negotiation', 'closed-won', 'closed-lost'];

  return (
    <DashboardLayout
      title="Sales Pipeline"
      subtitle="Track AI Security Workshop opportunities"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <Card className="border-[#3EBBB7]/30">
          <CardContent className="p-4">
            <p className="text-xs text-slate-400">Total Pipeline</p>
            <p className="text-xl font-bold text-white">£{stats.totalPipeline.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-slate-400">Weighted Pipeline</p>
            <p className="text-xl font-bold text-[#3EBBB7]">£{Math.round(stats.weightedPipeline).toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-slate-400">Won Revenue</p>
            <p className="text-xl font-bold text-[#41DC7A]">£{stats.wonValue.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-slate-400">Active Deals</p>
            <p className="text-xl font-bold text-white">{stats.activeDeals}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-slate-400">Win Rate</p>
            <p className="text-xl font-bold text-amber-400">{stats.winRate}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={filterWorkshop}
          onChange={(e) => setFilterWorkshop(e.target.value)}
          className="px-3 py-2 bg-[#1a1f2e] border border-[#2d3548] rounded-lg text-sm text-white focus:outline-none focus:border-[#3EBBB7]"
        >
          <option value="all">All Workshops</option>
          {Object.entries(workshopTypes).map(([key, val]) => (
            <option key={key} value={key}>{val.label}</option>
          ))}
        </select>

        <select
          value={filterAssignee}
          onChange={(e) => setFilterAssignee(e.target.value)}
          className="px-3 py-2 bg-[#1a1f2e] border border-[#2d3548] rounded-lg text-sm text-white focus:outline-none focus:border-[#3EBBB7]"
        >
          <option value="all">All Assignees</option>
          {mockTeamMembers.map(member => (
            <option key={member.id} value={member.id}>{member.name}</option>
          ))}
        </select>

        <Button variant="primary" size="sm">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Deal
        </Button>
      </div>

      {/* Pipeline Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {stages.map(stage => (
            <PipelineColumn
              key={stage}
              stage={stage}
              deals={dealsByStage[stage]}
              onDealClick={setSelectedDeal}
            />
          ))}
        </div>
      </div>

      {/* Workshop Offerings Reference */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Workshop Pricing Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-[#11151C] rounded-lg">
              <h4 className="font-medium text-white mb-1">AI Security Fundamentals</h4>
              <p className="text-xs text-slate-400 mb-2">1-day workshop • OWASP Top 10 for LLMs</p>
              <p className="text-lg font-bold text-[#3EBBB7]">£5,000 - £8,000</p>
            </div>
            <div className="p-4 bg-[#11151C] rounded-lg">
              <h4 className="font-medium text-white mb-1">LLM Security Deep Dive</h4>
              <p className="text-xs text-slate-400 mb-2">2-day workshop • Prompt injection & red teaming</p>
              <p className="text-lg font-bold text-[#3EBBB7]">£10,000 - £15,000</p>
            </div>
            <div className="p-4 bg-[#11151C] rounded-lg">
              <h4 className="font-medium text-white mb-1">AI Agent Security</h4>
              <p className="text-xs text-slate-400 mb-2">2-day workshop • Autonomous agent security</p>
              <p className="text-lg font-bold text-[#3EBBB7]">£12,000 - £18,000</p>
            </div>
            <div className="p-4 bg-[#11151C] rounded-lg">
              <h4 className="font-medium text-white mb-1">Custom Enterprise</h4>
              <p className="text-xs text-slate-400 mb-2">3-5 day tailored program with assessment</p>
              <p className="text-lg font-bold text-[#3EBBB7]">£25,000 - £50,000</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deal Detail Modal */}
      {selectedDeal && (
        <DealDetailModal
          deal={selectedDeal}
          activities={selectedDealActivities}
          onClose={() => setSelectedDeal(null)}
        />
      )}
    </DashboardLayout>
  );
}
