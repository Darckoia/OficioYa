import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/demo', '/demo/chat', '/demo/vitrine', '/demo/messages', '/demo/whatsapp'].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.7
  }));
}
