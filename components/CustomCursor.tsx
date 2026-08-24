'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable on devices with fine pointer (desktop)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let trailX = 0;
    let trailY = 0;

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: targetX, y: targetY });
      setVisible(true);

      const el = e.target as HTMLElement;
      const interactive = el.closest('a, button, [role="button"], .cursor-pointer, input, textarea');
      setIsHovering(!!interactive);
    };

    const animate = () => {
      trailX += (targetX - trailX) * 0.15;
      trailY += (targetY - trailY) * 0.15;
      setTrail({ x: trailX, y: trailY });
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Outer glow trail */}
      <div
        className="fixed pointer-events-none z-[9998] mix-blend-screen"
        style={{
          left: trail.x,
          top: trail.y,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s',
        }}
      >
        <div
          className={`rounded-full transition-all duration-200 ${
            isHovering
              ? 'w-14 h-14 bg-cyan-400/15'
              : 'w-8 h-8 bg-blue-500/10'
          }`}
          style={{
            filter: 'blur(8px)',
          }}
        />
      </div>
      {/* Inner dot */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-screen"
        style={{
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            isHovering
              ? 'w-3 h-3 bg-cyan-400 glow-cyan'
              : 'w-2 h-2 bg-blue-400 glow-blue'
          }`}
        />
      </div>
    </>
  );
}
