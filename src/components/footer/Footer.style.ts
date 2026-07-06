import { css, type Theme } from '@emotion/react';
import { text } from '@/styles/text';

export const footerStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.border.primary};
  background-color: ${theme.colors.bg.secondary};
`;

export const copyStyle = (theme: Theme) => css`
  ${text({ size: 'xs', weight: 'regular' })({ theme })}
  color: ${theme.colors.fg.tertiary};
`;
