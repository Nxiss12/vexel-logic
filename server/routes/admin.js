const express = require('express');
const { query } = require('../lib/database');
const { authenticateToken } = require('../middleware/auth');
const { requireAdmin } = require('../middleware/require-admin');

const router = express.Router();

function buildWhereClause({ q, status, profession }, params) {
  const clauses = [];
  if (status) {
    params.push(status);
    clauses.push(`status = $${params.length}`);
  }
  if (profession) {
    params.push(profession);
    clauses.push(`profession = $${params.length}`);
  }
  if (q) {
    params.push(`%${q}%`);
    const idx = params.length;
    clauses.push(`(name ILIKE $${idx} OR email ILIKE $${idx} OR phone ILIKE $${idx})`);
  }
  return clauses.length ? clauses.join(' AND ') : 'TRUE';
}

router.get('/workflows', authenticateToken, requireAdmin, async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
  const offset = (page - 1) * limit;

  const { q, status, profession } = req.query;
  const params = [];
  const where = buildWhereClause({ q, status, profession }, params);

  try {
    const dataSql = `SELECT id, profession, name, email, phone, zip_code, message, status, created_at, updated_at, COUNT(*) OVER() AS total_count FROM workflow_requests WHERE ${where} ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);
    const dataRes = await query(dataSql, params);
    const rows = dataRes.rows || [];
    const totalCount = rows.length ? parseInt(rows[0].total_count, 10) : 0;
    const totalPages = Math.max(1, Math.ceil(totalCount / limit));

    const pagination = {
      page,
      limit,
      totalCount,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    };

    // remove total_count from each row
    const data = rows.map(({ total_count, ...r }) => r);

    res.json({ data, pagination });
  } catch (err) {
    console.error('Admin workflows error', err.message || err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/workflows.csv', authenticateToken, requireAdmin, async (req, res) => {
  const { q, status, profession } = req.query;
  const params = [];
  const where = buildWhereClause({ q, status, profession }, params);

  try {
    const sql = `SELECT id, profession, name, email, phone, zip_code, message, status, created_at FROM workflow_requests WHERE ${where} ORDER BY created_at DESC LIMIT 10000`;
    // Note: we don't pass params to limit the SQL injection vector as we constructed sql with placeholder indexes; map params properly
    const result = await query(sql, params);
    const rows = result.rows || [];

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="workflows-${Date.now()}.csv"`);

    const header = ['id', 'profession', 'name', 'email', 'phone', 'zip_code', 'status', 'created_at', 'message'];
    const csv = [header.join(',')];
    for (const r of rows) {
      const line = header.map((h) => {
        const value = r[h] == null ? '' : String(r[h]);
        // escape double quotes by doubling them
        return `"${value.replace(/"/g, '""')}"`;
      }).join(',');
      csv.push(line);
    }

    res.send(csv.join('\n'));
  } catch (err) {
    console.error('CSV export error', err.message || err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
