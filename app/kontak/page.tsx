'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, MapPin, Bus, Train, Car, Award, Check, Send, Star } from 'lucide-react';
import { useCMS } from '@/lib/cms';
import { SectionHeading, Reveal } from '@/components/ui-bits';

export default function KontakPage() {
  const { data } = useCMS();
  const { trips, settings } = data;
  const [form, setForm] = useState({ destinasi: '', tanggal: '', jumlah: '1', nama: '' });
  const waMessage = `Halo Mimin ${settings.brandName}, mau daftar Open Trip ${form.destinasi || '[DESTINASI]'} tanggal ${form.tanggal || '[TANGGAL]'} untuk ${form.jumlah} orang${form.nama ? ` atas nama ${form.nama}` : ''}`;
  const waLink = `https://wa.me/${settings.contacts.melina.wa}?text=${encodeURIComponent(waMessage)}`;

  const contactCards = [
    { ...settings.contacts.melina, role: 'Tour Leader & Booking', color: 'from-rute-pink to-rute-pink-dark' },
    { ...settings.contacts.maria, role: 'Tour Leader & Info', color: 'from-rute-ocean to-rute-ocean-dark' },
  ];

  return (
    <div className="overflow-hidden">
      <section className="relative pt-10 pb-16 px-4">
        <div className="absolute inset-0 -z-10 bg-rute-turquoise">
          <div className="absolute top-10 left-[15%] w-72 h-72 bg-rute-yellow/30 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 right-[10%] w-80 h-80 bg-rute-pink/25 rounded-full blur-3xl animate-float-mid" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 -z-10">
          <svg viewBox="0 0 1440 80" className="w-full h-16" preserveAspectRatio="none"><path d="M0 40 C 240 80 480 10 720 40 C 960 70 1200 20 1440 50 L 1440 80 L 0 80 Z" fill="#FFF8E8" /></svg>
        </div>
        <div className="max-w-4xl mx-auto text-center text-white relative">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display font-bold text-4xl md:text-6xl mb-4">Kontak & Booking</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-lg text-white/90">Chat mimin atau isi form booking. Gampang, cepat, dan jelas!</motion.p>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactCards.map((person) => (
              <Reveal key={person.name}>
                <a href={`https://wa.me/${person.wa}?text=${encodeURIComponent(`Halo Mimin ${settings.brandName}, mau tanya tentang trip!`)}`} target="_blank" rel="noopener noreferrer" className={`block bg-gradient-to-br ${person.color} text-white rounded-3xl p-6 card-shadow hover:-translate-y-1 transition-transform`}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shrink-0"><MessageCircle size={28} /></div>
                    <div>
                      <div className="font-display font-bold text-xl">{person.name}</div>
                      <div className="text-white/80 text-sm">{person.role}</div>
                      <div className="text-white font-bold mt-1">{person.phone}</div>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <div className="bg-white rounded-3xl p-6 md:p-8 card-shadow border-2 border-rute-cream-dark">
              <h2 className="font-display font-bold text-2xl text-foreground mb-2">Form Booking Cepat</h2>
              <p className="text-muted-foreground text-sm mb-6">Isi data, klik tombol, otomatis ke WA mimin. Praktis!</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1.5 font-display">Destinasi Trip</label>
                  <select value={form.destinasi} onChange={(e) => setForm({ ...form, destinasi: e.target.value })} className="w-full px-4 py-3 bg-rute-cream rounded-2xl border-2 border-rute-cream-dark outline-none focus:border-rute-pink transition-colors font-medium text-sm">
                    <option value="">Pilih Destinasi</option>
                    {trips.map((t) => <option key={t.id} value={t.name}>{t.name} — {t.destination}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1.5 font-display">Tanggal Keberangkatan</label>
                  <input type="date" value={form.tanggal} onChange={(e) => setForm({ ...form, tanggal: e.target.value })} className="w-full px-4 py-3 bg-rute-cream rounded-2xl border-2 border-rute-cream-dark outline-none focus:border-rute-pink transition-colors font-medium text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1.5 font-display">Jumlah Orang</label>
                  <div className="flex gap-2">
                    {['1', '2', '3', '4', '5+'].map((n) => (
                      <button key={n} onClick={() => setForm({ ...form, jumlah: n })} className={`flex-1 py-3 rounded-2xl font-bold font-display text-sm transition-all border-2 ${form.jumlah === n ? 'bg-rute-pink text-white border-rute-pink-dark' : 'bg-rute-cream text-foreground border-rute-cream-dark hover:border-rute-pink/40'}`}>{n}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1.5 font-display">Nama (opsional)</label>
                  <input type="text" placeholder="Nama kamu" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} className="w-full px-4 py-3 bg-rute-cream rounded-2xl border-2 border-rute-cream-dark outline-none focus:border-rute-pink transition-colors font-medium text-sm" />
                </div>
                <div className="bg-rute-cream rounded-2xl p-4 border-2 border-dashed border-rute-cream-dark">
                  <div className="text-xs font-bold text-muted-foreground mb-1 font-display">Preview Pesan WA:</div>
                  <p className="text-sm text-foreground/80 italic">"{waMessage}"</p>
                </div>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-rute-pink hover:bg-rute-pink-dark text-white font-bold py-4 rounded-2xl btn-3d font-display transition-colors text-lg"><Send size={20} />Kirim ke WhatsApp Mimin</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="bg-gradient-to-br from-rute-yellow via-rute-pink to-rute-ocean rounded-3xl p-8 md:p-10 text-white card-shadow relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              <div className="relative grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full text-sm font-bold font-display mb-4"><Award size={16} />Loyalty Card</div>
                  <h2 className="font-display font-bold text-3xl mb-3">Kumpulin {settings.loyaltyConfig.totalStamps} Stamp, Dapat Gift!</h2>
                  <p className="text-white/90 mb-4">Setiap ikut trip = 1 stamp. Kumpulin {settings.loyaltyConfig.totalStamps} stamp, unlock reward eksklusif!</p>
                  <div className="space-y-2">
                    {settings.loyaltyConfig.perks.map((perk, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm"><span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center shrink-0"><Check size={12} /></span>{perk}</div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-2xl -rotate-3 hover:rotate-0 transition-transform">
                  <div className="flex items-center justify-between mb-4"><div className="font-display font-bold text-foreground">{settings.brandName}</div><Award className="text-rute-pink" size={24} /></div>
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {Array.from({ length: settings.loyaltyConfig.totalStamps }).map((_, i) => (
                      <motion.div key={i} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06, type: 'spring' }} className={`aspect-square rounded-full flex items-center justify-center text-xs ${i < 7 ? 'bg-rute-pink text-white' : 'bg-rute-cream border-2 border-dashed border-rute-cream-dark'}`}>{i < 7 ? '★' : ''}</motion.div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-medium">7/{settings.loyaltyConfig.totalStamps} stamp</span>
                    <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} className="text-rute-yellow fill-rute-yellow" />)}</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="bg-white rounded-3xl p-6 md:p-8 card-shadow border-2 border-rute-cream-dark">
              <h2 className="font-display font-bold text-2xl text-foreground mb-2">Lokasi Mepo & Cara Kesana</h2>
              <p className="text-muted-foreground text-sm mb-5">{settings.mepoNote}</p>
              <div className="relative w-full h-64 rounded-2xl overflow-hidden border-2 border-rute-cream-dark mb-5">
                <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=106.835%2C-6.195%2C106.845%2C-6.180&layer=mapnik&marker=-6.1869%2C106.8406" className="w-full h-full" loading="lazy" title="Lokasi Mepo" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[{ icon: Car, title: 'Mobil', desc: 'Parkir murah di sekitar Kramat 5' }, { icon: Bus, title: 'Busway', desc: 'Halte Kramat Sentiong, jalan 5 menit' }, { icon: Train, title: 'Kereta', desc: 'Stasiun Gondangdia, jalan 10 menit' }].map((opt) => (
                  <div key={opt.title} className="bg-rute-cream rounded-2xl p-4 border-2 border-rute-cream-dark">
                    <div className="w-10 h-10 bg-rute-turquoise/15 rounded-xl flex items-center justify-center mb-2"><opt.icon size={20} className="text-rute-turquoise-dark" /></div>
                    <div className="font-display font-bold text-sm text-foreground">{opt.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{opt.desc}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-start gap-3 bg-rute-pink/5 rounded-2xl p-4 border-2 border-rute-pink/20">
                <MapPin size={20} className="text-rute-pink shrink-0 mt-0.5" />
                <div>
                  <div className="font-display font-bold text-foreground">{settings.mepoAddress}</div>
                  <div className="text-sm text-muted-foreground">Kumpul jam 23:30 WIB (sesuai jadwal trip)</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
