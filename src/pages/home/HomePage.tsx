import { memo } from 'react';
import HeroSection from '@/features/hero';
import AboutSection from '@/features/about';
import ProjectsSection from '@/features/projects';
import ContactSection from '@/features/contact';

const HomePage = memo(() => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
});

HomePage.displayName = 'HomePage';
export default HomePage;
