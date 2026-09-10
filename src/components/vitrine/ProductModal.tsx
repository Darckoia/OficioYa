'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/common/Button';
import { Product } from '@/data/vitrine-demo';
import { scaleIn } from '@/styles/animations';

const currency = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0
});

type ProductModalProps = {
  product: Product | null;
  isInCart: boolean;
  onClose: () => void;
  onAdd: (product: Product) => void;
  onRemove: (product: Product) => void;
};

export function ProductModal({ product, isInCart, onClose, onAdd, onRemove }: ProductModalProps) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);
  }, [product?.id]);

  return (
    <AnimatePresence>
      {product ? (
        <motion.div key={product.id} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div variants={scaleIn} initial="hidden" animate="visible" exit="hidden" className="surface-card max-h-[90vh] w-full max-w-3xl overflow-y-auto p-6 dark:text-slate-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">Detalle interactivo</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">{product.name}</h3>
              </div>
              <button type="button" onClick={onClose} className="rounded-full bg-slate-100 px-3 py-1 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                ✕
              </button>
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="flex min-h-[220px] items-center justify-center rounded-3xl bg-slate-100 text-7xl dark:bg-slate-900">{product.gallery[activeImage]}</div>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {product.gallery.map((image, index) => (
                    <button
                      key={`${product.id}-${image}`}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      className={`rounded-2xl border p-3 text-3xl transition ${
                        activeImage === index
                          ? 'border-brand-500 bg-brand-50 dark:border-brand-400 dark:bg-brand-950/40'
                          : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900'
                      }`}
                    >
                      {image}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-slate-600 dark:text-slate-300">{product.description}</p>
                <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{product.details}</p>
                <p className="mt-5 text-xl font-bold text-brand-700 dark:text-brand-300">{currency.format(product.price)}</p>
                <ul className="mt-5 space-y-2">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                      {highlight}
                    </li>
                  ))}
                </ul>
                <details className="mt-5 rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
                  <summary className="cursor-pointer font-semibold text-slate-900 dark:text-white">Preview de WhatsApp compartido</summary>
                  <div className="mt-4 rounded-2xl bg-emerald-500 px-4 py-3 text-sm text-white">
                    {product.whatsappPreview}
                  </div>
                </details>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  {isInCart ? (
                    <Button onClick={() => onRemove(product)} variant="secondary" className="flex-1">
                      Quitar del carrito
                    </Button>
                  ) : (
                    <Button onClick={() => onAdd(product)} className="flex-1">
                      Agregar al carrito
                    </Button>
                  )}
                  <Button onClick={onClose} variant="ghost" className="flex-1">
                    Seguir explorando
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
