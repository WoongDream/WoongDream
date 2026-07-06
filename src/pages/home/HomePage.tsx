import { memo } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import HeroSection from '@/features/hero';
import StatsSection from '@/features/stats';
import AboutSection from '@/features/about';
import CareerSection from '@/features/career';
import ProjectsSection from '@/features/projects';
import SkillsSection from '@/features/skills';
import AwardsSection from '@/features/awards';
import ContactSection from '@/features/contact';
import { appShellStyle, homeContainerStyle } from '@/styles/layout';

const HomePage = memo(() => {
  return (
    <div css={appShellStyle}>
      <div css={homeContainerStyle}>
        <Header />
        <main>
          <HeroSection />
          <StatsSection />
          <AboutSection />
          <CareerSection />
          <ProjectsSection />
          <SkillsSection />
          <AwardsSection />
          <ContactSection />
        </main>
      </div>
      <Footer />
    </div>
  );
});

HomePage.displayName = 'HomePage';
export default HomePage;
