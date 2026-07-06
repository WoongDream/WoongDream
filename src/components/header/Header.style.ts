import { css, type Theme } from '@emotion/react';
import { media } from '@/styles/media';

export const headerStyle = (theme: Theme) => css`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid ${theme.colors.border.secondary};
`;

export const logoStyle = (theme: Theme) => css`
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.bold};
  letter-spacing: -0.01em;
  color: ${theme.colors.fg.primary};
  text-decoration: none;

  span {
    color: ${theme.colors.accent.primary};
  }
`;

export const navStyle = (theme: Theme) => css`
  display: none;
  gap: ${theme.spacing.lg};

  ${media.tabletUp} {
    display: flex;
    align-items: center;
  }
`;

export const navLinkStyle = (theme: Theme) => css`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.fg.secondary};
  text-decoration: none;
  transition: color 0.15s;

  &:hover {
    color: ${theme.colors.accent.active};
  }
`;
