import { memo, useEffect, useRef, useState } from 'react';
import { css, type Theme } from '@emotion/react';
import { Link } from 'react-router-dom';
import { media } from '@/styles/media';
import { blobUrl } from '@/lib/github/github';
import NoteMarkdown from './NoteMarkdown';
import { notePath, siblingsOf, type NotePage, type NoteTopic } from './notes';

type NoteArticleProps = {
  topic: NoteTopic;
  page?: NotePage; // 없으면 주제 개요(index.md) + 페이지 목차
};

type Heading = { id: string; text: string };

const NoteArticle = memo(({ topic, page }: NoteArticleProps) => {
  const articleRef = useRef<HTMLElement | null>(null);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const entry = page ?? topic;
  const { prev, next } = siblingsOf(topic, page);
  const showPageList = !page && topic.pages.length > 0;

  // 본문이 렌더된 뒤 DOM 의 h2 로 "이 페이지" 목차를 만든다
  useEffect(() => {
    const nodes = articleRef.current?.querySelectorAll<HTMLHeadingElement>('h2[id]') ?? [];
    setHeadings(Array.from(nodes, (node) => ({ id: node.id, text: node.textContent ?? '' })));
  }, [entry]);

  return (
    <div css={wrapperStyle}>
      <article css={articleStyle} ref={articleRef}>
        <p css={metaStyle}>
          <span>{topic.title}</span>
          {page?.group && (
            <>
              <span aria-hidden>·</span>
              <span>{page.group}</span>
            </>
          )}
          {entry.updated && (
            <>
              <span aria-hidden>·</span>
              <time dateTime={entry.updated}>업데이트 {entry.updated}</time>
            </>
          )}
        </p>
        <div css={titleRowStyle}>
          <h1 css={titleStyle}>{entry.title}</h1>
          <a
            css={sourceLinkStyle}
            href={blobUrl('WoongDream', entry.sourcePath)}
            target="_blank"
            rel="noreferrer"
          >
            원문 ↗
          </a>
        </div>
        {entry.summary && <p css={summaryStyle}>{entry.summary}</p>}

        <NoteMarkdown content={entry.body} />

        {showPageList && (
          <section css={pageListStyle}>
            <h2 id="note-pages" css={pageListHeadingStyle}>
              목차
            </h2>
            {topic.groups.map((group) => (
              <div key={group.label || '_'} css={groupBlockStyle}>
                {group.label && <h3 css={groupLabelStyle}>{group.label}</h3>}
                <ul css={cardGridStyle}>
                  {group.pages.map((p) => (
                    <li key={p.slug}>
                      <Link css={cardStyle} to={notePath(topic.slug, p.slug)}>
                        <span css={cardTitleStyle}>{p.title}</span>
                        <span css={cardDescStyle}>{p.summary}</span>
                        {p.updated && <span css={cardMetaStyle}>업데이트 {p.updated}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {(prev || next) && (
          <nav css={pagerStyle} aria-label="이전·다음 노트">
            {prev ? (
              <Link css={pagerLinkStyle} to={prev.path}>
                <span css={pagerLabelStyle}>← 이전</span>
                <span css={pagerTitleStyle}>{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link css={[pagerLinkStyle, pagerNextStyle]} to={next.path}>
                <span css={pagerLabelStyle}>다음 →</span>
                <span css={pagerTitleStyle}>{next.title}</span>
              </Link>
            )}
          </nav>
        )}
      </article>

      {headings.length > 1 && (
        <nav css={tocStyle} aria-label="이 페이지 목차">
          <p css={tocTitleStyle}>이 페이지</p>
          <ul css={tocListStyle}>
            {headings.map((h) => (
              <li key={h.id}>
                <a css={tocLinkStyle} href={`#${h.id}`}>
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
});

NoteArticle.displayName = 'NoteArticle';
export default NoteArticle;

const wrapperStyle = css`
  max-width: 1080px;
  margin: 0 auto;
  padding: 26px 20px 80px;

  ${media.drawerUp} {
    padding: 44px 48px 100px;
  }

  @media (min-width: 1200px) {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 200px;
    gap: 48px;
  }
`;

const articleStyle = css`
  min-width: 0;
  max-width: 780px;
`;

const metaStyle = (theme: Theme) => css`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
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
  padding-bottom: 18px;
  margin-bottom: 18px;
`;

const titleStyle = (theme: Theme) => css`
  margin: 0;
  font-size: ${theme.fontSize['3xl']};
  font-weight: ${theme.fontWeight.extrabold};
  letter-spacing: -0.02em;
  line-height: 1.25;
  color: ${theme.colors.fg.primary};
`;

const sourceLinkStyle = (theme: Theme) => css`
  flex-shrink: 0;
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.fg.secondary};
  text-decoration: none;
  padding: 6px 10px;
  border: 1px solid ${theme.colors.border.primary};
  border-radius: ${theme.borderRadius.md};

  &:hover {
    color: ${theme.colors.accent.active};
    border-color: ${theme.colors.accent.muted};
  }
`;

const summaryStyle = (theme: Theme) => css`
  margin: 0 0 1.6rem;
  font-size: ${theme.fontSize.lg};
  line-height: 1.6;
  color: ${theme.colors.fg.subtle};
`;

const pageListStyle = css`
  margin-top: 2.4rem;
`;

const pageListHeadingStyle = (theme: Theme) => css`
  margin: 0 0 14px;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${theme.colors.border.secondary};
  font-size: 1.2rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.fg.primary};
  scroll-margin-top: 20px;
`;

const groupBlockStyle = css`
  margin-bottom: 20px;
`;

const groupLabelStyle = (theme: Theme) => css`
  margin: 0 0 10px;
  font-size: 0.7rem;
  font-weight: ${theme.fontWeight.bold};
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: ${theme.colors.fg.tertiary};
`;

const cardGridStyle = css`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  ${media.tabletUp} {
    grid-template-columns: 1fr 1fr;
  }
`;

const cardStyle = (theme: Theme) => css`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 18px;
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
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.fg.primary};
`;

const cardDescStyle = (theme: Theme) => css`
  font-size: ${theme.fontSize.xs};
  line-height: 1.5;
  color: ${theme.colors.fg.secondary};
`;

const cardMetaStyle = (theme: Theme) => css`
  margin-top: auto;
  padding-top: 6px;
  font-size: 0.7rem;
  color: ${theme.colors.fg.tertiary};
`;

const pagerStyle = (theme: Theme) => css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${theme.colors.border.primary};
`;

const pagerLinkStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 16px;
  border: 1px solid ${theme.colors.border.primary};
  border-radius: ${theme.borderRadius.lg};
  text-decoration: none;

  &:hover {
    border-color: ${theme.colors.accent.primary};
  }
`;

const pagerNextStyle = css`
  grid-column: 2;
  text-align: right;
`;

const pagerLabelStyle = (theme: Theme) => css`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.fg.tertiary};
`;

const pagerTitleStyle = (theme: Theme) => css`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.accent.active};
`;

const tocStyle = css`
  display: none;

  @media (min-width: 1200px) {
    display: block;
    position: sticky;
    top: 44px;
    align-self: start;
  }
`;

const tocTitleStyle = (theme: Theme) => css`
  margin-bottom: 10px;
  font-size: 0.7rem;
  font-weight: ${theme.fontWeight.bold};
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: ${theme.colors.fg.tertiary};
`;

const tocListStyle = (theme: Theme) => css`
  list-style: none;
  border-left: 1px solid ${theme.colors.border.primary};
`;

const tocLinkStyle = (theme: Theme) => css`
  display: block;
  padding: 4px 0 4px 12px;
  font-size: ${theme.fontSize.xs};
  line-height: 1.5;
  color: ${theme.colors.fg.secondary};
  text-decoration: none;

  &:hover {
    color: ${theme.colors.accent.active};
  }
`;
