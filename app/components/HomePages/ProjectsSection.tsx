'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '../Atoms/TextReveal';
import Magnetic from '../Atoms/Magnetic';

const PROJECTS = [
  {
    title: 'E-Commerce Platform',
    category: 'Full-Stack Development',
    description: 'A modern e-commerce platform with real-time inventory, seamless checkout, and admin dashboard.',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    year: '2025',
  },
  {
    title: 'SaaS Dashboard',
    category: 'Frontend Architecture',
    description: 'Analytics dashboard with real-time data visualization, team collaboration, and dark mode.',
    tags: ['React', 'D3.js', 'Tailwind', 'WebSocket'],
    year: '2025',
  },
  {
    title: 'Social Media App',
    category: 'Full-Stack Development',
    description: 'Feature-rich social platform with real-time chat, stories, and AI-powered recommendations.',
    tags: ['Next.js', 'GraphQL', 'Redis', 'AWS'],
    year: '2024',
  },
  {
    title: 'Portfolio CMS',
    category: 'Frontend Development',
    description: 'Headless CMS-driven portfolio with dynamic page builder and advanced GSAP animations.',
    tags: ['Next.js', 'GSAP', 'Sanity', 'Vercel'],
    year: '2024',
  },
  {
    title: 'FinTech Mobile App',
    category: 'UI/UX Engineering',
    description: 'Banking application with biometric auth, real-time transactions, and investment tracking.',
    tags: ['React Native', 'Node.js', 'MongoDB', 'Plaid'],
    year: '2024',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!trackRef.current || !pinRef.current) return;

      const cards = cardsRef.current.filter(Boolean);
      const totalScroll = trackRef.current.scrollWidth - window.innerWidth;

      gsap.to(trackRef.current, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.from('.projects-label', {
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

      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, rotateX: 10 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.9,
            delay: 0.12 * i,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: pinRef.current,
              start: 'top top',
              toggleActions: 'play none none reset',
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  const { contextSafe } = useGSAP({ scope: sectionRef });

  const handleCardEnter = contextSafe((index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;
    gsap.to(card, {
      y: -16,
      scale: 1.03,
      borderColor: 'rgba(145, 59, 40, 0.4)',
      boxShadow: '0 20px 60px rgba(145, 59, 40, 0.1)',
      duration: 0.5,
      ease: 'power3.out',
    });
    gsap.to(card.querySelector('.card-arrow') as Element, {
      x: 6,
      opacity: 1,
      duration: 0.3,
    });
  });

  const handleCardLeave = contextSafe((index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;
    gsap.to(card, {
      y: 0,
      scale: 1,
      borderColor: 'rgba(255, 255, 255, 0.05)',
      boxShadow: 'none',
      duration: 0.5,
      ease: 'power3.out',
    });
    gsap.to(card.querySelector('.card-arrow') as Element, {
      x: 0,
      opacity: 0.4,
      duration: 0.3,
    });
  });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden bg-black"
    >
      <div
        ref={pinRef}
        className="h-dvh w-full"
        style={{ overflow: 'hidden' }}
      >
        <div className="absolute left-10 top-10 z-30 hidden lg:block">
          <div className="projects-label flex items-center gap-3 text-white/25">
            <div className="h-px w-8 bg-white/20" />
            <span className="text-[10px] font-medium uppercase tracking-[0.5em]">04 / Projects</span>
          </div>
        </div>

        <div className="absolute left-0 top-0 z-20 p-6 lg:p-20">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
            Selected Work
          </p>
          <TextReveal
            as="h2"
            className="text-4xl font-bold text-white md:text-6xl"
            stagger={0.04}
          >
            Featured Projects
          </TextReveal>
          <div className="mt-6 h-px w-16 bg-primary/50" />
        </div>

        <div
          ref={trackRef}
          className="flex h-full items-center"
          style={{ width: 'max-content', paddingLeft: '4vw', paddingRight: '4vw' }}
        >
          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              onMouseEnter={() => handleCardEnter(i)}
              onMouseLeave={() => handleCardLeave(i)}
              className="group relative mr-8 flex h-[420px] w-[380px] flex-shrink-0 cursor-pointer flex-col justify-end overflow-hidden rounded-3xl border border-white/[0.05] bg-zinc-900/60 p-8 backdrop-blur-md transition-colors md:h-[500px] md:w-[440px]"
            >
              <div className="absolute left-8 top-8 flex items-center gap-3">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/25">
                  {project.year}
                </span>
                <div className="h-px w-6 bg-white/10" />
                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-primary">
                  {project.category}
                </span>
              </div>

              <div className="mt-auto">
                <h3 className="mb-3 text-3xl font-bold text-white transition-colors group-hover:text-primary md:text-4xl">
                  {project.title}
                </h3>

                <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/35">
                  {project.description}
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-white/[0.03] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/25 transition-colors group-hover:text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                    View Case Study
                  </span>
                  <span className="card-arrow text-lg text-primary opacity-40 transition-all duration-300">
                    &rarr;
                  </span>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 text-[120px] font-black leading-none text-white/[0.015] select-none">
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>
          ))}

          <Magnetic strength={0.2}>
            <div className="mr-8 flex h-[420px] w-[280px] flex-shrink-0 cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-white/[0.05] bg-transparent transition-colors hover:border-primary/20 md:h-[500px] md:w-[320px]">
              <span className="mb-3 text-4xl text-white/15">+</span>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/20">
                More Coming
              </span>
            </div>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
