'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music2, Zap, Heart, Share2 } from 'lucide-react';
import { videoReels } from '@/lib/data';

export default function JJSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-100px' });
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  const activeReel = videoReels[activeIdx];

  return (
    <section
      ref={sectionRef}
      id="jj"
      className="relative min-h-screen w-full overflow-hidden py-24 px-6 md:px-12"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

      <div ref={headingRef} className="relative z-10 max-w-6xl mx-auto mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-blue mb-4"
        >
          <Zap className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-semibold text-cyan-300 uppercase tracking-widest">
            JJ Showcase
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold font-sans"
        >
          <span className="text-gradient-neon">Jedag-Jedug</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={headingInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xl text-foreground font-bold mt-2"
        >
          MABA UIN: <span className="text-cyan-400">Kreatif & Menghibur</span>
        </motion.p>
      </div>

      {/* Reel Player */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Main reel display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[9/16] max-h-[600px] mx-auto w-full max-w-[340px] rounded-3xl overflow-hidden glass glow-blue border-beam"
        >
          {/* Animated gradient background (simulated video) */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${activeReel.gradient}`}
            animate={isPlaying ? { opacity: [0.5, 0.8, 0.5] } : { opacity: 0.5 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 bg-cyber-grid opacity-30" />

          {/* Pulsing rings */}
          {isPlaying && (
            <>
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-cyan-400/30"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-blue-400/30"
                animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
              />
            </>
          )}

          {/* Center play/pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full glass-blue flex items-center justify-center glow-blue hover:scale-110 transition-transform"
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 text-cyan-300" fill="currentColor" />
            ) : (
              <Play className="w-7 h-7 text-cyan-300 ml-1" fill="currentColor" />
            )}
          </button>

          {/* Audio equalizer visualizer */}
          {isPlaying && (
            <div className="absolute top-4 left-4 flex items-end gap-1 h-6">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 rounded-full bg-cyan-400"
                  animate={{ height: ['20%', '100%', '40%', '80%', '20%'] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: 'easeInOut',
                  }}
                  style={{ height: '20%' }}
                />
              ))}
            </div>
          )}

          {/* Mute toggle */}
          <button
            onClick={() => setMuted(!muted)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform"
          >
            {muted ? (
              <VolumeX className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Volume2 className="w-4 h-4 text-cyan-300" />
            )}
          </button>

          {/* Bottom info bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-cyber-bg to-transparent">
            <div className="flex items-center gap-2 mb-2">
              <Music2 className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-cyan-300 font-mono">JJ Edit</span>
            </div>
            <h3 className="text-lg font-bold text-foreground font-sans mb-1">
              {activeReel.title}
            </h3>
            <p className="text-xs text-muted-foreground font-body">
              {activeReel.description}
            </p>
            <div className="flex items-center gap-4 mt-3">
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-cyan-400 transition-colors">
                <Heart className="w-4 h-4" /> Like
              </button>
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-cyan-400 transition-colors">
                <Share2 className="w-4 h-4" /> Share
              </button>
              <span className="ml-auto text-xs text-muted-foreground font-mono">
                {activeReel.duration}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Reel selector sidebar */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">
            Reel Playlist
          </p>
          {videoReels.map((reel, i) => (
            <motion.button
              key={reel.id}
              onClick={() => setActiveIdx(i)}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ scale: 1.02 }}
              className={`relative flex items-center gap-3 p-3 rounded-2xl text-left transition-all duration-300 ${
                activeIdx === i
                  ? 'glass-blue glow-blue'
                  : 'glass opacity-60 hover:opacity-100'
              }`}
            >
              {/* Thumbnail */}
              <div
                className={`relative w-14 h-20 rounded-xl overflow-hidden shrink-0 bg-gradient-to-br ${reel.gradient}`}
              >
                <div className="absolute inset-0 bg-cyber-grid opacity-30" />
                {activeIdx === i && isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-6 h-6 rounded-full border-2 border-cyan-400 border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>
                )}
                {activeIdx !== i && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white/60" fill="currentColor" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold font-sans truncate ${
                  activeIdx === i ? 'text-cyan-200' : 'text-foreground/70'
                }`}>
                  {reel.title}
                </p>
                <p className="text-xs text-muted-foreground truncate font-body">
                  {reel.description}
                </p>
                <span className="text-xs text-muted-foreground font-mono mt-1 block">
                  {reel.duration}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
