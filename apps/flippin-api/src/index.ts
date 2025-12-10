import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import { createDb } from './db';
import { setupAuth } from './auth/middleware';
import { startSyncJob } from './jobs/syncMarketplaces';
import itemsRouter from './routes/items';
import pricingRouter from './routes/pricing';
import listingsRouter from './routes/listings';
import healthRouter from './routes/health';
import { feedRoutes } from './routes/feed';
import { roiSuggestionsRoutes } from './routes/roiSuggestions';

const PORT = parseInt(process.env.PORT || '3006', 10);
const DATABASE_URL = process.env.FLIPPIN_DATABASE_URL || process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-change-in-production';
const ENABLE_SYNC_JOB = process.env.ENABLE_SYNC_JOB !== 'false'; // Enabled by default

async function start() {
  const fastify = Fastify({
    logger: true,
  });

  // CORS
  await fastify.register(fastifyCors, {
    origin: true,
  });

  // Database
  if (!DATABASE_URL) {
    fastify.log.warn('FLIPPIN_DATABASE_URL not set; database endpoints will fail.');
  } else {
    const db = createDb(DATABASE_URL);
    (fastify as any).db = db;
    fastify.log.info('Database initialized.');
  }

  // Authentication
  setupAuth(fastify, JWT_SECRET);
  fastify.log.info('JWT authentication configured.');

  // Routes
  await fastify.register(healthRouter);
  await fastify.register(itemsRouter, { prefix: '/api/items' });
  await fastify.register(pricingRouter, { prefix: '/api/pricing' });
  await fastify.register(listingsRouter, { prefix: '/api/listings' });
  await fastify.register(feedRoutes, { prefix: '/api' });
  await fastify.register(roiSuggestionsRoutes, { prefix: '/api' });

  // Global extraction endpoint (for intake)
  fastify.post('/api/extract', async (request, reply) => {
    const { photoCount } = request.body as any;
    // Mock response for now; in production, call Vision API
    return {
      brand: 'Sample Brand',
      model: 'Model XL',
      condition: 'Good',
      suggestedTitle: 'Sample Item - Well Maintained',
      suggestedPrice: 49.99,
      confidence: 92,
      photoCount,
    };
  });

  // Start marketplace sync job
  if (ENABLE_SYNC_JOB) {
    const syncIntervalMs = parseInt(process.env.SYNC_INTERVAL_MS || '900000', 10); // 15 min default
    startSyncJob(syncIntervalMs);
    fastify.log.info(
      `Marketplace sync job enabled (interval: ${syncIntervalMs / 60000} minutes)`
    );
  } else {
    fastify.log.info('Marketplace sync job disabled (set ENABLE_SYNC_JOB=true to enable)');
  }

  // Graceful shutdown
  const gracefulShutdown = async () => {
    fastify.log.info('Shutting down gracefully...');
    await fastify.close();
    process.exit(0);
  };

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);

  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`✅ Flippin API running on http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
