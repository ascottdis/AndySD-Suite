import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { authRoutes } from './routes/auth';
import { createDb } from '@andysd/db';

const fastify = Fastify({
  logger: true,
});

async function main() {
  // Initialize DB per-app using a dedicated env var to avoid cross-app sharing
  const databaseUrl = process.env.GIGGIN_DATABASE_URL || process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.warn('No database URL configured for giggin-api (GIGGIN_DATABASE_URL or DATABASE_URL). Skipping DB initialization.');
  } else {
    try {
      const db = createDb(databaseUrl);
      // Attach DB to the Fastify instance for routes to access via `fastify.db`
      // `decorate` is the recommended API but to avoid type issues use assignment
      (fastify as any).db = db;
    } catch (err) {
      console.error('Failed to initialize DB for giggin-api', err);
      process.exit(1);
    }
  }
  // Register plugins
  await fastify.register(cors, {
    origin: true,
  });

  // Register routes
  await fastify.register(authRoutes);

  // Health check
  fastify.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  // Start server
  try {
    await fastify.listen({ port: 3001, host: '0.0.0.0' });
    console.log('Giggin API running on http://localhost:3001');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

main();
