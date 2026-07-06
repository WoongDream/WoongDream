import { create } from 'zustand';

export type ColorMode = 'light' | 'dark';

type ThemeState = {
  mode: ColorMode;
  toggleMode: () => void;
  setMode: (mode: ColorMode) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'light',
  toggleMode: () => set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
  setMode: (mode) => set({ mode }),
}));
