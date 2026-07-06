import { describe, it, expect } from 'vitest';
import { renderWithTheme, screen } from '@/test/renderWithTheme';
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

    it('renders the logo text "WoongDream"', () => {
      renderWithTheme(<Header />);
      expect(screen.getByText('WoongDream')).toBeInTheDocument();
    });

    it('renders the logo anchor with href "#top"', () => {
      renderWithTheme(<Header />);
      const logo = screen.getByRole('link', { name: 'WoongDream' });
      expect(logo).toHaveAttribute('href', '#top');
    });
  });

  describe('navigation links', () => {
    const navItems = [
      { label: 'About', href: '#about' },
      { label: 'Projects', href: '#projects' },
      { label: 'Contact', href: '#contact' },
    ];

    it('renders exactly three navigation links', () => {
      renderWithTheme(<Header />);
      const nav = screen.getByRole('navigation');
      const links = nav.querySelectorAll('a');
      expect(links).toHaveLength(3);
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
