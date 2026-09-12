import { query } from './db.js';
import { z } from 'zod';

const businessSchema = z.object({
  name: z.string().min(2),
  category: z.string().min(2),
  city: z.string().min(2),
  whatsapp: z.string().min(8).optional(),
  description: z.string().max(1000).optional(),
});

export async function createBusiness(ownerId, input) {
  const data = businessSchema.parse(input);
  const { rows } = await query(
    `INSERT INTO businesses (owner_id, name, category, city, whatsapp, description, country, currency)
     VALUES ($1, $2, $3, $4, $5, $6, 'CL', 'CLP')
     RETURNING id, owner_id, name, category, city, region, country, currency, whatsapp, email, description, created_at, updated_at`,
    [
      ownerId,
      data.name,
      data.category,
      data.city,
      data.whatsapp ?? null,
      data.description ?? null,
    ]
  );
  return rows[0];
}

export async function listBusinessesByOwner(ownerId) {
  const { rows } = await query(
    `SELECT id, owner_id, name, category, city, region, country, currency, whatsapp, email, description, created_at, updated_at
     FROM businesses WHERE owner_id = $1 ORDER BY created_at DESC`,
    [ownerId]
  );
  return rows;
}

export async function findBusinessById(businessId, ownerId) {
  const { rows } = await query(
    `SELECT id, owner_id, name, category, city, region, country, currency, whatsapp, email, description, created_at, updated_at
     FROM businesses WHERE id = $1 AND owner_id = $2`,
    [businessId, ownerId]
  );
  return rows[0] || null;
}

export async function updateBusiness(businessId, ownerId, input) {
  const data = businessSchema.partial().parse(input);
  const updates = [];
  const values = [businessId, ownerId];
  let paramIndex = 3;

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      updates.push(`${key} = $${paramIndex++}`);
      values.push(value);
    }
  }

  if (updates.length === 0) {
    return findBusinessById(businessId, ownerId);
  }

  updates.push(`updated_at = now()`);
  const { rows } = await query(
    `UPDATE businesses SET ${updates.join(', ')} WHERE id = $1 AND owner_id = $2
     RETURNING id, owner_id, name, category, city, region, country, currency, whatsapp, email, description, created_at, updated_at`,
    values
  );
  return rows[0] || null;
}
