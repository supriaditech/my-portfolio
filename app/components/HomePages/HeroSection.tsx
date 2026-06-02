'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextRepulsion from '../Atoms/TextScatter';

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textMain = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        gsap.to(bgImageRef.current, {
          y: '15%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      gsap.from('.hero-badge', {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 0.3,
      });

      gsap.from('.hero-greeting', {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.5,
      });

      gsap.from('.hero-name', {
        y: 100,
        opacity: 0,
        duration: 1.4,
        ease: 'elastic.out(1, 0.5)',
        delay: 0.8,
      });

      gsap.from('.hero-cta', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 1.8,
      });

      gsap.fromTo(
        scrollIndicatorRef.current,
        { y: 0, opacity: 0.6 },
        {
          y: 15,
          opacity: 0.2,
          duration: 1.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 2,
        }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 0.85, ease: 'none' },
        0
      );

      tl.fromTo(
        textMain.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power1.in' },
        0
      );

      if (particlesRef.current) {
        const particles = particlesRef.current.children;
        tl.fromTo(
          particles,
          { scale: 1 },
          { scale: 3, opacity: 0, ease: 'power2.in', stagger: 0.02 },
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
      className="relative h-[300vh] w-full bg-white dark:bg-black"
    >
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        <div ref={bgImageRef} className="absolute inset-0 h-[115%] w-full">
          <Image
            src="/Images/bgmain.png"
            alt="Background"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div
          ref={overlayRef}
          className="absolute inset-0 z-10 bg-black opacity-0"
        />

        <div
          ref={particlesRef}
          className="absolute inset-0 z-5 overflow-hidden"
          aria-hidden="true"
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-[2px] w-[2px] rounded-full bg-white/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>

        <div
          ref={textMain}
          className="relative z-20 flex h-full flex-col justify-center px-6 lg:px-20"
        >
          <div className="max-w-3xl">
            <span className="hero-badge border-primary/40 bg-primary/10 text-primary mb-6 inline-block rounded-full border px-4 py-1.5 text-sm font-medium tracking-widest uppercase">
              Welcome to my world
            </span>

            <p className="hero-greeting font-montserrat text-2xl font-semibold text-white/80 md:text-4xl">
              Hey, I&apos;m a
            </p>

            <TextRepulsion
              text="Frontend"
              strength={1200}
              radius={250}
              className="font-montserrat text-6xl leading-none font-extrabold text-white md:text-8xl"
            />
            <TextRepulsion
              text="Developer"
              strength={1200}
              radius={250}
              className="font-montserrat text-primary text-6xl leading-none font-extrabold md:text-8xl"
            />

            <p className="hero-greeting mt-4 max-w-xl text-lg text-white/50 md:text-xl">
              I craft beautiful, performant web experiences with modern
              technologies. Let&apos;s build something amazing together.
            </p>

            <div className="hero-cta mt-10 flex flex-wrap gap-4">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector('#projects')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group bg-primary hover:bg-primary/90 relative overflow-hidden rounded-full px-8 py-3.5 text-sm font-semibold tracking-wider text-white uppercase transition-colors"
              >
                <span className="relative z-10">View My Work</span>
                <span className="absolute inset-0 z-0 -translate-x-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0" />
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector('#contact')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:border-primary/50 hover:text-primary rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold tracking-wider text-white uppercase backdrop-blur-sm transition-all"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>

        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 cursor-pointer"
          onClick={() =>
            document
              .querySelector('#about')
              ?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs tracking-[0.3em] text-white/40 uppercase">
              Scroll
            </span>
            <div className="from-primary h-8 w-[2px] rounded-full bg-gradient-to-b to-transparent" />
          </div>
        </div>
      </div>
    </main>
  );
}
