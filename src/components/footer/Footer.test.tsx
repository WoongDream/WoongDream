import { describe, it, expect } from 'vitest';
import { renderWithTheme, screen } from '@/test/renderWithTheme';
import Footer from './Footer';

describe('Footer', () => {
  describe('rendering', () => {
    it('renders the footer contentinfo landmark', () => {
      renderWithTheme(<Footer />);
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('renders copyright text containing "WoongDream"', () => {
      renderWithTheme(<Footer />);
      expect(screen.getByText(/WoongDream/)).toBeInTheDocument();
    });

    it('renders copyright text containing the current year', () => {
      renderWithTheme(<Footer />);
      const year = new Date().getFullYear();
      expect(screen.getByText(new RegExp(String(year)))).toBeInTheDocument();
    });

    it('renders copyright text with both the current year and "WoongDream"', () => {
      renderWithTheme(<Footer />);
      const year = new Date().getFullYear();
      const contentinfo = screen.getByRole('contentinfo');
      expect(contentinfo).toHaveTextContent(String(year));
      expect(contentinfo).toHaveTextContent('WoongDream');
    });
  });

  describe('displayName', () => {
    it('has displayName set to Footer', () => {
      expect(Footer.displayName).toBe('Footer');
    });
  });
});
