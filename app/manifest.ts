import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Supriadi | Frontend Developer',
    short_name: 'Supriadi',
    description:
      'Frontend Developer portfolio — crafting modern web & mobile experiences with Next.js, React Native, TypeScript, and GSAP.',
    start_url: '/',
    display: 'browser',
    background_color: '#000000',
    theme_color: '#6366F1',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
