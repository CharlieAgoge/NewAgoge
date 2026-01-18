// DevSecAI Portal Types

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'lead' | 'member';
  department?: string;
  createdAt: Date;
  lastActive?: Date;
}

export interface TeamMember extends User {
  projects: string[];
  tasksCompleted: number;
  tasksInProgress: number;
  streak: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  owner: string;
  members: string[];
  progress: number;
  startDate: Date;
  dueDate?: Date;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee?: string;
  reporter: string;
  dueDate?: Date;
  tags: string[];
  subtasks?: SubTask[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
}

export interface Activity {
  id: string;
  userId: string;
  type: 'task_created' | 'task_completed' | 'task_updated' | 'project_created' | 'comment_added' | 'member_joined';
  entityType: 'task' | 'project' | 'user';
  entityId: string;
  entityName: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  totalTasks: number;
  completedTasks: number;
  teamMembers: number;
  weeklyProgress: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  link?: string;
  createdAt: Date;
}
