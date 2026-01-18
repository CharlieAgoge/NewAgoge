'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { mockJiraTickets, mockSprints, mockTeamMembers } from '@/lib/mockData';
import type { JiraTicket } from '@/types';

type TicketStatus = JiraTicket['status'];

const statusConfig: Record<TicketStatus, { label: string; color: string; bgColor: string }> = {
  'backlog': { label: 'Backlog', color: 'text-slate-400', bgColor: 'bg-slate-500/10' },
  'todo': { label: 'To Do', color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
  'in-progress': { label: 'In Progress', color: 'text-[#3EBBB7]', bgColor: 'bg-[#3EBBB7]/10' },
  'review': { label: 'In Review', color: 'text-amber-400', bgColor: 'bg-amber-500/10' },
  'done': { label: 'Done', color: 'text-[#41DC7A]', bgColor: 'bg-[#41DC7A]/10' },
};

const typeIcons: Record<JiraTicket['type'], { icon: string; color: string }> = {
  'story': { icon: '📖', color: 'text-green-400' },
  'bug': { icon: '🐛', color: 'text-red-400' },
  'task': { icon: '✓', color: 'text-blue-400' },
  'epic': { icon: '⚡', color: 'text-purple-400' },
  'subtask': { icon: '◦', color: 'text-slate-400' },
};

const priorityConfig: Record<JiraTicket['priority'], { color: string; label: string }> = {
  'highest': { color: 'text-red-500', label: '⬆⬆' },
  'high': { color: 'text-orange-500', label: '⬆' },
  'medium': { color: 'text-yellow-500', label: '=' },
  'low': { color: 'text-blue-400', label: '⬇' },
  'lowest': { color: 'text-slate-400', label: '⬇⬇' },
};

function TicketCard({ ticket }: { ticket: JiraTicket }) {
  const assignee = mockTeamMembers.find(m => m.id === ticket.assignee);
  const typeConfig = typeIcons[ticket.type];
  const priority = priorityConfig[ticket.priority];

  return (
    <div className="bg-[#1a1f2e] border border-[#2d3548] rounded-lg p-4 cursor-pointer hover:border-[#3EBBB7]/50 transition-all group mb-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className={typeConfig.color}>{typeConfig.icon}</span>
          <span className="text-xs text-slate-500 font-mono">{ticket.key}</span>
        </div>
        <span className={`text-sm ${priority.color}`} title={ticket.priority}>
          {priority.label}
        </span>
      </div>

      {/* Title */}
      <h4 className="text-sm font-medium text-white group-hover:text-[#3EBBB7] transition-colors mb-3 line-clamp-2">
        {ticket.title}
      </h4>

      {/* Labels */}
      <div className="flex flex-wrap gap-1 mb-3">
        {ticket.labels.slice(0, 2).map((label) => (
          <span
            key={label}
            className="px-1.5 py-0.5 text-xs bg-[#11151C] text-slate-400 rounded"
          >
            {label}
          </span>
        ))}
        {ticket.labels.length > 2 && (
          <span className="px-1.5 py-0.5 text-xs text-slate-500">
            +{ticket.labels.length - 2}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-[#2d3548]">
        {assignee ? (
          <Avatar name={assignee.name} size="sm" />
        ) : (
          <div className="w-8 h-8 rounded-full border-2 border-dashed border-[#2d3548] flex items-center justify-center">
            <span className="text-xs text-slate-500">?</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          {ticket.storyPoints && (
            <span className="px-2 py-0.5 text-xs bg-[#3EBBB7]/10 text-[#3EBBB7] rounded-full font-medium">
              {ticket.storyPoints} SP
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BoardPage() {
  const [selectedSprint, setSelectedSprint] = useState('sprint-1');
  const [showBacklog, setShowBacklog] = useState(false);

  const activeSprint = mockSprints.find(s => s.id === selectedSprint);
  const columns: TicketStatus[] = showBacklog
    ? ['backlog', 'todo', 'in-progress', 'review', 'done']
    : ['todo', 'in-progress', 'review', 'done'];

  const getTicketsByStatus = (status: TicketStatus) => {
    if (showBacklog && status === 'backlog') {
      return mockJiraTickets.filter(t => t.status === 'backlog');
    }
    return mockJiraTickets.filter(t => t.status === status && t.sprint === selectedSprint);
  };

  const sprintTickets = mockJiraTickets.filter(t => t.sprint === selectedSprint);
  const totalPoints = sprintTickets.reduce((sum, t) => sum + (t.storyPoints || 0), 0);
  const completedPoints = sprintTickets
    .filter(t => t.status === 'done')
    .reduce((sum, t) => sum + (t.storyPoints || 0), 0);

  return (
    <DashboardLayout
      title="Sprint Board"
      subtitle="JIRA-style task board for the team"
    >
      {/* Sprint Header */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <select
                value={selectedSprint}
                onChange={(e) => setSelectedSprint(e.target.value)}
                className="bg-[#11151C] border border-[#2d3548] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#3EBBB7]"
              >
                {mockSprints.map((sprint) => (
                  <option key={sprint.id} value={sprint.id}>
                    {sprint.name}
                  </option>
                ))}
              </select>
              {activeSprint && (
                <div>
                  <Badge variant={activeSprint.status === 'active' ? 'success' : 'default'} className="capitalize">
                    {activeSprint.status}
                  </Badge>
                </div>
              )}
            </div>

            <div className="flex items-center gap-6">
              {/* Sprint Stats */}
              <div className="flex items-center gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Tickets: </span>
                  <span className="text-white font-medium">{sprintTickets.length}</span>
                </div>
                <div>
                  <span className="text-slate-400">Points: </span>
                  <span className="text-[#41DC7A] font-medium">{completedPoints}</span>
                  <span className="text-slate-400">/{totalPoints}</span>
                </div>
                <div className="w-32 h-2 bg-[#11151C] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#3EBBB7] to-[#41DC7A] rounded-full"
                    style={{ width: `${totalPoints > 0 ? (completedPoints / totalPoints) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={showBacklog ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setShowBacklog(!showBacklog)}
                >
                  {showBacklog ? 'Hide' : 'Show'} Backlog
                </Button>
                <Button size="sm">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Issue
                </Button>
              </div>
            </div>
          </div>

          {activeSprint?.goal && (
            <div className="mt-4 pt-4 border-t border-[#2d3548]">
              <p className="text-sm text-slate-400">
                <span className="font-medium text-white">Sprint Goal: </span>
                {activeSprint.goal}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Kanban Board */}
      <div className={`grid gap-4 ${showBacklog ? 'grid-cols-5' : 'grid-cols-4'}`}>
        {columns.map((status) => {
          const tickets = getTicketsByStatus(status);
          const config = statusConfig[status];
          const columnPoints = tickets.reduce((sum, t) => sum + (t.storyPoints || 0), 0);

          return (
            <div key={status} className="flex flex-col min-h-[500px]">
              {/* Column Header */}
              <div className={`flex items-center justify-between px-3 py-2 rounded-lg ${config.bgColor} mb-4`}>
                <div className="flex items-center gap-2">
                  <span className={`font-medium text-sm ${config.color}`}>{config.label}</span>
                  <span className="text-xs text-slate-500 bg-[#11151C] px-2 py-0.5 rounded-full">
                    {tickets.length}
                  </span>
                </div>
                {columnPoints > 0 && (
                  <span className="text-xs text-slate-500">
                    {columnPoints} pts
                  </span>
                )}
              </div>

              {/* Tickets */}
              <div className="flex-1 space-y-0">
                {tickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}

                {tickets.length === 0 && (
                  <div className="flex items-center justify-center h-24 border-2 border-dashed border-[#2d3548] rounded-lg">
                    <p className="text-sm text-slate-500">No tickets</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <Card className="mt-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <span className="text-slate-400 font-medium">Legend:</span>
            {Object.entries(typeIcons).map(([type, config]) => (
              <div key={type} className="flex items-center gap-1">
                <span>{config.icon}</span>
                <span className="text-slate-400 capitalize">{type}</span>
              </div>
            ))}
            <div className="border-l border-[#2d3548] pl-6 flex items-center gap-4">
              {Object.entries(priorityConfig).map(([priority, config]) => (
                <div key={priority} className="flex items-center gap-1">
                  <span className={config.color}>{config.label}</span>
                  <span className="text-slate-400 capitalize">{priority}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
