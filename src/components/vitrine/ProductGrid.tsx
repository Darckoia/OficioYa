import { Product } from '@/data/vitrine-demo';
import { ProductCard } from '@/components/vitrine/ProductCard';

type ProductGridProps = {
  products: Product[];
  onAdd: (product: Product) => void;
  onDetail: (product: Product) => void;
};

export function ProductGrid({ products, onAdd, onDetail }: ProductGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={onAdd} onDetail={onDetail} />
      ))}
    </div>
  );
}
