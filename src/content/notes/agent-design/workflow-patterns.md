---
title: 워크플로 패턴
summary: augmented LLM을 기본 단위로 한 다섯 가지 workflow 패턴과 agent, 각각 언제 쓰나
group: 핵심 개념
order: 10
updated: 2026-11-12
---

> 모든 패턴의 기본 단위는 retrieval·도구·메모리를 붙인 LLM이다. 그 위에 prompt chaining → routing → parallelization → orchestrator-workers → evaluator-optimizer → agents 순서로 복잡해진다. 앞의 것으로 충분하면 뒤로 가지 않는다.

## 기본 단위: augmented LLM

- LLM에 retrieval, 도구, 메모리를 붙인 것이다. 아래 패턴은 모든 LLM 호출이 이 기능을 쓸 수 있다고 본다.
- 붙이는 방법 중 하나로 Model Context Protocol(MCP)을 든다.

## Workflow 패턴

### Prompt chaining

- **무엇**: 작업을 순서 있는 LLM 호출로 나누고 앞 출력을 다음 입력으로 쓴다. 중간에 코드로 확인하는 관문(gate)을 둘 수 있다.
- **언제**: 고정된 하위 작업으로 깔끔하게 나뉠 때. 지연 시간을 내주고 정확도를 얻는다.
- **예**: 마케팅 문구를 쓰고 번역하기, 개요를 쓰고 기준을 확인한 뒤 본문 쓰기

### Routing

- **무엇**: 입력을 분류해 그 종류에 맞는 후속 처리로 보낸다.
- **언제**: 범주가 뚜렷하고 따로 다루는 편이 낫고, 분류를 정확하게 할 수 있을 때
- **예**: 고객 문의를 환불·기술·일반으로 나누기, 쉬운 질문은 작은 모델로 어려운 질문은 큰 모델로 보내기

### Parallelization

- **무엇**: 여러 LLM 호출을 동시에 돌리고 결과를 코드로 모은다. 서로 다른 하위 작업을 나눠 돌리는 sectioning과, 같은 작업을 여러 번 돌려 비교하는 voting이 있다.
- **언제**: 나눠서 빨라지거나, 여러 관점이 있어야 결과를 믿을 수 있을 때
- **예**: 한 호출은 답하고 다른 호출은 부적절한 요청을 걸러 내는 guardrail(한 호출이 둘 다 하는 것보다 낫다), 코드 취약점 검토를 여러 번 돌리기

### Orchestrator-workers

- **무엇**: 중앙 LLM이 실행 중에 일을 나눠 worker LLM에게 맡기고 결과를 합친다.
- **언제**: 하위 작업을 미리 알 수 없을 때. parallelization과 달리 무엇으로 나눌지를 orchestrator가 정한다.
- **예**: 여러 파일을 고치는 코딩, 여러 출처를 찾아 모으는 검색

### Evaluator-optimizer

- **무엇**: 한 LLM이 만들고 다른 LLM이 평가·피드백하는 것을 반복한다.
- **언제**: 평가 기준이 뚜렷하고, 반복해서 다듬는 것이 측정 가능한 가치를 낼 때
- **예**: 문학 번역 다듬기, 더 찾아볼지를 평가자가 정하는 여러 단계 검색

## Agents

- LLM이 도구 결과 같은 환경 피드백을 보며 루프를 돌고, 다음 행동을 스스로 정한다.
- **언제**: 필요한 단계 수를 예측하기 어렵고 경로를 정해 둘 수 없는 열린 문제. 믿을 수 있는 환경에서 일을 크게 맡길 때
- **주의**: 비용이 높고 오류가 쌓일 수 있다. 샌드박스에서 충분히 테스트하고 guardrail을 둔다. 최대 반복 횟수 같은 멈춤 조건을 넣는 경우가 많다.
- **도구가 중요하다**: 도구 집합과 설명을 분명하게 설계한다. 모델 입장에서 읽어 보고, 모델이 도구를 어떻게 쓰는지 테스트하고, 실수하기 어렵게 만든다(예: 상대 경로 대신 절대 경로만 받기).
- **예**: SWE-bench 과제를 푸는 코딩 에이전트, computer use

## 흔한 실수

- **단순한 일에 orchestrator**: 프롬프트 하나로 답이 나오는 일에 orchestrator와 worker를 붙이면 지연과 비용만 늘고 품질은 그대로일 수 있다. orchestration을 빼고 다듬은 호출 한 번으로 다시 측정하고, 그것이 실제로 부족할 때만 단계를 더한다.
- **복잡도로 해결하기**: 품질이 안 나올 때 평가 루프나 agent를 먼저 더하지 않는다. 더 단순한 방법으로 측정한 결과가 근거여야 한다.

## 공식 문서

- [Building effective agents](https://www.anthropic.com/research/building-effective-agents) — 패턴별 그림과 예, 부록 "Agents in practice", "Prompt engineering your tools"
