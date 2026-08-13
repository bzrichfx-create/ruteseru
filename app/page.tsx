'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, ArrowRight, Star, Sparkles, HeartHandshake, Camera, Award, Users, type LucideIcon } from 'lucide-react';
import { useCMS } from '@/lib/cms';
import TripCard from '@/components/TripCard';
import { SectionHeading, Reveal } from '@/components/ui-bits';

const ICONS: Record<string, LucideIcon> = {
  MapPin, HeartHandshake, Sparkles, Camera,
};

export default function HomePage() {
  const { data } = useCMS();
  const { settings, trips, testimonials } = data;

  const upcomingTrips = [...trips]
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 3);

  return (
    <div className="overflow-hidden">
      {/* ===== HERO ===== */}
      <section className="relative pt-8 pb-20 md:pt-12 md:pb-32 px-4">
        <div className="absolute inset-0 -z-10 overflow-hidden bg-rute-pink">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,#FFD93D_0%,transparent_36%),radial-gradient(circle_at_82%_20%,#00D1C1_0%,transparent_38%),radial-gradient(circle_at_58%_86%,#0066FF_0%,transparent_34%),linear-gradient(125deg,#FF4D8D_5%,#FFD93D_52%,#00D1C1_100%)]" />
          <div className="absolute inset-0 bg-grain opacity-20 mix-blend-overlay" />
          <div className="absolute -top-16 left-[12%] h-72 w-72 rounded-full bg-rute-yellow/50 blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 right-[5%] h-96 w-96 rounded-full bg-rute-turquoise/40 blur-3xl animate-float-mid" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 -z-10">
          <svg viewBox="0 0 1440 100" className="w-full h-16 md:h-24" preserveAspectRatio="none">
            <path d="M0 50 C 240 100 480 20 720 50 C 960 80 1200 30 1440 60 L 1440 100 L 0 100 Z" fill="#FFF8E8"/>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto text-center relative">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-6 border-2 border-rute-pink/20">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-rute-pink opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rute-pink" />
            </span>
            <span className="font-display font-semibold text-sm text-foreground">Open Trip & Private Trip Ramah Hijab</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] mb-6 max-w-4xl mx-auto">
            {settings.heroHeadline.split('Menikmati')[0]}{' '}
            <span className="relative inline-block">
              <span className="text-rute-pink">Menikmati</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none"><path d="M2 9C50 3 150 3 198 7" stroke="#0066FF" strokeWidth="4" strokeLinecap="round"/></svg>
            </span>{' '}
            Perjalanan
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-lg md:text-xl text-foreground/70 mb-10 max-w-2xl mx-auto font-medium">
            {settings.heroSubtitle}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-3xl shadow-xl border-2 border-rute-cream-dark p-2 max-w-2xl mx-auto flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-rute-cream rounded-2xl">
              <MapPin size={18} className="text-rute-pink shrink-0" />
              <select className="bg-transparent outline-none w-full text-foreground font-medium text-sm">
                <option value="">Pilih Destinasi</option>
                {data.destinations.map((d) => <option key={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-rute-cream rounded-2xl">
              <Calendar size={18} className="text-rute-ocean shrink-0" />
              <select className="bg-transparent outline-none w-full text-foreground font-medium text-sm">
                <option value="">Pilih Bulan</option>
                <option>September 2026</option><option>Oktober 2026</option><option>November 2026</option><option>Desember 2026</option><option>Januari 2027</option>
              </select>
            </div>
            <Link href="/jadwal" className="flex items-center justify-center gap-2 bg-rute-pink hover:bg-rute-pink-dark text-white font-bold px-6 py-3 rounded-2xl btn-3d font-display transition-colors whitespace-nowrap">
              <Search size={18} /> Cari Trip Seru
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-10">
            {settings.stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display font-bold text-2xl md:text-3xl text-foreground">{s.value}</div>
                <div className="text-xs md:text-sm text-foreground/60 font-medium">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== TRIP TERDEKAT ===== */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="Jangan Sampai Kehabisan!" title="Trip" highlight="Terdekat" subtitle="Pilih tanggal, amankan seat, berangkat bareng bestie. Gampang kan?" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingTrips.map((trip, i) => <TripCard key={trip.id} trip={trip} index={i} />)}
          </div>
          <div className="text-center mt-10">
            <Link href="/jadwal" className="inline-flex items-center gap-2 bg-rute-ocean hover:bg-rute-ocean-dark text-white font-bold px-6 py-3 rounded-2xl btn-3d font-display transition-colors">
              Lihat Semua Jadwal Trip <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== KENAPA RUTE SERU ===== */}
      <section className="py-16 px-4 bg-white relative">
        <div className="absolute top-0 left-0 right-0 -z-0">
          <svg viewBox="0 0 1440 60" className="w-full h-10" preserveAspectRatio="none"><path d="M0 30 C 240 60 480 0 720 30 C 960 60 1200 0 1440 30 L 1440 0 L 0 0 Z" fill="#FFF8E8"/></svg>
        </div>
        <div className="max-w-7xl mx-auto pt-10">
          <SectionHeading eyebrow="Kenapa Pilih Kami?" title="Kenapa" highlight="Rute Seru?" subtitle="Bukan cuma trip, tapi pengalaman seru yang aman, ramah, dan berkesan." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {settings.whyUs.map((item, i) => {
              const Icon = ICONS[item.icon] || Sparkles;
              const colors = [
                { bg: 'bg-rute-pink/10', text: 'text-rute-pink', ring: 'border-rute-pink/20' },
                { bg: 'bg-rute-turquoise/10', text: 'text-rute-turquoise-dark', ring: 'border-rute-turquoise/20' },
                { bg: 'bg-rute-yellow/15', text: 'text-rute-yellow-dark', ring: 'border-rute-yellow/30' },
                { bg: 'bg-rute-ocean/10', text: 'text-rute-ocean', ring: 'border-rute-ocean/20' },
              ];
              const c = colors[i % colors.length];
              return (
                <Reveal key={item.title} delay={i * 0.1}>
                  <div className={`bg-white rounded-3xl p-6 border-2 ${c.ring} card-shadow text-center h-full hover:-translate-y-1 transition-transform`}>
                    <div className={`w-16 h-16 ${c.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}><Icon size={28} className={c.text} /></div>
                    <h3 className="font-display font-bold text-lg text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONI ===== */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="Kata Mereka" title="Cerita" highlight="Traveler Happy" subtitle="Ribuan traveler sudah ikut seru-seruan bareng Rute Seru. Ini cerita mereka." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <Reveal key={t.id} delay={i * 0.1}>
                <div className="bg-white rounded-3xl p-6 card-shadow border-2 border-rute-cream-dark h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={t.photo} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-rute-pink" />
                    <div>
                      <div className="font-display font-bold text-foreground">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.location} • {t.trip}</div>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-3">{Array.from({ length: t.rating }).map((_, idx) => <Star key={idx} size={16} className="text-rute-yellow fill-rute-yellow" />)}</div>
                  <p className="text-sm text-foreground/80 leading-relaxed flex-1">"{t.text}"</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LOYALTY CARD CTA ===== */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="relative bg-gradient-to-br from-rute-ocean via-rute-pink to-rute-yellow rounded-3xl p-8 md:p-12 overflow-hidden card-shadow">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              <div className="relative grid md:grid-cols-2 gap-8 items-center">
                <div className="text-white">
                  <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full text-sm font-bold font-display mb-4"><Award size={16} /> Loyalty Card</div>
                  <h2 className="font-display font-bold text-3xl md:text-4xl mb-3 leading-tight">Kumpulkan {settings.loyaltyConfig.totalStamps} Stamp,<br />Dapat Gift Special!</h2>
                  <p className="text-white/90 mb-6">Setiap ikut Open Trip, kamu dapet 1 stamp. Kumpulin {settings.loyaltyConfig.totalStamps} stamp, unlock reward eksklusif!</p>
                  <Link href="/kontak" className="inline-flex items-center gap-2 bg-white text-rute-pink font-bold px-6 py-3 rounded-2xl btn-3d font-display hover:scale-105 transition-transform">
                    Lihat Detail Loyalty Card <ArrowRight size={18} />
                  </Link>
                </div>
                <div className="relative">
                  <div className="bg-white rounded-2xl p-5 shadow-2xl rotate-3 hover:rotate-0 transition-transform">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-display font-bold text-foreground">{settings.brandName}</div>
                      <Award className="text-rute-pink" size={24} />
                    </div>
                    <div className="grid grid-cols-5 gap-2 mb-3">
                      {Array.from({ length: settings.loyaltyConfig.totalStamps }).map((_, i) => (
                        <motion.div key={i} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08, type: 'spring' }} className={`aspect-square rounded-full flex items-center justify-center text-xs ${i < 7 ? 'bg-rute-pink text-white' : 'bg-rute-cream border-2 border-dashed border-rute-cream-dark'}`}>
                          {i < 7 ? '★' : ''}
                        </motion.div>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground text-center font-medium">7 dari {settings.loyaltyConfig.totalStamps} stamp terkumpul</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <div className="bg-white rounded-3xl p-8 md:p-12 card-shadow border-2 border-rute-cream-dark relative overflow-hidden">
              <div className="absolute top-4 right-4 text-rute-yellow animate-wiggle"><Sparkles size={32} /></div>
              <div className="absolute bottom-4 left-4 text-rute-pink animate-wiggle" style={{ animationDelay: '0.5s' }}><Users size={28} /></div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">Siap Berangkat Bareng Bestie?</h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">Chat mimin sekarang, amankan seat trip favoritmu. Fast respon, ramah, dan jelas!</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href={`https://wa.me/${settings.contacts.melina.wa}?text=${encodeURIComponent('Halo Mimin Rute Seru, mau tanya tentang trip!')}`} target="_blank" rel="noopener noreferrer" className="bg-rute-pink hover:bg-rute-pink-dark text-white font-bold px-6 py-3 rounded-2xl btn-3d font-display transition-colors">Chat Mimin Sekarang</a>
                <Link href="/jadwal" className="bg-rute-cream hover:bg-rute-cream-dark text-foreground font-bold px-6 py-3 rounded-2xl btn-3d font-display transition-colors">Lihat Jadwal Trip</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
