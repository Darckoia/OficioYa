import { FormEvent } from 'react';
import { Button } from '@/components/common/Button';

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  disabled?: boolean;
};

export function ChatInput({ value, onChange, onSubmit, placeholder = 'Escribe un mensaje...', disabled = false }: ChatInputProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="surface-card mt-4 flex flex-col gap-3 p-4 sm:flex-row sm:items-end">
      <label className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-200">
        Mensaje del cliente
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="mt-2 min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-0 transition focus:border-brand-400 disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </label>
      <Button type="submit">{disabled ? 'Escribiendo...' : 'Enviar'}</Button>
    </form>
  );
}
