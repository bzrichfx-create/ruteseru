'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Menu, X, MessageCircle, Home, Calendar, MapPin, Info, Image as ImageIcon, type LucideIcon } from 'lucide-react';
import { useCMS } from '@/lib/cms';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, LucideIcon> = {
  '/': Home,
  '/jadwal': Calendar,
  '/destinasi': MapPin,
  '/tentang': Info,
  '/galeri': ImageIcon,
};

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { data } = useCMS();
  const { settings } = data;

  const navItems = settings.navMenu.map((item) => ({
    ...item,
    icon: ICON_MAP[item.href] || Home,
  }));

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-4 border-rute-pink shadow-md">
        <div className="absolute bottom-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-rute-pink" />
          <div className="flex-1 bg-rute-yellow" />
          <div className="flex-1 bg-rute-turquoise" />
          <div className="flex-1 bg-rute-ocean" />
        </div>

        <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }} className="relative w-10 h-10 md:w-12 md:h-12 rounded-2xl overflow-hidden border-2 border-white shadow-md rotate-6 group-hover:rotate-0">
              <Image src="/logo.jpg" alt="Logo Rute Seru" fill sizes="48px" className="object-cover mix-blend-screen" priority />
            </motion.div>
            <div className="leading-tight">
              <div className="font-display font-bold text-lg md:text-xl text-foreground">{settings.brandName.split(' ')[0]} <span className="text-rute-pink">{settings.brandName.split(' ')[1] || ''}</span></div>
              <div className="text-[10px] md:text-xs text-muted-foreground font-medium -mt-0.5">{settings.tagline}</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 bg-rute-cream rounded-full p-1.5 border-2 border-rute-cream-dark">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className={cn('relative px-4 py-2 rounded-full text-sm font-semibold font-display transition-colors', active ? 'text-white' : 'text-foreground hover:text-rute-pink')}>
                  {active && <motion.div layoutId="navPill" className="absolute inset-0 bg-rute-pink rounded-full" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <Link href="/kontak" className="hidden md:flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-rute-yellow to-rute-pink-light text-foreground rounded-full text-xs font-bold font-display border-2 border-white shadow-sm hover:scale-105 transition-transform">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V6h16v12z"/><circle cx="9" cy="12" r="2"/><circle cx="15" cy="12" r="2"/></svg>
              Loyalty Card
            </Link>
            <a href={`https://wa.me/${settings.contacts.melina.wa}?text=${encodeURIComponent('Halo Mimin Rute Seru, mau tanya tentang trip!')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-rute-pink hover:bg-rute-pink-dark text-white px-3 md:px-4 py-2 rounded-full text-sm font-bold font-display btn-3d transition-colors">
              <MessageCircle size={16} />
              <span className="hidden sm:inline">Tanya Mimin</span>
            </a>
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-foreground" aria-label="Menu">
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden overflow-hidden bg-white border-t border-rute-cream-dark">
              <nav className="flex flex-col p-4 gap-1">
                {navItems.map((item) => {
                  const active = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={cn('flex items-center gap-3 px-4 py-3 rounded-2xl font-display font-semibold transition-colors', active ? 'bg-rute-pink text-white' : 'text-foreground hover:bg-rute-cream')}>
                      <Icon size={20} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="relative z-40 -mt-1 h-6 overflow-hidden bg-white" aria-hidden="true">
        <svg viewBox="0 0 1440 48" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <path d="M0 18 C 120 42 240 42 360 18 C 480 -6 600 -6 720 18 C 840 42 960 42 1080 18 C 1200 -6 1320 -6 1440 18 V48 H0Z" fill="#FF4D8D" />
          <path d="M0 24 C 120 48 240 48 360 24 C 480 0 600 0 720 24 C 840 48 960 48 1080 24 C 1200 0 1320 0 1440 24 V48 H0Z" fill="#00D1C1" opacity="0.9" />
          <path d="M0 31 C 120 55 240 55 360 31 C 480 7 600 7 720 31 C 840 55 960 55 1080 31 C 1200 7 1320 7 1440 31 V48 H0Z" fill="#FFD93D" />
        </svg>
      </div>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-rute-cream-dark shadow-2xl pb-safe">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className={cn('flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-colors', active ? 'text-rute-pink' : 'text-muted-foreground')}>
                <div className={cn('p-1.5 rounded-xl', active && 'bg-rute-pink/10')}>
                  <Icon size={20} />
                </div>
                <span className="text-[10px] font-semibold font-display">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
