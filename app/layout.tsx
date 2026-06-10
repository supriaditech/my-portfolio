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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://supriadi.tech'
  ),
  title: {
    default: 'Supriadi | Frontend Developer',
    template: '%s | Supriadi',
  },
  description:
    'Frontend Developer portfolio of Supriadi — 3+ years crafting modern web & mobile experiences with Next.js, React Native, TypeScript, NestJS, and GSAP animations.',
  keywords: [
    'Supriadi',
    'frontend developer',
    'Next.js developer',
    'React Native developer',
    'TypeScript',
    'portfolio',
    'NestJS',
    'fullstack developer Indonesia',
    'web developer',
  ],
  authors: [{ name: 'Supriadi', url: 'https://supriadi.tech' }],
  creator: 'Supriadi',
  applicationName: 'Supriadi Portfolio',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://supriadi.tech',
    siteName: 'Supriadi Portfolio',
    title: 'Supriadi | Frontend Developer',
    description:
      'Frontend Developer portfolio — crafting modern web & mobile experiences with Next.js, React Native, TypeScript, and GSAP.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Supriadi — Frontend Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Supriadi | Frontend Developer',
    description:
      'Frontend Developer portfolio — crafting modern web & mobile experiences with Next.js, React Native, TypeScript, and GSAP.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://supriadi.tech',
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
