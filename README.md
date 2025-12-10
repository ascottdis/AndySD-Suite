# AndySD Suite — Monorepo

A **pnpm + Turborepo** monorepo containing multiple **independent apps** and **shared libraries**. Each app is isolated by default — no cross-app database sharing, shared imports are schema/utilities only.

---

## 🏗️ Architecture

### Apps (`apps/`)

Independent applications. Each has its own environment, database connection, and dependencies.

| App | Type | Status | Purpose |
|-----|------|--------|---------|
| **labs-hub** | Next.js 14 | ✅ Working | Cinematic portfolio site + app dashboard (localhost:3000) |
| **giggin-app** | Next.js 14 | 🔧 TODO | (localhost:3001) |
| **giggin/api** | Node.js / Fastify | ✅ Working | Auth API for Giggin (localhost:3001, app-scoped DB) |
| **ariadne-api** | Node.js | ✅ Working | Simple health-check API (localhost:3004) |
| **cruizr-app**, **flippin-app**, **artperiod-app**, **ariadne-app** | Scaffolds | ⚠️ Stub | Placeholder apps (echo scripts) |

### Shared Packages (`packages/`)

Reusable utilities and schemas. **Only** export utilities, types, or schemas — **not** initialized client instances.

| Package | Purpose |
|---------|---------|
| **@andysd/db** | Drizzle ORM schema definitions + `createDb(url)` factory (no auto-connect) |
| **@andysd/auth** | Password hashing, JWT token utilities |
| **@andysd/ui** | Shared React components (optional) |
| **@andysd/ai**, **@andysd/jobs** | Utility packages (placeholder) |

---

## 📋 Key Principles

### 1. **App Isolation**
- Each app in `apps/` is **independent** — no direct imports between apps.
- Apps can import from `packages/` (utilities, schemas, types only).
- Each app manages its own **database connection** using an **app-scoped env var** (e.g., `GIGGIN_DATABASE_URL`).

### 2. **Shared Packages = Schema + Utilities Only**
- `packages/db` exports **schema definitions** (`users`, `posts`, etc.) and a **factory function** (`createDb(url)`).
- Apps call `createDb(THEIR_DATABASE_URL)` during initialization.
- **Bad:** Importing `db` from `@andysd/db` and using it directly (auto-connects, causes cross-app sharing).
- **Good:** Importing `createDb` and `users` from `@andysd/db`, calling `createDb(url)` in the app.

### 3. **Environment Isolation**
- Apps use **app-scoped env vars**: `GIGGIN_DATABASE_URL`, `CRUIZR_DATABASE_URL`, etc.
- Fallback to global `DATABASE_URL` only for development convenience.
- **Avoid:** Relying on a single global `DATABASE_URL` in production (forces all apps to share a DB).

### 4. **No Cross-App Database Sharing**
- Each app should have its own database or schema namespace.
- Use `lint:db` to catch violations (see below).

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** (see `.nvmrc`)
- **pnpm 10.24.0+** (specified in `package.json`)

### Install & Develop

```bash
# Install dependencies
pnpm install

# Start all apps in parallel (turbo)
pnpm dev

# Watch the output for local URLs (e.g., http://localhost:3000, http://localhost:3001, ...)
```

### Run Individual Apps

```bash
# Labs Hub (Next.js)
pnpm --filter labs-hub dev

# Giggin API (Node.js / Fastify)
pnpm --filter @andysd/giggin-api dev

# Ariadne API (Node.js)
pnpm --filter ariadne-api dev
```

### Build & Test

```bash
# Build all packages
pnpm build

# Run linters
pnpm lint

# Lint database isolation (check for cross-app DB sharing)
pnpm lint:db

# Test (if test scripts exist)
pnpm test:ariadne
```

---

## 🔒 Database & App-Scoped Env Vars

### Setup for Development

Each app that uses a database should have a `.env` file with an app-specific database URL:

```bash
# apps/giggin/api/.env
GIGGIN_DATABASE_URL=postgresql://user:password@localhost:5432/giggin_db
JWT_SECRET=dev-secret

# apps/other-app/.env (if needed)
OTHER_APP_DATABASE_URL=postgresql://user:password@localhost:5432/other_db
```

Or use the global fallback:

```bash
# .env (repo root, for local development only)
DATABASE_URL=postgresql://user:password@localhost:5432/dev_db
```

### Drizzle Kit CLI

Manage schema migrations:

```bash
# Push schema changes to the database
pnpm --filter @andysd/db run db:push

# Open Drizzle Studio
pnpm --filter @andysd/db run db:studio

# (Set DRIZZLE_DATABASE_URL or DATABASE_URL first)
export DRIZZLE_DATABASE_URL=postgresql://...
pnpm --filter @andysd/db run db:push
```

See `packages/db/README.md` for details.

---

## 📁 Directory Structure

```
andysd-suite/
├── apps/                       # Independent apps
│   ├── labs-hub/               # Next.js portfolio site
│   ├── giggin-app/             # Next.js Giggin app
│   ├── giggin/api/             # Fastify auth API (@andysd/giggin-api)
│   ├── ariadne-api/            # Simple Node API
│   └── [cruizr,flippin,...]    # Placeholder apps
├── packages/                   # Shared libraries (schema, utils, types)
│   ├── db/                     # @andysd/db (Drizzle schema + factory)
│   ├── auth/                   # @andysd/auth (JWT, hashing)
│   ├── ui/                     # @andysd/ui (React components)
│   └── [ai,jobs]               # Utility packages
├── scripts/                    # Repo-level scripts
│   ├── test-ariadne.js         # Health check test for ariadne-api
│   └── lint-db-isolation.js    # CI lint: check DB isolation rules
├── .github/workflows/          # GitHub Actions CI
│   └── ci.yml                  # Build, lint, test, deploy (TODO)
├── .env.example                # Example env vars (repo root)
├── .nvmrc                      # Node version (18)
├── .gitignore                  # Ignore .next, node_modules, .env, etc.
├── 00_MASTER_TRACKER.md        # Live status tracker
├── package.json                # Root scripts: dev, build, lint, lint:db
├── pnpm-workspace.yaml         # Workspace globs
├── turbo.json                  # Turbo tasks config
└── README.md                   # This file
```

---

## 🧪 Linting & Validation

### Database Isolation Lint

Ensure apps don't share databases accidentally:

```bash
pnpm lint:db
```

This script checks:
- ❌ No imports of `db` directly from `@andysd/db` (should import `createDb` instead).
- ❌ No module-level database initialization (neon/drizzle calls at import time).
- ❌ `packages/db/src/index.ts` exports `createDb` factory (not a module-level `db`).

**Exit code:** 0 (pass) or 1 (fail — blocks CI).

### General Linting

```bash
pnpm lint
```

Runs turbo lint task across all packages (if lint scripts are defined).

---

## 📦 Workspace & Scripts

### pnpm Workspace

All apps and packages are listed in `pnpm-workspace.yaml`:

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

Use `pnpm --filter <pkg-name>` to run scripts in a specific package:

```bash
pnpm --filter @andysd/db run db:push
pnpm --filter labs-hub run build
pnpm --filter @andysd/giggin-api run dev
```

### Turbo

Orchestrates tasks across the workspace. Defined in `turbo.json`:

```json
{
  "tasks": {
    "build": { "dependsOn": ["^build"], "outputs": [".next/**", "dist/**"] },
    "dev": { "cache": false, "persistent": true },
    "lint": {}
  }
}
```

Run all `dev` tasks in parallel:

```bash
pnpm dev    # Same as: turbo run dev --parallel
```

---

## 🔄 CI/CD (GitHub Actions)

### Workflow: `.github/workflows/ci.yml`

Runs on every push/PR:

1. **Lint** — `pnpm lint:db` (database isolation check)
2. **Build** — `pnpm build` (compile all packages)
3. **Test** — `pnpm test:ariadne` (health check)
4. **Status checks** — Report pass/fail

(Setup required — see `.github/workflows/ci.yml`)

---

## 📝 Adding a New App

1. Create directory: `apps/my-app/`
2. Add `package.json` with `name: "my-app"` and scripts (`dev`, `build`, etc.)
3. Create `apps/my-app/.env.example` documenting required env vars.
4. If using a database:
   - Create `apps/my-app/src/db.ts` (or similar):
     ```typescript
     import { createDb } from '@andysd/db';
     
     const databaseUrl = process.env.MY_APP_DATABASE_URL || process.env.DATABASE_URL!;
     export const db = createDb(databaseUrl);
     ```
   - Use `MY_APP_DATABASE_URL` in `.env.example`.
5. Ensure no direct app-to-app imports (only via `packages/`).
6. Add `dev` and `build` scripts so turbo can orchestrate.

---

## 📝 Adding a New Shared Package

1. Create directory: `packages/my-lib/`
2. Add `package.json` with `name: "@andysd/my-lib"` and `main: "src/index.ts"`.
3. Export utilities, types, or schema — **not** initialized clients.
4. Document in `packages/my-lib/README.md`.
5. Other packages import via: `import { stuff } from '@andysd/my-lib'`.

---

## 🛠️ Troubleshooting

### Port already in use
Apps try ports 3000–3005. Kill the stray process:
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Database connection error
- Check `.env` has the correct `GIGGIN_DATABASE_URL` (or `DATABASE_URL`).
- Ensure database is running and accessible.
- Run `pnpm --filter @andysd/db run db:push` to sync schema.

### Turbo cache issues
Clear the cache:
```bash
pnpm run build -- --force
```

### Node version mismatch
Use Node 18+ (pinned in `.nvmrc`):
```bash
nvm use
# or: node --version (must be >= 18)
```

---

## 📚 Additional Resources

- **Turbo Docs:** https://turbo.build/repo/docs
- **pnpm Docs:** https://pnpm.io/
- **Drizzle ORM:** https://orm.drizzle.team/
- **Next.js:** https://nextjs.org/
- **Fastify:** https://www.fastify.io/

---

## 📄 License

(Add your license here)

---

**Last updated:** December 9, 2025  
**Maintainer:** AndySD
