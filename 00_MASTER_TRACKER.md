# 🚀 AndySD Suite – LIVE PROJECT TRACKER
**Overall Status:** STABLE | Last Updated: Dec 9, 2025

## 📊 SYSTEM STATUS
| Component | Status | Details |
| :--- | :--- | :--- |
| **Monorepo** | ✅ READY | pnpm + Turborepo configured |
| **Node/PNPM** | ✅ READY | Node 18+, pnpm 10.24.0 (see `.nvmrc`) |
| **Database Isolation** | ✅ ENFORCED | lint:db script validates app separation |
| **CI/CD** | ✅ CONFIGURED | GitHub Actions workflow ready (`.github/workflows/ci.yml`) |

---

## 🎯 KEY PRINCIPLES (READ FIRST)

This is a **monorepo of independent apps**. Each app:
- ✅ **Has its own database** — uses app-scoped env var (e.g., `GIGGIN_DATABASE_URL`)
- ✅ **No cross-app imports** — can only import from `packages/` (utilities/schemas, not other apps)
- ✅ **Self-contained** — dev server, build, and deployment per app
- ❌ **No shared DATABASE_URL** — except as fallback in development

See `README.md` for full architecture guide.

---

## 🚀 QUICK START

### Install & Develop (All Apps)
```bash
pnpm install
pnpm dev                    # Start all apps in parallel
```

### Run Individual Apps
```bash
pnpm --filter labs-hub dev             # Port 3000 (portfolio + dashboard)
pnpm --filter flippin-app dev          # Port 3005 (inventory OS frontend)
pnpm --filter @andysd/flippin-api dev  # Port 3006 (pricing + listings API)
pnpm --filter giggin-app dev           # Port 3001 (gig planner frontend)
pnpm --filter @andysd/giggin-api dev   # Port 3001 (gig + auth API)
pnpm --filter ariadne-api dev          # Port 3004 (health check API)
```

### Build & Lint
```bash
pnpm build              # Build all packages and apps
pnpm lint               # General linting (if configured)
pnpm lint:db            # Check database isolation rules (blocks CI if violated)
pnpm test:ariadne       # Quick health check test
```

---

## 📦 APPS & SERVICES

| App | Type | Status | Port | DB | Env Var |
|-----|------|--------|------|----| --------|
| **labs-hub** | Next.js 14 | ✅ WORKING | 3000 | ❌ None | - |
| **giggin-app** | Next.js 14 | 🔧 TODO | 3001 | ❌ None | - |
| **@andysd/giggin-api** | Node.js (Fastify) | ✅ WORKING | 3001 | ✅ Neon/Postgres | `GIGGIN_DATABASE_URL` |
| **ariadne-api** | Node.js (plain) | ✅ WORKING | 3004 | ❌ None | - |
| **flippin-app** | Next.js 14 | 🚀 MVP READY | 3005 | ❌ Frontend | - |
| **@andysd/flippin-api** | Node.js (Fastify) | 🚀 MVP READY | 3006 | ✅ Postgres | `FLIPPIN_DATABASE_URL` |
| **cruizr-app**, **artperiod-app**, etc. | Scaffolds | ⚠️ STUB | - | - | - |

---

## 📁 SHARED PACKAGES

| Package | Export Type | Usage |
|---------|-----------|-------|
| **@andysd/db** | Schema + Factory (`createDb`) | Import schema & call `createDb(url)` to initialize DB in your app |
| **@andysd/auth** | Utilities (JWT, hashing) | Import functions directly (no side effects) |
| **@andysd/ui** | React components | Optional shared UI library |
| **@andysd/ai**, **@andysd/jobs** | Utility packages | Placeholders for expansion |

---

## 🔐 DATABASE & ENV SETUP

### For Development (Local)

Each app using a database should have `.env`:

```bash
# apps/giggin/api/.env (example)
GIGGIN_DATABASE_URL=postgresql://user:password@localhost:5432/giggin_db
JWT_SECRET=dev-secret-change-in-production

# apps/other-app/.env (if needed)
CRUIZR_DATABASE_URL=postgresql://user:password@localhost:5432/cruizr_db
```

Or use global fallback (`.env` at repo root):
```bash
# .env (repo root, for LOCAL DEV ONLY)
DATABASE_URL=postgresql://user:password@localhost:5432/andysd_dev
```

### For Production / CI

**Never rely on a global DATABASE_URL.** Each app must be deployed with its own `GIGGIN_DATABASE_URL`, `CRUIZR_DATABASE_URL`, etc.

### Drizzle Kit CLI

Manage schema and migrations:

```bash
# Set database URL, then push schema
export DRIZZLE_DATABASE_URL=postgresql://...
pnpm --filter @andysd/db run db:push

# Open Drizzle Studio for visual migration
pnpm --filter @andysd/db run db:studio
```

See `packages/db/README.md` for details.

---

## ✅ VALIDATION & CI

### Local Checks (Run Before Pushing)

```bash
# Check database isolation (no cross-app DB sharing)
pnpm lint:db

# Build all packages
pnpm build

# General lint (if scripts exist)
pnpm lint

# Quick test
pnpm test:ariadne
```

### GitHub Actions CI (Automatic)

`.github/workflows/ci.yml` runs on every push/PR:
1. ✅ **Lint** — `pnpm lint:db` (database isolation)
2. ✅ **Build** — `pnpm build` (compile all)
3. ✅ **Test** — `pnpm test:ariadne` (health check)

If any step fails, the PR is blocked.

---

## 🛠️ COMMON TASKS

### Add a New App
1. Create `apps/my-app/package.json` with `name: "my-app"`
2. Add `dev`, `build` scripts (so turbo can run them)
3. If using a database: create `src/db.ts` that calls `createDb(process.env.MY_APP_DATABASE_URL!)`
4. Add `apps/my-app/.env.example` documenting env vars
5. **No imports from other apps** — only from `packages/`

### Add a New Shared Package
1. Create `packages/my-lib/package.json` with `name: "@andysd/my-lib"`
2. Export utilities/schema/types — **not** initialized clients
3. Apps import via: `import { stuff } from '@andysd/my-lib'`

### Deploy an App
1. Set app-scoped env vars (e.g., `GIGGIN_DATABASE_URL=...`)
2. Run `pnpm build` in the app
3. Deploy the `dist/` or `.next/` output

---

## 📝 RECENT CHANGES (Dec 9, 2025)

✅ **App Isolation & DB Refactor**
- Refactored `packages/db` to export `createDb(url)` factory (no auto-connect at import)
- Updated `apps/giggin/api` to create DB per-app using `GIGGIN_DATABASE_URL`
- Auth routes now read DB from Fastify instance (`fastify.db`)

✅ **Enforcement & Docs**
- Created `scripts/lint-db-isolation.js` — catches cross-app DB sharing in CI
- Added `pnpm lint:db` script to root
- Created comprehensive `README.md` and `packages/db/README.md`
- Added `.env.example` files for root and `apps/giggin/api`
- Set up GitHub Actions CI workflow (`.github/workflows/ci.yml`)

✅ **Portfolio Site**
- Merged legacy (iframe) and modern (React) versions of Labs Hub
- Added debug helper to legacy page for easier troubleshooting

---

## 🚨 TROUBLESHOOTING

**Port already in use (3000, 3001, 3004)?**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Database connection error?**
- Check `.env` has the correct `GIGGIN_DATABASE_URL` or `DATABASE_URL`
- Ensure database is running and accessible
- Run `pnpm --filter @andysd/db run db:push` to sync schema

**Node version mismatch?**
- Use Node 18+: `nvm use` or `node --version`

**Turbo cache stale?**
- Clear: `pnpm run build -- --force`

**lint:db fails?**
- Check for imports of `db` from `@andysd/db` (should import `createDb`)
- Check no module-level `neon()` or `drizzle()` calls outside functions

---

## 🎉 FLIPPIN' OUT – FEED-FIRST MVP COMPLETE

**What is it?**
**Marketplace feed discovery engine for resellers**: Scan live eBay/Mercari/Facebook listings → See ROI instantly (AI cost estimation) → Save to inventory. The platform that helps you find profitable deals automatically.

**Core Concept:**
The **live marketplace feed + ROI scanner** is the centerpiece. Instead of starting with your own photos, start by discovering opportunities. Feed first → inventory second.

**Current Status (Feed-First Pivot):**
- ✅ **Frontend**: `/feed` (primary), `/inventory`, `/intake`, `/analytics`, `/settings`
- ✅ **Feed UI**: Live listings grid, price/location/ROI filters, quick-save button
- ✅ **Backend Routes**:
  - `/api/feed` — Query marketplace listings with filters, save to inventory
  - `/api/roi/suggest` — Calculate ROI for any marketplace listing
  - `/api/feed/sync` — Trigger marketplace refresh (15-min background job ready)
- ✅ **Database**: 
  - 3 NEW tables: `marketplaceListings`, `roiSuggestions`, `feedSaves`
  - Enhanced `items` table with `sourceMarketplaceListingId` (tracks origin)
  - Original 11 tables still intact (photos, attributes, listings, sales, shipments, etc.)
- 🔄 **Marketplace APIs**: eBay, Mercari, Facebook stubs ready (integration pending)
- 🔄 **Background Sync Job**: `syncMarketplaces.ts` runs every 15 min (mock data, ready for real API calls)

**What Changed:**
| Before (Inventory-First) | After (Feed-First) |
|---|---|
| `/` = Dashboard | `/` = Redirect to `/feed` |
| Upload photo → create item | Discover listing → save to inventory |
| Photo intake was primary | Feed discovery is primary |
| No marketplace integration | Live feed from eBay, Mercari, Facebook |
| Manual cost entry | AI-estimated cost + ROI instantly |

**Quick Demo:**
```bash
# Terminal 1: Frontend (NOW LANDS ON FEED)
pnpm --filter flippin-app dev      # http://localhost:3005 → redirects to /feed

# Terminal 2: Backend (NEW FEED ROUTES)
pnpm --filter @andysd/flippin-api dev  # http://localhost:3006

# Terminal 3: Database
export FLIPPIN_DATABASE_URL="postgresql://user:password@localhost:5432/flippin_db"
pnpm --filter @andysd/db run db:push  # Sync schema (includes new marketplace tables)
```

**Test the New Feed Features:**
```bash
# Health check
curl http://localhost:3006/health

# Get feed with filters
curl "http://localhost:3006/api/feed?priceMin=50&priceMax=500&location=LA&roiMin=25"

# Calculate ROI for a listing
curl -X POST http://localhost:3006/api/roi/suggest \
  -H "Content-Type: application/json" \
  -d '{"marketplaceListingId": "abc-123", "manualCostEstimate": 50}'

# Bulk ROI calculation
curl -X POST http://localhost:3006/api/roi/batch \
  -H "Content-Type: application/json" \
  -d '{"listingIds": ["id1", "id2", "id3"]}'

# Trigger feed sync
curl -X POST http://localhost:3006/api/feed/sync

# Save a marketplace listing to inventory
curl -X POST http://localhost:3006/api/feed/abc-123/save \
  -H "Content-Type: application/json" \
  -d '{"userId": "user-123", "userEstimatedCostPrice": 45}'
```

**Key Features:**
- 🔍 **Live Marketplace Feed**: Grid of eBay, Mercari, Facebook listings (mock data ready)
- 💰 **AI ROI Scanner**: Instant profit/ROI calculation per listing (estimated cost based on condition + category)
- 🎯 **Smart Filters**: Price range, location radius, category, condition, ROI minimum
- ⚡ **Quick Save**: Save profitable listings → creates draft item in your inventory
- 📊 **Feed Analytics**: View saved listings, ROI at time of save, profit trends
- 🔄 **Background Sync**: Updates marketplace feed every 15 minutes (stubs for eBay, Mercari, Facebook APIs)
- 📱 **Responsive Design**: Desktop 3-col, tablet 2-col, mobile 1-col grid

**Architecture:**
See **apps/flippin-app/FEED_ARCHITECTURE.md** for:
- Feed-first data model (marketplaceListings → roiSuggestions → feedSaves)
- ROI calculation logic (cost estimation, fee tables, profit formula)
- Marketplace API integration points (eBay Browse, Mercari, Facebook Graph)
- Background job scheduling details
- Future phases (demand prediction, alert system, multi-marketplace auto-listing)

**Next Steps (High Priority):**
1. Integrate eBay Browse API for real listings
2. Integrate Mercari API for real listings
3. Integrate Facebook Marketplace SDK
4. Train AI cost estimation model (on historical flips)
5. Add email alerts (ROI threshold hit)
6. Implement user authentication + multi-user support
7. Add listing optimization (post-save auto-suggest marketplace platforms)

See **apps/flippin-app/FEED_ARCHITECTURE.md** and **apps/flippin-app/README.md** for full details.

---

## 📚 LINKS

- **README.md** — Full architecture and setup guide
- **DEPLOYMENT.md** — Docker, compose, production setup
- **packages/db/README.md** — Database isolation and usage
- **apps/flippin-app/README.md** — Frontend features and pages
- **apps/flippin-app/FEED_ARCHITECTURE.md** — Feed-first data model and API design (NEW!)
- **.github/workflows/ci.yml** — GitHub Actions CI/CD pipeline
- **scripts/lint-db-isolation.js** — CI lint validation
- **.github/workflows/ci.yml** — GitHub Actions pipeline
- **DEPLOYMENT.md** — Deployment to production (Docker, Vercel, Railway, AWS)

---

**Maintainer:** AndySD  
**Last Status Check:** December 9, 2025 ✅
