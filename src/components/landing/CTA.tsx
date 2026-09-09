import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/Container';

export function CTA() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="surface-card overflow-hidden bg-brand-600 px-6 py-10 text-white sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-100">Listo para mostrar</p>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Explora la plataforma completa y comparte la experiencia demo.</h2>
              <p className="mt-3 max-w-2xl text-brand-50">
                Navega por las cuatro demos para ver cómo una venta puede avanzar desde el primer mensaje hasta el seguimiento final.
              </p>
            </div>
            <Button href="/demo" variant="secondary" className="self-start text-brand-700">
              Ir al centro de demos
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
