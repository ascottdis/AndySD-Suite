import { Pool } from 'pg';

export function createDb(databaseUrl: string) {
  const pool = new Pool({
    connectionString: databaseUrl,
  });

  return {
    pool,
    query: async (text: string, params?: any[]) => {
      return pool.query(text, params);
    },
    close: async () => {
      await pool.end();
    },
  };
}

export default createDb;
