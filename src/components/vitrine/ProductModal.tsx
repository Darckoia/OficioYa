import { Button } from '@/components/common/Button';
import { Product } from '@/data/vitrine-demo';

const currency = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0
});

type ProductModalProps = {
  product: Product | null;
  onClose: () => void;
};

export function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4">
      <div className="surface-card max-w-lg p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-5xl">{product.image}</div>
            <h3 className="mt-4 text-2xl font-semibold text-slate-950">{product.name}</h3>
          </div>
          <button type="button" onClick={onClose} className="rounded-full bg-slate-100 px-3 py-1 text-slate-500">
            ✕
          </button>
        </div>
        <p className="mt-4 text-slate-600">{product.description}</p>
        <p className="mt-4 text-sm leading-6 text-slate-600">{product.details}</p>
        <p className="mt-5 text-xl font-bold text-brand-700">{currency.format(product.price)}</p>
        <Button onClick={onClose} className="mt-6 w-full">
          Seguir explorando
        </Button>
      </div>
    </div>
  );
}
