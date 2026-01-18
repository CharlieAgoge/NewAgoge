'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import type { Task } from '@/types';

interface TaskListProps {
  tasks: Task[];
  title?: string;
  showProject?: boolean;
}

export function TaskList({ tasks, title = 'Tasks', showProject = false }: TaskListProps) {
  const statusColors: Record<Task['status'], string> = {
    'todo': 'bg-slate-500',
    'in-progress': 'bg-[#3EBBB7]',
    'review': 'bg-amber-500',
    'done': 'bg-[#41DC7A]',
  };

  const priorityVariants: Record<Task['priority'], 'default' | 'info' | 'warning' | 'error'> = {
    low: 'default',
    medium: 'info',
    high: 'warning',
    critical: 'error',
  };

  // Mock assignees
  const mockAssignees: Record<string, string> = {
    '1': 'Sarah Chen',
    '2': 'Mike Johnson',
    '3': 'Emily Davis',
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <span className="text-sm text-slate-400">{tasks.length} tasks</span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-[#2d3548]">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="px-6 py-4 hover:bg-white/5 transition-colors cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                {/* Status indicator */}
                <div className={`w-2 h-2 mt-2 rounded-full ${statusColors[task.status]}`} />

                {/* Task content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-medium text-white group-hover:text-[#3EBBB7] transition-colors">
                        {task.title}
                      </h4>
                      {task.description && (
                        <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                          {task.description}
                        </p>
                      )}
                    </div>
                    <Badge variant={priorityVariants[task.priority]} size="sm" className="flex-shrink-0 capitalize">
                      {task.priority}
                    </Badge>
                  </div>

                  {/* Task meta */}
                  <div className="flex items-center gap-4 mt-3">
                    {/* Assignee */}
                    {task.assignee && (
                      <div className="flex items-center gap-2">
                        <Avatar name={mockAssignees[task.assignee] || 'Unknown'} size="sm" />
                        <span className="text-xs text-slate-400">
                          {mockAssignees[task.assignee] || 'Unassigned'}
                        </span>
                      </div>
                    )}

                    {/* Due date */}
                    {task.dueDate && (
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    )}

                    {/* Subtasks */}
                    {task.subtasks && task.subtasks.length > 0 && (
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}
                      </div>
                    )}

                    {/* Comments */}
                    {task.comments.length > 0 && (
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {task.comments.length}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {tasks.length === 0 && (
            <div className="px-6 py-8 text-center">
              <svg className="w-12 h-12 mx-auto text-slate-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <p className="text-slate-500">No tasks yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
