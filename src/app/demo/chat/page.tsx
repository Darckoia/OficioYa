'use client';

import { ChatInput } from '@/components/chat/ChatInput';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { TemplateSelector } from '@/components/chat/TemplateSelector';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { chatTemplates } from '@/data/chat-demo';
import { useChat } from '@/hooks/useChat';

export default function ChatDemoPage() {
  const { messages, draft, setDraft, isTyping, animateTypingId, totalReplies, applyTemplate, sendMessage, resetConversation } = useChat();

  return (
    <div className="space-y-6">
      <Card className="flex flex-col gap-4 dark:text-slate-100 md:flex-row md:items-center md:justify-between">
        <div>
          <Badge>Demo interactiva</Badge>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">Chat de ventas con respuestas automáticas</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Escribe como cliente, prueba una plantilla y observa cómo el vendedor responde con historial persistente.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="rounded-2xl bg-brand-50 px-4 py-3 text-sm text-brand-700 dark:bg-brand-950/40 dark:text-brand-200">{totalReplies} respuestas automáticas</div>
          <Button variant="ghost" onClick={resetConversation}>Reiniciar demo</Button>
        </div>
      </Card>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <ChatWindow messages={messages} isTyping={isTyping} animateTypingId={animateTypingId} />
          <ChatInput
            value={draft}
            onChange={setDraft}
            onSubmit={sendMessage}
            placeholder="Escribe como cliente para pedir una cotización o consultar por stock..."
            disabled={isTyping}
          />
        </div>
        <TemplateSelector templates={chatTemplates} onSelect={applyTemplate} />
      </div>
    </div>
  );
}
