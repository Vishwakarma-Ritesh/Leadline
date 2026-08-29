# Leadline

Leadline is a focused lead-capture and management application built for the Qubit Full Stack Developer take-home assessment.

Small businesses can submit sales enquiries through the public marketing page and manage those leads through an authenticated internal dashboard.

## Overview

Leadline provides two primary surfaces:

- `/` — Public marketing page with pricing and Request a Demo form
- `/dashboard` — Authenticated lead management dashboard

### Public Marketing Page

- Premium responsive SaaS-style landing page
- Hero section with clear call to action
- Features section
- Pricing section
- Request a Demo form
- Name, email, company, and message fields
- Client-side validation
- Loading, success, and error states
- Lead submissions persisted to Supabase
- Publicly accessible without authentication

### Lead Dashboard

- Clerk-protected `/dashboard`
- View submitted leads
- Search by name or company
- Filter by lead status
- Change lead status
- Add and edit internal notes
- Delete leads with confirmation
- Loading and empty states
- Responsive table/card layout
- Changes persist after page refresh

## Tech Stack

- **Next.js 16** — App Router and server-side functionality
- **React** — UI and component architecture
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Styling and responsive layouts
- **shadcn/ui** — Accessible UI components and primitives
- **Clerk** — Authentication and dashboard protection
- **Supabase PostgreSQL** — Database and lead persistence
- **Zod** — Form validation
- **Vercel** — Deployment

## Architecture

The application follows a simple Next.js architecture.

- Public marketing UI is served from `/`
- Dashboard UI is served from `/dashboard`
- Clerk handles authentication and protects dashboard access
- Server Actions handle lead reads and mutations
- Supabase provides PostgreSQL persistence
- Zod handles request validation
- Tailwind CSS provides responsive styling
- shadcn/ui components are used selectively where they improve usability

Lead data is handled through the server rather than exposing direct browser-side database operations.

## Project Structure

```text
leadline/
├── app/
│   ├── dashboard/
│   ├── sign-in/
│   ├── sign-up/
│   ├── actions/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── dashboard/
│   ├── marketing/
│   └── ui/
├── lib/
│   ├── supabase/
│   ├── validations/
│   └── utils.ts
├── public/
├── supabase/
│   └── migrations/
├── types/
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
├── proxy.ts
└── README.md
```

## Database Schema

The application uses a single `public.leads` table.

| Field | Type | Description |
|---|---|---|
| `id` | UUID | Primary key |
| `name` | Text | Lead name |
| `email` | Text | Lead email |
| `company` | Text | Company name |
| `message` | Text | Demo request message |
| `status` | Text | New, Contacted, Qualified, or Lost |
| `note` | Text | Optional internal note |
| `created_at` | Timestamp | Lead creation time |
| `updated_at` | Timestamp | Last update time |

The migration includes field constraints, indexes for common searches, an `updated_at` trigger, and Row Level Security policies.

## Why Supabase

Supabase was chosen because it provides hosted PostgreSQL, a lightweight JavaScript client, database-level constraints, and straightforward integration with Next.js and Vercel.

For this assessment, it keeps the data layer simple while still providing a relational schema and persistent CRUD operations.

All lead reads and mutations are handled through Next.js Server Actions rather than direct browser-to-database requests.

## Authentication & Security

Clerk protects the `/dashboard` route and the Server Actions responsible for reading, updating, and deleting lead data.

The public marketing page and Request a Demo form remain accessible without authentication so visitors can submit enquiries.

The application does not expose direct browser-side Supabase queries for lead management.

For a production system, Clerk identities should be connected to Supabase Row Level Security using Supabase Third-Party Auth or an appropriate server-only database role. The current setup retains the assessment-compatible policies required for the public demo form.

## Installation

### Prerequisites

- [Node.js 20.9+](https://nodejs.org/)
- npm
- Supabase project
- Clerk application

### Install Dependencies

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Add the required Supabase and Clerk environment variables to `.env.local`.

> Never commit `.env.local` or production secrets to Git.

### Database Setup

Authenticate and link the Supabase CLI:

```bash
npx supabase login
npx supabase link --project-ref your-project-ref
npx supabase db push
```

Alternatively, run `supabase/migrations/001_create_leads.sql` in the Supabase SQL Editor.

## Getting Started

### Run Locally

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

You can then:

1. Open the public marketing page.
2. Submit a Request a Demo form.
3. Sign in through Clerk.
4. Open `/dashboard`.
5. Manage the submitted lead.

### Build for Production

Run the production checks:

```bash
npm run typecheck
npm run lint
npm run build
```

## Testing & Quality Checks

The application was manually tested across:

- Valid demo form submissions
- Invalid form submissions
- Form loading, success, and error states
- Lead creation and database persistence
- Search by name and company
- Status filtering
- Status changes
- Adding and editing notes
- Delete confirmation
- Lead deletion
- Empty and no-results states
- Dashboard authentication
- Desktop, tablet, and mobile layouts

The following commands are used for local quality checks:

```bash
npm run typecheck
npm run lint
npm run build
```

## Trade-offs

### Client-side Search and Filtering

Search and filtering are handled on the client for the expected small dataset. This keeps interactions immediate and avoids unnecessary requests.

For a larger production dataset, filtering, pagination, and sorting would be moved to the database.

### Simple State Management

The application uses local React state instead of introducing a global state-management library.

The current application has a relatively small data flow, so additional state infrastructure would add unnecessary complexity.

### No Real-time Synchronization

Dashboard mutations refresh the server-rendered data after successful changes.

Supabase Realtime was intentionally omitted because real-time synchronization was not part of the core assessment requirements.

## What I Would Improve With More Time

- Connect Clerk identities directly to Supabase RLS
- Add server-side pagination, sorting, and filtering
- Add focused automated tests for form validation and Server Actions
- Add optimistic UI updates for dashboard mutations
- Add additional accessibility and performance testing
- Add role-based permissions if multiple dashboard users were required

## Deployment

### Vercel

Leadline is designed to be deployed using Vercel.

1. Import the GitHub repository into Vercel.
2. Select the standard Next.js configuration.
3. Add the required Supabase and Clerk environment variables.
4. Deploy the application.
5. Verify the marketing page, Request a Demo form, authentication, and dashboard using the live URL.

No custom Vercel configuration is required.

## Contributing

1. Create a feature branch:

```bash
git checkout -b feature/your-feature
```

2. Make your changes and test thoroughly.
3. Follow the existing TypeScript, React, and Next.js conventions.
4. Run the quality checks:

```bash
npm run typecheck
npm run lint
npm run build
```

5. Write clear, meaningful commit messages.
6. Submit a pull request.

### Coding Standards

- Use TypeScript for application code.
- Follow React and Next.js best practices.
- Use ESLint to maintain code quality.
- Keep components focused and reusable.
- Use meaningful variable, function, and component names.
- Avoid unnecessary dependencies and over-engineering.
- Keep commits focused on a single logical change.

## License

This project was created as part of the Qubit Full Stack Developer take-home assessment.

## Support

For issues, questions, or contributions:

- Create an issue in the repository.
- Review the project documentation.
- Check the relevant framework or service documentation.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Clerk Documentation](https://clerk.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Zod Documentation](https://zod.dev/)
- [Vercel Documentation](https://vercel.com/docs)

## AI Assistance

AI tools were used during development:

- **ChatGPT** — development planning, architecture guidance, and review of implementation decisions.

## Current Status

The core Leadline assessment requirements are implemented, including:

- Public marketing page
- Working Request a Demo form
- Supabase persistence
- Clerk authentication
- Protected dashboard
- Lead search and filtering
- Lead status management
- Lead notes
- Lead deletion
- Responsive UI
- Loading, empty, success, and error states

Automated tests and production-level Clerk/Supabase identity integration were not implemented within the assessment time constraint.
