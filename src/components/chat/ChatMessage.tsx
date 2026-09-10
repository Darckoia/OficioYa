'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChatMessageItem } from '@/data/chat-demo';

type ChatMessageProps = {
  message: ChatMessageItem;
  animateTyping?: boolean;
};

export function ChatMessage({ message, animateTyping = false }: ChatMessageProps) {
  const isBusiness = message.role === 'business';
  const [displayText, setDisplayText] = useState(animateTyping ? '' : message.text);

  useEffect(() => {
    if (!animateTyping) {
      setDisplayText(message.text);
      return;
    }

    setDisplayText('');
    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setDisplayText(message.text.slice(0, index));

      if (index >= message.text.length) {
        window.clearInterval(interval);
      }
    }, 16);

    return () => window.clearInterval(interval);
  }, [animateTyping, message.text]);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={`flex ${isBusiness ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm shadow-sm ${
          isBusiness ? 'bg-emerald-500 text-white' : 'bg-white text-slate-900 dark:bg-slate-800 dark:text-white'
        }`}
      >
        <p className={`text-xs font-semibold ${isBusiness ? 'text-emerald-50' : 'text-slate-500 dark:text-slate-300'}`}>{message.author}</p>
        <p className="mt-1 leading-6">{displayText}</p>
        <p className={`mt-2 text-[11px] ${isBusiness ? 'text-emerald-100' : 'text-slate-400 dark:text-slate-400'}`}>{message.time}</p>
      </div>
    </motion.div>
  );
}
