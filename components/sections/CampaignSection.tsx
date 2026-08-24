'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Laptop,
  ShieldCheck,
  HeartHandshake,
  Moon,
  type LucideIcon,
} from 'lucide-react';
import { campaigns } from '@/lib/data';

const iconMap: Record<string, LucideIcon> = {
  Laptop,
  ShieldCheck,
  HeartHandshake,
  Moon,
};

export default function CampaignSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      id="campaign"
      className="relative min-h-screen w-full overflow-hidden py-24 px-6 md:px-12 bg-cyber-grid"
    >
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div ref={headingRef} className="relative z-10 max-w-6xl mx-auto mb-12 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-block px-3 py-1 rounded-full glass-cyan text-xs font-medium text-cyan-300 uppercase tracking-widest mb-4"
        >
          Kampanye Digital
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold font-sans"
        >
          Bijak & <span className="text-gradient-blue">Berkelanjutan</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={headingInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-muted-foreground font-body text-lg mt-2 max-w-2xl mx-auto"
        >
          Memanfaatkan teknologi digital dengan bijak, amanah, dan bermanfaat bagi masyarakat.
        </motion.p>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
        {campaigns.map((campaign, i) => {
          const Icon = iconMap[campaign.icon] || Laptop;
          const isBlue = campaign.color === 'blue';
          const isIslamic = campaign.isIslamic;
          return (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`group relative rounded-3xl overflow-hidden glass border-beam cursor-pointer ${campaign.span}`}
            >
              {/* Islamic pattern background */}
              {isIslamic && (
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2300f0ff' stroke-opacity='0.15' stroke-width='1'%3E%3Cpath d='M30 0l15 15-15 15-15-15z'/%3E%3Cpath d='M30 30l15 15-15 15-15-15z'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
              )}

              {/* Hover glow */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isBlue ? 'bg-blue-500/10' : 'bg-cyan-500/10'
                }`}
              />

              <div className="relative h-full p-6 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${
                      isBlue
                        ? 'bg-blue-500/15 text-blue-300'
                        : 'bg-cyan-500/15 text-cyan-300'
                    }`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  {isIslamic && (
                    <motion.span
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-3xl font-serif text-cyan-400/40"
                    >
                      ۝
                    </motion.span>
                  )}
                </div>

                <div>
                  <h3
                    className={`text-xl md:text-2xl font-bold mb-2 font-sans ${
                      isBlue ? 'text-blue-200' : 'text-cyan-200'
                    }`}
                  >
                    {campaign.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    {campaign.description}
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
