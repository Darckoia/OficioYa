import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool, dbEnabled, closeDb } from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sqlDir = path.join(__dirname, '..', 'sql');

async function runMigrations() {
  if (!dbEnabled || !pool) {
    console.log('⚠️  DATABASE_URL no configurada. Saltando migraciones.');
    console.log('   Configura DATABASE_URL para habilitar persistencia PostgreSQL.');
    return false;
  }

  const client = await pool.connect();
  try {
    // Create migrations tracking table
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        filename TEXT NOT NULL UNIQUE,
        executed_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);

    const files = fs.readdirSync(sqlDir).filter(f => f.endsWith('.sql')).sort();
    let applied = 0;

    for (const file of files) {
      const alreadyApplied = await client.query(
        'SELECT 1 FROM migrations WHERE filename = $1',
        [file]
      );

      if (alreadyApplied.rows.length > 0) {
        console.log(`⏭️  ${file} ya aplicada`);
        continue;
      }

      const sql = fs.readFileSync(path.join(sqlDir, file), 'utf8');
      console.log(`🔄 Aplicando ${file}...`);
      await client.query(sql);
      await client.query('INSERT INTO migrations (filename) VALUES ($1)', [file]);
      console.log(`✅ ${file}`);
      applied++;
    }

    console.log(`\n📊 ${applied} migración(es) aplicadas. Base de datos lista.`);
    return true;
  } catch (e) {
    console.error('❌ Error durante migraciones:', e.message);
    throw e;
  } finally {
    client.release();
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runMigrations()
    .then(async () => {
      await closeDb();
      process.exit(0);
    })
    .catch(async (e) => {
      console.error(e);
      await closeDb();
      process.exit(1);
    });
}

export { runMigrations };
