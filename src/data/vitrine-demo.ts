export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tag: string;
  details: string;
  gallery: string[];
  highlights: string[];
  whatsappPreview: string;
};

export const vitrineProducts: Product[] = [
  {
    id: 'cam-kit',
    name: 'Kit 2 cámaras HD',
    description: 'Incluye DVR, instalación básica y configuración remota.',
    price: 189990,
    image: '📹',
    tag: 'Más vendido',
    details: 'Ideal para almacenes y botillerías. Soporta visualización desde celular y grabación continua.',
    gallery: ['📹', '🏪', '📱'],
    highlights: ['Instalación básica incluida', 'Monitoreo desde el celular', 'Stock con despacho rápido'],
    whatsappPreview: 'Hola, me interesa el Kit 2 cámaras HD. ¿Me lo puedes dejar cotizado con instalación en Maipú?'
  },
  {
    id: 'led-pack',
    name: 'Pack 6 focos LED',
    description: 'Ahorro energético para talleres, cocinas y vitrinas.',
    price: 42990,
    image: '💡',
    tag: 'Ahorro',
    details: 'Luz fría, instalación simple y stock inmediato en Santiago.',
    gallery: ['💡', '🛠️', '🏬'],
    highlights: ['Ahorro energético', 'Ideal para vitrinas y talleres', 'Listo para instalación rápida'],
    whatsappPreview: 'Quiero el pack de 6 focos LED para mi local. ¿Tienen instalación o retiro hoy?'
  },
  {
    id: 'sign-board',
    name: 'Letrero acrílico iluminado',
    description: 'Diseño para atraer clientes desde la calle.',
    price: 124990,
    image: '🪧',
    tag: 'Nuevo',
    details: 'Incluye diseño base, fabricación y retiro en taller o despacho coordinado.',
    gallery: ['🪧', '✨', '🏙️'],
    highlights: ['Diseño base incluido', 'Fabricación a medida', 'Ideal para fachadas y vitrinas'],
    whatsappPreview: 'Estoy viendo el letrero acrílico iluminado. ¿Cuánto demora la fabricación y despacho?'
  },
  {
    id: 'repair-hour',
    name: 'Hora técnico a domicilio',
    description: 'Servicio express para mantenciones eléctricas y reparaciones.',
    price: 25990,
    image: '🧰',
    tag: 'Express',
    details: 'Cobertura en Santiago urbano con confirmación por WhatsApp.',
    gallery: ['🧰', '🏠', '⚡'],
    highlights: ['Atención express', 'Coordinación por WhatsApp', 'Cobertura urbana'],
    whatsappPreview: 'Necesito una hora técnico a domicilio para una reparación eléctrica. ¿Tienen agenda hoy?'
  }
];
