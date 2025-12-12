const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { db } = require('./database');

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';

function generateAccessToken(user) {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

function generateRefreshToken(user) {
  return jwt.sign(
    { userId: user.id, tokenId: crypto.randomUUID() },
    REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
  );
}

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

async function storeRefreshToken(userId, token) {
  const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);
  const tokenHash = hashToken(token);
  const expiresAt = new Date(decoded.exp * 1000);

  await db.query(
    `INSERT INTO refresh_tokens (user_id, token_hash, expires_at)
     VALUES ($1, $2, $3)`,
    [userId, tokenHash, expiresAt]
  );
}

async function verifyAndRotateRefreshToken(token) {
  const tokenHash = hashToken(token);
  const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);

  const existing = await db.query(
    `SELECT * FROM refresh_tokens
     WHERE token_hash = $1 AND revoked_at IS NULL AND expires_at > now()`,
    [tokenHash]
  );

  if (existing.rows.length === 0) {
    throw new Error('Invalid or revoked refresh token');
  }

  const userRes = await db.query('SELECT * FROM users WHERE id = $1', [decoded.userId]);
  if (userRes.rows.length === 0) {
    throw new Error('User not found');
  }
  const user = userRes.rows[0];

  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);
  const newHash = hashToken(newRefreshToken);

  await db.query('BEGIN');
  try {
    await db.query(
      `UPDATE refresh_tokens
       SET revoked_at = now(), replaced_by_token = $1
       WHERE token_hash = $2`,
      [newHash, tokenHash]
    );
    await storeRefreshToken(user.id, newRefreshToken);
    await db.query('COMMIT');
  } catch (e) {
    await db.query('ROLLBACK');
    throw e;
  }

  return { accessToken: newAccessToken, refreshToken: newRefreshToken, user };
}

async function revokeRefreshToken(token) {
  const tokenHash = hashToken(token);
  await db.query(
    `UPDATE refresh_tokens
     SET revoked_at = now()
     WHERE token_hash = $1`,
    [tokenHash]
  );
}

async function revokeAllUserTokens(userId) {
  await db.query(
    `UPDATE refresh_tokens
     SET revoked_at = now()
     WHERE user_id = $1 AND revoked_at IS NULL`,
    [userId]
  );
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  storeRefreshToken,
  verifyAndRotateRefreshToken,
  revokeRefreshToken,
  revokeAllUserTokens
};
