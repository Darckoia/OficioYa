import Link from 'next/link';
import { mainNavigation } from '@/config/navigation';
import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/Container';

export function Header() {
  return (
    <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur">
      <Container className="flex items-center justify-between gap-4 py-4">
        <Link href="/" className="text-lg font-bold text-slate-950">
          OficioYa
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {mainNavigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-600 transition hover:text-slate-950">
              {item.label}
            </Link>
          ))}
        </nav>
        <Button href="/demo" className="hidden sm:inline-flex">
          Explorar plataforma
        </Button>
      </Container>
    </header>
  );
}
