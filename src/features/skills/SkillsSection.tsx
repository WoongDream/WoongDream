import { memo } from 'react';
import { css, type Theme } from '@emotion/react';
import { media } from '@/styles/media';
import { sectionStyle, sectionEyebrowStyle } from '@/styles/layout';
import { skills } from '@/content/profile';

const SkillsSection = memo(() => {
  return (
    <section id="skills" css={sectionStyle}>
      <h2 css={[sectionEyebrowStyle, headingGapStyle]}>Skills</h2>
      <div css={gridStyle}>
        {skills.map((group) => (
          <div key={group.group} css={cardStyle}>
            <h3 css={groupTitleStyle}>{group.group}</h3>
            <div css={chipWrapStyle}>
              {group.items.map((item) => (
                <span key={item} css={chipStyle}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

SkillsSection.displayName = 'SkillsSection';
export default SkillsSection;

const headingGapStyle = css`
  margin-bottom: 28px;
`;

const gridStyle = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  ${media.tabletUp} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${media.desktopUp} {
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
  }
`;

const cardStyle = (theme: Theme) => css`
  border: 1px solid ${theme.colors.border.secondary};
  border-radius: ${theme.borderRadius.xl};
  padding: 22px;
  background: #fafafa;
`;

const groupTitleStyle = (theme: Theme) => css`
  margin: 0 0 14px;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.fg.primary};
`;

const chipWrapStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
`;

const chipStyle = (theme: Theme) => css`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.fg.body};
  background: ${theme.colors.bg.primary};
  border: 1px solid ${theme.colors.border.primary};
  padding: 4px 10px;
  border-radius: ${theme.borderRadius.sm};
`;
