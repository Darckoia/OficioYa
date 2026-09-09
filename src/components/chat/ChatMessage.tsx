import { ChatMessageItem } from '@/data/chat-demo';

type ChatMessageProps = {
  message: ChatMessageItem;
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isBusiness = message.role === 'business';

  return (
    <div className={`flex ${isBusiness ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm shadow-sm ${
          isBusiness ? 'bg-emerald-500 text-white' : 'bg-white text-slate-900'
        }`}
      >
        <p className={`text-xs font-semibold ${isBusiness ? 'text-emerald-50' : 'text-slate-500'}`}>{message.author}</p>
        <p className="mt-1 leading-6">{message.text}</p>
        <p className={`mt-2 text-[11px] ${isBusiness ? 'text-emerald-100' : 'text-slate-400'}`}>{message.time}</p>
      </div>
    </div>
  );
}
