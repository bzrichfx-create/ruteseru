'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Play } from 'lucide-react';
import { useCMS } from '@/lib/cms';
import { cn } from '@/lib/utils';

export default function GaleriPage() {
  const { data } = useCMS();
  const { galleryItems, settings } = data;
  const [filter, setFilter] = useState('Semua');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(galleryItems.map((g) => g.category)));
    return ['Semua', ...cats];
  }, [galleryItems]);

  const filtered = filter === 'Semua' ? galleryItems : galleryItems.filter((g) => g.category === filter);

  return (
    <div className="overflow-hidden">
      <section className="relative pt-10 pb-16 px-4">
        <div className="absolute inset-0 -z-10 bg-rute-yellow">
          <div className="absolute top-10 right-[10%] w-72 h-72 bg-rute-pink/30 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 left-[10%] w-80 h-80 bg-rute-ocean/25 rounded-full blur-3xl animate-float-mid" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 -z-10">
          <svg viewBox="0 0 1440 80" className="w-full h-16" preserveAspectRatio="none"><path d="M0 40 C 240 80 480 10 720 40 C 960 70 1200 20 1440 50 L 1440 80 L 0 80 Z" fill="#FFF8E8" /></svg>
        </div>
        <div className="max-w-4xl mx-auto text-center text-foreground relative">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display font-bold text-4xl md:text-6xl mb-4">Galeri Seru</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-lg text-foreground/70">Momen-momen happy bareng traveler {settings.brandName}. Banyak senyum, kayak transparan, dan sarung pantai warna-warni!</motion.p>
        </div>
      </section>

      <section className="px-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className={cn('px-4 py-2 rounded-full font-display font-bold text-sm transition-all border-2', filter === cat ? 'bg-rute-pink text-white border-rute-pink-dark btn-3d' : 'bg-white text-foreground border-rute-cream-dark hover:border-rute-pink/40')}>{cat}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {filtered.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05, duration: 0.4 }} className="relative group break-inside-avoid rounded-2xl overflow-hidden card-shadow border-2 border-white">
                  <img src={item.image} alt={item.caption} className={cn('w-full object-cover', item.span === 'tall' && 'h-80', item.span === 'wide' && 'h-48', item.span === 'normal' && 'h-56')} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                    <p className="text-white text-xs font-medium">{item.caption}</p>
                    <div className="flex items-center gap-1 mt-1"><Heart size={12} className="text-rute-pink fill-rute-pink" /><span className="text-white/80 text-[10px]">{item.category}</span></div>
                  </div>
                  {i % 4 === 0 && <div className="absolute top-3 right-3 w-8 h-8 bg-white/30 backdrop-blur rounded-full flex items-center justify-center"><Play size={14} className="text-white fill-white" /></div>}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          {filtered.length === 0 && <div className="text-center py-20"><p className="text-muted-foreground text-lg">Belum ada foto untuk kategori ini.</p></div>}
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl p-8 card-shadow border-2 border-rute-cream-dark">
            <h2 className="font-display font-bold text-2xl text-foreground mb-3">Mau Foto Cakep Juga?</h2>
            <p className="text-muted-foreground mb-5">Ikutan trip {settings.brandName}, foto dan reels ready. Tinggal upload ke medsos, auto viral!</p>
            <a href={`https://wa.me/${settings.contacts.melina.wa}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-rute-pink hover:bg-rute-pink-dark text-white font-bold px-6 py-3 rounded-2xl btn-3d font-display transition-colors"><Heart size={18} className="fill-white" />Ikut Trip Seru Sekarang</a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
