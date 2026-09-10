import { ReactNode } from 'react';
import { Container } from '@/components/common/Container';
import { DemoNavigation } from '@/components/demo/DemoNavigation';
import { Sidebar } from '@/components/layout/Sidebar';

export default function DemoLayout({ children }: { children: ReactNode }) {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">Centro de demos</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">Explora los módulos principales de OficioYa</h1>
            <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">
              Cada vista muestra un caso de uso clave para vender mejor por WhatsApp: conversar, exhibir productos, reutilizar mensajes y ordenar el seguimiento.
            </p>
          </div>
          <DemoNavigation />
          <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
            <Sidebar />
            <div>{children}</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
