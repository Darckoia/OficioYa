import type { Metadata } from 'next';

const siteName = 'OficioYa';
const siteUrl = 'https://oficioya.app';
const defaultDescription = 'Plataforma demo para vender mejor por WhatsApp con chat, vitrinas y mensajes reutilizables.';

export function absoluteUrl(path = '/') {
  return new URL(path, siteUrl).toString();
}

export function buildMetadata({
  title,
  description = defaultDescription,
  path = '/'
}: {
  title: string;
  description?: string;
  path?: string;
}): Metadata {
  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    applicationName: siteName,
    keywords: ['WhatsApp', 'ventas', 'pymes', 'Chile', 'vitrina digital', 'mensajes comerciales'],
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName,
      locale: 'es_CL',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    },
    alternates: {
      canonical: absoluteUrl(path)
    },
    icons: {
      icon: '/icons/oficioya-mark.svg'
    },
    manifest: '/site.webmanifest'
  };
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: siteName,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: siteUrl,
  description: defaultDescription,
  areaServed: 'CL',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'CLP'
  }
};
