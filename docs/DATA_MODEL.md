# Modelo de datos OficioYa

Entidades principales:

- User: cliente o profesional, identidad, correo, rol y estado.
- ProfessionalProfile: oficio, descripción, comuna/ciudad, verificación y tarifas.
- Category: catálogo de oficios.
- ServiceRequest: solicitud creada por un cliente.
- Quote: propuesta de un profesional para una solicitud.
- Conversation/Message: comunicación asociada a una solicitud.
- Review: valoración posterior al servicio.
- Notification: eventos de solicitudes, cotizaciones y mensajes.

## Estados

Solicitud: `open` → `quoted` → `accepted` → `in_progress` → `completed` / `cancelled`.

Cotización: `pending` → `accepted` / `rejected` / `withdrawn`.

La API actual usa almacenamiento en memoria para desarrollo. La persistencia PostgreSQL debe implementarse antes de producción.
