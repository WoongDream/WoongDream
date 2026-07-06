import { memo } from 'react';
import { css, type Theme } from '@emotion/react';
import { media } from '@/styles/media';
import { stats } from '@/content/profile';

const StatsSection = memo(() => {
  return (
    <section css={wrapperStyle}>
      {stats.map((stat) => (
        <div key={stat.label}>
          <div css={valueStyle}>
            <span css={accentStyle}>{stat.value}</span>
            {stat.unit}
          </div>
          <div css={labelStyle}>{stat.label}</div>
        </div>
      ))}
    </section>
  );
});

StatsSection.displayName = 'StatsSection';
export default StatsSection;

const wrapperStyle = (theme: Theme) => css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px 16px;
  padding: 24px 0;
  margin-top: 44px;
  border-top: 1px solid ${theme.colors.border.primary};
  border-bottom: 1px solid ${theme.colors.border.primary};

  ${media.tabletUp} {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    padding: 28px 0;
  }
`;

const valueStyle = (theme: Theme) => css`
  font-size: ${theme.fontSize['3xl']};
  font-weight: ${theme.fontWeight.bold};
  letter-spacing: -0.02em;
  color: ${theme.colors.fg.primary};
`;

const accentStyle = (theme: Theme) => css`
  color: ${theme.colors.accent.primary};
`;

const labelStyle = (theme: Theme) => css`
  margin-top: 4px;
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.fg.secondary};
`;
