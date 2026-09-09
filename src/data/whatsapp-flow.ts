export type WhatsAppStep = {
  id: string;
  title: string;
  description: string;
  detail: string;
  icon: string;
};

export const whatsappSteps: WhatsAppStep[] = [
  {
    id: 'perfil',
    title: 'Define tu perfil comercial',
    description: 'Ajusta nombre, rubro y horario visible para tus clientes.',
    detail: 'Prepara una descripción breve, un logo simple y tus comunas de atención para generar confianza desde el primer mensaje.',
    icon: '🧾'
  },
  {
    id: 'catalogo',
    title: 'Ordena tu catálogo',
    description: 'Selecciona productos o servicios estrella con precio claro.',
    detail: 'Prioriza tus 3 a 5 productos más fáciles de vender y deja listas fotos, precios y tiempos de entrega.',
    icon: '🛍️'
  },
  {
    id: 'plantillas',
    title: 'Carga plantillas frecuentes',
    description: 'Prepara respuestas para bienvenida, cotización y seguimiento.',
    detail: 'Con mensajes guardados reduces tiempos de respuesta y mantienes un tono consistente en todo el proceso comercial.',
    icon: '💬'
  },
  {
    id: 'cobro',
    title: 'Conecta tu cierre de venta',
    description: 'Define cómo compartes links de pago, transferencia o retiro.',
    detail: 'Aclara medios de pago, anticipos y condiciones de entrega para cerrar ventas con menos fricción.',
    icon: '💳'
  },
  {
    id: 'seguimiento',
    title: 'Activa seguimiento',
    description: 'Agenda recordatorios para clientes que aún no compran.',
    detail: 'Un seguimiento amable a las 24 o 48 horas aumenta la conversión sin sonar invasivo.',
    icon: '📈'
  }
];
