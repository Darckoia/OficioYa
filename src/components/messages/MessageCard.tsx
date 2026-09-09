import { Badge } from '@/components/common/Badge';
import { Card } from '@/components/common/Card';
import { MessageTemplate } from '@/data/messages';

type MessageCardProps = {
  template: MessageTemplate;
};

export function MessageCard({ template }: MessageCardProps) {
  return (
    <Card className="h-full">
      <Badge tone="neutral">{template.category}</Badge>
      <h3 className="mt-4 text-xl font-semibold text-slate-950">{template.title}</h3>
      <p className="mt-3 text-sm font-medium text-brand-600">{template.preview}</p>
      <p className="mt-4 text-sm leading-6 text-slate-600">{template.content}</p>
    </Card>
  );
}
