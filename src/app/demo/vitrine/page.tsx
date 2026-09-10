'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/common/Badge';
import { Card } from '@/components/common/Card';
import { ProductGrid } from '@/components/vitrine/ProductGrid';
import { ProductModal } from '@/components/vitrine/ProductModal';
import { Product, vitrineProducts } from '@/data/vitrine-demo';

export default function VitrineDemoPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<string[]>([]);

  const cartCount = useMemo(() => cart.length, [cart]);

  const handleAdd = (product: Product) => {
    setCart((current) => [...current, product.id]);
  };

  return (
    <div className="space-y-6">
      <Card className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Badge tone="success">Catálogo compartible</Badge>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Vitrina demo para enviar en segundos</h2>
          <p className="mt-2 text-slate-600">Productos y servicios con precios en CLP, foco comercial y detalle rápido.</p>
        </div>
        <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">Carrito demo: {cartCount} producto(s)</div>
      </Card>
      <ProductGrid products={vitrineProducts} onAdd={handleAdd} onDetail={setSelectedProduct} />
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
