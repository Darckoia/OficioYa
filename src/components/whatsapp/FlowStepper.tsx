import { WhatsAppStep } from '@/data/whatsapp-flow';

type FlowStepperProps = {
  steps: WhatsAppStep[];
  currentStep: number;
  onStepChange: (index: number) => void;
};

export function FlowStepper({ steps, currentStep, onStepChange }: FlowStepperProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {steps.map((step, index) => (
        <button
          key={step.id}
          type="button"
          onClick={() => onStepChange(index)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            index === currentStep ? 'bg-brand-600 text-white' : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50'
          }`}
        >
          {index + 1}. {step.title}
        </button>
      ))}
    </div>
  );
}
