'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { GraduationCap, Users, FlaskConical, Target, Check, type LucideIcon } from 'lucide-react';
import { targets } from '@/lib/data';

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Users,
  FlaskConical,
  Target,
};

export default function TargetSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 60%', 'end 70%'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      id="target"
      className="relative min-h-screen w-full overflow-hidden py-24 px-6 md:px-12"
    >
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div ref={headingRef} className="relative z-10 max-w-5xl mx-auto mb-16 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-block px-3 py-1 rounded-full glass-blue text-xs font-medium text-blue-300 uppercase tracking-widest mb-4"
        >
          Goals
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold font-sans"
        >
          <span className="text-gradient-blue">Harapan</span> &{' '}
          <span className="text-gradient-cyan">Cita-Cita</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={headingInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-muted-foreground font-body text-lg mt-2"
        >
          Tujuan yang ingin saya capai selama dan setelah kuliah.
        </motion.p>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Vertical progress track */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-cyber-border -translate-x-1/2">
          <motion.div
            style={{ height: lineHeight }}
            className="w-full bg-gradient-to-b from-blue-400 via-cyan-400 to-blue-500 origin-top"
          />
        </div>

        <div className="space-y-16">
          {targets.map((target, i) => {
            const Icon = iconMap[target.icon] || Target;
            const isLeft = i % 2 === 0;
            return (
              <TargetItem
                key={target.id}
                target={target}
                Icon={Icon}
                isLeft={isLeft}
                index={i}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TargetItem({
  target,
  Icon,
  isLeft,
  index,
}: {
  target: (typeof targets)[number];
  Icon: LucideIcon;
  isLeft: boolean;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div
      ref={ref}
      className={`relative flex ${isLeft ? 'md:justify-start' : 'md:justify-end'} pl-16 md:pl-0`}
    >
      {/* Glow node */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={inView ? { scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.4, ease: 'backOut', delay: index * 0.1 }}
        className="absolute left-6 md:left-1/2 top-2 -translate-x-1/2 z-10 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center glow-blue shrink-0"
      >
        <Check className="w-6 h-6 text-white" strokeWidth={3} />
        {inView && (
          <span className="absolute inset-0 rounded-full bg-cyan-400 animate-pulse-ring" />
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
        className={`w-full md:w-5/12 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}
      >
        <div className="glass rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300 group border-beam">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-300 group-hover:scale-110 transition-transform">
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
              {target.period}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2 text-foreground font-sans">
            {target.title}
          </h3>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            {target.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
