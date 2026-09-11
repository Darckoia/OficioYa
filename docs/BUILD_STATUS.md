# OficioYa — estado de construcción

## Objetivo de V1
Plataforma móvil para pequeños empresarios y emprendedores de Chile: negocio, catálogo, inventario, IA para productos, mensajes, presupuestos, clientes, pedidos y vitrina/página pública.

## Entregado en este bloque
- Adaptador PostgreSQL (`apps/api/src/db.js`) con pool, consultas y transacciones.
- Dependencia `pg` en la API.
- Servicio persistente de productos y ajustes de stock (`apps/api/src/product-service.js`).
- Prueba privada de amistades de 48 horas mediante `POCHOKLITO` (`apps/api/src/trial.js`).
- El código se compara mediante SHA-256 y no se almacena en texto plano.

## Reglas del acceso de amistades
- Solo finalidad de prueba.
- Ventana de 48 horas desde activación.
- Estado persistente: active, expired o revoked.
- La expiración se comprueba al consultar el estado.
- No representa un plan comercial ni una suscripción.

## Siguiente bloque técnico
1. Conectar autenticación y negocios a PostgreSQL.
2. Exponer CRUD protegido de productos/inventario.
3. Persistir clientes, presupuestos y pedidos.
4. Integrar el router de IA con análisis multimodal y fallback.
5. Conectar vitrina y página pública a datos persistentes.
6. Completar pagos y activación comercial.

## Criterio de lanzamiento
No marcar una función como terminada hasta disponer de prueba automatizada o verificación funcional equivalente en CI.
