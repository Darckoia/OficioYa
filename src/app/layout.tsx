import type { ReactNode } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Toast } from '@/components/ui/Toast';
import { rootMetadata } from '@/app/(root)/metadata';
import { organizationJsonLd } from '@/lib/seo';
import { ThemeProvider } from '@/providers/ThemeProvider';
import './globals.css';

export const metadata = rootMetadata;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toast />
        </ThemeProvider>
      </body>
    </html>
  );
}
