import { query, transaction } from './db.js';
import bcrypt from 'bcryptjs';

export async function createUser({ name, email, password, role = 'business' }) {
  const passwordHash = await bcrypt.hash(password, 10);
  const { rows } = await query(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, role, created_at`,
    [name, email, passwordHash, role]
  );
  return rows[0];
}

export async function findUserByEmail(email) {
  const { rows } = await query(
    `SELECT id, name, email, password_hash, role, created_at
     FROM users WHERE email = $1`,
    [email]
  );
  return rows[0] || null;
}

export async function findUserById(id) {
  const { rows } = await query(
    `SELECT id, name, email, role, created_at
     FROM users WHERE id = $1`,
    [id]
  );
  return rows[0] || null;
}

export async function verifyPassword(user, password) {
  return bcrypt.compare(password, user.password_hash);
}