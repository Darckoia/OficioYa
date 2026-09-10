'use client';

import { toast } from 'sonner';

export function useToast() {
  return {
    notifySuccess: (message: string, description?: string) => toast.success(message, { description }),
    notifyError: (message: string, description?: string) => toast.error(message, { description }),
    notifyInfo: (message: string, description?: string) => toast(message, { description })
  };
}
