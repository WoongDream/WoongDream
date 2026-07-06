import { css, type Theme } from '@emotion/react';
import { media } from '@/styles/media';

export const appShellStyle = (theme: Theme) => css`
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.bg.primary};
`;

// About Me 페이지 중앙 컬럼 (디자인: max-width 1000px, 좌우 24px)
export const homeContainerStyle = css`
  flex: 1;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;

  ${media.tabletUp} {
    padding: 0 24px;
  }
`;

// 섹션 상단 여백 (모바일 52px → 데스크톱 76px)
export const sectionStyle = css`
  padding-top: 52px;
  scroll-margin-top: 72px;

  ${media.tabletUp} {
    padding-top: 76px;
  }
`;

// 섹션 머리말 (About / Career / Skills … — accent 대문자 라벨)
export const sectionEyebrowStyle = (theme: Theme) => css`
  margin: 0;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.accent.primary};
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;
