export type ChatRole = 'customer' | 'business' | 'system'

export interface ConversationMessage {
  id: string
  role: ChatRole
  text: string
  time: string
}

export interface DemoConversation {
  id: string
  customer: string
  phone: string
  channel: string
  stage: string
  messages: ConversationMessage[]
  quickReplies: string[]
}

export const metrics = [
  { value: '+32%', label: 'más respuestas en campañas de prueba' },
  { value: '1 vista', label: 'para chat, vitrina y mensajes de venta' },
  { value: 'Chile-ready', label: 'copys y flujos diseñados en español' },
]

export const benefits = [
  {
    icon: '💬',
    title: 'Chat comercial guiado',
    description: 'Centraliza consultas, responde más rápido y mantiene seguimiento sin perder contexto.',
  },
  {
    icon: '🛍️',
    title: 'Vitrina que vende',
    description: 'Convierte servicios y productos en tarjetas claras con precio, CTA y foco móvil.',
  },
  {
    icon: '📚',
    title: 'Mensajes listos para usar',
    description: 'Activa respuestas para cotizar, cerrar ventas, cobrar y reagendar en segundos.',
  },
]

export const initialConversations: DemoConversation[] = [
  {
    id: 'taller-norte',
    customer: 'Carla · Taller Norte',
    phone: '+56 9 8844 2201',
    channel: 'WhatsApp Business',
    stage: 'Cotización enviada',
    messages: [
      {
        id: 'm1',
        role: 'customer',
        text: 'Hola, necesito una cotización para cambiar dos cerraduras hoy en Providencia.',
        time: '09:10',
      },
      {
        id: 'm2',
        role: 'business',
        text: '¡Hola Carla! Sí, hoy tenemos cupo. Puedo enviarte el valor estimado y agendar entre 14:00 y 16:00.',
        time: '09:12',
      },
      {
        id: 'm3',
        role: 'customer',
        text: 'Perfecto, ¿incluye instalación y garantía?',
        time: '09:13',
      },
    ],
    quickReplies: [
      'Sí, incluye instalación y garantía por 90 días. ¿Te reservo el horario?',
      'Te envío la cotización ahora mismo con el detalle por WhatsApp.',
      'Si prefieres, puedo ofrecerte una opción express para hoy antes de las 16:00.',
    ],
  },
  {
    id: 'pasteleria-sol',
    customer: 'Tomás · Pastelería Sol',
    phone: '+56 9 7622 1180',
    channel: 'Instagram + WhatsApp',
    stage: 'Seguimiento pendiente',
    messages: [
      {
        id: 'm4',
        role: 'customer',
        text: 'Hola, quiero 30 cajas de brownies para una oficina el viernes.',
        time: '11:05',
      },
      {
        id: 'm5',
        role: 'business',
        text: '¡Qué buena idea! Tenemos formato corporativo con despacho en Santiago. ¿Quieres versión clásica o surtida?',
        time: '11:08',
      },
    ],
    quickReplies: [
      'Puedo dejarte una propuesta cerrada con despacho incluido para el viernes.',
      'Tenemos versión clásica y surtida. Si me confirmas, te comparto stock y valor hoy.',
      'También puedo enviarte una vitrina con fotos y tamaños para decidir más rápido.',
    ],
  },
  {
    id: 'lead-nuevo',
    customer: 'Lead web nuevo',
    phone: 'Pendiente de confirmar',
    channel: 'Formulario de vitrina',
    stage: 'Nuevo contacto',
    messages: [],
    quickReplies: [
      '¡Hola! Gracias por escribir a través de nuestra vitrina. ¿Qué servicio necesitas cotizar?',
      'Te contacto desde OficioYa para ayudarte con tu solicitud. ¿Prefieres atención hoy o mañana?',
      'Si quieres, puedo enviarte opciones con precio estimado y tiempos disponibles.',
    ],
  },
]

export const storefrontItems = [
  {
    category: 'Servicio destacado',
    title: 'Instalación express en domicilio',
    description: 'Atención el mismo día en Santiago, con confirmación por chat y seguimiento del técnico.',
    price: 'Desde $29.990',
    cta: 'Solicitar por chat',
  },
  {
    category: 'Pack pyme',
    title: 'Vitrina para catálogo mensual',
    description: 'Presenta hasta 12 productos o servicios con descripción corta, precio y CTA directo.',
    price: '$39.990 / mes',
    cta: 'Ver cómo venderlo',
  },
  {
    category: 'Oferta limitada',
    title: 'Campaña de reactivación de clientes',
    description: 'Mensajes listos para seguimiento, recordatorio y recuperación de ventas en pausa.',
    price: 'Beta incluida',
    cta: 'Activar campaña',
  },
]

export const messageTemplates = [
  {
    category: 'Cotización',
    title: 'Respuesta inicial con valor',
    body: '¡Hola! Gracias por escribir a OficioYa. Según lo que nos comentas, el servicio parte desde $29.990 e incluye instalación. Si te parece, te reservo horario y te envío el detalle ahora mismo.',
  },
  {
    category: 'Seguimiento',
    title: 'Recordatorio amable',
    body: 'Hola, te escribo para retomar tu solicitud 😊. Aún tenemos disponibilidad y puedo dejar tu atención confirmada hoy mismo si te acomoda.',
  },
  {
    category: 'Cobro',
    title: 'Confirmación de pago',
    body: '¡Gracias por tu confirmación! Apenas recibamos el pago te compartimos comprobante, horario final y seguimiento por WhatsApp Business.',
  },
  {
    category: 'Agenda',
    title: 'Cierre con horario',
    body: 'Perfecto, puedo agendarte entre 14:00 y 16:00. Si me confirmas dirección y teléfono, dejamos la visita cerrada de inmediato.',
  },
  {
    category: 'Reactivación',
    title: 'Volver a abrir una venta',
    body: 'Hola, hace unos días conversamos sobre tu solicitud. Si todavía te interesa, tengo una opción recomendada y puedo enviártela con precio actualizado.',
  },
]

export const workflowSteps = [
  {
    step: '01',
    title: 'Detectar intención',
    description: 'La beta selecciona el mensaje del chat o biblioteca para disparar el flujo comercial.',
  },
  {
    step: '02',
    title: 'Preparar payload',
    description: 'El servicio mock centraliza cliente, teléfono, mensaje y origen para la futura API oficial.',
  },
  {
    step: '03',
    title: 'Confirmar envío',
    description: 'El frontend recibe un estado demo útil para mostrar seguimiento y trazabilidad al negocio.',
  },
]
