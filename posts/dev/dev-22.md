---
title: Event Propagation
date: 2025-04-29
tags: Web
---

## 정의
- 사용자가 DOM 요소에서 특정 이벤트 트리거시, 해당 이벤트가의 DOM 트리 내 이동 방식

## 이벤트 전파 단계

단계|설명|
--|--|
캡처링(Capturing) 단계|이벤트가 최상위 요소(document.window)에서 시작해 목표 요소(target element)로 내려오는 단계|
타겟(Target) 단계|이벤트가 실제로 발생한 요소(클릭된 버튼 등)에서 처리되는 단계
버블링(Bubbling) 단계|이벤트가 목표 요소에서 시작해 상위 요소(부모, 조상)로 올라가는 단계

## 캡처링(Capturing)
- 이벤트가 최상위 요소에서 시작하여 목표 요소로 내려오는 과정
- 이벤트가 DOM 트리의 루트로부터 타겟 요소까지 순차적으로 전달
- 캡처링은 주로 이벤트가 발생하기 전에 상위 요소에서 이벤트를 잡아내고 싶을 때 사용

## 타겟(Target) 단계
- 이벤트가 실제로 발생한 DOM 요소에서 처리되는 단계
- 이벤트 리스너가 직접적으로 호출
- 사용자가 클릭한 버튼이나 마우스를 올린 요소가 이벤트 핸들링을 수행

## 버블링(Bubbling)
- 이벤트가 타겟 요소에서 시작하여 상위 요소로 올라가는 과정
- 가장 많이 사용되는 이벤트 전파 방식으로, 상위 요소에서, 하위 요소의 이벤트를 모니터링하거나 처리할 때 유용

## 예시
```html
<div id='grandparent'>
	<div id='parent'>
		<button id='child'>Click Me</button>
	</div>
</div>

<script>
	document.getElementById('child').addEventListener('click', (e) => {
		console.log('child clicked');
	}, true) 
	// true: 캡처링, false or 생략: 버블링
</script>
```
- 버튼 클릭시,
  - 캡처링이라면, grandparent > parent > child ID의 Top Down으로 이벤트 전파
  - 버블링이라면, child > parent > grandparent ID의 Bottom Up으로 이벤트 전파  

## 이벤트 전파 중단
- **event.stopPropagation()**: 이벤트 버블링/캡처링 중단되어 이벤트가 상하위 요소로 전파되지 않음
- **event.stopImmediatePropagation()**: 동일한 요소에 바인딩된 다른 이벤트 리스너도 실행 안됨

## 주의점
항목|설명
--|--
충돌 가능성|여러 요소에 이벤트 리스너가 겹치면, 예상치 못한 동작이 발생할 수 있으므로 **stopPropagation**을 적절히 사용해야 함
성능 문제|너무 많은 이벤트 처리시 성능이 저하될 수 있으므로 필요할 때만 사용
캡처링/버블링 혼동|캡처링과 버블링 차이를 명확히 이해 못하면 디버깅이 어려울 수 있음
