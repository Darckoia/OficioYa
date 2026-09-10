import { ChatTemplate } from '@/data/chat-demo';
import { Badge } from '@/components/common/Badge';
import { Card } from '@/components/common/Card';

type TemplateSelectorProps = {
  templates: ChatTemplate[];
  onSelect: (message: string) => void;
};

export function TemplateSelector({ templates, onSelect }: TemplateSelectorProps) {
  return (
    <Card className="dark:text-slate-100">
      <div className="flex items-center justify-between gap-3">
        <div>
          <Badge tone="success">Plantillas</Badge>
          <h3 className="mt-3 text-lg font-semibold text-slate-950 dark:text-white">Consultas sugeridas</h3>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">1 clic para probar</p>
      </div>
      <div className="mt-5 space-y-3">
        {templates.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => onSelect(template.message)}
            className="w-full rounded-2xl border border-slate-200 p-4 text-left transition hover:border-brand-200 hover:bg-brand-50/60 dark:border-slate-700 dark:hover:border-brand-700 dark:hover:bg-slate-900"
          >
            <p className="font-semibold text-slate-900 dark:text-white">{template.title}</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{template.message}</p>
          </button>
        ))}
      </div>
    </Card>
  );
}
