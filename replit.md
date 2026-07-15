# Love Public Sr. Sec. School

A school website for Love Public Sr. Sec. School with an AI-powered chatbot (Hindi/English), online admissions form, and admin panel.

## Run & Operate

- School website runs automatically at `/` (port 21294 → external port 3000)
- API server runs automatically at `/api` (port 8080)
- `pnpm --filter @workspace/school-website run dev` — run the school website manually
- `pnpm --filter @workspace/api-server run dev` — run the API server manually
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, TailwindCSS, Wouter (routing), TanStack Query
- API: Express 5
- DB: PostgreSQL + Drizzle ORM (Replit-managed)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- AI Chatbot: Groq (llama-3.3-70b-versatile)
- TTS: Cartesia Sonic Turbo
- API codegen: Orval (from OpenAPI spec in `lib/api-spec/openapi.yaml`)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/school-website/src/pages/` — frontend pages (home, about, academics, admissions, gallery, contact, admin-admissions)
- `artifacts/school-website/src/components/` — shared UI components
- `artifacts/api-server/src/routes/` — API routes (admission.ts, chat.ts, health.ts)
- `lib/db/src/schema/admissions.ts` — DB schema (single `admissions` table)
- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth for API contracts)

## Required Secrets

- `SESSION_SECRET` — session signing secret ✅ set
- `GROQ_API_KEY` — Groq API key for the AI chatbot (chatbot won't work without this)
- `CARTESIA_API_KEY` — Cartesia API key for text-to-speech audio responses (optional; TTS is skipped if not set)
- `CARTESIA_VOICE_ID` — Cartesia voice ID (defaults to `4877b818-c7fe-4c89-b1cf-eadf8e23da72` if not set)

## Architecture decisions

- API uses OpenAPI-first design: all contracts defined in `lib/api-spec/openapi.yaml`, with generated React Query hooks in `lib/api-client-react` and Zod schemas in `lib/api-zod`
- Chatbot is school-scoped: strict system prompt blocks off-topic questions, replies in Hindi or English matching the user's language
- Admissions form stores to PostgreSQL via Drizzle ORM; admin panel at `/admin/admissions` shows all submissions
- TTS is optional: if `CARTESIA_API_KEY` is missing, the chatbot returns text only (no audio)

## Product

- **Public site**: Home, About, Academics, Admissions (online form), Gallery, Contact pages
- **AI Chatbot**: Floating chatbot widget answering school-related questions in Hindi/English with voice responses
- **Admin Panel**: `/admin/admissions` — view all admission form submissions

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- The school-website requires both `PORT` and `BASE_PATH` env vars at startup (enforced in `vite.config.ts`)
- Workflow uses `PORT=21294 BASE_PATH=/` injected via the workflow command (port 21294 is mapped in `.replit`)
- Run `pnpm --filter @workspace/api-spec run codegen` after changing `lib/api-spec/openapi.yaml`

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
