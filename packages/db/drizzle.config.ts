import type { Config } from 'drizzle-kit';

export default {
  schema: './src/schema/index.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    // Use DRIZZLE_DATABASE_URL for CLI (e.g., drizzle-kit push:pg), fallback to DATABASE_URL
    connectionString: process.env.DRIZZLE_DATABASE_URL || process.env.DATABASE_URL!,
  },
} satisfies Config;
