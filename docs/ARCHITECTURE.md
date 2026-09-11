# Arquitectura OficioYa

## Capas
- `apps/web`: interfaz React/Vite para clientes y profesionales.
- `apps/api`: API HTTP y reglas de negocio.
- `packages/*`: componentes y contratos compartidos (siguiente etapa).
- Persistencia: PostgreSQL en producción.

## Dominio MVP
User → ProfessionalProfile → ServiceCategory → ServiceRequest → Quote → Conversation → Review.

## Flujo principal
1. Cliente busca un oficio.
2. API filtra profesionales por categoría y ubicación.
3. Cliente abre perfil y solicita servicio.
4. Profesional acepta y envía cotización.
5. Ambos conversan y coordinan.
6. Servicio se completa y cliente deja valoración.

## Siguientes módulos técnicos
Autenticación, PostgreSQL/ORM, geolocalización, chat en tiempo real, notificaciones, moderación, administración y observabilidad.
