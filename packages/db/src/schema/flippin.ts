import {
  pgTable,
  text,
  integer,
  timestamp,
  decimal,
  uuid,
  boolean,
  jsonb,
  varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable('flippin_users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ============================================================================
// MARKETPLACE FEED TABLES (Core Feature: Live Deal Discovery)
// ============================================================================

export const marketplaceListings = pgTable('flippin_marketplace_listings', {
  id: uuid('id').primaryKey().defaultRandom(),
  // Marketplace identifier
  platform: varchar('platform', { length: 50 }).notNull(), // ebay, mercari, facebook, poshmark, etc.
  platformListingId: varchar('platform_listing_id', { length: 255 }).notNull().unique(),
  platformUrl: text('platform_url').notNull(),
  
  // Item details
  title: text('title').notNull(),
  description: text('description'),
  category: varchar('category', { length: 100 }),
  condition: varchar('condition', { length: 50 }), // new, like-new, good, fair, poor
  
  // Price & shipping
  currentPrice: decimal('current_price', { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal('original_price', { precision: 10, scale: 2 }),
  shippingCost: decimal('shipping_cost', { precision: 10, scale: 2 }).default('0'),
  shippingSpeed: varchar('shipping_speed', { length: 50 }), // free, standard, fast
  
  // Location (for buyer)
  sellerLocation: varchar('seller_location', { length: 255 }),
  lat: decimal('lat', { precision: 10, scale: 6 }),
  lng: decimal('lng', { precision: 10, scale: 6 }),
  
  // Photos
  photoUrls: text('photo_urls'), // JSON array of URLs
  
  // Demand signals
  viewCount: integer('view_count').default(0),
  watchCount: integer('watch_count').default(0),
  soldCount: integer('sold_count').default(0), // Historical
  
  // Metadata
  brand: varchar('brand', { length: 255 }),
  model: varchar('model', { length: 255 }),
  upc: varchar('upc', { length: 50 }),
  
  // Sync metadata
  lastUpdated: timestamp('last_updated').notNull(),
  isSold: boolean('is_sold').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const roiSuggestions = pgTable('flippin_roi_suggestions', {
  id: uuid('id').primaryKey().defaultRandom(),
  marketplaceListingId: uuid('marketplace_listing_id').notNull().references(() => marketplaceListings.id),
  // AI-estimated cost basis (based on category, condition, comps)
  estimatedCostPrice: decimal('estimated_cost_price', { precision: 10, scale: 2 }).notNull(),
  // Based on current marketplace price (what user would sell for)
  estimatedSellPrice: decimal('estimated_sell_price', { precision: 10, scale: 2 }).notNull(),
  // Fees + shipping baked in
  estimatedShippingCost: decimal('estimated_shipping_cost', { precision: 10, scale: 2 }).default('5'),
  platformFeesPercent: decimal('platform_fees_percent', { precision: 5, scale: 2 }).default('12'),
  // Computed ROI
  estimatedProfit: decimal('estimated_profit', { precision: 10, scale: 2 }).notNull(),
  estimatedRoi: decimal('estimated_roi', { precision: 10, scale: 2 }).notNull(),
  // Confidence (0-100)
  confidence: integer('confidence').default(75),
  // Reason for suggestion (used in UI)
  reason: text('reason'), // e.g., "High demand category", "Condition mismatch", "Underpriced vs comps"
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const feedSaves = pgTable('flippin_feed_saves', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  marketplaceListingId: uuid('marketplace_listing_id').notNull().references(() => marketplaceListings.id),
  // When user saves a listing, optionally create an item in inventory
  itemId: uuid('item_id').references(() => items.id),
  // User's cost basis override (can differ from AI suggestion)
  userEstimatedCostPrice: decimal('user_estimated_cost_price', { precision: 10, scale: 2 }),
  // ROI % at time of save
  roiAtSave: decimal('roi_at_save', { precision: 10, scale: 2 }),
  status: varchar('status', { length: 50 }).notNull().default('saved'), // saved, imported, dismissed
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ============================================================================
// USER INVENTORY TABLES (Secondary: Your Items from Feed)
// ============================================================================

export const items = pgTable('flippin_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  // Source: came from marketplace feed (optional link to how user found it)
  sourceMarketplaceListingId: uuid('source_marketplace_listing_id').references(() => marketplaceListings.id),
  brand: varchar('brand', { length: 255 }),
  model: varchar('model', { length: 255 }),
  title: text('title'),
  description: text('description'),
  condition: varchar('condition', { length: 50 }),
  costPrice: decimal('cost_price', { precision: 10, scale: 2 }),
  locationId: uuid('location_id'),
  status: varchar('status', { length: 50 }).notNull().default('draft'), // draft, listed, stale, sold, archived
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const itemPhotos = pgTable('flippin_item_photos', {
  id: uuid('id').primaryKey().defaultRandom(),
  itemId: uuid('item_id').notNull().references(() => items.id),
  url: text('url').notNull(),
  order: integer('order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const itemAttributes = pgTable('flippin_item_attributes', {
  id: uuid('id').primaryKey().defaultRandom(),
  itemId: uuid('item_id').notNull().references(() => items.id),
  attributeKey: varchar('attribute_key', { length: 100 }).notNull(),
  attributeValue: text('attribute_value').notNull(),
});

export const listings = pgTable('flippin_listings', {
  id: uuid('id').primaryKey().defaultRandom(),
  itemId: uuid('item_id').notNull().references(() => items.id),
  platform: varchar('platform', { length: 50 }).notNull(), // ebay, mercari, facebook, etc.
  platformItemId: varchar('platform_item_id', { length: 255 }),
  title: text('title').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  description: text('description'),
  status: varchar('status', { length: 50 }).notNull().default('draft'), // draft, posted, delisted, sold
  url: text('url'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const sales = pgTable('flippin_sales', {
  id: uuid('id').primaryKey().defaultRandom(),
  itemId: uuid('item_id').notNull().references(() => items.id),
  listingId: uuid('listing_id').references(() => listings.id),
  platform: varchar('platform', { length: 50 }),
  salePrice: decimal('sale_price', { precision: 10, scale: 2 }).notNull(),
  platformFees: decimal('platform_fees', { precision: 10, scale: 2 }).default('0'),
  saleDate: timestamp('sale_date').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const shipments = pgTable('flippin_shipments', {
  id: uuid('id').primaryKey().defaultRandom(),
  saleId: uuid('sale_id').notNull().references(() => sales.id),
  carrier: varchar('carrier', { length: 50 }),
  trackingNumber: varchar('tracking_number', { length: 100 }),
  shippingCost: decimal('shipping_cost', { precision: 10, scale: 2 }),
  weight: decimal('weight', { precision: 8, scale: 2 }),
  shippedDate: timestamp('shipped_date'),
  deliveryDate: timestamp('delivery_date'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const expenses = pgTable('flippin_expenses', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  category: varchar('category', { length: 50 }).notNull(), // shipping_supplies, mileage, storage, etc.
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  description: text('description'),
  date: timestamp('date').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const locations = pgTable('flippin_locations', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  name: varchar('name', { length: 100 }).notNull(), // bin A1, shelf 3, unit 5, etc.
  description: text('description'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const auditLog = pgTable('flippin_audit_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  entityType: varchar('entity_type', { length: 50 }).notNull(), // item, listing, sale, etc.
  entityId: uuid('entity_id').notNull(),
  action: varchar('action', { length: 50 }).notNull(), // created, updated, deleted
  changesBefore: jsonb('changes_before'),
  changesAfter: jsonb('changes_after'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const leaderboard = pgTable('flippin_leaderboard', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  totalProfit: decimal('total_profit', { precision: 12, scale: 2 }).notNull().default('0'),
  totalROI: decimal('total_roi', { precision: 10, scale: 2 }).notNull().default('0'),
  flipCount: integer('flip_count').notNull().default(0),
  profitPerHour: decimal('profit_per_hour', { precision: 10, scale: 2 }).default('0'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
