import { Card } from '@/components/common/Card';
import { WhatsAppStep } from '@/data/whatsapp-flow';

type StepCardProps = {
  step: WhatsAppStep;
  isActive: boolean;
};

export function StepCard({ step, isActive }: StepCardProps) {
  return (
    <Card className={isActive ? 'border-brand-200 ring-2 ring-brand-100' : ''}>
      <div className="text-4xl">{step.icon}</div>
      <h3 className="mt-4 text-xl font-semibold text-slate-950">{step.title}</h3>
      <p className="mt-3 text-slate-600">{step.description}</p>
      <p className="mt-4 text-sm leading-6 text-slate-500">{step.detail}</p>
    </Card>
  );
}
