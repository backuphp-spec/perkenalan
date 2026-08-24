'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import confetti from 'canvas-confetti';
import { studentData } from '@/lib/data';

export default function PenutupSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-100px' });
  const firedRef = useRef(false);

  useEffect(() => {
    if (headingInView && !firedRef.current) {
      firedRef.current = true;
      fireConfetti();
    }
  }, [headingInView]);

  const fireConfetti = () => {
    const defaults = {
      colors: ['#3b82f6', '#00f0ff', '#22d3ee', '#60a5fa', '#8b5cf6'],
      startVelocity: 45,
      spread: 360,
      ticks: 200,
      zIndex: 9999,
    };

    confetti({ ...defaults, particleCount: 80, origin: { x: 0.5, y: 0.5 } });

    setTimeout(() => {
      confetti({ ...defaults, particleCount: 40, origin: { x: 0.2, y: 0.7 } });
      confetti({ ...defaults, particleCount: 40, origin: { x: 0.8, y: 0.7 } });
    }, 300);

    setTimeout(() => {
      confetti({ ...defaults, particleCount: 50, origin: { x: 0.5, y: 0.3 } });
    }, 600);
  };

  // Sparkles
  const sparkles = [...Array(20)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 3,
    size: 2 + Math.random() * 4,
  }));

  return (
    <section
      ref={sectionRef}
      id="penutup"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-6 bg-cyber-grid"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/8 blur-[120px] pointer-events-none" />

      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute pointer-events-none"
          style={{ left: `${sparkle.x}%`, top: `${sparkle.y}%` }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: 'easeInOut',
          }}
        >
          <div
            className="rounded-full bg-cyan-400 glow-cyan"
            style={{ width: sparkle.size, height: sparkle.size }}
          />
        </motion.div>
      ))}

      <div ref={headingRef} className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-serif text-2xl md:text-3xl text-cyan-300 italic mb-8"
        >
          Bismillah,
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.5 }}
          animate={headingInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.2] font-sans"
        >
          Saya,{' '}
          <span className="text-gradient-neon glow-text-cyan inline-block">
            {studentData.name}
          </span>
          , MABA {studentData.universityShort} {studentData.year}, Siap Menjadi{' '}
          <span className="text-gradient-blue">Pelopor Peradaban Digital</span>{' '}
          Berlandaskan <span className="text-gradient-cyan">Nilai Islam</span>.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <p className="text-5xl md:text-7xl font-bold text-gradient-neon glow-text-cyan font-sans">
            Allahu Akbar!
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-500" />
            <span className="text-sm text-muted-foreground font-serif italic">
              {studentData.university}
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-500" />
          </div>
        </motion.div>

        {/* Replay confetti button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={headingInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fireConfetti}
          className="mt-10 px-6 py-3 rounded-full glass-blue glow-blue text-sm font-medium text-cyan-300 hover:text-cyan-200 transition-colors"
        >
          Trigger Confetti Again
        </motion.button>
      </div>
    </section>
  );
}
