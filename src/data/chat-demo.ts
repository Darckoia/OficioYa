export type ChatRole = 'business' | 'customer';

export type ChatMessageItem = {
  id: number;
  role: ChatRole;
  author: string;
  text: string;
  time: string;
};

export type ChatTemplate = {
  id: string;
  title: string;
  message: string;
};

export const chatStorageKey = 'oficioya-chat-history';

export const initialChatMessages: ChatMessageItem[] = [
  {
    id: 1,
    role: 'customer',
    author: 'Camila',
    text: 'Hola, ¿todavía tienen instalación de cámaras para mañana en Maipú?',
    time: '09:14'
  },
  {
    id: 2,
    role: 'business',
    author: 'OficioYa Demo',
    text: 'Sí, tenemos cupos. La visita técnica parte en $18.000 y el diagnóstico se descuenta si instalas con nosotros.',
    time: '09:15'
  },
  {
    id: 3,
    role: 'customer',
    author: 'Camila',
    text: 'Buenísimo. ¿Me puedes enviar los modelos que recomiendan para una botillería pequeña?',
    time: '09:16'
  }
];

export const chatTemplates: ChatTemplate[] = [
  {
    id: 'availability',
    title: 'Preguntar por disponibilidad',
    message: 'Hola, ¿tienen disponibilidad para instalar esta semana en Maipú?'
  },
  {
    id: 'quote',
    title: 'Solicitar una cotización rápida',
    message: 'Quiero una cotización estimada para una botillería pequeña con dos cámaras.'
  },
  {
    id: 'catalog',
    title: 'Pedir catálogo recomendado',
    message: '¿Me pueden compartir los kits y precios que recomiendan para mi local?'
  }
];

const sellerAutoReplyRules = [
  {
    keywords: ['cotización', 'precio', 'precios', 'valor'],
    reply:
      'Claro. Para una botillería pequeña solemos recomendar el kit de 2 cámaras HD y puedo enviarte una cotización con instalación incluida en el mismo día.'
  },
  {
    keywords: ['disponibilidad', 'mañana', 'semana', 'agenda'],
    reply:
      'Sí, tenemos espacios disponibles esta semana. Si me confirmas tu comuna y horario, te dejo una visita propuesta por WhatsApp altiro.'
  },
  {
    keywords: ['kit', 'catálogo', 'modelos', 'cámaras'],
    reply:
      'Te comparto los modelos más convenientes: kit 2 cámaras HD, DVR con acceso desde el celular y opción de instalación básica para partir rápido.'
  }
] as const;

export function formatChatTime(date = new Date()) {
  return new Intl.DateTimeFormat('es-CL', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date);
}

export function buildAutoReply(message: string) {
  const normalizedMessage = message.toLowerCase();
  const matchedRule = sellerAutoReplyRules.find((rule) => rule.keywords.some((keyword) => normalizedMessage.includes(keyword)));

  return (
    matchedRule?.reply ??
    'Gracias por escribir. Si me compartes más contexto de tu negocio, te recomiendo una opción concreta y te dejo lista la propuesta para seguir por WhatsApp.'
  );
}
