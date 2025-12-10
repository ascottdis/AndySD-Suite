# Flippin' Feed-First MVP – Development Checkpoint
**Date**: December 9, 2025  
**Status**: Feed-first architecture complete and ready for API integrations

---

## 📊 Session Summary

### What Was Completed ✅
This session successfully pivoted Flippin' from an **inventory-first** app to a **marketplace feed discovery engine**.

#### 1. Database Architecture (DONE)
- Added 3 new tables to `packages/db/src/schema/flippin.ts`:
  - `marketplaceListings` — Live feed from eBay, Mercari, Facebook
  - `roiSuggestions` — AI-calculated profit/ROI per listing
  - `feedSaves` — User saves from feed (marketplace listing → inventory item)
- Enhanced `items` table with `sourceMarketplaceListingId` FK
- **File**: `packages/db/src/schema/flippin.ts` (lines 1-209)

#### 2. Frontend Navigation (DONE)
- Reordered navigation: `/feed` now PRIMARY, `/inventory` SECONDARY
- Root `/` now redirects to `/feed`
- **Files**:
  - `apps/flippin-app/app/layout.tsx` — Updated nav with /feed first
  - `apps/flippin-app/app/page.tsx` — Redirect logic using useRouter

#### 3. Feed Discovery Page (DONE)
- Created `/feed` page with:
  - Responsive grid (3-col desktop, 2-col tablet, 1-col mobile)
  - 5 mock marketplace listings with ROI data
  - Filters: price range, location, ROI minimum, condition, platform
  - "Save to Inventory" button with state management
  - "Refresh Feed" button to trigger sync
- **File**: `apps/flippin-app/app/feed/page.tsx` (200+ lines)

#### 4. Feed Backend Routes (DONE)
- Created `apps/flippin-api/src/routes/feed.ts`:
  - `GET /api/feed?priceMin=&priceMax=&location=&roiMin=&limit=&offset=` — Query with filters
  - `POST /api/feed/sync` — Trigger marketplace refresh
  - `POST /api/feed/:id/save` — Save listing to inventory
  - `GET /api/feed/saved?userId=&limit=` — Get user's saved listings
- Registered in `apps/flippin-api/src/index.ts` with `/api` prefix

#### 5. ROI Suggestion Engine (DONE)
- Created `apps/flippin-api/src/routes/roiSuggestions.ts`:
  - `POST /api/roi/suggest` — Calculate ROI for any marketplace listing
  - `GET /api/roi/:listingId` — Fetch existing ROI suggestion
  - `POST /api/roi/batch` — Bulk calculate ROI for multiple listings
- **Logic implemented**:
  - Cost estimation (condition-based: new 55%, good 35%, poor 8%)
  - Platform fee tables (eBay 12.5%, Mercari 10%, Facebook 5%, etc.)
  - Profit & ROI % calculation
  - Confidence scoring (95% manual, 60-85% AI)
- Registered in `apps/flippin-api/src/index.ts`

#### 6. Background Sync Job (DONE)
- Created `apps/flippin-api/src/jobs/syncMarketplaces.ts`:
  - Runs every 15 minutes
  - Fetches from eBay, Mercari, Facebook (API stubs ready)
  - Updates prices, marks stale items, generates ROI suggestions
  - Can be integrated into main server or run as separate worker
  - Ready for real API integration

#### 7. Documentation (DONE)
- Created `apps/flippin-app/FEED_ARCHITECTURE.md`:
  - Complete feed-first data model
  - ROI calculation logic deep-dive
  - API endpoint specifications
  - Marketplace API integration points
  - Future roadmap (alert system, portfolio optimization, etc.)
- Updated `00_MASTER_TRACKER.md`:
  - Flippin' section now reflects feed-first pivot
  - Before/after comparison table
  - New curl examples for feed endpoints
  - Links to architecture docs

---

## 🏗️ Current Architecture

### Database
```
marketplaceListings
  ├─→ roiSuggestions (1-to-1)
  ├─→ feedSaves (1-to-many)
  └─→ items.sourceMarketplaceListingId (optional)

items (user inventory)
  └─→ sourceMarketplaceListingId (tracks origin from feed)
```

### Frontend Routes
```
/                  → redirects to /feed
/feed              ← PRIMARY (live marketplace discovery)
/inventory         (saved items from feed)
/intake            (manual photo upload)
/analytics         (profit/ROI dashboard)
/settings          (account, integrations)
```

### Backend Routes
```
GET    /api/feed?priceMin=...&priceMax=...&location=...&roiMin=...
POST   /api/feed/sync
POST   /api/feed/:id/save
GET    /api/feed/saved?userId=...

POST   /api/roi/suggest
GET    /api/roi/:listingId
POST   /api/roi/batch
```

### Background Job
```
syncMarketplaces.ts (runs every 15 min)
  ├─→ fetchEbayListings()    [stub ready]
  ├─→ fetchMercariListings() [stub ready]
  ├─→ fetchFacebookListings() [stub ready]
  ├─→ Insert/update marketplaceListings
  ├─→ Generate ROI suggestions
  └─→ Mark stale items as sold
```

---

## 📁 Files Changed

### Created (New)
```
apps/flippin-app/app/feed/page.tsx
apps/flippin-app/FEED_ARCHITECTURE.md
apps/flippin-api/src/routes/feed.ts
apps/flippin-api/src/routes/roiSuggestions.ts
apps/flippin-api/src/jobs/syncMarketplaces.ts
```

### Updated
```
packages/db/src/schema/flippin.ts          (added 3 tables)
apps/flippin-app/app/layout.tsx            (reordered nav)
apps/flippin-app/app/page.tsx              (redirect to /feed)
apps/flippin-api/src/index.ts              (registered routes)
00_MASTER_TRACKER.md                       (updated Flippin' section)
```

### Untouched (Still Work)
```
apps/flippin-app/app/intake/page.tsx       (photo upload - now tertiary)
apps/flippin-app/app/analytics/page.tsx    (dashboard - still valid)
apps/flippin-app/app/settings/page.tsx     (account settings - still valid)
apps/flippin-api/src/routes/items.ts       (CRUD - still valid)
apps/flippin-api/src/routes/pricing.ts     (ROI calc - now secondary to feed)
apps/flippin-api/src/routes/listings.ts    (listing drafts - still valid)
```

---

## 🚀 What's Next (Prioritized)

### Phase 1: API Integrations (IMMEDIATE)
1. **eBay Browse API**
   - Implement `fetchEbayListings()` in `syncMarketplaces.ts`
   - Docs: https://developer.ebay.com/api-docs/buy/browse/overview.html
   - Env vars needed: `EBAY_CLIENT_ID`, `EBAY_CLIENT_SECRET`

2. **Mercari API**
   - Implement `fetchMercariListings()` in `syncMarketplaces.ts`
   - Docs: https://developer.mercari.com/
   - Env var: `MERCARI_API_KEY`

3. **Facebook Marketplace**
   - Implement `fetchFacebookListings()` in `syncMarketplaces.ts`
   - Docs: https://developers.facebook.com/docs/marketplace/
   - Env var: `FACEBOOK_ACCESS_TOKEN`

### Phase 2: AI Enhancements (NEAR-TERM)
1. Real cost estimation model (vs. static percentages)
2. Vision API for photo quality scoring (in `/intake`)
3. Demand prediction via watch/view signals

### Phase 3: User Features (MEDIUM-TERM)
1. User authentication + multi-user support
2. Email alerts (ROI threshold hit)
3. Portfolio optimization (find ROI gaps by category)
4. Leaderboard (ROI/volume competition)

### Phase 4: Advanced Features (LONG-TERM)
1. Multi-marketplace auto-listing (save feed item → auto-post to eBay + Mercari)
2. Bulk operations (20+ items at once)
3. Integration with shipping carriers (labels, tracking)

---

## 📖 Key Documentation

| File | Purpose |
|------|---------|
| `00_MASTER_TRACKER.md` | Overall monorepo status & quick start |
| `README.md` | Full architecture & setup guide |
| `DEPLOYMENT.md` | Docker, compose, production setup |
| `packages/db/README.md` | Database isolation & usage |
| `apps/flippin-app/README.md` | Frontend features & pages |
| **`apps/flippin-app/FEED_ARCHITECTURE.md`** | **Feed-first data model & API design** (NEW!) |

---

## 🧪 Testing the Feed

### Local Setup
```bash
# Terminal 1: Frontend
pnpm --filter flippin-app dev      # http://localhost:3005 → /feed

# Terminal 2: Backend
pnpm --filter @andysd/flippin-api dev  # http://localhost:3006

# Terminal 3: Database (once)
export FLIPPIN_DATABASE_URL="postgresql://user:password@localhost:5432/flippin_db"
pnpm --filter @andysd/db run db:push
```

### Test the Feed Endpoints
```bash
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

---

## 💡 Key Design Decisions

1. **Feed-First** — Marketplace discovery is the hero feature, not personal inventory
2. **AI ROI** — Instant profit/ROI calculation helps users decide fast
3. **Background Sync** — 15-min refresh keeps feed fresh (vs. user-triggered)
4. **Stubs Ready** — All marketplace API calls are stubbed; easy to integrate real APIs
5. **Modular Routes** — Feed, ROI, and background jobs are separate files for maintainability

---

## 🎯 Success Criteria (MVP Complete)
- ✅ Feed page displays mock marketplace listings
- ✅ Filters work (price, location, ROI, condition)
- ✅ Save to inventory creates item + feedSave record
- ✅ ROI calculation logic is correct (cost, profit, fees, ROI %)
- ✅ Background job can be triggered manually or scheduled
- ✅ API stubs are ready for real marketplace API integration
- ✅ Database schema supports all feed-first operations
- ✅ Comprehensive documentation exists

---

## 📝 Notes for Next Session

1. **Start with API integrations** — Real eBay/Mercari/Facebook data will make the feed come alive
2. **Test with real listings** — Mock data works, but real market data will reveal edge cases
3. **Consider auth early** — Multi-user support is needed for production
4. **Monitor sync job** — 15-min interval may need tuning based on API rate limits
5. **ROI model refinement** — Static condition multipliers work, but ML model would be better

---

## 🔗 Quick Links
- **Repo**: `c:\Users\Andy\andysd-suite`
- **Feed UI**: `apps/flippin-app/app/feed/page.tsx`
- **Feed API**: `apps/flippin-api/src/routes/feed.ts`
- **ROI Engine**: `apps/flippin-api/src/routes/roiSuggestions.ts`
- **Background Job**: `apps/flippin-api/src/jobs/syncMarketplaces.ts`
- **Database**: `packages/db/src/schema/flippin.ts`
- **Architecture Doc**: `apps/flippin-app/FEED_ARCHITECTURE.md`

---

## 📌 Latest Update (Dec 9, 2025)

**API Integration & Authentication** - See `FLIPPIN_API_IMPLEMENTATION_CHECKPOINT.md` for:
- ✅ eBay API client implementation (stubbed, ready for real credentials)
- ✅ JWT authentication middleware integrated
- ✅ Protected feed routes (save/saved with userId from JWT)
- ✅ Marketplace sync job wired into main server
- ⚠️ Blocked on pnpm workspace dependency resolution

**Next Steps**: Fix npm/pnpm install, then test end-to-end with real or mock eBay data.

---

**Ready to continue API integration?** Start a new chat and reference `FLIPPIN_API_IMPLEMENTATION_CHECKPOINT.md`!
