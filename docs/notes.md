# Notes 콘텐츠 규칙

`/notes` 는 공부한 내용을 짧게 정리하고 공식 문서 링크를 모으는 곳이다. 고객 미팅에서 개념을 소개할 때 링크 목차로도 쓴다.
페이지는 `src/content/notes/` 의 마크다운으로만 만든다. 코드를 고치지 않고 파일을 더하거나 고치면 사이드바·목차·최근 업데이트가 따라 바뀐다.

## 폴더 구조

```
src/content/notes/
├── index.md                  # /notes 첫 화면 소개 (title, summary + 짧은 본문)
└── <주제>/                   # 주제 하나 = 폴더 하나
    ├── index.md              # /notes/<주제>  주제 개요. 아래에 페이지 목차가 자동으로 붙는다
    └── <페이지>.md           # /notes/<주제>/<페이지>
```

- 폴더·파일 이름이 URL 이 된다. 소문자·숫자·하이픈만 쓴다 (`deep-agents/subagents.md`).
- 깊이는 주제 → 페이지 두 단계뿐이다. 페이지를 묶어 보이려면 머리말 `group` 을 쓴다.
- 이름을 바꾸면 URL 이 바뀐다. 이미 공유한 링크가 깨지므로 이름은 되도록 바꾸지 않는다.

## 머리말

```md
---
title: 서브에이전트
summary: 큰 일을 나눠 맡기고 컨텍스트를 깨끗하게 유지하는 방법
group: 핵심 개념
order: 20
updated: 2026-11-11
---
```

| 키 | 어디에 | 필수 | 설명 |
|----|--------|------|------|
| `title` | 전부 | O | 페이지 제목. 본문에 `# 제목`(H1)을 따로 쓰지 않는다 |
| `summary` | 주제·페이지 | O | 한 문장 요약. 제목 아래와 목차 카드에 보인다 |
| `updated` | 주제·페이지 | O | 내용과 링크를 마지막으로 확인한 날 (`YYYY-MM-DD`). 최근 업데이트 순서에 쓰인다 |
| `order` | 주제·페이지 | | 정수. 작을수록 위. 없으면 맨 뒤(제목순). 10, 20, 30 처럼 띄워 두면 사이에 넣기 쉽다 |
| `group` | 페이지 | | 사이드바·목차에서 묶을 이름. 처음 나온 그룹부터 차례로 보인다 |

위 키 말고는 쓰지 않는다. 값은 한 줄로 쓰고, `:` 가 들어가면 따옴표로 감싼다.

## 본문

- `##` 가 페이지 안 목차(넓은 화면 오른쪽 "이 페이지")가 된다. `###` 까지 앵커가 붙는다.
- 표·체크박스·취소선 등 GFM 문법을 쓸 수 있다. 인용(`>`)은 하늘색 강조 상자로 보인다.
- 굵게(`**`)를 괄호·따옴표 바로 뒤에서 닫고 한글을 붙이면 굵게가 풀린다: `**하네스(harness)**다` ✗ → `**하네스**(harness)다` ✓
- 다른 노트로 가는 링크는 사이트 경로로 쓴다: `[서브에이전트](/notes/deep-agents/subagents)`. 없는 노트를 가리키면 테스트가 실패한다.
- 외부 링크는 새 탭으로 열린다. 공식 문서를 우선으로 단다.
- 이미지는 `public/notes-assets/<주제>/` 에 두고 `/notes-assets/<주제>/그림.png` 로 건다.
- 공개 사이트다. 고객사 이름, 사내 정보, 내부 주소, 비밀 값은 쓰지 않는다.

## 점검

```bash
npm run test    # src/features/notes/content.test.ts 가 위 규칙을 실제 콘텐츠에 대해 검사한다
npm run build
```

`main` 에 push 하면 배포된다 ([deployment.md](deployment.md)). 배포 워크플로도 테스트를 먼저 돌리므로 규칙을 어긴 콘텐츠는 배포되지 않는다.

## 화면 구성 (코드)

| 파일 | 역할 |
|------|------|
| `src/features/notes/notes.ts` | 머리말 파싱, 주제·페이지 트리, 규칙 검사 (`validateNotes`) |
| `src/features/notes/content.ts` | `import.meta.glob` 으로 마크다운을 빌드에 포함 |
| `src/features/notes/NotesLayout.tsx` | 사이드바(현재 주제만 펼침) + 상단 경로 |
| `src/features/notes/NoteArticle.tsx` | 주제 개요·페이지 본문, 목차 카드, 이전/다음, "이 페이지" 목차 |
| `src/features/notes/NotesHome.tsx` | `/notes` 첫 화면: 주제 카드 + 최근 업데이트 |
| `src/pages/notes/NotesPage.tsx` | 라우트 (`/notes/:topicSlug?/:pageSlug?`, lazy 로딩) |
