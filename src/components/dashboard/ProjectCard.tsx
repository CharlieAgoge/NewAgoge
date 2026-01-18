'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Progress } from '@/components/ui/Progress';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const statusVariants: Record<Project['status'], 'info' | 'success' | 'warning' | 'default'> = {
    planning: 'default',
    active: 'info',
    'on-hold': 'warning',
    completed: 'success',
  };

  const priorityVariants: Record<Project['priority'], 'default' | 'info' | 'warning' | 'error'> = {
    low: 'default',
    medium: 'info',
    high: 'warning',
    critical: 'error',
  };

  // Mock team members for display
  const teamMembers = [
    { name: 'Sarah Chen' },
    { name: 'Mike Johnson' },
    { name: 'Emily Davis' },
  ];

  return (
    <Link href={`/projects/${project.id}`}>
      <Card className="group cursor-pointer h-full">
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-white group-hover:text-[#3EBBB7] transition-colors">
                {project.name}
              </h3>
              <p className="text-sm text-slate-400 mt-1 line-clamp-2">
                {project.description}
              </p>
            </div>
            <Badge variant={statusVariants[project.status]} size="sm" className="ml-3 capitalize">
              {project.status.replace('-', ' ')}
            </Badge>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <Progress value={project.progress} showLabel />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs bg-[#1a1f2e] text-slate-400 rounded-md"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-0.5 text-xs bg-[#1a1f2e] text-slate-400 rounded-md">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-[#2d3548]">
            {/* Team avatars */}
            <div className="flex -space-x-2">
              {teamMembers.slice(0, 3).map((member, index) => (
                <Avatar
                  key={index}
                  name={member.name}
                  size="sm"
                  className="ring-2 ring-[#1a1f2e]"
                />
              ))}
              {project.members.length > 3 && (
                <div className="w-8 h-8 rounded-full bg-[#252b3d] border-2 border-[#1a1f2e] flex items-center justify-center text-xs text-slate-400">
                  +{project.members.length - 3}
                </div>
              )}
            </div>

            {/* Priority & Due Date */}
            <div className="flex items-center gap-2">
              <Badge variant={priorityVariants[project.priority]} size="sm" className="capitalize">
                {project.priority}
              </Badge>
              {project.dueDate && (
                <span className="text-xs text-slate-500">
                  {new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
