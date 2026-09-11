import { query, transaction } from './db.js';

export async function listProducts(businessId) {
  const { rows } = await query(
    `SELECT id, name, description, price_clp, cost_clp, stock, sku, ean, image_url, ai_generated, ai_confirmed, created_at, updated_at
     FROM products WHERE business_id = $1 ORDER BY created_at DESC`,
    [businessId]
  );
  return rows;
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
