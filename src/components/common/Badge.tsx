import { ReactNode } from 'react';

type BadgeProps = {
  children: ReactNode;
  tone?: 'brand' | 'success' | 'neutral';
};

const tones = {
  brand: 'bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-200',
  success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200',
  neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
};

export function Badge({ children, tone = 'brand' }: BadgeProps) {
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${tones[tone]}`}>{children}</span>;
}
