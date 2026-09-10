'use client';

import { DefaultValues, FieldPath, FieldValues, useForm as useReactHookForm } from 'react-hook-form';
import { z } from 'zod';

export function useAppForm<TValues extends FieldValues>(schema: z.ZodType<TValues>, defaultValues: DefaultValues<TValues>) {
  const form = useReactHookForm<TValues>({
    defaultValues,
    mode: 'onBlur'
  });

  const handleValidatedSubmit = (onValid: (values: TValues) => void | Promise<void>) =>
    form.handleSubmit(async (values) => {
      form.clearErrors();
      const result = schema.safeParse(values);

      if (!result.success) {
        result.error.issues.forEach((issue) => {
          const path = issue.path.join('.') as FieldPath<TValues>;

          if (path) {
            form.setError(path, { type: 'manual', message: issue.message });
          }
        });

        return;
      }

      await onValid(result.data);
    });

  return {
    ...form,
    handleValidatedSubmit
  };
}
