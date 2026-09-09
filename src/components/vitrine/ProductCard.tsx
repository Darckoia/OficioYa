import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Product } from '@/data/vitrine-demo';

const currency = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0
});

type ProductCardProps = {
  product: Product;
  onAdd: (product: Product) => void;
  onDetail: (product: Product) => void;
};

export function ProductCard({ product, onAdd, onDetail }: ProductCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-4">
        <div className="text-5xl">{product.image}</div>
        <Badge>{product.tag}</Badge>
      </div>
      <h3 className="mt-5 text-xl font-semibold text-slate-950">{product.name}</h3>
      <p className="mt-3 flex-1 text-slate-600">{product.description}</p>
      <p className="mt-4 text-lg font-bold text-brand-700">{currency.format(product.price)}</p>
      <div className="mt-6 flex gap-3">
        <Button onClick={() => onAdd(product)} className="flex-1">
          Agregar al carrito
        </Button>
        <Button onClick={() => onDetail(product)} variant="secondary" className="flex-1">
          Ver detalle
        </Button>
      </div>
    </Card>
  );
}
