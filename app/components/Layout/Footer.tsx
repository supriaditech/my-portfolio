'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.footer-text', {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 95%',
          toggleActions: 'play none none reverse',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      });
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="border-t border-white/[0.04] bg-black px-6 py-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="footer-text text-sm text-white/30">
            &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>

          <div className="footer-text flex items-center gap-6">
            {['GitHub', 'LinkedIn', 'Twitter'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-sm text-white/30 transition-colors hover:text-primary"
              >
                {social}
              </a>
            ))}
          </div>

          <p className="footer-text text-sm text-white/20">
            Built with Next.js &amp; GSAP
          </p>
        </div>
      </div>
    </footer>
  );
}
