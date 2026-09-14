# Invitara - Smart Digital Invitation & Event Management Platform

**Tagline:** Create. Invite. Celebrate.

Invitara is a modern cloud-based Digital Invitation and Event Management Platform that allows individuals, businesses, organizations, hotels, wedding planners, schools, universities, religious institutions, and event organizers to create, customize, distribute, and manage digital invitations while tracking guest engagement in real time.

## Tech Stack
### Frontend
- React
- Next.js
- TypeScript
- TailwindCSS
- Framer Motion
- React Hook Form
- Zod
- shadcn/ui

### Backend
- NestJS
- Node.js
- TypeScript
- REST API
- PostgreSQL
- Redis
- Prisma ORM

### Authentication
- Supabase Auth

## Getting Started

1. Ensure you have Docker, Node.js (>= 18), and pnpm installed.
2. Start the local database and redis:
   ```bash
   docker compose up -d
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Start both frontend and backend development servers:
   ```bash
   pnpm dev
   ```
