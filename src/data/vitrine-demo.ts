export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tag: string;
  details: string;
};

export const vitrineProducts: Product[] = [
  {
    id: 'cam-kit',
    name: 'Kit 2 cámaras HD',
    description: 'Incluye DVR, instalación básica y configuración remota.',
    price: 189990,
    image: '📹',
    tag: 'Más vendido',
    details: 'Ideal para almacenes y botillerías. Soporta visualización desde celular y grabación continua.'
  },
  {
    id: 'led-pack',
    name: 'Pack 6 focos LED',
    description: 'Ahorro energético para talleres, cocinas y vitrinas.',
    price: 42990,
    image: '💡',
    tag: 'Ahorro',
    details: 'Luz fría, instalación simple y stock inmediato en Santiago.'
  },
  {
    id: 'sign-board',
    name: 'Letrero acrílico iluminado',
    description: 'Diseño para atraer clientes desde la calle.',
    price: 124990,
    image: '🪧',
    tag: 'Nuevo',
    details: 'Incluye diseño base, fabricación y retiro en taller o despacho coordinado.'
  },
  {
    id: 'repair-hour',
    name: 'Hora técnico a domicilio',
    description: 'Servicio express para mantenciones eléctricas y reparaciones.',
    price: 25990,
    image: '🧰',
    tag: 'Express',
    details: 'Cobertura en Santiago urbano con confirmación por WhatsApp.'
  }
];
