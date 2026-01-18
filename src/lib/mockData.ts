import type { Project, Task, TeamMember, Activity, DashboardStats, JiraTicket, Sprint, LearningPath, LearningProgress, Certificate, TekyuProject, KBSpace, KBPage, KBTemplate } from '@/types';

export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    email: 'charlie@devsecai.io',
    name: 'Charlie Peter',
    role: 'admin',
    department: 'Engineering',
    projects: ['1', '2', '3'],
    tasksCompleted: 47,
    tasksInProgress: 5,
    streak: 12,
    createdAt: new Date('2024-01-15'),
    lastActive: new Date(),
  },
  {
    id: '2',
    email: 'sarah@devsecai.io',
    name: 'Sarah Chen',
    role: 'ambassador',
    department: 'Security',
    projects: ['1', '2'],
    tasksCompleted: 38,
    tasksInProgress: 3,
    streak: 8,
    createdAt: new Date('2024-02-01'),
    lastActive: new Date(Date.now() - 60000),
  },
  {
    id: '3',
    email: 'mike@devsecai.io',
    name: 'Mike Johnson',
    role: 'ambassador',
    department: 'DevOps',
    projects: ['2', '3'],
    tasksCompleted: 29,
    tasksInProgress: 4,
    streak: 5,
    createdAt: new Date('2024-03-10'),
    lastActive: new Date(Date.now() - 3600000),
  },
  {
    id: '4',
    email: 'emily@devsecai.io',
    name: 'Emily Davis',
    role: 'lead',
    department: 'Engineering',
    projects: ['1', '3'],
    tasksCompleted: 22,
    tasksInProgress: 2,
    streak: 3,
    createdAt: new Date('2024-04-05'),
    lastActive: new Date(Date.now() - 7200000),
  },
  {
    id: '5',
    email: 'alex@devsecai.io',
    name: 'Alex Turner',
    role: 'member',
    department: 'Security',
    projects: ['1'],
    tasksCompleted: 15,
    tasksInProgress: 6,
    streak: 7,
    createdAt: new Date('2024-05-20'),
    lastActive: new Date(Date.now() - 120000),
  },
];

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'DevSecAI Platform v2.0',
    description: 'Major platform upgrade including new AI security features, improved SDLC integration, and enhanced compliance reporting.',
    status: 'active',
    priority: 'critical',
    owner: '1',
    members: ['1', '2', '4', '5'],
    progress: 68,
    startDate: new Date('2024-10-01'),
    dueDate: new Date('2025-02-28'),
    tags: ['platform', 'ai', 'security', 'sdlc'],
    createdAt: new Date('2024-09-15'),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Security Pipeline Automation',
    description: 'Implementing automated security scanning and remediation workflows for the CI/CD pipeline.',
    status: 'active',
    priority: 'high',
    owner: '2',
    members: ['1', '2', '3'],
    progress: 45,
    startDate: new Date('2024-11-01'),
    dueDate: new Date('2025-01-31'),
    tags: ['automation', 'ci/cd', 'security'],
    createdAt: new Date('2024-10-20'),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Compliance Dashboard',
    description: 'Building a comprehensive compliance tracking dashboard for EU AI Act, CRA, and DORA requirements.',
    status: 'planning',
    priority: 'medium',
    owner: '3',
    members: ['3', '4'],
    progress: 15,
    startDate: new Date('2025-01-15'),
    dueDate: new Date('2025-04-30'),
    tags: ['compliance', 'dashboard', 'regulations'],
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'API Security Module',
    description: 'Developing advanced API security features including threat detection and rate limiting.',
    status: 'active',
    priority: 'high',
    owner: '2',
    members: ['2', '5'],
    progress: 82,
    startDate: new Date('2024-09-01'),
    dueDate: new Date('2025-01-20'),
    tags: ['api', 'security', 'module'],
    createdAt: new Date('2024-08-15'),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'Documentation Overhaul',
    description: 'Complete rewrite of technical documentation and user guides for all DevSecAI products.',
    status: 'on-hold',
    priority: 'low',
    owner: '4',
    members: ['4'],
    progress: 30,
    startDate: new Date('2024-11-15'),
    dueDate: new Date('2025-03-31'),
    tags: ['documentation', 'guides'],
    createdAt: new Date('2024-11-01'),
    updatedAt: new Date(),
  },
];

export const mockTasks: Task[] = [
  {
    id: '1',
    projectId: '1',
    title: 'Implement AI threat detection algorithm',
    description: 'Develop machine learning model for detecting security threats in code repositories.',
    status: 'in-progress',
    priority: 'critical',
    assignee: '1',
    reporter: '2',
    dueDate: new Date('2025-01-25'),
    tags: ['ai', 'ml', 'security'],
    subtasks: [
      { id: 's1', title: 'Research existing models', completed: true },
      { id: 's2', title: 'Prepare training data', completed: true },
      { id: 's3', title: 'Train model', completed: false },
      { id: 's4', title: 'Validate accuracy', completed: false },
    ],
    comments: [
      { id: 'c1', userId: '2', content: 'Great progress so far!', createdAt: new Date() },
    ],
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date(),
  },
  {
    id: '2',
    projectId: '1',
    title: 'Design new dashboard UI',
    description: 'Create mockups for the updated security dashboard interface.',
    status: 'review',
    priority: 'high',
    assignee: '4',
    reporter: '1',
    dueDate: new Date('2025-01-20'),
    tags: ['ui', 'design'],
    subtasks: [],
    comments: [],
    createdAt: new Date('2025-01-05'),
    updatedAt: new Date(),
  },
  {
    id: '3',
    projectId: '2',
    title: 'Setup GitHub Actions integration',
    description: 'Configure GitHub Actions workflows for automated security scanning.',
    status: 'done',
    priority: 'high',
    assignee: '3',
    reporter: '2',
    dueDate: new Date('2025-01-15'),
    tags: ['github', 'automation'],
    subtasks: [],
    comments: [
      { id: 'c2', userId: '2', content: 'Tested and working perfectly.', createdAt: new Date() },
    ],
    createdAt: new Date('2025-01-02'),
    updatedAt: new Date(),
  },
  {
    id: '4',
    projectId: '2',
    title: 'Implement SAST tool integration',
    description: 'Integrate static application security testing tools into the pipeline.',
    status: 'in-progress',
    priority: 'high',
    assignee: '2',
    reporter: '1',
    dueDate: new Date('2025-01-28'),
    tags: ['sast', 'security', 'integration'],
    subtasks: [
      { id: 's5', title: 'Research SAST tools', completed: true },
      { id: 's6', title: 'Setup SonarQube', completed: true },
      { id: 's7', title: 'Configure rules', completed: false },
    ],
    comments: [],
    createdAt: new Date('2025-01-08'),
    updatedAt: new Date(),
  },
  {
    id: '5',
    projectId: '3',
    title: 'Define compliance requirements',
    description: 'Document all EU AI Act, CRA, and DORA compliance requirements.',
    status: 'todo',
    priority: 'medium',
    assignee: '3',
    reporter: '1',
    dueDate: new Date('2025-02-01'),
    tags: ['compliance', 'documentation'],
    subtasks: [],
    comments: [],
    createdAt: new Date('2025-01-12'),
    updatedAt: new Date(),
  },
  {
    id: '6',
    projectId: '4',
    title: 'API rate limiting implementation',
    description: 'Implement intelligent rate limiting for API endpoints.',
    status: 'in-progress',
    priority: 'high',
    assignee: '5',
    reporter: '2',
    dueDate: new Date('2025-01-22'),
    tags: ['api', 'security'],
    subtasks: [
      { id: 's8', title: 'Design rate limiting algorithm', completed: true },
      { id: 's9', title: 'Implement Redis caching', completed: true },
      { id: 's10', title: 'Add monitoring', completed: false },
    ],
    comments: [],
    createdAt: new Date('2025-01-06'),
    updatedAt: new Date(),
  },
  {
    id: '7',
    projectId: '1',
    title: 'Write unit tests for security module',
    description: 'Create comprehensive unit tests for the new security scanning module.',
    status: 'todo',
    priority: 'medium',
    assignee: '4',
    reporter: '2',
    dueDate: new Date('2025-01-30'),
    tags: ['testing', 'security'],
    subtasks: [],
    comments: [],
    createdAt: new Date('2025-01-14'),
    updatedAt: new Date(),
  },
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    userId: '1',
    type: 'task_completed',
    entityType: 'task',
    entityId: '3',
    entityName: 'Setup GitHub Actions integration',
    createdAt: new Date(Date.now() - 1800000),
  },
  {
    id: '2',
    userId: '2',
    type: 'comment_added',
    entityType: 'task',
    entityId: '1',
    entityName: 'Implement AI threat detection algorithm',
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    id: '3',
    userId: '4',
    type: 'task_updated',
    entityType: 'task',
    entityId: '2',
    entityName: 'Design new dashboard UI',
    metadata: { field: 'status', from: 'in-progress', to: 'review' },
    createdAt: new Date(Date.now() - 7200000),
  },
  {
    id: '4',
    userId: '3',
    type: 'project_created',
    entityType: 'project',
    entityId: '3',
    entityName: 'Compliance Dashboard',
    createdAt: new Date(Date.now() - 86400000),
  },
  {
    id: '5',
    userId: '5',
    type: 'member_joined',
    entityType: 'user',
    entityId: '5',
    entityName: 'Alex Turner',
    createdAt: new Date(Date.now() - 172800000),
  },
  {
    id: '6',
    userId: '2',
    type: 'task_created',
    entityType: 'task',
    entityId: '4',
    entityName: 'Implement SAST tool integration',
    createdAt: new Date(Date.now() - 259200000),
  },
  {
    id: '7',
    userId: '1',
    type: 'task_updated',
    entityType: 'task',
    entityId: '6',
    entityName: 'API rate limiting implementation',
    metadata: { field: 'priority', from: 'medium', to: 'high' },
    createdAt: new Date(Date.now() - 345600000),
  },
];

export const mockDashboardStats: DashboardStats = {
  totalProjects: 5,
  activeProjects: 3,
  totalTasks: 7,
  completedTasks: 1,
  teamMembers: 5,
  weeklyProgress: 23,
};

// JIRA Board Data
export const mockSprints: Sprint[] = [
  {
    id: 'sprint-1',
    name: 'Sprint 23 - Security Features',
    goal: 'Complete AI threat detection and API security modules',
    startDate: new Date('2025-01-13'),
    endDate: new Date('2025-01-27'),
    status: 'active',
  },
  {
    id: 'sprint-2',
    name: 'Sprint 24 - Compliance',
    goal: 'Begin compliance dashboard implementation',
    startDate: new Date('2025-01-27'),
    endDate: new Date('2025-02-10'),
    status: 'planning',
  },
];

export const mockJiraTickets: JiraTicket[] = [
  {
    id: 'j1',
    key: 'DEV-101',
    title: 'Implement AI threat detection algorithm',
    description: 'Develop ML model for detecting security threats in code repositories',
    type: 'story',
    status: 'in-progress',
    priority: 'highest',
    assignee: '1',
    reporter: '2',
    projectId: '1',
    storyPoints: 8,
    labels: ['ai', 'ml', 'security'],
    sprint: 'sprint-1',
    dueDate: new Date('2025-01-25'),
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date(),
  },
  {
    id: 'j2',
    key: 'DEV-102',
    title: 'Design new dashboard UI mockups',
    description: 'Create high-fidelity mockups for the security dashboard redesign',
    type: 'task',
    status: 'review',
    priority: 'high',
    assignee: '4',
    reporter: '1',
    projectId: '1',
    storyPoints: 3,
    labels: ['ui', 'design'],
    sprint: 'sprint-1',
    dueDate: new Date('2025-01-20'),
    createdAt: new Date('2025-01-05'),
    updatedAt: new Date(),
  },
  {
    id: 'j3',
    key: 'DEV-103',
    title: 'Fix authentication bypass vulnerability',
    description: 'Critical security fix for OAuth token validation',
    type: 'bug',
    status: 'done',
    priority: 'highest',
    assignee: '2',
    reporter: '5',
    projectId: '1',
    storyPoints: 5,
    labels: ['security', 'critical', 'auth'],
    sprint: 'sprint-1',
    createdAt: new Date('2025-01-08'),
    updatedAt: new Date(),
  },
  {
    id: 'j4',
    key: 'DEV-104',
    title: 'Implement SAST tool integration',
    description: 'Integrate SonarQube and Semgrep into CI/CD pipeline',
    type: 'story',
    status: 'in-progress',
    priority: 'high',
    assignee: '3',
    reporter: '2',
    projectId: '2',
    storyPoints: 5,
    labels: ['sast', 'ci-cd', 'automation'],
    sprint: 'sprint-1',
    dueDate: new Date('2025-01-28'),
    createdAt: new Date('2025-01-08'),
    updatedAt: new Date(),
  },
  {
    id: 'j5',
    key: 'DEV-105',
    title: 'API rate limiting with Redis',
    description: 'Implement distributed rate limiting using Redis cluster',
    type: 'story',
    status: 'in-progress',
    priority: 'high',
    assignee: '5',
    reporter: '2',
    projectId: '4',
    storyPoints: 5,
    labels: ['api', 'redis', 'performance'],
    sprint: 'sprint-1',
    dueDate: new Date('2025-01-22'),
    createdAt: new Date('2025-01-06'),
    updatedAt: new Date(),
  },
  {
    id: 'j6',
    key: 'DEV-106',
    title: 'Write unit tests for security module',
    description: 'Achieve 90% code coverage for the security scanning module',
    type: 'task',
    status: 'todo',
    priority: 'medium',
    assignee: '4',
    reporter: '2',
    projectId: '1',
    storyPoints: 3,
    labels: ['testing', 'quality'],
    sprint: 'sprint-1',
    dueDate: new Date('2025-01-30'),
    createdAt: new Date('2025-01-14'),
    updatedAt: new Date(),
  },
  {
    id: 'j7',
    key: 'DEV-107',
    title: 'Define EU AI Act compliance requirements',
    description: 'Document all compliance requirements for EU AI Act',
    type: 'task',
    status: 'backlog',
    priority: 'medium',
    assignee: '3',
    reporter: '1',
    projectId: '3',
    storyPoints: 3,
    labels: ['compliance', 'documentation'],
    dueDate: new Date('2025-02-01'),
    createdAt: new Date('2025-01-12'),
    updatedAt: new Date(),
  },
  {
    id: 'j8',
    key: 'DEV-108',
    title: 'Setup GitHub Actions workflow',
    description: 'Configure automated security scanning in GitHub Actions',
    type: 'task',
    status: 'done',
    priority: 'high',
    assignee: '3',
    reporter: '2',
    projectId: '2',
    storyPoints: 2,
    labels: ['github', 'automation'],
    sprint: 'sprint-1',
    createdAt: new Date('2025-01-02'),
    updatedAt: new Date(),
  },
  {
    id: 'j9',
    key: 'DEV-109',
    title: 'Memory leak in threat scanner',
    description: 'Scanner process memory grows unbounded after 1000+ scans',
    type: 'bug',
    status: 'todo',
    priority: 'high',
    assignee: '1',
    reporter: '3',
    projectId: '1',
    storyPoints: 3,
    labels: ['bug', 'performance'],
    sprint: 'sprint-1',
    createdAt: new Date('2025-01-16'),
    updatedAt: new Date(),
  },
  {
    id: 'j10',
    key: 'DEV-110',
    title: 'Add dark mode support',
    description: 'Implement system-wide dark mode toggle',
    type: 'story',
    status: 'backlog',
    priority: 'low',
    reporter: '4',
    projectId: '1',
    storyPoints: 2,
    labels: ['ui', 'feature'],
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date(),
  },
];

// Learning Tracker Data
export const mockLearningPaths: LearningPath[] = [
  {
    id: 'lp-1',
    title: 'DevSecOps Fundamentals',
    description: 'Learn the foundations of integrating security into the DevOps pipeline. Covers SAST, DAST, SCA, and security automation.',
    category: 'security',
    difficulty: 'beginner',
    estimatedHours: 20,
    modules: [
      { id: 'm1', title: 'Introduction to DevSecOps', description: 'Understanding the DevSecOps philosophy', type: 'video', duration: 45, resources: [], order: 1 },
      { id: 'm2', title: 'SAST Tools & Techniques', description: 'Static Application Security Testing', type: 'video', duration: 60, resources: [], order: 2 },
      { id: 'm3', title: 'DAST Fundamentals', description: 'Dynamic Application Security Testing', type: 'video', duration: 60, resources: [], order: 3 },
      { id: 'm4', title: 'Hands-on: Setting up Security Pipeline', description: 'Configure a complete security pipeline', type: 'lab', duration: 120, resources: [], order: 4 },
      { id: 'm5', title: 'DevSecOps Quiz', description: 'Test your knowledge', type: 'quiz', duration: 30, resources: [], order: 5 },
    ],
    createdAt: new Date('2024-06-01'),
  },
  {
    id: 'lp-2',
    title: 'AWS Security Specialization',
    description: 'Master AWS security services including IAM, KMS, Security Hub, GuardDuty, and more.',
    category: 'cloud',
    difficulty: 'intermediate',
    estimatedHours: 35,
    modules: [
      { id: 'm6', title: 'IAM Deep Dive', description: 'Advanced IAM policies and best practices', type: 'video', duration: 90, resources: [], order: 1 },
      { id: 'm7', title: 'KMS & Encryption', description: 'Key management and data encryption', type: 'video', duration: 60, resources: [], order: 2 },
      { id: 'm8', title: 'Security Hub & GuardDuty', description: 'AWS security monitoring services', type: 'video', duration: 75, resources: [], order: 3 },
      { id: 'm9', title: 'AWS Security Lab', description: 'Hands-on security configuration', type: 'lab', duration: 180, resources: [], order: 4 },
      { id: 'm10', title: 'AWS Security Assessment', description: 'Final assessment', type: 'quiz', duration: 45, resources: [], order: 5 },
    ],
    createdAt: new Date('2024-07-15'),
  },
  {
    id: 'lp-3',
    title: 'Secure Coding with Python',
    description: 'Learn to write secure Python code. Covers OWASP Top 10, input validation, authentication, and cryptography.',
    category: 'programming',
    difficulty: 'intermediate',
    estimatedHours: 25,
    modules: [
      { id: 'm11', title: 'OWASP Top 10 for Python', description: 'Common vulnerabilities in Python applications', type: 'video', duration: 60, resources: [], order: 1 },
      { id: 'm12', title: 'Input Validation & Sanitization', description: 'Preventing injection attacks', type: 'video', duration: 45, resources: [], order: 2 },
      { id: 'm13', title: 'Authentication & Session Management', description: 'Secure auth patterns', type: 'video', duration: 60, resources: [], order: 3 },
      { id: 'm14', title: 'Cryptography in Python', description: 'Using cryptographic libraries correctly', type: 'video', duration: 75, resources: [], order: 4 },
      { id: 'm15', title: 'Secure Coding Project', description: 'Build a secure web application', type: 'project', duration: 240, resources: [], order: 5 },
    ],
    createdAt: new Date('2024-08-01'),
  },
  {
    id: 'lp-4',
    title: 'Kubernetes Security',
    description: 'Secure your Kubernetes clusters. Covers RBAC, network policies, pod security, and runtime protection.',
    category: 'devops',
    difficulty: 'advanced',
    estimatedHours: 30,
    modules: [
      { id: 'm16', title: 'K8s Security Overview', description: 'Kubernetes security architecture', type: 'video', duration: 60, resources: [], order: 1 },
      { id: 'm17', title: 'RBAC & Service Accounts', description: 'Access control in Kubernetes', type: 'video', duration: 75, resources: [], order: 2 },
      { id: 'm18', title: 'Network Policies', description: 'Securing pod-to-pod communication', type: 'video', duration: 60, resources: [], order: 3 },
      { id: 'm19', title: 'Pod Security Standards', description: 'Securing workloads', type: 'video', duration: 60, resources: [], order: 4 },
      { id: 'm20', title: 'K8s Security Lab', description: 'Secure a vulnerable cluster', type: 'lab', duration: 180, resources: [], order: 5 },
    ],
    createdAt: new Date('2024-09-01'),
  },
  {
    id: 'lp-5',
    title: 'Threat Modeling Masterclass',
    description: 'Learn systematic approaches to identifying and mitigating security threats using STRIDE, PASTA, and Attack Trees.',
    category: 'security',
    difficulty: 'advanced',
    estimatedHours: 20,
    modules: [
      { id: 'm21', title: 'Introduction to Threat Modeling', description: 'Why and when to threat model', type: 'video', duration: 45, resources: [], order: 1 },
      { id: 'm22', title: 'STRIDE Methodology', description: 'Microsoft STRIDE framework', type: 'video', duration: 60, resources: [], order: 2 },
      { id: 'm23', title: 'PASTA Framework', description: 'Process for Attack Simulation', type: 'video', duration: 60, resources: [], order: 3 },
      { id: 'm24', title: 'Attack Trees', description: 'Visual threat analysis', type: 'video', duration: 45, resources: [], order: 4 },
      { id: 'm25', title: 'Threat Modeling Workshop', description: 'Model a real application', type: 'project', duration: 180, resources: [], order: 5 },
    ],
    createdAt: new Date('2024-10-01'),
  },
];

export const mockLearningProgress: LearningProgress[] = [
  { userId: '1', pathId: 'lp-1', completedModules: ['m1', 'm2', 'm3', 'm4', 'm5'], startedAt: new Date('2024-08-01'), completedAt: new Date('2024-09-15'), score: 95 },
  { userId: '1', pathId: 'lp-2', completedModules: ['m6', 'm7', 'm8'], currentModule: 'm9', startedAt: new Date('2024-11-01') },
  { userId: '1', pathId: 'lp-5', completedModules: ['m21', 'm22'], currentModule: 'm23', startedAt: new Date('2025-01-05') },
  { userId: '2', pathId: 'lp-1', completedModules: ['m1', 'm2', 'm3', 'm4', 'm5'], startedAt: new Date('2024-07-01'), completedAt: new Date('2024-08-20'), score: 92 },
  { userId: '2', pathId: 'lp-4', completedModules: ['m16', 'm17', 'm18', 'm19', 'm20'], startedAt: new Date('2024-10-01'), completedAt: new Date('2024-12-01'), score: 88 },
  { userId: '3', pathId: 'lp-1', completedModules: ['m1', 'm2'], currentModule: 'm3', startedAt: new Date('2025-01-02') },
  { userId: '4', pathId: 'lp-3', completedModules: ['m11', 'm12', 'm13'], currentModule: 'm14', startedAt: new Date('2024-12-01') },
  { userId: '5', pathId: 'lp-2', completedModules: ['m6'], currentModule: 'm7', startedAt: new Date('2025-01-10') },
];

export const mockCertificates: Certificate[] = [
  { id: 'cert-1', userId: '1', pathId: 'lp-1', pathTitle: 'DevSecOps Fundamentals', issuedAt: new Date('2024-09-15'), score: 95 },
  { id: 'cert-2', userId: '2', pathId: 'lp-1', pathTitle: 'DevSecOps Fundamentals', issuedAt: new Date('2024-08-20'), score: 92 },
  { id: 'cert-3', userId: '2', pathId: 'lp-4', pathTitle: 'Kubernetes Security', issuedAt: new Date('2024-12-01'), score: 88 },
];

// Tekyu Projects Data
export const mockTekyuProjects: TekyuProject[] = [
  {
    id: 'tp-1',
    name: 'DevSecAI Platform',
    description: 'The Secure SDLC Platform - One app that equips your engineers to build anything securely. Automated security requirements, agnostic DevSecOps visibility, and policy-to-action engine.',
    category: 'security-tools',
    status: 'active',
    techStack: ['Next.js', 'TypeScript', 'Python', 'AWS', 'Terraform', 'PostgreSQL'],
    repoUrl: 'https://github.com/tekyu/devsecai-platform',
    demoUrl: 'https://app.devsecai.io',
    docsUrl: 'https://docs.devsecai.io',
    accessLevel: 'all-employees',
    createdBy: '1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  {
    id: 'tp-2',
    name: 'Security Pipeline Automation',
    description: 'Automated security scanning and remediation workflows for CI/CD pipelines. Integrates with GitHub Actions, GitLab CI, and Jenkins.',
    category: 'automation',
    status: 'active',
    techStack: ['Python', 'GitHub Actions', 'Docker', 'SonarQube', 'Semgrep'],
    repoUrl: 'https://github.com/tekyu/security-pipeline',
    docsUrl: 'https://docs.devsecai.io/pipeline',
    accessLevel: 'all-employees',
    createdBy: '2',
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date(),
  },
  {
    id: 'tp-3',
    name: 'Compliance Dashboard',
    description: 'Comprehensive compliance tracking for EU AI Act, CRA, DORA, and other regulatory requirements. Real-time compliance scoring and remediation guidance.',
    category: 'security-tools',
    status: 'active',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS Lambda'],
    repoUrl: 'https://github.com/tekyu/compliance-dashboard',
    accessLevel: 'all-employees',
    createdBy: '3',
    createdAt: new Date('2024-06-01'),
    updatedAt: new Date(),
  },
  {
    id: 'tp-4',
    name: 'Threat Modeling Tool',
    description: 'Visual threat modeling application supporting STRIDE, PASTA, and Attack Trees methodologies. Collaborative features for security teams.',
    category: 'security-tools',
    status: 'completed',
    techStack: ['React', 'D3.js', 'Node.js', 'MongoDB'],
    repoUrl: 'https://github.com/tekyu/threat-modeler',
    demoUrl: 'https://threats.devsecai.io',
    accessLevel: 'all-employees',
    createdBy: '1',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-10-15'),
  },
  {
    id: 'tp-5',
    name: 'AWS Security Baseline',
    description: 'Terraform modules and CloudFormation templates for implementing AWS security best practices. Includes CIS benchmarks and custom security controls.',
    category: 'infrastructure',
    status: 'active',
    techStack: ['Terraform', 'AWS', 'Python', 'CloudFormation'],
    repoUrl: 'https://github.com/tekyu/aws-security-baseline',
    docsUrl: 'https://docs.devsecai.io/aws-baseline',
    accessLevel: 'all-employees',
    createdBy: '2',
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date(),
  },
  {
    id: 'tp-6',
    name: 'Security Training Platform',
    description: 'Interactive security training with hands-on labs, quizzes, and certification tracking. Covers secure coding, cloud security, and DevSecOps.',
    category: 'training',
    status: 'active',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Docker', 'Kubernetes'],
    repoUrl: 'https://github.com/tekyu/security-training',
    demoUrl: 'https://learn.devsecai.io',
    accessLevel: 'all-employees',
    createdBy: '4',
    createdAt: new Date('2024-05-01'),
    updatedAt: new Date(),
  },
  {
    id: 'tp-7',
    name: 'API Security Gateway',
    description: 'Intelligent API gateway with threat detection, rate limiting, and security analytics. Protects APIs from OWASP API Top 10 vulnerabilities.',
    category: 'security-tools',
    status: 'active',
    techStack: ['Go', 'Redis', 'PostgreSQL', 'Kubernetes', 'Prometheus'],
    repoUrl: 'https://github.com/tekyu/api-security-gateway',
    docsUrl: 'https://docs.devsecai.io/api-gateway',
    accessLevel: 'all-employees',
    createdBy: '5',
    createdAt: new Date('2024-07-01'),
    updatedAt: new Date(),
  },
  {
    id: 'tp-8',
    name: 'Vulnerability Scanner',
    description: 'Container and infrastructure vulnerability scanner with AI-powered prioritization. Integrates with JIRA and Slack for automated ticketing.',
    category: 'security-tools',
    status: 'active',
    techStack: ['Python', 'Trivy', 'Grype', 'PostgreSQL', 'RabbitMQ'],
    repoUrl: 'https://github.com/tekyu/vuln-scanner',
    accessLevel: 'all-employees',
    createdBy: '2',
    createdAt: new Date('2024-08-01'),
    updatedAt: new Date(),
  },
  {
    id: 'tp-9',
    name: 'Secrets Detection Engine',
    description: 'Real-time secrets detection for Git repositories. Prevents credential leaks with pre-commit hooks and CI/CD integration.',
    category: 'automation',
    status: 'completed',
    techStack: ['Rust', 'Python', 'Git', 'Docker'],
    repoUrl: 'https://github.com/tekyu/secrets-detector',
    docsUrl: 'https://docs.devsecai.io/secrets',
    accessLevel: 'all-employees',
    createdBy: '1',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-11-01'),
  },
  {
    id: 'tp-10',
    name: 'Cyber Agoge Portal',
    description: 'Team progress tracking portal for DevSecAI. Track projects, tasks, and team activity with integrated learning paths.',
    category: 'training',
    status: 'active',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    repoUrl: 'https://github.com/CharlieAgoge/NewAgoge',
    accessLevel: 'all-employees',
    createdBy: '1',
    createdAt: new Date('2025-01-18'),
    updatedAt: new Date(),
  },
];

// Knowledge Base Data
export const mockKBSpaces: KBSpace[] = [
  {
    id: 'space-1',
    name: 'Engineering',
    key: 'ENG',
    description: 'Technical documentation, architecture decisions, and engineering best practices.',
    icon: '⚙️',
    color: '#3EBBB7',
    ownerId: '1',
    visibility: 'public',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date(),
  },
  {
    id: 'space-2',
    name: 'Security',
    key: 'SEC',
    description: 'Security policies, incident response procedures, and compliance documentation.',
    icon: '🔒',
    color: '#41DC7A',
    ownerId: '2',
    visibility: 'public',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date(),
  },
  {
    id: 'space-3',
    name: 'DevOps',
    key: 'OPS',
    description: 'CI/CD pipelines, infrastructure documentation, and deployment guides.',
    icon: '🚀',
    color: '#6366F1',
    ownerId: '3',
    visibility: 'public',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date(),
  },
  {
    id: 'space-4',
    name: 'Onboarding',
    key: 'ONB',
    description: 'New employee onboarding materials, company policies, and getting started guides.',
    icon: '👋',
    color: '#F59E0B',
    ownerId: '1',
    visibility: 'public',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date(),
  },
  {
    id: 'space-5',
    name: 'Leadership',
    key: 'LEAD',
    description: 'Strategic planning, team management, and confidential leadership materials.',
    icon: '👑',
    color: '#EF4444',
    ownerId: '1',
    visibility: 'restricted',
    allowedRoles: ['admin', 'ambassador'],
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date(),
  },
];

export const mockKBPages: KBPage[] = [
  // Engineering Space Pages
  {
    id: 'page-1',
    spaceId: 'space-1',
    title: 'Welcome to DevSecAI Engineering',
    content: `# Welcome to DevSecAI Engineering

Welcome to the Engineering knowledge base! This space contains all technical documentation, architecture decisions, and engineering best practices for the DevSecAI platform.

## Quick Links

- [Architecture Overview](#architecture)
- [Development Setup](#setup)
- [Coding Standards](#standards)
- [API Documentation](#api)

## Our Mission

We build secure-by-default tools that help engineering teams ship secure software faster. Our platform integrates security into every stage of the SDLC.

## Key Technologies

| Category | Technologies |
|----------|-------------|
| Frontend | Next.js, TypeScript, Tailwind CSS |
| Backend | Python, FastAPI, Node.js |
| Infrastructure | AWS, Terraform, Kubernetes |
| Security | SonarQube, Semgrep, Trivy |

## Getting Help

- **Slack**: #engineering-help
- **On-call**: Check PagerDuty rotation
- **Documentation**: You're already here!`,
    excerpt: 'Introduction to the Engineering knowledge base and quick links to key resources.',
    author: '1',
    lastEditedBy: '1',
    status: 'published',
    labels: ['welcome', 'getting-started'],
    viewCount: 156,
    likes: ['2', '3', '4', '5'],
    isFeatured: true,
    order: 1,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date(),
  },
  {
    id: 'page-2',
    spaceId: 'space-1',
    title: 'Development Environment Setup',
    content: `# Development Environment Setup

This guide will help you set up your local development environment for DevSecAI.

## Prerequisites

- Node.js 20+
- Python 3.11+
- Docker Desktop
- AWS CLI configured
- Git

## Step 1: Clone the Repositories

\`\`\`bash
git clone https://github.com/devsecai/platform.git
git clone https://github.com/devsecai/api.git
git clone https://github.com/devsecai/infrastructure.git
\`\`\`

## Step 2: Install Dependencies

\`\`\`bash
# Frontend
cd platform && npm install

# Backend
cd ../api && pip install -r requirements.txt
\`\`\`

## Step 3: Configure Environment

Copy the example environment files:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Update the following variables:
- \`DATABASE_URL\`
- \`AWS_ACCESS_KEY_ID\`
- \`AWS_SECRET_ACCESS_KEY\`

## Step 4: Start Development Servers

\`\`\`bash
# Start all services
docker-compose up -d

# Start frontend
npm run dev

# Start backend
python -m uvicorn main:app --reload
\`\`\`

## Troubleshooting

### Port conflicts
If port 3000 is in use, update \`PORT\` in your \`.env.local\`.

### Database connection issues
Ensure PostgreSQL container is running: \`docker ps\``,
    excerpt: 'Complete guide to setting up your local development environment.',
    author: '1',
    lastEditedBy: '4',
    status: 'published',
    labels: ['setup', 'development', 'getting-started'],
    viewCount: 234,
    likes: ['2', '3', '5'],
    isFeatured: true,
    order: 2,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-12-10'),
  },
  {
    id: 'page-3',
    spaceId: 'space-1',
    parentId: 'page-2',
    title: 'IDE Configuration',
    content: `# IDE Configuration

Recommended IDE settings for DevSecAI development.

## VS Code Extensions

Install these essential extensions:

- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Python** - Python language support
- **Tailwind CSS IntelliSense** - Tailwind autocomplete
- **GitLens** - Git history and blame

## Recommended Settings

Add to your \`settings.json\`:

\`\`\`json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.experimental.classRegex": [
    ["cn\\\\(([^)]*)\\\\)", "'([^']*)'"]
  ]
}
\`\`\`

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Format document | Shift + Alt + F |
| Go to definition | F12 |
| Find all references | Shift + F12 |
| Quick fix | Ctrl + . |`,
    excerpt: 'Recommended IDE configuration for optimal development experience.',
    author: '4',
    lastEditedBy: '4',
    status: 'published',
    labels: ['ide', 'setup', 'vscode'],
    viewCount: 89,
    likes: ['1', '3'],
    isFeatured: false,
    order: 1,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-11-15'),
  },
  // Security Space Pages
  {
    id: 'page-4',
    spaceId: 'space-2',
    title: 'Security Policies Overview',
    content: `# Security Policies Overview

DevSecAI maintains strict security policies to protect our platform and customer data.

## Core Principles

1. **Security by Default** - All features must be secure out of the box
2. **Defense in Depth** - Multiple layers of security controls
3. **Least Privilege** - Minimum necessary access rights
4. **Zero Trust** - Verify explicitly, assume breach

## Compliance Standards

We maintain compliance with:

- SOC 2 Type II
- ISO 27001
- GDPR
- EU AI Act (in progress)

## Security Controls

### Authentication
- MFA required for all accounts
- SSO via SAML/OIDC
- Session timeout: 4 hours

### Data Protection
- Encryption at rest (AES-256)
- Encryption in transit (TLS 1.3)
- Key rotation every 90 days

### Access Control
- Role-based access control (RBAC)
- Regular access reviews (quarterly)
- JIT access for production

## Incident Response

Report security incidents immediately to:
- **Email**: security@devsecai.io
- **Slack**: #security-incidents
- **PagerDuty**: Security On-Call`,
    excerpt: 'Overview of DevSecAI security policies and compliance standards.',
    author: '2',
    lastEditedBy: '2',
    status: 'published',
    labels: ['security', 'policy', 'compliance'],
    viewCount: 312,
    likes: ['1', '3', '4', '5'],
    isFeatured: true,
    order: 1,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-12-01'),
  },
  {
    id: 'page-5',
    spaceId: 'space-2',
    title: 'Incident Response Runbook',
    content: `# Incident Response Runbook

## Severity Levels

| Level | Description | Response Time | Examples |
|-------|-------------|---------------|----------|
| P1 | Critical | 15 minutes | Data breach, service down |
| P2 | High | 1 hour | Security vulnerability, partial outage |
| P3 | Medium | 4 hours | Performance degradation |
| P4 | Low | 24 hours | Minor issues |

## Response Procedure

### 1. Detection & Triage (0-15 min)
- [ ] Acknowledge alert in PagerDuty
- [ ] Create incident channel: #inc-YYYYMMDD-brief-description
- [ ] Assign Incident Commander (IC)
- [ ] Initial severity assessment

### 2. Containment (15-60 min)
- [ ] Isolate affected systems
- [ ] Preserve evidence (logs, snapshots)
- [ ] Block malicious IPs/users if applicable
- [ ] Notify stakeholders

### 3. Eradication (1-4 hours)
- [ ] Identify root cause
- [ ] Remove threat/fix vulnerability
- [ ] Patch affected systems
- [ ] Verify fix in staging

### 4. Recovery (4-24 hours)
- [ ] Restore services gradually
- [ ] Monitor for recurrence
- [ ] Validate data integrity
- [ ] Clear incident channel

### 5. Post-Mortem (Within 5 days)
- [ ] Schedule blameless post-mortem
- [ ] Document timeline
- [ ] Identify action items
- [ ] Share learnings

## Contacts

| Role | Primary | Backup |
|------|---------|--------|
| Security Lead | Sarah Chen | Charlie Peter |
| Engineering | Charlie Peter | Emily Davis |
| Legal | External Counsel | - |`,
    excerpt: 'Step-by-step incident response procedures for security events.',
    author: '2',
    lastEditedBy: '1',
    status: 'published',
    labels: ['security', 'runbook', 'incident-response'],
    viewCount: 178,
    likes: ['1', '4'],
    isFeatured: true,
    order: 2,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2025-01-05'),
  },
  // DevOps Space Pages
  {
    id: 'page-6',
    spaceId: 'space-3',
    title: 'CI/CD Pipeline Overview',
    content: `# CI/CD Pipeline Overview

Our CI/CD pipeline ensures secure, reliable deployments.

## Pipeline Stages

\`\`\`
┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│  Build  │ → │  Test   │ → │  Scan   │ → │ Deploy  │ → │ Monitor │
└─────────┘   └─────────┘   └─────────┘   └─────────┘   └─────────┘
\`\`\`

### 1. Build Stage
- Compile code
- Build Docker images
- Generate artifacts

### 2. Test Stage
- Unit tests (>80% coverage required)
- Integration tests
- E2E tests (critical paths)

### 3. Security Scan Stage
- SAST: SonarQube, Semgrep
- SCA: Dependabot, Snyk
- Container scanning: Trivy
- Secrets detection: GitLeaks

### 4. Deploy Stage
- Deploy to staging (automatic)
- Deploy to production (manual approval)
- Blue-green deployment

### 5. Monitor Stage
- Health checks
- Performance metrics
- Error tracking

## Environments

| Environment | URL | Auto-deploy |
|-------------|-----|-------------|
| Development | dev.devsecai.io | Every commit |
| Staging | staging.devsecai.io | PR merge |
| Production | app.devsecai.io | Manual |

## Rollback Procedure

\`\`\`bash
# Quick rollback to previous version
./scripts/rollback.sh --env production --version previous
\`\`\``,
    excerpt: 'Overview of our CI/CD pipeline architecture and deployment process.',
    author: '3',
    lastEditedBy: '3',
    status: 'published',
    labels: ['devops', 'ci-cd', 'deployment'],
    viewCount: 145,
    likes: ['1', '2', '4'],
    isFeatured: true,
    order: 1,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-12-20'),
  },
  // Onboarding Space Pages
  {
    id: 'page-7',
    spaceId: 'space-4',
    title: 'Welcome to DevSecAI!',
    content: `# Welcome to DevSecAI! 🎉

Congratulations on joining the team! We're excited to have you.

## Your First Week

### Day 1
- [ ] Complete HR paperwork
- [ ] Set up workstation and accounts
- [ ] Meet your manager and buddy
- [ ] Read this knowledge base!

### Day 2-3
- [ ] Complete security training
- [ ] Set up development environment
- [ ] Review codebase architecture
- [ ] Shadow a team member

### Day 4-5
- [ ] Pick up your first ticket
- [ ] Attend team standup
- [ ] 1:1 with your manager
- [ ] Ask lots of questions!

## Key Accounts to Set Up

1. **Google Workspace** - Email, Calendar, Drive
2. **Slack** - Team communication
3. **GitHub** - Code repositories
4. **AWS** - Cloud infrastructure
5. **1Password** - Password management
6. **Notion** - Additional documentation

## Important Slack Channels

- **#general** - Company-wide announcements
- **#engineering** - Engineering discussions
- **#security** - Security updates
- **#random** - Fun stuff

## Your Onboarding Buddy

You've been assigned an onboarding buddy who will help you through your first weeks. Don't hesitate to ask them anything!

## Questions?

Reach out to your manager or post in #new-hires. There are no stupid questions!`,
    excerpt: 'Welcome guide for new DevSecAI team members.',
    author: '1',
    lastEditedBy: '1',
    status: 'published',
    labels: ['onboarding', 'welcome', 'getting-started'],
    viewCount: 89,
    likes: ['2', '3', '4', '5'],
    isFeatured: true,
    order: 1,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2025-01-10'),
  },
  // Leadership Space Page (restricted)
  {
    id: 'page-8',
    spaceId: 'space-5',
    title: 'Q1 2025 Strategic Priorities',
    content: `# Q1 2025 Strategic Priorities

## Executive Summary

This quarter we focus on three key areas: product expansion, team growth, and compliance.

## Priority 1: Product Expansion

### Goals
- Launch EU AI Act compliance module
- Expand DORA coverage
- Release API v2

### Key Results
- [ ] 50 enterprise customers on compliance module
- [ ] 20% increase in ARR
- [ ] API v2 adoption by 80% of customers

## Priority 2: Team Growth

### Goals
- Hire 5 engineers
- Promote 2 ambassadors
- Expand to US market

### Key Results
- [ ] Complete hiring by end of February
- [ ] Launch ambassador program
- [ ] Open US entity

## Priority 3: Compliance

### Goals
- Achieve SOC 2 Type II
- Complete ISO 27001 audit
- Begin CRA preparation

### Key Results
- [ ] SOC 2 report by March 15
- [ ] ISO 27001 certificate by March 30
- [ ] CRA gap analysis complete

## Budget Allocation

| Category | Q1 Budget | % of Total |
|----------|-----------|------------|
| Engineering | $500K | 40% |
| Sales & Marketing | $300K | 24% |
| Operations | $200K | 16% |
| R&D | $250K | 20% |

**CONFIDENTIAL - Leadership Only**`,
    excerpt: 'Strategic priorities and key results for Q1 2025.',
    author: '1',
    lastEditedBy: '1',
    status: 'published',
    labels: ['strategy', 'okrs', 'q1-2025', 'confidential'],
    viewCount: 23,
    likes: ['2', '3'],
    isFeatured: false,
    order: 1,
    createdAt: new Date('2025-01-02'),
    updatedAt: new Date('2025-01-15'),
  },
];

export const mockKBTemplates: KBTemplate[] = [
  {
    id: 'template-1',
    name: 'Meeting Notes',
    description: 'Standard template for recording meeting notes and action items.',
    content: `# Meeting: [Title]

**Date**: [Date]
**Attendees**: [Names]
**Facilitator**: [Name]

## Agenda

1. Item 1
2. Item 2
3. Item 3

## Discussion Notes

### Topic 1
- Key point
- Key point

### Topic 2
- Key point
- Key point

## Action Items

| Action | Owner | Due Date |
|--------|-------|----------|
| Task 1 | @name | YYYY-MM-DD |
| Task 2 | @name | YYYY-MM-DD |

## Next Meeting

**Date**: [Date]
**Topics**: [Preview of next agenda]`,
    category: 'meeting-notes',
    createdBy: '1',
    isGlobal: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'template-2',
    name: 'How-To Guide',
    description: 'Step-by-step guide template for documenting processes.',
    content: `# How to: [Title]

## Overview

Brief description of what this guide covers and who it's for.

## Prerequisites

- Requirement 1
- Requirement 2
- Requirement 3

## Steps

### Step 1: [Title]

Description of the step.

\`\`\`bash
# Example command
\`\`\`

### Step 2: [Title]

Description of the step.

### Step 3: [Title]

Description of the step.

## Troubleshooting

### Common Issue 1
**Problem**: Description
**Solution**: How to fix it

### Common Issue 2
**Problem**: Description
**Solution**: How to fix it

## Related Resources

- [Link 1](#)
- [Link 2](#)`,
    category: 'how-to',
    createdBy: '1',
    isGlobal: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'template-3',
    name: 'Runbook',
    description: 'Operational runbook template for incident response and procedures.',
    content: `# Runbook: [Title]

## Purpose

What this runbook is for and when to use it.

## Scope

What systems/services this runbook covers.

## Prerequisites

- [ ] Access to system X
- [ ] Permissions Y
- [ ] Tool Z installed

## Procedure

### Step 1: [Title]
- [ ] Action item
- [ ] Action item

### Step 2: [Title]
- [ ] Action item
- [ ] Action item

### Step 3: [Title]
- [ ] Action item
- [ ] Action item

## Rollback Procedure

If something goes wrong:

1. Step 1
2. Step 2
3. Step 3

## Escalation

| Condition | Contact | Method |
|-----------|---------|--------|
| After hours | On-call | PagerDuty |
| Data breach | Security | security@company.com |

## Revision History

| Date | Author | Changes |
|------|--------|---------|
| YYYY-MM-DD | Name | Initial version |`,
    category: 'runbook',
    createdBy: '2',
    isGlobal: true,
    createdAt: new Date('2024-02-01'),
  },
  {
    id: 'template-4',
    name: 'Architecture Decision Record',
    description: 'Template for documenting significant architecture decisions.',
    content: `# ADR: [Title]

## Status

[Proposed | Accepted | Deprecated | Superseded]

## Context

What is the issue that we're seeing that is motivating this decision or change?

## Decision

What is the change that we're proposing and/or doing?

## Consequences

### Positive
- Benefit 1
- Benefit 2

### Negative
- Drawback 1
- Drawback 2

### Neutral
- Side effect 1

## Alternatives Considered

### Alternative 1
- Pros
- Cons
- Why rejected

### Alternative 2
- Pros
- Cons
- Why rejected

## References

- [Link 1](#)
- [Link 2](#)`,
    category: 'decision',
    createdBy: '1',
    isGlobal: true,
    createdAt: new Date('2024-02-15'),
  },
];
