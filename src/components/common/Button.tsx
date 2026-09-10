import Link from 'next/link';
import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  href?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
};

const styles = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700',
  secondary: 'bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-white dark:ring-slate-700 dark:hover:bg-slate-800',
  ghost: 'bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-950/50 dark:text-brand-200 dark:hover:bg-brand-900/60'
};

export function Button({
  children,
  href,
  type = 'button',
  onClick,
  variant = 'primary',
  className = ''
}: ButtonProps) {
  const baseClassName = `inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200 ${styles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClassName}>
      {children}
    </button>
  );
}
