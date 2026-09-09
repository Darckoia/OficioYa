import { ChatMessageItem } from '@/data/chat-demo';
import { ChatMessage } from '@/components/chat/ChatMessage';

type ChatWindowProps = {
  messages: ChatMessageItem[];
};

export function ChatWindow({ messages }: ChatWindowProps) {
  return (
    <div className="surface-card flex min-h-[420px] flex-col gap-4 bg-[#e5ddd5] p-4">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  );
}
