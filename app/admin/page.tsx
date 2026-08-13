'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Star, Image as ImageIcon, Users, Settings, ArrowRight, TrendingUp } from 'lucide-react';
import { useCMS } from '@/lib/cms';

export default function AdminDashboardPage() {
  const { data } = useCMS();

  const stats = [
    { label: 'Total Trip', value: data.trips.length, icon: Calendar, color: 'from-rute-pink to-rute-pink-dark', href: '/admin/trips' },
    { label: 'Destinasi', value: data.destinations.length, icon: MapPin, color: 'from-rute-ocean to-rute-ocean-dark', href: '/admin/destinations' },
    { label: 'Testimoni', value: data.testimonials.length, icon: Star, color: 'from-rute-yellow to-rute-yellow-dark', href: '/admin/testimonials' },
    { label: 'Foto Galeri', value: data.galleryItems.length, icon: ImageIcon, color: 'from-rute-turquoise to-rute-turquoise-dark', href: '/admin/gallery' },
    { label: 'Anggota Tim', value: data.team.length, icon: Users, color: 'from-rute-pink to-rute-ocean', href: '/admin/team' },
  ];

  const upcomingTrips = [...data.trips]
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 5);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-foreground mb-1">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Selamat datang di panel admin Rute Seru!</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link href={s.href} className={`block bg-gradient-to-br ${s.color} text-white rounded-2xl p-4 card-shadow hover:-translate-y-1 transition-transform`}>
              <s.icon size={24} className="mb-2" />
              <div className="font-display font-bold text-3xl">{s.value}</div>
              <div className="text-xs text-white/80 font-medium">{s.label}</div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border-2 border-rute-cream-dark p-5 card-shadow">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={20} className="text-rute-pink" />
            <h2 className="font-display font-bold text-lg text-foreground">Trip Terdekat</h2>
          </div>
          <div className="space-y-2">
            {upcomingTrips.map((trip) => (
              <div key={trip.id} className="flex items-center gap-3 p-3 rounded-xl bg-rute-cream/50 hover:bg-rute-cream transition-colors">
                <img src={trip.image} alt={trip.name} className="w-12 h-12 rounded-xl object-cover border-2 border-rute-cream-dark" />
                <div className="flex-1 min-w-0">
                  <div className="font-display font-bold text-sm text-foreground truncate">{trip.name}</div>
                  <div className="text-xs text-muted-foreground">{trip.startDate} • {trip.filledSeats}/{trip.totalSeats} seat</div>
                </div>
                <span className="text-sm font-bold text-rute-ocean whitespace-nowrap">{trip.price > 0 ? `Rp ${trip.price}K` : ''}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border-2 border-rute-cream-dark p-5 card-shadow">
          <h2 className="font-display font-bold text-lg text-foreground mb-4">Akses Cepat</h2>
          <div className="space-y-2">
            <Link href="/admin/trips" className="flex items-center justify-between p-3 rounded-xl bg-rute-cream/50 hover:bg-rute-cream transition-colors group">
              <span className="font-display font-semibold text-sm text-foreground">Kelola Trip</span>
              <ArrowRight size={18} className="text-rute-pink group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/admin/destinations" className="flex items-center justify-between p-3 rounded-xl bg-rute-cream/50 hover:bg-rute-cream transition-colors group">
              <span className="font-display font-semibold text-sm text-foreground">Kelola Destinasi</span>
              <ArrowRight size={18} className="text-rute-pink group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/admin/settings" className="flex items-center justify-between p-3 rounded-xl bg-rute-cream/50 hover:bg-rute-cream transition-colors group">
              <span className="font-display font-semibold text-sm text-foreground">Pengaturan Website</span>
              <ArrowRight size={18} className="text-rute-pink group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/" target="_blank" className="flex items-center justify-between p-3 rounded-xl bg-rute-cream/50 hover:bg-rute-cream transition-colors group">
              <span className="font-display font-semibold text-sm text-foreground">Lihat Website</span>
              <ArrowRight size={18} className="text-rute-pink group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
