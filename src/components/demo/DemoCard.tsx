import Link from 'next/link';
import { Badge } from '@/components/common/Badge';
import { Card } from '@/components/common/Card';

type DemoCardProps = {
  href: string;
  title: string;
  description: string;
  badge: string;
};

export function DemoCard({ href, title, description, badge }: DemoCardProps) {
  return (
    <Card className="flex h-full flex-col justify-between">
      <div>
        <Badge>{badge}</Badge>
        <h3 className="mt-4 text-xl font-semibold text-slate-950">{title}</h3>
        <p className="mt-3 text-slate-600">{description}</p>
      </div>
      <Link href={href} className="mt-6 text-sm font-semibold text-brand-600 transition hover:text-brand-700">
        Abrir demo →
      </Link>
    </Card>
  );
}
