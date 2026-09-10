import { MessageTemplate } from '@/data/messages';
import { MessageCard } from '@/components/messages/MessageCard';

type MessageListProps = {
  templates: MessageTemplate[];
};

export function MessageList({ templates }: MessageListProps) {
  if (!templates.length) {
    return (
      <div className="surface-card p-8 text-center text-slate-500">
        No encontramos plantillas con ese filtro. Prueba otra categoría o palabra clave.
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {templates.map((template) => (
        <MessageCard key={template.id} template={template} />
      ))}
    </div>
  );
}
