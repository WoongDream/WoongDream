import { css, type Theme } from '@emotion/react';
import { media } from '@/styles/media';

// 프로젝트 문서 사이트(ProjectDocLayout)와 같은 골격: 좌측 사이드바(모바일은 드로어) + 상단 경로 + 본문 스크롤.

export const rootStyle = (theme: Theme) => css`
  display: flex;
  height: 100vh;
  width: 100%;
  background: ${theme.colors.bg.primary};
  color: ${theme.colors.fg.primary};
`;

export const backdropStyle = css`
  display: none;

  @media (max-width: 700px) {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.42);
    z-index: 50;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.26s ease;
  }
`;

export const backdropOpenStyle = css`
  @media (max-width: 700px) {
    opacity: 1;
    pointer-events: auto;
  }
`;

export const asideStyle = (theme: Theme) => css`
  width: 270px;
  flex-shrink: 0;
  height: 100%;
  background: ${theme.colors.bg.secondary};
  border-right: 1px solid ${theme.colors.border.primary};
  display: flex;
  flex-direction: column;

  @media (max-width: 700px) {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 84%;
    max-width: 310px;
    z-index: 60;
    transform: translateX(-100%);
    transition: transform 0.26s ease;
    box-shadow: 0 0 44px rgba(15, 23, 42, 0.22);
  }
`;

export const asideOpenStyle = css`
  @media (max-width: 700px) {
    transform: translateX(0);
  }
`;

export const backLinkStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 20px 0;
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.fg.secondary};
  text-decoration: none;

  &:hover {
    color: ${theme.colors.accent.active};
  }
`;

export const asideHeadStyle = (theme: Theme) => css`
  padding: 14px 20px 18px;
  border-bottom: 1px solid ${theme.colors.border.primary};
`;

export const siteLinkStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${theme.colors.fg.primary};
  text-decoration: none;
`;

export const initialStyle = (theme: Theme) => css`
  width: 30px;
  height: 30px;
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.accent.primary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.accent.fg};
  font-weight: ${theme.fontWeight.extrabold};
  font-size: ${theme.fontSize.sm};
  box-shadow: 0 2px 6px rgba(56, 189, 248, 0.35);
`;

export const siteNameStyle = (theme: Theme) => css`
  font-weight: ${theme.fontWeight.extrabold};
  font-size: ${theme.fontSize.md};
  letter-spacing: -0.01em;
`;

export const asideTaglineStyle = (theme: Theme) => css`
  margin-top: 8px;
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.fg.tertiary};
  line-height: 1.5;
`;

export const navStyle = css`
  flex: 1;
  overflow-y: auto;
  padding: 16px 12px 24px;
`;

export const topicBlockStyle = css`
  margin-bottom: 6px;
`;

export const topicLinkStyle = (theme: Theme) => css`
  display: block;
  padding: 8px 12px;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.fg.strong};
  text-decoration: none;

  &:hover {
    background: ${theme.colors.bg.tertiary};
  }
`;

export const groupLabelStyle = (theme: Theme) => css`
  margin: 12px 0 6px;
  padding: 0 12px 0 26px;
  font-size: 0.68rem;
  font-weight: ${theme.fontWeight.bold};
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: ${theme.colors.fg.tertiary};
`;

export const pageLinkStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 12px 7px 16px;
  margin: 1px 0;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.fg.subtle};
  text-decoration: none;

  &:hover {
    background: ${theme.colors.bg.tertiary};
  }
`;

export const navActiveStyle = (theme: Theme) => css`
  background: ${theme.colors.accent.subtle};
  color: #0c4a6e;
  font-weight: ${theme.fontWeight.bold};

  &:hover {
    background: ${theme.colors.accent.subtle};
  }
`;

export const navDotStyle = (theme: Theme) => css`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${theme.colors.border.primary};
`;

export const navDotActiveStyle = (theme: Theme) => css`
  background: ${theme.colors.accent.primary};
`;

export const mainColumnStyle = css`
  flex: 1;
  min-width: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const docHeaderStyle = (theme: Theme) => css`
  height: 56px;
  flex-shrink: 0;
  border-bottom: 1px solid ${theme.colors.border.primary};
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 14px;
  min-width: 0;

  ${media.drawerUp} {
    padding: 0 26px;
  }
`;

export const burgerStyle = (theme: Theme) => css`
  display: none;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  margin-right: 4px;
  border: 1px solid ${theme.colors.border.primary};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.bg.primary};
  cursor: pointer;
  flex-shrink: 0;

  @media (max-width: 700px) {
    display: inline-flex;
  }
`;

export const burgerBarStyle = css`
  position: relative;
  display: block;
  width: 16px;
  height: 2px;
  border-radius: 2px;
  background: #334155;
  box-shadow:
    0 -5px 0 #334155,
    0 5px 0 #334155;
`;

export const crumbLinkStyle = (theme: Theme) => css`
  flex-shrink: 0;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.fg.tertiary};
  text-decoration: none;

  &:hover {
    color: ${theme.colors.accent.active};
  }
`;

export const crumbSepStyle = (theme: Theme) => css`
  color: ${theme.colors.border.primary};
`;

export const crumbTitleStyle = (theme: Theme) => css`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.fg.primary};
  font-weight: ${theme.fontWeight.bold};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const mainScrollStyle = css`
  flex: 1;
  overflow-y: auto;
  position: relative;
  scroll-behavior: smooth;
`;
