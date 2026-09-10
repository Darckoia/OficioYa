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
    id: 'quote',
    title: 'Enviar cotización rápida',
    message: 'Te comparto una cotización estimada y, si te acomoda, agendamos instalación para mañana entre 10:00 y 13:00.'
  },
  {
    id: 'catalog',
    title: 'Compartir catálogo',
    message: 'Aquí va la vitrina con los modelos recomendados y sus precios. Si eliges uno hoy, te reservo stock altiro.'
  },
  {
    id: 'follow-up',
    title: 'Seguimiento amable',
    message: 'Quedo atento por si quieres que te ayude a comparar opciones. También puedo sugerirte el kit más conveniente según tu local.'
  }
];
