'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import TextReveal from '../Atoms/TextReveal';
import Magnetic from '../Atoms/Magnetic';

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
      gsap.from('.contact-label', {
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

      gsap.from('.contact-info-card', {
        scrollTrigger: {
          trigger: '.contact-info-card',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        x: -60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });

      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 0.9,
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

    gsap.to(formRef.current, {
      scale: 0.98,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
    });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormState({ name: '', email: '', message: '' });

    gsap.from('.submit-success', {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-zinc-950 px-6 py-24 lg:px-20 lg:py-36"
    >
      <div className="absolute top-10 left-10 hidden lg:block">
        <div className="contact-label flex items-center gap-3 text-white/25">
          <div className="h-px w-8 bg-white/20" />
          <span className="text-[10px] font-medium tracking-[0.5em] uppercase">
            06 / Contact
          </span>
        </div>
      </div>

      <div
        className="absolute -right-40 -bottom-40 h-[600px] w-[600px] rounded-full opacity-[0.03] blur-[120px]"
        style={{
          background: 'radial-gradient(circle, #6366F1 0%, transparent 70%)',
        }}
      />

      <div className="mx-auto max-w-7xl">
        <div className="mb-20">
          <p className="text-primary mb-4 text-[11px] font-semibold tracking-[0.3em] uppercase">
            Get in Touch
          </p>
          <TextReveal
            as="h2"
            className="text-4xl font-bold text-white md:text-6xl"
            stagger={0.04}
          >
            Let&apos;s Collaborate
          </TextReveal>
          <p className="mt-4 max-w-lg text-white/35">
            Have a project in mind? I&apos;d love to hear about it. Send me a
            message and let&apos;s create something extraordinary.
          </p>
          <div className="bg-primary/40 mt-8 h-px w-20" />
        </div>

        <div className="grid gap-20 lg:grid-cols-5">
          <div className="contact-info-card space-y-10 lg:col-span-2">
            <div className="space-y-8">
              <div className="group">
                <p className="mb-2 text-[10px] font-semibold tracking-[0.4em] text-white/20 uppercase">
                  Email
                </p>
                <a
                  href="mailto:Supriadi.tech@gmail.com"
                  className="group-hover:text-primary inline-block text-xl text-white/60 transition-all duration-300 group-hover:underline"
                >
                  Supriadi.tech@gmail.com
                </a>
              </div>

              <div className="group">
                <p className="mb-2 text-[10px] font-semibold tracking-[0.4em] text-white/20 uppercase">
                  Location
                </p>
                <p className="text-xl text-white/60 transition-colors group-hover:text-white">
                  Jakarta, Indonesia
                </p>
              </div>

              <div>
                <p className="mb-3 text-[10px] font-semibold tracking-[0.4em] text-white/20 uppercase">
                  Social
                </p>
                <div className="flex gap-5">
                  {[
                    {
                      label: 'GH',
                      name: 'GitHub',
                      href: 'https://github.com/supriaditech',
                    },
                    {
                      label: 'LI',
                      name: 'LinkedIn',
                      href: 'https://www.linkedin.com/in/supriaditech/',
                    },
                    {
                      label: 'WA',
                      name: 'WhatsApp',
                      href: 'https://wa.me/6282277280453',
                    },
                    { label: 'DR', name: 'Dribbble', href: '#' },
                  ].map((social) => (
                    <Magnetic key={social.name} strength={0.25}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:border-primary/30 hover:text-primary flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.06] text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(145,59,40,0.1)]"
                      >
                        {social.label}
                      </a>
                    </Magnetic>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/[0.04] bg-white/[0.01] p-8 backdrop-blur-sm">
              <p className="text-sm leading-relaxed text-white/30 italic">
                &ldquo;Currently available for freelance projects and full-time
                opportunities. Let&apos;s build something great together!&rdquo;
              </p>
            </div>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6 lg:col-span-3"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-[10px] font-semibold tracking-[0.3em] text-white/25 uppercase"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="focus:border-primary/50 w-full border-b border-white/[0.06] bg-transparent px-1 py-3.5 text-white placeholder-white/10 transition-all duration-300 outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[10px] font-semibold tracking-[0.3em] text-white/25 uppercase"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="focus:border-primary/50 w-full border-b border-white/[0.06] bg-transparent px-1 py-3.5 text-white placeholder-white/10 transition-all duration-300 outline-none"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-[10px] font-semibold tracking-[0.3em] text-white/25 uppercase"
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
                className="focus:border-primary/50 w-full resize-none border-b border-white/[0.06] bg-transparent px-1 py-3.5 text-white placeholder-white/10 transition-all duration-300 outline-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <div className="pt-4">
              <Magnetic strength={0.3}>
                <button
                  type="submit"
                  className="group bg-primary relative flex items-center gap-3 overflow-hidden rounded-full px-10 py-4"
                >
                  <span className="relative z-10 text-sm font-semibold tracking-[0.2em] text-white uppercase">
                    {submitted ? 'Message Sent!' : 'Send Message'}
                  </span>
                  <span className="relative z-10 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                    {submitted ? '✓' : '→'}
                  </span>
                  <span className="absolute inset-0 z-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0" />
                </button>
              </Magnetic>
            </div>

            {submitted && (
              <p className="submit-success mt-4 text-sm text-green-400/80">
                Thank you! Your message has been received. I&apos;ll get back to
                you soon.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
