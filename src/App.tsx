import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'
import { whatsappGateway } from './services/whatsappService'
import type { WhatsAppSendResult } from './services/whatsappService'

type Sender = 'negocio' | 'cliente'

type ChatMessage = {
  id: string
  sender: Sender
  text: string
  createdAt: string
}

type ConversationStatus = 'abierta' | 'resuelta'

type Conversation = {
  id: string
  customerName: string
  phone: string
  status: ConversationStatus
  messages: ChatMessage[]
}

type MessageTemplate = {
  id: string
  title: string
  category: string
  text: string
}

type StorefrontItem = {
  id: string
  title: string
  description: string
  imageUrl: string
  price: number
  ctaText: string
  ctaUrl: string
}

type StorefrontDraft = {
  title: string
  description: string
  imageUrl: string
  price: string
  ctaText: string
  ctaUrl: string
}

const STORE_KEY = 'oficioya-storefront-items'
const DEFAULT_STORE_IMAGE =
  'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80'
const DEFAULT_STORE_CTA_URL = 'https://wa.me/56987654321'

const templateLibrary: MessageTemplate[] = [
  {
    id: 'tpl-1',
    title: 'Seguimiento de cotización',
    category: 'Seguimiento',
    text: 'Hola, te escribo para saber si pudiste revisar la cotización. ¿Te ayudo con alguna duda?',
  },
  {
    id: 'tpl-2',
    title: 'Oferta del día',
    category: 'Promoción',
    text: '¡Tenemos una promoción activa hoy! Si confirmas ahora, te respetamos precio preferencial.',
  },
  {
    id: 'tpl-3',
    title: 'Confirmación de pedido',
    category: 'Cierre',
    text: 'Perfecto, pedido confirmado. Te envío el detalle y próximos pasos para coordinar entrega.',
  },
  {
    id: 'tpl-4',
    title: 'Primer contacto',
    category: 'Inicio',
    text: '¡Hola! Gracias por contactarnos. Cuéntame qué necesitas y te ayudo a elegir la mejor opción.',
  },
]

const quickReplies = [
  '¡Gracias por tu interés! Te respondo en unos minutos.',
  '¿Prefieres retiro o despacho?',
  'Te puedo enviar más fotos y detalles ahora mismo.',
]

const createMessage = (sender: Sender, text: string): ChatMessage => ({
  id: `msg-${crypto.randomUUID()}`,
  sender,
  text,
  createdAt: new Date().toISOString(),
})

const defaultConversations: Conversation[] = [
  {
    id: 'conv-1',
    customerName: 'Camila Soto',
    phone: '+56987654321',
    status: 'abierta',
    messages: [
      createMessage('cliente', 'Hola, ¿tienes stock del servicio de instalación?'),
      createMessage('negocio', 'Sí, tenemos cupos para esta semana. ¿Qué día te acomoda?'),
    ],
  },
]

const defaultStorefronts: StorefrontItem[] = [
  {
    id: 'store-default',
    title: 'Pack mantención de jardines',
    description:
      'Incluye poda, limpieza y retiro de residuos para espacios de hasta 120 m².',
    imageUrl: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80',
    price: 45000,
    ctaText: 'Solicitar por WhatsApp',
    ctaUrl: 'https://wa.me/56987654321',
  },
]

const emptyDraft: StorefrontDraft = {
  title: '',
  description: '',
  imageUrl: '',
  price: '',
  ctaText: 'Solicitar ahora',
  ctaUrl: '',
}

const normalizePhone = (value: string) => value.replace(/[\s()-]/g, '')
const sanitizeHttpUrl = (value: string) => {
  if (!value.trim()) {
    return ''
  }

  try {
    const parsed = new URL(value)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
      ? parsed.toString()
      : ''
  } catch {
    return ''
  }
}

const formatCLP = (value: number) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(value)

const readStorefronts = () => {
  if (typeof window === 'undefined') {
    return defaultStorefronts
  }

  const raw = window.localStorage.getItem(STORE_KEY)

  if (!raw) {
    return defaultStorefronts
  }

  try {
    const parsed = JSON.parse(raw) as StorefrontItem[]
    return parsed.length > 0 ? parsed : defaultStorefronts
  } catch {
    return defaultStorefronts
  }
}

const getStoreIdFromUrl = () => {
  if (typeof window === 'undefined') {
    return ''
  }

  return new URLSearchParams(window.location.search).get('store') ?? ''
}

function App() {
  const [conversations, setConversations] = useState(defaultConversations)
  const [selectedConversationId, setSelectedConversationId] = useState(defaultConversations[0].id)
  const [newCustomerName, setNewCustomerName] = useState('')
  const [newCustomerPhone, setNewCustomerPhone] = useState('')
  const [chatDraft, setChatDraft] = useState('')
  const [chatError, setChatError] = useState('')
  const [templateSearch, setTemplateSearch] = useState('')
  const [autoSendWhatsApp, setAutoSendWhatsApp] = useState(true)
  const [isSendingWhatsApp, setIsSendingWhatsApp] = useState(false)
  const [whatsAppStatus, setWhatsAppStatus] = useState<WhatsAppSendResult | null>(null)

  const [storefrontItems, setStorefrontItems] = useState<StorefrontItem[]>(readStorefronts)
  const [storefrontDraft, setStorefrontDraft] = useState<StorefrontDraft>(emptyDraft)
  const [storefrontError, setStorefrontError] = useState('')
  const [publishedStoreId, setPublishedStoreId] = useState('')

  const publicStoreId = getStoreIdFromUrl()

  const selectedConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === selectedConversationId),
    [conversations, selectedConversationId],
  )

  const filteredTemplates = useMemo(
    () =>
      templateLibrary.filter((template) => {
        const value = templateSearch.trim().toLowerCase()

        if (!value) {
          return true
        }

        return (
          template.title.toLowerCase().includes(value) ||
          template.category.toLowerCase().includes(value) ||
          template.text.toLowerCase().includes(value)
        )
      }),
    [templateSearch],
  )

  const publicStorefront = useMemo(
    () => storefrontItems.find((item) => item.id === publicStoreId),
    [publicStoreId, storefrontItems],
  )

  useEffect(() => {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(storefrontItems))
  }, [storefrontItems])

  const upsertConversation = (
    conversationId: string,
    updater: (conversation: Conversation) => Conversation,
  ) => {
    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === conversationId ? updater(conversation) : conversation,
      ),
    )
  }

  const handleCreateConversation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const customerName = newCustomerName.trim()
    const phone = normalizePhone(newCustomerPhone)

    if (!customerName || !/^\+?\d{8,15}$/.test(phone)) {
      setChatError('Debes ingresar un nombre y un teléfono válido en formato chileno/internacional.')
      return
    }

    const conversation: Conversation = {
      id: `conv-${crypto.randomUUID()}`,
      customerName,
      phone,
      status: 'abierta',
      messages: [],
    }

    setConversations((previous) => [conversation, ...previous])
    setSelectedConversationId(conversation.id)
    setNewCustomerName('')
    setNewCustomerPhone('')
    setChatError('')
  }

  const handleSendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!selectedConversation) {
      setChatError('Selecciona o crea una conversación antes de enviar mensajes.')
      return
    }

    const text = chatDraft.trim()

    if (!text) {
      setChatError('Escribe un mensaje antes de enviar.')
      return
    }

    const message = createMessage('negocio', text)

    upsertConversation(selectedConversation.id, (conversation) => ({
      ...conversation,
      messages: [...conversation.messages, message],
      status: 'abierta',
    }))

    setChatDraft('')
    setChatError('')

    if (!autoSendWhatsApp) {
      return
    }

    setIsSendingWhatsApp(true)

    const result = await whatsappGateway.send({
      conversationId: selectedConversation.id,
      phone: selectedConversation.phone,
      message: text,
    })

    setWhatsAppStatus(result)
    setIsSendingWhatsApp(false)
  }

  const handleInsertTemplate = (template: MessageTemplate) => {
    setChatDraft(template.text)
    setChatError('')
  }

  const handleCreateStorefrontItem = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const price = Number(storefrontDraft.price)

    if (
      !storefrontDraft.title.trim() ||
      !storefrontDraft.description.trim() ||
      !Number.isFinite(price) ||
      price <= 0 ||
      !storefrontDraft.ctaText.trim()
    ) {
      setStorefrontError('Completa título, descripción, precio válido y texto del botón CTA.')
      return
    }

    const storefrontItem: StorefrontItem = {
      id: `store-${crypto.randomUUID()}`,
      title: storefrontDraft.title.trim(),
      description: storefrontDraft.description.trim(),
      imageUrl: sanitizeHttpUrl(storefrontDraft.imageUrl) || DEFAULT_STORE_IMAGE,
      price,
      ctaText: storefrontDraft.ctaText.trim(),
      ctaUrl: sanitizeHttpUrl(storefrontDraft.ctaUrl) || DEFAULT_STORE_CTA_URL,
    }

    setStorefrontItems((previous) => [storefrontItem, ...previous])
    setStorefrontDraft(emptyDraft)
    setStorefrontError('')
  }

  const handlePublishStore = (storefrontId: string) => {
    setPublishedStoreId(storefrontId)
    setStorefrontError('')
  }

  const publishedUrl = publishedStoreId
    ? `${window.location.origin}${window.location.pathname}?store=${publishedStoreId}`
    : ''

  if (publicStoreId) {
    return (
      <main className="public-store-layout">
        {publicStorefront ? (
          <article className="public-store-card">
            <img
              src={sanitizeHttpUrl(publicStorefront.imageUrl) || DEFAULT_STORE_IMAGE}
              alt={publicStorefront.title}
            />
            <div>
              <p className="chip">Vitrina de OficioYa</p>
              <h1>{publicStorefront.title}</h1>
              <p>{publicStorefront.description}</p>
              <p className="price">{formatCLP(publicStorefront.price)}</p>
              <a
                href={sanitizeHttpUrl(publicStorefront.ctaUrl) || DEFAULT_STORE_CTA_URL}
                target="_blank"
                rel="noreferrer"
                className="cta-link"
              >
                {publicStorefront.ctaText}
              </a>
            </div>
          </article>
        ) : (
          <section className="empty-state">
            <h1>Vitrina no encontrada</h1>
            <p>Este enlace no corresponde a una vitrina publicada.</p>
          </section>
        )}
      </main>
    )
  }

  return (
    <main className="app-layout">
      <header className="hero-section">
        <p className="chip">OficioYa · Chile</p>
        <h1>Vende más con chat, vitrinas y WhatsApp Business en un solo lugar</h1>
        <p>
          Plataforma pensada para trabajadores independientes y pymes chilenas. Organiza tus
          conversaciones, comparte vitrinas y acelera cierres con mensajes reutilizables.
        </p>
      </header>

      <section className="grid grid-2">
        <article className="panel">
          <div className="panel-header">
            <h2>Chat de ventas</h2>
            <span>{conversations.length} conversaciones</span>
          </div>

          <form className="inline-form" onSubmit={handleCreateConversation}>
            <input
              type="text"
              value={newCustomerName}
              onChange={(event) => setNewCustomerName(event.target.value)}
              placeholder="Nombre cliente"
              aria-label="Nombre cliente"
            />
            <input
              type="tel"
              value={newCustomerPhone}
              onChange={(event) => setNewCustomerPhone(event.target.value)}
              placeholder="+56912345678"
              aria-label="Teléfono cliente"
            />
            <button type="submit">Nueva conversación</button>
          </form>

          <div className="conversation-list">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                type="button"
                className={
                  selectedConversationId === conversation.id
                    ? 'conversation-item selected'
                    : 'conversation-item'
                }
                onClick={() => setSelectedConversationId(conversation.id)}
              >
                <div>
                  <strong>{conversation.customerName}</strong>
                  <span>{conversation.phone}</span>
                </div>
                <small>{conversation.status}</small>
              </button>
            ))}
          </div>

          {selectedConversation ? (
            <>
              <div className="panel-header compact">
                <h3>{selectedConversation.customerName}</h3>
                <button
                  type="button"
                  onClick={() =>
                    upsertConversation(selectedConversation.id, (conversation) => ({
                      ...conversation,
                      status: conversation.status === 'abierta' ? 'resuelta' : 'abierta',
                    }))
                  }
                >
                  Marcar como{' '}
                  {selectedConversation.status === 'abierta' ? 'resuelta' : 'abierta'}
                </button>
              </div>

              <div className="message-history" role="log" aria-live="polite">
                {selectedConversation.messages.length === 0 ? (
                  <p className="empty-state-inline">
                    Aún no hay mensajes. Escribe el primero para iniciar la venta.
                  </p>
                ) : (
                  selectedConversation.messages.map((message) => (
                    <div key={message.id} className={`bubble ${message.sender}`}>
                      <p>{message.text}</p>
                      <small>{new Date(message.createdAt).toLocaleTimeString('es-CL')}</small>
                    </div>
                  ))
                )}
              </div>

              <div className="quick-replies">
                {quickReplies.map((reply) => (
                  <button key={reply} type="button" onClick={() => setChatDraft(reply)}>
                    {reply}
                  </button>
                ))}
              </div>

              <form className="chat-form" onSubmit={handleSendMessage}>
                <textarea
                  value={chatDraft}
                  onChange={(event) => setChatDraft(event.target.value)}
                  placeholder="Escribe tu mensaje de venta"
                  aria-label="Mensaje"
                />
                <div className="chat-actions">
                  <label>
                    <input
                      type="checkbox"
                      checked={autoSendWhatsApp}
                      onChange={(event) => setAutoSendWhatsApp(event.target.checked)}
                    />
                    Autoenviar a WhatsApp Business
                  </label>
                  <button type="submit" disabled={isSendingWhatsApp}>
                    {isSendingWhatsApp ? 'Enviando...' : 'Enviar mensaje'}
                  </button>
                </div>
              </form>

              {whatsAppStatus ? (
                <div className="integration-box">
                  <strong>Estado WhatsApp Business: {whatsAppStatus.status}</strong>
                  <p>{whatsAppStatus.detail}</p>
                  {whatsAppStatus.deeplink ? (
                    <a href={whatsAppStatus.deeplink} target="_blank" rel="noreferrer">
                      Abrir en WhatsApp
                    </a>
                  ) : null}
                </div>
              ) : (
                <p className="empty-state-inline">
                  El flujo de integración está activo. Al enviar, se prepara el envío para API oficial.
                </p>
              )}
            </>
          ) : (
            <p className="empty-state-inline">Selecciona una conversación para comenzar.</p>
          )}

          {chatError ? <p className="error-text">{chatError}</p> : null}
        </article>

        <article className="panel">
          <div className="panel-header">
            <h2>Biblioteca de mensajes</h2>
            <span>{filteredTemplates.length} plantillas</span>
          </div>

          <input
            type="search"
            value={templateSearch}
            onChange={(event) => setTemplateSearch(event.target.value)}
            placeholder="Buscar por categoría o texto"
            aria-label="Buscar plantillas"
          />

          <div className="template-list">
            {filteredTemplates.length === 0 ? (
              <p className="empty-state-inline">
                No encontramos plantillas con ese criterio. Prueba otra búsqueda.
              </p>
            ) : (
              filteredTemplates.map((template) => (
                <article key={template.id} className="template-card">
                  <header>
                    <h3>{template.title}</h3>
                    <span>{template.category}</span>
                  </header>
                  <p>{template.text}</p>
                  <button type="button" onClick={() => handleInsertTemplate(template)}>
                    Insertar en chat
                  </button>
                </article>
              ))
            )}
          </div>
        </article>
      </section>

      <section className="panel storefront-panel">
        <div className="panel-header">
          <h2>Creador de vitrinas</h2>
          <span>{storefrontItems.length} publicables</span>
        </div>

        <form className="storefront-form" onSubmit={handleCreateStorefrontItem}>
          <input
            type="text"
            value={storefrontDraft.title}
            onChange={(event) =>
              setStorefrontDraft((previous) => ({ ...previous, title: event.target.value }))
            }
            placeholder="Título del producto/servicio"
            aria-label="Título"
          />
          <input
            type="text"
            value={storefrontDraft.description}
            onChange={(event) =>
              setStorefrontDraft((previous) => ({
                ...previous,
                description: event.target.value,
              }))
            }
            placeholder="Descripción breve"
            aria-label="Descripción"
          />
          <input
            type="url"
            value={storefrontDraft.imageUrl}
            onChange={(event) =>
              setStorefrontDraft((previous) => ({ ...previous, imageUrl: event.target.value }))
            }
            placeholder="URL de imagen (opcional)"
            aria-label="Imagen"
          />
          <input
            type="number"
            min="1"
            value={storefrontDraft.price}
            onChange={(event) =>
              setStorefrontDraft((previous) => ({ ...previous, price: event.target.value }))
            }
            placeholder="Precio en CLP"
            aria-label="Precio"
          />
          <input
            type="text"
            value={storefrontDraft.ctaText}
            onChange={(event) =>
              setStorefrontDraft((previous) => ({ ...previous, ctaText: event.target.value }))
            }
            placeholder="Texto botón CTA"
            aria-label="CTA"
          />
          <input
            type="url"
            value={storefrontDraft.ctaUrl}
            onChange={(event) =>
              setStorefrontDraft((previous) => ({ ...previous, ctaUrl: event.target.value }))
            }
            placeholder="URL CTA (opcional)"
            aria-label="URL CTA"
          />
          <button type="submit">Agregar a vitrina</button>
        </form>

        {storefrontError ? <p className="error-text">{storefrontError}</p> : null}

        <div className="store-grid">
          {storefrontItems.length === 0 ? (
            <p className="empty-state-inline">No hay elementos en tu vitrina aún.</p>
          ) : (
            storefrontItems.map((item) => (
              <article key={item.id} className="store-card">
                <img src={sanitizeHttpUrl(item.imageUrl) || DEFAULT_STORE_IMAGE} alt={item.title} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <strong>{formatCLP(item.price)}</strong>
                <button type="button" onClick={() => handlePublishStore(item.id)}>
                  Publicar y compartir
                </button>
              </article>
            ))
          )}
        </div>

        {publishedUrl ? (
          <div className="integration-box">
            <strong>Vitrina publicada</strong>
            <p>Comparte este enlace o ábrelo para ver la vitrina pública.</p>
            <a href={publishedUrl} target="_blank" rel="noreferrer">
              {publishedUrl}
            </a>
          </div>
        ) : (
          <p className="empty-state-inline">
            Publica un elemento para generar un enlace público compartible.
          </p>
        )}
      </section>
    </main>
  )
}

export default App
