'use client';

import { createContext, useContext, useEffect, useState, useCallback, useRef, type ReactNode } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { TRIPS, DESTINATIONS, TESTIMONIALS, GALLERY_ITEMS, GALLERY_CATEGORIES, TEAM, STATS, WHY_US, LOYALTY, CONTACTS } from '@/constants/trips';

export interface CMSTrip {
  id: string;
  name: string;
  destination: string;
  region: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  price: number;
  totalSeats: number;
  filledSeats: number;
  popular: boolean;
  image: string;
  includes: string[];
  excludes: string[];
  highlights: string[];
  mepoInfo: string;
}

export interface CMSDestination {
  id: string;
  name: string;
  region: string;
  island: string;
  image: string;
  gallery: string[];
  description: string;
  highlights: string[];
  mapX: number;
  mapY: number;
}

export interface CMSTestimonial {
  id: string;
  name: string;
  location: string;
  trip: string;
  rating: number;
  text: string;
  photo: string;
}

export interface CMSGalleryItem {
  id: string;
  category: string;
  image: string;
  caption: string;
  span: 'tall' | 'wide' | 'normal';
}

export interface CMSTeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
}

export interface CMSSiteSettings {
  brandName: string;
  tagline: string;
  heroHeadline: string;
  heroHighlight: string;
  heroSubtitle: string;
  stats: { label: string; value: string }[];
  whyUs: { icon: string; title: string; desc: string }[];
  navMenu: { label: string; href: string }[];
  socialLinks: { instagram: string; tiktok: string; email: string };
  contacts: { melina: { name: string; phone: string; wa: string }; maria: { name: string; phone: string; wa: string } };
  mepoAddress: string;
  mepoNote: string;
  footerText: string;
  loyaltyConfig: { totalStamps: number; perks: string[] };
  aboutStory: { text: string }[];
  aboutValues: { icon: string; title: string; desc: string; color: string }[];
}

interface CMSData {
  settings: CMSSiteSettings;
  trips: CMSTrip[];
  destinations: CMSDestination[];
  testimonials: CMSTestimonial[];
  galleryItems: CMSGalleryItem[];
  galleryCategories: string[];
  team: CMSTeamMember[];
}

const AUTH_KEY = 'rute-seru-admin-auth';
export const ADMIN_EMAIL = 'fxrich01@gmail.com';
export const ADMIN_PASSWORD = 'Rute@Seru!2025#';

function seedData(): CMSData {
  return {
    settings: {
      brandName: 'RUTE SERU',
      tagline: 'Trip Organizer Sejak 2022',
      heroHeadline: 'Bukan Makin Tua, Tapi Makin Tahu Cara Menikmati Perjalanan',
      heroHighlight: 'Makin Tahu Cara Menikmati Perjalanan',
      heroSubtitle: 'Open Trip anti ribet, tinggal bawa badan & bestie!',
      stats: STATS,
      whyUs: WHY_US,
      navMenu: [
        { label: 'Home', href: '/' },
        { label: 'Jadwal Trip', href: '/jadwal' },
        { label: 'Destinasi', href: '/destinasi' },
        { label: 'Tentang', href: '/tentang' },
        { label: 'Galeri', href: '/galeri' },
      ],
      socialLinks: { instagram: CONTACTS.ig, tiktok: CONTACTS.tiktok, email: CONTACTS.email },
      contacts: { melina: CONTACTS.melina, maria: CONTACTS.maria },
      mepoAddress: CONTACTS.mepo,
      mepoNote: CONTACTS.mepoNote,
      footerText: 'Open Trip • Private Trip • Hijab Friendly • Dokumentasi Cakep',
      loyaltyConfig: LOYALTY,
      aboutStory: [
        { text: 'Rute Seru dimulai sejak 2022 dari hobi Ka Vita yang suka traveling bareng teman-teman perempuan. Dia merasa, banyak trip di luar sana belum ramah untuk jamaah hijab dan ibu-ibu yang mau jalan santai.' },
        { text: 'Dari sana, Ka Vita mulai mengorganisir trip kecil-kecilan. Teman, saudara, tetangga ikut. Kata mereka: "Seru, gak ribet, dan aman!". Maka jadilah RUTE SERU.' },
        { text: 'Sekarang, Rute Seru sudah mengajak 1.400+ traveler ke 380+ trip. Dari Karimun Jawa sampai Dieng, dari Pahawang sampai Pacitan. Selalu ramah hijab, selalu anti ribet, dan selalu seru!' },
      ],
      aboutValues: [
        { icon: 'Smile', title: 'Fun', desc: 'Trip bukan cuma jalan-jalan, tapi bikin happy. Ketawa bareng, kenalan baru, balik bawa cerita seru!', color: 'bg-rute-pink/10 text-rute-pink' },
        { icon: 'Shield', title: 'Aman untuk Perempuan', desc: 'Tour leader cewek, akomodasi nyaman, suasana terjaga. Aman solo atau bareng bestie.', color: 'bg-rute-turquoise/10 text-rute-turquoise-dark' },
        { icon: 'Clock', title: 'Tidak Ngebut', desc: 'Itinerary santai, ada waktu buat foto, ngobrol, dan nikmatin momen. Bukan lomba lari!', color: 'bg-rute-yellow/15 text-rute-yellow-dark' },
        { icon: 'Heart', title: 'Ramah Hijab', desc: 'Hijab friendly di setiap aspek. Spot foto, akomodasi, dan aktivitas disesuaikan untuk jamaah hijab.', color: 'bg-rute-ocean/10 text-rute-ocean' },
      ],
    },
    trips: TRIPS.map((t) => ({
      id: t.id,
      name: t.name,
      destination: t.destination,
      region: t.region,
      startDate: t.startDate,
      endDate: t.endDate,
      durationDays: t.durationDays,
      price: t.price,
      totalSeats: t.totalSeats,
      filledSeats: t.filledSeats,
      popular: t.popular ?? false,
      image: t.image,
      includes: t.includes,
      excludes: t.excludes,
      highlights: t.highlights,
      mepoInfo: t.mepoInfo ?? '',
    })),
    destinations: DESTINATIONS.map((d) => ({
      id: d.id,
      name: d.name,
      region: d.region,
      island: d.island,
      image: d.image,
      gallery: d.gallery,
      description: d.description,
      highlights: d.highlights,
      mapX: d.mapX,
      mapY: d.mapY,
    })),
    testimonials: TESTIMONIALS,
    galleryItems: GALLERY_ITEMS,
    galleryCategories: GALLERY_CATEGORIES,
    team: TEAM,
  };
}

interface CMSContextType {
  data: CMSData;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateSettings: (s: Partial<CMSSiteSettings>) => void;
  saveTrip: (trip: CMSTrip) => void;
  deleteTrip: (id: string) => void;
  saveDestination: (d: CMSDestination) => void;
  deleteDestination: (id: string) => void;
  saveTestimonial: (t: CMSTestimonial) => void;
  deleteTestimonial: (id: string) => void;
  saveGalleryItem: (g: CMSGalleryItem) => void;
  deleteGalleryItem: (id: string) => void;
  saveTeamMember: (m: CMSTeamMember) => void;
  deleteTeamMember: (id: string) => void;
  resetAll: () => void;
}

const CMSContext = createContext<CMSContextType | null>(null);

export function useCMS() {
  const ctx = useContext(CMSContext);
  if (!ctx) throw new Error('useCMS must be used within CMSProvider');
  return ctx;
}

export function CMSProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<CMSData>(seedData);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const dataRef = useRef(data);

  useEffect(() => { dataRef.current = data; }, [data]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data: row, error } = await supabase
          .from('cms_data')
          .select('data')
          .eq('id', 1)
          .maybeSingle();
        if (error) {
          console.error('[CMS] load error:', error.message);
        } else if (row && row.data && row.data.settings && !cancelled) {
          setData(row.data as CMSData);
        } else if (!cancelled) {
          const seed = seedData();
          setData(seed);
          const { error: seedError } = await supabase
            .from('cms_data')
            .upsert({ id: 1, data: seed, updated_at: new Date().toISOString() }, { onConflict: 'id' });
          if (seedError) console.error('[CMS] seed error:', seedError.message);
        }
      } catch (e) {
        console.error('[CMS] load error:', e);
      }
      if (!cancelled) {
        const auth = localStorage.getItem(AUTH_KEY);
        if (auth === 'true') setIsAuthenticated(true);
        setHydrated(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const persist = useCallback(async (newData: CMSData) => {
    setData(newData);
    dataRef.current = newData;
    try {
      const { error } = await supabase
        .from('cms_data')
        .upsert({ id: 1, data: newData, updated_at: new Date().toISOString() }, { onConflict: 'id' });
      if (error) {
        console.error('[CMS] persist error:', error.message);
        toast.error('Gagal menyimpan: ' + error.message);
      } else {
        toast.success('Data berhasil disimpan!');
      }
    } catch (e: any) {
      console.error('[CMS] persist error:', e);
      toast.error('Gagal menyimpan: ' + (e?.message || 'unknown error'));
    }
  }, []);

  const login = useCallback((email: string, password: string) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_KEY);
  }, []);

  const updateSettings = useCallback((s: Partial<CMSSiteSettings>) => {
    persist({ ...dataRef.current, settings: { ...dataRef.current.settings, ...s } });
  }, [persist]);

  const saveTrip = useCallback((trip: CMSTrip) => {
    const d = dataRef.current;
    const exists = d.trips.find((t) => t.id === trip.id);
    persist({ ...d, trips: exists ? d.trips.map((t) => t.id === trip.id ? trip : t) : [...d.trips, trip] });
  }, [persist]);

  const deleteTrip = useCallback((id: string) => {
    const d = dataRef.current;
    persist({ ...d, trips: d.trips.filter((t) => t.id !== id) });
  }, [persist]);

  const saveDestination = useCallback((dest: CMSDestination) => {
    const d = dataRef.current;
    const exists = d.destinations.find((x) => x.id === dest.id);
    persist({ ...d, destinations: exists ? d.destinations.map((x) => x.id === dest.id ? dest : x) : [...d.destinations, dest] });
  }, [persist]);

  const deleteDestination = useCallback((id: string) => {
    const d = dataRef.current;
    persist({ ...d, destinations: d.destinations.filter((x) => x.id !== id) });
  }, [persist]);

  const saveTestimonial = useCallback((t: CMSTestimonial) => {
    const d = dataRef.current;
    const exists = d.testimonials.find((x) => x.id === t.id);
    persist({ ...d, testimonials: exists ? d.testimonials.map((x) => x.id === t.id ? t : x) : [...d.testimonials, t] });
  }, [persist]);

  const deleteTestimonial = useCallback((id: string) => {
    const d = dataRef.current;
    persist({ ...d, testimonials: d.testimonials.filter((x) => x.id !== id) });
  }, [persist]);

  const saveGalleryItem = useCallback((g: CMSGalleryItem) => {
    const d = dataRef.current;
    const exists = d.galleryItems.find((x) => x.id === g.id);
    persist({ ...d, galleryItems: exists ? d.galleryItems.map((x) => x.id === g.id ? g : x) : [...d.galleryItems, g] });
  }, [persist]);

  const deleteGalleryItem = useCallback((id: string) => {
    const d = dataRef.current;
    persist({ ...d, galleryItems: d.galleryItems.filter((x) => x.id !== id) });
  }, [persist]);

  const saveTeamMember = useCallback((m: CMSTeamMember) => {
    const d = dataRef.current;
    const exists = d.team.find((x) => x.id === m.id);
    persist({ ...d, team: exists ? d.team.map((x) => x.id === m.id ? m : x) : [...d.team, m] });
  }, [persist]);

  const deleteTeamMember = useCallback((id: string) => {
    const d = dataRef.current;
    persist({ ...d, team: d.team.filter((x) => x.id !== id) });
  }, [persist]);

  const resetAll = useCallback(() => {
    persist(seedData());
  }, [persist]);

  if (!hydrated) return null;

  return (
    <CMSContext.Provider value={{ data, isAuthenticated, login, logout, updateSettings, saveTrip, deleteTrip, saveDestination, deleteDestination, saveTestimonial, deleteTestimonial, saveGalleryItem, deleteGalleryItem, saveTeamMember, deleteTeamMember, resetAll }}>
      {children}
    </CMSContext.Provider>
  );
}
