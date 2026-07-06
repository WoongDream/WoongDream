import { describe, it, expect, afterEach, vi } from 'vitest';
import {
  rawUrl,
  blobUrl,
  rawBaseDir,
  blobBaseDir,
  resolveUrl,
  fetchDoc,
  GithubFetchError,
} from './github';

describe('rawUrl / blobUrl', () => {
  it('rawUrl 은 raw.githubusercontent.com 절대 URL 을 만든다', () => {
    expect(rawUrl('DreamSam', 'README.md')).toBe(
      'https://raw.githubusercontent.com/WoongDream/DreamSam/main/README.md',
    );
  });

  it('blobUrl 은 github.com blob 절대 URL 을 만든다', () => {
    expect(blobUrl('OnGodMatchu-FE', 'docs/architecture.md')).toBe(
      'https://github.com/WoongDream/OnGodMatchu-FE/blob/main/docs/architecture.md',
    );
  });
});

describe('rawBaseDir / blobBaseDir', () => {
  it('루트 파일의 rawBaseDir 은 /main/ 으로 끝난다', () => {
    expect(rawBaseDir('DreamSam', 'README.md')).toBe(
      'https://raw.githubusercontent.com/WoongDream/DreamSam/main/',
    );
    expect(rawBaseDir('DreamSam', 'README.md').endsWith('/main/')).toBe(true);
  });

  it('하위 디렉토리 파일의 rawBaseDir 은 /main/docs/ 로 끝난다', () => {
    expect(rawBaseDir('DreamSam', 'docs/architecture.md').endsWith('/main/docs/')).toBe(true);
  });

  it('blobBaseDir 도 디렉토리 기준으로 동작한다', () => {
    expect(blobBaseDir('DreamSam', 'docs/architecture.md')).toBe(
      'https://github.com/WoongDream/DreamSam/blob/main/docs/',
    );
  });
});

describe('resolveUrl', () => {
  const rawBase = 'https://raw.githubusercontent.com/WoongDream/DreamSam/main/docs/';
  const blobBase = 'https://github.com/WoongDream/DreamSam/blob/main/docs/';

  it('undefined 입력은 undefined 를 반환한다', () => {
    expect(resolveUrl(undefined, rawBase, blobBase)).toBeUndefined();
  });

  it('절대 http(s) URL 은 그대로 통과한다', () => {
    expect(resolveUrl('https://x.com/a.png', rawBase, blobBase)).toBe('https://x.com/a.png');
  });

  it('protocol-relative URL 은 그대로 통과한다', () => {
    expect(resolveUrl('//x/a', rawBase, blobBase)).toBe('//x/a');
  });

  it('앵커(#) 는 그대로 통과한다', () => {
    expect(resolveUrl('#anchor', rawBase, blobBase)).toBe('#anchor');
  });

  it('mailto 는 그대로 통과한다', () => {
    expect(resolveUrl('mailto:a@b.c', rawBase, blobBase)).toBe('mailto:a@b.c');
  });

  it('data URI 는 그대로 통과한다', () => {
    expect(resolveUrl('data:image/png;base64,AAAA', rawBase, blobBase)).toBe(
      'data:image/png;base64,AAAA',
    );
  });

  it('상대 이미지 경로는 rawBase 기준 절대 URL 로 해석된다', () => {
    expect(resolveUrl('./img.png', rawBase, blobBase)).toBe(
      'https://raw.githubusercontent.com/WoongDream/DreamSam/main/docs/img.png',
    );
  });

  it('상대 .md 링크는 blobBase 기준 절대 URL 로 해석된다', () => {
    expect(resolveUrl('./conventions.md', rawBase, blobBase)).toBe(
      'https://github.com/WoongDream/DreamSam/blob/main/docs/conventions.md',
    );
  });
});

describe('fetchDoc', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('ok:true 이면 응답 본문 텍스트를 반환한다', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: () => Promise.resolve('# hello'),
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchDoc('DreamSam', 'README.md')).resolves.toBe('# hello');
    expect(fetchMock).toHaveBeenCalledWith(
      'https://raw.githubusercontent.com/WoongDream/DreamSam/main/README.md',
      { signal: undefined },
    );
  });

  it('ok:false(404) 이면 status 404 인 GithubFetchError 를 던진다', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      text: () => Promise.resolve('Not Found'),
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchDoc('DreamSam', 'missing.md')).rejects.toBeInstanceOf(GithubFetchError);
    await expect(fetchDoc('DreamSam', 'missing.md')).rejects.toMatchObject({ status: 404 });
  });

  it('signal 을 fetch 로 전달한다', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: () => Promise.resolve('body'),
    });
    vi.stubGlobal('fetch', fetchMock);
    const controller = new AbortController();

    await fetchDoc('DreamSam', 'README.md', controller.signal);
    expect(fetchMock).toHaveBeenCalledWith(expect.any(String), { signal: controller.signal });
  });
});
