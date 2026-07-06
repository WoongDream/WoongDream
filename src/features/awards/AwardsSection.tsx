import { memo } from 'react';
import { css, type Theme } from '@emotion/react';
import { media } from '@/styles/media';
import { sectionStyle, sectionEyebrowStyle } from '@/styles/layout';
import { certs, awards } from '@/content/profile';

const AwardsSection = memo(() => {
  return (
    <section id="awards" css={sectionStyle}>
      <h2 css={[sectionEyebrowStyle, headingGapStyle]}>자격 · 수상</h2>
      <div css={gridStyle}>
        <div>
          <h3 css={colTitleStyle}>자격증</h3>
          <ul css={listStyle}>
            {certs.map((c) => (
              <li key={c.name} css={certRowStyle}>
                <span css={certNameStyle}>{c.name}</span>
                <span css={certDateStyle}>{c.date}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 css={colTitleStyle}>수상 · 활동</h3>
          <ul css={listStyle}>
            {awards.map((a) => (
              <li key={a.text} css={awardRowStyle}>
                <span css={markStyle} aria-hidden>
                  ◆
                </span>
                <span css={awardTextStyle}>{a.text}</span>
                {a.href && (
                  <a css={awardLinkStyle} href={a.href} target="_blank" rel="noreferrer">
                    {a.label} ↗
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
});

AwardsSection.displayName = 'AwardsSection';
export default AwardsSection;

const headingGapStyle = css`
  margin-bottom: 28px;
`;

const gridStyle = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;

  ${media.tabletUp} {
    grid-template-columns: 1fr 1fr;
  }
`;

const colTitleStyle = (theme: Theme) => css`
  margin: 0 0 14px;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.fg.primary};
`;

const listStyle = css`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const certRowStyle = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  padding: 12px 0;
  border-top: 1px solid ${theme.colors.border.secondary};
  font-size: ${theme.fontSize.sm};
`;

const certNameStyle = (theme: Theme) => css`
  color: ${theme.colors.fg.primary};
  font-weight: ${theme.fontWeight.medium};
`;

const certDateStyle = (theme: Theme) => css`
  color: ${theme.colors.fg.tertiary};
  flex-shrink: 0;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
`;

const awardRowStyle = (theme: Theme) => css`
  display: flex;
  gap: 10px;
  padding: 12px 0;
  border-top: 1px solid ${theme.colors.border.secondary};
  font-size: ${theme.fontSize.sm};
  align-items: baseline;
  flex-wrap: wrap;
`;

const markStyle = (theme: Theme) => css`
  color: ${theme.colors.accent.primary};
`;

const awardTextStyle = (theme: Theme) => css`
  color: ${theme.colors.fg.body};
  line-height: 1.5;
  white-space: pre-line;
`;

const awardLinkStyle = (theme: Theme) => css`
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.accent.active};
  text-decoration: none;
  background: ${theme.colors.accent.subtle};
  padding: 2px 9px;
  border-radius: ${theme.borderRadius.full};
  white-space: nowrap;
`;
