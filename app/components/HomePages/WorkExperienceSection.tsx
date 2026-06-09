'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '../Atoms/TextReveal';

const EXPERIENCES = [
  {
    company: 'PT Code Development Indonesia',
    location: 'Jakarta',
    role: 'Frontend Developer',
    period: 'Mar 2026 \u2013 Present',
    projects: [
      {
        id: 1,
        route:
          'https://play.google.com/store/apps/details?id=com.telkomsel.telkomselcm&hl=en-US&pli=1',
        label: 'My Telkomsel',
      },
    ],
    highlights: [
      'Developed My Telkomsel mini app using Tencent Mini App framework with Taro.js for cross-platform compatibility.',
      'Optimized code management practices to align with Tencent Mini App standards, ensuring maximum efficiency and maintainability.',
      'Managed global state using Zustand and built responsive UIs with Tailwind CSS within the Taro.js ecosystem.',
    ],
  },

  {
    company: 'PT. Permata Azzuri Sehat',
    location: 'Jakarta',
    role: 'Frontend Developer',
    period: 'Mar 2025 \u2013 Present',
    projects: [
      { id: 2, route: 'https://klinikme.com/', label: 'klinikme.com' },
      {
        id: 3,
        route: 'https://helloklinikme.com/',
        label: 'helloklinikme.com',
      },
      {
        id: 4,
        route: 'https://permataazzurisehat.com/',
        label: 'permataazzurisehat.com',
      },
    ],
    highlights: [
      'Spearheaded legacy code migration from JavaScript to TypeScript and Next.js version upgrades.',
      'Implemented SWR for real-time data management and caching; decoupled business logic into Custom Hooks.',
      'Re-architected component structure using Atomic Design principles and Zustand for global state.',
      'Developed laboratory result input modules with complex conditional validation via React Hook Form.',
    ],
  },
  {
    company: 'PT. Indako Trading Coy',
    location: 'Medan',
    role: 'Mobile Developer',
    period: 'Jan 2025 \u2013 Feb 2025',
    projects: [
      {
        id: 5,
        route:
          'https://play.google.com/store/apps/details?id=com.darkotech.hr&hl=id',
        label: 'DarkoHr App',
      },
    ],
    highlights: [
      'Designed API Contracts and built REST APIs using Laravel for Organization & Announcement features.',
      'Developed Splash Screen, Tour App, and UI Redesign for the DarkoHr React Native application.',
    ],
  },
  {
    company: 'PT. Seindo Travel',
    location: 'Medan',
    role: 'Frontend Developer',
    period: 'Dec 2022 \u2013 Dec 2024',
    projects: [
      {
        id: 6,
        route: 'https://www.seindotravel.co.id/',
        label: 'seindotravel.com',
      },
      { id: 7, route: '', label: 'seindotransport.com' },
      { id: 8, route: 'https://www.bemore.id/', label: 'bemore.id' },
      {
        id: 9,
        route:
          'https://play.google.com/store/apps/details?id=com.seindogroup.seindotravel&hl=en-US',
        label: 'Seindo Travel App',
      },
    ],
    highlights: [
      'Integrated Midtrans & Xendit payment gateways using SWR Mutation for real-time status updates.',
      'Designed structured Git Branching strategy for the team, significantly minimizing merge conflicts.',
      'Developed high-performance ticket booking mobile app (React Native) and E-Commerce websites.',
    ],
  },
];

export default function WorkExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.exp-label', {
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

      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          scaleY: 0,
          duration: 1,
          ease: 'power3.inOut',
          transformOrigin: 'top center',
        });
      }

      gsap.from('.exp-card', {
        scrollTrigger: {
          trigger: '.exp-cards',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        x: -60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });

      gsap.from('.exp-highlight', {
        scrollTrigger: {
          trigger: '.exp-cards',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        delay: 0.5,
        ease: 'power2.out',
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-hidden bg-black px-6 py-24 lg:px-20 lg:py-36"
    >
      <div className="absolute top-10 left-10 hidden lg:block">
        <div className="exp-label flex items-center gap-3 text-white/25">
          <div className="h-px w-8 bg-white/20" />
          <span className="text-[10px] font-medium tracking-[0.5em] uppercase">
            03 / Experience
          </span>
        </div>
      </div>

      <div
        className="absolute top-1/3 -right-40 h-150 w-150 translate-x-1/2 rounded-full opacity-[0.02] blur-[120px]"
        style={{
          background: 'radial-gradient(circle, #6366F1 0%, transparent 70%)',
        }}
      />

      <div className="mx-auto max-w-7xl">
        <div className="mb-20">
          <p className="text-primary mb-4 text-[11px] font-semibold tracking-[0.3em] uppercase">
            Career Path
          </p>
          <TextReveal
            as="h2"
            className="text-4xl font-bold text-white md:text-6xl"
            stagger={0.03}
          >
            Work Experience
          </TextReveal>
          <div className="bg-primary/40 mt-8 h-px w-20" />
        </div>

        <div className="exp-cards relative">
          <div
            ref={lineRef}
            className="from-primary/50 absolute top-0 left-0 hidden h-full w-px bg-linear-to-b via-white/[0.06] to-transparent lg:block"
          />

          <div className="space-y-16 lg:space-y-24">
            {EXPERIENCES.map((exp, i) => (
              <div key={i} className="exp-card relative lg:pl-16">
                <div className="border-primary absolute top-1.5 -left-1.25 hidden h-2.5 w-2.5 rounded-full border-2 bg-black lg:block" />

                <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-baseline gap-3">
                      <h3 className="text-2xl font-bold text-white">
                        {exp.company}
                      </h3>
                      <span className="text-xs font-medium text-white/20">
                        {exp.location}
                      </span>
                    </div>
                    <p className="text-primary mt-1 text-sm font-semibold">
                      {exp.role}
                    </p>
                    <p className="mt-0.5 text-xs tracking-wider text-white/25 uppercase">
                      {exp.period}
                    </p>
                  </div>
                </div>

                <p className="mb-5 text-[13px] font-medium tracking-wider text-white/15 uppercase">
                  Key Projects:{' '}
                  <span className="text-white/35">
                    {exp.projects.map((p, idx) => (
                      <span key={p.id}>
                        {idx > 0 && ' · '}
                        {p.route ? (
                          <a
                            href={p.route}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-white/70"
                          >
                            {p.label}
                          </a>
                        ) : (
                          p.label
                        )}
                      </span>
                    ))}
                  </span>
                </p>

                <ul className="space-y-3">
                  {exp.highlights.map((h, j) => (
                    <li
                      key={j}
                      className="exp-highlight flex gap-3 text-sm leading-relaxed text-white/45"
                    >
                      <span className="bg-primary/40 mt-1.5 h-1 w-1 shrink-0 rounded-full" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
