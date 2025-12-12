const express = require('express');
const bcrypt = require('bcrypt');
const { db } = require('../lib/database');
const {
  generateAccessToken,
  generateRefreshToken,
  storeRefreshToken,
  verifyAndRotateRefreshToken,
  revokeRefreshToken,
  revokeAllUserTokens
} = require('../lib/auth');
const { auditLog } = require('../lib/audit');
const { authRateLimiter } = require('../middleware/rate-limit');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/login', authRateLimiter, async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  if (result.rows.length === 0) {
    await bcrypt.compare(password, '$2b$10$dummy.hash.to.prevent.timing.attack');
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const user = result.rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    await auditLog(user.id, 'login_failed', 'user', user.id, null, req.ip, req.get('user-agent'));
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  await storeRefreshToken(user.id, refreshToken);
  await db.query('UPDATE users SET last_login_at = now() WHERE id = $1', [user.id]);
  await auditLog(user.id, 'login_success', 'user', user.id, null, req.ip, req.get('user-agent'));

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({
    accessToken,
    refreshToken,
    user: { id: user.id, email: user.email, role: user.role }
  });
});

router.post('/refresh', async (req, res) => {
  const token = req.cookies.refreshToken || req.body.refreshToken;
  if (!token) return res.status(401).json({ error: 'Refresh token required' });

  try {
    const { accessToken, refreshToken, user } = await verifyAndRotateRefreshToken(token);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.json({ accessToken, refreshToken, user: { id: user.id, email: user.email, role: user.role } });
  } catch (e) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
});

router.post('/logout', async (req, res) => {
  const token = req.cookies.refreshToken || req.body.refreshToken;
  if (token) await revokeRefreshToken(token);
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out' });
});

router.post('/revoke-all', authenticateToken, async (req, res) => {
  await revokeAllUserTokens(req.user.userId);
  res.clearCookie('refreshToken');
  await auditLog(req.user.userId, 'revoke_all_tokens', 'user', req.user.userId, null, req.ip, req.get('user-agent'));
  res.json({ message: 'All sessions revoked' });
});

module.exports = router;
