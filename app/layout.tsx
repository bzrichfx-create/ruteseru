import './globals.css';
import type { Metadata } from 'next';
import { Fredoka, Poppins } from 'next/font/google';
import ClientLayout from '@/components/ClientLayout';

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RUTE SERU - Open Trip & Private Trip Ramah Hijab | Trip Organizer Sejak 2022',
  description:
    'Open Trip anti ribet bersama RUTE SERU. Tinggal bawa badan & bestie! Spesialis trip ramah hijab ke Karimun Jawa, Lampung, Pacitan, Dieng & lebih banyak lagi.',
  openGraph: {
    title: 'RUTE SERU - Open Trip & Private Trip Ramah Hijab',
    description: 'Open Trip anti ribet, tinggal bawa badan & bestie!',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${fredoka.variable} ${poppins.variable}`}>
      <body className="font-body min-h-screen flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
