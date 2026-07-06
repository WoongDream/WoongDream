import { memo } from 'react';
import { css, type Theme } from '@emotion/react';
import { text } from '@/styles/text';
import { sectionStyle } from '@/styles/layout';
import Button from '@/components/button';

const HeroSection = memo(() => {
  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="top" css={[sectionStyle, heroStyle]}>
      <p css={greetingStyle}>안녕하세요, 👋</p>
      <h1 css={nameStyle}>WoongDream</h1>
      <p css={taglineStyle}>
        {/* TODO: 한 줄 소개 (직군 / 관심사) */}한 줄 소개가 들어갈 자리입니다.
      </p>
      <div>
        <Button variant="primary" size="lg" onClick={handleContactClick}>
          Get in touch
        </Button>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
export default HeroSection;

const heroStyle = (theme: Theme) => css`
  min-height: 60vh;
  justify-content: center;
  gap: ${theme.spacing.md};
`;

const greetingStyle = (theme: Theme) => css`
  ${text({ size: 'lg', weight: 'medium' })({ theme })}
  color: ${theme.colors.accent.primary};
`;

const nameStyle = (theme: Theme) => css`
  font-size: 3rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.fg.primary};

  @media (min-width: ${theme.breakpoints.tablet}) {
    font-size: 4rem;
  }
`;

const taglineStyle = (theme: Theme) => css`
  ${text({ size: 'xl', weight: 'regular' })({ theme })}
  color: ${theme.colors.fg.secondary};
`;
