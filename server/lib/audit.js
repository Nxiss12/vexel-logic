async function auditLog(userId, action, subjectType, subjectId, metadata = null, ip = null, userAgent = null) {
  try {
    const { db } = require('./database');
    const meta = metadata ? JSON.stringify(metadata) : null;
    await db.query(
      `INSERT INTO audit_logs (user_id, action, subject_type, subject_id, metadata, ip, user_agent)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [userId, action, subjectType, subjectId, meta, ip, userAgent]
    );
  } catch (err) {
    // Best-effort logging; don't fail auth flows
    console.warn('auditLog error', err.message || err);
  }
}

module.exports = { auditLog };
