const { Pool } = require('pg');

let pool;

function getPool() {
  if (pool) return pool;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }
  pool = new Pool({ connectionString, max: 10, idleTimeoutMillis: 30000, connectionTimeoutMillis: 2000 });
  pool.on('error', (err) => {
    console.error('Unexpected idle client error', err);
  });
  return pool;
}

async function query(text, params = []) {
  const p = getPool();
  try {
    return await p.query(text, params);
  } catch (err) {
    console.error('Database query error', err.message || err);
    throw err;
  }
}

async function closePool() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

async function healthCheck() {
  try {
    const res = await query('SELECT 1 as ok');
    return res && res.rows && res.rows.length > 0;
  } catch (err) {
    return false;
  }
}

module.exports = { query, getPool, closePool, healthCheck };
