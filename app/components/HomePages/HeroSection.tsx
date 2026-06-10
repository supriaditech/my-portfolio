'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import TextRepulsion from '../Atoms/TextScatter';
import TextReveal from '../Atoms/TextReveal';
import Magnetic from '../Atoms/Magnetic';

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textMain = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const sectionLabelRef = useRef<HTMLDivElement>(null);
  const glowingOrbRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        gsap.to(bgImageRef.current, {
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });

        gsap.to(glowingOrbRef.current, {
          x: '20%',
          y: '10%',
          scale: 1.3,
          opacity: 0.4,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

      gsap.from('.hero-badge', {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(2)',
        delay: 0.2,
      });

      gsap.from('.hero-section-label', {
        x: -20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 1.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      gsap.from('.hero-greeting', {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.4,
      });

      gsap.from('.hero-number', {
        scale: 0,
        rotation: -90,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 1.2,
      });

      gsap.from('.hero-cta', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 1.8,
      });

      gsap.from('.hero-line', {
        scaleX: 0,
        duration: 1.2,
        delay: 1,
        ease: 'power3.inOut',
        transformOrigin: 'left center',
      });

      gsap.from('.hero-scroll-hint', {
        opacity: 0,
        y: -10,
        duration: 0.6,
        delay: 3,
        ease: 'power2.out',
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 0.78, ease: 'none' },
        0
      );

      tl.fromTo(
        textMain.current,
        { opacity: 1, filter: 'blur(0px)' },
        { opacity: 0, filter: 'blur(8px)', ease: 'power1.in' },
        0
      );

      if (clipRef.current) {
        tl.fromTo(
          clipRef.current,
          { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
          {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
            ease: 'power2.inOut',
          },
          0
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <main
      ref={containerRef}
      id="home"
      className="relative h-[400vh] w-full bg-black"
    >
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        <div ref={clipRef} className="absolute inset-0">
          <div
            ref={bgImageRef}
            className="absolute inset-0 h-full w-full scale-105"
          >
            <Image
              src="/Images/bgmain.png"
              alt="Background"
              fill
              priority
              className="object-cover"
            />
          </div>
          <div
            ref={glowingOrbRef}
            className="absolute -top-20 -left-20 h-[60vw] w-[60vw] rounded-full opacity-20 blur-[100px]"
            style={{
              background:
                'radial-gradient(circle, #6366F1 0%, transparent 70%)',
            }}
          />
        </div>

        <div
          ref={overlayRef}
          className="absolute inset-0 z-10 bg-black opacity-0"
        />

        <div className="absolute top-0 right-0 bottom-0 left-0 z-5">
          <div className="absolute top-[20%] left-10 hidden lg:block">
            <div
              ref={sectionLabelRef}
              className="hero-section-label flex items-center gap-3 text-white/25"
            >
              <div className="h-px w-8 bg-white/20" />
              <span className="text-[10px] font-medium tracking-[0.5em] uppercase">
                01 / Intro
              </span>
            </div>
          </div>
        </div>

        <div
          ref={textMain}
          className="relative z-20 flex h-full flex-col justify-center px-6 lg:px-20"
        >
          <div className="max-w-4xl">
            <span className="hero-badge border-primary/30 bg-primary/5 text-primary mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-semibold tracking-[0.3em] uppercase">
              <span className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full" />
              Available for projects
            </span>

            <div className="hero-line from-primary mb-8 h-px w-24 bg-linear-to-r to-transparent" />

            <p className="hero-greeting font-montserrat text-lg font-medium tracking-[0.3em] text-white/50 uppercase md:text-xl">
              Hey, I&apos;m
            </p>

            <TextRepulsion
              text="Supriadi"
              strength={1400}
              radius={280}
              className="font-montserrat text-5xl leading-[1.05] font-extrabold text-white sm:text-7xl md:text-9xl"
            />

            <p className="hero-greeting font-montserrat text-primary/60 text-base font-medium tracking-[0.3em] uppercase sm:text-lg md:text-xl">
              Frontend Developer
            </p>

            <div className="hero-greeting mt-8 max-w-xl">
              <TextReveal
                as="p"
                className="text-sm leading-relaxed text-white/50 sm:text-base md:text-lg"
                delay={0.5}
                stagger={0.02}
              >
                3+ years specializing in Next.js, React Native &amp; TypeScript.
                Fullstack-capable with NestJS, AI integration (OpenAI), and
                DevOps expertise.
              </TextReveal>
            </div>

            <div className="hero-cta mt-10 flex flex-wrap items-center gap-4 sm:mt-12 sm:gap-6">
              <Magnetic strength={0.3}>
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector('#projects')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group bg-primary relative flex items-center gap-2 overflow-hidden rounded-full px-7 py-3 sm:gap-3 sm:px-10 sm:py-4"
                >
                  <span className="relative z-10 text-xs font-semibold tracking-[0.2em] text-white uppercase sm:text-sm">
                    View My Work
                  </span>
                  <span className="relative z-10 text-white transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                  <span className="absolute inset-0 z-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0" />
                </a>
              </Magnetic>

              <Magnetic strength={0.3}>
                <a
                  href="#experience"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector('#experience')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="relative text-xs font-semibold tracking-[0.2em] text-white/40 uppercase transition-colors hover:text-white sm:text-sm"
                >
                  Experience
                  <span className="bg-primary absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full" />
                </a>
              </Magnetic>

              <Magnetic strength={0.3}>
                <a
                  href="/Supriadi-CV-2026.pdf"
                  download
                  className="text-primary/60 hover:text-primary relative flex items-center gap-1.5 text-xs font-semibold tracking-[0.2em] uppercase transition-colors sm:gap-2 sm:text-sm"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:h-3.5 sm:w-3.5"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download CV
                  <span className="bg-primary absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full" />
                </a>
              </Magnetic>
            </div>
          </div>

          <div className="hero-number absolute right-10 bottom-12 hidden lg:block">
            <span className="text-[140px] leading-none font-black text-white/3">
              01
            </span>
          </div>
        </div>

        <div className="hero-scroll-hint absolute bottom-8 left-1/2 z-20 -translate-x-1/2 cursor-pointer lg:hidden">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-px bg-linear-to-b from-white/30 to-transparent" />
            <span className="text-[10px] tracking-[0.4em] text-white/20 uppercase">
              Scroll
            </span>
          </div>
        </div>

        <div className="hero-scroll-hint absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 cursor-pointer lg:flex">
          <div className="flex flex-col items-center gap-4">
            <span className="text-[10px] font-medium tracking-[0.4em] text-white/20 uppercase">
              Scroll to explore
            </span>
            <svg
              className="animate-bounce text-white/15"
              width="16"
              height="24"
              viewBox="0 0 16 24"
              fill="none"
            >
              <rect
                x="1"
                y="1"
                width="14"
                height="22"
                rx="7"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle cx="8" cy="7" r="2" fill="currentColor">
                <animate
                  attributeName="cy"
                  values="7;13;7"
                  dur="1.8s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>
        </div>
      </div>
    </main>
  );
}
