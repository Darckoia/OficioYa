'use client';

import { useTheme } from 'next-themes';
import { Toaster } from 'sonner';
import { toastConfig } from '@/config/toast-config';

export function Toast() {
  const { resolvedTheme } = useTheme();

  return <Toaster position="top-right" richColors theme={resolvedTheme === 'dark' ? 'dark' : 'light'} {...toastConfig} />;
}
