import { memo } from 'react';
import { css, type Theme } from '@emotion/react';
import { media } from '@/styles/media';
import { sectionStyle, sectionEyebrowStyle } from '@/styles/layout';
import { aboutLead, highlights } from '@/content/profile';

const AboutSection = memo(() => {
  return (
    <section id="about" css={sectionStyle}>
      <h2 css={sectionEyebrowStyle}>About</h2>
      <p css={leadStyle}>{aboutLead}</p>
      <ul css={gridStyle}>
        {highlights.map((h) => (
          <li key={h.title} css={cardStyle}>
            <span css={iconStyle(h.tint)} aria-hidden>
              {h.emoji}
            </span>
            <h3 css={cardTitleStyle}>{h.title}</h3>
            <p css={cardDescStyle}>{h.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';
export default AboutSection;

const leadStyle = (theme: Theme) => css`
  margin: 18px 0 0;
  font-size: ${theme.fontSize.xl};
  line-height: 1.55;
  font-weight: ${theme.fontWeight.medium};
  letter-spacing: -0.015em;
  color: ${theme.colors.fg.primary};
  max-width: 22em;
  white-space: pre-line;

  ${media.tabletUp} {
    font-size: ${theme.fontSize['2xl']};
  }
`;

const gridStyle = css`
  list-style: none;
  margin: 36px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  ${media.tabletUp} {
    grid-template-columns: 1fr 1fr;
  }
`;

const cardStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  border: 1px solid ${theme.colors.border.primary};
  border-radius: ${theme.borderRadius.xl};
  background: ${theme.colors.bg.primary};
`;

const iconStyle = (tint: string) => (theme: Theme) => css`
  width: 44px;
  height: 44px;
  border-radius: ${theme.borderRadius.lg};
  background: ${tint};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
`;

const cardTitleStyle = (theme: Theme) => css`
  margin: 0;
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.bold};
  letter-spacing: -0.01em;
  color: ${theme.colors.fg.primary};
`;

const cardDescStyle = (theme: Theme) => css`
  margin: 0;
  font-size: ${theme.fontSize.sm};
  line-height: 1.7;
  color: ${theme.colors.fg.subtle};
`;
