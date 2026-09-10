export type NavigationItem = {
  href: string;
  label: string;
  description?: string;
};

export const mainNavigation: NavigationItem[] = [
  { href: '/', label: 'Inicio' },
  { href: '/demo', label: 'Demos' },
  { href: '/demo/messages', label: 'Mensajes' },
  { href: '/demo/whatsapp', label: 'WhatsApp' }
];

export const demoNavigation: NavigationItem[] = [
  {
    href: '/demo/chat',
    label: 'Chat de ventas',
    description: 'Simula respuestas rápidas con plantillas.'
  },
  {
    href: '/demo/vitrine',
    label: 'Vitrina',
    description: 'Muestra productos y arma pedidos.'
  },
  {
    href: '/demo/messages',
    label: 'Biblioteca',
    description: 'Encuentra mensajes por objetivo comercial.'
  },
  {
    href: '/demo/whatsapp',
    label: 'Flujo WhatsApp',
    description: 'Guía para lanzar tu canal de ventas.'
  }
];
