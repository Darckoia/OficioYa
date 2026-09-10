import { ContactForm } from '@/components/forms/ContactForm';
import { Container } from '@/components/common/Container';
import { CTA } from '@/components/landing/CTA';
import { Features } from '@/components/landing/Features';
import { Hero } from '@/components/landing/Hero';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">Formularios interactivos</p>
              <h2 className="section-title">Convierte el interés en un lead real</h2>
              <p className="text-slate-600 dark:text-slate-300">Agregamos una prueba de contacto con validación para que la landing no sea solo visual, sino también demostrable.</p>
            </div>
            <ContactForm />
          </div>
        </Container>
      </section>
      <CTA />
    </>
  );
}
