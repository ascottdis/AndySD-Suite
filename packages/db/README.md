# @andysd/db

Shared database schema and initialization utilities for the andysd-suite monorepo.

## Purpose

This package provides:
- **Schema definitions** (exported from `@andysd/db/schema`) — Drizzle ORM table definitions used across apps.
- **Database factory** (`createDb(databaseUrl)`) — A function to create and return a Drizzle instance.

## Design Principle: App-Scoped Database Connections

**Key rule:** Each app must initialize its own database connection using an **app-specific environment variable**.

This prevents accidental cross-app database sharing and keeps data isolated by default.

### Example

In your app's initialization (e.g., `src/index.ts`):

```typescript
import { createDb, users } from '@andysd/db';

// Initialize DB using an app-specific env var
const databaseUrl = process.env.MY_APP_DATABASE_URL || process.env.DATABASE_URL;
const db = createDb(databaseUrl);

// Attach to your server/context so routes can access it
app.db = db; // or pass to route handlers, etc.
```

Then in route handlers:

```typescript
import { users } from '@andysd/db/schema';

// Routes access the DB from the app context
const result = await app.db.select().from(users).limit(1);
```

### Environment Variables

- **`MY_APP_DATABASE_URL`** — Recommended: app-scoped variable (replace `MY_APP` with your app name).
  - Example: `GIGGIN_DATABASE_URL`, `CRUIZR_DATABASE_URL`.
  - Avoids conflicts if multiple apps run in the same environment.

- **`DATABASE_URL`** — Fallback global variable (used only if app-specific var is not set).
  - Useful for development with a single database, but **don't rely on this in production**.

- **`DRIZZLE_DATABASE_URL`** — Optional: used by drizzle-kit CLI operations.
  - If unset, drizzle-kit falls back to `DATABASE_URL`.
  - Set this for drizzle commands: `pnpm --filter @andysd/db run db:push`.

## Usage

### Importing Schema

Schema types and tables are re-exported from `@andysd/db/schema`:

```typescript
import { users, posts } from '@andysd/db/schema';
```

### Creating a Database Instance

Use the `createDb` factory:

```typescript
import { createDb } from '@andysd/db';

const db = createDb(process.env.MY_DATABASE_URL!);
```

**Do NOT:**
```typescript
// ❌ WRONG: This will fail (db is no longer auto-connected)
import { db } from '@andysd/db';
```

## Drizzle Kit CLI

Run migrations and schema commands:

```bash
# Push schema changes to your database
pnpm --filter @andysd/db run db:push

# Open Drizzle Studio
pnpm --filter @andysd/db run db:studio

# (Set DRIZZLE_DATABASE_URL or DATABASE_URL before running)
```

## Migration / Breaking Changes

- **Before:** `@andysd/db` exported a module-level `db` instance that auto-connected using `DATABASE_URL`.
- **After:** `@andysd/db` exports a `createDb` factory. Apps must call `createDb(url)` and manage their own connection.
- **Why:** Prevents accidental cross-app database sharing.

## Troubleshooting

**Error: Database not initialized**
- Ensure your app calls `createDb(databaseUrl)` during startup and makes the instance available to route handlers.

**Error: GIGGIN_DATABASE_URL (or app var) not set**
- Set the environment variable in your `.env` file or CI/deployment config.
- See `apps/<app>/.env.example` for the expected variable name.

**Drizzle-kit commands fail**
- Set `DRIZZLE_DATABASE_URL` or `DATABASE_URL` in your environment.
- Example: `export DRIZZLE_DATABASE_URL=postgresql://...` then `pnpm --filter @andysd/db run db:push`.
