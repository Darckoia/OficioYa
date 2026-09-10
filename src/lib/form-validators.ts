import { z } from 'zod';

const phoneSchema = z
  .string()
  .trim()
  .min(8, 'Ingresa un teléfono válido')
  .regex(/^[+]?[0-9\s-]+$/, 'Usa solo números, espacios, + o guiones');

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Cuéntanos tu nombre'),
  email: z.string().trim().email('Ingresa un email válido'),
  phone: phoneSchema
});

export const vitrineFormSchema = z.object({
  businessName: z.string().trim().min(2, 'Ingresa el nombre del negocio'),
  category: z.string().trim().min(2, 'Selecciona una categoría'),
  whatsapp: phoneSchema,
  goal: z.string().trim().min(10, 'Describe brevemente qué quieres vender')
});

export const advancedFiltersSchema = z.object({
  tone: z.string(),
  channel: z.string()
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type VitrineFormValues = z.infer<typeof vitrineFormSchema>;
export type AdvancedFiltersValues = z.infer<typeof advancedFiltersSchema>;
