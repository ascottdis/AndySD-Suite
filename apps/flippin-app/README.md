# FlippiN' Out – The Inventory OS for Resellers

**FlippiN' Out** is a modern, full-stack reseller command center that turns photo intake into profits. In one clean pipeline: **Photo → Identify → Price → List → Sell → Ship → Profit**.

## 🎯 Core Promise

Every item gets a **digital twin**: photos + attributes + comps + listing drafts + marketplace postings + sale + shipping + profit history.

**North Star Metrics:**
- Time-to-Listing: minutes from photos → posted listings
- Profit per Hour: actual labor ROI

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm 10.24.0+
- PostgreSQL (local or remote)

### Install & Run

```bash
# Install dependencies
pnpm install

# Set up environment (.env files in apps/flippin-app/ and apps/flippin-api/)
cp apps/flippin-api/.env.example apps/flippin-api/.env
cp apps/flippin-app/.env.example apps/flippin-app/.env

# Start all apps (monorepo)
pnpm dev

# Or run individually:
pnpm --filter flippin-app dev      # Frontend on port 3005
pnpm --filter @andysd/flippin-api dev   # Backend on port 3006
```

### Database Setup

```bash
# Push schema to PostgreSQL
export FLIPPIN_DATABASE_URL="postgresql://user:password@localhost:5432/flippin_db"
pnpm --filter @andysd/db run db:push

# Open Drizzle Studio for visual inspection
pnpm --filter @andysd/db run db:studio
```

---

## 📋 Features & Screens

### 1. **Photo Intake** (`/intake`)
- Upload 2–8 photos (front, back, tag, label, serial, defects)
- AI instantly extracts brand, model, condition, attributes
- Auto-populate title, category, keywords
- Confidence meter: "92% sure this is a Canon AE-1"

### 2. **AI Draft Review**
- Edit extracted attributes fast
- View defects flagged by AI
- Photo quality scoring (retake guidance)
- Condition grading

### 3. **Pricing & Comps** (`/pricing`)
- Sold comps harvesting (eBay, Mercari historical data where available)
- Condition-adjusted price suggestions
- ROI calculator (baked-in fees & shipping)
- "Floor price" + "list price" recommendations
- Confidence score + best-platform recommendation

### 4. **Listing Builder**
- Platform-specific drafts (eBay, Mercari, Facebook)
- Character-limit-aware titles
- Compliant descriptions per platform
- Shipping weight/cost presets
- Template reuse

### 5. **Inventory** (`/inventory`)
- State machine: Draft → Listed → Stale → Sold → Shipped → Archived
- Filter/search by status, location, age, profit potential
- Batch edit tools (reprice, delist, bundle)
- Quick-view profit summary
- Barcode/QR labels for storage

### 6. **Analytics** (`/analytics`)
- Profit this week/month/year
- ROI by category/brand/store
- "Best flips" leaderboard
- Sell-through % and demand signals
- Taxes: exportable CSV by date range

### 7. **Settings** (`/settings`)
- Account & business info
- Shipping presets (weight, carrier, labels)
- Platform integrations (API keys, seller accounts)
- Team roles & permissions (Pro tier)

---

## 🏗️ Architecture

### Frontend (`apps/flippin-app`)
- **Framework**: Next.js 14 (App Router)
- **Styling**: Custom CSS + utility classes
- **State**: React hooks (useState, useCallback)
- **Future**: shadcn/ui, Zustand for complex state

### Backend (`apps/flippin-api`)
- **Framework**: Fastify (high-performance)
- **Database**: Drizzle ORM + PostgreSQL
- **Database isolation**: Uses `FLIPPIN_DATABASE_URL` env var (no cross-app DB sharing)
- **Routes**:
  - `GET /health` — Health check
  - `POST /api/extract` — AI attribute extraction (mock for now)
  - `POST /api/items` — Create item
  - `GET /api/items` — List items
  - `POST /api/pricing/calculate` — ROI calculator
  - `GET /api/pricing/comps` — Price comps lookup
  - `POST /api/listings` — Create listing draft

### Database Schema
- **users** — User accounts
- **items** — Core items with state machine (draft → sold → archived)
- **itemPhotos** — Photo URLs per item
- **itemAttributes** — Extracted attributes (brand, model, size, condition, etc.)
- **listings** — Platform-specific listing drafts & posts
- **sales** — Sale records (platform, price, date)
- **shipments** — Tracking & delivery
- **expenses** — Operating costs (supplies, shipping, mileage)
- **locations** — Storage mapping (bin A1, shelf 3, etc.)
- **auditLog** — Full change history (for debugging & compliance)
- **leaderboard** — Profit rankings & per-user stats

---

## 🎯 MVP Scope (What's Implemented)

✅ Photo intake UI (upload, preview)
✅ Backend API structure (CRUD, pricing, listings)
✅ Database schema (all tables defined)
✅ Inventory & analytics dashboards
✅ Settings & defaults
✅ ROI calculator logic
❌ AI extraction (OpenAI Vision, Google Cloud Vision integration pending)
❌ Marketplace API integrations (eBay, Mercari, Facebook APIs pending)
❌ Real comps fetching (research/spike phase)
❌ Batch operations UI
❌ Auth integration

---

## 🔄 Data Flow (Happy Path)

1. **User snaps photos** → Intake page
2. **Upload photos** → API `/api/extract` endpoint
3. **AI extracts attributes** → Returns brand, model, condition, keywords
4. **User reviews draft** → Edits fields (brand, title, etc.)
5. **User enters cost basis** → Clicks "Price It"
6. **Pricing engine calculates ROI** → Shows confidence, alternatives
7. **User creates listings** → Per-platform drafts generated
8. **User posts** → (Stub for now; will call platform APIs)
9. **Item sells** → Sales table updated
10. **Track shipment** → Shipment table updated
11. **Calculate profit** → Leaderboard + analytics updated

---

## 🛠️ Development

### Add a New Feature

1. **Frontend**: Add a new route in `apps/flippin-app/app/`
2. **Backend**: Add routes to `apps/flippin-api/src/routes/`
3. **Database**: If needed, extend `packages/db/src/schema/flippin.ts`
4. **API Integration**: Connect frontend component to backend endpoint

### Testing

```bash
# Health check
curl http://localhost:3006/health

# Mock extraction
curl -X POST http://localhost:3006/api/extract \
  -H "Content-Type: application/json" \
  -d '{"photoCount": 3}'

# ROI calculation
curl -X POST http://localhost:3006/api/pricing/calculate \
  -H "Content-Type: application/json" \
  -d '{"costPrice": 30, "conditionAdjustment": 0, "shippingCost": 5, "platformFees": 0.12}'
```

---

## 📦 Deployment

See [DEPLOYMENT.md](../../DEPLOYMENT.md) for full instructions.

**Quick Deploy:**
```bash
# Docker
docker build -f Dockerfile.nextjs -t andysd/flippin-app .
docker build -f Dockerfile.nodejs -t andysd/flippin-api .

# Or docker-compose
docker-compose up flippin-app flippin-api
```

---

## 🔐 Environment Variables

### Frontend (`.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:3006
```

### Backend (`.env`)
```
FLIPPIN_DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
VISION_API_KEY=sk-...
LLM_API_KEY=...
EBAY_API_KEY=...
MERCARI_API_KEY=...
```

---

## 📚 Future Expansions (V1.1+)

- **AI Vision API**: OpenAI GPT-4V or Google Cloud Vision for attribute extraction
- **Comps Engine**: Real sold/active listing data from major platforms
- **Marketplace APIs**: Native eBay, Mercari, Facebook integrations
- **Batch Upload**: Photo 30+ items, AI processes all in background
- **Autopilot Repricing**: Automatic markdown + platform-specific strategy
- **Shipping Labels**: Pirate Ship, EasyPost integration
- **Tax Module**: Scheduled exports, quarterly reports
- **Team Collaboration**: Multi-user roles, task assignments
- **Mobile App**: React Native for photo intake on-the-go

---

## 📞 Support

- GitHub Issues: Bug reports & feature requests
- Email: support@flippin.local
- Slack: #flippin-help (if available)

---

**Status**: MVP Phase | Last Updated: Dec 9, 2025
