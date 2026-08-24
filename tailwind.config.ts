import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        // Deep Cyber Dark palette
        cyber: {
          bg: '#090d16',
          surface: '#0b0f19',
          card: '#0e1320',
          border: '#1a2236',
          'border-light': '#243049',
          blue: '#3b82f6',
          'blue-bright': '#60a5fa',
          'blue-neon': '#00f0ff',
          cyan: '#06b6d4',
          'cyan-neon': '#22d3ee',
          purple: '#8b5cf6',
          gold: '#f59e0b',
          green: '#10b981',
        },
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'beam-move': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '30%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        'border-beam': {
          '0%': { offsetDistance: '0%' },
          '100%': { offsetDistance: '100%' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'glitch': {
          '0%, 100%': { transform: 'translate(0)', filter: 'brightness(1)' },
          '20%': { transform: 'translate(-2px, 2px)', filter: 'brightness(1.8) hue-rotate(15deg)' },
          '40%': { transform: 'translate(-2px, -2px)', filter: 'brightness(2.2) hue-rotate(-10deg)' },
          '60%': { transform: 'translate(2px, 2px)', filter: 'brightness(1.5) hue-rotate(20deg)' },
          '80%': { transform: 'translate(2px, -2px)', filter: 'brightness(1.3)' },
        },
        'shake': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(-3px, 1px) rotate(-1deg)' },
          '50%': { transform: 'translate(3px, -1px) rotate(1deg)' },
          '75%': { transform: 'translate(-1px, 3px) rotate(-0.5deg)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        'eq-bar': {
          '0%, 100%': { height: '20%' },
          '50%': { height: '100%' },
        },
        'marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'aurora': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.3' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)', opacity: '0.5' },
          '66%': { transform: 'translate(-20px, 30px) scale(0.95)', opacity: '0.4' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'beam-move': 'beam-move 4s linear infinite',
        'border-beam': 'border-beam 3s linear infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'glitch': 'glitch 0.3s linear infinite',
        'shake': 'shake 0.4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
        'eq-bar': 'eq-bar 0.4s ease-in-out infinite',
        'marquee': 'marquee 20s linear infinite',
        'aurora': 'aurora 12s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
