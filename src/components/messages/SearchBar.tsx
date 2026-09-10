import { MessageCategory } from '@/data/messages';

type SearchBarProps = {
  query: string;
  category: MessageCategory | 'Todas';
  categories: MessageCategory[];
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: MessageCategory | 'Todas') => void;
};

export function SearchBar({ query, category, categories, onQueryChange, onCategoryChange }: SearchBarProps) {
  return (
    <div className="surface-card flex flex-col gap-4 p-4 lg:flex-row">
      <input
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Buscar por objetivo, tono o uso..."
        className="min-h-12 flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
      />
      <select
        value={category}
        onChange={(event) => onCategoryChange(event.target.value as MessageCategory | 'Todas')}
        className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
      >
        <option value="Todas">Todas las categorías</option>
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
