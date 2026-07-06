import { memo } from 'react';
import { css, type Theme } from '@emotion/react';
import { Link } from 'react-router-dom';
import { text } from '@/styles/text';

const NotFoundPage = memo(() => {
  return (
    <section css={wrapperStyle}>
      <h1 css={codeStyle}>404</h1>
      <p css={messageStyle}>페이지를 찾을 수 없습니다.</p>
      <Link css={linkStyle} to="/">
        홈으로 돌아가기
      </Link>
    </section>
  );
});

NotFoundPage.displayName = 'NotFoundPage';
export default NotFoundPage;

const wrapperStyle = (theme: Theme) => css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};
  min-height: 50vh;
`;

const codeStyle = (theme: Theme) => css`
  font-size: 3rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.fg.primary};
`;

const messageStyle = (theme: Theme) => css`
  ${text({ size: 'md', weight: 'regular' })({ theme })}
  color: ${theme.colors.fg.secondary};
`;

const linkStyle = (theme: Theme) => css`
  ${text({ size: 'md', weight: 'semibold' })({ theme })}
  color: ${theme.colors.accent.primary};
`;
