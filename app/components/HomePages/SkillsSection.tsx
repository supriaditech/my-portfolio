'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '../Atoms/TextReveal';

const SKILLS = [
  { name: 'React / Next.js', level: 95, color: '#61DAFB' },
  { name: 'TypeScript', level: 90, color: '#3178C6' },
  { name: 'Tailwind CSS', level: 95, color: '#38BDF8' },
  { name: 'GSAP / Animations', level: 92, color: '#88CE02' },
  { name: 'Node.js / Express', level: 80, color: '#339933' },
  { name: 'Figma / UI Design', level: 78, color: '#F24E1E' },
  { name: 'Git / DevOps', level: 92, color: '#F05032' },
  { name: 'REST / GraphQL', level: 85, color: '#E10098' },
];

const TECH_TAGS = [
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js',
  'Git', 'Figma', 'Docker', 'GraphQL', 'PostgreSQL',
  'MongoDB', 'AWS', 'Vercel', 'Redux', 'Jest',
  'Prisma', 'Redis', 'Stripe', 'WebSocket', 'CI/CD',
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const techGridRef = useRef<HTMLDivElement>(null);
  const tiltCardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.skills-label', {
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

      barsRef.current.forEach((bar, i) => {
        if (!bar) return;
        const fill = bar.querySelector('.bar-fill');
        const glow = bar.querySelector('.bar-glow');

        gsap.from(fill, {
          scrollTrigger: {
            trigger: bar,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
          width: 0,
          duration: 1.4,
          delay: 0.08 * i,
          ease: 'power3.inOut',
        });

        gsap.from(glow, {
          scrollTrigger: {
            trigger: bar,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          duration: 0.8,
          delay: 0.08 * i + 0.6,
          ease: 'power2.out',
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
          duration: 0.5,
          stagger: 0.04,
          ease: 'back.out(2)',
        });
      }

      if (tiltCardRef.current) {
        tiltCardRef.current.addEventListener('mousemove', (e: Event) => {
          const mouseEvent = e as MouseEvent;
          const rect = tiltCardRef.current!.getBoundingClientRect();
          const x = (mouseEvent.clientX - rect.left) / rect.width - 0.5;
          const y = (mouseEvent.clientY - rect.top) / rect.height - 0.5;

          gsap.to(tiltCardRef.current, {
            rotateY: x * 8,
            rotateX: -y * 8,
            duration: 0.5,
            ease: 'power2.out',
          });
        });

        tiltCardRef.current.addEventListener('mouseleave', () => {
          gsap.to(tiltCardRef.current, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.8,
            ease: 'elastic.out(1, 0.4)',
          });
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
      <div className="absolute left-10 top-10 hidden lg:block">
        <div className="skills-label flex items-center gap-3 text-white/25">
          <div className="h-px w-8 bg-white/20" />
          <span className="text-[10px] font-medium uppercase tracking-[0.5em]">03 / Skills</span>
        </div>
      </div>

      <div className="absolute right-0 top-0 h-[700px] w-[700px] translate-x-1/3 rounded-full opacity-[0.03] blur-[120px]" style={{ background: 'radial-gradient(circle, #913B28 0%, transparent 70%)' }} />

      <div className="mx-auto max-w-7xl">
        <div className="mb-20">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
            My Arsenal
          </p>
          <TextReveal
            as="h2"
            className="text-4xl font-bold text-white md:text-6xl"
            stagger={0.04}
          >
            Tech Stack & Expertise
          </TextReveal>
          <div className="mt-8 h-px w-20 bg-primary/40" />
        </div>

        <div className="grid gap-20 lg:grid-cols-2">
          <div
            ref={tiltCardRef}
            className="rounded-3xl border border-white/[0.04] bg-white/[0.01] p-8 backdrop-blur-sm lg:p-10"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            <div className="space-y-7">
              {SKILLS.map((skill, i) => (
                <div key={skill.name}>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[13px] font-medium uppercase tracking-wider text-white/60">
                      {skill.name}
                    </span>
                    <span className="text-xs font-bold text-white/25">
                      {skill.level}%
                    </span>
                  </div>
                  <div
                    ref={(el) => {
                      barsRef.current[i] = el;
                    }}
                    className="relative h-1.5 overflow-hidden rounded-full bg-white/[0.04]"
                  >
                    <div
                      className="bar-fill absolute inset-y-0 left-0 rounded-full"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: skill.color,
                      }}
                    />
                    <div
                      className="bar-glow absolute inset-y-0 left-0 rounded-full opacity-30 blur-sm"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: skill.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="mb-8 text-sm uppercase tracking-[0.3em] text-white/20">
              Technologies I work with
            </p>
            <div
              ref={techGridRef}
              className="flex flex-wrap gap-2.5"
            >
              {TECH_TAGS.map((tech, i) => (
                <span
                  key={tech}
                  className="group relative cursor-default rounded-lg border border-white/[0.04] bg-white/[0.02] px-4 py-2.5 text-[13px] font-medium text-white/45 backdrop-blur-sm transition-all duration-300 hover:border-primary/25 hover:text-primary hover:shadow-[0_0_25px_rgba(145,59,40,0.1)]"
                  data-cursor-hover
                >
                  {tech}
                  <span className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
