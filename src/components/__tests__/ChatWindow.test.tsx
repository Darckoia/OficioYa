import { render, screen } from '@testing-library/react';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { initialChatMessages } from '@/data/chat-demo';

describe('ChatWindow', () => {
  it('renders chat history and typing indicator', () => {
    render(<ChatWindow messages={initialChatMessages} isTyping animateTypingId={null} />);

    expect(screen.getAllByText('Camila')).toHaveLength(2);
    expect(screen.getByText(/Hola, ¿todavía tienen instalación de cámaras/)).toBeInTheDocument();
    expect(screen.getByText(/OficioYa Demo está escribiendo/i)).toBeInTheDocument();
  });
});
