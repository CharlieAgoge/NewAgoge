// DevSecAI Portal Types

export type UserRole = 'admin' | 'ambassador' | 'lead' | 'member';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
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

// JIRA Board Types
export interface JiraTicket {
  id: string;
  key: string;
  title: string;
  description?: string;
  type: 'story' | 'bug' | 'task' | 'epic' | 'subtask';
  status: 'backlog' | 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'lowest' | 'low' | 'medium' | 'high' | 'highest';
  assignee?: string;
  reporter: string;
  projectId: string;
  epicId?: string;
  storyPoints?: number;
  labels: string[];
  sprint?: string;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Sprint {
  id: string;
  name: string;
  goal?: string;
  startDate: Date;
  endDate: Date;
  status: 'planning' | 'active' | 'completed';
}

// Learning Tracker Types
export interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: 'security' | 'devops' | 'cloud' | 'programming' | 'soft-skills';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  estimatedHours: number;
  modules: LearningModule[];
  createdAt: Date;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'article' | 'quiz' | 'project' | 'lab';
  duration: number; // in minutes
  resources: string[];
  order: number;
}

export interface LearningProgress {
  userId: string;
  pathId: string;
  completedModules: string[];
  currentModule?: string;
  startedAt: Date;
  completedAt?: Date;
  score?: number;
}

export interface Certificate {
  id: string;
  userId: string;
  pathId: string;
  pathTitle: string;
  issuedAt: Date;
  score: number;
}

// Tekyu Projects Types
export interface TekyuProject {
  id: string;
  name: string;
  description: string;
  category: 'security-tools' | 'automation' | 'infrastructure' | 'training' | 'client-projects';
  status: 'active' | 'completed' | 'archived';
  techStack: string[];
  repoUrl?: string;
  demoUrl?: string;
  docsUrl?: string;
  thumbnail?: string;
  accessLevel: 'all-employees' | 'team-leads' | 'admins-only';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Knowledge Base Types (Confluence-style)
export interface KBSpace {
  id: string;
  name: string;
  key: string; // Short identifier like 'ENG', 'SEC', 'HR'
  description: string;
  icon?: string;
  color?: string;
  ownerId: string;
  visibility: 'public' | 'restricted';
  allowedRoles?: UserRole[];
  createdAt: Date;
  updatedAt: Date;
}

export interface KBPage {
  id: string;
  spaceId: string;
  parentId?: string; // For nested pages
  title: string;
  content: string; // Markdown/Rich text content
  excerpt?: string;
  author: string;
  lastEditedBy: string;
  status: 'draft' | 'published' | 'archived';
  labels: string[];
  viewCount: number;
  likes: string[]; // User IDs who liked
  isFeatured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface KBPageVersion {
  id: string;
  pageId: string;
  version: number;
  title: string;
  content: string;
  editedBy: string;
  comment?: string;
  createdAt: Date;
}

export interface KBComment {
  id: string;
  pageId: string;
  parentId?: string; // For threaded comments
  userId: string;
  content: string;
  resolved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface KBTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
  category: 'meeting-notes' | 'how-to' | 'runbook' | 'decision' | 'project-plan' | 'custom';
  createdBy: string;
  isGlobal: boolean;
  createdAt: Date;
}

// Certification Types
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  description?: string;
  badgeUrl?: string;
  verificationUrl?: string;
  category: 'cloud' | 'security' | 'devops' | 'programming' | 'other';
}

export interface UserCertification {
  id: string;
  userId: string;
  certificationId: string;
  certificationName: string;
  issuer: string;
  dateEarned: Date;
  expiryDate?: Date;
  credentialId?: string;
  verificationUrl?: string;
  verified: boolean;
  verifiedAt?: Date;
  verifiedBy?: string;
}

// Operator (Team Member) Types - for Admin Portal
export interface Operator {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  department?: string;
  cohort?: string;
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  careerStatus?: 'LEARNING' | 'JOB_HUNTING' | 'INTERVIEWING' | 'EMPLOYED';
  headline?: string;
  location?: string;
  linkedinUrl?: string;
  currentEmployer?: string;
  jobTitle?: string;
  completionPercentage: number;
  lecturesAttended: number;
  sessionsCompleted: number;
  projectsCompleted: number;
  certifications: UserCertification[];
  lastLogin?: Date;
  loginCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// DevSecAI Operator Projects Types
export interface OperatorProject {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  tier: 'starter' | 'professional' | 'expert';
  skills: string[];
  category: 'devsecops' | 'cloud-security' | 'threat-hunting' | 'data-security' | 'ai-security';
  steps: OperatorProjectStep[];
}

export interface OperatorProjectStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  content: {
    overview: string;
    instructions: OperatorInstruction[];
    tasks: OperatorTask[];
    quiz?: OperatorQuiz[];
  };
}

export interface OperatorInstruction {
  id: string;
  title: string;
  details: string;
  tip?: string;
  warning?: string;
  codeBlock?: {
    language: string;
    code: string;
  };
}

export interface OperatorTask {
  id: string;
  text: string;
}

export interface OperatorQuiz {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Operator Project Progress
export interface OperatorProjectProgress {
  userId: string;
  projectId: string;
  currentStep: number;
  completedSteps: number[];
  completedTasks: string[];
  quizScores: Record<number, number>;
  startedAt: Date;
  completedAt?: Date;
}
