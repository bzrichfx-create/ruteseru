'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useCMS } from '@/lib/cms';
import { LayoutDashboard, Settings, Calendar, MapPin, Star, Image as ImageIcon, Users, LogOut, ExternalLink, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Trip', href: '/admin/trips', icon: Calendar },
  { label: 'Destinasi', href: '/admin/destinations', icon: MapPin },
  { label: 'Testimoni', href: '/admin/testimonials', icon: Star },
  { label: 'Galeri', href: '/admin/gallery', icon: ImageIcon },
  { label: 'Tim', href: '/admin/team', icon: Users },
  { label: 'Pengaturan', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout, resetAll } = useCMS();
  const router = useRouter();
  const pathname = usePathname();
  const isLogin = pathname === '/admin/login';

  useEffect(() => {
    if (!isAuthenticated && !isLogin) router.replace('/admin/login');
    if (isAuthenticated && isLogin) router.replace('/admin');
  }, [isAuthenticated, isLogin, router]);

  if (!isAuthenticated && !isLogin) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-muted-foreground font-display">Mengalihkan ke halaman login...</p></div>;
  }

  if (isLogin) {
    return <>{children}</>;
  }

  const handleReset = () => {
    if (confirm('Yakin mau reset semua data ke default? Perubahan kamu akan hilang!')) {
      resetAll();
      alert('Data berhasil di-reset ke default.');
    }
  };

  return (
    <div className="min-h-screen bg-rute-cream/30 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="lg:w-64 lg:min-h-screen lg:fixed lg:left-0 lg:top-0 bg-white border-r-2 border-rute-cream-dark flex flex-col z-30">
        <div className="p-5 border-b-2 border-rute-cream-dark">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-rute-pink/20 shadow-md">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-base text-foreground">RUTE <span className="text-rute-pink">SERU</span></div>
              <div className="text-[10px] text-muted-foreground font-medium">Admin Panel</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={cn('flex items-center gap-3 px-4 py-3 rounded-2xl font-display font-semibold text-sm transition-colors whitespace-nowrap', active ? 'bg-rute-pink text-white shadow-md' : 'text-foreground hover:bg-rute-cream')}>
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t-2 border-rute-cream-dark space-y-1">
          <Link href="/" target="_blank" className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium text-muted-foreground hover:bg-rute-cream transition-colors">
            <ExternalLink size={18} /> Lihat Website
          </Link>
          <button onClick={handleReset} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium text-muted-foreground hover:bg-rute-cream transition-colors">
            <RotateCcw size={18} /> Reset Data
          </button>
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors">
            <LogOut size={18} /> Keluar
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64 p-4 md:p-8">
        {children}
      </div>
    </div>
  );
}
