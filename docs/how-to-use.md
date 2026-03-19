# How to Use This Template

This guide walks you through everything you need to do after creating a new repository from `frontend-starter-template` — from first clone to live Vercel deployment.

---

## Prerequisites

- Node.js >= 18.x
- npm >= 9.x
- A GitHub account
- A Vercel account (free tier is fine)

---

## Step 1 — Create a New Repository from the Template

1. Go to the `frontend-starter-template` repository on GitHub.
2. Click **"Use this template"** → **"Create a new repository"**.
3. Give it a name (e.g., `my-app`), choose public or private, then click **"Create repository"**.

> Do not fork. Using the template creates a clean repo with no commit history.

---

## Step 2 — Clone and Install

```bash
git clone https://github.com/YOUR_USERNAME/my-app.git
cd my-app
npm install
```

---

## Step 3 — Replace All Placeholders

Search the project for these strings and replace them with real values:

| Placeholder         | Replace with                         | Where it appears       |
| ------------------- | ------------------------------------ | ---------------------- |
| `[PROJECT_NAME]`    | Your app's display name              | `README.md`            |
| `[GITHUB_USERNAME]` | Your GitHub username or org          | `README.md`            |
| `[REPO_NAME]`       | The new repo's name (e.g., `my-app`) | `README.md`            |
| `[YOUR_NAME]`       | Your full name or org name           | `README.md`, `LICENSE` |
| `[YEAR]`            | Current year (e.g., `2026`)          | `LICENSE`              |

---

## Step 4 — Set Up Your Framework

The template is framework-neutral. Plug in your framework of choice:

### Option A — Vite (React, Vue, Svelte, Vanilla)

```bash
npm create vite@latest . -- --template react
# or: --template vue, --template svelte, etc.
```

Then update `package.json` scripts:

```json
"dev":   "vite",
"build": "vite build"
```

### Option B — Next.js

```bash
npx create-next-app@latest .
```

Then update `package.json` scripts:

```json
"dev":   "next dev",
"build": "next build"
```

Also update `vercel.json`:

- Remove `"outputDirectory": "dist"` — Vercel auto-detects Next.js output.
- Set `"framework": "nextjs"` (or remove the `framework` key entirely to let Vercel detect it).

### After installing your framework

- Delete `src/index.js` — it was a placeholder.
- The framework's own entry point (`src/main.jsx`, `app/page.tsx`, etc.) replaces it.

---

## Step 5 — Configure Environment Variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your local values:

```env
NODE_ENV=development
VITE_API_BASE_URL=http://localhost:3001
```

**Rules:**

- `.env.local` is gitignored — never commit it.
- `.env.example` is committed — keep it up to date as you add new variables.
- Use `VITE_` prefix for Vite projects, `NEXT_PUBLIC_` for Next.js, when a variable needs to be accessible in the browser.
- Never put secrets (API keys, tokens) in any `VITE_` or `NEXT_PUBLIC_` variable.

See [`environment-variables.md`](./environment-variables.md) for the full reference.

---

## Step 6 — Verify the Baseline Works

Before writing any project code, confirm the template scaffolding is clean:

```bash
npm run format:check   # should pass
npm run lint           # should pass
npm test               # should pass (2 example tests)
```

If all three pass, the baseline is healthy.

---

## Step 7 — Update the Changelog

Open `CHANGELOG.md` and log your initial setup entry under `[Unreleased]`:

```md
## [Unreleased]

### Added

- Initial project setup with Vite + React.
```

---

## Step 8 — Make Your First Commit

```bash
git add .
git commit -m "chore: initialize project from frontend-starter-template"
git push origin main
```

Go to the **Actions** tab on GitHub and confirm the CI workflow passes.

---

## Step 9 — Connect to Vercel

1. Go to [vercel.com/new](https://vercel.com/new).
2. Click **"Import Git Repository"** and select `my-app`.
3. Verify the build settings Vercel detects:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist` (Vite) or auto-detected (Next.js)
   - **Install Command:** `npm install`
4. Before clicking Deploy, add your environment variables:
   - Go to **"Environment Variables"** in the import screen.
   - Add `VITE_API_BASE_URL` (or `NEXT_PUBLIC_API_BASE_URL`) with your production API URL.
   - Set it for **Production** scope. Add a staging value for **Preview** scope if you have one.
5. Click **"Deploy"**.

From this point:

- Pushing to `main` → automatic production deployment.
- Opening a pull request → automatic preview deployment with a unique URL.

See [`deployment.md`](./deployment.md) for the full Vercel guide including custom domains, rollback, and the post-deploy checklist.

---

## What to Clean Up After Setup

Once your framework is installed and everything works, remove these template artifacts:

| File / Item                    | Action                                            |
| ------------------------------ | ------------------------------------------------- |
| `src/index.js`                 | Delete — replaced by your framework's entry point |
| `tests/example.test.js`        | Delete or replace with real tests                 |
| `public/.gitkeep`              | Delete once you add a real file to `public/`      |
| `scripts/.gitkeep`             | Delete once you add a real script to `scripts/`   |
| `README.md` placeholder text   | Replace all `[BRACKET]` values with real content  |
| `package.json` `"name"` field  | Update to your actual project name                |
| `package.json` `"description"` | Update to a real description                      |

---

## Ongoing Workflow

| Task                 | Command                |
| -------------------- | ---------------------- |
| Start dev server     | `npm run dev`          |
| Run tests            | `npm test`             |
| Lint code            | `npm run lint`         |
| Format code          | `npm run format`       |
| Check formatting     | `npm run format:check` |
| Build for production | `npm run build`        |

---

## Summary Checklist

- [ ] Created new repo from template (not forked)
- [ ] Cloned and ran `npm install`
- [ ] Replaced all `[PLACEHOLDER]` values
- [ ] Installed framework and deleted `src/index.js`
- [ ] Copied `.env.example` → `.env.local` and filled in local values
- [ ] `npm run format:check`, `npm run lint`, `npm test` all pass
- [ ] Updated `CHANGELOG.md`
- [ ] First commit pushed and CI is green
- [ ] Repo connected to Vercel
- [ ] Environment variables set in Vercel dashboard
- [ ] Production deployment live and verified
