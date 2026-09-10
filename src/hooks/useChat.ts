'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChatMessageItem, buildAutoReply, chatStorageKey, formatChatTime, initialChatMessages } from '@/data/chat-demo';
import { useToast } from '@/hooks/useToast';

function getNextId(messages: ChatMessageItem[]) {
  return messages.length ? Math.max(...messages.map((message) => message.id)) + 1 : 1;
}

export function useChat() {
  const { notifyError, notifyInfo } = useToast();
  const timeoutRef = useRef<number>();
  const [messages, setMessages] = useState<ChatMessageItem[]>(initialChatMessages);
  const [draft, setDraft] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [animateTypingId, setAnimateTypingId] = useState<number | null>(null);

  useEffect(() => {
    try {
      const storedMessages = window.localStorage.getItem(chatStorageKey);

      if (storedMessages) {
        setMessages(JSON.parse(storedMessages) as ChatMessageItem[]);
      }
    } catch {
      window.localStorage.removeItem(chatStorageKey);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(chatStorageKey, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
  }, []);

  const sendMessage = () => {
    const nextMessage = draft.trim();

    if (!nextMessage || isTyping) {
      if (!nextMessage) {
        notifyError('Escribe un mensaje primero', 'Puedes usar una plantilla o redactarlo manualmente.');
      }
      return;
    }

    setAnimateTypingId(null);
    setMessages((current) => [
      ...current,
      {
        id: getNextId(current),
        role: 'customer',
        author: 'Cliente demo',
        text: nextMessage,
        time: formatChatTime()
      }
    ]);
    setDraft('');
    setIsTyping(true);

    timeoutRef.current = window.setTimeout(() => {
      setMessages((current) => {
        const replyId = getNextId(current);
        setAnimateTypingId(replyId);

        return [
          ...current,
          {
            id: replyId,
            role: 'business',
            author: 'OficioYa Demo',
            text: buildAutoReply(nextMessage),
            time: formatChatTime()
          }
        ];
      });
      setIsTyping(false);
      notifyInfo('Respuesta automática enviada', 'El vendedor demo respondió y el historial quedó guardado localmente.');
    }, 950);
  };

  const resetConversation = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    setMessages(initialChatMessages);
    setDraft('');
    setIsTyping(false);
    setAnimateTypingId(null);
    window.localStorage.removeItem(chatStorageKey);
    notifyInfo('Conversación reiniciada', 'Volvimos al historial demo original.');
  };

  const totalReplies = useMemo(() => messages.filter((message) => message.role === 'business').length, [messages]);

  return {
    messages,
    draft,
    setDraft,
    isTyping,
    animateTypingId,
    totalReplies,
    applyTemplate: setDraft,
    sendMessage,
    resetConversation
  };
}
