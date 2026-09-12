import { query, transaction } from './db.js';

export async function listProducts(businessId) {
  const { rows } = await query(
    `SELECT id, name, description, price_clp, cost_clp, stock, sku, ean, image_url, ai_generated, ai_confirmed, created_at, updated_at
     FROM products WHERE business_id = $1 ORDER BY created_at DESC`,
    [businessId]
  );
  return rows;
}

export async function getProductById(businessId, productId) {
  const { rows } = await query(
    `SELECT id, name, description, price_clp, cost_clp, stock, sku, ean, image_url, ai_generated, ai_confirmed, created_at, updated_at
     FROM products WHERE id = $1 AND business_id = $2`,
    [productId, businessId]
  );
  return rows[0] || null;
}

export async function createProduct(businessId, input) {
  const { rows } = await query(
    `INSERT INTO products
      (business_id, name, description, price_clp, cost_clp, stock, sku, ean, image_url, ai_generated, ai_confirmed)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
     RETURNING *`,
    [
      businessId,
      input.name,
      input.description ?? null,
      input.priceClp ?? null,
      input.costClp ?? null,
      input.stock ?? 0,
      input.sku ?? null,
      input.ean ?? null,
      input.imageUrl ?? null,
      Boolean(input.aiGenerated),
      Boolean(input.aiConfirmed),
    ]
  );
  return rows[0];
}

export async function updateProduct(businessId, productId, input) {
  const updates = [];
  const values = [productId, businessId];
  let paramIndex = 3;

  const allowedFields = ['name', 'description', 'priceClp', 'costClp', 'stock', 'sku', 'ean', 'imageUrl'];
  const columnMap = {
    priceClp: 'price_clp',
    costClp: 'cost_clp',
    imageUrl: 'image_url',
  };

  for (const field of allowedFields) {
    if (input[field] !== undefined) {
      const column = columnMap[field] || field;
      updates.push(`${column} = $${paramIndex++}`);
      values.push(input[field]);
    }
  }

  if (input.aiGenerated !== undefined) {
    updates.push(`ai_generated = $${paramIndex++}`);
    values.push(Boolean(input.aiGenerated));
  }
  if (input.aiConfirmed !== undefined) {
    updates.push(`ai_confirmed = $${paramIndex++}`);
    values.push(Boolean(input.aiConfirmed));
  }

  if (updates.length === 0) {
    return getProductById(businessId, productId);
  }

  const { rows } = await query(
    `UPDATE products SET ${updates.join(', ')}, updated_at = now()
     WHERE id = $1 AND business_id = $2
     RETURNING *`,
    values
  );
  return rows[0] || null;
}

export async function adjustStock(businessId, productId, delta) {
  return transaction(async (client) => {
    const { rows } = await client.query(
      `UPDATE products SET stock = stock + $1, updated_at = now()
       WHERE id = $2 AND business_id = $3 AND stock + $1 >= 0 RETURNING *`,
      [delta, productId, businessId]
    );
    if (!rows[0]) throw new Error('Producto inexistente o stock insuficiente');
    return rows[0];
  });
}
