// GitHub(WoongDream) 저장소의 마크다운 문서를 런타임에 가져오기 위한 URL 헬퍼 + fetch.
// 백엔드가 없으므로 브라우저에서 raw.githubusercontent.com 을 직접 호출한다.

const OWNER = 'WoongDream';
const BRANCH = 'main';

export const rawUrl = (repo: string, path: string): string =>
  `https://raw.githubusercontent.com/${OWNER}/${repo}/${BRANCH}/${path}`;

export const blobUrl = (repo: string, path: string): string =>
  `https://github.com/${OWNER}/${repo}/blob/${BRANCH}/${path}`;

// path 가 속한 디렉토리의 raw/blob 베이스 URL (상대경로 이미지/링크 해석용). 항상 `/` 로 끝난다.
const dirOf = (path: string): string => {
  const parts = path.split('/');
  parts.pop();
  return parts.length ? parts.join('/') + '/' : '';
};

export const rawBaseDir = (repo: string, path: string): string => rawUrl(repo, dirOf(path));

export const blobBaseDir = (repo: string, path: string): string => blobUrl(repo, dirOf(path));

// 마크다운 내부의 상대 URL 을 절대 URL 로 변환한다.
// - 절대 URL(http/https/protocol-relative)·앵커(#)·mailto 는 그대로 둔다.
// - `.md` 로 끝나는 링크는 GitHub blob 으로, 그 외(이미지/에셋)는 raw 로 해석한다.
export const resolveUrl = (
  url: string | undefined,
  rawBase: string,
  blobBase: string,
): string | undefined => {
  if (!url) {
    return url;
  }
  if (
    /^(https?:)?\/\//.test(url) ||
    url.startsWith('#') ||
    url.startsWith('mailto:') ||
    url.startsWith('data:')
  ) {
    return url;
  }
  const base = /\.md(#.*)?$/i.test(url) ? blobBase : rawBase;
  try {
    return new URL(url, base).href;
  } catch {
    return url;
  }
};

export class GithubFetchError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'GithubFetchError';
    this.status = status;
  }
}

export const fetchDoc = async (
  repo: string,
  path: string,
  signal?: AbortSignal,
): Promise<string> => {
  const res = await fetch(rawUrl(repo, path), { signal });
  if (!res.ok) {
    throw new GithubFetchError(`문서를 불러오지 못했습니다 (${res.status})`, res.status);
  }
  return res.text();
};
