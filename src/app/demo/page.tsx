import { DemoCard } from '@/components/demo/DemoCard';
import { demoNavigation } from '@/config/navigation';

export default function DemoIndexPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {demoNavigation.map((item, index) => (
        <DemoCard
          key={item.href}
          href={item.href}
          title={item.label}
          description={item.description ?? ''}
          badge={`Módulo ${index + 1}`}
        />
      ))}
    </div>
  );
}
