# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repo Is

This is a **framework-agnostic frontend starter template**. It ships with ESLint, Prettier, Jest, GitHub Actions CI, and Vercel deployment config — but no framework. The `src/index.js` and `tests/example.test.js` are placeholders meant to be replaced once a framework (Vite, Next.js, etc.) is chosen.

## Commands

```bash
npm test              # Run Jest tests
npm run lint          # ESLint (zero warnings allowed)
npm run format        # Prettier write
npm run format:check  # Prettier check (used in CI)
```

`npm run dev` and `npm run build` are placeholder stubs that exit with an error — they must be replaced after a framework is chosen (see `docs/how-to-use.md`).

To run a single test file:
```bash
npx jest tests/example.test.js
```

## CI Pipeline

`.github/workflows/ci.yml` runs on push/PR to `main` and `develop`:
1. `npm run format:check`
2. `npm run lint`
3. `npm test`

The build step is commented out until a framework is wired up.

## Code Style

- **Prettier**: single quotes, 2-space indent, semicolons, trailing commas (ES5), 100-char print width, `endOfLine: "auto"`
- **ESLint**: `eslint:recommended` base; `no-unused-vars` warns (args prefixed `_` are exempt); `no-console` warns (allows `warn`/`error`); `eqeqeq` and `curly` are errors
- **Line endings**: `.gitattributes` enforces LF for all text files

## Architecture Notes

- `src/` — application source (currently one placeholder file)
- `tests/` — Jest tests, matched by `**/tests/**/*.test.js` and `**/?(*.)+(spec|test).js`
- `public/` — static assets (empty, for framework to populate)
- `scripts/` — utility scripts (empty placeholder)
- `docs/` — setup guide, deployment guide, environment variable reference
- `vercel.json` — framework-agnostic Vercel config; outputs to `dist/`, sets security headers and 1-year cache on `/assets/`

## Environment Variables

Copy `.env.example` to `.env.local`. Vite exposes vars prefixed `VITE_`; Next.js uses `NEXT_PUBLIC_`. See `docs/environment-variables.md`.

## Commits & PRs

Follows [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`. PR template is at `.github/PULL_REQUEST_TEMPLATE.md`.
