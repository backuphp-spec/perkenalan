import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk, Inter, Lora } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-lora',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MABA UIN Jakarta 2024 — Cyber Portfolio',
  description:
    'Portfolio interaktif MABA UIN Syarif Hidayatullah Jakarta — Perkenalan, Hobi, Target, Kampanye Digital, JJ Showcase, dan Statement Pelopor Peradaban Digital.',
  openGraph: {
    title: 'MABA UIN Jakarta 2024 — Cyber Portfolio',
    description:
      'Portfolio interaktif MABA UIN Jakarta — Perkenalan, Hobi, Target, Kampanye Digital, JJ Showcase, dan Statement Pelopor Peradaban Digital.',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${lora.variable} font-body antialiased noise-overlay`}
      >
        {children}
      </body>
    </html>
  );
}
