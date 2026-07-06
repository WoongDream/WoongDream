import { css, type Theme } from '@emotion/react';
import { text } from '@/styles/text';
import { HEADER_HEIGHT, Z_INDEX } from '@/styles/constants';

export const headerStyle = (theme: Theme) => css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${Z_INDEX.HIGH};
  height: ${HEADER_HEIGHT};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${theme.spacing.md};
  background-color: ${theme.colors.bg.primary};
  border-bottom: 1px solid ${theme.colors.border.primary};

  @media (min-width: ${theme.breakpoints.tablet}) {
    padding: 0 ${theme.spacing.xl};
  }
`;

export const logoStyle = (theme: Theme) => css`
  ${text({ size: 'lg', weight: 'bold' })({ theme })}
  color: ${theme.colors.fg.primary};
`;

export const navStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
`;

export const navLinkStyle = (theme: Theme) => css`
  ${text({ size: 'sm', weight: 'medium' })({ theme })}
  color: ${theme.colors.fg.secondary};
  transition: color 0.15s;

  &:hover {
    color: ${theme.colors.accent.primary};
  }
`;
