'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface TextRepulsionProps {
  text: string;
  className?: string;
  strength?: number; // Seberapa jauh "tendangannya" (pixel)
  radius?: number; // Seberapa dekat kursor baru bereaksi (pixel)
}

export default function TextRepulsion({
  text,
  className = '',
  strength = 80,
  radius = 100,
}: TextRepulsionProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      const letters = lettersRef.current;

      const handleMouseMove = (e: MouseEvent) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        letters.forEach((letter) => {
          if (!letter) return;

          const rect = letter.getBoundingClientRect();
          const letterCenterX = rect.left + rect.width / 2;
          const letterCenterY = rect.top + rect.height / 2;

          const distanceX = mouseX - letterCenterX;
          const distanceY = mouseY - letterCenterY;
          const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

          if (distance < radius) {
            const power = 1 - distance / radius;

            const moveX = (distanceX / distance) * power * strength * -1;
            const moveY = (distanceY / distance) * power * strength * -1;

            gsap.to(letter, {
              x: moveX,
              y: moveY,
              duration: 0.3,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          } else {
            if (
              gsap.getProperty(letter, 'x') !== 0 ||
              gsap.getProperty(letter, 'y') !== 0
            ) {
              gsap.to(letter, {
                x: 0,
                y: 0,
                duration: 1.2,
                ease: 'elastic.out(1, 0.3)',
                overwrite: 'auto',
              });
            }
          }
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    },
    { scope: containerRef }
  );

  return (
    <h1 ref={containerRef} className={`inline-block ${className}`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          ref={(el) => {
            lettersRef.current[index] = el;
          }}
          className="inline-block cursor-default"
          style={{ willChange: 'transform' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h1>
  );
}
