import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Container } from '@/components/common/Container';
import { landingHero } from '@/data/landing';

export function Hero() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <span className="inline-flex rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
            {landingHero.eyebrow}
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
            {landingHero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600">{landingHero.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={landingHero.primaryCta.href}>{landingHero.primaryCta.label}</Button>
            <Button href={landingHero.secondaryCta.href} variant="secondary">
              {landingHero.secondaryCta.label}
            </Button>
          </div>
        </div>
        <Card className="bg-slate-950 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-200">Demo rápida</p>
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm text-brand-100">Cliente</p>
              <p className="mt-2">¿Me puedes mandar una cotización y las opciones más convenientes?</p>
            </div>
            <div className="rounded-2xl bg-brand-600/40 p-4">
              <p className="text-sm text-brand-100">OficioYa</p>
              <p className="mt-2">Claro. Te comparto la vitrina, una propuesta rápida y un mensaje de seguimiento para cerrar la venta hoy.</p>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}
