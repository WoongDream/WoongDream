import { describe, it, expect } from 'vitest';
import {
  buildNotes,
  findPage,
  findTopic,
  lastUpdated,
  notePath,
  parseFrontmatter,
  recentEntries,
  siblingsOf,
  validateNotes,
} from './notes';

const D = '/src/content/notes/';

const md = (data: Record<string, string>, body = '본문\n'): string => {
  const lines = Object.entries(data).map(([k, v]) => `${k}: ${v}`);
  return `---\n${lines.join('\n')}\n---\n${body}`;
};

const topicIdx = (title: string, extra: Record<string, string> = {}) =>
  md({ title, summary: `${title} 요약`, updated: '2026-01-01', ...extra });
const page = (title: string, extra: Record<string, string> = {}, body?: string) =>
  md({ title, summary: `${title} 요약`, updated: '2026-01-01', ...extra }, body);

describe('parseFrontmatter', () => {
  it('returns raw text as body when there is no frontmatter', () => {
    expect(parseFrontmatter('# hi\n')).toEqual({ data: {}, body: '# hi\n' });
  });

  it('parses key/value lines and returns the remaining body', () => {
    expect(parseFrontmatter('---\ntitle: A\norder: 2\n---\n본문')).toEqual({
      data: { title: 'A', order: '2' },
      body: '본문',
    });
  });

  it('strips surrounding quotes only when they match', () => {
    const { data } = parseFrontmatter('---\na: "x y"\nb: \'z\'\nc: "oops\n---\n');
    expect(data).toEqual({ a: 'x y', b: 'z', c: '"oops' });
  });

  it('handles CRLF line endings', () => {
    expect(parseFrontmatter('---\r\ntitle: A\r\nsummary: B\r\n---\r\n본문')).toEqual({
      data: { title: 'A', summary: 'B' },
      body: '본문',
    });
  });

  it('keeps colons inside the value', () => {
    expect(parseFrontmatter('---\ntitle: React: 시작하기\n---\n').data.title).toBe(
      'React: 시작하기',
    );
  });

  it('ignores lines without a key', () => {
    expect(parseFrontmatter('---\njust text\n: novalue\ntitle: A\n---\n').data).toEqual({
      title: 'A',
    });
  });
});

describe('notePath', () => {
  it.each([
    [undefined, undefined, '/notes'],
    ['react', undefined, '/notes/react'],
    ['react', 'hooks', '/notes/react/hooks'],
  ])('notePath(%s, %s) -> %s', (topic, pageSlug, expected) => {
    expect(notePath(topic, pageSlug)).toBe(expected);
  });
});

describe('buildNotes', () => {
  it('uses the default home when notes/index.md is missing', () => {
    expect(buildNotes({}).home).toEqual({ title: 'Notes', summary: '', body: '' });
  });

  it('reads home frontmatter and body', () => {
    const { home } = buildNotes({
      [`${D}index.md`]: md({ title: '홈', summary: '소개' }, '환영\n'),
    });
    expect(home).toEqual({ title: '홈', summary: '소개', body: '환영\n' });
  });

  it('skips a topic folder without index.md', () => {
    expect(buildNotes({ [`${D}react/hooks.md`]: page('Hooks') }).topics).toEqual([]);
  });

  it('builds topic and page fields with sourcePath lacking a leading slash', () => {
    const tree = buildNotes({
      [`${D}react/index.md`]: topicIdx('React', { order: '1' }),
      [`${D}react/hooks.md`]: page('Hooks', { order: '2', group: '기본' }),
    });
    const topic = tree.topics[0];
    expect(topic).toMatchObject({
      slug: 'react',
      title: 'React',
      order: 1,
      updated: '2026-01-01',
      sourcePath: 'src/content/notes/react/index.md',
    });
    expect(topic.pages[0]).toMatchObject({
      topicSlug: 'react',
      slug: 'hooks',
      title: 'Hooks',
      group: '기본',
      order: 2,
      sourcePath: 'src/content/notes/react/hooks.md',
    });
  });

  it('falls back to slug as title and empty strings for missing frontmatter', () => {
    const tree = buildNotes({
      [`${D}react/index.md`]: '본문만',
      [`${D}react/hooks.md`]: '본문만',
    });
    expect(tree.topics[0]).toMatchObject({
      title: 'react',
      summary: '',
      updated: '',
      body: '본문만',
    });
    expect(tree.topics[0].pages[0]).toMatchObject({ title: 'hooks', group: '', summary: '' });
  });

  it('sorts topics by order then title, with missing order last', () => {
    const tree = buildNotes({
      [`${D}c/index.md`]: topicIdx('다'),
      [`${D}b/index.md`]: topicIdx('나', { order: '2' }),
      [`${D}a/index.md`]: topicIdx('가', { order: '2' }),
      [`${D}d/index.md`]: topicIdx('라', { order: '1' }),
    });
    expect(tree.topics.map((t) => t.slug)).toEqual(['d', 'a', 'b', 'c']);
  });

  it('treats a non-integer order as missing', () => {
    const tree = buildNotes({
      [`${D}t/index.md`]: topicIdx('T'),
      [`${D}t/a.md`]: page('A', { order: '1.5' }),
      [`${D}t/b.md`]: page('B', { order: '3' }),
    });
    expect(tree.topics[0].pages.map((p) => p.slug)).toEqual(['b', 'a']);
  });

  it('groups pages in first-appearance order and flattens pages in group order', () => {
    const tree = buildNotes({
      [`${D}t/index.md`]: topicIdx('T'),
      [`${D}t/a.md`]: page('A', { order: '1', group: 'X' }),
      [`${D}t/b.md`]: page('B', { order: '2', group: 'Y' }),
      [`${D}t/c.md`]: page('C', { order: '3', group: 'X' }),
      [`${D}t/d.md`]: page('D', { order: '4' }),
    });
    const topic = tree.topics[0];
    expect(topic.groups.map((g) => [g.label, g.pages.map((p) => p.slug)])).toEqual([
      ['X', ['a', 'c']],
      ['Y', ['b']],
      ['', ['d']],
    ]);
    expect(topic.pages.map((p) => p.slug)).toEqual(['a', 'c', 'b', 'd']);
  });

  it('ignores invalid slugs, too-deep paths and non-notes keys', () => {
    const tree = buildNotes({
      [`${D}t/index.md`]: topicIdx('T'),
      [`${D}t/Bad_Name.md`]: page('Bad'),
      [`${D}t/deep/x.md`]: page('Deep'),
      [`${D}Upper/index.md`]: topicIdx('Upper'),
      '/src/other/readme.md': page('Other'),
      [`${D}t/notes.txt`]: 'x',
    });
    expect(tree.topics.map((t) => t.slug)).toEqual(['t']);
    expect(tree.topics[0].pages).toEqual([]);
  });
});

describe('findTopic / findPage', () => {
  const tree = buildNotes({
    [`${D}t/index.md`]: topicIdx('T'),
    [`${D}t/a.md`]: page('A'),
  });

  it('finds existing topic and page', () => {
    const topic = findTopic(tree, 't');
    expect(topic?.title).toBe('T');
    expect(topic && findPage(topic, 'a')?.title).toBe('A');
  });

  it('returns undefined when missing', () => {
    expect(findTopic(tree, 'nope')).toBeUndefined();
    expect(findPage(tree.topics[0], 'nope')).toBeUndefined();
  });
});

describe('siblingsOf', () => {
  const topic = buildNotes({
    [`${D}t/index.md`]: topicIdx('주제'),
    [`${D}t/a.md`]: page('A', { order: '1' }),
    [`${D}t/b.md`]: page('B', { order: '2' }),
    [`${D}t/c.md`]: page('C', { order: '3' }),
  }).topics[0];

  it('topic index has no prev and points next to the first page', () => {
    expect(siblingsOf(topic)).toEqual({
      prev: undefined,
      next: { title: 'A', path: '/notes/t/a' },
    });
  });

  it('first page points back to the topic index', () => {
    expect(siblingsOf(topic, topic.pages[0]).prev).toEqual({ title: '주제', path: '/notes/t' });
  });

  it('middle page has both neighbours', () => {
    expect(siblingsOf(topic, topic.pages[1])).toEqual({
      prev: { title: 'A', path: '/notes/t/a' },
      next: { title: 'C', path: '/notes/t/c' },
    });
  });

  it('last page has no next', () => {
    expect(siblingsOf(topic, topic.pages[2])).toEqual({
      prev: { title: 'B', path: '/notes/t/b' },
      next: undefined,
    });
  });

  it('topic without pages has no siblings', () => {
    const empty = buildNotes({ [`${D}e/index.md`]: topicIdx('E') }).topics[0];
    expect(siblingsOf(empty)).toEqual({ prev: undefined, next: undefined });
  });
});

describe('lastUpdated', () => {
  it('returns the newest date among topic and pages', () => {
    const topic = buildNotes({
      [`${D}t/index.md`]: topicIdx('T', { updated: '2026-02-01' }),
      [`${D}t/a.md`]: page('A', { updated: '2026-03-05' }),
      [`${D}t/b.md`]: page('B', { updated: '2026-01-10' }),
    }).topics[0];
    expect(lastUpdated(topic)).toBe('2026-03-05');
  });

  it('returns empty string when nothing has a date', () => {
    const topic = buildNotes({ [`${D}t/index.md`]: '본문' }).topics[0];
    expect(lastUpdated(topic)).toBe('');
  });
});

describe('recentEntries', () => {
  const tree = buildNotes({
    [`${D}t/index.md`]: topicIdx('T', { updated: '2026-01-01' }),
    [`${D}t/a.md`]: page('A', { updated: '2026-05-01' }),
    [`${D}t/b.md`]: page('B', { updated: '2026-03-01' }),
    [`${D}t/c.md`]: page('C', { updated: 'yesterday' }),
    [`${D}t/d.md`]: '본문만',
  });

  it('sorts newest first, mixing topic overview and pages', () => {
    expect(recentEntries(tree, 10).map((e) => e.title)).toEqual(['A', 'B', 'T']);
  });

  it('excludes entries with invalid or missing dates', () => {
    const titles = recentEntries(tree, 10).map((e) => e.title);
    expect(titles).not.toContain('C');
    expect(titles).not.toContain('d');
  });

  it('applies the limit', () => {
    expect(recentEntries(tree, 2).map((e) => e.title)).toEqual(['A', 'B']);
  });

  it('marks topic overview entries without a page', () => {
    const entries = recentEntries(tree, 10);
    expect(entries.find((e) => e.title === 'T')?.page).toBeUndefined();
    expect(entries.find((e) => e.title === 'A')?.page?.slug).toBe('a');
  });

  it('breaks date ties by title', () => {
    const tied = buildNotes({
      [`${D}t/index.md`]: topicIdx('T', { updated: '2026-01-01' }),
      [`${D}t/b.md`]: page('나', { updated: '2026-06-01' }),
      [`${D}t/a.md`]: page('가', { updated: '2026-06-01' }),
    });
    expect(recentEntries(tied, 2).map((e) => e.title)).toEqual(['가', '나']);
  });
});

describe('validateNotes', () => {
  const valid = (): Record<string, string> => ({
    [`${D}index.md`]: md({ title: '홈', summary: '소개' }),
    [`${D}t/index.md`]: topicIdx('T', { order: '1' }),
    [`${D}t/a.md`]: page('A', { group: 'G' }, '[개요](/notes/t) 와 [홈](/notes) 링크\n'),
  });
  const errorsWith = (extra: Record<string, string>) => validateNotes({ ...valid(), ...extra });

  it('returns no errors for a valid tree', () => {
    expect(validateNotes(valid())).toEqual([]);
  });

  it('accepts an empty file set', () => {
    expect(validateNotes({})).toEqual([]);
  });

  it('reports a file outside the notes folder', () => {
    expect(errorsWith({ '/src/other/x.md': 'x' })).toContainEqual(
      expect.stringContaining('src/other/x.md'),
    );
  });

  it('reports an unknown frontmatter key', () => {
    expect(errorsWith({ [`${D}t/a.md`]: page('A', { tags: 'x' }) })).toContainEqual(
      expect.stringContaining('"tags"'),
    );
  });

  it('rejects group on a topic index but allows it on a page', () => {
    expect(errorsWith({ [`${D}t/index.md`]: topicIdx('T', { group: 'g' }) })).toContainEqual(
      expect.stringContaining('"group"'),
    );
    expect(validateNotes(valid())).toEqual([]);
  });

  it('rejects updated on the home file', () => {
    expect(
      errorsWith({ [`${D}index.md`]: md({ title: '홈', summary: 's', updated: '2026-01-01' }) }),
    ).toContainEqual(expect.stringContaining('"updated"'));
  });

  it('reports missing title and summary', () => {
    const errors = errorsWith({ [`${D}t/a.md`]: md({ updated: '2026-01-01' }) });
    expect(errors).toContainEqual(expect.stringContaining('title'));
    expect(errors).toContainEqual(expect.stringContaining('summary'));
  });

  it('reports missing title on home', () => {
    expect(errorsWith({ [`${D}index.md`]: '본문' })).toContainEqual(
      expect.stringContaining('index.md: title'),
    );
  });

  it.each([
    ['missing', undefined],
    ['wrong format', '2026/01/01'],
    ['impossible date', '2026-02-30'],
    ['month 13', '2026-13-01'],
  ])('reports bad updated (%s)', (_label, updated) => {
    const data: Record<string, string> = { title: 'A', summary: 's' };
    if (updated) {
      data.updated = updated;
    }
    expect(errorsWith({ [`${D}t/a.md`]: md(data) })).toContainEqual(
      expect.stringContaining('updated'),
    );
  });

  it('accepts a leap day', () => {
    expect(errorsWith({ [`${D}t/a.md`]: page('A', { updated: '2028-02-29' }) })).toEqual([]);
  });

  it('reports a non-integer order', () => {
    expect(errorsWith({ [`${D}t/a.md`]: page('A', { order: '1.5' }) })).toContainEqual(
      expect.stringContaining('order'),
    );
  });

  it('reports an H1 in the body but not "# " inside a code block', () => {
    expect(errorsWith({ [`${D}t/a.md`]: page('A', {}, '# 제목\n') })).toContainEqual(
      expect.stringContaining('H1'),
    );
    expect(errorsWith({ [`${D}t/a.md`]: page('A', {}, '```sh\n# comment\n```\n') })).toEqual([]);
  });

  it('reports a broken internal link and accepts valid ones', () => {
    expect(errorsWith({ [`${D}t/a.md`]: page('A', {}, '[x](/notes/x/y)\n') })).toContainEqual(
      expect.stringContaining('/notes/x/y'),
    );
    expect(errorsWith({ [`${D}t/a.md`]: page('A', {}, '[ok](/notes/t/a#h)\n') })).toEqual([]);
  });

  it('ignores links inside code blocks', () => {
    expect(errorsWith({ [`${D}t/a.md`]: page('A', {}, '```md\n[x](/notes/none)\n```\n') })).toEqual(
      [],
    );
  });

  it('reports a page in a topic folder without index.md', () => {
    expect(errorsWith({ [`${D}orphan/p.md`]: page('P') })).toContainEqual(
      expect.stringContaining('index.md'),
    );
  });

  it('reports uppercase and underscore file names', () => {
    const errors = errorsWith({
      [`${D}t/Intro.md`]: page('I'),
      [`${D}t/my_page.md`]: page('M'),
    });
    expect(errors).toContainEqual(expect.stringContaining('t/Intro.md'));
    expect(errors).toContainEqual(expect.stringContaining('t/my_page.md'));
  });

  it('reports a path that is too deep', () => {
    expect(errorsWith({ [`${D}t/sub/x.md`]: page('X') })).toContainEqual(
      expect.stringContaining('t/sub/x.md'),
    );
  });
});
