export type MessageCategory = 'Bienvenida' | 'Descuento' | 'Seguimiento';

export type MessageTemplate = {
  id: string;
  title: string;
  category: MessageCategory;
  preview: string;
  content: string;
};

export const messageCategories: MessageCategory[] = ['Bienvenida', 'Descuento', 'Seguimiento'];

export const messageTemplates: MessageTemplate[] = [
  {
    id: 'welcome-1',
    title: 'Respuesta inicial con horario',
    category: 'Bienvenida',
    preview: 'Gracias por escribir a OficioYa. Te respondo hoy mismo...',
    content: '¡Hola! Gracias por escribir a OficioYa. Hoy te puedo responder entre 09:00 y 19:00. Cuéntame qué necesitas y te envío una opción recomendada.'
  },
  {
    id: 'discount-1',
    title: 'Oferta por pago inmediato',
    category: 'Descuento',
    preview: 'Si confirmas hoy, te puedo mantener el precio...',
    content: 'Si confirmas hoy, te mantengo este precio y además dejamos agendada la visita sin costo adicional dentro de Santiago urbano.'
  },
  {
    id: 'follow-1',
    title: 'Seguimiento post cotización',
    category: 'Seguimiento',
    preview: 'Solo paso a dejarte un recordatorio de la propuesta...',
    content: 'Hola, solo paso a dejarte un recordatorio de la propuesta que revisamos. Si quieres, te ayudo a ajustar el presupuesto para que se acomode mejor a tu negocio.'
  },
  {
    id: 'welcome-2',
    title: 'Mensaje para nuevos contactos',
    category: 'Bienvenida',
    preview: 'Qué bueno tenerte por acá. Trabajo con soluciones rápidas...',
    content: '¡Qué bueno tenerte por acá! Trabajo con soluciones rápidas para pequeños negocios y oficios. Si me compartes una foto o referencia, te oriento enseguida.'
  },
  {
    id: 'discount-2',
    title: 'Combo por volumen',
    category: 'Descuento',
    preview: 'Por llevar dos servicios juntos puedo aplicar...',
    content: 'Por llevar dos servicios juntos puedo aplicar un precio paquete y dejar todo instalado en una sola visita. ¿Quieres que te lo deje armado?'
  }
];
