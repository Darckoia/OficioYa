'use client';

import { useState } from 'react';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { FlowStepper } from '@/components/whatsapp/FlowStepper';
import { StepCard } from '@/components/whatsapp/StepCard';
import { whatsappSteps } from '@/data/whatsapp-flow';

export default function WhatsAppDemoPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((value) => (value + 1) % whatsappSteps.length);
  const prevStep = () => setCurrentStep((value) => (value - 1 + whatsappSteps.length) % whatsappSteps.length);

  return (
    <div className="space-y-6">
      <Card className="dark:text-slate-100">
        <Badge tone="success">Implementación guiada</Badge>
        <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">Flujo sugerido para vender por WhatsApp</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Recorre cinco pasos prácticos para lanzar un canal comercial ordenado y listo para convertir.</p>
      </Card>
      <FlowStepper steps={whatsappSteps} currentStep={currentStep} onStepChange={setCurrentStep} />
      <StepCard step={whatsappSteps[currentStep]} isActive />
      <div className="flex flex-wrap gap-3">
        <Button onClick={prevStep} variant="secondary">
          Paso anterior
        </Button>
        <Button onClick={nextStep}>Siguiente paso</Button>
      </div>
    </div>
  );
}
