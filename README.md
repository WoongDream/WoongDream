# WoongDream

개인 자기소개 / 포트폴리오 정적 사이트. 백엔드 없이 프론트엔드만으로 구성한다.

## 스택

- React 19 + TypeScript + Vite
- Emotion (`css` prop 전용 — `styled` 금지)
- React Router 7 (SPA)
- Zustand (전역 상태)
- react-markdown + remark-gfm (콘텐츠 렌더)
- Vitest + Testing Library (테스트)
- ESLint + Prettier

## 개발

```bash
nvm use          # Node 22.12+ (.nvmrc)
npm install
npm run dev       # 개발 서버
npm run build     # 타입체크 + 프로덕션 빌드
npm run lint:fix  # 린트 자동 수정
npm run test      # 유닛 테스트
```

## 구조

```
src/
├── components/   # 공용 UI (button, header, footer)
├── features/     # 페이지 섹션 (hero, about, projects, contact)
├── pages/        # 라우트 (home, not-found)
├── content/      # 정적 콘텐츠
├── store/        # Zustand
├── styles/       # theme · layout · text 헬퍼
├── hooks/ lib/ types/
└── App.tsx · main.tsx
```

자세한 내용: [`docs/architecture.md`](docs/architecture.md) · [`docs/conventions.md`](docs/conventions.md) · [`docs/deployment.md`](docs/deployment.md)

## 작업 흐름

로컬 `TODO.md`(git 미추적) 로 할 일을 관리한다. `/todo` → `/do` → `/commit` → `/pr`.
