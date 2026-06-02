'use client';

import { useState, FormEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function RegisterPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Animasi GSAP
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.bg-gradient-layer',
        { opacity: 0, scale: 1.2 },
        { opacity: 1, scale: 1, duration: 1.5 }
      );
      tl.fromTo(
        '.orb-1',
        { opacity: 0, scale: 0 },
        { opacity: 0.15, scale: 1, duration: 1.5, ease: 'elastic.out(1, 0.5)' },
        '-=1'
      );
      tl.fromTo(
        '.orb-2',
        { opacity: 0, scale: 0 },
        { opacity: 0.1, scale: 1, duration: 1.5, ease: 'elastic.out(1, 0.5)' },
        '-=1.2'
      );
      tl.fromTo(
        '.auth-card',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        '-=0.5'
      );
      tl.fromTo(
        '.auth-title',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      );
      tl.fromTo(
        '.auth-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );
      tl.fromTo(
        '.input-group',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.12 },
        '-=0.3'
      );
      tl.fromTo(
        '.auth-btn',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      );
      tl.fromTo(
        '.auth-footer',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.3'
      );
    },
    { scope: containerRef }
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      gsap.fromTo(
        '.auth-card',
        { x: 0 },
        {
          keyframes: { x: [-8, 8, -6, 6, -3, 3, 0] },
          duration: 0.5,
          ease: 'power2.out',
        }
      );
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    gsap.fromTo(
      '.auth-btn',
      { scale: 0.95 },
      { scale: 1, duration: 0.3, ease: 'back.out(2)' }
    );

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        gsap.fromTo(
          '.auth-card',
          { x: 0 },
          {
            keyframes: { x: [-8, 8, -6, 6, -3, 3, 0] },
            duration: 0.5,
            ease: 'power2.out',
          }
        );
        setError(data.message || 'Registration failed');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      gsap.to('.auth-card', {
        scale: 1.02,
        borderColor: 'rgba(34, 197, 94, 0.3)',
        duration: 0.4,
      });
      gsap.to('.check-icon', { scale: 1, opacity: 1, duration: 0.4 });

      setTimeout(() => router.push('/'), 600);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950 px-4"
    >
      {/* Background */}
      <div className="bg-gradient-layer absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-neutral-950 to-teal-950/30" />
      <div className="orb-1 pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-emerald-500 opacity-0 blur-[120px]" />
      <div className="orb-2 pointer-events-none absolute -bottom-40 -left-20 h-[400px] w-[400px] rounded-full bg-teal-500 opacity-0 blur-[120px]" />

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Card */}
      <div className="auth-card relative w-full max-w-md rounded-3xl border border-neutral-800/60 bg-neutral-900/60 p-10 shadow-2xl shadow-emerald-500/5 backdrop-blur-xl transition-colors">
        {/* Check */}
        <div className="check-icon absolute -top-3 left-1/2 -translate-x-1/2 scale-0 opacity-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 ring-1 ring-emerald-500/30">
            <svg
              className="h-5 w-5 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="mb-10 text-center">
          <h1 className="auth-title font-montserrat text-3xl font-bold tracking-tight text-white">
            Create Account
          </h1>
          <p className="auth-subtitle mt-2 text-sm text-neutral-500">
            Join us and get started
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-500/15 bg-red-500/5 px-4 py-3 text-sm text-red-400">
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="input-group">
            <label
              htmlFor="name"
              className="mb-1.5 block text-xs font-medium tracking-wider text-neutral-500 uppercase"
            >
              Full Name
            </label>
            <div className="group relative">
              <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-neutral-600 transition-colors group-focus-within:text-emerald-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </span>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                className="w-full rounded-xl border border-neutral-800 bg-neutral-800/50 py-3 pr-4 pl-11 text-sm text-white placeholder-neutral-600 transition-all outline-none focus:border-emerald-500/50 focus:bg-neutral-800 focus:ring-1 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          {/* Email */}
          <div className="input-group">
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs font-medium tracking-wider text-neutral-500 uppercase"
            >
              Email Address
            </label>
            <div className="group relative">
              <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-neutral-600 transition-colors group-focus-within:text-emerald-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-neutral-800 bg-neutral-800/50 py-3 pr-4 pl-11 text-sm text-white placeholder-neutral-600 transition-all outline-none focus:border-emerald-500/50 focus:bg-neutral-800 focus:ring-1 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          {/* Password */}
          <div className="input-group">
            <label
              htmlFor="password"
              className="mb-1.5 block text-xs font-medium tracking-wider text-neutral-500 uppercase"
            >
              Password
            </label>
            <div className="group relative">
              <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-neutral-600 transition-colors group-focus-within:text-emerald-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </span>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                required
                className="w-full rounded-xl border border-neutral-800 bg-neutral-800/50 py-3 pr-4 pl-11 text-sm text-white placeholder-neutral-600 transition-all outline-none focus:border-emerald-500/50 focus:bg-neutral-800 focus:ring-1 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <label
              htmlFor="confirmPassword"
              className="mb-1.5 block text-xs font-medium tracking-wider text-neutral-500 uppercase"
            >
              Confirm Password
            </label>
            <div className="group relative">
              <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-neutral-600 transition-colors group-focus-within:text-emerald-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </span>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat your password"
                required
                className="w-full rounded-xl border border-neutral-800 bg-neutral-800/50 py-3 pr-4 pl-11 text-sm text-white placeholder-neutral-600 transition-all outline-none focus:border-emerald-500/50 focus:bg-neutral-800 focus:ring-1 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="auth-btn relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Creating account...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Create Account
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </span>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="auth-footer mt-8 flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
          <span className="text-xs text-neutral-600">Already registered?</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
        </div>

        {/* Login Link */}
        <p className="auth-footer mt-6 text-center text-sm text-neutral-600">
          Already have an account?{' '}
          <button
            onClick={() => {
              gsap.to('.auth-card', {
                y: -20,
                opacity: 0,
                duration: 0.3,
                onComplete: () => router.push('/login'),
              });
            }}
            className="relative font-medium text-emerald-400 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-emerald-400 after:transition-all after:duration-300 hover:text-emerald-300 hover:after:w-full"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
