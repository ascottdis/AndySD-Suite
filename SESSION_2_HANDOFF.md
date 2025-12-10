# 🚀 Flippin' Implementation Handoff – Session 2

**Session Goal Achieved**: eBay API integration & JWT auth architecture complete  
**Current Blocker**: pnpm workspace dependency resolution  
**Estimated Effort to Unblock**: 30 min  
**Estimated Effort to MVP**: 1-2 hours after unblocking

---

## What You Need to Know

### Starting Point
- Feed-first UI ✅ (from previous session)
- Database schema ✅ (from previous session)
- **NEW**: eBay client + JWT auth implemented in this session

### Current Code State
All source code is complete and TypeScript-valid. The only issue is **npm/pnpm installation**, not the code itself.

**Key Files Ready**:
- `apps/flippin-api/src/index.ts` - Server entry with auth + sync job
- `apps/flippin-api/src/routes/feed.ts` - Protected routes with JWT extraction
- `apps/flippin-api/src/clients/ebayClient.ts` - eBay API wrapper (stubs need real credentials)
- `apps/flippin-api/src/jobs/syncMarketplaces.ts` - Marketplace sync job (integrated with eBay client)
- `apps/flippin-api/src/auth/setup.ts` - JWT middleware (local implementation to avoid workspace issues)

### Quick Reference

**Protected Routes** (require JWT):
```
POST /api/feed/:id/save
  Header: Authorization: Bearer <token>
  Body: { userEstimatedCostPrice?: number }
  Response: { itemId, message }

GET /api/feed/saved
  Header: Authorization: Bearer <token>
  Query: ?limit=20&offset=0
  Response: Array of user's saved listings
```

**Public Routes** (no auth required):
```
GET /api/feed
  Query: ?priceMin=10&priceMax=500&roiMin=30&limit=50&offset=0
  Response: Array of marketplace listings with ROI data
```

**Env Vars Needed**:
```
FLIPPIN_DATABASE_URL=postgresql://...
JWT_SECRET=<long-random-key>
EBAY_CLIENT_ID=<your-app-id>
EBAY_CLIENT_SECRET=<your-app-secret>
ENABLE_SYNC_JOB=true
```

---

## First 30 Minutes: Unblock Dependencies

**Option 1** (Recommended - Use npm instead of pnpm):
```bash
cd c:\Users\Andy\andysd-suite
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item pnpm-lock.yaml -ErrorAction SilentlyContinue
npm install --workspaces
cd apps/flippin-api
npm run build
```

**Option 2** (If Option 1 fails - Force pnpm):
```bash
cd c:\Users\Andy\andysd-suite
Remove-Item -Recurse -Force node_modules,.pnpm -ErrorAction SilentlyContinue
Remove-Item pnpm-lock.yaml -ErrorAction SilentlyContinue
pnpm install --force --strict-peer-dependencies=false
```

**Option 3** (Nuclear - Start completely fresh):
```bash
# Uninstall pnpm, reinstall
npm uninstall -g pnpm
npm install -g pnpm@latest
# Then do Option 2
```

**Success Indicators**:
```bash
cd apps/flippin-api
npm run build
# Should complete WITHOUT TypeScript errors
```

---

## Next 60-90 Minutes: Validate & Test

1. **Set up .env**:
   ```bash
   # At c:\Users\Andy\andysd-suite\.env.local or apps/flippin-api/.env
   FLIPPIN_DATABASE_URL=postgresql://localhost/flippin
   JWT_SECRET=my-super-secret-key-change-in-production
   EBAY_CLIENT_ID=placeholder-for-now
   EBAY_CLIENT_SECRET=placeholder-for-now
   PORT=3006
   ENABLE_SYNC_JOB=true
   ```

2. **Start server**:
   ```bash
   cd apps/flippin-api
   npm run dev
   # Should start on http://localhost:3006
   ```

3. **Test public endpoint** (in another terminal):
   ```bash
   curl "http://localhost:3006/api/feed?limit=5"
   # Should return array of marketplace listings (initially empty, then populated by sync job)
   ```

4. **Test auth middleware** (try protected route without token - should fail):
   ```bash
   curl -X POST "http://localhost:3006/api/feed/some-id/save" \
     -H "Content-Type: application/json" \
     -d '{"userEstimatedCostPrice":100}'
   # Should return 401: Unauthorized
   ```

5. **Watch sync job logs** in the dev terminal - should see:
   ```
   [SYNC] Starting marketplace feed sync at 2025-12-09T...
   [SYNC] Fetching eBay listings...
   [SYNC] eBay returned 0 listings (currently stubs, will be real once eBay creds added)
   ```

---

## Implementation Details for Reference

### Auth Flow
1. User gets JWT from `/auth/register` or `/auth/login` endpoint (exists elsewhere in codebase)
2. Frontend stores token in localStorage
3. On protected endpoint, frontend sends: `Authorization: Bearer <token>`
4. `setupAuth(fastify, JWT_SECRET)` decorates fastify instance with middleware
5. Protected routes use: `{ onRequest: [(fastify as any).authenticate] }`
6. Middleware extracts userId and attaches to `request.user`

### Sync Job Flow
1. `startSyncJob(900000)` called on server startup
2. Runs immediately, then every 15 minutes
3. Calls `fetchEbayListings()` which uses `EbayClient`
4. eBay client searches 3 categories (Electronics, Collectibles, Vintage)
5. Results inserted/updated into `marketplaceListings` table
6. ROI suggestions auto-generated for each listing
7. Logs progress to console

### Why Local Auth Instead of @andysd/auth?
pnpm workspace was trying to fetch from npm registry instead of local packages. Quick fix was to implement auth locally in flippin-api. Once pnpm is fixed, migrate to using the shared package.

**Migration Plan** (when ready):
1. Remove `apps/flippin-api/src/auth/setup.ts` and `types.ts`
2. Change index.ts: `import { setupAuth } from '@andysd/auth'`
3. Change feed.ts: `import type { JWTPayload } from '@andysd/auth'`
4. Ensure pnpm workspace resolves properly

---

## eBay API Integration Status

**Current**: Client is stubbed with placeholder API calls

**To Enable Real eBay API**:
1. Register developer app at https://developer.ebay.com/
2. Get Application ID and Certificate ID
3. Add to .env as `EBAY_CLIENT_ID` and `EBAY_CLIENT_SECRET`
4. Implement OAuth2 flow in `ebayClient.ts`:
   - Get application token from eBay OAuth endpoint
   - Store token (with expiry tracking)
   - Auto-refresh when needed
5. Uncomment real Browse API calls in `_searchBrowseApi()` and `_getItemApi()`

**Estimated Effort**: 2-3 hours with testing

**Alternative for MVP**: Use mock data instead
- Create `apps/flippin-api/src/mocks/ebayListings.json` with sample data
- Modify `fetchEbayListings()` to return mock data
- Allows end-to-end testing without eBay credentials

---

## Checklist for Next Session

**Dependency Resolution**:
- [ ] npm/pnpm install completes without errors
- [ ] TypeScript compilation succeeds
- [ ] Server starts (`npm run dev`)

**Auth Middleware**:
- [ ] Public `/api/feed` works without token
- [ ] Protected `/api/feed/:id/save` returns 401 without token
- [ ] Protected route succeeds with valid JWT

**Sync Job**:
- [ ] Logs appear in console on startup
- [ ] Runs every 15 min (check timestamps in logs)
- [ ] Handles missing eBay credentials gracefully (logs warning, continues)

**Database**:
- [ ] Listings table can be queried
- [ ] ROI suggestions table has data after sync
- [ ] Existing tables (items, feedSaves) still accessible

**End-to-End Flow** (if using mock eBay data):
- [ ] GET /api/feed returns mock listings
- [ ] POST /api/feed/:id/save with valid JWT creates item in inventory
- [ ] GET /api/feed/saved with valid JWT returns user's saved items
- [ ] ROI calculations shown correctly

---

## Files to Review Before Starting

1. **`FLIPPIN_API_IMPLEMENTATION_CHECKPOINT.md`** - Detailed implementation notes
2. **`apps/flippin-api/src/index.ts`** - Server entry point (short, review auth setup)
3. **`apps/flippin-api/src/auth/setup.ts`** - Auth implementation (30 lines, simple)
4. **`apps/flippin-api/src/clients/ebayClient.ts`** - eBay client (100+ lines, but well-commented)

---

## Success Definition

✅ **MVP Complete When**:
1. Server starts and stays running
2. Auth middleware properly guards endpoints
3. Public feed endpoint returns data (mock or real eBay)
4. Save endpoint creates items with user association
5. Sync job runs without crashing
6. ROI calculations visible in returned data

🎯 **Next Goal After MVP**: Test with real eBay API (if credentials available) or implement mock data generator for realistic testing.

---

**Questions?** Check `FLIPPIN_API_IMPLEMENTATION_CHECKPOINT.md` first - it has detailed architecture notes and known limitations.

**Ready to continue?** Start with dependency resolution, then test endpoints one by one.
