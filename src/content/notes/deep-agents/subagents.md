---
title: 서브에이전트
summary: task 도구로 일을 나눠 맡기고 메인 에이전트의 컨텍스트를 깨끗하게 유지한다
group: 핵심 개념
order: 10
updated: 2026-11-11
---

> 메인 에이전트가 `task` 도구로 서브에이전트를 불러 일을 맡긴다. 서브에이전트는 자기 컨텍스트에서 일하고 결과만 돌려주므로, 긴 조사나 많은 도구 호출이 메인 대화를 채우지 않는다.

## 무엇인가

- 따로 정의하지 않아도 동기 `general-purpose` 서브에이전트가 자동으로 붙는다. 같은 이름으로 직접 정의하면 그것으로 바뀐다.
- 직접 정의할 때 `name`, `description`은 필수이고, 기본 모드(`isolated`)에서는 `system_prompt`도 필수다. `tools`, `model`, `skills`, `permissions` 등은 선택이다.
- `tools`를 주지 않으면 메인 에이전트의 도구를 물려받는다. 주면 물려받은 도구를 통째로 대신한다. `skills`는 물려받지 않는다.
- 이미 만든 LangGraph 그래프는 `CompiledSubAgent`(`name`, `description`, `runnable`)로 감싸 서브에이전트로 쓴다. 그래프에 `messages` 상태 키가 있어야 한다.

## 어떻게 쓰나

`create_deep_agent`의 `subagents`에 정의 목록을 넘긴다. [Subagents 문서](https://docs.langchain.com/oss/python/deepagents/subagents)의 예제를 줄였다.

```python
from deepagents import create_deep_agent

agent = create_deep_agent(
    model="anthropic:claude-sonnet-5",
    subagents=[{
        "name": "reviewer",
        "description": "Reviews code for security issues, citing lines and severity",
        "system_prompt": "You are a security-focused code reviewer. Report issues with line numbers and severity.",
    }],
)
```

## 비동기 서브에이전트

- `AsyncSubAgent`(`name`, `description`, `graph_id`)를 `subagents`에 넣으면 백그라운드에서 돌고 바로 돌아온다. 메인 에이전트는 `start_async_task`, `check_async_task`, `cancel_async_task` 같은 도구로 상태를 보고 후속 지시를 보낸다.
- Agent Protocol 서버에서 돈다. Agent Server에서는 끝나거나 입력이 필요할 때 메인 에이전트를 깨운다(`notify_parent`, 기본값 켜짐).
- 부모 대화의 스냅숏을 넘기는 `mode="fork"`(실험 기능)와, 끝날 때 호출할 `webhook`(0.7.30부터)도 있다 (2026-11 기준, [Async subagents](https://docs.langchain.com/oss/python/deepagents/async-subagents)).

## 잘 쓰는 법

공식 문서의 Best practices를 요약했다.

- **설명을 구체적으로**: 메인 에이전트는 `description`을 보고 누구에게 맡길지 고른다. "Does finance stuff"보다 무엇을 받아 무엇을 내는지 쓴다.
- **도구는 필요한 것만**: 집중도와 보안이 좋아진다.
- **결과는 요약으로**: 원본 데이터 대신 요약을 돌려주라고 시스템 프롬프트에 적는다. 큰 데이터는 파일에 저장하게 한다.
- **호출이 안 되면**: 메인 에이전트 시스템 프롬프트에 복잡한 일은 `task()`로 맡기라고 적는다.

## 공식 문서

- [Subagents](https://docs.langchain.com/oss/python/deepagents/subagents) — 필드, `general-purpose`, `CompiledSubAgent`, Best practices
- [Async subagents](https://docs.langchain.com/oss/python/deepagents/async-subagents) — 백그라운드 실행, fork 모드, 알림
