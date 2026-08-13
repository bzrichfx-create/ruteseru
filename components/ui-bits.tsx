'use client';

import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

export function SectionHeading({ eyebrow, title, highlight, subtitle, className }: { eyebrow?: string; title: string; highlight?: string; subtitle?: string; className?: string }) {
  return (
    <div className={cn('text-center max-w-2xl mx-auto mb-12', className)}>
      {eyebrow && (
        <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-block px-4 py-1.5 bg-rute-pink/10 text-rute-pink font-semibold text-sm rounded-full mb-3 font-display">
          {eyebrow}
        </motion.span>
      )}
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
        {title}{' '}
        {highlight && (
          <span className="relative inline-block text-rute-pink">
            {highlight}
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
              <path d="M2 9C50 3 150 3 198 7" stroke="#FFD93D" strokeWidth="4" strokeLinecap="round"/>
            </svg>
          </span>
        )}
      </motion.h2>
      {subtitle && (
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-4 text-muted-foreground text-base md:text-lg">
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

export function SeatBadge({ remaining }: { remaining: number }) {
  if (remaining > 3) return null;
  return (
    <div className="absolute top-3 right-3 z-20 animate-blink">
      <div className="bg-rute-pink text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg font-display flex items-center gap-1">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
        Sisa {remaining} Seat Lagi!
      </div>
    </div>
  );
}

export function PopularBadge() {
  return (
    <div className="absolute top-3 left-3 z-20">
      <div className="bg-rute-yellow text-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-lg font-display flex items-center gap-1">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        Popular
      </div>
    </div>
  );
}

export const fadeUp: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeUp} transition={{ duration: 0.5, delay }} className={className}>
      {children}
    </motion.div>
  );
}

export function getDaysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function formatDateRange(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  if (s.getMonth() === e.getMonth()) {
    return `${s.getDate()}–${e.getDate()} ${months[s.getMonth()]} ${e.getFullYear()}`;
  }
  return `${s.getDate()} ${months[s.getMonth()]} – ${e.getDate()} ${months[e.getMonth()]} ${e.getFullYear()}`;
}

export function formatPrice(priceK: number): string {
  return `Rp ${priceK.toLocaleString('id-ID')}K`;
}
