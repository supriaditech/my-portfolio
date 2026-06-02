'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      gsap.from('.contact-title', {
        scrollTrigger: {
          trigger: '.contact-title',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.contact-info', {
        scrollTrigger: {
          trigger: '.contact-info',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        x: -60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        x: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    },
    { scope: sectionRef }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-zinc-950 px-6 py-24 lg:px-20 lg:py-36"
    >
      <div className="bg-primary/5 absolute right-0 bottom-0 h-[400px] w-[400px] translate-x-1/4 rounded-full blur-[120px]" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="contact-title text-primary mb-3 text-sm font-medium tracking-[0.3em] uppercase">
            Get in Touch
          </p>
          <h2 className="contact-title text-4xl font-bold text-white md:text-5xl">
            Let&apos;s <span className="text-primary">Collaborate</span>
          </h2>
          <p className="contact-title mx-auto mt-4 max-w-xl text-white/40">
            Have a project in mind? Let&apos;s talk about it.
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-2">
          <div className="contact-info space-y-8">
            <div>
              <p className="mb-1 text-sm tracking-widest text-white/30 uppercase">
                Email
              </p>
              <a
                href="mailto:hello@portfolio.dev"
                className="hover:text-primary text-lg text-white/70 transition-colors"
              >
                hello@portfolio.dev
              </a>
            </div>

            <div>
              <p className="mb-1 text-sm tracking-widest text-white/30 uppercase">
                Location
              </p>
              <p className="text-lg text-white/70">Jakarta, Indonesia</p>
            </div>

            <div>
              <p className="mb-1 text-sm tracking-widest text-white/30 uppercase">
                Social
              </p>
              <div className="flex gap-4">
                {['GitHub', 'LinkedIn', 'Twitter', 'Dribbble'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="hover:text-primary text-sm text-white/50 transition-colors"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm">
              <p className="text-sm leading-relaxed text-white/40">
                &ldquo;I&apos;m currently available for freelance projects and
                full-time opportunities. Don&apos;t hesitate to reach
                out!&rdquo;
              </p>
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm tracking-widest text-white/40 uppercase"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className="focus:border-primary/50 w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-3.5 text-white placeholder-white/20 transition-all outline-none focus:bg-white/[0.04]"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm tracking-widest text-white/40 uppercase"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="focus:border-primary/50 w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-3.5 text-white placeholder-white/20 transition-all outline-none focus:bg-white/[0.04]"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm tracking-widest text-white/40 uppercase"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows={5}
                className="focus:border-primary/50 w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-3.5 text-white placeholder-white/20 transition-all outline-none focus:bg-white/[0.04]"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              className="group bg-primary hover:bg-primary/90 relative w-full overflow-hidden rounded-xl px-8 py-4 text-sm font-semibold tracking-wider text-white uppercase transition-colors"
            >
              <span className="relative z-10">
                {submitted ? 'Message Sent!' : 'Send Message'}
              </span>
              <span className="absolute inset-0 z-0 -translate-x-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
