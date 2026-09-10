import { Container } from '@/components/common/Container';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white/70 py-8 transition dark:border-slate-800 dark:bg-slate-950/70">
      <Container className="flex flex-col gap-3 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 OficioYa. Plataforma demo para ventas y atención por WhatsApp.</p>
        <p>Creado para trabajadores independientes y pequeños negocios en Chile.</p>
      </Container>
    </footer>
  );
}
