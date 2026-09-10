'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChatMessageItem } from '@/data/chat-demo';
import { ChatMessage } from '@/components/chat/ChatMessage';

type ChatWindowProps = {
  messages: ChatMessageItem[];
  isTyping?: boolean;
  animateTypingId?: number | null;
};

export function ChatWindow({ messages, isTyping = false, animateTypingId = null }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomRef.current && typeof bottomRef.current.scrollIntoView === 'function') {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  return (
    <div className="surface-card flex min-h-[420px] max-h-[560px] flex-col gap-4 overflow-y-auto bg-[#e5ddd5] p-4 dark:bg-slate-950">
      <AnimatePresence initial={false}>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} animateTyping={message.id === animateTypingId} />
        ))}
        {isTyping ? (
          <motion.div key="typing" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex justify-start">
            <div className="rounded-3xl bg-white px-4 py-3 text-slate-500 shadow-sm dark:bg-slate-800 dark:text-slate-300">
              <p className="sr-only">OficioYa Demo está escribiendo</p>
              <div className="flex gap-1">
                {[0, 1, 2].map((index) => (
                  <motion.span
                    key={index}
                    className="h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-500"
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                    transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, delay: index * 0.15 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div ref={bottomRef} />
    </div>
  );
}
