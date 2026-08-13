'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Check } from 'lucide-react';
import { useCMS } from '@/lib/cms';
import { SectionHeading, Reveal } from '@/components/ui-bits';
import { cn } from '@/lib/utils';

export default function DestinasiPage() {
  const { data } = useCMS();
  const { destinations } = data;
  const [selected, setSelected] = useState<string | null>(null);
  const selectedDest = destinations.find((d) => d.id === selected);

  return (
    <div className="overflow-hidden">
      <section className="relative pt-10 pb-16 px-4">
        <div className="absolute inset-0 -z-10 bg-rute-ocean">
          <div className="absolute top-10 left-[10%] w-72 h-72 bg-rute-turquoise/30 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 right-[10%] w-80 h-80 bg-rute-pink/25 rounded-full blur-3xl animate-float-mid" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 -z-10">
          <svg viewBox="0 0 1440 80" className="w-full h-16" preserveAspectRatio="none"><path d="M0 40 C 240 80 480 10 720 40 C 960 70 1200 20 1440 50 L 1440 80 L 0 80 Z" fill="#FFF8E8" /></svg>
        </div>
        <div className="max-w-4xl mx-auto text-center text-white relative">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display font-bold text-4xl md:text-6xl mb-4">Destinasi Seru</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-lg text-white/90">Klik pin di peta untuk lihat detail destinasi. Dari Karimun Jawa sampai Dieng, semua ada!</motion.p>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-white rounded-3xl p-6 md:p-10 card-shadow border-2 border-rute-cream-dark">
            <h2 className="font-display font-bold text-xl text-center mb-6 text-foreground">Peta Destinasi {data.settings.brandName}</h2>
            <div className="relative w-full aspect-[4/3] bg-rute-cream rounded-2xl overflow-hidden border-2 border-rute-cream-dark">
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, #00D1C1 0%, transparent 40%), radial-gradient(circle at 70% 60%, #0066FF 0%, transparent 40%)' }} />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 75" preserveAspectRatio="none">
                <path d="M30 35 L38 25 L42 30 L40 45 L35 55 L32 50 Z" fill="#FFD93D" opacity="0.6" stroke="#E6B800" strokeWidth="0.3" />
                <path d="M44 48 L58 50 L60 53 L58 57 L50 58 L45 55 Z" fill="#FF4D8D" opacity="0.5" stroke="#E63973" strokeWidth="0.3" />
                <path d="M55 25 L65 22 L68 30 L65 38 L58 40 L55 35 Z" fill="#00D1C1" opacity="0.5" stroke="#00A89B" strokeWidth="0.3" />
                <path d="M70 28 L75 25 L77 32 L73 35 L75 40 L72 45 L70 38 Z" fill="#0066FF" opacity="0.4" stroke="#0047B3" strokeWidth="0.3" />
                <path d="M82 30 L92 28 L95 35 L90 42 L85 40 Z" fill="#FFD93D" opacity="0.4" stroke="#E6B800" strokeWidth="0.3" />
              </svg>
              {destinations.map((dest) => (
                <button key={dest.id} onClick={() => setSelected(dest.id)} className="absolute z-10 group" style={{ left: `${dest.mapX}%`, top: `${dest.mapY}%`, transform: 'translate(-50%, -100%)' }}>
                  <motion.div whileHover={{ scale: 1.3, y: -4 }} whileTap={{ scale: 0.9 }} className="relative">
                    <span className="absolute inset-0 rounded-full bg-rute-pink/30 animate-pulse-ring" />
                    <div className={cn('relative w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-colors', selected === dest.id ? 'bg-rute-ocean' : 'bg-rute-pink')}><MapPin size={16} className="text-white" /></div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap"><span className={cn('text-[10px] md:text-xs font-bold font-display px-2 py-0.5 rounded-full shadow-sm transition-opacity', selected === dest.id ? 'bg-rute-ocean text-white' : 'bg-white text-foreground')}>{dest.name}</span></div>
                  </motion.div>
                </button>
              ))}
              <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground">Klik pin untuk detail</div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="Explore" title="Semua" highlight="Destinasi" subtitle="Setiap tempat punya cerita dan keunikan sendiri. Mau mulai dari mana?" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest, i) => (
              <Reveal key={dest.id} delay={i * 0.06}>
                <button onClick={() => setSelected(dest.id)} className="group relative w-full text-left bg-white rounded-3xl overflow-hidden card-shadow border-2 border-rute-cream-dark hover:-translate-y-1 transition-transform">
                  <div className="relative h-48 overflow-hidden">
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3"><span className="bg-white/90 text-foreground text-xs font-bold px-2.5 py-1 rounded-full font-display">{dest.region}</span><h3 className="font-display font-bold text-xl text-white mt-2">{dest.name}</h3></div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">{dest.description}</p>
                    <div className="flex items-center gap-1 mt-3 text-rute-pink font-bold text-sm font-display">Lihat Detail<motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span></div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedDest && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.8, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 30 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto card-shadow relative">
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 z-20 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-rute-cream transition-colors"><X size={20} /></button>
              <div className="relative h-56 md:h-64 overflow-hidden rounded-t-3xl">
                <img src={selectedDest.image} alt={selectedDest.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 text-white"><span className="bg-rute-pink text-white text-xs font-bold px-3 py-1 rounded-full font-display">{selectedDest.region}</span><h2 className="font-display font-bold text-3xl mt-2">{selectedDest.name}</h2></div>
              </div>
              <div className="p-6">
                <p className="text-foreground/80 leading-relaxed mb-6">{selectedDest.description}</p>
                <h3 className="font-display font-bold text-lg text-foreground mb-3">Highlight Trip:</h3>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {selectedDest.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-sm text-foreground"><span className="w-6 h-6 bg-rute-turquoise/15 rounded-full flex items-center justify-center shrink-0"><Check size={14} className="text-rute-turquoise-dark" /></span>{h}</div>
                  ))}
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-3">Galeri:</h3>
                <div className="grid grid-cols-3 gap-2">
                  {selectedDest.gallery.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden"><img src={img} alt={`${selectedDest.name} ${idx + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform" /></div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
