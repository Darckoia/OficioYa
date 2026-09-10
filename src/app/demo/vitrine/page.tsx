'use client';

import { useMemo, useState } from 'react';
import { VitrineForm } from '@/components/forms/VitrineForm';
import { Badge } from '@/components/common/Badge';
import { Card } from '@/components/common/Card';
import { ProductGrid } from '@/components/vitrine/ProductGrid';
import { ProductModal } from '@/components/vitrine/ProductModal';
import { Product, vitrineProducts } from '@/data/vitrine-demo';
import { useModal } from '@/hooks/useModal';
import { useToast } from '@/hooks/useToast';

export default function VitrineDemoPage() {
  const { notifyInfo, notifySuccess } = useToast();
  const [cart, setCart] = useState<string[]>([]);
  const { item: selectedProduct, open, close } = useModal<Product>();

  const cartCount = useMemo(() => cart.length, [cart]);

  const handleAdd = (product: Product) => {
    setCart((current) => {
      if (current.includes(product.id)) {
        return current;
      }

      return [...current, product.id];
    });
    notifySuccess('Producto agregado', `${product.name} quedó en el carrito demo.`);
  };

  const handleRemove = (product: Product) => {
    setCart((current) => {
      const index = current.indexOf(product.id);

      if (index === -1) {
        return current;
      }

      return [...current.slice(0, index), ...current.slice(index + 1)];
    });
    notifyInfo('Producto removido', `${product.name} salió del carrito demo.`);
  };

  const isInCart = selectedProduct ? cart.includes(selectedProduct.id) : false;

  return (
    <div className="space-y-6">
      <Card className="flex flex-col gap-4 dark:text-slate-100 md:flex-row md:items-center md:justify-between">
        <div>
          <Badge tone="success">Catálogo compartible</Badge>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">Vitrina demo para enviar en segundos</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Ahora incluye modal con galería, preview de WhatsApp y un carrito simulado con feedback visual.</p>
        </div>
        <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-200">Carrito demo: {cartCount} producto(s)</div>
      </Card>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <ProductGrid products={vitrineProducts} onAdd={handleAdd} onDetail={open} />
        <VitrineForm />
      </div>
      <ProductModal product={selectedProduct} isInCart={isInCart} onClose={close} onAdd={handleAdd} onRemove={handleRemove} />
    </div>
  );
}
