# Environment Variables

This document describes all environment variables used in the frontend.

---

## File Convention

| File | Purpose | Committed? |
|------|---------|------------|
| `.env.example` | Reference — shows all expected variables | Yes |
| `.env.local` | Local developer overrides | **No** |

Never commit real values. `.env.local` is in `.gitignore`.

---

## Variable Reference

### `NEXT_PUBLIC_API_BASE_URL`

- **Type:** `string` (URL)
- **Purpose:** Base URL of the backend API. Axios uses this as `baseURL`.
- **Browser-exposed:** Yes — `NEXT_PUBLIC_` prefix makes it available in client components.
- **Local value:** `http://localhost:3000`
- **Production value:** Your Railway backend URL (e.g. `https://payment-system-backend.up.railway.app`)

---

## Setting Variables in Vercel

1. Open **Vercel Dashboard → Your Project → Settings → Environment Variables**.
2. Add `NEXT_PUBLIC_API_BASE_URL` with your Railway backend URL.
3. Set scope to **Production**. Add a separate value for **Preview** if you have a staging backend.
4. After adding or changing variables, redeploy for changes to take effect.

---

## Security Rules

- Never put secrets (API keys, tokens, passwords) in `NEXT_PUBLIC_` variables — they are embedded in the browser bundle.
- The backend JWT secret, Fincra API key, and database URL must only live in the backend environment.
- Rotate secrets immediately if accidentally committed.
