'use client';

import { Button } from '@/components/common/Button';
import { useAppForm } from '@/hooks/useForm';
import { useToast } from '@/hooks/useToast';
import { ContactFormValues, contactFormSchema } from '@/lib/form-validators';

export function ContactForm() {
  const { notifySuccess, notifyError } = useToast();
  const { register, reset, formState: { errors, isSubmitting }, handleValidatedSubmit } = useAppForm<ContactFormValues>(contactFormSchema, {
    name: '',
    email: '',
    phone: ''
  });

  return (
    <form
      onSubmit={handleValidatedSubmit(async (values) => {
        notifySuccess('Formulario enviado', `Gracias ${values.name}, te contactaremos pronto.`);
        reset();
      })}
      className="surface-card space-y-4 p-6"
      noValidate
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">Contacto</p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Prueba la captación de leads</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Deja tus datos y simula el flujo de registro de un nuevo cliente.</p>
      </div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
        Nombre
        <input
          {...register('name')}
          className="mt-2 min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          placeholder="Ej: Camila Pérez"
        />
        {errors.name ? <span className="mt-2 block text-xs text-rose-600">{errors.name.message}</span> : null}
      </label>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
        Email
        <input
          {...register('email')}
          type="email"
          className="mt-2 min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          placeholder="contacto@negocio.cl"
        />
        {errors.email ? <span className="mt-2 block text-xs text-rose-600">{errors.email.message}</span> : null}
      </label>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
        Teléfono
        <input
          {...register('phone')}
          className="mt-2 min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          placeholder="+56 9 1234 5678"
        />
        {errors.phone ? <span className="mt-2 block text-xs text-rose-600">{errors.phone.message}</span> : null}
      </label>
      <div className="flex flex-wrap gap-3">
        <Button type="submit" className="min-w-[180px]">
          {isSubmitting ? 'Enviando...' : 'Solicitar demo'}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            reset();
            notifyError('Formulario limpiado', 'Puedes volver a completar los datos para otra prueba.');
          }}
        >
          Limpiar
        </Button>
      </div>
    </form>
  );
}
