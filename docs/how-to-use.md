# Local Development Guide

This guide walks through running the Payout Operations frontend locally.

---

## Prerequisites

- Node.js >= 18
- npm >= 9
- Backend running at `http://localhost:3000` (see `payment-system-backend` repo)

---

## Step 1 — Install Dependencies

```bash
npm install
```

---

## Step 2 — Configure Environment

```bash
cp .env.example .env.local
```

`.env.local` is pre-filled with local defaults:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

This points the frontend at the local backend. Never commit `.env.local`.

---

## Step 3 — Start the Dev Server

```bash
npm run dev
```

The app runs at [http://localhost:3001](http://localhost:3001) (port 3001 to avoid conflict with the backend on 3000).

---

## Step 4 — Log In

Use the seeded internal credentials (created by `npm run db:seed` in the backend):

| Email | Password |
|-------|----------|
| `admin@payout.internal` | `Admin1234!` |
| `operator@payout.internal` | `Operator1234!` |

---

## Step 5 — Run Tests

```bash
npm test
```

2 sanity tests pass.

---

## Step 6 — Lint and Format

```bash
npm run lint          # ESLint (zero warnings)
npm run format:check  # Prettier check
npm run format        # Prettier write (auto-fix)
```

---

## Step 7 — Production Build

```bash
npm run build
```

Must pass cleanly before deploying to Vercel.

---

## Pages

| Route | Description |
|-------|-------------|
| `/login` | Email + password login |
| `/dashboard` | Recent 5 payouts + New Payout CTA |
| `/recipients` | Manage recipients (add, approve, suspend) |
| `/payouts` | Full payout history with status filter |
| `/payouts/new` | 3-step payout creation form |
| `/payouts/[id]` | Payout detail, Retry + Sync Status buttons, 30s auto-refresh |

---

## Architecture Notes

- **Auth:** JWT stored in `localStorage` under `payout_token`. `AuthContext` initialises from localStorage on mount.
- **API calls:** All via `src/lib/api.ts` (Axios). Request interceptor attaches Bearer token. Response interceptor clears token and redirects to `/login` on 401.
- **Data fetching:** React Query (`@tanstack/react-query`). Hooks in `src/hooks/`.
- **Protected routes:** `ProtectedRoute` component redirects to `/login` if not authenticated.
- **Auto-refresh:** `usePayout` sets `refetchInterval: 30000` while payout status is `submitted` or `pending`.
