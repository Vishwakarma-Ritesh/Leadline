# Leadline

Leadline is a focused lead-capture and management experience built for the Qubit
full-stack take-home assessment. Small businesses can submit sales enquiries on
the public marketing page, then review and manage them in a simple internal
dashboard.

The product intentionally has two surfaces:

- `/` — marketing page, pricing, and Request a Demo form
- `/dashboard` — lead search, filtering, status updates, notes, and deletion

## Tech stack

- Next.js App Router and React
- TypeScript
- Tailwind CSS
- Minimal shadcn/ui-style Radix primitives
- Supabase PostgreSQL
- Zod validation
- Vercel-ready deployment

## Run locally

Requirements: Node.js 20.9 or newer and npm.

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and add your Supabase values:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

3. Create the database schema by running
   `supabase/migrations/001_create_leads.sql` in the Supabase SQL Editor.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000`, submit the demo form, then open
   `http://localhost:3000/dashboard`.

## Database schema

The app uses one `public.leads` table:

- `id` — UUID primary key
- `name`, `email`, `company`, `message` — required text
- `status` — `New`, `Contacted`, `Qualified`, or `Lost`
- `note` — optional text
- `created_at`, `updated_at` — timezone-aware timestamps

The migration also adds field constraints, useful search/status indexes, an
`updated_at` trigger, and Row Level Security policies.

## Why Supabase

Supabase provides hosted PostgreSQL, a small JavaScript client, schema-level
constraints, and straightforward Vercel compatibility. It keeps this
assessment's data layer production-shaped without adding a separate backend
framework.

All reads and mutations are called from Server Components or Server Actions.
The browser does not query Supabase directly.

## Important assessment trade-off

Authentication is explicitly out of scope, while the dashboard must read and
mutate leads using only the anonymous Supabase key. The included migration
therefore permits anonymous insert, select, update, and delete operations.
That is acceptable only for this assessment demo: `/dashboard` and its data are
public.

For a real product, the dashboard policies should require an authenticated team
member. The server-side data boundary means that change would not require a UI
rewrite.

## Other trade-offs

- Search and filtering happen in memory. This keeps interaction instant and
  avoids extra requests for the expected take-home dataset; server-side
  pagination would be appropriate at larger scale.
- Mutations refresh the server-rendered dashboard after a successful local
  update. Supabase Realtime was omitted because it is not required.
- The dashboard switches from a table to purpose-built cards below large
  desktop widths so every field remains readable without a cramped table.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

Manual test flow:

1. Submit a valid and invalid demo request.
2. Confirm the new lead appears on `/dashboard`.
3. Search by name and company, then filter every status.
4. Change status and add/edit a note.
5. Refresh and confirm changes persist.
6. Cancel a deletion, then confirm a deletion.
7. Verify empty, loading, no-results, success, and error states.
8. Repeat at desktop, tablet, and mobile widths.

## Deploy to Vercel

1. Import the repository into Vercel.
2. Add both Supabase environment variables to the Vercel project.
3. Deploy with the standard Next.js preset.
4. Repeat the manual test flow against the production URL.

No custom Vercel configuration is required.

## With more time

- Add authentication and replace the assessment-only anonymous dashboard RLS
  policies.
- Add server-side pagination if the lead volume grows substantially.
- Add a small focused test suite for validation and Server Actions.

## Current setup status

The application code, migration, and deployment configuration are complete.
Applying the migration, supplying real environment values, and creating the
Vercel deployment require access to the target Supabase and Vercel projects.

## AI assistance

Cursor and AI assistance were used to review the supplied visual references,
plan the component architecture, draft implementation code, and run code
quality checks. The final scope, product decisions, database model, and
assessment trade-offs remain documented here so every part of the submission
can be explained and reviewed.
