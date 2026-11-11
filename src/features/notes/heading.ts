// 노트 본문의 h2·h3 에 앵커 id 를 붙인다. 한글 제목도 그대로 쓴다 (예: "핵심 정리" → "핵심-정리").

export const slugify = (text: string): string =>
  text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-');

// 같은 제목이 다시 나오면 -1, -2 를 붙인다.
export const createSlugger = () => {
  const seen = new Map<string, number>();
  return (text: string): string => {
    const base = slugify(text) || 'section';
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  };
};

type HastNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

const textOf = (node: HastNode): string =>
  node.type === 'text' ? (node.value ?? '') : (node.children ?? []).map(textOf).join('');

// react-markdown rehypePlugins 용 플러그인.
export const rehypeHeadingIds = () => (tree: HastNode) => {
  const slug = createSlugger();
  const walk = (node: HastNode) => {
    if (node.type === 'element' && (node.tagName === 'h2' || node.tagName === 'h3')) {
      node.properties = { ...node.properties, id: slug(textOf(node)) };
    }
    node.children?.forEach(walk);
  };
  walk(tree);
};
