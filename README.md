# OficioYa

Plataforma web para trabajadores independientes y pequeñas empresas en Chile.

## Qué incluye

- **Landing en español** con propuesta de valor enfocada en ventas.
- **Chat de ventas** con historial, respuestas rápidas y gestión básica de conversaciones.
- **Biblioteca de mensajes** reutilizables con búsqueda e inserción en un clic.
- **Creador de vitrinas** para productos/servicios con título, descripción, imagen, precio y CTA.
- **Flujo de autoenvío a WhatsApp Business** mediante una capa mock/integration-ready preparada para conectar la API oficial posteriormente.
- **Vista pública compartible** de vitrina usando query string `?store=<id>`.

## Desarrollo local

```bash
npm install
npm run dev
```

## Build y lint

```bash
npm run lint
npm run build
```

## Nota de integración WhatsApp

El envío a WhatsApp está abstraído en `src/services/whatsappService.ts` con una implementación mock segura. Para producción, reemplaza la clase mock por un gateway conectado a la API oficial de WhatsApp Business.
