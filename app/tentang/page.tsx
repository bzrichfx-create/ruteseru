'use client';

import { motion } from 'framer-motion';
import { Heart, Shield, Clock, Smile, MapPin, Bus, Train, Car, Sparkles, type LucideIcon } from 'lucide-react';
import { useCMS } from '@/lib/cms';
import { SectionHeading, Reveal } from '@/components/ui-bits';

const ICON_MAP: Record<string, LucideIcon> = {
  Smile, Shield, Clock, Heart, Sparkles, MapPin, Bus, Train, Car,
};

export default function TentangPage() {
  const { data } = useCMS();
  const { settings, team } = data;

  return (
    <div className="overflow-hidden">
      <section className="relative pt-10 pb-16 px-4">
        <div className="absolute inset-0 -z-10 bg-rute-pink">
          <div className="absolute top-10 left-[15%] w-72 h-72 bg-rute-yellow/30 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 right-[10%] w-80 h-80 bg-rute-turquoise/25 rounded-full blur-3xl animate-float-mid" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 -z-10">
          <svg viewBox="0 0 1440 80" className="w-full h-16" preserveAspectRatio="none"><path d="M0 40 C 240 80 480 10 720 40 C 960 70 1200 20 1440 50 L 1440 80 L 0 80 Z" fill="#FFF8E8" /></svg>
        </div>
        <div className="max-w-4xl mx-auto text-center text-white relative">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display font-bold text-4xl md:text-6xl mb-4">Tentang Kami</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-lg text-white/90 max-w-2xl mx-auto">{settings.brandName} lahir dari kecintaan kami pada perjalanan. Bukan cuma sampai tujuan, tapi menikmati setiap momennya.</motion.p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="bg-white rounded-3xl p-8 md:p-12 card-shadow border-2 border-rute-cream-dark">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-rute-pink/10 rounded-2xl flex items-center justify-center"><Sparkles className="text-rute-pink" size={24} /></div>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">Cerita di Balik {settings.brandName}</h2>
              </div>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                {settings.aboutStory.map((s, idx) => (
                  <p key={idx}>{s.text}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 px-4 bg-white relative">
        <div className="absolute top-0 left-0 right-0"><svg viewBox="0 0 1440 60" className="w-full h-10" preserveAspectRatio="none"><path d="M0 30 C 240 60 480 0 720 30 C 960 60 1200 0 1440 30 L 1440 0 L 0 0 Z" fill="#FFF8E8" /></svg></div>
        <div className="max-w-7xl mx-auto pt-10">
          <SectionHeading eyebrow="Nilai Kami" title="Yang Kami" highlight="Junjung" subtitle="Hal-hal yang jadi pegangan setiap trip kami." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {settings.aboutValues.map((v, i) => {
              const Icon = ICON_MAP[v.icon] || Sparkles;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="bg-rute-cream rounded-3xl p-6 border-2 border-rute-cream-dark h-full hover:-translate-y-1 transition-transform">
                    <div className={`w-14 h-14 ${v.color} rounded-2xl flex items-center justify-center mb-4`}><Icon size={26} /></div>
                    <h3 className="font-display font-bold text-lg text-foreground mb-2">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="Tim Seru" title="Kenalan sama" highlight="Mimin" subtitle="Tim tour leader cewek yang ramah, sabar, dan asik. Siap nemenin trip kamu!" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <Reveal key={member.id} delay={i * 0.1}>
                <div className="bg-white rounded-3xl overflow-hidden card-shadow border-2 border-rute-cream-dark group">
                  <div className="relative h-64 overflow-hidden">
                    <img src={member.photo} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-display font-bold text-xl text-foreground">{member.name}</h3>
                    <div className="inline-block bg-rute-pink/10 text-rute-pink text-xs font-bold px-3 py-1 rounded-full mt-1 mb-3 font-display">{member.role}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden card-shadow border-4 border-white">
              <img src="https://images.pexels.com/photos/17041245/pexels-photo-17041245.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Tim Rute Seru di pantai" className="w-full h-[300px] md:h-[450px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4 bg-rute-pink text-white font-display font-bold px-4 py-2 rounded-xl shadow-lg rotate-3">{settings.brandName}</div>
              <div className="absolute bottom-6 left-6 right-6 text-white text-center"><p className="font-display font-bold text-xl md:text-2xl">"Bareng {settings.brandName}, semua jadi cerita seru!"</p></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="bg-gradient-to-br from-rute-turquoise to-rute-ocean rounded-3xl p-8 text-white card-shadow">
              <h3 className="font-display font-bold text-2xl mb-2">Info Mepo Baru</h3>
              <p className="text-white/90 mb-6">Lokasi kumpul yang nyaman, gampang diakses dari mana aja!</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[{ icon: Car, label: 'Parkir Murah' }, { icon: Bus, label: 'Dekat Busway' }, { icon: Train, label: 'Dekat Stasiun' }, { icon: MapPin, label: 'Dekat Angkot' }].map((item) => (
                  <div key={item.label} className="bg-white/15 rounded-2xl p-4 text-center"><item.icon size={28} className="mx-auto mb-2" /><div className="text-sm font-semibold">{item.label}</div></div>
                ))}
              </div>
              <div className="mt-6 bg-white/10 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-1"><MapPin size={18} /><span className="font-display font-bold">{settings.mepoAddress}</span></div>
                <p className="text-white/80 text-sm">{settings.mepoNote}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
