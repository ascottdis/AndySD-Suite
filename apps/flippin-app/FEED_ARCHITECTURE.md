# Flippin' Feed-First Architecture

## Overview

Flippin' has been redesigned as a **marketplace feed discovery engine with AI-driven ROI suggestions**. The central concept: help resellers find profitable deals by scanning live marketplace listings (eBay, Mercari, Facebook) and instantly calculating profit/ROI with AI cost estimation.

**Primary Flow:**
1. User lands on `/feed` → sees live marketplace listings with ROI scanner overlay
2. User filters by price, location, category, ROI threshold
3. User saves promising listings → creates item in personal inventory with source link
4. Background job syncs marketplaces every 15 minutes

---

## Database Schema Updates

### New Tables

#### `marketplaceListings`
Live feed from external marketplaces. Sources of truth for marketplace data.
- `platform` — ebay, mercari, facebook, poshmark, etc.
- `platformListingId`, `platformUrl` — External identifiers
- `title`, `description`, `category`, `condition` — Item metadata
- `currentPrice`, `shippingCost` — Pricing
- `sellerLocation`, `lat`, `lng` — Geographic data
- `photoUrls` — JSON array of image URLs
- `viewCount`, `watchCount`, `soldCount` — Demand signals
- `isSold` — Stale/archived flag (set after 30 days no activity)
- `lastUpdated` — Sync timestamp

#### `roiSuggestions`
AI-calculated profit/ROI for each marketplace listing.
- `marketplaceListingId` → `marketplaceListings.id` (1-to-1)
- `estimatedCostPrice` — AI-guessed cost basis (based on condition, category, comps)
- `estimatedSellPrice` — Current marketplace price
- `estimatedShippingCost`, `platformFeesPercent` — Fee calculations
- `estimatedProfit`, `estimatedRoi` — Computed metrics
- `confidence` — AI confidence score (0-100)
- `reason` — Explanation for suggestion (shown in UI)

#### `feedSaves`
User interactions with marketplace feed (saves → imports to inventory).
- `userId`, `marketplaceListingId` (FK)
- `itemId` (optional FK to items table after import)
- `userEstimatedCostPrice` — User override for cost estimate
- `roiAtSave` — ROI % snapshot at time of save
- `status` — saved | imported | dismissed

#### Updated: `items` Table
- Added `sourceMarketplaceListingId` (optional FK) — Links inventory item to its marketplace source

---

## Frontend Architecture

### Navigation (Reordered)
```
FlippiN' Out
├── [Feed]         ← PRIMARY (hero page)
├── Your Items     ← Secondary (saved items)
├── Upload Photo   ← Tertiary (manual intake)
├── Analytics
└── Settings
```

### Pages

#### `/feed` (NEW — Primary)
**Live Marketplace Discovery Engine**
- Grid of live marketplace listings (5 per row on desktop)
- Each card shows:
  - Marketplace platform badge + condition badge
  - Product title (2-line truncate)
  - Current marketplace price (large, emerald)
  - Seller location
  - **ROI Highlight Box** (emerald background)
    - Estimated Profit (green)
    - ROI % (green)
    - Confidence % (gray)
  - "Save to Inventory" button (state: saved/unsaved)

**Filters (Sticky Top)**
- Price range (min/max inputs)
- Location (city/state text search)
- ROI minimum threshold
- Platform selector (dropdown)
- Condition selector (dropdown)
- Clear Filters button

**Features**
- "Refresh Feed" button → triggers `POST /api/feed/sync`
- Results counter ("Showing 23 of 450 listings")
- Empty state ("No listings match your filters")
- Responsive grid (1 col mobile, 2 col tablet, 3 col desktop)

#### `/inventory` (Refocused — Secondary)
**Saved Items from Feed**
- List of items saved from marketplace feed
- Shows source marketplace link
- Can edit cost basis, condition, list to marketplaces
- Moved from primary to secondary flow

#### `/analytics`, `/intake`, `/settings`
Unchanged (but intake is now secondary path).

---

## Backend Architecture

### New Routes

#### Feed Routes (`/api/feed`)

**GET /api/feed?priceMin=100&priceMax=500&location=LA&roiMin=30&limit=50&offset=0**
- Query marketplace listings with filters
- Returns array of listings with ROI suggestions
- Supports pagination

**POST /api/feed/sync**
- Trigger immediate marketplace refresh
- Called by frontend "Refresh Feed" button or background job timer
- Returns `{ status: 'sync_in_progress', timestamp }`

**POST /api/feed/:id/save**
- Save a marketplace listing to user's inventory
- Creates item + feedSave record
- Accepts optional `userEstimatedCostPrice` override
- Returns `{ itemId, message }`

**GET /api/feed/saved?userId=xxx&limit=20&offset=0**
- Get user's saved listings from feed
- Returns array of feedSaves with marketplace listing context

#### ROI Suggestion Routes (`/api/roi`)

**POST /api/roi/suggest**
- Calculate ROI for a marketplace listing
- Request: `{ marketplaceListingId, manualCostEstimate? }`
- Response:
  ```json
  {
    "estimatedCostPrice": 50,
    "estimatedSellPrice": 189.99,
    "platformFeesPercent": 12.5,
    "estimatedShippingCost": 5,
    "estimatedProfit": 87.49,
    "estimatedRoi": 174.98,
    "confidence": 88,
    "reason": "AI estimate based on Excellent condition in Electronics"
  }
  ```
- Saves suggestion to DB if not already exists

**GET /api/roi/:listingId**
- Fetch existing ROI suggestion for a listing

**POST /api/roi/batch**
- Bulk calculate ROI for multiple listings
- Request: `{ listingIds: [...] }`
- Returns array of ROI calculations

### Background Job (`syncMarketplaces.ts`)

**Scheduled Task** — Runs every 15 minutes
- Fetch new listings from:
  - eBay Browse API (stub)
  - Mercari API (stub)
  - Facebook Marketplace SDK (stub)
- Update prices for existing listings
- Mark sold/stale items as `isSold = true` (30+ days inactive)
- Generate ROI suggestions for new listings
- Log sync stats (inserted, updated, stale marked)

**Startup**
- Can be integrated into main Fastify server
- Or run as separate scheduled worker (cron/agenda)
- Usage: `import { startSyncJob } from './jobs/syncMarketplaces'`

---

## ROI Calculation Logic

### Cost Estimation
**AI-estimated cost basis** based on:
- Item condition (new → 55%, like-new → 45%, good → 35%, poor → 8% of selling price)
- Category (electronics 85% confidence, fashion 75%, default 65%)
- Historical comps (DB lookup, stub for now)

### Profit & ROI
```
Selling Price = Marketplace listing price
Fees = Selling Price × Platform Fee % (eBay 12.5%, Mercari 10%, Facebook 5%)
Shipping = $5 (default, customizable per listing)
Net Proceeds = Selling Price - Fees - Shipping
Estimated Profit = Net Proceeds - Estimated Cost
ROI % = (Profit / Cost) × 100
```

### Confidence Score
- User manual estimate: 95%
- AI estimate by category: 60-85%
- Marketplace sell-through data: higher confidence for hot categories

---

## Frontend to Backend Integration

### Save Listing Flow
1. User clicks "Save to Inventory" on feed card
2. Button state: disabled → loading → "✓ Saved"
3. Frontend POST `/api/feed/:id/save` with `{ userId, userEstimatedCostPrice? }`
4. Backend:
   - Creates `items` record (draft status)
   - Creates `feedSaves` record
   - Returns `{ itemId }`
5. Frontend updates local `saved` Set, re-renders button

### Sync Trigger Flow
1. User clicks "Refresh Feed" button
2. Button text: "Refreshing..." (disabled)
3. Frontend POST `/api/feed/sync`
4. Backend starts async marketplace API calls
5. Response: `{ status: 'sync_in_progress' }`
6. Frontend polls `GET /api/feed` after 2-3 seconds for fresh results
7. Button re-enables

---

## Marketplace API Stubs

### eBay (`fetchEbayListings`)
- **To Implement**: eBay Browse API + Search API
- **Docs**: https://developer.ebay.com/api-docs/buy/browse/overview.html
- **Auth**: API keys (CLIENT_ID, CLIENT_SECRET)
- **Fields**: title, price, condition, location, images, viewCount

### Mercari (`fetchMercariListings`)
- **To Implement**: Mercari public API
- **Docs**: https://developer.mercari.com/
- **Auth**: API key (MERCARI_API_KEY)
- **Fields**: item_id, title, price, status, photo URLs

### Facebook Marketplace (`fetchFacebookListings`)
- **To Implement**: Facebook Graph API (Marketplace)
- **Docs**: https://developers.facebook.com/docs/marketplace/
- **Auth**: Access token (FACEBOOK_ACCESS_TOKEN)
- **Scope**: `pages_read_engagement`, `pages_manage_metadata`

---

## Environment Variables

```bash
# Marketplace API Keys
EBAY_CLIENT_ID=xxx
EBAY_CLIENT_SECRET=xxx
MERCARI_API_KEY=xxx
FACEBOOK_ACCESS_TOKEN=xxx

# Database
FLIPPIN_DATABASE_URL=postgresql://user:pass@localhost:5432/flippin

# Server
PORT=3006
```

---

## Future Enhancements

### Phase 2: API Integrations
- [ ] Live eBay API integration (browse, search, price history)
- [ ] Mercari API for condition-based pricing
- [ ] Facebook Marketplace SDK for local market insights
- [ ] Comps database for cost estimation accuracy

### Phase 3: AI Enhancements
- [ ] Vision API for photo quality scoring
- [ ] NLP for title/description parsing
- [ ] Cost estimation model trained on historical flips
- [ ] Demand prediction via watch/view signals

### Phase 4: Advanced Features
- [ ] Alert system (email when ROI threshold hit)
- [ ] Portfolio optimization (find ROI gaps)
- [ ] Leaderboard (users competing on ROI/volume)
- [ ] Multi-marketplace listing (save → auto-list to Mercari + Facebook)

---

## File Summary

### Created
- `apps/flippin-app/app/feed/page.tsx` — Live marketplace feed UI
- `apps/flippin-api/src/routes/feed.ts` — Feed CRUD + sync endpoints
- `apps/flippin-api/src/routes/roiSuggestions.ts` — ROI calculation engine
- `apps/flippin-api/src/jobs/syncMarketplaces.ts` — Background marketplace sync

### Updated
- `packages/db/src/schema/flippin.ts` — Added 3 new tables (marketplace, roi, saves)
- `apps/flippin-app/app/layout.tsx` — Reordered navigation
- `apps/flippin-app/app/page.tsx` — Redirect to /feed
- `apps/flippin-api/src/index.ts` — Registered feed + roi routes

---

## Testing Checklist

- [ ] Navigate to `/feed` → see mock marketplace listings
- [ ] Apply filters (price, location, ROI) → results update
- [ ] Click "Save to Inventory" → state changes to "✓ Saved"
- [ ] POST `/api/feed/sync` → logs "Sync in progress"
- [ ] POST `/api/roi/suggest` with listing ID → returns ROI calc
- [ ] Navigate to `/inventory` → see saved items from feed
- [ ] Verify sourceMarketplaceListingId on items created from feed

---

**Architecture Owner**: Flippin' Reseller OS  
**Last Updated**: [Current Date]  
**Status**: Feed-first MVP complete; awaiting API integrations
