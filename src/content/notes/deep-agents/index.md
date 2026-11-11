---
title: Deep Agents
summary: 계획·파일시스템·서브에이전트·장기 메모리를 미리 갖춘 LangChain의 에이전트 하네스
order: 10
updated: 2026-11-11
---

> 오래 걸리고 여러 단계로 나뉘는 일을 맡길 에이전트를 빠르게 만드는 **하네스**(harness)다. LangChain의 에이전트 구성 요소 위에 파일시스템, 서브에이전트, 컨텍스트 관리, 메모리를 얹었고, 실행은 LangGraph 런타임이 맡는다.

## 핵심 정리

- **하네스**: LangChain은 프레임워크, LangGraph는 런타임, Deep Agents는 필요한 기능을 미리 넣어 둔 하네스로 나눈다 ([Frameworks, runtimes, and harnesses](https://docs.langchain.com/oss/python/concepts/products))
- **진입점**: `create_deep_agent(model=..., tools=..., system_prompt=...)` 하나로 만든다. JS는 `createDeepAgent`다 ([Customization](https://docs.langchain.com/oss/python/deepagents/customization))
- **가상 파일시스템**: `ls`·`read_file`·`write_file`·`edit_file`·`glob`·`grep` 도구가 기본으로 붙는다. 저장 위치는 백엔드로 고른다: 스레드 상태(기본), Store, 로컬 디스크, 샌드박스 ([Backends](https://docs.langchain.com/oss/python/deepagents/backends))
- **서브에이전트**: `task` 도구로 일을 나눠 맡기고 메인 컨텍스트를 깨끗하게 유지한다 ([서브에이전트](/notes/deep-agents/subagents))
- **컨텍스트 관리**: 입력 한도의 85%에 이르면 대화를 자동 요약하고, 20,000토큰이 넘는 도구 결과는 파일로 빼 둔다 ([Context engineering](https://docs.langchain.com/oss/python/deepagents/context-engineering))
- **메모리·스킬**: `AGENTS.md` 메모리를 시작할 때 읽고, `SKILL.md` 스킬은 필요할 때 단계적으로 읽는다 ([Memory](https://docs.langchain.com/oss/python/deepagents/memory), [Skills](https://docs.langchain.com/oss/python/deepagents/skills))
- **사람 승인**: `interrupt_on`으로 도구 실행 전에 승인·수정·거절을 받는다. 체크포인터가 있어야 한다 ([Human-in-the-loop](https://docs.langchain.com/oss/python/deepagents/human-in-the-loop))
- **계획(todo)**: 0.7.0부터 기본에서 빠졌다. `write_todos`를 쓰려면 `TodoListMiddleware`를 직접 넣는다 (2026-11 기준, [Changelog](https://docs.langchain.com/oss/python/releases/changelog))

## 언제 쓰나

| 상황 | 고를 것 | 이유 |
|------|---------|------|
| 오래 걸리고 단계가 많은 일 (조사, 코딩, 문서 작업) | Deep Agents | 파일시스템·서브에이전트·요약이 이미 들어 있다 |
| 기본 구성 요소로 나만의 하네스를 조립 | LangChain `create_agent` | 필요한 미들웨어만 골라 붙인다 |
| 표준 에이전트 루프에 맞지 않는 흐름 | LangGraph | 노드와 분기를 직접 설계한다 |

LangChain은 고민될 때 "Start with Deep Agents"를 권한다 ([Deep Agents vs LangChain vs LangGraph](https://www.langchain.com/blog/deep-agents-vs-langchain-vs-langgraph)).

## 공식 문서

- [Overview](https://docs.langchain.com/oss/python/deepagents/overview) — 정의, 구성 요소, 짧은 예제
- [Quickstart](https://docs.langchain.com/oss/python/deepagents/quickstart) — 설치부터 첫 실행까지
- [Customization](https://docs.langchain.com/oss/python/deepagents/customization) — `create_deep_agent` 인자와 미들웨어
- [Backends](https://docs.langchain.com/oss/python/deepagents/backends) — 파일을 어디에 둘지 (상태, Store, 디스크, 샌드박스)
- [Subagents](https://docs.langchain.com/oss/python/deepagents/subagents) — `task` 도구와 서브에이전트 정의
- [Context engineering](https://docs.langchain.com/oss/python/deepagents/context-engineering) — 요약과 도구 결과 오프로딩
- [Memory](https://docs.langchain.com/oss/python/deepagents/memory) — 스레드를 넘는 장기 메모리
- [Deep Agents (JavaScript)](https://docs.langchain.com/oss/javascript/deepagents/overview) — JS/TS 문서
- [langchain-ai/deepagents](https://github.com/langchain-ai/deepagents) — 소스 코드 (MIT)
- [deepagents on PyPI](https://pypi.org/project/deepagents/) — 버전과 릴리스 이력

## 관련 제품

- **Deep Agents Code (`dcode`)**: 어떤 모델이든 쓰는 터미널 코딩 에이전트. 예전 CLI 문서 주소가 이리로 옮겨졌다 ([Deep Agents Code](https://docs.langchain.com/oss/deepagents/code/overview))
- **Managed Deep Agents**: 에이전트를 파일 폴더로 정의하면 LangSmith가 하네스와 런타임을 돌린다. 공개 베타이고 `mda` CLI를 쓴다 ([Managed Deep Agents](https://docs.langchain.com/langsmith/python/managed-deep-agents-overview))

## 최근 변경

- 2026-11-09 · v0.7.35 · Python 최신 릴리스 ([PyPI](https://pypi.org/project/deepagents/))
- 2026-10-29 · Managed Deep Agents v0.10 · browser use, 비동기 서브에이전트 ([블로그](https://www.langchain.com/blog/managed-deep-agents-browser-use-and-asynchronous-subagents))
- 2026-07-24 · v0.7.0 · 기본 입력 토큰 약 65% 감소, todo 미들웨어는 직접 넣는 방식으로 변경 ([Changelog](https://docs.langchain.com/oss/python/releases/changelog))
- 2026-05-12 · v0.6.0 · 코드 실행(실험), harness profiles ([Changelog](https://docs.langchain.com/oss/python/releases/changelog))
- 2026-04-07 · v0.5.0 · 비동기 서브에이전트, `read_file`이 PDF·오디오·비디오를 읽음 ([Changelog](https://docs.langchain.com/oss/python/releases/changelog))
