'use client';

import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { MessageTemplate } from '@/data/messages';
import { useToast } from '@/hooks/useToast';

type MessageCardProps = {
  template: MessageTemplate;
};

export function MessageCard({ template }: MessageCardProps) {
  const { notifySuccess, notifyError } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(template.content);
      notifySuccess('Mensaje copiado', `${template.title} quedó listo para pegar.`);
    } catch {
      notifyError('No pudimos copiar el mensaje', 'Prueba nuevamente o copia el texto manualmente.');
    }
  };

  return (
    <Card className="h-full dark:text-slate-100">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="neutral">{template.category}</Badge>
        <Badge>{template.tone}</Badge>
        <Badge tone="success">{template.channel}</Badge>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-slate-950 dark:text-white">{template.title}</h3>
      <p className="mt-3 text-sm font-medium text-brand-600 dark:text-brand-300">{template.preview}</p>
      <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{template.content}</p>
      <Button onClick={handleCopy} variant="ghost" className="mt-5">Copiar mensaje</Button>
    </Card>
  );
}
