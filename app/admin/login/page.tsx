'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useCMS } from '@/lib/cms';

export default function AdminLoginPage() {
  const { login } = useCMS();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      router.push('/admin');
    } else {
      setError('Email atau password salah. Coba lagi ya!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-rute-pink via-rute-yellow to-rute-turquoise" />
      <div className="absolute top-10 left-[10%] w-72 h-72 bg-white/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-10 right-[10%] w-80 h-80 bg-rute-ocean/30 rounded-full blur-3xl animate-float-mid" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 w-full max-w-md border-4 border-white"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rute-pink/10 rounded-2xl mb-4">
            <Lock size={28} className="text-rute-pink" />
          </div>
          <h1 className="font-display font-bold text-2xl text-foreground">Admin Rute Seru</h1>
          <p className="text-sm text-muted-foreground mt-1">Masuk untuk mengelola konten website</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-foreground mb-1.5 font-display">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@email.com"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-rute-cream rounded-2xl border-2 border-rute-cream-dark outline-none focus:border-rute-pink transition-colors font-medium text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-1.5 font-display">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-12 pr-12 py-3.5 bg-rute-cream rounded-2xl border-2 border-rute-cream-dark outline-none focus:border-rute-pink transition-colors font-medium text-sm"
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border-2 border-red-200 rounded-2xl px-4 py-3 text-sm text-red-600 font-medium">
              {error}
            </motion.div>
          )}

          <button type="submit" className="w-full flex items-center justify-center gap-2 bg-rute-pink hover:bg-rute-pink-dark text-white font-bold py-4 rounded-2xl btn-3d font-display transition-colors text-lg">
            Masuk Admin
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-muted-foreground hover:text-rute-pink transition-colors font-medium">← Kembali ke Website</a>
        </div>
      </motion.div>
    </div>
  );
}
