'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '../Atoms/TextReveal';

const SKILL_CATEGORIES = [
  {
    title: 'Frontend Core',
    icon: '▸',
    skills: [
      { name: 'React / Next.js', level: 'Expert' },
      { name: 'TypeScript', level: 'Expert' },
      { name: 'Tailwind CSS', level: 'Expert' },
      { name: 'JavaScript (ES6+)', level: 'Expert' },
    ],
  },
  {
    title: 'Animation & UI',
    icon: '▸',
    skills: [
      { name: 'GSAP / Framer Motion', level: 'Expert' },
      { name: 'CSS Animations', level: 'Advanced' },
      { name: 'Responsive Design', level: 'Expert' },
      { name: 'Figma to Code', level: 'Advanced' },
    ],
  },
  {
    title: 'Backend & API',
    icon: '▸',
    skills: [
      { name: 'Node.js / Express', level: 'Advanced' },
      { name: 'REST API / GraphQL', level: 'Advanced' },
      { name: 'Next.js API Routes', level: 'Advanced' },
      { name: 'Prisma / ORM', level: 'Proficient' },
    ],
  },
  {
    title: 'Database & DevOps',
    icon: '▸',
    skills: [
      { name: 'PostgreSQL / MySQL', level: 'Advanced' },
      { name: 'MongoDB', level: 'Proficient' },
      { name: 'Git / GitHub', level: 'Expert' },
      { name: 'Vercel / CI/CD', level: 'Advanced' },
    ],
  },
];

const LEVEL_COLORS: Record<string, string> = {
  Expert: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/5',
  Advanced: 'border-sky-500/40 text-sky-400 bg-sky-500/5',
  Proficient: 'border-amber-500/40 text-amber-400 bg-amber-500/5',
};

const OTHER_TOOLS = [
  'Redux / Zustand',
  'React Query',
  'Zod',
  'Jest / Testing',
  'Storybook',
  'Docker',
  'Redis',
  'Stripe',
  'WebSocket',
  'PWA',
  'SEO',
  'A11y',
  'Performance',
  'Headless CMS',
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const toolsRef = useRef<HTMLDivElement>(null);

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

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 60,
          opacity: 0,
          duration: 0.7,
          delay: 0.12 * i,
          ease: 'power3.out',
        });

        const items = card.querySelectorAll('.skill-item');
        gsap.from(items, {
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          x: -20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.06,
          delay: 0.12 * i + 0.3,
          ease: 'power2.out',
        });
      });

      if (toolsRef.current) {
        gsap.from(toolsRef.current.children, {
          scrollTrigger: {
            trigger: toolsRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
          scale: 0.5,
          opacity: 0,
          duration: 0.4,
          stagger: 0.04,
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
      <div className="absolute top-10 left-10 hidden lg:block">
        <div className="skills-label flex items-center gap-3 text-white/25">
          <div className="h-px w-8 bg-white/20" />
          <span className="text-[10px] font-medium tracking-[0.5em] uppercase">
            04 / Skills
          </span>
        </div>
      </div>

      <div
        className="absolute top-0 right-0 h-[700px] w-[700px] translate-x-1/3 rounded-full opacity-[0.02] blur-[120px]"
        style={{
          background: 'radial-gradient(circle, #6366F1 0%, transparent 70%)',
        }}
      />

      <div className="mx-auto max-w-7xl">
        <div className="mb-20">
          <p className="text-primary mb-4 text-[11px] font-semibold tracking-[0.3em] uppercase">
            Technical Expertise
          </p>
          <TextReveal
            as="h2"
            className="text-4xl font-bold text-white md:text-6xl"
            stagger={0.03}
          >
            Skills & Technologies
          </TextReveal>
          <div className="bg-primary/40 mt-8 h-px w-20" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_CATEGORIES.map((category, i) => (
            <div
              key={category.title}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="group rounded-2xl border border-white/[0.04] bg-white/[0.01] p-6 backdrop-blur-sm transition-all duration-500 hover:border-white/[0.08] hover:bg-white/[0.02]"
            >
              <div className="mb-6 flex items-center gap-2">
                <span className="text-primary text-xs opacity-60">
                  {category.icon}
                </span>
                <h3 className="text-xs font-bold tracking-[0.25em] text-white/50 uppercase">
                  {category.title}
                </h3>
              </div>

              <ul className="space-y-3.5">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="skill-item flex items-center justify-between gap-2"
                  >
                    <span className="text-sm text-white/70">{skill.name}</span>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wider whitespace-nowrap uppercase ${LEVEL_COLORS[skill.level] || 'border-white/20 bg-white/[0.02] text-white/40'}`}
                    >
                      {skill.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-white/[0.04] pt-12">
          <p className="mb-8 text-[10px] font-semibold tracking-[0.4em] text-white/15 uppercase">
            Additional Tools & Knowledge
          </p>
          <div ref={toolsRef} className="flex flex-wrap gap-2.5">
            {OTHER_TOOLS.map((tool) => (
              <span
                key={tool}
                className="cursor-default rounded-lg border border-white/[0.04] bg-white/[0.01] px-4 py-2 text-[13px] font-medium text-white/35 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.03] hover:text-white/60"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
