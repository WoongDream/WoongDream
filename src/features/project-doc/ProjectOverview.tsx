import { memo } from 'react';
import { css, type Theme } from '@emotion/react';
import { media } from '@/styles/media';
import type { ProjectMeta, Tone } from '@/features/projects/projects';

type ProjectOverviewProps = {
  project: ProjectMeta;
  onSelectDoc: (key: string) => void;
};

const ProjectOverview = memo(({ project, onSelectDoc }: ProjectOverviewProps) => {
  const singleTechCard = project.techCards.length === 1;

  return (
    <div css={wrapperStyle}>
      <span css={stackBadgeStyle}>
        <span css={dotStyle} aria-hidden />
        {project.stackLine}
      </span>
      <h1 css={heroTitleStyle}>{project.name}</h1>
      <p css={heroDescStyle}>{project.heroDesc}</p>

      <div css={liveWrapStyle}>
        <a css={liveButtonStyle} href={project.liveUrl} target="_blank" rel="noreferrer">
          라이브 서비스 열기 →
        </a>
      </div>

      <section css={blockStyle}>
        <h2 css={blockHeadingStyle}>배경 · 문제</h2>
        <p css={paragraphStyle}>{project.background}</p>
      </section>

      <div css={[techGridStyle, singleTechCard && techGridSingleStyle]}>
        {project.techCards.map((card) => (
          <div key={card.name} css={techCardStyle}>
            <div css={techCardHeadStyle}>
              <span css={techCardTitleStyle}>{card.name}</span>
              {card.sourceUrl && (
                <a css={githubLinkStyle} href={card.sourceUrl} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
              )}
            </div>
            <p css={techNoteStyle}>{card.note}</p>
            <div css={tagWrapStyle}>
              {card.tags.map((tag) => (
                <span key={tag.label} css={toneTagStyle(tag.tone)}>
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <section css={blockStyle}>
        <h2 css={blockHeadingStyle}>핵심 기능</h2>
        <div css={featureListStyle}>
          {project.features.map((f) => (
            <div key={f.title} css={featureRowStyle}>
              <span css={featureEmojiStyle} aria-hidden>
                {f.emoji}
              </span>
              <div>
                <h3 css={featureTitleStyle}>{f.title}</h3>
                <p css={featureDescStyle}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section css={blockStyle}>
        <h2 css={blockHeadingStyle}>결과 · 배운 점</h2>
        <div css={outcomeBoxStyle}>
          {project.outcomes.map((o) => (
            <div key={o} css={outcomeRowStyle}>
              <span css={outcomeMarkStyle} aria-hidden>
                ◆
              </span>
              <p css={outcomeTextStyle}>{o}</p>
            </div>
          ))}
        </div>
      </section>

      <h2 css={[blockHeadingStyle, docsHeadingStyle]}>문서 구성</h2>
      <div css={docCardGridStyle}>
        {project.docs.map((doc) => (
          <button
            key={doc.key}
            type="button"
            css={docCardStyle}
            onClick={() => onSelectDoc(doc.key)}
          >
            <div css={docCardHeadStyle}>
              {doc.side && <span css={sideBadgeStyle(doc.side)}>{doc.side}</span>}
              <span css={docCardTitleStyle}>{doc.title}</span>
            </div>
            <span css={docCardDescStyle}>{doc.desc}</span>
          </button>
        ))}
      </div>

      <p css={footerNoteStyle}>{project.footerNote}</p>
    </div>
  );
});

ProjectOverview.displayName = 'ProjectOverview';
export default ProjectOverview;

const toneTagStyle = (tone: Tone) => (theme: Theme) => css`
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
  padding: 4px 9px;
  border-radius: ${theme.borderRadius.sm};
  color: ${tone === 'sky' ? theme.colors.badge.feFg : theme.colors.badge.beFg};
  background: ${tone === 'sky' ? theme.colors.badge.feBg : theme.colors.badge.beBg};
`;

const sideBadgeStyle = (side: 'FE' | 'BE') => (theme: Theme) => css`
  font-size: 0.65rem;
  font-weight: ${theme.fontWeight.extrabold};
  letter-spacing: 0.03em;
  padding: 2px 7px;
  border-radius: ${theme.borderRadius.sm};
  color: ${side === 'FE' ? theme.colors.badge.feFg : theme.colors.badge.beFg};
  background: ${side === 'FE' ? theme.colors.badge.feBg : theme.colors.badge.beBg};
`;

const wrapperStyle = css`
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px 20px 64px;

  ${media.drawerUp} {
    padding: 56px 48px 80px;
  }
`;

const stackBadgeStyle = (theme: Theme) => css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.accent.active};
  background: ${theme.colors.accent.subtle};
  padding: 6px 12px;
  border-radius: ${theme.borderRadius.full};
`;

const dotStyle = (theme: Theme) => css`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${theme.colors.accent.primary};
`;

const heroTitleStyle = (theme: Theme) => css`
  margin: 20px 0 0;
  font-size: ${theme.fontSize['4xl']};
  font-weight: ${theme.fontWeight.extrabold};
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: ${theme.colors.fg.primary};

  ${media.drawerUp} {
    font-size: ${theme.fontSize['5xl']};
  }
`;

const heroDescStyle = (theme: Theme) => css`
  margin: 16px 0 0;
  font-size: ${theme.fontSize.lg};
  line-height: 1.6;
  color: ${theme.colors.fg.subtle};
  max-width: 620px;
`;

const liveWrapStyle = css`
  display: flex;
  gap: 12px;
  margin-top: 28px;
  flex-wrap: wrap;
`;

const liveButtonStyle = (theme: Theme) => css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.accent.fg};
  background: ${theme.colors.accent.primary};
  padding: 12px 20px;
  border-radius: ${theme.borderRadius.md};
  text-decoration: none;
  box-shadow: 0 3px 10px rgba(56, 189, 248, 0.35);
`;

const blockStyle = css`
  margin-top: 52px;
`;

const blockHeadingStyle = (theme: Theme) => css`
  margin: 0 0 16px;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.bold};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${theme.colors.fg.tertiary};
`;

const paragraphStyle = (theme: Theme) => css`
  margin: 0;
  font-size: ${theme.fontSize.md};
  line-height: 1.8;
  color: ${theme.colors.fg.body};
  max-width: 44em;
`;

const techGridStyle = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-top: 44px;

  ${media.drawerUp} {
    grid-template-columns: 1fr 1fr;
  }
`;

const techGridSingleStyle = css`
  ${media.drawerUp} {
    grid-template-columns: 1fr;
  }
`;

const techCardStyle = (theme: Theme) => css`
  border: 1px solid ${theme.colors.border.primary};
  border-radius: ${theme.borderRadius.lg};
  padding: 22px;
  background: ${theme.colors.bg.primary};
`;

const techCardHeadStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const techCardTitleStyle = (theme: Theme) => css`
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.extrabold};
  color: ${theme.colors.fg.primary};
`;

const githubLinkStyle = (theme: Theme) => css`
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.fg.secondary};
  text-decoration: none;
`;

const techNoteStyle = (theme: Theme) => css`
  margin: 8px 0 14px;
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.fg.secondary};
  line-height: 1.5;
`;

const tagWrapStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const featureListStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const featureRowStyle = (theme: Theme) => css`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  border: 1px solid ${theme.colors.border.primary};
  border-radius: ${theme.borderRadius.lg};
  padding: 18px 20px;
  background: ${theme.colors.bg.primary};
`;

const featureEmojiStyle = css`
  font-size: 22px;
  flex-shrink: 0;
`;

const featureTitleStyle = (theme: Theme) => css`
  margin: 0;
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.fg.primary};
`;

const featureDescStyle = (theme: Theme) => css`
  margin: 6px 0 0;
  font-size: ${theme.fontSize.sm};
  line-height: 1.65;
  color: ${theme.colors.fg.subtle};
`;

const outcomeBoxStyle = (theme: Theme) => css`
  border-radius: ${theme.borderRadius.xl};
  background: ${theme.colors.bg.secondary};
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const outcomeRowStyle = css`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

const outcomeMarkStyle = (theme: Theme) => css`
  color: ${theme.colors.accent.primary};
  line-height: 1.5;
`;

const outcomeTextStyle = (theme: Theme) => css`
  margin: 0;
  font-size: ${theme.fontSize.sm};
  line-height: 1.7;
  color: ${theme.colors.fg.body};
`;

const docsHeadingStyle = css`
  margin-top: 52px;
`;

const docCardGridStyle = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-top: 16px;

  ${media.drawerUp} {
    grid-template-columns: 1fr 1fr;
  }
`;

const docCardStyle = (theme: Theme) => css`
  text-align: left;
  cursor: pointer;
  border: 1px solid ${theme.colors.border.primary};
  border-radius: ${theme.borderRadius.lg};
  padding: 16px 18px;
  background: ${theme.colors.bg.primary};
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;

  &:hover {
    border-color: ${theme.colors.accent.primary};
    box-shadow: 0 2px 10px rgba(56, 189, 248, 0.12);
  }
`;

const docCardHeadStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const docCardTitleStyle = (theme: Theme) => css`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.fg.primary};
`;

const docCardDescStyle = (theme: Theme) => css`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.fg.secondary};
  line-height: 1.5;
`;

const footerNoteStyle = (theme: Theme) => css`
  margin: 40px 0 0;
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.fg.tertiary};
  line-height: 1.6;
`;
