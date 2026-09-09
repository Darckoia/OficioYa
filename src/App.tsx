import { useMemo, useState } from 'react'
import './App.css'

type ChatRole = 'cliente' | 'asesor'

type ChatMessage = {
  id: number
  role: ChatRole
  text: string
  timestamp: string
}

type Template = {
  id: string
  title: string
  category: string
  content: string
}

type Product = {
  id: string
  title: string
  description: string
  price: string
  cta: string
}

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: 'cliente',
    text: 'Hola 👋 ¿Tienen instalación de aire acondicionado para oficina pequeña?',
    timestamp: '09:10',
  },
  {
    id: 2,
    role: 'asesor',
    text: '¡Sí! Tenemos instalación express en 24 horas en Santiago y región.',
    timestamp: '09:11',
  },
  {
    id: 3,
    role: 'cliente',
    text: 'Perfecto. ¿Cuál es el precio con visita técnica?',
    timestamp: '09:12',
  },
]

const quickReplies = [
  'Tenemos promo de esta semana con visita técnica incluida.',
  'Te envío 3 opciones según tu presupuesto.',
  '¿Quieres agendar para mañana en la mañana o tarde?',
]

const templates: Template[] = [
  {
    id: '1',
    title: 'Seguimiento de cotización',
    category: 'Cierre',
    content:
      '¡Hola! Te escribo para ayudarte con tu cotización. ¿Quieres que reservemos tu cupo con el precio de hoy?',
  },
  {
    id: '2',
    title: 'Confirmación de visita',
    category: 'Agenda',
    content:
      '¡Listo! Tu visita quedó confirmada para mañana. Te avisamos 30 minutos antes de llegar.',
  },
  {
    id: '3',
    title: 'Recuperación de cliente',
    category: 'Reactivación',
    content:
      'Hola, ¿cómo estás? Aún tenemos disponible la promoción que revisaste. ¿Te gustaría retomarlo esta semana?',
  },
  {
    id: '4',
    title: 'Venta cruzada',
    category: 'Upsell',
    content:
      'Además del servicio principal, podemos incluir mantención preventiva con descuento por lanzamiento beta.',
  },
]

const storefrontItems: Product[] = [
  {
    id: '1',
    title: 'Instalación Express',
    description:
      'Servicio de instalación para negocios pequeños con confirmación en el día.',
    price: '$89.990 CLP',
    cta: 'Quiero este servicio',
  },
  {
    id: '2',
    title: 'Pack Vitrina + Chat',
    description:
      'Activa tu vitrina digital y gestiona consultas desde un solo panel comercial.',
    price: '$49.990 CLP / mes',
    cta: 'Activar en beta',
  },
  {
    id: '3',
    title: 'Automatización WhatsApp',
    description:
      'Flujo guiado para enviar mensajes de cierre a WhatsApp Business con un clic.',
    price: '$29.990 CLP / mes',
    cta: 'Probar flujo',
  },
]

const sendToWhatsAppBusinessMock = async (payload: string) => {
  await new Promise((resolve) => setTimeout(resolve, 700))
  return `✅ Flujo demo listo para WhatsApp Business: ${payload}`
}

function App() {
  const [messages, setMessages] = useState(initialMessages)
  const [composer, setComposer] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [search, setSearch] = useState('')
  const [copyFeedback, setCopyFeedback] = useState('')
  const [whatsAppStatus, setWhatsAppStatus] = useState(
    'Sin envíos aún. Usa el botón para simular el envío automático.',
  )

  const filteredTemplates = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    if (!normalizedSearch) {
      return templates
    }

    return templates.filter((template) =>
      `${template.title} ${template.category} ${template.content}`
        .toLowerCase()
        .includes(normalizedSearch),
    )
  }, [search])

  const addAssistantMessage = (text: string) => {
    setIsTyping(true)
    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: Date.now(),
          role: 'asesor',
          text,
          timestamp: new Date().toLocaleTimeString('es-CL', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ])
      setIsTyping(false)
    }, 600)
  }

  const onUseQuickReply = (reply: string) => {
    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        role: 'cliente',
        text: 'Necesito una respuesta rápida para enviar ahora.',
        timestamp: new Date().toLocaleTimeString('es-CL', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ])
    addAssistantMessage(reply)
  }

  const onSendComposer = () => {
    if (!composer.trim()) {
      return
    }

    const outgoingText = composer.trim()
    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        role: 'asesor',
        text: outgoingText,
        timestamp: new Date().toLocaleTimeString('es-CL', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ])
    setComposer('')
  }

  const onCopyTemplate = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopyFeedback('Plantilla copiada al portapapeles.')
    } catch {
      setCopyFeedback('No se pudo copiar automáticamente en este navegador.')
    }
  }

  const onSendToWhatsApp = async () => {
    const latestMessage = messages[messages.length - 1]
    const payload = latestMessage
      ? `${latestMessage.role.toUpperCase()}: ${latestMessage.text}`
      : 'Conversación vacía: usa mensajes demo'

    setWhatsAppStatus('Enviando demo a WhatsApp Business...')
    const result = await sendToWhatsAppBusinessMock(payload)
    setWhatsAppStatus(result)
  }

  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">Beta de demostración • OficioYa</p>
        <h1>Vende más por WhatsApp con chat, vitrinas y mensajes listos para usar</h1>
        <p className="hero-copy">
          OficioYa ayuda a trabajadores independientes y pymes de Chile a responder
          rápido, mostrar sus servicios y cerrar ventas con un flujo comercial claro.
        </p>
        <div className="hero-actions">
          <a className="cta-primary" href="#demo">
            Solicitar acceso beta
          </a>
          <a className="cta-secondary" href="#whatsapp-flow">
            Ver flujo WhatsApp Business
          </a>
        </div>
        <ul className="benefits">
          <li>Chat de ventas asistido</li>
          <li>Vitrinas de productos/servicios</li>
          <li>Biblioteca de mensajes reutilizables</li>
          <li>Flujo de envío a WhatsApp Business</li>
        </ul>
      </section>

      <section id="demo" className="panel">
        <header>
          <h2>Demo de chat de ventas</h2>
          <p>Simula una conversación real y acelera respuestas con plantillas.</p>
        </header>
        <div className="chat-box">
          {messages.map((message) => (
            <article key={message.id} className={`bubble ${message.role}`}>
              <p>{message.text}</p>
              <span>{message.timestamp}</span>
            </article>
          ))}
          {isTyping ? <p className="typing">Asistente escribiendo…</p> : null}
        </div>
        <div className="quick-replies">
          {quickReplies.map((reply) => (
            <button key={reply} type="button" onClick={() => onUseQuickReply(reply)}>
              {reply}
            </button>
          ))}
        </div>
        <div className="composer">
          <textarea
            value={composer}
            onChange={(event) => setComposer(event.target.value)}
            placeholder="Escribe una respuesta comercial..."
            rows={3}
          />
          <button type="button" onClick={onSendComposer}>
            Insertar en conversación
          </button>
        </div>
      </section>

      <section className="panel">
        <header>
          <h2>Vitrina demo</h2>
          <p>Muestra servicios con precio y CTA en una vista limpia y responsive.</p>
        </header>
        <div className="storefront-grid">
          {storefrontItems.length === 0 ? (
            <p className="empty-state">Aún no hay servicios publicados.</p>
          ) : (
            storefrontItems.map((item) => (
              <article key={item.id} className="store-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <strong>{item.price}</strong>
                <button type="button">{item.cta}</button>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="panel">
        <header>
          <h2>Biblioteca de mensajes</h2>
          <p>Busca plantillas en español y copia o inserta con un clic.</p>
        </header>
        <input
          className="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por categoría o texto..."
        />
        <div className="templates-grid">
          {filteredTemplates.length === 0 ? (
            <p className="empty-state">
              No se encontraron plantillas. Prueba con otra búsqueda.
            </p>
          ) : (
            filteredTemplates.map((template) => (
              <article key={template.id} className="template-card">
                <p className="tag">{template.category}</p>
                <h3>{template.title}</h3>
                <p>{template.content}</p>
                <div className="template-actions">
                  <button type="button" onClick={() => void onCopyTemplate(template.content)}>
                    Copiar
                  </button>
                  <button type="button" onClick={() => setComposer(template.content)}>
                    Insertar al chat
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
        {copyFeedback ? <p className="feedback">{copyFeedback}</p> : null}
      </section>

      <section id="whatsapp-flow" className="panel">
        <header>
          <h2>Flujo WhatsApp Business (mock seguro)</h2>
          <p>
            Esta beta usa una simulación segura para demostrar el punto de envío
            automático, lista para reemplazar por integración real.
          </p>
        </header>
        <button className="cta-primary" type="button" onClick={() => void onSendToWhatsApp()}>
          Enviar conversación a WhatsApp Business
        </button>
        <p className="feedback">{whatsAppStatus}</p>
      </section>
    </main>
  )
}

export default App
