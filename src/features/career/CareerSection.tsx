import { memo } from 'react';
import { css, type Theme } from '@emotion/react';
import { media } from '@/styles/media';
import { sectionStyle, sectionEyebrowStyle } from '@/styles/layout';
import { careers } from '@/content/profile';

const CareerSection = memo(() => {
  return (
    <section id="career" css={sectionStyle}>
      <h2 css={[sectionEyebrowStyle, headingGapStyle]}>Career · 삼성SDS</h2>
      <ol css={listStyle}>
        {careers.map((job) => (
          <li key={`${job.period}-${job.name}`} css={rowStyle}>
            <div css={metaStyle}>
              <div css={periodStyle}>{job.period}</div>
              <div css={clientStyle}>{job.client}</div>
            </div>
            <div css={bodyStyle}>
              <div css={titleRowStyle}>
                <h3 css={nameStyle}>{job.name}</h3>
                <span css={roleStyle}>{job.role}</span>
              </div>
              <p css={descStyle}>{job.desc}</p>
              <div css={techWrapStyle}>
                {job.tech.map((t) => (
                  <span key={t} css={techChipStyle}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
});

CareerSection.displayName = 'CareerSection';
export default CareerSection;

const headingGapStyle = css`
  margin-bottom: 28px;
`;

const listStyle = css`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const rowStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 26px 0;
  border-top: 1px solid ${theme.colors.border.secondary};

  ${media.tabletUp} {
    flex-direction: row;
    gap: 24px;
  }
`;

const metaStyle = css`
  display: flex;
  gap: 10px;
  align-items: baseline;

  ${media.tabletUp} {
    width: 128px;
    flex-shrink: 0;
    flex-direction: column;
    gap: 3px;
    padding-top: 2px;
  }
`;

const periodStyle = (theme: Theme) => css`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.fg.body};
  font-weight: ${theme.fontWeight.semibold};
`;

const clientStyle = (theme: Theme) => css`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.fg.tertiary};
`;

const bodyStyle = css`
  flex: 1;
  min-width: 0;
`;

const titleRowStyle = css`
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
`;

const nameStyle = (theme: Theme) => css`
  margin: 0;
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.bold};
  letter-spacing: -0.01em;
  color: ${theme.colors.fg.primary};
`;

const roleStyle = (theme: Theme) => css`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.accent.hover};
  font-weight: ${theme.fontWeight.semibold};
  background: ${theme.colors.accent.subtle};
  padding: 2px 9px;
  border-radius: ${theme.borderRadius.full};
`;

const descStyle = (theme: Theme) => css`
  margin: 10px 0 0;
  font-size: ${theme.fontSize.sm};
  line-height: 1.7;
  color: ${theme.colors.fg.subtle};
`;

const techWrapStyle = css`
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
  margin-top: 14px;
`;

const techChipStyle = (theme: Theme) => css`
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.fg.secondary};
  background: ${theme.colors.bg.secondary};
  padding: 4px 10px;
  border-radius: ${theme.borderRadius.sm};
`;
