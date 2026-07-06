export const theme = {
  colors: {
    fg: {
      primary: '#18181b',
      strong: '#27272a',
      body: '#3f3f46',
      subtle: '#52525b',
      secondary: '#71717a',
      tertiary: '#a1a1aa',
      inverse: '#ffffff',
    },
    bg: {
      primary: '#ffffff',
      secondary: '#f7f7f8',
      tertiary: '#f0f0f2',
      code: '#0f172a',
    },
    border: {
      primary: '#e4e4e7',
      secondary: '#f0f0f2',
    },
    accent: {
      primary: '#38bdf8', // Sky cyan — 브랜드 메인
      hover: '#0ea5e9', // 한 단계 진한 sky
      active: '#0284c7', // 클릭/active 상태
      fg: '#ffffff',
      // 보조 톤 — 배경 강조, 배지, 알림 영역 등
      subtle: '#e0f5ff', // 가장 연한 sky tint (info background)
      muted: '#7dd3fc', // 중간 톤 (border, disabled accent)
    },
    // 프로젝트 배지 (FE = sky, BE = lime)
    badge: {
      feFg: '#0369a1',
      feBg: '#e0f5ff',
      beFg: '#3f6212',
      beBg: '#ecfccb',
    },
    status: {
      error: '#ef4444',
      warning: '#f59e0b',
      success: '#22c55e',
      info: '#38bdf8', // accent와 동일하게 통일
    },
    strength: {
      veryWeak: '#ef4444',
      weak: '#f97316',
      fair: '#f59e0b',
      good: '#84cc16',
      strong: '#22c55e',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '4.75rem', // 76px — 섹션 간 간격
    '5xl': '6rem',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem', // 30px
    '4xl': '2.375rem',
    '5xl': '3rem', // 48px — 히어로
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.625rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.25rem',
    full: '9999px',
  },
  breakpoints: {
    mobile: '40rem', // 640px — 이하 모바일
    tablet: '48rem', // 768px
    wide: '64rem', // 1024px — 초과 데스크톱
    desktop: '80rem', // 1280px
  },
} as const;

export type Theme = typeof theme;
