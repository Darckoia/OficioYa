'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Badge } from '@/components/common/Badge';
import { Card } from '@/components/common/Card';
import { cardHover, fadeInUp } from '@/styles/animations';

type DemoCardProps = {
  href: string;
  title: string;
  description: string;
  badge: string;
};

export function DemoCard({ href, title, description, badge }: DemoCardProps) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeInUp} {...cardHover}>
      <Card className="flex h-full flex-col justify-between dark:text-slate-100">
        <div>
          <Badge>{badge}</Badge>
          <h3 className="mt-4 text-xl font-semibold text-slate-950 dark:text-white">{title}</h3>
          <p className="mt-3 text-slate-600 dark:text-slate-300">{description}</p>
        </div>
        <Link href={href} className="mt-6 text-sm font-semibold text-brand-600 transition hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200">
          Abrir demo →
        </Link>
      </Card>
    </motion.div>
  );
}
