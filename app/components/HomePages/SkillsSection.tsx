'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SKILLS = [
  { name: 'React / Next.js', level: 95, color: '#61DAFB' },
  { name: 'TypeScript', level: 90, color: '#3178C6' },
  { name: 'Tailwind CSS', level: 95, color: '#06B6D4' },
  { name: 'GSAP / Framer Motion', level: 88, color: '#88CE02' },
  { name: 'Node.js', level: 80, color: '#339933' },
  { name: 'Figma / UI Design', level: 75, color: '#F24E1E' },
  { name: 'Git / GitHub', level: 92, color: '#F05032' },
  { name: 'REST API / GraphQL', level: 82, color: '#E10098' },
];

const TECH_LOGOS = [
  'React', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js',
  'Git', 'Figma', 'Docker', 'GraphQL', 'PostgreSQL',
  'MongoDB', 'AWS', 'Vercel', 'Redux', 'Jest',
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const techGridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.skills-title', {
        scrollTrigger: {
          trigger: '.skills-title',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.skills-subtitle', {
        scrollTrigger: {
          trigger: '.skills-subtitle',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      });

      barsRef.current.forEach((bar, i) => {
        gsap.from(bar, {
          scrollTrigger: {
            trigger: bar,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
          width: 0,
          duration: 1.2,
          delay: 0.1 * i,
          ease: 'power3.inOut',
        });
      });

      if (techGridRef.current) {
        gsap.from(techGridRef.current.children, {
          scrollTrigger: {
            trigger: techGridRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
          scale: 0,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'back.out(2)',
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-hidden bg-zinc-950 px-6 py-24 lg:px-20 lg:py-36"
    >
      <div className="absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="skills-title mb-3 text-sm font-medium uppercase tracking-[0.3em] text-primary">
            My Arsenal
          </p>
          <h2 className="skills-title text-4xl font-bold text-white md:text-5xl">
            Tech <span className="text-primary">Stack</span>
          </h2>
          <p className="skills-subtitle mx-auto mt-4 max-w-xl text-white/40">
            Technologies I use to bring ideas to life
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-8">
            {SKILLS.map((skill, i) => (
              <div key={skill.name}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-white/70">
                    {skill.name}
                  </span>
                  <span className="text-sm font-bold text-white/40">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <div
                    ref={(el) => {
                      barsRef.current[i] = el;
                    }}
                    className="h-full rounded-full"
                    style={{
                      width: `${skill.level}%`,
                      backgroundColor: skill.color,
                      boxShadow: `0 0 20px ${skill.color}40`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div
            ref={techGridRef}
            className="flex flex-wrap items-center gap-3 lg:pt-6"
          >
            {TECH_LOGOS.map((tech) => (
              <span
                key={tech}
                className="inline-block rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-white/60 backdrop-blur-sm transition-all hover:border-primary/30 hover:text-primary hover:shadow-[0_0_20px_rgba(145,59,40,0.15)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
