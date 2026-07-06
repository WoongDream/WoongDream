// Mobile-first 미디어 쿼리 헬퍼.
// base 스타일 = 모바일(iPhone 14, ~390px). 아래 쿼리로 위로 확장한다.
// 디자인 기준: ≤640 모바일 / 641–1024 태블릿 / >1024 데스크톱
export const media = {
  tabletUp: '@media (min-width: 641px)',
  desktopUp: '@media (min-width: 1025px)',
  // 문서 사이트 사이드바 → 드로어 전환 기준
  drawerUp: '@media (min-width: 701px)',
} as const;
