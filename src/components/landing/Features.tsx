import { Badge } from '@/components/common/Badge';
import { Card } from '@/components/common/Card';
import { Container } from '@/components/common/Container';
import { landingBenefits, landingFeatures } from '@/data/landing';

export function Features() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge>Herramientas clave</Badge>
            <h2 className="section-title mt-4">Todo lo necesario para convertir chats en ventas.</h2>
          </div>
          <p className="max-w-xl text-slate-600">
            Una base funcional para demostrar cómo una pyme puede vender mejor desde un solo flujo digital.
          </p>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {landingFeatures.map((feature) => (
            <Card key={feature.title}>
              <p className="text-sm font-semibold text-brand-600">{feature.metric}</p>
              <h3 className="mt-3 text-xl font-semibold text-slate-950">{feature.title}</h3>
              <p className="mt-3 text-slate-600">{feature.description}</p>
            </Card>
          ))}
        </div>
        <Card className="mt-8 bg-slate-950 text-white">
          <h3 className="text-2xl font-semibold">Beneficios pensados para negocios reales</h3>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {landingBenefits.map((benefit) => (
              <li key={benefit} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                {benefit}
              </li>
            ))}
          </ul>
        </Card>
      </Container>
    </section>
  );
}
