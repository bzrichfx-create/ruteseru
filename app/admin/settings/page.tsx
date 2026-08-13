'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, RotateCcw, Plus, X, Check } from 'lucide-react';
import { useCMS, type CMSSiteSettings } from '@/lib/cms';
import { cn } from '@/lib/utils';

const ICON_OPTIONS = ['MapPin', 'HeartHandshake', 'Sparkles', 'Camera', 'Smile', 'Shield', 'Clock', 'Heart', 'Star', 'Award', 'Users', 'Bus', 'Train', 'Car'];
const COLOR_OPTIONS = [
  'bg-rute-pink/10 text-rute-pink',
  'bg-rute-turquoise/10 text-rute-turquoise-dark',
  'bg-rute-yellow/15 text-rute-yellow-dark',
  'bg-rute-ocean/10 text-rute-ocean',
];

type TabId = 'brand' | 'hero' | 'nav' | 'stats' | 'whyus' | 'contacts' | 'social' | 'footer' | 'loyalty' | 'about';

const TABS: { id: TabId; label: string }[] = [
  { id: 'brand', label: 'Brand' },
  { id: 'hero', label: 'Hero' },
  { id: 'nav', label: 'Menu Navigasi' },
  { id: 'stats', label: 'Statistik' },
  { id: 'whyus', label: 'Kenapa Kami' },
  { id: 'contacts', label: 'Kontak' },
  { id: 'social', label: 'Sosial Media' },
  { id: 'footer', label: 'Footer' },
  { id: 'loyalty', label: 'Loyalty Card' },
  { id: 'about', label: 'Tentang Kami' },
];

export default function AdminSettingsPage() {
  const { data, updateSettings } = useCMS();
  const [form, setForm] = useState<CMSSiteSettings>(data.settings);
  const [activeTab, setActiveTab] = useState<TabId>('brand');
  const [saved, setSaved] = useState(false);

  useEffect(() => { setForm(data.settings); }, [data.settings]);

  const handleSave = () => {
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const update = <K extends keyof CMSSiteSettings>(key: K, value: CMSSiteSettings[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground mb-1">Pengaturan Website</h1>
          <p className="text-sm text-muted-foreground">Edit konten yang tampil di seluruh website</p>
        </div>
        <button onClick={handleSave} className={cn('flex items-center gap-2 font-bold px-5 py-3 rounded-xl btn-3d font-display text-sm transition-colors', saved ? 'bg-green-500 text-white' : 'bg-rute-pink hover:bg-rute-pink-dark text-white')}>
          {saved ? <><Check size={18} /> Tersimpan!</> : <><Save size={18} /> Simpan</>}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn('px-4 py-2 rounded-full font-display font-bold text-sm transition-all border-2', activeTab === tab.id ? 'bg-rute-pink text-white border-rute-pink-dark btn-3d' : 'bg-white text-foreground border-rute-cream-dark hover:border-rute-pink/40')}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border-2 border-rute-cream-dark p-5 md:p-6 card-shadow">
        {/* BRAND */}
        {activeTab === 'brand' && (
          <div className="space-y-4">
            <Field label="Nama Brand">
              <input type="text" value={form.brandName} onChange={(e) => update('brandName', e.target.value)} className={inputCls} />
            </Field>
            <Field label="Tagline">
              <input type="text" value={form.tagline} onChange={(e) => update('tagline', e.target.value)} className={inputCls} />
            </Field>
          </div>
        )}

        {/* HERO */}
        {activeTab === 'hero' && (
          <div className="space-y-4">
            <Field label="Judul Utama (Hero)">
              <textarea value={form.heroHeadline} onChange={(e) => update('heroHeadline', e.target.value)} rows={3} className={inputCls} />
            </Field>
            <Field label="Sub-judul (Hero)">
              <textarea value={form.heroSubtitle} onChange={(e) => update('heroSubtitle', e.target.value)} rows={2} className={inputCls} />
            </Field>
          </div>
        )}

        {/* NAV */}
        {activeTab === 'nav' && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-2">Edit menu navigasi yang tampil di header</p>
            {form.navMenu.map((item, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input type="text" value={item.label} onChange={(e) => { const nav = [...form.navMenu]; nav[idx] = { ...nav[idx], label: e.target.value }; update('navMenu', nav); }} placeholder="Label" className={cn(inputCls, 'flex-1')} />
                <input type="text" value={item.href} onChange={(e) => { const nav = [...form.navMenu]; nav[idx] = { ...nav[idx], href: e.target.value }; update('navMenu', nav); }} placeholder="/link" className={cn(inputCls, 'flex-1')} />
                <button onClick={() => update('navMenu', form.navMenu.filter((_, i) => i !== idx))} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"><X size={18} /></button>
              </div>
            ))}
            <button onClick={() => update('navMenu', [...form.navMenu, { label: 'Menu Baru', href: '/' }])} className="flex items-center gap-2 text-sm font-bold text-rute-pink hover:text-rute-pink-dark font-display"><Plus size={18} /> Tambah Menu</button>
          </div>
        )}

        {/* STATS */}
        {activeTab === 'stats' && (
          <div className="space-y-3">
            {form.stats.map((s, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input type="text" value={s.value} onChange={(e) => { const stats = [...form.stats]; stats[idx] = { ...stats[idx], value: e.target.value }; update('stats', stats); }} placeholder="1.4K+" className={cn(inputCls, 'w-32')} />
                <input type="text" value={s.label} onChange={(e) => { const stats = [...form.stats]; stats[idx] = { ...stats[idx], label: e.target.value }; update('stats', stats); }} placeholder="Label" className={cn(inputCls, 'flex-1')} />
                <button onClick={() => update('stats', form.stats.filter((_, i) => i !== idx))} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"><X size={18} /></button>
              </div>
            ))}
            <button onClick={() => update('stats', [...form.stats, { value: '', label: '' }])} className="flex items-center gap-2 text-sm font-bold text-rute-pink hover:text-rute-pink-dark font-display"><Plus size={18} /> Tambah Statistik</button>
          </div>
        )}

        {/* WHY US */}
        {activeTab === 'whyus' && (
          <div className="space-y-4">
            {form.whyUs.map((item, idx) => (
              <div key={idx} className="bg-rute-cream/50 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground font-display">Item {idx + 1}</span>
                  <button onClick={() => update('whyUs', form.whyUs.filter((_, i) => i !== idx))} className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg"><X size={16} /></button>
                </div>
                <select value={item.icon} onChange={(e) => { const wu = [...form.whyUs]; wu[idx] = { ...wu[idx], icon: e.target.value }; update('whyUs', wu); }} className={inputCls}>
                  {ICON_OPTIONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                </select>
                <input type="text" value={item.title} onChange={(e) => { const wu = [...form.whyUs]; wu[idx] = { ...wu[idx], title: e.target.value }; update('whyUs', wu); }} placeholder="Judul" className={inputCls} />
                <textarea value={item.desc} onChange={(e) => { const wu = [...form.whyUs]; wu[idx] = { ...wu[idx], desc: e.target.value }; update('whyUs', wu); }} placeholder="Deskripsi" rows={2} className={inputCls} />
              </div>
            ))}
            <button onClick={() => update('whyUs', [...form.whyUs, { icon: 'Sparkles', title: '', desc: '' }])} className="flex items-center gap-2 text-sm font-bold text-rute-pink hover:text-rute-pink-dark font-display"><Plus size={18} /> Tambah Item</button>
          </div>
        )}

        {/* CONTACTS */}
        {activeTab === 'contacts' && (
          <div className="space-y-5">
            <div className="bg-rute-cream/50 rounded-xl p-4 space-y-3">
              <h3 className="font-display font-bold text-sm text-foreground">Kontak 1 (Melina)</h3>
              <Field label="Nama"><input type="text" value={form.contacts.melina.name} onChange={(e) => update('contacts', { ...form.contacts, melina: { ...form.contacts.melina, name: e.target.value } })} className={inputCls} /></Field>
              <Field label="No. Telepon"><input type="text" value={form.contacts.melina.phone} onChange={(e) => update('contacts', { ...form.contacts, melina: { ...form.contacts.melina, phone: e.target.value } })} className={inputCls} /></Field>
              <Field label="No. WhatsApp (format: 62...)"><input type="text" value={form.contacts.melina.wa} onChange={(e) => update('contacts', { ...form.contacts, melina: { ...form.contacts.melina, wa: e.target.value } })} className={inputCls} /></Field>
            </div>
            <div className="bg-rute-cream/50 rounded-xl p-4 space-y-3">
              <h3 className="font-display font-bold text-sm text-foreground">Kontak 2 (Maria)</h3>
              <Field label="Nama"><input type="text" value={form.contacts.maria.name} onChange={(e) => update('contacts', { ...form.contacts, maria: { ...form.contacts.maria, name: e.target.value } })} className={inputCls} /></Field>
              <Field label="No. Telepon"><input type="text" value={form.contacts.maria.phone} onChange={(e) => update('contacts', { ...form.contacts, maria: { ...form.contacts.maria, phone: e.target.value } })} className={inputCls} /></Field>
              <Field label="No. WhatsApp (format: 62...)"><input type="text" value={form.contacts.maria.wa} onChange={(e) => update('contacts', { ...form.contacts, maria: { ...form.contacts.maria, wa: e.target.value } })} className={inputCls} /></Field>
            </div>
            <Field label="Alamat Mepo (Titik Kumpul)"><input type="text" value={form.mepoAddress} onChange={(e) => update('mepoAddress', e.target.value)} className={inputCls} /></Field>
            <Field label="Catatan Mepo"><textarea value={form.mepoNote} onChange={(e) => update('mepoNote', e.target.value)} rows={2} className={inputCls} /></Field>
          </div>
        )}

        {/* SOCIAL */}
        {activeTab === 'social' && (
          <div className="space-y-4">
            <Field label="Instagram (format: @username)"><input type="text" value={form.socialLinks.instagram} onChange={(e) => update('socialLinks', { ...form.socialLinks, instagram: e.target.value })} className={inputCls} /></Field>
            <Field label="TikTok (username tanpa @)"><input type="text" value={form.socialLinks.tiktok} onChange={(e) => update('socialLinks', { ...form.socialLinks, tiktok: e.target.value })} className={inputCls} /></Field>
            <Field label="Email"><input type="email" value={form.socialLinks.email} onChange={(e) => update('socialLinks', { ...form.socialLinks, email: e.target.value })} className={inputCls} /></Field>
          </div>
        )}

        {/* FOOTER */}
        {activeTab === 'footer' && (
          <div className="space-y-4">
            <Field label="Teks Footer (copyright)"><input type="text" value={form.footerText} onChange={(e) => update('footerText', e.target.value)} className={inputCls} /></Field>
          </div>
        )}

        {/* LOYALTY */}
        {activeTab === 'loyalty' && (
          <div className="space-y-4">
            <Field label="Total Stamp untuk Reward"><input type="number" value={form.loyaltyConfig.totalStamps} onChange={(e) => update('loyaltyConfig', { ...form.loyaltyConfig, totalStamps: Number(e.target.value) })} className={inputCls} /></Field>
            <div>
              <label className="block text-sm font-bold text-foreground mb-2 font-display">Daftar Perks Reward</label>
              {form.loyaltyConfig.perks.map((perk, idx) => (
                <div key={idx} className="flex gap-2 items-center mb-2">
                  <input type="text" value={perk} onChange={(e) => { const perks = [...form.loyaltyConfig.perks]; perks[idx] = e.target.value; update('loyaltyConfig', { ...form.loyaltyConfig, perks }); }} className={cn(inputCls, 'flex-1')} />
                  <button onClick={() => update('loyaltyConfig', { ...form.loyaltyConfig, perks: form.loyaltyConfig.perks.filter((_, i) => i !== idx) })} className="p-3 text-red-500 hover:bg-red-50 rounded-xl"><X size={18} /></button>
                </div>
              ))}
              <button onClick={() => update('loyaltyConfig', { ...form.loyaltyConfig, perks: [...form.loyaltyConfig.perks, ''] })} className="flex items-center gap-2 text-sm font-bold text-rute-pink font-display"><Plus size={18} /> Tambah Perk</button>
            </div>
          </div>
        )}

        {/* ABOUT */}
        {activeTab === 'about' && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-foreground mb-2 font-display">Cerita / Story</label>
              {form.aboutStory.map((s, idx) => (
                <div key={idx} className="flex gap-2 items-start mb-2">
                  <textarea value={s.text} onChange={(e) => { const story = [...form.aboutStory]; story[idx] = { text: e.target.value }; update('aboutStory', story); }} rows={3} className={cn(inputCls, 'flex-1')} />
                  <button onClick={() => update('aboutStory', form.aboutStory.filter((_, i) => i !== idx))} className="p-3 text-red-500 hover:bg-red-50 rounded-xl mt-0.5"><X size={18} /></button>
                </div>
              ))}
              <button onClick={() => update('aboutStory', [...form.aboutStory, { text: '' }])} className="flex items-center gap-2 text-sm font-bold text-rute-pink font-display"><Plus size={18} /> Tambah Paragraf</button>
            </div>
            <div>
              <label className="block text-sm font-bold text-foreground mb-2 font-display">Nilai-Nilai (Values)</label>
              {form.aboutValues.map((v, idx) => (
                <div key={idx} className="bg-rute-cream/50 rounded-xl p-4 space-y-2 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted-foreground font-display">Value {idx + 1}</span>
                    <button onClick={() => update('aboutValues', form.aboutValues.filter((_, i) => i !== idx))} className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg"><X size={16} /></button>
                  </div>
                  <select value={v.icon} onChange={(e) => { const vals = [...form.aboutValues]; vals[idx] = { ...vals[idx], icon: e.target.value }; update('aboutValues', vals); }} className={inputCls}>
                    {ICON_OPTIONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                  </select>
                  <input type="text" value={v.title} onChange={(e) => { const vals = [...form.aboutValues]; vals[idx] = { ...vals[idx], title: e.target.value }; update('aboutValues', vals); }} placeholder="Judul" className={inputCls} />
                  <textarea value={v.desc} onChange={(e) => { const vals = [...form.aboutValues]; vals[idx] = { ...vals[idx], desc: e.target.value }; update('aboutValues', vals); }} placeholder="Deskripsi" rows={2} className={inputCls} />
                  <select value={v.color} onChange={(e) => { const vals = [...form.aboutValues]; vals[idx] = { ...vals[idx], color: e.target.value }; update('aboutValues', vals); }} className={inputCls}>
                    {COLOR_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              ))}
              <button onClick={() => update('aboutValues', [...form.aboutValues, { icon: 'Smile', title: '', desc: '', color: COLOR_OPTIONS[0] }])} className="flex items-center gap-2 text-sm font-bold text-rute-pink font-display"><Plus size={18} /> Tambah Value</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

const inputCls = 'w-full px-4 py-3 bg-rute-cream rounded-xl border-2 border-rute-cream-dark outline-none focus:border-rute-pink text-sm font-medium';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-bold text-foreground mb-1.5 font-display">{label}</label>
      {children}
    </div>
  );
}
