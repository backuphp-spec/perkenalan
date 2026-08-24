'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MapPin, ArrowDown, Sparkles } from 'lucide-react';
import { studentData } from '@/lib/data';

const portraitUrl =
  'https://images.pexels.com/photos/34436685/pexels-photo-34436685.jpeg?auto=compress&cs=tinysrgb&h=900&w=600';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [typewriterIdx, setTypewriterIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  // Mouse tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  // Typewriter effect
  useEffect(() => {
    const words = studentData.typewriterWords;
    const current = words[typewriterIdx];

    if (!deleting && displayed.length < current.length) {
      const timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
      return () => clearTimeout(timeout);
    }
    if (!deleting && displayed.length === current.length) {
      const timeout = setTimeout(() => setDeleting(true), 1500);
      return () => clearTimeout(timeout);
    }
    if (deleting && displayed.length > 0) {
      const timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
      return () => clearTimeout(timeout);
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setTypewriterIdx((prev) => (prev + 1) % words.length);
    }
  }, [displayed, deleting, typewriterIdx]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex items-center bg-cyber-grid"
    >
      {/* Background Beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-40 bg-gradient-to-b from-transparent via-blue-400/30 to-transparent"
            style={{
              left: `${10 + i * 12}%`,
              filter: 'blur(2px)',
            }}
            animate={{
              y: ['-10vh', '110vh'],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Aurora blobs */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/8 blur-[120px] pointer-events-none"
        animate={{ x: [0, 30, -20, 0], y: [0, -40, 30, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/6 blur-[100px] pointer-events-none"
        animate={{ x: [0, -30, 20, 0], y: [0, 30, -20, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
        {/* Left: Text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300 tracking-wide">
              {studentData.greeting}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight font-sans mb-2"
          >
            <span className="text-gradient-blue">{studentData.name}</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="h-8 mb-6"
          >
            <span className="text-xl md:text-2xl font-mono text-cyan-400 glow-text-cyan">
              {displayed}
              <span className="inline-block w-0.5 h-6 bg-cyan-400 ml-1 animate-pulse" />
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-blue mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-sm font-medium text-blue-200">{studentData.tagline}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex items-center gap-2 text-muted-foreground mb-6"
          >
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span className="text-base font-body">{studentData.hometown}</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="font-serif text-lg text-foreground/60 max-w-md leading-relaxed"
          >
            {studentData.vision}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="flex items-center gap-2 mt-10 text-sm text-muted-foreground"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center gap-2"
            >
              <ArrowDown className="w-4 h-4 text-cyan-400" />
              <span>Scroll untuk menjelajah</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Right: 3D Tilt Card */}
        <div className="flex justify-center perspective-2000">
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
              mouseX.set(0);
              mouseY.set(0);
            }}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            className="relative preserve-3d"
          >
            {/* Glow behind card */}
            <div className="absolute -inset-6 bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent rounded-3xl blur-3xl" />

            <div className="relative w-72 md:w-96 aspect-[3/4] rounded-3xl overflow-hidden glass glow-blue border-beam">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={portraitUrl}
                alt={studentData.name}
                className="w-full h-full object-cover"
                style={{ transform: 'translateZ(20px)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg via-transparent to-transparent" />

              {/* Floating info */}
              <div
                className="absolute bottom-0 left-0 right-0 p-6"
                style={{ transform: 'translateZ(40px)' }}
              >
                <p className="text-xs text-cyan-300 font-medium uppercase tracking-widest mb-1">
                  {studentData.university}
                </p>
                <p className="text-sm text-foreground/80 font-serif italic">
                  {studentData.major}
                </p>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 px-3 py-1.5 rounded-full bg-cyan-400 text-cyber-bg text-xs font-bold glow-cyan"
              style={{ transform: 'translateZ(60px)' }}
            >
              MABA {studentData.year}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
