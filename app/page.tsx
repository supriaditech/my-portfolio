import HeroSection from '@components/HomePages/HeroSection';
import AboutSection from '@components/HomePages/AboutSection';
import WorkExperienceSection from '@components/HomePages/WorkExperienceSection';
import SkillsSection from '@components/HomePages/SkillsSection';
import ProjectsSection from '@components/HomePages/ProjectsSection';
import ContactSection from '@components/HomePages/ContactSection';

import MasterLayout from '@components/Layout/MasterLayout';

export default function Home() {
  return (
    <MasterLayout>
      <HeroSection />
      <AboutSection />
      <WorkExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </MasterLayout>
  );
}
