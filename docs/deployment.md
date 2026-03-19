# Deployment Guide — Vercel

This project is deployed on [Vercel](https://vercel.com) using automatic Git integration. No custom deployment pipeline is needed — Vercel handles builds and deployments natively.

---

## How Deployments Work

| Event                         | Deployment Type | URL                                 |
| ----------------------------- | --------------- | ----------------------------------- |
| Push / merge to `main`        | Production      | `https://[your-project].vercel.app` |
| Push to any other branch / PR | Preview         | Auto-generated unique preview URL   |

- Vercel detects the framework automatically (Vite, Next.js, etc.).
- Every deployment is isolated and atomic — a failed build never replaces the live site.
- Preview deployments are safe to share with teammates or clients for review.

---

## Connecting This Repository to Vercel (First-Time Setup)

### Step 1 — Import the project

1. Go to [vercel.com/new](https://vercel.com/new).
2. Click **"Add New Project"**.
3. Select **"Import Git Repository"**.
4. Authorize Vercel to access your GitHub account if prompted.
5. Find and select your repository.

### Step 2 — Configure the project

Vercel will detect the framework automatically. Verify these settings:

| Setting          | Value                                               |
| ---------------- | --------------------------------------------------- |
| Framework Preset | Auto-detected (or set manually: Vite / Next.js etc) |
| Root Directory   | `.` (leave as default unless using a monorepo)      |
| Build Command    | `npm run build`                                     |
| Output Directory | `dist` (Vite) or `.next` (Next.js) — auto-detected  |
| Install Command  | `npm install`                                       |

> If you have a `vercel.json` at the root, Vercel reads it automatically. Review [`../vercel.json`](../vercel.json) and adjust `outputDirectory` to match your framework.

### Step 3 — Set environment variables

In the Vercel dashboard:

1. Go to **Project → Settings → Environment Variables**.
2. Add each variable from `.env.example`.
3. Set the correct value per environment (Production / Preview / Development).

**Required variables to set:**

| Variable            | Production value             | Preview value                        |
| ------------------- | ---------------------------- | ------------------------------------ |
| `VITE_API_BASE_URL` | `https://api.yourdomain.com` | `https://api-staging.yourdomain.com` |
| `NODE_ENV`          | Set automatically by Vercel  | Set automatically by Vercel          |

> For Next.js projects, replace `VITE_API_BASE_URL` with `NEXT_PUBLIC_API_BASE_URL`.

### Step 4 — Deploy

Click **"Deploy"**. Vercel will build and deploy.

After the first deployment, every subsequent push to `main` deploys automatically.

---

## Preview Deployments

- Every pull request gets a unique preview URL.
- Preview deployments use the same env variables scoped to **"Preview"** in the Vercel dashboard.
- Share the preview URL with reviewers before merging.

---

## Custom Domain

1. Go to **Project → Settings → Domains**.
2. Add your custom domain (e.g., `app.yourdomain.com`).
3. Follow the DNS instructions Vercel provides.
4. Vercel provisions and renews SSL automatically.

---

## Post-Deploy Verification Checklist

After every production deployment, verify:

- [ ] The app loads without errors in the browser console.
- [ ] The correct API base URL is used (check Network tab — no requests going to `localhost`).
- [ ] Authentication flows work end-to-end.
- [ ] Environment-specific features behave correctly (analytics, feature flags, etc.).
- [ ] The Vercel deployment log shows a clean build with no warnings treated as errors.
- [ ] Core user flows tested manually (or via automated smoke tests).

---

## Rollback

If a production deployment breaks:

1. Go to **Vercel Dashboard → Deployments**.
2. Find the last good deployment.
3. Click **"..." → Promote to Production**.

Rollback is instant — no rebuild required.

---

## Keeping CI and Deployment Separate

- **CI (GitHub Actions)** — runs lint, format checks, and tests on every push and PR. It does **not** deploy.
- **Vercel** — deploys automatically from Git. It does **not** run your test suite (by design — CI handles that).

This separation means:

- A failing test in CI blocks the PR merge, preventing broken code from reaching `main`.
- Vercel only ever deploys code that has passed CI and been reviewed.
