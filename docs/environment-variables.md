# Environment Variables

This document describes all environment variables used in the project, their purpose, and how to configure them across environments.

---

## File Convention

| File           | Purpose                                       | Committed to git? |
| -------------- | --------------------------------------------- | ----------------- |
| `.env.example` | Reference file — shows all expected variables | Yes               |
| `.env.local`   | Local developer overrides                     | **No**            |
| `.env`         | Shared defaults (use only if non-sensitive)   | **No**            |

Never commit real secret values to the repository.

---

## Variable Reference

### `NODE_ENV`

- **Type:** `string`
- **Values:** `development` | `production` | `test`
- **Set by Vercel:** Yes — automatically set to `production` in production builds.
- **Local default:** `development`

---

### `VITE_API_BASE_URL` / `NEXT_PUBLIC_API_BASE_URL`

- **Type:** `string` (URL)
- **Purpose:** The base URL of the backend API that the frontend calls.
- **Browser-exposed:** Yes — prefixed with `VITE_` (Vite) or `NEXT_PUBLIC_` (Next.js).
- **Local value:** `http://localhost:3001`
- **Production value:** `https://api.yourdomain.com` ← **replace this**

> Only use one prefix depending on your framework. Delete the other from `.env.example`.

---

## Framework-Specific Notes

### Vite

Variables must be prefixed with `VITE_` to be accessible in the browser via `import.meta.env.VITE_*`.

```js
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

### Next.js

Variables must be prefixed with `NEXT_PUBLIC_` to be accessible in the browser.

```js
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
```

Server-only variables (no prefix) are only accessible in API routes, middleware, and server components.

---

## Setting Variables in Vercel

1. Open **Vercel Dashboard → Your Project → Settings → Environment Variables**.
2. Add each variable with the correct value per scope:

| Scope       | When used                                  |
| ----------- | ------------------------------------------ |
| Production  | Deployments from the `main` branch         |
| Preview     | All other branches and pull requests       |
| Development | When using `vercel dev` locally (optional) |

3. After adding or changing variables, **redeploy** the affected environment for changes to take effect.

---

## Security Rules

- Never log environment variable values in production code.
- Never expose server-side secrets (API keys, DB passwords) with `VITE_` or `NEXT_PUBLIC_` prefixes.
- Treat any variable containing a key, password, or token as a secret — store it in Vercel's dashboard, not in code.
- Rotate secrets immediately if they are ever accidentally committed.
