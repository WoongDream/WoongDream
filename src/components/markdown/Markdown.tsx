import { memo, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { rawBaseDir, blobBaseDir, resolveUrl } from '@/lib/github/github';
import { markdownStyle } from './Markdown.style';

type MarkdownProps = {
  content: string;
  // 상대 URL(이미지/링크) 을 절대 URL 로 해석하기 위한 문서 위치
  repo: string;
  path: string;
};

const Markdown = memo(({ content, repo, path }: MarkdownProps) => {
  const { rawBase, blobBase } = useMemo(
    () => ({ rawBase: rawBaseDir(repo, path), blobBase: blobBaseDir(repo, path) }),
    [repo, path],
  );

  const transform = useMemo(
    () => (url: string) => resolveUrl(url, rawBase, blobBase) ?? url,
    [rawBase, blobBase],
  );

  return (
    <div css={markdownStyle}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} urlTransform={transform}>
        {content}
      </ReactMarkdown>
    </div>
  );
});

Markdown.displayName = 'Markdown';
export default Markdown;
