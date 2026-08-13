'use client';

import { motion } from 'framer-motion';

export default function Decorations() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-rute-pink/15 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-40 -right-24 w-96 h-96 bg-rute-turquoise/15 rounded-full blur-3xl animate-float-mid" />
      <div className="absolute top-1/2 -left-32 w-80 h-80 bg-rute-yellow/15 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-0 -right-20 w-72 h-72 bg-rute-ocean/12 rounded-full blur-3xl animate-float-mid" style={{ animationDelay: '2s' }} />

      <motion.div className="absolute top-[15%] left-[8%] text-rute-yellow text-4xl" animate={{ rotate: [0, 15, 0], scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.4 7.6L22 10l-7.6 2.4L12 20l-2.4-7.6L2 10l7.6-2.4z"/></svg>
      </motion.div>
      <motion.div className="absolute top-[30%] right-[10%] text-rute-pink text-3xl" animate={{ rotate: [0, -10, 0], scale: [1, 1.3, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
      </motion.div>
      <motion.div className="absolute top-[60%] left-[5%] text-rute-turquoise text-3xl" animate={{ rotate: [0, 20, 0], scale: [1, 1.15, 1] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.4 7.6L22 10l-7.6 2.4L12 20l-2.4-7.6L2 10l7.6-2.4z"/></svg>
      </motion.div>
      <motion.div className="absolute top-[80%] right-[8%] text-rute-ocean text-4xl" animate={{ rotate: [0, -15, 0], scale: [1, 1.2, 1] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}>
        <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.4 7.6L22 10l-7.6 2.4L12 20l-2.4-7.6L2 10l7.6-2.4z"/></svg>
      </motion.div>

      <motion.div className="absolute top-[20%] right-[20%] text-rute-ocean/40" animate={{ x: [0, -200, -400], y: [0, -80, -160], rotate: [0, -10, -20], opacity: [0, 1, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeOut', repeatDelay: 3 }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
      </motion.div>
    </div>
  );
}
