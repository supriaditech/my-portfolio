'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const navbarRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const menuRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(navbarRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      ScrollTrigger.create({
        trigger: document.body,
        start: 'top -100px',
        onEnterBack: () => {
          gsap.to(navbarRef.current, {
            backgroundColor: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(12px)',
            duration: 0.4,
          });
        },
        onLeave: () => {
          gsap.to(navbarRef.current, {
            backgroundColor: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(12px)',
            duration: 0.4,
          });
        },
        onEnter: () => {
          gsap.to(navbarRef.current, {
            backgroundColor: 'rgba(10, 10, 10, 0)',
            backdropFilter: 'blur(0px)',
            duration: 0.4,
          });
        },
        onLeaveBack: () => {
          gsap.to(navbarRef.current, {
            backgroundColor: 'rgba(10, 10, 10, 0)',
            backdropFilter: 'blur(0px)',
            duration: 0.4,
          });
        },
      });
    },
    { scope: navbarRef }
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map((link) =>
        document.querySelector(link.href)
      );

      let current = 'home';
      sections.forEach((section, index) => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150) {
          current = NAV_LINKS[index].href.replace('#', '');
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        menuRef.current,
        { x: '100%', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
        }
      );
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navbarRef}
      className="fixed top-0 right-0 left-0 z-50 w-full px-6 py-4 transition-colors lg:px-20"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div
          ref={logoRef}
          className="group cursor-pointer"
          onClick={() =>
            document
              .querySelector('#home')
              ?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          <h2 className="from-primary bg-gradient-to-r to-amber-400 bg-clip-text text-2xl font-bold text-transparent">
            Portfolio
          </h2>
        </div>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              ref={(el) => {
                linksRef.current[i] = el;
              }}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`relative text-sm font-medium tracking-wider uppercase transition-colors ${
                activeSection === link.href.replace('#', '')
                  ? 'text-primary'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {link.label}
              {activeSection === link.href.replace('#', '') && (
                <span className="bg-primary absolute -bottom-1 left-0 h-[2px] w-full rounded-full" />
              )}
            </a>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-[2px] w-6 rounded-full bg-white transition-all duration-300 ${
              isOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-6 rounded-full bg-white transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-6 rounded-full bg-white transition-all duration-300 ${
              isOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      <div
        ref={menuRef}
        className={`fixed inset-0 z-40 flex translate-x-full flex-col items-center justify-center gap-8 bg-black/95 backdrop-blur-xl transition-transform lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="hover:text-primary text-3xl font-bold text-white/80 transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
