// 노트(/notes) 콘텐츠 모델. src/content/notes 의 마크다운을 주제·페이지 트리로 만든다.
// 파일 형식 규칙은 docs/notes.md 참고. 여기 함수들은 순수 함수라 fixture 로 테스트한다.

export const NOTES_DIR = '/src/content/notes/';

export type NoteHome = {
  title: string;
  summary: string;
  body: string;
};

export type NotePage = {
  topicSlug: string;
  slug: string;
  title: string;
  summary: string;
  group: string;
  order: number;
  updated: string;
  body: string;
  sourcePath: string; // repo 루트 기준 경로 (GitHub 원문 링크용)
};

export type NoteGroup = {
  label: string; // '' 이면 그룹 라벨 없이 표시
  pages: NotePage[];
};

export type NoteTopic = {
  slug: string;
  title: string;
  summary: string;
  order: number;
  updated: string;
  body: string;
  sourcePath: string;
  groups: NoteGroup[];
  pages: NotePage[]; // 사이드바 표시 순서 (groups 를 펼친 것)
};

export type NotesTree = {
  home: NoteHome;
  topics: NoteTopic[];
};

export type RecentEntry = {
  topic: NoteTopic;
  page?: NotePage;
  title: string;
  updated: string;
};

type Frontmatter = Record<string, string>;

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const TOPIC_KEYS = ['title', 'summary', 'order', 'updated'];
const PAGE_KEYS = [...TOPIC_KEYS, 'group'];
const HOME_KEYS = ['title', 'summary'];
const DEFAULT_HOME: NoteHome = { title: 'Notes', summary: '', body: '' };

// `---` 사이의 `key: value` 줄만 읽는다. 값의 앞뒤 따옴표는 벗긴다.
export const parseFrontmatter = (raw: string): { data: Frontmatter; body: string } => {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) {
    return { data: {}, body: raw };
  }
  const data: Frontmatter = {};
  for (const line of match[1].split(/\r?\n/)) {
    const sep = line.indexOf(':');
    if (sep <= 0) {
      continue;
    }
    const key = line.slice(0, sep).trim();
    const value = line
      .slice(sep + 1)
      .trim()
      .replace(/^(['"])(.*)\1$/, '$2');
    data[key] = value;
  }
  return { data, body: raw.slice(match[0].length) };
};

export const notePath = (topicSlug?: string, pageSlug?: string): string => {
  if (!topicSlug) {
    return '/notes';
  }
  return pageSlug ? `/notes/${topicSlug}/${pageSlug}` : `/notes/${topicSlug}`;
};

// glob 키(/src/content/notes/a/b.md)를 notes 폴더 기준 조각으로 나눈다. 형식이 다르면 null.
const splitKey = (key: string): string[] | null => {
  if (!key.startsWith(NOTES_DIR) || !key.endsWith('.md')) {
    return null;
  }
  return key.slice(NOTES_DIR.length, -'.md'.length).split('/');
};

const toOrder = (value: string | undefined): number => {
  const n = Number(value);
  return value != null && value !== '' && Number.isInteger(n) ? n : Number.MAX_SAFE_INTEGER;
};

const byOrderThenTitle = (
  a: { order: number; title: string },
  b: { order: number; title: string },
): number => a.order - b.order || a.title.localeCompare(b.title, 'ko');

const groupPages = (pages: NotePage[]): NoteGroup[] => {
  const groups: NoteGroup[] = [];
  for (const page of pages) {
    const found = groups.find((g) => g.label === page.group);
    if (found) {
      found.pages.push(page);
    } else {
      groups.push({ label: page.group, pages: [page] });
    }
  }
  return groups;
};

// 마크다운 파일 묶음(glob 결과)을 주제·페이지 트리로 만든다. 잘못된 파일은 건너뛴다(검사는 validateNotes).
export const buildNotes = (files: Record<string, string>): NotesTree => {
  let home = DEFAULT_HOME;
  const topicFiles = new Map<string, { index?: string; pages: [string, string][] }>();

  for (const [key, raw] of Object.entries(files)) {
    const parts = splitKey(key);
    if (!parts) {
      continue;
    }
    if (parts.length === 1 && parts[0] === 'index') {
      const { data, body } = parseFrontmatter(raw);
      home = { title: data.title || DEFAULT_HOME.title, summary: data.summary ?? '', body };
      continue;
    }
    if (parts.length !== 2 || !SLUG.test(parts[0])) {
      continue;
    }
    const [topicSlug, fileSlug] = parts;
    const entry = topicFiles.get(topicSlug) ?? { pages: [] };
    if (fileSlug === 'index') {
      entry.index = key;
    } else if (SLUG.test(fileSlug)) {
      entry.pages.push([key, fileSlug]);
    }
    topicFiles.set(topicSlug, entry);
  }

  const topics: NoteTopic[] = [];
  for (const [topicSlug, entry] of topicFiles) {
    if (!entry.index) {
      continue;
    }
    const { data, body } = parseFrontmatter(files[entry.index]);
    const pages = entry.pages
      .map(([key, slug]): NotePage => {
        const parsed = parseFrontmatter(files[key]);
        return {
          topicSlug,
          slug,
          title: parsed.data.title || slug,
          summary: parsed.data.summary ?? '',
          group: parsed.data.group ?? '',
          order: toOrder(parsed.data.order),
          updated: parsed.data.updated ?? '',
          body: parsed.body,
          sourcePath: key.slice(1),
        };
      })
      .sort(byOrderThenTitle);
    const groups = groupPages(pages);
    topics.push({
      slug: topicSlug,
      title: data.title || topicSlug,
      summary: data.summary ?? '',
      order: toOrder(data.order),
      updated: data.updated ?? '',
      body,
      sourcePath: entry.index.slice(1),
      groups,
      pages: groups.flatMap((g) => g.pages),
    });
  }
  topics.sort(byOrderThenTitle);

  return { home, topics };
};

export const findTopic = (tree: NotesTree, topicSlug: string): NoteTopic | undefined =>
  tree.topics.find((t) => t.slug === topicSlug);

export const findPage = (topic: NoteTopic, pageSlug: string): NotePage | undefined =>
  topic.pages.find((p) => p.slug === pageSlug);

// 주제 안에서 [주제 개요, ...페이지] 순서로 앞뒤 항목을 찾는다.
export const siblingsOf = (
  topic: NoteTopic,
  page?: NotePage,
): { prev?: { title: string; path: string }; next?: { title: string; path: string } } => {
  const sequence = [
    { title: topic.title, path: notePath(topic.slug) },
    ...topic.pages.map((p) => ({ title: p.title, path: notePath(topic.slug, p.slug) })),
  ];
  const index = page ? topic.pages.indexOf(page) + 1 : 0;
  return { prev: sequence[index - 1], next: sequence[index + 1] };
};

// 주제 개요와 페이지 중 가장 최근 updated.
export const lastUpdated = (topic: NoteTopic): string =>
  [topic.updated, ...topic.pages.map((p) => p.updated)].reduce(
    (latest, d) => (d > latest ? d : latest),
    '',
  );

// 주제 개요와 페이지를 updated 최신순으로 limit 개.
export const recentEntries = (tree: NotesTree, limit: number): RecentEntry[] =>
  tree.topics
    .flatMap((topic): RecentEntry[] => [
      { topic, title: topic.title, updated: topic.updated },
      ...topic.pages.map((page) => ({ topic, page, title: page.title, updated: page.updated })),
    ])
    .filter((e) => DATE.test(e.updated))
    .sort((a, b) => b.updated.localeCompare(a.updated) || a.title.localeCompare(b.title, 'ko'))
    .slice(0, limit);

const isValidDate = (value: string): boolean => {
  if (!DATE.test(value)) {
    return false;
  }
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
};

// 본문의 사이트 내부 링크(/notes/...)를 모은다. 코드 블록 안은 무시한다.
const internalLinks = (body: string): string[] => {
  const withoutCode = body.replace(/```[\s\S]*?```/g, '');
  return [...withoutCode.matchAll(/\]\((\/notes[^)\s#]*)/g)].map((m) => m[1].replace(/\/$/, ''));
};

// 콘텐츠 규칙 위반 목록. 빈 배열이면 통과. 테스트(content.test.ts)가 실제 콘텐츠에 대해 돌린다.
export const validateNotes = (files: Record<string, string>): string[] => {
  const errors: string[] = [];
  const tree = buildNotes(files);
  const validPaths = new Set<string>([notePath()]);
  for (const topic of tree.topics) {
    validPaths.add(notePath(topic.slug));
    topic.pages.forEach((p) => validPaths.add(notePath(topic.slug, p.slug)));
  }

  const topicsWithIndex = new Set(tree.topics.map((t) => t.slug));

  for (const [key, raw] of Object.entries(files)) {
    const where = key.slice(1);
    const parts = splitKey(key);
    if (!parts) {
      errors.push(`${where}: notes 폴더의 .md 파일이 아니다`);
      continue;
    }
    const isHome = parts.length === 1 && parts[0] === 'index';
    if (!isHome && parts.length !== 2) {
      errors.push(
        `${where}: notes/<주제>/<페이지>.md 깊이만 쓴다 (index.md 는 notes 바로 아래 또는 주제 폴더)`,
      );
      continue;
    }
    if (!isHome && !parts.every((p) => SLUG.test(p))) {
      errors.push(`${where}: 폴더·파일 이름은 소문자·숫자·하이픈만 쓴다`);
      continue;
    }
    if (!isHome && !topicsWithIndex.has(parts[0])) {
      errors.push(`${where}: 주제 폴더 ${parts[0]}/ 에 index.md 가 없다`);
      continue;
    }

    const { data, body } = parseFrontmatter(raw);
    const isTopicIndex = !isHome && parts[1] === 'index';
    const allowed = isHome ? HOME_KEYS : isTopicIndex ? TOPIC_KEYS : PAGE_KEYS;
    for (const k of Object.keys(data)) {
      if (!allowed.includes(k)) {
        errors.push(`${where}: 모르는 머리말 키 "${k}" (쓸 수 있는 키: ${allowed.join(', ')})`);
      }
    }
    if (!data.title) {
      errors.push(`${where}: title 이 없다`);
    }
    if (!isHome) {
      if (!data.summary) {
        errors.push(`${where}: summary 가 없다`);
      }
      if (!isValidDate(data.updated ?? '')) {
        errors.push(`${where}: updated 는 YYYY-MM-DD 날짜여야 한다 (지금 "${data.updated ?? ''}")`);
      }
      if (data.order != null && !Number.isInteger(Number(data.order))) {
        errors.push(`${where}: order 는 정수여야 한다 (지금 "${data.order}")`);
      }
    }
    if (/^# /m.test(body.replace(/```[\s\S]*?```/g, ''))) {
      errors.push(`${where}: 본문에 # 제목(H1)을 쓰지 않는다. 제목은 머리말 title 로 표시된다`);
    }
    for (const link of internalLinks(body)) {
      if (!validPaths.has(link)) {
        errors.push(`${where}: 없는 노트로 가는 링크 ${link}`);
      }
    }
  }
  return errors;
};
