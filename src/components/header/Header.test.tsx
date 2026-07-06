import { describe, it, expect } from 'vitest';
import { renderWithTheme, screen } from '@/test/renderWithTheme';
import { navItems } from '@/content/profile';
import Header from './Header';

describe('Header', () => {
  describe('rendering', () => {
    it('renders the header banner landmark', () => {
      renderWithTheme(<Header />);
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('renders the navigation landmark', () => {
      renderWithTheme(<Header />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('renders the logo text "박기웅."', () => {
      renderWithTheme(<Header />);
      const logo = screen.getByRole('link', { name: /박기웅/ });
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveTextContent('박기웅.');
    });

    it('renders the logo anchor with href "#top"', () => {
      renderWithTheme(<Header />);
      const logo = screen.getByRole('link', { name: /박기웅/ });
      expect(logo).toHaveAttribute('href', '#top');
    });
  });

  describe('navigation links', () => {
    it('renders exactly five navigation links', () => {
      renderWithTheme(<Header />);
      const nav = screen.getByRole('navigation');
      const links = nav.querySelectorAll('a');
      expect(links).toHaveLength(navItems.length);
      expect(links).toHaveLength(5);
    });

    navItems.forEach(({ label, href }) => {
      it(`renders the "${label}" link with href "${href}"`, () => {
        renderWithTheme(<Header />);
        const link = screen.getByRole('link', { name: label });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', href);
      });
    });
  });

  describe('displayName', () => {
    it('has displayName set to Header', () => {
      expect(Header.displayName).toBe('Header');
    });
  });
});
