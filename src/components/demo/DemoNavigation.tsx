import Link from 'next/link';
import { demoNavigation } from '@/config/navigation';

export function DemoNavigation() {
  return (
    <div className="flex flex-wrap gap-3">
      {demoNavigation.map((item) => (
        <Link key={item.href} href={item.href} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50">
          {item.label}
        </Link>
      ))}
    </div>
  );
}
