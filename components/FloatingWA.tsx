'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useCMS } from '@/lib/cms';

export default function FloatingWA() {
  const [showBubble, setShowBubble] = useState(false);
  const { data } = useCMS();
  const wa = data.settings.contacts.melina.wa;

  useEffect(() => {
    const t = setTimeout(() => setShowBubble(true), 2500);
    const t2 = setTimeout(() => setShowBubble(false), 10000);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {showBubble && (
          <motion.div initial={{ opacity: 0, scale: 0.8, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 10 }} className="relative bg-white rounded-2xl shadow-xl border-2 border-rute-turquoise px-4 py-3 max-w-[200px]">
            <button onClick={() => setShowBubble(false)} className="absolute -top-2 -right-2 w-6 h-6 bg-rute-pink text-white rounded-full flex items-center justify-center shadow" aria-label="Tutup"><X size={14} /></button>
            <div className="flex items-center gap-2 mb-1">
              <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" /><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" /></span>
              <span className="font-display font-bold text-sm text-foreground">Mimin Online!</span>
            </div>
            <p className="text-xs text-muted-foreground">Hai bestie, mau tanya trip? Chat aja, fast respon!</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a href={`https://wa.me/${wa}?text=${encodeURIComponent('Halo Mimin Rute Seru, mau tanya tentang trip!')}`} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="relative w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-2xl" aria-label="Chat WhatsApp">
        <span className="absolute inset-0 rounded-full bg-green-400 animate-pulse-ring" />
        <MessageCircle size={28} className="relative z-10" />
      </motion.a>
    </div>
  );
}
