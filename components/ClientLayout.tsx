'use client';

import { usePathname } from 'next/navigation';
import { CMSProvider } from '@/lib/cms';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWA from '@/components/FloatingWA';
import Decorations from '@/components/Decorations';
import { Toaster } from '@/components/ui/sonner';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <CMSProvider>
      {!isAdmin && <Decorations />}
      {!isAdmin && <Header />}
      <main className={isAdmin ? '' : 'flex-1 relative z-10'}>{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && <FloatingWA />}
      <Toaster position="top-center" richColors />
    </CMSProvider>
  );
}
