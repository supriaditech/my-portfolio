'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '../Atoms/TextReveal';

const STATS = [
  { value: '2+', label: 'Years Experience', suffix: '' },
  { value: '20+', label: 'Projects Delivered', suffix: '' },
  { value: '15+', label: 'Technologies', suffix: '' },
  { value: '100%', label: 'Client Satisfaction', suffix: '' },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imgRevealRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.about-label', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        x: -30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      });

      if (imgRevealRef.current) {
        gsap.fromTo(
          imgRevealRef.current,
          { scaleX: 1, transformOrigin: 'left center' },
          {
            scaleX: 0,
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        scale: 1.3,
        duration: 1.4,
        delay: 0.3,
        ease: 'power3.out',
      });

      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 60,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'back.out(1.4)',
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-black px-6 py-24 lg:px-20 lg:py-36"
    >
      <div className="absolute left-10 top-10 hidden lg:block">
        <div className="about-label flex items-center gap-3 text-white/25">
          <div className="h-px w-8 bg-white/20" />
          <span className="text-[10px] font-medium uppercase tracking-[0.5em]">02 / About</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mb-20">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
            Who I Am
          </p>
          <TextReveal
            as="h2"
            className="text-4xl font-bold text-white md:text-6xl lg:text-7xl"
            stagger={0.03}
          >
            Turning ideas into digital experiences
          </TextReveal>
          <div className="mt-8 h-px w-20 bg-primary/40" />
        </div>

        <div className="grid gap-16 lg:grid-cols-5 lg:gap-24">
          <div ref={imageRef} className="relative aspect-[4/5] overflow-hidden rounded-3xl lg:col-span-2">
            <div
              ref={imgRevealRef}
              className="absolute inset-0 z-10 bg-black"
              style={{ transformOrigin: 'left center' }}
            />
            <Image
              src="/Images/bgmain.png"
              alt="About"
              fill
              className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />
          </div>

          <div className="flex flex-col justify-center lg:col-span-3">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-white/55">
                I&apos;m a passionate Frontend Developer with a keen eye for design
                and a deep love for creating seamless user experiences. With
                expertise in modern web technologies, I transform complex problems
                into elegant, performant solutions.
              </p>

              <p className="text-lg leading-relaxed text-white/55">
                My approach combines technical precision with creative thinking.
                I believe great software is not just about code — it&apos;s
                about understanding users, anticipating their needs, and crafting
                interfaces that feel intuitive and delightful.
              </p>

              <p className="text-lg leading-relaxed text-white/55">
                When I&apos;m not coding, you&apos;ll find me exploring new
                technologies, contributing to open-source projects, or enjoying a
                good cup of coffee while sketching UI ideas.
              </p>
            </div>

            <div
              ref={statsRef}
              className="mt-14 grid grid-cols-2 gap-8 border-t border-white/[0.06] pt-12 sm:grid-cols-4"
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="group">
                  <div className="mb-2 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white transition-colors group-hover:text-primary md:text-5xl">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-xs uppercase tracking-[0.15em] text-white/25 transition-colors group-hover:text-white/40">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
