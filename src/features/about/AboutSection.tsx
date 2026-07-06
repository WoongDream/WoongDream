import { memo } from 'react';
import { css, type Theme } from '@emotion/react';
import { text } from '@/styles/text';
import { sectionStyle, sectionTitleStyle } from '@/styles/layout';

const AboutSection = memo(() => {
  return (
    <section id="about" css={sectionStyle}>
      <h2 css={sectionTitleStyle}>About</h2>
      <p css={bodyStyle}>
        {/* TODO: 자기소개 본문 (경력, 관심 분야, 강점 등) */}
        소개 본문이 들어갈 자리입니다.
      </p>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';
export default AboutSection;

const bodyStyle = (theme: Theme) => css`
  ${text({ size: 'md', weight: 'regular', preWrap: true })({ theme })}
  color: ${theme.colors.fg.secondary};
  line-height: 1.7;
`;
