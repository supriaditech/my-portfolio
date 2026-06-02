'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface TextRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  triggerOnce?: boolean;
}

export default function TextReveal({
  children,
  as: Tag = 'p',
  className = '',
  delay = 0,
  stagger = 0.03,
  duration = 0.6,
  triggerOnce = true,
}: TextRevealProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const containerRef = useRef<any>(null);
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    setWords(children.split(' '));
  }, [children]);

  useGSAP(
    () => {
      if (!containerRef.current || words.length === 0) return;
      const chars = containerRef.current.querySelectorAll('.reveal-char');

      gsap.fromTo(
        chars,
        { y: '100%', opacity: 0, rotateX: -40 },
        {
          y: '0%',
          opacity: 1,
          rotateX: 0,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
            ...(triggerOnce ? { toggleActions: 'play none none none' } : {}),
          },
        }
      );
    },
    { scope: containerRef, dependencies: [words] }
  );

  return (
    <Tag ref={containerRef} className={`${className}`}>
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap">
          <span className="inline-block overflow-hidden align-top">
            {word.split('').map((char, charIdx) => (
              <span
                key={charIdx}
                className="reveal-char inline-block"
                style={{ willChange: 'transform' }}
              >
                {char}
              </span>
            ))}
          </span>
          {wordIdx < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </Tag>
  );
}
