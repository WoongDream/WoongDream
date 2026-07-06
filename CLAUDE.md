## Absolute Rules

- Wrap every component with `React.memo` (+ `displayName`)
- Emotion `css` prop only — no `styled` components (style files export `(theme) => css\`...\`` functions; JSX uses semantic tags with `css={fooStyle}`)
- 상대경로 대신 `@/` alias 사용 (컴포넌트 폴더 내부 파일끼리는 상대경로)

## Commands

`npm run dev` · `build` · `lint:fix` · `test`

> Node 22.12+ 필요 (`.nvmrc` → `nvm use`)

## Domain

개인 자기소개 / 포트폴리오 정적 사이트 (백엔드 없음, SPA)

## Agents

- Test writing → **항상** `unit-test-generator` 서브에이전트로 위임 (직접 `*.test.ts(x)` 작성 금지)
- 새 테스트가 여러 파일에 걸치면 **한 메시지에서 다중 Agent 호출로 병렬화** (한 agent 가 보통 1~2개 파일 담당)
- agent 호출 시 prompt 에 다음을 항상 포함:
  - 대상 소스 파일 절대 경로
  - 인접한 참조 테스트 1~2개 절대 경로 (예: `src/components/button/Button.test.tsx`)
  - 프로젝트 컨벤션 핵심 — `renderWithTheme` 사용 (`src/test/renderWithTheme.tsx`) / 컴포넌트는 `memo` + `displayName` / 한국어 `describe`·`it` 허용
  - 기대 커버리지 — happy path / 빈 상태 / 에러 / 분기

## Git Workflow

- Commit → always use `/commit` skill
- PR → always use `/pr` skill
- TODO 정리 → `/todo` skill (구현 금지, TODO.md 갱신 전용) · 작업 시작 → `/do` skill

## References

Architecture: `docs/architecture.md`
Conventions: `docs/conventions.md`
Deployment: `docs/deployment.md` (추후 구성)
