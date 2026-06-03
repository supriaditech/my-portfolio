'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '../Atoms/TextReveal';

const PROJECTS = [
  {
    title: 'klinikme.com',
    category: 'Healthcare Platform',
    description:
      'Full-scale clinic management with laboratory modules, SWR real-time data, and Atomic Design architecture.',
    tags: ['Next.js', 'TypeScript', 'Zustand', 'SWR'],
    link: 'https://klinikme.com',
  },
  {
    title: 'ModiMinds',
    category: 'EdTech AI Platform',
    description:
      'AI-powered education platform with Smart Question Generator using OpenAI API and NestJS microservices.',
    tags: ['NestJS', 'OpenAI', 'Docker', 'Next.js'],
    link: '#',
  },
  {
    title: 'seindotravel.com',
    category: 'Travel & E-Commerce',
    description:
      'Travel booking platform with Midtrans/Xendit payment integration and real-time status updates.',
    tags: ['Next.js', 'SWR', 'Midtrans', 'React Native'],
    link: 'https://seindotravel.com',
  },
  {
    title: 'PSP3USU',
    category: 'Faculty Management',
    description:
      'Digital attendance system with Geofencing (OpenStreetMap), task management, and CI/CD.',
    tags: ['NestJS', 'Docker', 'GitHub Actions', 'VPS'],
    link: '#',
  },
  {
    title: 'DarkoHr App',
    category: 'HR Mobile App',
    description:
      'React Native HR app with Splash Screen, Tour App, and REST APIs for Organization modules.',
    tags: ['React Native', 'Laravel', 'REST API'],
    link: '#',
  },
  {
    title: 'permataazzurisehat.com',
    category: 'Company Profile',
    description:
      'Modernized company profile with TypeScript migration, Next.js upgrade, and enhanced security.',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    link: 'https://permataazzurisehat.com',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useGSAP(
    () => {
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

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: 0.1 * i,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  const { contextSafe } = useGSAP({ scope: sectionRef });

  const handleCardEnter = contextSafe((index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    gsap.to(card, {
      y: -6,
      borderColor: 'rgba(99, 102, 241, 0.3)',
      boxShadow: '0 12px 40px rgba(99, 102, 241, 0.08)',
      duration: 0.35,
      ease: 'power2.out',
    });
  });

  const handleCardLeave = contextSafe((index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    gsap.to(card, {
      y: 0,
      borderColor: 'rgba(255, 255, 255, 0.06)',
      boxShadow: 'none',
      duration: 0.35,
      ease: 'power2.out',
    });
  });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden bg-black px-6 py-20 lg:px-20 lg:py-32"
    >
      <div className="absolute top-10 left-10 hidden lg:block">
        <div className="projects-label flex items-center gap-3 text-white/20">
          <div className="h-px w-8 bg-white/15" />
          <span className="text-[10px] font-medium tracking-[0.5em] uppercase">
            05 / Projects
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <p className="text-primary mb-3 text-[11px] font-semibold tracking-[0.3em] uppercase">
            Selected Work
          </p>
          <TextReveal
            as="h2"
            className="text-3xl font-bold text-white sm:text-5xl"
            stagger={0.03}
          >
            Featured Projects
          </TextReveal>
        </div>

        <div className="space-y-4">
          {PROJECTS.map((project, i) => (
            <a
              key={project.title}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              href={project.link}
              target={project.link !== '#' ? '_blank' : undefined}
              rel={project.link !== '#' ? 'noopener noreferrer' : undefined}
              onMouseEnter={() => handleCardEnter(i)}
              onMouseLeave={() => handleCardLeave(i)}
              className="group flex flex-col gap-6 rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5 backdrop-blur-sm transition-colors hover:bg-white/[0.03] sm:flex-row sm:items-center sm:gap-10 sm:p-7"
            >
              <div className="flex items-center gap-4 sm:w-48 sm:flex-shrink-0">
                <span className="text-2xl font-black text-white/10 tabular-nums sm:text-3xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="rounded-full border border-white/10 px-3 py-0.5 text-[10px] font-semibold tracking-wider text-white/30 uppercase sm:hidden">
                  {project.category}
                </span>
              </div>

              <div className="flex-1">
                <div className="mb-1 hidden sm:block">
                  <span className="text-primary/70 text-[10px] font-semibold tracking-[0.3em] uppercase">
                    {project.category}
                  </span>
                </div>
                <h3 className="group-hover:text-primary text-xl font-bold text-white transition-colors sm:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-white/40 sm:mt-2">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:flex-shrink-0 sm:flex-col sm:items-end sm:gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium text-white/25 transition-colors group-hover:text-white/45"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-primary/50 ml-auto flex items-center gap-1 text-xs font-semibold opacity-0 transition-all duration-300 group-hover:gap-2 group-hover:opacity-100 sm:ml-0">
                  {project.link !== '#' ? 'Visit' : 'Details'}
                  <span className="transition-transform group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </span>
              </div>
            </a>
          ))}

          <a
            href="/Supriadi-CV-2026.pdf"
            download
            className="group hover:border-primary/25 mt-6 flex items-center justify-center gap-3 rounded-2xl border border-dashed border-white/[0.06] bg-transparent px-8 py-5 transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:text-primary/60 text-white/20 transition-colors"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span className="group-hover:text-primary/70 text-xs font-semibold tracking-[0.3em] text-white/25 uppercase transition-colors">
              Download Resume PDF
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
