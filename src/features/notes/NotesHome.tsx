import { memo } from 'react';
import { css, type Theme } from '@emotion/react';
import { Link } from 'react-router-dom';
import { media } from '@/styles/media';
import NoteMarkdown from './NoteMarkdown';
import { lastUpdated, notePath, recentEntries, type NotesTree } from './notes';

type NotesHomeProps = {
  tree: NotesTree;
};

const RECENT_LIMIT = 6;

const NotesHome = memo(({ tree }: NotesHomeProps) => {
  const { home, topics } = tree;
  const recent = recentEntries(tree, RECENT_LIMIT);

  return (
    <div css={wrapperStyle}>
      <span css={eyebrowStyle}>Notes</span>
      <h1 css={titleStyle}>{home.title}</h1>
      {home.summary && <p css={summaryStyle}>{home.summary}</p>}
      {home.body && <NoteMarkdown content={home.body} />}

      <section css={blockStyle}>
        <h2 css={blockHeadingStyle}>주제</h2>
        {topics.length === 0 ? (
          <p css={emptyStyle}>아직 노트가 없습니다.</p>
        ) : (
          <ul css={gridStyle}>
            {topics.map((topic) => (
              <li key={topic.slug}>
                <Link css={cardStyle} to={notePath(topic.slug)}>
                  <span css={cardTitleStyle}>{topic.title}</span>
                  <span css={cardDescStyle}>{topic.summary}</span>
                  <span css={cardMetaStyle}>
                    페이지 {topic.pages.length}개 · 업데이트 {lastUpdated(topic)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {recent.length > 0 && (
        <section css={blockStyle}>
          <h2 css={blockHeadingStyle}>최근 업데이트</h2>
          <ul css={recentListStyle}>
            {recent.map((item) => (
              <li key={notePath(item.topic.slug, item.page?.slug)}>
                <Link css={recentLinkStyle} to={notePath(item.topic.slug, item.page?.slug)}>
                  <time css={recentDateStyle} dateTime={item.updated}>
                    {item.updated}
                  </time>
                  <span css={recentTitleStyle}>
                    {item.page ? `${item.topic.title} / ${item.page.title}` : item.topic.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
});

NotesHome.displayName = 'NotesHome';
export default NotesHome;

const wrapperStyle = css`
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 20px 64px;

  ${media.drawerUp} {
    padding: 56px 48px 80px;
  }
`;

const eyebrowStyle = (theme: Theme) => css`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.accent.primary};
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const titleStyle = (theme: Theme) => css`
  margin: 12px 0 0;
  font-size: ${theme.fontSize['4xl']};
  font-weight: ${theme.fontWeight.extrabold};
  letter-spacing: -0.03em;
  line-height: 1.15;
  color: ${theme.colors.fg.primary};
`;

const summaryStyle = (theme: Theme) => css`
  margin: 14px 0 1.4rem;
  font-size: ${theme.fontSize.lg};
  line-height: 1.6;
  color: ${theme.colors.fg.subtle};
  max-width: 640px;
`;

const blockStyle = css`
  margin-top: 44px;
`;

const blockHeadingStyle = (theme: Theme) => css`
  margin: 0 0 16px;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.bold};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${theme.colors.fg.tertiary};
`;

const emptyStyle = (theme: Theme) => css`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.fg.tertiary};
`;

const gridStyle = css`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;

  ${media.tabletUp} {
    grid-template-columns: 1fr 1fr;
  }
`;

const cardStyle = (theme: Theme) => css`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 20px 22px;
  border: 1px solid ${theme.colors.border.primary};
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.bg.primary};
  text-decoration: none;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;

  &:hover {
    border-color: ${theme.colors.accent.primary};
    box-shadow: 0 2px 10px rgba(56, 189, 248, 0.12);
  }
`;

const cardTitleStyle = (theme: Theme) => css`
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.extrabold};
  color: ${theme.colors.fg.primary};
`;

const cardDescStyle = (theme: Theme) => css`
  font-size: ${theme.fontSize.sm};
  line-height: 1.6;
  color: ${theme.colors.fg.subtle};
`;

const cardMetaStyle = (theme: Theme) => css`
  margin-top: auto;
  padding-top: 8px;
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.fg.tertiary};
`;

const recentListStyle = (theme: Theme) => css`
  list-style: none;
  border-top: 1px solid ${theme.colors.border.secondary};
`;

const recentLinkStyle = (theme: Theme) => css`
  display: flex;
  gap: 16px;
  align-items: baseline;
  padding: 12px 4px;
  border-bottom: 1px solid ${theme.colors.border.secondary};
  text-decoration: none;

  &:hover span {
    color: ${theme.colors.accent.active};
  }
`;

const recentDateStyle = (theme: Theme) => css`
  flex-shrink: 0;
  font-size: ${theme.fontSize.xs};
  font-variant-numeric: tabular-nums;
  color: ${theme.colors.fg.tertiary};
`;

const recentTitleStyle = (theme: Theme) => css`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.fg.strong};
`;
