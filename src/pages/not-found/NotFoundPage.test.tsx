import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { renderWithTheme, screen } from '@/test/renderWithTheme';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  const renderPage = () =>
    renderWithTheme(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

  it('renders the 404 code', () => {
    renderPage();
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders the not-found message', () => {
    renderPage();
    expect(screen.getByText('페이지를 찾을 수 없습니다.')).toBeInTheDocument();
  });

  it('renders a home link pointing to "/"', () => {
    renderPage();
    const link = screen.getByRole('link', { name: '홈으로 돌아가기' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('has displayName set to NotFoundPage', () => {
    expect(NotFoundPage.displayName).toBe('NotFoundPage');
  });
});
