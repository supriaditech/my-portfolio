'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import TextScatter from '../Atoms/TextScatter';
import TextRepulsion from '../Atoms/TextScatter';

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textMain = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. ANIMASI MASUK (BOUNCE BACK)
      // Kita targetkan elemen dengan class '.animate-text'
      gsap.from('.animate-text', {
        y: 100, // Muncul dari 100px di bawah
        opacity: 0, // Dari transparan
        duration: 1.5, // Durasi agak lama biar bouncenya kelihatan
        ease: 'elastic.out(1, 0.5)', // INI KUNCINYA: Efek memantul
        stagger: 0.2, // "Hey I'm a" muncul duluan, baru "Frontend Dev"
        delay: 0.2, // Tunggu sebentar setelah load
      });

      // 2. ANIMASI SCROLL (FADE OUT & DARKEN)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      // Overlay jadi gelap
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, ease: 'none' },
        0 // Jalankan berbarengan di detik ke-0 timeline scroll
      );

      // Text Wrapper menghilang pelan-pelan saat discroll
      tl.fromTo(
        textMain.current,
        { opacity: 1 },
        { opacity: 0, ease: 'none' },
        0
      );
    },
    { scope: containerRef }
  );

  return (
    <main
      ref={containerRef}
      className="relative h-[400vh] w-full bg-white dark:bg-black"
    >
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        <Image
          src="/Images/bgmain.png"
          alt="Image main bg"
          fill
          priority
          className="object-cover"
        />

        {/* OVERLAY HITAM */}
        <div ref={overlayRef} className="absolute inset-0 z-10 bg-black"></div>

        {/* Konten Text */}
        <div
          ref={textMain}
          className="relative z-20 flex h-full items-center px-20"
        >
          <div className="pt-120">
            {/* Tambahkan class 'animate-text' di sini */}
            <p className="animate-text font-montserrat text-primary text-[40px] font-semibold">
              Hey, I'm a
            </p>
            {/* Tambahkan class 'animate-text' di sini juga */}
            <TextRepulsion
              text="Frontend Developer"
              strength={1300} // Semakin besar, semakin jauh mentalnya
              radius={300} // Area sensitivitas di sekitar huruf
              className="font-montserrat -mt-2 text-[80px] font-bold text-white"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
