import crypto from 'node:crypto';
import { query } from './db.js';

const FRIEND_CODE = (process.env.FRIEND_TRIAL_CODE || 'POCHOKLITO').trim().toUpperCase();
const HOURS = 48;

function hash(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

export function isFriendTrialCode(value) {
  return typeof value === 'string' && hash(value.trim().toUpperCase()) === hash(FRIEND_CODE);
}

export async function activateFriendTrial(userId, suppliedCode) {
  if (!isFriendTrialCode(suppliedCode)) return { ok: false, reason: 'invalid_code' };

  const existing = await query(
    `SELECT id, expires_at, status FROM trial_access WHERE user_id = $1 AND kind = 'friends' ORDER BY created_at DESC LIMIT 1`,
    [userId]
  );
  if (existing.rows[0] && new Date(existing.rows[0].expires_at) > new Date() && existing.rows[0].status === 'active') {
    return { ok: true, expiresAt: existing.rows[0].expires_at, reused: true };
  }

  const started = new Date();
  const expires = new Date(started.getTime() + HOURS * 60 * 60 * 1000);
  const result = await query(
    `INSERT INTO trial_access (user_id, code_hash, kind, started_at, expires_at, status)
     VALUES ($1, $2, 'friends', $3, $4, 'active')
     RETURNING id, started_at, expires_at, status`,
    [userId, hash(FRIEND_CODE), started, expires]
  );
  return { ok: true, ...result.rows[0], reused: false };
}

export async function getTrialStatus(userId) {
  const result = await query(
    `SELECT id, started_at, expires_at, status FROM trial_access WHERE user_id = $1 AND kind = 'friends' ORDER BY created_at DESC LIMIT 1`,
    [userId]
  );
  const trial = result.rows[0];
  if (!trial) return { active: false, status: 'none' };
  if (trial.status === 'active' && new Date(trial.expires_at) <= new Date()) {
    await query(`UPDATE trial_access SET status = 'expired' WHERE id = $1`, [trial.id]);
    return { ...trial, active: false, status: 'expired' };
  }
  return { ...trial, active: trial.status === 'active' };
}
