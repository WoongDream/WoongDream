import { css, type Theme } from '@emotion/react';

export const markdownStyle = (theme: Theme) => css`
  color: ${theme.colors.fg.body};
  font-size: ${theme.fontSize.md};
  line-height: 1.75;
  word-break: break-word;

  h1 {
    font-size: 1.45rem;
    font-weight: ${theme.fontWeight.extrabold};
    letter-spacing: -0.01em;
    margin: 2.4rem 0 0.9rem;
    color: ${theme.colors.fg.primary};
  }
  h2 {
    font-size: 1.2rem;
    font-weight: ${theme.fontWeight.bold};
    margin: 2.1rem 0 0.75rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${theme.colors.border.secondary};
    color: ${theme.colors.fg.primary};
  }
  h3 {
    font-size: 1rem;
    font-weight: ${theme.fontWeight.bold};
    margin: 1.5rem 0 0.5rem;
    color: ${theme.colors.fg.strong};
  }
  h4,
  h5,
  h6 {
    font-size: 0.875rem;
    font-weight: ${theme.fontWeight.bold};
    margin: 1.1rem 0 0.4rem;
    color: ${theme.colors.fg.subtle};
  }
  p {
    margin: 0 0 0.9rem;
  }
  a {
    color: ${theme.colors.accent.active};
    text-decoration: none;
    font-weight: ${theme.fontWeight.semibold};
    border-bottom: 1px solid ${theme.colors.accent.muted};
  }
  a:hover {
    border-bottom-color: ${theme.colors.accent.active};
  }
  strong {
    font-weight: ${theme.fontWeight.bold};
    color: ${theme.colors.fg.primary};
  }
  ul,
  ol {
    margin: 0 0 1rem;
    padding-left: 1.4rem;
  }
  li {
    margin: 0.3rem 0;
  }
  li::marker {
    color: ${theme.colors.accent.primary};
  }
  blockquote {
    margin: 0.25rem 0 1.1rem;
    padding: 0.75rem 1.1rem;
    background: ${theme.colors.accent.subtle};
    border-left: 3px solid ${theme.colors.accent.primary};
    border-radius: 0 ${theme.borderRadius.md} ${theme.borderRadius.md} 0;
    color: ${theme.colors.accent.active};
    font-size: 0.9rem;
  }
  blockquote p {
    margin: 0;
  }
  code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.86em;
    background: ${theme.colors.bg.tertiary};
    color: #0f766e;
    padding: 2px 6px;
    border-radius: ${theme.borderRadius.sm};
    white-space: break-spaces;
  }
  pre {
    margin: 0.25rem 0 1.25rem;
    padding: 1rem 1.1rem;
    overflow-x: auto;
    background: ${theme.colors.bg.secondary};
    border: 1px solid ${theme.colors.border.primary};
    border-radius: ${theme.borderRadius.lg};
    font-size: 0.82rem;
    line-height: 1.6;
    tab-size: 2;
  }
  /* 코드 블록 안의 code 는 인라인 칩 스타일을 무효화 */
  pre code {
    background: none;
    color: ${theme.colors.fg.strong};
    padding: 0;
    border-radius: 0;
    font-size: inherit;
    white-space: pre;
  }
  hr {
    border: 0;
    border-top: 1px solid ${theme.colors.border.primary};
    margin: 1.9rem 0;
  }
  img {
    max-width: 100%;
    height: auto;
    border-radius: ${theme.borderRadius.md};
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.86rem;
    margin: 0.25rem 0 1.4rem;
    display: block;
    overflow-x: auto;
  }
  th,
  td {
    padding: 0.65rem 0.95rem;
    border: 1px solid ${theme.colors.border.primary};
    text-align: left;
    vertical-align: top;
  }
  th {
    background: ${theme.colors.bg.secondary};
    color: ${theme.colors.fg.subtle};
    font-weight: ${theme.fontWeight.bold};
    white-space: nowrap;
  }
`;
