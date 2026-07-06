import { useEffect, useState } from 'react';
import { fetchDoc } from '@/lib/github/github';

export type DocStatus = 'loading' | 'success' | 'error';

export type UseGithubDocResult = {
  status: DocStatus;
  text: string | null;
  error: Error | null;
};

const LOADING: UseGithubDocResult = { status: 'loading', text: null, error: null };

// repo/path 마크다운을 GitHub 에서 가져온다. repo/path 변경 시 이전 요청은 abort.
const useGithubDoc = (repo: string, path: string): UseGithubDocResult => {
  const [state, setState] = useState<UseGithubDocResult>(LOADING);

  useEffect(() => {
    const controller = new AbortController();
    // repo/path 가 바뀌면 즉시 로딩 상태로 리셋 (의도된 동기 setState)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(LOADING);

    fetchDoc(repo, path, controller.signal)
      .then((md) => setState({ status: 'success', text: md, error: null }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) {
          return;
        }
        setState({
          status: 'error',
          text: null,
          error: err instanceof Error ? err : new Error(String(err)),
        });
      });

    return () => controller.abort();
  }, [repo, path]);

  return state;
};

export default useGithubDoc;
