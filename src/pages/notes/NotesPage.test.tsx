import { describe, it, expect, vi, afterEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { renderWithTheme, screen, within, fireEvent } from '@/test/renderWithTheme';
import NotesPage from './NotesPage';

vi.mock('@/features/notes/content', async () => {
  const { buildNotes } = await import('@/features/notes/notes');
  const dir = '/src/content/notes/';
  const files: Record<string, string> = {
    [`${dir}index.md`]: '---\ntitle: 테스트 노트\nsummary: 노트 홈 요약\n---\n홈 본문입니다.',
    [`${dir}alpha/index.md`]:
      '---\ntitle: 알파\nsummary: 알파 요약\norder: 1\nupdated: 2026-01-10\n---\n알파 개요 본문.',
    [`${dir}alpha/intro.md`]:
      '---\ntitle: 소개\nsummary: 소개 요약\ngroup: 기초\norder: 1\nupdated: 2026-03-01\n---\n## 첫째 제목\n\n본문\n\n## 둘째 제목\n\n[베타로](/notes/beta) 와 [밖으로](https://example.com/x)',
    [`${dir}alpha/second.md`]:
      '---\ntitle: 두번째\nsummary: 두번째 요약\ngroup: 기초\norder: 2\nupdated: 2026-02-01\n---\n두번째 본문',
    [`${dir}beta/index.md`]:
      '---\ntitle: 베타\nsummary: 베타 요약\norder: 2\nupdated: 2026-01-20\n---\n베타 본문',
    [`${dir}beta/only.md`]:
      '---\ntitle: 베타페이지\nsummary: 베타페이지 요약\norder: 1\nupdated: 2026-01-25\n---\n베타페이지 본문',
  };
  return { noteFiles: files, notesTree: buildNotes(files) };
});

const renderAt = (path: string) =>
  renderWithTheme(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/notes/:topicSlug?/:pageSlug?" element={<NotesPage />} />
      </Routes>
    </MemoryRouter>,
  );

const sidebar = () => screen.getByRole('navigation', { name: '노트 목차' });

describe('NotesPage', () => {
  afterEach(() => {
    document.title = '';
  });

  describe('/notes (홈)', () => {
    it('홈 제목과 본문을 보여준다', () => {
      renderAt('/notes');
      expect(screen.getByRole('heading', { level: 1, name: '테스트 노트' })).toBeInTheDocument();
      expect(screen.getByText('홈 본문입니다.')).toBeInTheDocument();
    });

    it('주제 카드가 주제 경로로 연결된다', () => {
      renderAt('/notes');
      const main = within(screen.getByRole('main'));
      expect(main.getByRole('link', { name: /^알파\s*알파 요약/ })).toHaveAttribute(
        'href',
        '/notes/alpha',
      );
      expect(main.getByRole('link', { name: /^베타\s*베타 요약/ })).toHaveAttribute(
        'href',
        '/notes/beta',
      );
    });

    it('최근 업데이트를 최신순으로 보여준다', () => {
      renderAt('/notes');
      expect(screen.getByRole('heading', { name: '최근 업데이트' })).toBeInTheDocument();
      const first = screen.getByRole('link', { name: /^2026-03-01/ });
      expect(first).toHaveAttribute('href', '/notes/alpha/intro');
      expect(first).toHaveTextContent('알파 / 소개');
    });

    it('사이드바에서 어떤 주제도 펼쳐지지 않는다', () => {
      renderAt('/notes');
      expect(within(sidebar()).queryByRole('link', { name: '소개' })).not.toBeInTheDocument();
    });
  });

  describe('/notes/:topic (주제 개요)', () => {
    it('주제 제목, 요약, 본문을 보여준다', () => {
      renderAt('/notes/alpha');
      expect(screen.getByRole('heading', { level: 1, name: '알파' })).toBeInTheDocument();
      expect(screen.getByText('알파 요약')).toBeInTheDocument();
      expect(screen.getByText('알파 개요 본문.')).toBeInTheDocument();
    });

    it('자동 목차 카드가 페이지 경로로 연결된다', () => {
      renderAt('/notes/alpha');
      expect(screen.getByRole('heading', { level: 2, name: '목차' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: '기초' })).toBeInTheDocument();
      const main = within(screen.getByRole('main'));
      expect(main.getByRole('link', { name: /^소개\s*소개 요약/ })).toHaveAttribute(
        'href',
        '/notes/alpha/intro',
      );
      expect(main.getByRole('link', { name: /^두번째\s*두번째 요약/ })).toHaveAttribute(
        'href',
        '/notes/alpha/second',
      );
    });

    it('현재 주제만 사이드바에서 펼친다', () => {
      renderAt('/notes/alpha');
      const nav = within(sidebar());
      expect(nav.getByRole('link', { name: '알파' })).toHaveAttribute('aria-current', 'page');
      expect(nav.getByRole('link', { name: '소개' })).toBeInTheDocument();
      expect(nav.queryByRole('link', { name: '베타페이지' })).not.toBeInTheDocument();
    });

    it('주제 개요의 다음 링크는 첫 페이지이고 이전 링크는 없다', () => {
      renderAt('/notes/alpha');
      const pager = within(screen.getByRole('navigation', { name: '이전·다음 노트' }));
      expect(pager.getByRole('link', { name: /다음/ })).toHaveAttribute(
        'href',
        '/notes/alpha/intro',
      );
      expect(pager.queryByRole('link', { name: /이전/ })).not.toBeInTheDocument();
    });
  });

  describe('/notes/:topic/:page (페이지)', () => {
    it('페이지 제목과 요약을 보여준다', () => {
      renderAt('/notes/alpha/intro');
      expect(screen.getByRole('heading', { level: 1, name: '소개' })).toBeInTheDocument();
      expect(screen.getByText('소개 요약')).toBeInTheDocument();
    });

    it('사이드바의 현재 페이지에 aria-current 를 표시한다', () => {
      renderAt('/notes/alpha/intro');
      const nav = within(sidebar());
      expect(nav.getByRole('link', { name: '소개' })).toHaveAttribute('aria-current', 'page');
      expect(nav.getByRole('link', { name: '두번째' })).not.toHaveAttribute('aria-current');
      expect(nav.getByRole('link', { name: '알파' })).not.toHaveAttribute('aria-current');
    });

    it('브레드크럼이 주제로 돌아가는 링크를 가진다', () => {
      renderAt('/notes/alpha/intro');
      const crumb = screen
        .getAllByRole('link', { name: '알파' })
        .find((el) => !sidebar().contains(el));
      expect(crumb).toHaveAttribute('href', '/notes/alpha');
    });

    it('이전·다음 링크를 보여준다', () => {
      renderAt('/notes/alpha/intro');
      const pager = within(screen.getByRole('navigation', { name: '이전·다음 노트' }));
      expect(pager.getByRole('link', { name: /이전.*알파/ })).toHaveAttribute(
        'href',
        '/notes/alpha',
      );
      expect(pager.getByRole('link', { name: /다음.*두번째/ })).toHaveAttribute(
        'href',
        '/notes/alpha/second',
      );
    });

    it('내부 링크는 라우터 링크, 외부 링크는 새 탭으로 연다', () => {
      renderAt('/notes/alpha/intro');
      const internal = screen.getByRole('link', { name: '베타로' });
      expect(internal).toHaveAttribute('href', '/notes/beta');
      expect(internal).not.toHaveAttribute('target');
      const external = screen.getByRole('link', { name: '밖으로' });
      expect(external).toHaveAttribute('href', 'https://example.com/x');
      expect(external).toHaveAttribute('target', '_blank');
    });

    it('h2 제목에 id 가 붙고 "이 페이지" 목차가 생긴다', () => {
      renderAt('/notes/alpha/intro');
      expect(screen.getByRole('heading', { level: 2, name: '첫째 제목' })).toHaveAttribute(
        'id',
        '첫째-제목',
      );
      expect(screen.getByRole('heading', { level: 2, name: '둘째 제목' })).toHaveAttribute(
        'id',
        '둘째-제목',
      );
      const toc = within(screen.getByLabelText('이 페이지 목차'));
      expect(toc.getByRole('link', { name: '둘째 제목', hidden: true })).toHaveAttribute(
        'href',
        '#둘째-제목',
      );
    });
  });

  describe('없는 경로', () => {
    it('없는 주제는 404 페이지를 보여준다', () => {
      renderAt('/notes/nope');
      expect(screen.getByText('페이지를 찾을 수 없습니다.')).toBeInTheDocument();
    });

    it('없는 페이지는 404 페이지를 보여준다', () => {
      renderAt('/notes/alpha/nope');
      expect(screen.getByText('페이지를 찾을 수 없습니다.')).toBeInTheDocument();
    });
  });

  describe('document.title', () => {
    it('경로에 맞는 제목을 설정한다', () => {
      renderAt('/notes/alpha/intro');
      expect(document.title).toBe('소개 · 알파 · Notes · WoongDream');
    });

    it('홈에서는 Notes · WoongDream 이다', () => {
      renderAt('/notes');
      expect(document.title).toBe('Notes · WoongDream');
    });

    it('언마운트하면 이전 제목으로 돌려놓는다', () => {
      document.title = 'before';
      const { unmount } = renderAt('/notes/alpha/intro');
      expect(document.title).not.toBe('before');
      unmount();
      expect(document.title).toBe('before');
    });
  });

  describe('모바일 드로어', () => {
    it('햄버거 버튼을 눌러도 문제 없이 열고 닫힌다', () => {
      renderAt('/notes/alpha');
      const burger = screen.getByLabelText('메뉴 열기');
      fireEvent.click(burger);
      fireEvent.click(burger);
      expect(screen.getByRole('heading', { level: 1, name: '알파' })).toBeInTheDocument();
    });

    it('드로어 안의 링크를 누르면 이동한다', () => {
      renderAt('/notes/alpha');
      fireEvent.click(screen.getByLabelText('메뉴 열기'));
      fireEvent.click(within(sidebar()).getByRole('link', { name: '소개' }));
      expect(screen.getByRole('heading', { level: 1, name: '소개' })).toBeInTheDocument();
    });
  });

  it('displayName 이 NotesPage 이다', () => {
    expect(NotesPage.displayName).toBe('NotesPage');
  });
});
