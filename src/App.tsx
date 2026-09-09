import { useMemo, useState } from 'react'
import './App.css'
import {
  benefits,
  initialConversations,
  messageTemplates,
  metrics,
  storefrontItems,
  workflowSteps,
} from './data/demoContent'
import { whatsappGateway } from './services/whatsappService'

function App() {
  const [conversations, setConversations] = useState(initialConversations)
  const [selectedConversationId, setSelectedConversationId] = useState(
    initialConversations[0]?.id ?? '',
  )
  const [draft, setDraft] = useState(initialConversations[0]?.quickReplies[0] ?? '')
  const [search, setSearch] = useState('')
  const [copyFeedback, setCopyFeedback] = useState('')
  const [sendState, setSendState] = useState('Listo para enviar un demo por WhatsApp Business.')

  const selectedConversation =
    conversations.find((conversation) => conversation.id === selectedConversationId) ??
    conversations[0]

  const filteredTemplates = useMemo(() => {
    const term = search.trim().toLowerCase()

    if (!term) {
      return messageTemplates
    }

    return messageTemplates.filter((template) =>
      [template.category, template.title, template.body].some((field) =>
        field.toLowerCase().includes(term),
      ),
    )
  }, [search])

  const handleSelectConversation = (conversationId: string) => {
    const nextConversation = conversations.find((conversation) => conversation.id === conversationId)

    setSelectedConversationId(conversationId)
    setDraft(nextConversation?.quickReplies[0] ?? '')
    setSendState('Selecciona una sugerencia o una plantilla para activar el flujo demo.')
  }

  const handleCopyTemplate = async (body: string) => {
    if (!navigator.clipboard) {
      setCopyFeedback('Tu navegador no permite copiar automáticamente en este demo.')
      return
    }

    try {
      await navigator.clipboard.writeText(body)
      setCopyFeedback('Plantilla copiada para reutilizarla en cualquier canal.')
    } catch {
      setCopyFeedback('No se pudo copiar automáticamente. Puedes seleccionar el texto manualmente.')
    }
  }

  const handleSendDemo = async () => {
    if (!selectedConversation || !draft.trim()) {
      setSendState('Agrega un mensaje para simular el envío por WhatsApp Business.')
      return
    }

    const result = await whatsappGateway.send({
      customerName: selectedConversation.customer,
      phone: selectedConversation.phone,
      message: draft.trim(),
      source: 'beta-demo',
    })

    if (!result.queued) {
      setSendState('El demo no pudo preparar el envío. Intenta nuevamente.')
      return
    }

    setConversations((currentConversations) =>
      currentConversations.map((conversation) =>
        conversation.id === selectedConversation.id
          ? {
              ...conversation,
              stage: 'Seguimiento activo',
              messages: [
                ...conversation.messages,
                {
                  id: `sent-${conversation.messages.length + 1}`,
                  role: 'business',
                  text: draft.trim(),
                  time: result.previewTime,
                },
                {
                  id: `system-${conversation.messages.length + 2}`,
                  role: 'system',
                  text: `Demo preparado para envío oficial a ${result.channelLabel}.`,
                  time: result.previewTime,
                },
              ],
            }
          : conversation,
      ),
    )
    setSendState(result.summary)
    setDraft('')
  }

  return (
    <main className="page-shell">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Beta profesional para ventas en Chile</span>
          <h1>Convierte conversaciones en ventas con una demo que sí parece producto real.</h1>
          <p className="hero-description">
            OficioYa reúne chat comercial, vitrina digital, biblioteca de mensajes y un flujo listo
            para integrarse con WhatsApp Business, todo en una experiencia rápida y profesional.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#chat-demo">
              Ver demo de ventas
            </a>
            <a className="secondary-action" href="#biblioteca">
              Explorar mensajes
            </a>
          </div>
          <div className="metric-grid">
            {metrics.map((metric) => (
              <article key={metric.label} className="metric-card">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-panel-header">
            <span className="status-pill">Demo activo</span>
            <span>OficioYa Beta</span>
          </div>
          <div className="hero-highlight">
            <div>
              <p>Negocio destacado</p>
              <h2>Taller Norte</h2>
            </div>
            <span>Respuesta en 3 min</span>
          </div>
          <ul className="benefit-list">
            {benefits.map((benefit) => (
              <li key={benefit.title}>
                <strong>{benefit.title}</strong>
                <span>{benefit.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <span className="eyebrow">Por qué funciona</span>
          <h2>Una beta liviana para mostrar valor comercial desde el primer minuto.</h2>
        </div>
        <div className="benefit-grid">
          {benefits.map((benefit) => (
            <article key={benefit.title} className="benefit-card">
              <span className="benefit-icon">{benefit.icon}</span>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="chat-demo" className="section-block">
        <div className="section-heading">
          <span className="eyebrow">Chat de ventas demo</span>
          <h2>Gestiona conversaciones con contexto, respuestas rápidas y seguimiento inmediato.</h2>
        </div>
        <div className="chat-layout">
          <aside className="conversation-list">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                type="button"
                className={`conversation-card ${
                  conversation.id === selectedConversation?.id ? 'selected' : ''
                }`}
                onClick={() => handleSelectConversation(conversation.id)}
              >
                <div>
                  <strong>{conversation.customer}</strong>
                  <span>{conversation.channel}</span>
                </div>
                <small>{conversation.stage}</small>
              </button>
            ))}
          </aside>

          <div className="chat-panel">
            <div className="chat-panel-header">
              <div>
                <h3>{selectedConversation?.customer ?? 'Sin conversación activa'}</h3>
                <p>{selectedConversation?.phone ?? 'Selecciona un lead para comenzar'}</p>
              </div>
              <span className="status-pill subtle">{selectedConversation?.stage ?? 'En espera'}</span>
            </div>

            <div className="message-stream">
              {selectedConversation?.messages.length ? (
                selectedConversation.messages.map((message) => (
                  <article key={message.id} className={`message-bubble ${message.role}`}>
                    <p>{message.text}</p>
                    <span>{message.time}</span>
                  </article>
                ))
              ) : (
                <div className="empty-state">
                  <strong>Sin mensajes todavía</strong>
                  <p>
                    Este lead recién llegó desde la vitrina. Usa una plantilla o respuesta rápida
                    para iniciar el contacto.
                  </p>
                </div>
              )}
            </div>

            <div className="quick-replies">
              {selectedConversation?.quickReplies.map((reply) => (
                <button key={reply} type="button" onClick={() => setDraft(reply)}>
                  {reply}
                </button>
              ))}
            </div>

            <label className="composer">
              <span>Mensaje listo para enviar o insertar</span>
              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Escribe o inserta un mensaje de venta"
                rows={4}
              />
            </label>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <span className="eyebrow">Vitrina digital</span>
          <h2>Muestra servicios y ofertas con una presentación clara, móvil y lista para vender.</h2>
        </div>
        <div className="storefront-grid">
          {storefrontItems.map((item) => (
            <article key={item.title} className="store-card">
              <div className="store-card-top">
                <span className="store-tag">{item.category}</span>
                <strong>{item.price}</strong>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a href="#chat-demo">{item.cta}</a>
            </article>
          ))}
        </div>
      </section>

      <section id="biblioteca" className="section-block">
        <div className="section-heading">
          <span className="eyebrow">Biblioteca de mensajes</span>
          <h2>Busca, copia o inserta plantillas pensadas para ventas reales de pequeños negocios.</h2>
        </div>
        <div className="library-controls">
          <label>
            <span>Buscar por categoría o intención</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Ej. seguimiento, pago, agenda"
            />
          </label>
          <p>{copyFeedback || 'Inserta una plantilla en el chat o cópiala para otro canal.'}</p>
        </div>
        <div className="template-grid">
          {filteredTemplates.length ? (
            filteredTemplates.map((template) => (
              <article key={template.title} className="template-card">
                <div className="template-card-top">
                  <span>{template.category}</span>
                  <strong>{template.title}</strong>
                </div>
                <p>{template.body}</p>
                <div className="template-actions">
                  <button
                    type="button"
                    className="secondary-action"
                    onClick={() => setDraft(template.body)}
                  >
                    Insertar
                  </button>
                  <button
                    type="button"
                    className="primary-action small"
                    onClick={() => handleCopyTemplate(template.body)}
                  >
                    Copiar
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="empty-state library-empty-state">
              <strong>Sin resultados</strong>
              <p>Ajusta tu búsqueda para ver mensajes de seguimiento, agenda, cobro o reactivación.</p>
            </div>
          )}
        </div>
      </section>

      <section className="section-block whatsapp-section">
        <div className="section-heading">
          <span className="eyebrow">Flujo WhatsApp Business</span>
          <h2>Simula el envío automático hoy y deja listo el punto de integración oficial para mañana.</h2>
        </div>
        <div className="workflow-grid">
          <div className="workflow-steps">
            {workflowSteps.map((step) => (
              <article key={step.title} className="workflow-card">
                <span>{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>

          <div className="send-panel">
            <p className="send-label">Punto de envío demo</p>
            <h3>whatsappGateway.send(...)</h3>
            <p>
              Este botón usa una implementación mock segura y reusable, preparada para reemplazarse
              por la API oficial sin cambiar la experiencia del frontend.
            </p>
            <button type="button" className="primary-action" onClick={handleSendDemo}>
              Enviar demo a WhatsApp Business
            </button>
            <div className="send-status">
              <strong>Estado</strong>
              <p>{sendState}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
