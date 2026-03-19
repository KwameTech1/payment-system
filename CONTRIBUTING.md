# Contributing

Thank you for your interest in contributing! Please follow these guidelines to keep the project consistent and maintainable.

---

## Code of Conduct

Be respectful. Treat all contributors with professionalism and courtesy.

---

## Getting Started

1. Fork the repository.
2. Create a new branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy the env example:
   ```bash
   cp .env.example .env.local
   ```

---

## Branch Naming Conventions

| Prefix      | Use for                                    |
| ----------- | ------------------------------------------ |
| `feat/`     | New features                               |
| `fix/`      | Bug fixes                                  |
| `docs/`     | Documentation changes only                 |
| `chore/`    | Tooling, deps, config updates              |
| `refactor/` | Code restructuring (no features, no fixes) |
| `test/`     | Adding or fixing tests                     |

---

## Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(optional-scope): short description

[optional body]

[optional footer]
```

Examples:

```
feat(auth): add login page
fix(api): handle empty response from /users endpoint
docs: update deployment guide
chore: upgrade eslint to v9
```

---

## Pull Request Process

1. Ensure `npm run lint` and `npm test` pass with no errors.
2. Ensure `npm run format:check` passes (or run `npm run format` first).
3. Fill in the PR template completely.
4. Request a review from at least one maintainer.
5. Do not merge your own PR without a review.

---

## Code Style

- ESLint and Prettier are configured — run `npm run lint` and `npm run format` before committing.
- Keep functions small and single-purpose.
- Avoid commented-out code in commits.
- Write tests for new features and bug fixes.

---

## Reporting Issues

Use the GitHub issue templates:

- **Bug Report** — for unexpected behavior or errors.
- **Feature Request** — for new ideas or improvements.

Provide as much detail as possible: steps to reproduce, expected behavior, screenshots, environment details.
