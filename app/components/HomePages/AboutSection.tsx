'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.about-title', {
        scrollTrigger: {
          trigger: '.about-title',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.about-line', {
        scrollTrigger: {
          trigger: '.about-line',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        scaleX: 0,
        duration: 1,
        ease: 'power3.inOut',
        transformOrigin: 'left center',
      });

      gsap.from('.about-text', {
        scrollTrigger: {
          trigger: '.about-text',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      });

      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
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
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <p className="about-title mb-3 text-sm font-medium uppercase tracking-[0.3em] text-primary">
            About Me
          </p>
          <h2 className="about-title text-4xl font-bold text-white md:text-5xl">
            Turning ideas into
            <br />
            <span className="text-primary">digital experiences</span>
          </h2>
          <div className="about-line mt-6 h-[2px] w-24 rounded-full bg-primary/60" />
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div ref={imageRef} className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
            <Image
              src="/Images/bgmain.png"
              alt="About"
              fill
              className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="about-text mb-8 text-lg leading-relaxed text-white/60">
              I&apos;m a passionate Frontend Developer with a keen eye for design
              and a deep love for creating seamless user experiences. With
              expertise in modern web technologies, I transform complex problems
              into elegant, performant solutions.
            </p>

            <p className="about-text mb-8 text-lg leading-relaxed text-white/60">
              My approach combines technical precision with creative thinking.
              I believe great software is not just about code &mdash; it&apos;s
              about understanding users, anticipating their needs, and crafting
              interfaces that feel intuitive and delightful.
            </p>

            <p className="about-text mb-12 text-lg leading-relaxed text-white/60">
              When I&apos;m not coding, you&apos;ll find me exploring new
              technologies, contributing to open-source projects, or enjoying a
              good cup of coffee while sketching UI ideas.
            </p>

            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-6 border-t border-white/10 pt-10"
            >
              {[
                { value: '2+', label: 'Years Exp' },
                { value: '20+', label: 'Projects' },
                { value: '15+', label: 'Tech Stack' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold text-primary md:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm uppercase tracking-wider text-white/40">
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
