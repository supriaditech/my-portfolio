import HeroSection from '@components/HomePages/HeroSection';

export default function Home() {
  return (
    <div className="bg-zinc-50 dark:bg-black">
      <HeroSection />

      {/* Konten selanjutnya (supaya terlihat batas scrollnya) */}
      <div className="flex h-screen items-center justify-center bg-blue-500 text-3xl text-white">
        Konten Berikutnya
      </div>
    </div>
  );
}
