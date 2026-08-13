'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Info } from 'lucide-react';
import { useCMS } from '@/lib/cms';
import TripCard from '@/components/TripCard';
import { cn } from '@/lib/utils';

const FILTERS = ['Semua', 'Jawa', 'Sumatera', 'Sulawesi', 'One Day Trip'];

export default function JadwalPage() {
  const { data } = useCMS();
  const { trips, settings } = data;
  const [filter, setFilter] = useState<string>('Semua');
  const filtered = filter === 'Semua' ? trips : trips.filter((t) => t.region === filter);

  return (
    <div className="overflow-hidden">
      <section className="relative pt-10 pb-16 px-4">
        <div className="absolute inset-0 -z-10 bg-rute-turquoise">
          <div className="absolute top-10 right-[10%] w-72 h-72 bg-rute-yellow/30 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 left-[5%] w-80 h-80 bg-rute-pink/25 rounded-full blur-3xl animate-float-mid" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 -z-10">
          <svg viewBox="0 0 1440 80" className="w-full h-16" preserveAspectRatio="none"><path d="M0 40 C 240 80 480 10 720 40 C 960 70 1200 20 1440 50 L 1440 80 L 0 80 Z" fill="#FFF8E8" /></svg>
        </div>
        <div className="max-w-4xl mx-auto text-center text-white relative">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display font-bold text-4xl md:text-6xl mb-4">Jadwal Open Trip</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-lg text-white/90 mb-2">Pilih trip seru, amankan seat, tinggal bawa badan!</motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold"><MapPin size={16} />Mepo: {settings.mepoAddress}</motion.div>
        </div>
      </section>

      <section className="px-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={cn('px-5 py-2.5 rounded-full font-display font-bold text-sm transition-all border-2', filter === f ? 'bg-rute-pink text-white border-rute-pink-dark btn-3d' : 'bg-white text-foreground border-rute-cream-dark hover:border-rute-pink/40')}>{f}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((trip, i) => <TripCard key={trip.id} trip={trip} index={i} />)}
            </motion.div>
          </AnimatePresence>
          {filtered.length === 0 && <div className="text-center py-20"><p className="text-muted-foreground text-lg">Belum ada trip untuk kategori ini. Cek lagi soon!</p></div>}
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-rute-ocean to-rute-turquoise rounded-3xl p-6 md:p-8 text-white card-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0"><Info size={24} /></div>
              <div>
                <h3 className="font-display font-bold text-xl mb-2">Info Mepo (Titik Kumpul)</h3>
                <p className="text-white/90 mb-1"><span className="font-semibold">{settings.mepoAddress}</span></p>
                <p className="text-white/80 text-sm mb-3">{settings.mepoNote}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">Dekat Angkot</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">Dekat Busway</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">Dekat Stasiun</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">Parkir Murah</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-rute-pink rounded-3xl p-8 text-white card-shadow">
            <h3 className="font-display font-bold text-2xl mb-3">Amankan Seat - Hubungi {settings.contacts.melina.name}/{settings.contacts.maria.name}</h3>
            <p className="text-white/90 mb-5">Fast respon, ramah, dan jelas. Chat aja, gak perlu malu!</p>
            <a href={`https://wa.me/${settings.contacts.melina.wa}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-rute-pink font-bold px-6 py-3 rounded-2xl btn-3d font-display"><Clock size={18} />{settings.contacts.melina.phone}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
