# OficioYa

OficioYa es una plataforma demo de ventas para trabajadores independientes y pequeños negocios en Chile. Incluye una landing page y cuatro módulos interactivos para mostrar un flujo comercial completo centrado en WhatsApp.

## Módulos incluidos

- **Landing Page** con propuesta de valor, beneficios y CTA
- **Demo de Chat de Ventas** con plantillas y respuestas simuladas
- **Demo de Vitrina** con catálogo de productos y carrito demo
- **Biblioteca de Mensajes** con búsqueda y filtro por categoría
- **Flujo WhatsApp** con stepper de implementación

## Stack

- Next.js 14
- TypeScript
- Tailwind CSS

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
└── styles/
```

## Rutas demo

- `/`
- `/demo`
- `/demo/chat`
- `/demo/vitrine`
- `/demo/messages`
- `/demo/whatsapp`
