import { css, type Theme } from '@emotion/react';
import { HEADER_HEIGHT } from '@/styles/constants';

export const appShellStyle = (theme: Theme) => css`
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.bg.primary};
`;

export const pageContentStyle = (theme: Theme) => css`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: calc(${HEADER_HEIGHT} + ${theme.spacing.lg});
  width: 100%;
  max-width: ${theme.breakpoints.desktop};
  margin: 0 auto;
  padding-left: ${theme.spacing.md};
  padding-right: ${theme.spacing.md};

  @media (min-width: ${theme.breakpoints.tablet}) {
    padding-left: ${theme.spacing.xl};
    padding-right: ${theme.spacing.xl};
  }
`;

export const sectionStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing['2xl']} 0;
  scroll-margin-top: calc(${HEADER_HEIGHT} + ${theme.spacing.md});
`;

export const sectionTitleStyle = (theme: Theme) => css`
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.fg.primary};
`;
