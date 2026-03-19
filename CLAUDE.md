# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repo Is

This is the **Next.js 14 frontend** for the Payout Operations Platform — a private internal tool for 2 operators to manage mobile money payouts via Fincra. It is NOT a public-facing app.

Pairs with the backend at `/home/kwametech/projects/payment-system-backend` (Express + Prisma + PostgreSQL).

## Commands

```bash
npm run dev           # Start dev server on port 3001 (backend is on 3000)
npm run build         # Next.js production build
npm test              # Run Jest tests
npm run lint          # ESLint (zero warnings allowed — uses next/core-web-vitals)
npm run format        # Prettier write
npm run format:check  # Prettier check (used in CI)
```

To run a single test file:
```bash
npx jest tests/sanity.test.js
```

## CI Pipeline

`.github/workflows/ci.yml` runs on push/PR to `main` and `develop`:
1. `npm run format:check`
2. `npm run lint`
3. `npm test`
4. `npm run build` (requires `NEXT_PUBLIC_API_BASE_URL` secret)

## Code Style

- **Prettier**: single quotes, 2-space indent, semicolons, trailing commas (ES5), 100-char print width, `endOfLine: "auto"`
- **ESLint**: `next/core-web-vitals`; `no-unused-vars` warns (args prefixed `_` are exempt); `no-console` warns
- **TypeScript**: strict mode, `@/*` path alias for `src/*`
- **Line endings**: `.gitattributes` enforces LF

## Architecture Notes

- `src/app/` — Next.js App Router pages
- `src/components/` — UI components (`ui/`) and layout wrappers (`layout/`)
- `src/context/AuthContext.tsx` — JWT auth state; initialised from localStorage on mount
- `src/lib/api.ts` — Axios instance; attaches Bearer token; redirects to `/login` on 401
- `src/hooks/` — React Query hooks for payouts and recipients
- `src/types/index.ts` — Shared TypeScript interfaces (User, Recipient, PayoutRequest, etc.)
- `tests/` — Jest tests; `sanity.test.js` keeps CI green

## Key Behaviours

- Auth token stored in `localStorage` as `payout_token`
- `usePayout` auto-refreshes every 30 seconds when status is `submitted` or `pending`
- `ProtectedRoute` shows a spinner during hydration, then redirects to `/login` if not authenticated
- Dev server runs on port **3001** to avoid conflict with backend on 3000

## Environment Variables

Copy `.env.example` to `.env.local`. The only required variable is:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

See `docs/environment-variables.md` for full documentation.

## Commits & PRs

Follows [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`. PR template is at `.github/PULL_REQUEST_TEMPLATE.md`.
