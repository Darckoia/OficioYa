# OficioYa

OficioYa es una plataforma demo de ventas para trabajadores independientes y pequeños negocios en Chile. Incluye una landing page y cuatro módulos interactivos para mostrar un flujo comercial completo centrado en WhatsApp.

## Módulos incluidos

- **Landing Page** con propuesta de valor, formulario de contacto y CTA
- **Demo de Chat de Ventas** con persistencia local, plantillas y respuestas automáticas
- **Demo de Vitrina** con catálogo de productos, carrito demo y modal interactivo
- **Biblioteca de Mensajes** con búsqueda, filtros avanzados y copiado rápido
- **Flujo WhatsApp** con stepper de implementación

## Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form + Zod
- Sonner
- next-themes
- Vitest + Testing Library

## Cómo ejecutar

```bash
npm install
npm run dev
```

Luego abre [http://localhost:3000](http://localhost:3000).

## Scripts disponibles

```bash
npm run dev
npm run build
npm run start
npm run typecheck
npm run test
npm run test:coverage
```

## Estructura principal

```text
src/
├── app/
│   ├── page.tsx
│   └── demo/
├── components/
├── config/
├── data/
├── hooks/
├── lib/
├── providers/
└── styles/
```

## Rutas demo

- `/`
- `/demo`
- `/demo/chat`
- `/demo/vitrine`
- `/demo/messages`
- `/demo/whatsapp`
