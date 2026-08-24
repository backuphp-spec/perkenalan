'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bars, setBars] = useState<number[]>(Array(5).fill(20));
  const ctxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => {
      stopTone();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      setBars(Array(5).fill(20));
      return;
    }
    const interval = setInterval(() => {
      setBars((prev) => prev.map(() => 20 + Math.random() * 80));
    }, 200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const playTone = () => {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    oscillator.type = 'sine';
    oscillator.frequency.value = 110;
    filter.type = 'lowpass';
    filter.frequency.value = 400;
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1);

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.start();

    ctxRef.current = ctx;
    oscRef.current = oscillator;
    gainRef.current = gainNode;
  };

  const stopTone = () => {
    const ctx = ctxRef.current;
    const osc = oscRef.current;
    const gain = gainRef.current;
    if (ctx && osc && gain) {
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
      setTimeout(() => {
        try {
          osc.stop();
          ctx.close();
        } catch {
          // already closed
        }
      }, 600);
    }
    ctxRef.current = null;
    oscRef.current = null;
    gainRef.current = null;
  };

  const handleToggle = () => {
    if (isPlaying) {
      stopTone();
      setIsPlaying(false);
    } else {
      playTone();
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed top-6 right-6 z-[100] flex items-center gap-3 px-4 py-2.5 rounded-full glass-blue glow-blue transition-all duration-300 hover:scale-105"
      aria-label={isPlaying ? 'Mute audio' : 'Play audio'}
    >
      <div className="flex items-end gap-0.5 h-4">
        {bars.map((h, i) => (
          <div
            key={i}
            className={`w-0.5 rounded-full transition-all duration-200 ${
              isPlaying ? 'bg-cyan-400' : 'bg-blue-500/40'
            }`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="w-px h-4 bg-cyber-border/50" />
      {isPlaying ? (
        <Volume2 className="w-4 h-4 text-cyan-400" />
      ) : (
        <VolumeX className="w-4 h-4 text-muted-foreground" />
      )}
      <span className="text-xs font-medium text-foreground/80 hidden sm:inline">
        {isPlaying ? 'Ambient On' : 'Ambient Off'}
      </span>
    </button>
  );
}
