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
  secondary: 'bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50',
  ghost: 'bg-brand-50 text-brand-700 hover:bg-brand-100'
};

export function Button({
  children,
  href,
  type = 'button',
  onClick,
  variant = 'primary',
  className = ''
}: ButtonProps) {
  const baseClassName = `inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${styles[variant]} ${className}`;

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
