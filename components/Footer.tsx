'use client';

import Link from 'next/link';
import { Instagram, Music2, MapPin, MessageCircle, Mail, Heart } from 'lucide-react';
import { useCMS } from '@/lib/cms';

export default function Footer() {
  const { data } = useCMS();
  const { settings } = data;

  return (
    <footer className="relative z-10 mt-16 lg:mt-20">
      <div className="relative -mb-1">
        <svg viewBox="0 0 1440 80" className="w-full h-12 md:h-20" preserveAspectRatio="none">
          <path d="M0 40 C 240 80 480 0 720 30 C 960 60 1200 10 1440 40 L 1440 80 L 0 80 Z" fill="#FF4D8D" />
          <path d="M0 50 C 240 90 480 10 720 40 C 960 70 1200 20 1440 50 L 1440 80 L 0 80 Z" fill="#E63973" opacity="0.5" />
        </svg>
      </div>

      <div className="bg-rute-pink-dark text-white pt-12 pb-24 lg:pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-1">
              <div className="font-display font-bold text-2xl mb-2">{settings.brandName.split(' ')[0]} <span className="text-rute-yellow">{settings.brandName.split(' ')[1] || ''}</span></div>
              <p className="text-white/80 text-sm leading-relaxed">{settings.tagline}. Open Trip & Private Trip ramah hijab, anti ribet. Tinggal bawa badan & bestie!</p>
            </div>

            <div>
              <h4 className="font-display font-bold text-lg mb-3 text-rute-yellow">Jelajah</h4>
              <ul className="space-y-2 text-sm">
                {settings.navMenu.map((item) => (
                  <li key={item.href}><Link href={item.href} className="text-white/80 hover:text-white transition-colors">{item.label}</Link></li>
                ))}
                <li><Link href="/kontak" className="text-white/80 hover:text-white transition-colors">Kontak & Booking</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-lg mb-3 text-rute-yellow">Hubungi Mimin</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-white/80"><MessageCircle size={16} className="shrink-0" /> {settings.contacts.melina.name} & {settings.contacts.maria.name}</li>
                <li className="text-white/80 pl-6">{settings.contacts.melina.phone}</li>
                <li className="flex items-center gap-2 text-white/80"><Mail size={16} className="shrink-0" /> {settings.socialLinks.email}</li>
                <li className="flex items-start gap-2 text-white/80"><MapPin size={16} className="shrink-0 mt-0.5" /> {settings.mepoAddress}</li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-lg mb-3 text-rute-yellow">Ikutan Seru-seruan</h4>
              <div className="flex gap-3 mb-4">
                <a href={`https://instagram.com/${settings.socialLinks.instagram.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-white/15 hover:bg-rute-yellow hover:text-foreground rounded-full flex items-center justify-center transition-colors" aria-label="Instagram"><Instagram size={20} /></a>
                <a href={`https://tiktok.com/@${settings.socialLinks.tiktok}`} target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-white/15 hover:bg-rute-turquoise hover:text-white rounded-full flex items-center justify-center transition-colors" aria-label="TikTok"><Music2 size={20} /></a>
                <a href={`https://wa.me/${settings.contacts.melina.wa}`} target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-white/15 hover:bg-rute-ocean hover:text-white rounded-full flex items-center justify-center transition-colors" aria-label="WhatsApp"><MessageCircle size={20} /></a>
              </div>
              <div className="bg-white/10 rounded-2xl p-3 text-sm">
                <div className="font-display font-bold text-rute-yellow mb-1">Loyalty Card</div>
                <p className="text-white/70 text-xs">Kumpulkan {settings.loyaltyConfig.totalStamps} stamp, dapat gift special!</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/70">
            <p>© 2022–2026 {settings.brandName}. Made with <Heart size={14} className="inline text-rute-yellow fill-rute-yellow" /> untuk para traveler.</p>
            <p className="text-xs">{settings.footerText}</p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <a href="https://webplasa.com" target="_blank" rel="noopener noreferrer" className="text-xs text-white/60 hover:text-rute-yellow transition-colors font-medium">Design &amp; Develop by webplasa.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
