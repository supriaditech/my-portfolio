'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('.footer-item', {
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
      className="border-t border-white/[0.03] bg-black px-6 py-14 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="footer-item from-primary to-primary bg-gradient-to-r via-sky-400 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
              Supriadi
            </h3>
            <p className="footer-item mt-2 text-sm text-white/25">
              Crafting digital experiences with code &amp; creativity.
            </p>
          </div>

          <div className="footer-item">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector('#home')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-primary text-xs font-semibold tracking-[0.3em] text-white/25 uppercase transition-colors"
            >
              Back to top &uarr;
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/[0.03] pt-8 md:flex-row">
          <p className="footer-item text-xs text-white/20">
            &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>

          <div className="footer-item flex items-center gap-8">
            {[
              { name: 'GitHub', href: 'https://github.com/supriaditech' },
              {
                name: 'LinkedIn',
                href: 'https://www.linkedin.com/in/supriaditech/',
              },
              { name: 'WhatsApp', href: 'https://wa.me/6282277280453' },
              { name: 'Dribbble', href: '#' },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary text-[11px] font-medium tracking-[0.2em] text-white/20 uppercase transition-colors"
              >
                {social.name}
              </a>
            ))}
          </div>

          <p className="footer-item text-xs text-white/10">
            Built with Next.js &amp; GSAP
          </p>
        </div>
      </div>
    </footer>
  );
}
