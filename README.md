# payment-system

> Next.js 14 frontend for the Payout Operations Platform — React Query, Axios, JWT auth, Vercel deployment.

[![CI](https://github.com/kwametech/payment-system/actions/workflows/ci.yml/badge.svg)](https://github.com/kwametech/payment-system/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

---

## Overview

Internal frontend for the Payout Operations Platform. Two operators use this UI to:

1. Manage approved recipients (add, approve, suspend)
2. Create and track mobile money payouts via Fincra
3. View payout history with auto-refreshing status updates

Pairs with [`payment-system-backend`](https://github.com/kwametech/payment-system-backend) (Express + Prisma).

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9
- Backend running at `http://localhost:3000` (see backend repo)

### Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/kwametech/payment-system.git
cd payment-system

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# .env.local is already pre-filled with local defaults

# 4. Start the development server (port 3001)
npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

Login with seeded credentials from the backend:
- `admin@payout.internal` / `Admin1234!`
- `operator@payout.internal` / `Operator1234!`

---

## Folder Structure

```
payment-system/
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout with QueryClientProvider + AuthProvider
│   │   ├── providers.tsx         # Client-side providers wrapper
│   │   ├── page.tsx              # Redirects to /dashboard
│   │   ├── login/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── recipients/page.tsx
│   │   └── payouts/
│   │       ├── page.tsx          # Payout history
│   │       ├── new/page.tsx      # Create payout
│   │       └── [id]/page.tsx     # Payout detail + auto-refresh
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.tsx      # Sidebar nav
│   │   │   └── ProtectedRoute.tsx
│   │   └── ui/
│   │       └── Badge.tsx         # Color-coded status badge
│   ├── context/
│   │   └── AuthContext.tsx       # { user, token, login, logout, isAuthenticated }
│   ├── hooks/
│   │   ├── usePayouts.ts         # React Query payout hooks
│   │   └── useRecipients.ts      # React Query recipient hooks
│   ├── lib/
│   │   └── api.ts                # Axios instance + auth interceptors
│   └── types/
│       └── index.ts              # Shared TypeScript interfaces
├── tests/
│   └── sanity.test.js            # 2 passing sanity tests
├── .env.example
├── next.config.js
├── tsconfig.json
└── vercel.json
```

---

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server on port 3001 |
| `npm run build` | Next.js production build |
| `npm start` | Start production server on port 3001 |
| `npm test` | Run Jest tests |
| `npm run lint` | ESLint (zero warnings) |
| `npm run format` | Prettier write |
| `npm run format:check` | Prettier check (used in CI) |

---

## Environment Variables

Copy `.env.example` to `.env.local` for local development. Never commit `.env.local`.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | Yes | Backend API base URL |

**Local:** `http://localhost:3000`
**Production:** Your Railway service URL

See [`docs/environment-variables.md`](./docs/environment-variables.md) for full documentation.

---

## Deployment

Deployed to **Vercel** via automatic Git integration.

- **Production:** Push to `main` → auto-deploys
- **Preview:** Every PR gets an isolated preview URL

Set `NEXT_PUBLIC_API_BASE_URL` to your Railway backend URL in Vercel dashboard → Project → Settings → Environment Variables.

See [`docs/deployment.md`](./docs/deployment.md) for full guide.

---

## License

[MIT](./LICENSE) © KwameTech
