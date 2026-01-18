# DevSecAI Portal

A modern team progress tracking portal built with Next.js, TypeScript, and Tailwind CSS. Track your team's projects, tasks, and activity in one beautiful dashboard.

## Features

- **Dashboard** - Overview of team activity, stats, and recent updates
- **Projects** - Create and manage projects with progress tracking
- **Tasks** - Kanban board view for task management
- **Team** - View and manage team members
- **Activity Feed** - Track all team activity in real-time
- **Reports** - Analytics and performance insights
- **Settings** - Configure profile, notifications, security, and integrations

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: Custom component library with DevSecAI branding

## Brand Colors

- **Primary Dark**: `#11151C`
- **Accent Teal**: `#3EBBB7`
- **Accent Lime**: `#41DC7A`

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/your-org/devsecai-portal.git
cd devsecai-portal
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Main dashboard
│   ├── projects/           # Projects management
│   ├── tasks/              # Task kanban board
│   ├── team/               # Team management
│   ├── activity/           # Activity feed
│   ├── reports/            # Analytics & reports
│   ├── settings/           # User settings
│   └── auth/               # Authentication pages
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── layout/             # Layout components (Sidebar, Header)
│   └── dashboard/          # Dashboard-specific components
├── lib/                    # Utilities and mock data
└── types/                  # TypeScript type definitions
\`\`\`

## Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run start\` - Start production server
- \`npm run lint\` - Run ESLint

## Deployment

This app can be deployed on [Vercel](https://vercel.com), [AWS Amplify](https://aws.amazon.com/amplify/), or any platform that supports Next.js.

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## License

This project is proprietary to DevSecAI.

---

Built with love by the [DevSecAI](https://devsecai.io) team.
