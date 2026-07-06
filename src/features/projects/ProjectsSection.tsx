import { memo } from 'react';
import { css, type Theme } from '@emotion/react';
import { Link } from 'react-router-dom';
import { media } from '@/styles/media';
import { sectionStyle, sectionEyebrowStyle } from '@/styles/layout';
import { projects } from './projects';

const ProjectsSection = memo(() => {
  return (
    <section id="project" css={sectionStyle}>
      <h2 css={[sectionEyebrowStyle, headingGapStyle]}>Personal Projects</h2>
      <div css={gridStyle}>
        {projects.map((project) => (
          <Link key={project.slug} css={cardStyle} to={`/projects/${project.slug}`}>
            <div css={cardHeadStyle}>
              <span css={iconStyle} aria-hidden>
                {project.card.emoji}
              </span>
              <div css={headTextStyle}>
                <h3 css={nameStyle}>{project.name}</h3>
                <span css={taglineStyle}>{project.card.tagline}</span>
              </div>
              <span css={statusStyle}>{project.card.status}</span>
            </div>
            <div css={cardBodyStyle}>
              <p css={summaryStyle}>{project.card.summary}</p>
              <div css={tagWrapStyle}>
                {project.card.tags.map((tag) => (
                  <span key={tag} css={tagStyle}>
                    {tag}
                  </span>
                ))}
              </div>
              <span css={moreStyle}>자세히 보기 →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
});

ProjectsSection.displayName = 'ProjectsSection';
export default ProjectsSection;

const headingGapStyle = css`
  margin-bottom: 28px;
`;

const gridStyle = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  ${media.tabletUp} {
    grid-template-columns: 1fr 1fr;
  }
`;

const cardStyle = (theme: Theme) => css`
  text-decoration: none;
  color: inherit;
  border: 1px solid ${theme.colors.border.primary};
  border-radius: ${theme.borderRadius['2xl']};
  overflow: hidden;
  background: ${theme.colors.bg.primary};
  display: flex;
  flex-direction: column;
  transition:
    box-shadow 0.18s,
    transform 0.18s,
    border-color 0.18s;

  &:hover {
    box-shadow: 0 12px 32px rgba(56, 189, 248, 0.16);
    transform: translateY(-3px);
    border-color: #bae8ff;
  }
`;

const cardHeadStyle = (theme: Theme) => css`
  padding: 26px 26px 22px;
  background: linear-gradient(135deg, #f0faff, #fff);
  border-bottom: 1px solid ${theme.colors.border.secondary};
  display: flex;
  align-items: center;
  gap: 13px;
`;

const iconStyle = (theme: Theme) => css`
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.accent.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`;

const headTextStyle = css`
  min-width: 0;
`;

const nameStyle = (theme: Theme) => css`
  margin: 0;
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.bold};
  letter-spacing: -0.02em;
  color: ${theme.colors.fg.primary};
`;

const taglineStyle = (theme: Theme) => css`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.fg.secondary};
`;

const statusStyle = (theme: Theme) => css`
  margin-left: auto;
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.accent.hover};
  background: ${theme.colors.accent.subtle};
  padding: 5px 11px;
  border-radius: ${theme.borderRadius.full};
  white-space: nowrap;
`;

const cardBodyStyle = css`
  padding: 22px 26px 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const summaryStyle = (theme: Theme) => css`
  margin: 0;
  font-size: ${theme.fontSize.sm};
  line-height: 1.7;
  color: ${theme.colors.fg.subtle};
`;

const tagWrapStyle = css`
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const tagStyle = (theme: Theme) => css`
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.fg.secondary};
  background: ${theme.colors.bg.secondary};
  padding: 4px 10px;
  border-radius: ${theme.borderRadius.sm};
`;

const moreStyle = (theme: Theme) => css`
  margin-top: 18px;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.accent.hover};
`;
