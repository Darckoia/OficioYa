import { ReactNode } from 'react';

type BadgeProps = {
  children: ReactNode;
  tone?: 'brand' | 'success' | 'neutral';
};

const tones = {
  brand: 'bg-brand-50 text-brand-700',
  success: 'bg-emerald-50 text-emerald-700',
  neutral: 'bg-slate-100 text-slate-700'
};

export function Badge({ children, tone = 'brand' }: BadgeProps) {
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${tones[tone]}`}>{children}</span>;
}
