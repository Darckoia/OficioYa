import { FormEvent } from 'react';
import { Button } from '@/components/common/Button';

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function ChatInput({ value, onChange, onSubmit }: ChatInputProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="surface-card mt-4 flex flex-col gap-3 p-4 sm:flex-row">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Escribe una respuesta para el cliente..."
        className="min-h-12 flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none ring-0 transition focus:border-brand-400"
      />
      <Button type="submit">Enviar</Button>
    </form>
  );
}
