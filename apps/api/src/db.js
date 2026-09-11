import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

export const dbEnabled = Boolean(connectionString);

export const pool = dbEnabled
  ? new Pool({
      connectionString,
      max: Number(process.env.DB_POOL_MAX || 10),
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
    })
  : null;

export async function query(text, params = []) {
  if (!pool) throw new Error('DATABASE_URL no está configurada');
  return pool.query(text, params);
}

export async function transaction(work) {
  if (!pool) throw new Error('DATABASE_URL no está configurada');
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await work(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function closeDb() {
  if (pool) await pool.end();
}
