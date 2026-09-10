import { buildAutoReply, formatChatTime } from '@/data/chat-demo';

describe('chat-demo helpers', () => {
  it('matches price-related auto replies', () => {
    expect(buildAutoReply('¿Me puedes mandar una cotización y precio?')).toMatch(/cotización/i);
  });

  it('returns a fallback reply when no keyword matches', () => {
    expect(buildAutoReply('Solo quería saludar')).toMatch(/Gracias por escribir/i);
  });

  it('formats times as HH:MM', () => {
    expect(formatChatTime(new Date('2026-09-10T09:17:00Z'))).toMatch(/^\d{2}:\d{2}$/);
  });
});
