import { memo, Fragment } from 'react';
import { css, type Theme } from '@emotion/react';
import { media } from '@/styles/media';
import { hero } from '@/content/profile';

const accentNameStyle = (theme: Theme) => css`
  color: ${theme.colors.accent.primary};
`;

const renderLine = (line: string) => {
  if (!line.includes(hero.highlightName)) {
    return line;
  }
  const [before, after] = line.split(hero.highlightName);
  return (
    <>
      {before}
      <span css={accentNameStyle}>{hero.highlightName}</span>
      {after}
    </>
  );
};

const HeroSection = memo(() => {
  return (
    <section id="top" css={heroStyle}>
      <span css={badgeStyle}>{hero.badge}</span>
      <h1 css={titleStyle}>
        {hero.titleLines.map((line, i) => (
          <Fragment key={i}>
            {renderLine(line)}
            {i < hero.titleLines.length - 1 && <br />}
          </Fragment>
        ))}
      </h1>
      <p css={leadStyle}>
        {hero.lead.map((line, i) => (
          <Fragment key={i}>
            {line}
            {i < hero.lead.length - 1 && <br />}
          </Fragment>
        ))}
      </p>
      <div css={ctaStyle}>
        <a css={[ctaButtonStyle, ctaPrimaryStyle]} href="#project">
          개인 프로젝트 보기
        </a>
        <a css={[ctaButtonStyle, ctaSecondaryStyle]} href="#career">
          경력 살펴보기
        </a>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
export default HeroSection;

const heroStyle = css`
  padding: 40px 0 44px;

  ${media.tabletUp} {
    padding: 76px 0 56px;
  }
`;

const badgeStyle = (theme: Theme) => css`
  display: inline-block;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.accent.hover};
  background: ${theme.colors.accent.subtle};
  padding: 5px 12px;
  border-radius: ${theme.borderRadius.full};
`;

const titleStyle = (theme: Theme) => css`
  margin: 18px 0 0;
  font-size: ${theme.fontSize['3xl']};
  line-height: 1.18;
  font-weight: ${theme.fontWeight.bold};
  letter-spacing: -0.03em;
  color: ${theme.colors.fg.primary};

  ${media.tabletUp} {
    font-size: ${theme.fontSize['5xl']};
    line-height: 1.16;
  }
`;

const leadStyle = (theme: Theme) => css`
  margin: 18px 0 0;
  font-size: ${theme.fontSize.md};
  line-height: 1.7;
  color: ${theme.colors.fg.subtle};
  max-width: 32em;

  ${media.tabletUp} {
    font-size: ${theme.fontSize.lg};
    margin-top: 24px;
  }
`;

const ctaStyle = css`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;

  ${media.tabletUp} {
    margin-top: 32px;
  }
`;

const ctaButtonStyle = (theme: Theme) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  padding: 0 24px;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.semibold};
  text-decoration: none;
  flex: 1 1 auto;

  ${media.tabletUp} {
    flex: 0 0 auto;
  }
`;

const ctaPrimaryStyle = (theme: Theme) => css`
  background: ${theme.colors.accent.primary};
  color: ${theme.colors.accent.fg};
  box-shadow: 0 1px 2px rgba(2, 132, 199, 0.18);
`;

const ctaSecondaryStyle = (theme: Theme) => css`
  background: ${theme.colors.bg.primary};
  color: ${theme.colors.fg.primary};
  border: 1px solid ${theme.colors.border.primary};
`;
