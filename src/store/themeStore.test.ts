import { describe, it, expect, beforeEach } from 'vitest';
import { useThemeStore } from './themeStore';

describe('themeStore', () => {
  beforeEach(() => {
    useThemeStore.setState({ mode: 'light' });
  });

  describe('initial state', () => {
    it('defaults mode to "light"', () => {
      expect(useThemeStore.getState().mode).toBe('light');
    });
  });

  describe('toggleMode', () => {
    it('flips mode from light to dark', () => {
      useThemeStore.getState().toggleMode();
      expect(useThemeStore.getState().mode).toBe('dark');
    });

    it('flips mode from dark to light', () => {
      useThemeStore.setState({ mode: 'dark' });
      useThemeStore.getState().toggleMode();
      expect(useThemeStore.getState().mode).toBe('light');
    });

    it('toggles back to the original value after two calls', () => {
      useThemeStore.getState().toggleMode();
      useThemeStore.getState().toggleMode();
      expect(useThemeStore.getState().mode).toBe('light');
    });
  });

  describe('setMode', () => {
    it('sets mode to "dark"', () => {
      useThemeStore.getState().setMode('dark');
      expect(useThemeStore.getState().mode).toBe('dark');
    });

    it('sets mode to "light"', () => {
      useThemeStore.setState({ mode: 'dark' });
      useThemeStore.getState().setMode('light');
      expect(useThemeStore.getState().mode).toBe('light');
    });

    it('is idempotent when setting the same mode', () => {
      useThemeStore.getState().setMode('dark');
      useThemeStore.getState().setMode('dark');
      expect(useThemeStore.getState().mode).toBe('dark');
    });
  });
});
