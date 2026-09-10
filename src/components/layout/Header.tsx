'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { mainNavigation } from '@/config/navigation';
import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/Container';

export function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur transition dark:border-slate-800 dark:bg-slate-950/80">
      <Container className="flex items-center justify-between gap-4 py-4">
        <Link href="/" className="text-lg font-bold text-slate-950 dark:text-white">
          OficioYa
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {mainNavigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-lg transition hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-brand-500 dark:hover:text-brand-200"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          <Button href="/demo" className="hidden sm:inline-flex">
            Explorar plataforma
          </Button>
        </div>
      </Container>
    </header>
  );
}
