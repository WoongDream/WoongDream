import { memo } from 'react';
import { css } from '@emotion/react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';
import { markdownStyle } from '@/components/markdown/Markdown.style';
import { rehypeHeadingIds } from './heading';

type NoteMarkdownProps = {
  content: string;
};

// 사이트 내부 링크(/notes/...)는 SPA 이동, 외부 링크는 새 탭.
const components: Components = {
  a: ({ href, children }) => {
    if (href?.startsWith('/')) {
      return <Link to={href}>{children}</Link>;
    }
    if (href && /^https?:\/\//.test(href)) {
      return (
        <a href={href} target="_blank" rel="noreferrer">
          {children}
        </a>
      );
    }
    return <a href={href}>{children}</a>;
  },
};

const NoteMarkdown = memo(({ content }: NoteMarkdownProps) => {
  return (
    <div css={[markdownStyle, anchorStyle]}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHeadingIds]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});

NoteMarkdown.displayName = 'NoteMarkdown';
export default NoteMarkdown;

const anchorStyle = css`
  h2,
  h3 {
    scroll-margin-top: 20px;
  }
`;
