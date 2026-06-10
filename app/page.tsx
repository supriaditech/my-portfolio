import HeroSection from '@components/HomePages/HeroSection';
import AboutSection from '@components/HomePages/AboutSection';
import WorkExperienceSection from '@components/HomePages/WorkExperienceSection';
import SkillsSection from '@components/HomePages/SkillsSection';
import ProjectsSection from '@components/HomePages/ProjectsSection';
import ContactSection from '@components/HomePages/ContactSection';
import MasterLayout from '@components/Layout/MasterLayout';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Supriadi',
  url: 'https://supriadi.tech',
  jobTitle: 'Frontend Developer',
  description:
    'Frontend Developer with 3+ years of experience specializing in Next.js, React Native, TypeScript, and NestJS.',
  knowsAbout: [
    'Next.js',
    'React Native',
    'TypeScript',
    'NestJS',
    'Zustand',
    'SWR',
    'Docker',
    'GSAP',
    'Tailwind CSS',
  ],
  sameAs: ['https://github.com/supriadi', 'https://linkedin.com/in/supriadi'],
};

export default function Home() {
  return (
    <MasterLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <AboutSection />
      <WorkExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </MasterLayout>
  );
}
