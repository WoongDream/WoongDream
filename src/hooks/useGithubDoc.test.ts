import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { fetchDoc } from '@/lib/github/github';
import useGithubDoc from './useGithubDoc';

vi.mock('@/lib/github/github', () => ({ fetchDoc: vi.fn() }));

const mockedFetchDoc = vi.mocked(fetchDoc);

describe('useGithubDoc', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('starts in the loading state', () => {
    mockedFetchDoc.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useGithubDoc('owner/repo', 'README.md'));

    expect(result.current.status).toBe('loading');
    expect(result.current.text).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('resolves to success with the fetched text', async () => {
    mockedFetchDoc.mockResolvedValue('ok');

    const { result } = renderHook(() => useGithubDoc('owner/repo', 'README.md'));

    await waitFor(() => expect(result.current.status).toBe('success'));

    expect(result.current.text).toBe('ok');
    expect(result.current.error).toBeNull();
  });

  it('resolves to error when the fetch rejects', async () => {
    const boom = new Error('boom');
    mockedFetchDoc.mockRejectedValue(boom);

    const { result } = renderHook(() => useGithubDoc('owner/repo', 'README.md'));

    await waitFor(() => expect(result.current.status).toBe('error'));

    expect(result.current.error).toBe(boom);
    expect(result.current.text).toBeNull();
  });
});
