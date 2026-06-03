'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '../Atoms/TextReveal';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

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
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-black px-6 py-24 lg:px-20 lg:py-36"
    >
      <div className="absolute top-10 left-10 hidden lg:block">
        <div className="about-label flex items-center gap-3 text-white/25">
          <div className="h-px w-8 bg-white/20" />
          <span className="text-[10px] font-medium tracking-[0.5em] uppercase">
            02 / About
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mb-20">
          <p className="text-primary mb-4 text-[11px] font-semibold tracking-[0.3em] uppercase">
            Who I Am
          </p>
          <TextReveal
            as="h2"
            className="text-4xl font-bold text-white md:text-6xl"
            stagger={0.03}
          >
            Professional Summary
          </TextReveal>
          <div className="bg-primary/40 mt-8 h-px w-20" />
        </div>

        <div className="grid gap-20 lg:grid-cols-5">
          <div className="space-y-8 lg:col-span-3">
            <div className="space-y-5 text-lg leading-relaxed text-white/55">
              <p>
                Frontend Developer with{' '}
                <span className="font-semibold text-white/80">
                  3 years of experience
                </span>{' '}
                specializing in the{' '}
                <span className="text-primary/80">
                  Next.js, React Native, and TypeScript
                </span>{' '}
                ecosystem, supported by robust Fullstack (NestJS) capabilities.
              </p>
              <p>
                Masters modern frontend architecture including{' '}
                <span className="text-white/80">
                  state management (Zustand)
                </span>
                ,{' '}
                <span className="text-white/80">
                  real-time data fetching optimization (SWR)
                </span>
                , and efficient{' '}
                <span className="text-white/80">Git Flow strategies</span>.
              </p>
              <p>
                Proven <span className="text-primary/80">DevOps expertise</span>{' '}
                (Docker/VPS/CI/CD) in building AI-based Education Platforms
                (OpenAI) and Payment Gateway integrations.
              </p>
              <p>
                Currently focused on{' '}
                <span className="text-white/80">
                  code refactoring and system scalability
                </span>{' '}
                enhancements at PT. Permata Azzuri Sehat.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-white/[0.04] bg-white/[0.01] p-8 backdrop-blur-sm">
              <h3 className="mb-6 text-lg font-bold text-white">Education</h3>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-white/80">
                    Universitas Negeri Medan
                  </p>
                  <p className="mt-0.5 text-xs text-white/35">
                    Bachelor of Education in Informatics &amp; Computer
                    Engineering
                  </p>
                  <p className="mt-1 text-xs text-white/20">
                    July 2020 &ndash; June 2024
                  </p>
                </div>

                <div className="border-t border-white/[0.04] pt-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-primary text-4xl font-bold">
                      3.71
                    </span>
                    <span className="text-xs text-white/25">GPA / 4.00</span>
                  </div>
                </div>

                <div className="border-t border-white/[0.04] pt-4">
                  <p className="mb-2 text-[10px] font-semibold tracking-[0.3em] text-white/20 uppercase">
                    Thesis
                  </p>
                  <p className="text-sm leading-relaxed text-white/40">
                    Development of an Artificial Intelligence-Based Android
                    Application for Adaptive Learning Support Assessment
                    Systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
