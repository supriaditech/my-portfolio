'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) {
      gsap.set([cursor, dot], { display: 'none' });
      return;
    }

    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    const onMouseMove = (e: MouseEvent) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
    };

    const animate = () => {
      dotX += (cursorX - dotX) * 0.5;
      dotY += (cursorY - dotY) * 0.5;

      gsap.set(dot, { x: cursorX, y: cursorY });
      gsap.set(cursor, { x: dotX, y: dotY });

      requestAnimationFrame(animate);
    };

    const onMouseEnter = () => setHidden(false);
    const onMouseLeave = () => setHidden(true);

    const onLinkHoverIn = (e: Event) => {
      const target = e.target as HTMLElement;
      const tag = target.tagName?.toLowerCase();
      if (
        tag === 'a' ||
        tag === 'button' ||
        tag === 'input' ||
        tag === 'textarea' ||
        target.closest('[data-cursor-hover]')
      ) {
        setHovering(true);
        gsap.to(cursor, {
          scale: 2.5,
          backgroundColor: 'rgba(145, 59, 40, 0.2)',
          borderColor: 'rgba(145, 59, 40, 0.6)',
          duration: 0.3,
        });
        gsap.to(dot, {
          scale: 0,
          duration: 0.3,
        });
      }
    };

    const onLinkHoverOut = () => {
      setHovering(false);
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(255,255,255,0.4)',
        duration: 0.3,
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.3,
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', onLinkHoverIn);
    document.addEventListener('mouseout', onLinkHoverOut);
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', onLinkHoverIn);
      document.removeEventListener('mouseout', onLinkHoverOut);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 mix-blend-difference md:block"
        style={{ opacity: hidden ? 0 : 1, transition: 'opacity 0.3s' }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary mix-blend-difference md:block"
        style={{ opacity: hidden || hovering ? 0 : 1, transition: 'opacity 0.3s' }}
      />
    </>
  );
}
