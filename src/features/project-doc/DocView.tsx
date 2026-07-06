import { memo } from 'react';
import { css, type Theme } from '@emotion/react';
import { media } from '@/styles/media';
import Markdown from '@/components/markdown';
import useGithubDoc from '@/hooks/useGithubDoc';
import { blobUrl } from '@/lib/github/github';
import type { ProjectDoc } from '@/features/projects/projects';

type DocViewProps = {
  doc: ProjectDoc;
};

const DocView = memo(({ doc }: DocViewProps) => {
  const { status, text } = useGithubDoc(doc.repo, doc.path);
  const sourceUrl = blobUrl(doc.repo, doc.path);

  return (
    <div css={wrapperStyle}>
      <div css={metaRowStyle}>
        {doc.side && <span css={sideBadgeStyle(doc.side)}>{doc.side}</span>}
        <span css={groupStyle}>{doc.group}</span>
      </div>
      <div css={titleRowStyle}>
        <h1 css={titleStyle}>{doc.title}</h1>
        <a css={sourceLinkStyle} href={sourceUrl} target="_blank" rel="noreferrer">
          원문 보기 ↗
        </a>
      </div>

      {status === 'loading' && <p css={stateStyle}>문서를 불러오는 중…</p>}

      {status === 'error' && (
        <div css={errorStyle}>
          <p>문서를 불러오지 못했습니다.</p>
          <a css={sourceLinkStyle} href={sourceUrl} target="_blank" rel="noreferrer">
            GitHub 에서 원문 보기 ↗
          </a>
        </div>
      )}

      {status === 'success' && text != null && (
        <article>
          <Markdown content={text} repo={doc.repo} path={doc.path} />
        </article>
      )}
    </div>
  );
});

DocView.displayName = 'DocView';
export default DocView;

const sideBadgeStyle = (side: 'FE' | 'BE') => (theme: Theme) => css`
  font-size: 0.65rem;
  font-weight: ${theme.fontWeight.extrabold};
  letter-spacing: 0.03em;
  padding: 2px 7px;
  border-radius: ${theme.borderRadius.sm};
  color: ${side === 'FE' ? theme.colors.badge.feFg : theme.colors.badge.beFg};
  background: ${side === 'FE' ? theme.colors.badge.feBg : theme.colors.badge.beBg};
`;

const wrapperStyle = css`
  max-width: 820px;
  margin: 0 auto;
  padding: 26px 20px 80px;

  ${media.drawerUp} {
    padding: 44px 48px 100px;
  }
`;

const metaRowStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
`;

const groupStyle = (theme: Theme) => css`
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.fg.tertiary};
`;

const titleRowStyle = (theme: Theme) => css`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid ${theme.colors.border.primary};
  padding-bottom: 20px;
  margin-bottom: 8px;
`;

const titleStyle = (theme: Theme) => css`
  margin: 0;
  font-size: ${theme.fontSize['3xl']};
  font-weight: ${theme.fontWeight.extrabold};
  letter-spacing: -0.02em;
  color: ${theme.colors.fg.primary};
`;

const sourceLinkStyle = (theme: Theme) => css`
  flex-shrink: 0;
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.accent.active};
  text-decoration: none;
  padding: 7px 12px;
  border: 1px solid #bae6fd;
  border-radius: ${theme.borderRadius.md};
  background: #f0faff;
`;

const stateStyle = (theme: Theme) => css`
  padding: 40px 0;
  color: ${theme.colors.fg.tertiary};
  font-size: ${theme.fontSize.sm};
`;

const errorStyle = (theme: Theme) => css`
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: flex-start;
  color: ${theme.colors.fg.secondary};
  font-size: ${theme.fontSize.sm};
`;
