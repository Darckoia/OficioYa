import { Button } from '@/components/common/Button';

type AdvancedFiltersProps = {
  tone: string;
  channel: string;
  tones: string[];
  channels: string[];
  onToneChange: (value: string) => void;
  onChannelChange: (value: string) => void;
  onReset: () => void;
};

export function AdvancedFilters({ tone, channel, tones, channels, onToneChange, onChannelChange, onReset }: AdvancedFiltersProps) {
  return (
    <div className="surface-card flex flex-col gap-4 p-4 md:flex-row md:items-end md:justify-between">
      <div className="grid flex-1 gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Tono
          <select
            value={tone}
            onChange={(event) => onToneChange(event.target.value)}
            className="mt-2 min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <option value="Todas">Todos los tonos</option>
            {tones.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Canal sugerido
          <select
            value={channel}
            onChange={(event) => onChannelChange(event.target.value)}
            className="mt-2 min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <option value="Todos">Todos los canales</option>
            {channels.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>
      <Button variant="ghost" onClick={onReset}>Restablecer filtros</Button>
    </div>
  );
}
