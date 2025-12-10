import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

/**
 * Create and return a Drizzle DB instance for the provided database URL.
 * This avoids creating a connection at module import time so apps must
 * explicitly initialize their own DB instance using an app-specific env var.
 */
export function createDb(databaseUrl: string) {
	const sql = neon(databaseUrl);
	return drizzle(sql);
}

// Re-export schema so callers can still import table types: `import { users } from '@andysd/db/schema'`
export * from './schema';
