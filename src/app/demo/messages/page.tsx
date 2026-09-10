'use client';

import { useMemo, useState } from 'react';
import { AdvancedFilters } from '@/components/forms/AdvancedFilters';
import { Badge } from '@/components/common/Badge';
import { Card } from '@/components/common/Card';
import { MessageList } from '@/components/messages/MessageList';
import { SearchBar } from '@/components/messages/SearchBar';
import { MessageCategory, messageCategories, messageChannels, messageTemplates, messageTones } from '@/data/messages';

export default function MessagesDemoPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<MessageCategory | 'Todas'>('Todas');
  const [tone, setTone] = useState<string>('Todas');
  const [channel, setChannel] = useState<string>('Todos');

  const filteredTemplates = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    return messageTemplates.filter((template) => {
      const matchesCategory = category === 'Todas' || template.category === category;
      const matchesTone = tone === 'Todas' || template.tone === tone;
      const matchesChannel = channel === 'Todos' || template.channel === channel;
      const matchesQuery =
        !normalizedQuery ||
        template.title.toLowerCase().includes(normalizedQuery) ||
        template.preview.toLowerCase().includes(normalizedQuery) ||
        template.content.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesTone && matchesChannel && matchesQuery;
    });
  }, [category, channel, query, tone]);

  return (
    <div className="space-y-6">
      <Card className="dark:text-slate-100">
        <Badge>Biblioteca comercial</Badge>
        <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">Plantillas para responder mejor</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Ahora puedes buscar, filtrar por tono/canal y copiar cada plantilla con feedback inmediato.</p>
      </Card>
      <SearchBar
        query={query}
        category={category}
        categories={messageCategories}
        onQueryChange={setQuery}
        onCategoryChange={setCategory}
      />
      <AdvancedFilters
        tone={tone}
        channel={channel}
        tones={messageTones}
        channels={messageChannels}
        onToneChange={setTone}
        onChannelChange={setChannel}
        onReset={() => {
          setTone('Todas');
          setChannel('Todos');
          setCategory('Todas');
          setQuery('');
        }}
      />
      <p className="text-sm text-slate-500 dark:text-slate-400">{filteredTemplates.length} plantilla(s) disponibles con los filtros actuales.</p>
      <MessageList templates={filteredTemplates} />
    </div>
  );
}
