'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const PROJECTS = [
  {
    title: 'E-Commerce Platform',
    category: 'Full-Stack',
    description:
      'A modern e-commerce platform with real-time inventory, seamless checkout, and admin dashboard.',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    color: '#913B28',
  },
  {
    title: 'SaaS Dashboard',
    category: 'Frontend',
    description:
      'Analytics dashboard with real-time data visualization, team collaboration, and dark mode.',
    tags: ['React', 'D3.js', 'Tailwind', 'WebSocket'],
    color: '#3B82F6',
  },
  {
    title: 'Social Media App',
    category: 'Full-Stack',
    description:
      'Feature-rich social platform with real-time chat, stories, and AI-powered content recommendations.',
    tags: ['Next.js', 'GraphQL', 'Redis', 'AWS'],
    color: '#8B5CF6',
  },
  {
    title: 'Portfolio CMS',
    category: 'Frontend',
    description:
      'Headless CMS-driven portfolio with dynamic page builder and advanced GSAP animations.',
    tags: ['Next.js', 'GSAP', 'Sanity', 'Vercel'],
    color: '#EC4899',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const { contextSafe } = useGSAP(
    () => {
      gsap.from('.projects-title', {
        scrollTrigger: {
          trigger: '.projects-title',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 100,
          opacity: 0,
          rotation: i % 2 === 0 ? -2 : 2,
          duration: 0.8,
          delay: 0.15 * i,
          ease: 'power3.out',
        });
      });
    },
    { scope: sectionRef }
  );

  const handleMouseEnter = contextSafe((index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;
    gsap.to(card, {
      y: -12,
      scale: 1.02,
      duration: 0.4,
      ease: 'power2.out',
    });
  });

  const handleMouseLeave = contextSafe((index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;
    gsap.to(card, {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
    });
  });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden bg-black px-6 py-24 lg:px-20 lg:py-36"
    >
      <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[150px]" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <p className="projects-title mb-3 text-sm font-medium uppercase tracking-[0.3em] text-primary">
            Portfolio
          </p>
          <h2 className="projects-title text-4xl font-bold text-white md:text-5xl">
            Featured <span className="text-primary">Projects</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
              className="group cursor-pointer rounded-2xl border border-white/[0.06] bg-zinc-900/50 p-8 backdrop-blur-sm transition-colors hover:border-white/[0.12]"
            >
              <div
                className="mb-4 h-1 w-12 rounded-full"
                style={{ backgroundColor: project.color }}
              />

              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
                {project.category}
              </span>

              <h3 className="mb-3 text-2xl font-bold text-white transition-colors group-hover:text-primary">
                {project.title}
              </h3>

              <p className="mb-6 leading-relaxed text-white/50">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:gap-3">
                View Project
                <span className="text-lg leading-none">&rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
