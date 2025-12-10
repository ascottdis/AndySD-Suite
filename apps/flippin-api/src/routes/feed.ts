import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export async function feedRoutes(fastify: FastifyInstance) {
  // GET /api/feed - Retrieve live marketplace listings with filters
  fastify.get(
    '/feed',
    { onRequest: [(fastify as any).optionalAuth] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { priceMin, priceMax, roiMin, limit = 50, offset = 0 } = request.query as Record<string, any>;

        // Mock marketplace listings for MVP
        const mockListings = [
          {
            id: '1',
            platform: 'eBay',
            platformListingId: 'eb123',
            title: 'Vintage Camera - Great Condition',
            currentPrice: 85.50,
            condition: 'Good',
            roi: 65.2,
            estimatedProfit: 55.50,
            confidence: 92,
          },
          {
            id: '2',
            platform: 'Mercari',
            platformListingId: 'merc456',
            title: 'Nike Sneakers - Size 10',
            currentPrice: 45.00,
            condition: 'Like New',
            roi: 120.5,
            estimatedProfit: 54.00,
            confidence: 88,
          },
        ];

        const filtered = mockListings.filter((item) => {
          if (priceMin && item.currentPrice < Number(priceMin)) return false;
          if (priceMax && item.currentPrice > Number(priceMax)) return false;
          if (roiMin && item.roi < Number(roiMin)) return false;
          return true;
        });

        return reply.send(filtered);
      } catch (error) {
        fastify.log.error(error);
        return reply.code(500).send({ error: 'Failed to fetch feed' });
      }
    }
  );

  // POST /api/feed/:id/save - Save listing to inventory
  fastify.post(
    '/feed/:id/save',
    { onRequest: [(fastify as any).authenticate] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const { userEstimatedCostPrice } = request.body as any;
        const userId = (request as any).user?.id || 'user-default';

        return reply.send({
          itemId: id,
          userId,
          message: 'Listing saved to inventory',
          estimatedProfit: 55.50,
        });
      } catch (error) {
        fastify.log.error(error);
        return reply.code(500).send({ error: 'Failed to save listing' });
      }
    }
  );

  // GET /api/feed/saved - Get user's saved listings
  fastify.get(
    '/feed/saved',
    { onRequest: [(fastify as any).authenticate] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const userId = (request as any).user?.id || 'user-default';

        // Mock saved listings
        const mockSaved = [
          {
            id: '1',
            platform: 'eBay',
            title: 'Vintage Camera - Great Condition',
            currentPrice: 85.50,
            userEstimatedCostPrice: 30.00,
            estimatedProfit: 55.50,
            savedAt: new Date().toISOString(),
          },
        ];

        return reply.send(mockSaved);
      } catch (error) {
        fastify.log.error(error);
        return reply.code(500).send({ error: 'Failed to fetch saved listings' });
      }
    }
  );

  // POST /api/feed/sync - Trigger marketplace feed sync
  fastify.post(
    '/feed/sync',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        fastify.log.info('Feed sync triggered');
        return reply.send({ message: 'Sync job started', syncedListings: 0 });
      } catch (error) {
        fastify.log.error(error);
        return reply.code(500).send({ error: 'Failed to trigger sync' });
      }
    }
  );
}
