---
title: 에이전트 설계
summary: workflow와 agent를 구분하고, 가장 단순한 해법부터 시작해 필요할 때만 복잡도를 늘리는 Anthropic의 에이전트 설계 원칙
order: 20
updated: 2026-11-12
---

> LLM 애플리케이션을 만들 때 **workflow**(코드가 정한 경로)로 할지 **agent**(LLM이 스스로 정하는 경로)로 할지, 아니면 둘 다 필요 없는지부터 정한다. 기준은 Anthropic의 [Building effective agents](https://www.anthropic.com/research/building-effective-agents)(2024-12)다.

## 핵심 정리

- **workflow**: 미리 정한 코드 경로대로 LLM과 도구를 엮는다. 잘 정의된 작업에서 예측 가능하고 일관된다.
- **agent**: LLM이 자기 진행 과정과 도구 사용을 스스로 정한다. 유연하지만 비용이 높고 오류가 쌓일 수 있다.
- **agentic system**: Anthropic은 workflow와 agent를 묶어 이렇게 부른다.
- **단순한 해법부터**: 복잡도는 필요할 때만 늘린다. agentic system은 흔히 지연 시간(latency)과 비용을 내주고 성능을 얻으므로, 성능이 오르지 않으면 손해만 본다. agentic system을 아예 만들지 않는 것도 답이다.
- **호출 한 번으로 충분한 경우가 많다**: retrieval과 in-context 예시로 다듬은 LLM 호출 하나면 되는 일이 많다.
- **세 원칙**: 설계는 단순하게(simplicity), 계획 단계를 드러내 투명하게(transparency), 도구 인터페이스(ACI)는 문서와 테스트로 다듬는다.
- **프레임워크는 나중에**: LLM API를 직접 쓰는 것부터 시작한다. 프레임워크를 쓰면 그 아래 코드를 이해하고 쓴다. 추상화가 실제 프롬프트와 응답을 가려 디버깅이 어려워질 수 있다.
- **패턴**: prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer, agents ([워크플로 패턴](/notes/agent-design/workflow-patterns))

## 언제 쓰나

| 상황 | 고를 것 | 이유 |
|------|---------|------|
| 프롬프트 하나로 답이 나오는 일 | 다듬은 LLM 호출 한 번 | 가장 빠르고 싸다. 먼저 이것으로 측정한다 |
| 고정된 단계로 나눌 수 있는 잘 정의된 일 | workflow | 예측 가능하고 일관된다 |
| 단계 수를 미리 알 수 없고 경로를 정해 둘 수 없는 열린 문제 | agent | 모델의 판단으로 유연하게 푼다. 샌드박스 테스트와 guardrail이 필요하다 |

agent를 빠르게 만들 하네스가 필요하면 [Deep Agents](/notes/deep-agents)를 본다.

## 공식 문서

- [Building effective agents](https://www.anthropic.com/research/building-effective-agents) — 정의, 패턴, 언제 쓰나, 프레임워크, 도구 설계(부록). 2024-12-19 게시. 글 맨 위에 그 뒤로 도구 환경이 많이 바뀌었다며 아래 두 문서를 가리키는 안내가 있다
- [Scaling Managed Agents: Decoupling the brain from the hands](https://www.anthropic.com/research/managed-agents) — Claude Managed Agents를 하네스와 샌드박스로 나눠 설계한 이야기 (2026-04)
- [Claude Managed Agents overview](https://platform.claude.com/docs/en/managed-agents/overview) — 관리형 인프라에서 도는 에이전트 하네스. 오래 걸리는 비동기 작업용 (2026-11 기준 베타)
