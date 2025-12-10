/**
 * Marketplace Feed Synchronization Job
 * 
 * Runs periodically to sync marketplace listings
 * In production: Fetch from eBay, Mercari, Facebook Marketplace APIs
 */

import { createEbayClient, type EbayItem } from '../clients/ebayClient';

interface MarketplaceItem extends EbayItem {
  description?: string;
  category?: string;
}

/**
 * Fetch listings from eBay API
 */
async function fetchEbayListings(): Promise<MarketplaceItem[]> {
  try {
    const ebayClient = createEbayClient();
    console.log('[SYNC] Fetching eBay listings...');

    const categories = ['Electronics', 'Collectibles & Art', 'Vintage & Antique'];
    const searchPromises = categories.map((category) =>
      ebayClient.search(category, 50).catch((err) => {
        console.error(`[SYNC] eBay search error for ${category}:`, err.message);
        return [];
      })
    );

    const results = await Promise.all(searchPromises);
    const items = results.flat();
    console.log(`[SYNC] eBay returned ${items.length} listings`);
    return items;
  } catch (error) {
    console.error('[SYNC] eBay fetch error:', error);
    return [];
  }
}

/**
 * Stub: Fetch listings from Mercari API
 */
async function fetchMercariListings(): Promise<MarketplaceItem[]> {
  console.log('[SYNC] Mercari API not yet configured');
  return [];
}

/**
 * Stub: Fetch listings from Facebook Marketplace
 */
async function fetchFacebookListings(): Promise<MarketplaceItem[]> {
  console.log('[SYNC] Facebook Marketplace API not yet configured');
  return [];
}

/**
 * Main sync job: fetch all listings
 */
export async function syncMarketplaces() {
  try {
    console.log(`[SYNC] Starting marketplace feed sync at ${new Date().toISOString()}`);

    // Fetch from all marketplace APIs
    const [ebayItems, mercariItems, facebookItems] = await Promise.all([
      fetchEbayListings(),
      fetchMercariListings(),
      fetchFacebookListings(),
    ]);

    const allItems = [...ebayItems, ...mercariItems, ...facebookItems];
    console.log(`[SYNC] Fetched ${allItems.length} listings from marketplaces`);
    console.log('[SYNC] Database integration pending - MVP uses mock data');
  } catch (error) {
    console.error('[SYNC] Marketplace feed sync failed:', error);
  }
}

/**
 * Start the sync job with periodic scheduling
 */
export function startSyncJob(intervalMs = 15 * 60 * 1000) {
  console.log('[SYNC] Starting marketplace sync job...');

  // Run immediately on start
  syncMarketplaces();

  // Schedule periodic runs
  setInterval(() => {
    syncMarketplaces();
  }, intervalMs);
}
