'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Camera, Code2, Gamepad2, BookOpen, Dumbbell, type LucideIcon } from 'lucide-react';
import { hobbies } from '@/lib/data';

const iconMap: Record<string, LucideIcon> = {
  Camera,
  Code2,
  Gamepad2,
  BookOpen,
  Dumbbell,
};

export default function HobiSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      id="hobi"
      className="relative w-full overflow-hidden py-24 px-6 md:px-12 bg-dot-grid"
    >
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div ref={headingRef} className="relative z-10 max-w-7xl mx-auto mb-12">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-block px-3 py-1 rounded-full glass-cyan text-xs font-medium text-cyan-300 uppercase tracking-widest mb-4"
        >
          Gallery
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold font-sans"
        >
          <span className="text-gradient-blue">Hobi</span>{' '}
          <span className="text-foreground/40">&</span>{' '}
          <span className="text-gradient-cyan">Interests</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={headingInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-muted-foreground font-body text-lg mt-2"
        >
          Hal-hal yang saya nikmati di luar kampus.
        </motion.p>
      </div>

      {/* Bento Grid */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[220px]">
        {hobbies.map((hobi, i) => {
          const Icon = iconMap[hobi.icon] || Camera;
          const isBlue = hobi.color === 'blue';
          return (
            <motion.div
              key={hobi.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.03 }}
              className={`group relative rounded-3xl overflow-hidden glass border-beam cursor-pointer ${hobi.span}`}
            >
              {/* Background image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={hobi.image}
                alt={hobi.title}
                className="absolute inset-0 w-full h-full object-cover opacity-30 transition-all duration-500 group-hover:opacity-50 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg via-cyber-bg/60 to-transparent" />

              {/* Hover glow */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isBlue ? 'bg-blue-500/10' : 'bg-cyan-500/10'
                }`}
              />

              <div className="relative h-full p-6 flex flex-col justify-between">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${
                    isBlue
                      ? 'bg-blue-500/15 text-blue-300'
                      : 'bg-cyan-500/15 text-cyan-300'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3
                    className={`text-xl md:text-2xl font-bold mb-1 ${
                      isBlue ? 'text-blue-200' : 'text-cyan-200'
                    }`}
                  >
                    {hobi.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body">
                    {hobi.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
