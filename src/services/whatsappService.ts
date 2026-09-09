export type WhatsAppSendPayload = {
  conversationId: string
  phone: string
  message: string
}

export type WhatsAppSendResult = {
  status: 'mocked' | 'error'
  detail: string
  queuedAt: string
  deeplink?: string
}

export interface WhatsAppGateway {
  send(payload: WhatsAppSendPayload): Promise<WhatsAppSendResult>
}

const normalizePhone = (phone: string) => phone.replace(/[^\d]/g, '')

class MockWhatsAppBusinessGateway implements WhatsAppGateway {
  async send(payload: WhatsAppSendPayload): Promise<WhatsAppSendResult> {
    const phone = normalizePhone(payload.phone)

    if (phone.length < 8 || payload.message.trim().length === 0) {
      return {
        status: 'error',
        detail: 'No se pudo preparar el envío a WhatsApp Business. Revisa teléfono y mensaje.',
        queuedAt: new Date().toISOString(),
      }
    }

    const encodedMessage = encodeURIComponent(payload.message)

    return {
      status: 'mocked',
      detail:
        'Mensaje preparado en capa mock de WhatsApp Business. Lista para reemplazar por la API oficial.',
      queuedAt: new Date().toISOString(),
      deeplink: `https://wa.me/${phone}?text=${encodedMessage}`,
    }
  }
}

export const whatsappGateway: WhatsAppGateway = new MockWhatsAppBusinessGateway()
