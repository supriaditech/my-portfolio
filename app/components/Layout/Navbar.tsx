'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
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
  const navInnerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const menuBgRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      gsap.from(navInnerRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      });

      ScrollTrigger.create({
        start: 1,
        end: 100,
        onLeave: () => {
          gsap.to(navbarRef.current, {
            backgroundColor: 'rgba(10, 10, 10, 0.92)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
            duration: 0.5,
          });
        },
        onEnterBack: () => {
          gsap.to(navbarRef.current, {
            backgroundColor: 'rgba(10, 10, 10, 0)',
            backdropFilter: 'blur(0px)',
            borderBottom: '1px solid rgba(255,255,255,0)',
            duration: 0.5,
          });
        },
      });
    },
    { scope: navbarRef }
  );

  useEffect(() => {
    const handleScroll = () => {
      let current = 'home';
      const scrollPos = window.scrollY + 200;

      NAV_LINKS.forEach((link) => {
        const section = document.querySelector(link.href) as HTMLElement | null;
        if (!section) return;
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          current = link.href.replace('#', '');
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openMenu = useCallback(() => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.set(menuRef.current, { display: 'flex' })
      .to(menuBgRef.current, {
        scale: 30,
        duration: 0.8,
        ease: 'power3.inOut',
      })
      .fromTo(
        menuItemsRef.current.filter(Boolean),
        { y: 60, opacity: 0, rotation: 5 },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
        },
        '-=0.3'
      );
  }, []);

  const closeMenu = useCallback(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpen(false);
        document.body.style.overflow = '';
        gsap.set(menuRef.current, { display: 'none' });
      },
    });

    tl.to(menuItemsRef.current.filter(Boolean), {
      y: -40,
      opacity: 0,
      duration: 0.3,
      stagger: 0.04,
      ease: 'power2.in',
    }).to(
      menuBgRef.current,
      {
        scale: 0,
        duration: 0.6,
        ease: 'power3.inOut',
      },
      '-=0.1'
    );
  }, []);

  useEffect(() => {
    if (isOpen) {
      openMenu();
    }
    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
    };
  }, [isOpen, openMenu]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isMobile = false
  ) => {
    e.preventDefault();
    if (isMobile) {
      closeMenu();
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 400);
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav
        ref={navbarRef}
        className="fixed top-0 right-0 left-0 z-[100] w-full border-transparent transition-all duration-300"
      >
        <div
          ref={navInnerRef}
          className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-20"
        >
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="group relative"
          >
            <span className="from-primary to-primary relative z-10 bg-gradient-to-r via-amber-500 bg-[length:200%_100%] bg-clip-text text-xl font-bold text-transparent transition-all duration-500 group-hover:bg-right">
              Portfolio
            </span>
          </a>

          <div className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`group relative py-1 text-[13px] font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${
                    isActive
                      ? 'text-white'
                      : 'text-white/40 hover:text-white/80'
                  }`}
                >
                  {link.label}
                  <span
                    className={`bg-primary absolute bottom-0 left-0 h-px transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              );
            })}
          </div>

          <button
            onClick={() => (isOpen ? closeMenu() : setIsOpen(true))}
            className="group relative z-[200] flex h-12 w-12 items-center justify-center lg:hidden"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="relative flex h-5 w-7 flex-col justify-between">
              <span
                className={`block h-px w-full origin-left bg-white transition-all duration-300 ${
                  isOpen
                    ? 'translate-x-px scale-x-110 rotate-45'
                    : 'group-hover:scale-x-75'
                }`}
              />
              <span
                className={`block h-px w-full bg-white transition-all duration-300 ${
                  isOpen ? 'scale-x-0 opacity-0' : ''
                }`}
              />
              <span
                className={`block h-px w-full origin-left bg-white transition-all duration-300 ${
                  isOpen
                    ? '-translate-x-px scale-x-110 -rotate-45'
                    : 'group-hover:scale-x-75'
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      <div
        ref={menuRef}
        className="fixed inset-0 z-[150] hidden items-center justify-center"
        style={{ display: 'none' }}
      >
        <div
          ref={menuBgRef}
          className="bg-primary absolute top-6 right-6 h-6 w-6 scale-0 rounded-full"
          style={{ transformOrigin: 'center center' }}
        />

        <nav className="relative z-10 flex flex-col items-center gap-10">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              ref={(el) => {
                menuItemsRef.current[i] = el;
              }}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href, true)}
              className="text-4xl font-extrabold tracking-widest text-white uppercase transition-colors hover:text-amber-300 sm:text-5xl"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
