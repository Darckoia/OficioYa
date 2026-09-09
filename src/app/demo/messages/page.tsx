'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/common/Badge';
import { Card } from '@/components/common/Card';
import { MessageList } from '@/components/messages/MessageList';
import { SearchBar } from '@/components/messages/SearchBar';
import { MessageCategory, messageCategories, messageTemplates } from '@/data/messages';

export default function MessagesDemoPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<MessageCategory | 'Todas'>('Todas');

  const filteredTemplates = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    return messageTemplates.filter((template) => {
      const matchesCategory = category === 'Todas' || template.category === category;
      const matchesQuery =
        !normalizedQuery ||
        template.title.toLowerCase().includes(normalizedQuery) ||
        template.preview.toLowerCase().includes(normalizedQuery) ||
        template.content.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div className="space-y-6">
      <Card>
        <Badge>Biblioteca comercial</Badge>
        <h2 className="mt-3 text-2xl font-semibold text-slate-950">Plantillas para responder mejor</h2>
        <p className="mt-2 text-slate-600">Filtra por categoría o palabra clave y revisa una vista previa antes de copiar el mensaje.</p>
      </Card>
      <SearchBar
        query={query}
        category={category}
        categories={messageCategories}
        onQueryChange={setQuery}
        onCategoryChange={setCategory}
      />
      <MessageList templates={filteredTemplates} />
    </div>
  );
}
