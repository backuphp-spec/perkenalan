'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { navSections } from '@/lib/data';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / total) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-20% 0px -20% 0px' }
    );

    navSections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-[100] bg-cyber-border">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Dot navigation */}
      <nav className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col gap-4">
        {navSections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => handleClick(e, section.id)}
            className="group flex items-center gap-3 justify-end"
            aria-label={section.label}
          >
            <span
              className={`text-xs font-medium transition-all duration-300 ${
                activeSection === section.id
                  ? 'opacity-100 text-cyan-300 translate-x-0'
                  : 'opacity-0 text-muted-foreground translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
              }`}
            >
              {section.label}
            </span>
            <span
              className={`relative block rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? 'w-3.5 h-3.5 bg-cyan-400 glow-cyan'
                  : 'w-2.5 h-2.5 bg-muted-foreground/40 group-hover:bg-cyan-400/60'
              }`}
            >
              {activeSection === section.id && (
                <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-30" />
              )}
            </span>
          </a>
        ))}
      </nav>
    </>
  );
}
