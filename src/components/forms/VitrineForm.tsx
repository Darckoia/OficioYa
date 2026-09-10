'use client';

import { Button } from '@/components/common/Button';
import { useAppForm } from '@/hooks/useForm';
import { useToast } from '@/hooks/useToast';
import { VitrineFormValues, vitrineFormSchema } from '@/lib/form-validators';

export function VitrineForm() {
  const { notifySuccess } = useToast();
  const { register, reset, formState: { errors, isSubmitting }, handleValidatedSubmit } = useAppForm<VitrineFormValues>(vitrineFormSchema, {
    businessName: '',
    category: 'Servicios para hogar',
    whatsapp: '',
    goal: ''
  });

  return (
    <form
      onSubmit={handleValidatedSubmit(async (values) => {
        notifySuccess('Vitrina creada', `Preparamos una vitrina demo para ${values.businessName}.`);
        reset({ businessName: '', category: values.category, whatsapp: '', goal: '' });
      })}
      className="surface-card space-y-4 p-6"
      noValidate
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">Crear mi vitrina</p>
        <h3 className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">Activa un catálogo demo con validación</h3>
      </div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
        Negocio
        <input
          {...register('businessName')}
          className="mt-2 min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          placeholder="Ej: Ferretería Don Pedro"
        />
        {errors.businessName ? <span className="mt-2 block text-xs text-rose-600">{errors.businessName.message}</span> : null}
      </label>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
        Rubro
        <select
          {...register('category')}
          className="mt-2 min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        >
          <option>Servicios para hogar</option>
          <option>Seguridad y cámaras</option>
          <option>Iluminación</option>
          <option>Diseño y letreros</option>
        </select>
        {errors.category ? <span className="mt-2 block text-xs text-rose-600">{errors.category.message}</span> : null}
      </label>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
        WhatsApp de ventas
        <input
          {...register('whatsapp')}
          className="mt-2 min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          placeholder="+56 9 9876 5432"
        />
        {errors.whatsapp ? <span className="mt-2 block text-xs text-rose-600">{errors.whatsapp.message}</span> : null}
      </label>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
        Objetivo comercial
        <textarea
          {...register('goal')}
          rows={4}
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          placeholder="Quiero mostrar packs con instalación incluida y captar pedidos rápidos."
        />
        {errors.goal ? <span className="mt-2 block text-xs text-rose-600">{errors.goal.message}</span> : null}
      </label>
      <Button type="submit" className="w-full">{isSubmitting ? 'Validando...' : 'Crear vitrina demo'}</Button>
    </form>
  );
}
