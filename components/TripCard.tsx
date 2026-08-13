'use client';

import { motion } from 'framer-motion';
import { Check, X, Clock, MapPin, Users } from 'lucide-react';
import type { CMSTrip } from '@/lib/cms';
import { useCMS } from '@/lib/cms';
import { SeatBadge, PopularBadge, getDaysUntil, formatDateRange, formatPrice } from '@/components/ui-bits';

export default function TripCard({ trip, index = 0 }: { trip: CMSTrip; index?: number }) {
  const { data } = useCMS();
  const days = getDaysUntil(trip.startDate);
  const filledPct = Math.round((trip.filledSeats / trip.totalSeats) * 100);
  const remaining = trip.totalSeats - trip.filledSeats;
  const waText = `Halo Mimin Rute Seru, mau daftar Open Trip ${trip.name} (${formatDateRange(trip.startDate, trip.endDate)}) untuk 1 orang`;

  return (
    <motion.article initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: index * 0.08 }} className="group relative bg-white rounded-3xl overflow-hidden card-shadow border-2 border-rute-cream-dark hover:-translate-y-1 transition-transform">
      <div className="relative h-52 overflow-hidden">
        <img src={trip.image} alt={trip.destination} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {trip.popular && <PopularBadge />}
        <SeatBadge remaining={remaining} />
        <div className="absolute bottom-3 left-3"><span className="bg-white/90 backdrop-blur text-foreground text-xs font-bold px-3 py-1 rounded-full font-display">{trip.region}</span></div>
      </div>

      <div className="p-5">
        <h3 className="font-display font-bold text-xl text-foreground mb-1">{trip.name}</h3>
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3"><MapPin size={14} className="text-rute-pink" />{trip.destination}</div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-foreground">{formatDateRange(trip.startDate, trip.endDate)}</span>
          <span className="text-xs bg-rute-yellow/20 text-rute-yellow-dark font-bold px-2.5 py-1 rounded-full flex items-center gap-1"><Clock size={12} />{days} hari lagi</span>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="flex items-center gap-1 text-muted-foreground font-medium"><Users size={12} />{trip.filledSeats}/{trip.totalSeats} seat terisi</span>
            <span className="font-bold text-rute-pink">{remaining} tersisa</span>
          </div>
          <div className="h-2.5 bg-rute-cream rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} whileInView={{ width: `${filledPct}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className={`h-full rounded-full ${filledPct > 85 ? 'bg-rute-pink' : 'bg-rute-turquoise'}`} />
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="font-display font-bold text-2xl text-rute-ocean">{formatPrice(trip.price)}</span>
          <span className="text-xs text-muted-foreground">/pax</span>
        </div>

        <div className="space-y-1.5 mb-4">
          {trip.includes.slice(0, 4).map((inc) => (
            <div key={inc} className="flex items-center gap-2 text-sm text-foreground">
              <span className="w-5 h-5 bg-rute-turquoise/15 rounded-full flex items-center justify-center shrink-0"><Check size={12} className="text-rute-turquoise-dark" /></span>
              {inc}
            </div>
          ))}
          {trip.excludes.slice(0, 1).map((exc) => (
            <div key={exc} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-5 h-5 bg-rute-pink/10 rounded-full flex items-center justify-center shrink-0"><X size={12} className="text-rute-pink" /></span>
              {exc}
            </div>
          ))}
        </div>

        <a href={`https://wa.me/${data.settings.contacts.melina.wa}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-rute-pink hover:bg-rute-pink-dark text-white text-center font-bold py-3 rounded-2xl btn-3d font-display transition-colors">Amankan Seat Sekarang</a>
      </div>
    </motion.article>
  );
}
