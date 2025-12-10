/**
 * eBay API Client
 * 
 * Handles OAuth2 authentication and Browse API calls for marketplace listings.
 * Uses the ebay-api package for simplified auth flow.
 * 
 * Docs: https://developer.ebay.com/api-docs/buy/browse/overview.html
 */

import eBay from 'ebay-api';

export interface EbayClientConfig {
  clientId: string;
  clientSecret: string;
  env?: 'PRODUCTION' | 'SANDBOX';
}

export interface EbaySearchResult {
  itemId: string;
  title: string;
  price: {
    value: string;
    currency: string;
  };
  image?: {
    imageUrl: string;
  };
  images?: Array<{ imageUrl: string }>;
  itemWebUrl: string;
  seller: {
    username: string;
    feedbackPercentage: string;
  };
  condition?: string;
  itemLocation?: {
    city?: string;
    stateOrProvince?: string;
    country?: string;
  };
  shippingOptions?: Array<{
    shippingCost: { value: string };
    shippingCostType: string;
    minDeliveryDays?: number;
    maxDeliveryDays?: number;
  }>;
  watchCount?: number;
  buyingOptions?: string[];
}

export interface EbayItem {
  platform: string;
  platformListingId: string;
  platformUrl: string;
  title: string;
  condition?: string;
  currentPrice: number;
  shippingCost?: number;
  shippingSpeed?: string;
  sellerLocation?: string;
  photoUrls?: string[];
  watchCount?: number;
  viewCount?: number;
  category?: string;
}

export class EbayClient {
  private client: any;
  private config: EbayClientConfig;

  constructor(config: EbayClientConfig) {
    this.config = config;
    this.client = new eBay({
      appId: config.clientId,
      certId: '', // Not needed for Browse API
      devId: '', // Not needed for Browse API
      authToken: '', // Will use OAuth2 client credentials
      ruName: '', // Not needed for Browse API
      sandbox: config.env === 'SANDBOX',
    });
  }

  /**
   * Search for items by query
   * @param query Search term(s)
   * @param limit Number of results (max 200)
   * @param offset Starting position for results
   * @returns Array of parsed eBay items
   */
  async search(
    query: string,
    limit: number = 100,
    offset: number = 0
  ): Promise<EbayItem[]> {
    try {
      console.log(`[eBay] Searching for: "${query}" (limit: ${limit}, offset: ${offset})`);

      // TODO: Replace with actual ebay-api library call
      // The library may require different setup for Browse API
      // Current implementation is a stub - needs real API integration
      const response = await this._searchBrowseApi(query, limit, offset);

      if (!response || !response.itemSummaries) {
        console.warn('[eBay] No items found or empty response');
        return [];
      }

      return response.itemSummaries.map((item: EbaySearchResult) =>
        this._parseEbayItem(item)
      );
    } catch (error) {
      console.error('[eBay] Search error:', error);
      throw error;
    }
  }

  /**
   * Get detailed information about a specific item
   * @param itemId eBay item ID
   * @returns Detailed eBay item
   */
  async getItem(itemId: string): Promise<EbayItem | null> {
    try {
      console.log(`[eBay] Fetching item details: ${itemId}`);

      // TODO: Replace with actual ebay-api library call
      const item = await this._getItemApi(itemId);

      if (!item) {
        return null;
      }

      return this._parseEbayItem(item);
    } catch (error) {
      console.error('[eBay] Get item error:', error);
      throw error;
    }
  }

  /**
   * Search multiple categories for hot items
   * @param categories Array of category names (e.g., ['Electronics', 'Collectibles'])
   * @returns Combined results from all categories
   */
  async searchHotItems(categories: string[] = ['Electronics']): Promise<EbayItem[]> {
    try {
      const results: EbayItem[] = [];

      for (const category of categories) {
        console.log(`[eBay] Fetching hot items in category: ${category}`);
        const items = await this.search(category, 50);
        results.push(...items);
      }

      return results;
    } catch (error) {
      console.error('[eBay] Hot items search error:', error);
      throw error;
    }
  }

  /**
   * Parse eBay API response to internal format
   */
  private _parseEbayItem(item: EbaySearchResult): EbayItem {
    const photoUrls: string[] = [];

    // Collect all image URLs
    if (item.image?.imageUrl) {
      photoUrls.push(item.image.imageUrl);
    }
    if (item.images && Array.isArray(item.images)) {
      photoUrls.push(...item.images.map((img) => img.imageUrl));
    }

    // Get shipping info from first available shipping option
    let shippingCost: number | undefined;
    let shippingSpeed: string | undefined;

    if (item.shippingOptions && item.shippingOptions.length > 0) {
      const firstShipping = item.shippingOptions[0];
      shippingCost = parseFloat(firstShipping.shippingCost.value);

      if (
        firstShipping.minDeliveryDays &&
        firstShipping.maxDeliveryDays
      ) {
        shippingSpeed = `${firstShipping.minDeliveryDays}-${firstShipping.maxDeliveryDays} days`;
      }
    }

    // Extract location
    let sellerLocation: string | undefined;
    if (item.itemLocation) {
      const parts = [
        item.itemLocation.city,
        item.itemLocation.stateOrProvince,
        item.itemLocation.country,
      ].filter(Boolean);
      sellerLocation = parts.join(', ');
    }

    return {
      platform: 'eBay',
      platformListingId: item.itemId,
      platformUrl: item.itemWebUrl,
      title: item.title,
      condition: this._normalizeCondition(item.condition),
      currentPrice: parseFloat(item.price.value),
      shippingCost,
      shippingSpeed,
      sellerLocation,
      photoUrls: photoUrls.slice(0, 5), // Limit to 5 images
      watchCount: item.watchCount || 0,
      viewCount: 0, // eBay API doesn't expose view count in Browse API
    };
  }

  /**
   * Normalize eBay condition values to internal standards
   */
  private _normalizeCondition(ebayCondition?: string): string {
    if (!ebayCondition) return 'Unknown';

    const conditionMap: Record<string, string> = {
      'NEW': 'New',
      'NEW_OTHER': 'New',
      'NEW_WITH_DEFECTS': 'New',
      'REFURBISHED': 'Refurbished',
      'USED': 'Good',
      'FOR_PARTS_OR_NOT_WORKING': 'Poor',
    };

    return conditionMap[ebayCondition] || 'Good';
  }

  /**
   * Stub: Actual Browse API search implementation
   * Replace with real API call once auth is properly configured
   */
  private async _searchBrowseApi(
    query: string,
    limit: number,
    offset: number
  ): Promise<any> {
    // This would call the actual eBay Browse API:
    // GET /buy/browse/v1/item_summary/search
    // with parameters: q, limit, offset, sort, etc.
    
    // For now, return empty - will be implemented with real API credentials
    console.warn('[eBay] Browse API call stub - credentials not configured');
    return { itemSummaries: [] };
  }

  /**
   * Stub: Get item details API call
   */
  private async _getItemApi(itemId: string): Promise<any> {
    // This would call: GET /buy/browse/v1/item/{item_id}
    console.warn('[eBay] Get item API call stub - credentials not configured');
    return null;
  }
}

/**
 * Create and configure eBay client from environment variables
 */
export function createEbayClient(): EbayClient {
  const clientId = process.env.EBAY_CLIENT_ID;
  const clientSecret = process.env.EBAY_CLIENT_SECRET;
  const env = (process.env.EBAY_ENV || 'PRODUCTION') as 'PRODUCTION' | 'SANDBOX';

  if (!clientId || !clientSecret) {
    console.warn(
      '[eBay] Missing credentials (EBAY_CLIENT_ID, EBAY_CLIENT_SECRET). API calls will fail.'
    );
  }

  return new EbayClient({
    clientId: clientId || '',
    clientSecret: clientSecret || '',
    env,
  });
}
