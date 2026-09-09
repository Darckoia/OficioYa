'use client';

import { useMemo, useState } from 'react';
import { ChatInput } from '@/components/chat/ChatInput';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { TemplateSelector } from '@/components/chat/TemplateSelector';
import { Badge } from '@/components/common/Badge';
import { Card } from '@/components/common/Card';
import { chatTemplates, initialChatMessages } from '@/data/chat-demo';

export default function ChatDemoPage() {
  const [messages, setMessages] = useState(initialChatMessages);
  const [draft, setDraft] = useState('');

  const totalReplies = useMemo(() => messages.filter((message) => message.role === 'business').length, [messages]);

  const handleSubmit = () => {
    const nextMessage = draft.trim();

    if (!nextMessage) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        id: current.length + 1,
        role: 'business',
        author: 'OficioYa Demo',
        text: nextMessage,
        time: '09:17'
      }
    ]);
    setDraft('');
  };

  return (
    <div className="space-y-6">
      <Card className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Badge>Demo interactiva</Badge>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Chat de ventas estilo WhatsApp</h2>
          <p className="mt-2 text-slate-600">Selecciona una plantilla o escribe una respuesta manual para continuar la conversación.</p>
        </div>
        <div className="rounded-2xl bg-brand-50 px-4 py-3 text-sm text-brand-700">{totalReplies} respuestas comerciales enviadas</div>
      </Card>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <ChatWindow messages={messages} />
          <ChatInput value={draft} onChange={setDraft} onSubmit={handleSubmit} />
        </div>
        <TemplateSelector templates={chatTemplates} onSelect={setDraft} />
      </div>
    </div>
  );
}
