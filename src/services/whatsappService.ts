export interface WhatsAppSendPayload {
  customerName: string
  phone: string
  message: string
  source: string
}

export interface WhatsAppSendResult {
  queued: boolean
  channelLabel: string
  previewTime: string
  summary: string
}

export interface WhatsAppGateway {
  send(payload: WhatsAppSendPayload): Promise<WhatsAppSendResult>
}

const buildMockSummary = (payload: WhatsAppSendPayload) =>
  `Demo preparado para ${payload.customerName} vía WhatsApp Business. Payload listo para integración oficial desde ${payload.source}.`

export const whatsappGateway: WhatsAppGateway = {
  async send(payload) {
    await Promise.resolve(payload)

    return {
      queued: true,
      channelLabel: 'WhatsApp Business',
      previewTime: new Date().toLocaleTimeString('es-CL', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      summary: buildMockSummary(payload),
    }
  },
}
