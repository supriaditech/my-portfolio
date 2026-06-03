import Navbar from '@components/Layout/Navbar';
import HeroSection from '@components/HomePages/HeroSection';
import AboutSection from '@components/HomePages/AboutSection';
import WorkExperienceSection from '@components/HomePages/WorkExperienceSection';
import SkillsSection from '@components/HomePages/SkillsSection';
import ProjectsSection from '@components/HomePages/ProjectsSection';
import ContactSection from '@components/HomePages/ContactSection';
import Footer from '@components/Layout/Footer';

export default function Home() {
  return (
    <div className="bg-black">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WorkExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
