import type { Metadata } from 'next';
import { Geist, Geist_Mono, Montserrat } from 'next/font/google';
import './globals.css';
import GSAPInit from '@components/Gsap/GSAPInit';
import CustomCursor from '@components/Atoms/CustomCursor';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Portfolio | Frontend Developer',
  description:
    'Professional frontend developer portfolio showcasing modern web experiences with Next.js, GSAP, and TypeScript.',
  keywords: ['frontend', 'developer', 'portfolio', 'react', 'nextjs', 'gsap'],
  openGraph: {
    title: 'Portfolio | Frontend Developer',
    description:
      'Professional frontend developer portfolio showcasing modern web experiences.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${montserrat.variable} ${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <GSAPInit />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
