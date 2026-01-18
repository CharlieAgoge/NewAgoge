'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { mockTasks, mockProjects } from '@/lib/mockData';
import type { Task } from '@/types';

type TaskStatus = Task['status'];

const statusConfig: Record<TaskStatus, { label: string; color: string; bgColor: string }> = {
  'todo': { label: 'To Do', color: 'text-slate-400', bgColor: 'bg-slate-500/10' },
  'in-progress': { label: 'In Progress', color: 'text-[#3EBBB7]', bgColor: 'bg-[#3EBBB7]/10' },
  'review': { label: 'Review', color: 'text-amber-400', bgColor: 'bg-amber-500/10' },
  'done': { label: 'Done', color: 'text-[#41DC7A]', bgColor: 'bg-[#41DC7A]/10' },
};

const priorityVariants: Record<Task['priority'], 'default' | 'info' | 'warning' | 'error'> = {
  low: 'default',
  medium: 'info',
  high: 'warning',
  critical: 'error',
};

// Mock assignees
const mockAssignees: Record<string, string> = {
  '1': 'Charlie Peter',
  '2': 'Sarah Chen',
  '3': 'Mike Johnson',
  '4': 'Emily Davis',
  '5': 'Alex Turner',
};

function TaskCard({ task }: { task: Task }) {
  const project = mockProjects.find(p => p.id === task.projectId);

  return (
    <div className="bg-[#1a1f2e] border border-[#2d3548] rounded-lg p-4 cursor-pointer hover:border-[#3EBBB7]/50 transition-all group">
      <div className="flex items-start justify-between gap-2 mb-3">
        <h4 className="text-sm font-medium text-white group-hover:text-[#3EBBB7] transition-colors line-clamp-2">
          {task.title}
        </h4>
        <Badge variant={priorityVariants[task.priority]} size="sm" className="capitalize flex-shrink-0">
          {task.priority}
        </Badge>
      </div>

      {task.description && (
        <p className="text-xs text-slate-400 mb-3 line-clamp-2">{task.description}</p>
      )}

      {/* Project tag */}
      {project && (
        <div className="mb-3">
          <span className="text-xs px-2 py-1 bg-[#11151C] text-slate-400 rounded">
            {project.name}
          </span>
        </div>
      )}

      {/* Subtasks progress */}
      {task.subtasks && task.subtasks.length > 0 && (
        <div className="mb-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length} subtasks
          </div>
          <div className="mt-1 w-full h-1 bg-[#11151C] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#3EBBB7] to-[#41DC7A] rounded-full"
              style={{ width: `${(task.subtasks.filter(st => st.completed).length / task.subtasks.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-[#2d3548]">
        {task.assignee ? (
          <div className="flex items-center gap-2">
            <Avatar name={mockAssignees[task.assignee] || 'User'} size="sm" />
            <span className="text-xs text-slate-400">{mockAssignees[task.assignee]}</span>
          </div>
        ) : (
          <span className="text-xs text-slate-500">Unassigned</span>
        )}

        <div className="flex items-center gap-3">
          {task.comments.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {task.comments.length}
            </div>
          )}
          {task.dueDate && (
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TasksPage() {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const columns: TaskStatus[] = ['todo', 'in-progress', 'review', 'done'];

  const getTasksByStatus = (status: TaskStatus) =>
    mockTasks.filter(task => task.status === status);

  return (
    <DashboardLayout
      title="Tasks"
      subtitle="Kanban board view of all tasks across projects."
    >
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </Button>
          <Button variant="secondary" size="sm">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            My Tasks
          </Button>
        </div>
        <Button>
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Task
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((status) => {
          const tasks = getTasksByStatus(status);
          const config = statusConfig[status];

          return (
            <div key={status} className="flex flex-col">
              {/* Column Header */}
              <div className={`flex items-center justify-between px-3 py-2 rounded-lg ${config.bgColor} mb-4`}>
                <div className="flex items-center gap-2">
                  <span className={`font-medium text-sm ${config.color}`}>{config.label}</span>
                  <span className="text-xs text-slate-500 bg-[#11151C] px-2 py-0.5 rounded-full">
                    {tasks.length}
                  </span>
                </div>
                <button className="p-1 text-slate-400 hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              {/* Tasks */}
              <div className="flex-1 space-y-3 min-h-[200px]">
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}

                {tasks.length === 0 && (
                  <div className="flex items-center justify-center h-32 border-2 border-dashed border-[#2d3548] rounded-lg">
                    <p className="text-sm text-slate-500">No tasks</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
