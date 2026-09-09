import Link from 'next/link';
import { demoNavigation } from '@/config/navigation';

export function Sidebar() {
  return (
    <aside className="surface-card hidden h-fit w-full max-w-xs p-4 lg:block">
      <p className="px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Demos</p>
      <div className="mt-4 space-y-2">
        {demoNavigation.map((item) => (
          <Link key={item.href} href={item.href} className="block rounded-2xl px-3 py-3 transition hover:bg-slate-50">
            <p className="font-semibold text-slate-900">{item.label}</p>
            <p className="mt-1 text-sm text-slate-500">{item.description}</p>
          </Link>
        ))}
      </div>
    </aside>
  );
}
