---
title: Tailwind CSS 정리
date: 2025-05-08
tags: TailwindCSS
---

# 1. Tailwind CSS란?
- 유틸리티 기반 CSS 프레임워크로, 미리 정의된 클래스들을 조합하여 스타일을 빠르게 적용 가능

# 2. 장단점

물론입니다. Tailwind CSS의 **장점**과 **단점**을 핵심 위주로 요약해드리겠습니다:

---

## 2.1. 장점

| 항목                       | 설명                                                   |
| ------------------------ | ---------------------------------------------------- |
| **빠른 개발 속도**             | HTML에서 바로 스타일 적용 → 빠른 프로토타이핑 가능                      |
| **디자인 일관성 유지**           | 유틸리티 클래스 기반 + 설정 파일(tailwind.config.js)로 디자인 규칙 관리 |
| **반응형 쉽게 구현**            | sm, md, lg 등 브레이크포인트 기반 클래스 제공                 |
| **높은 커스터마이징 가능**         | 테마, 색상, 간격 등 자유롭게 설정 가능                              |
| **퍼포먼스 최적화 가능**          | 사용하지 않는 CSS 제거(Purge 기능)로 파일 크기 감소                   |
| **컴포넌트 기반 프레임워크와 궁합 좋음** | React, Vue 등과 함께 사용할 때 재사용성이 뛰어남                     |

## 2.2. 단점

| 항목               | 설명                         |
| ---------------- | -------------------------- |
| **HTML 코드 비대해짐** | 클래스가 많아 가독성이 떨어질 수 있음      |
| **스타일 재사용 어려움**  | 동일한 스타일 반복 → 유지보수 어려움      |
| **초기 학습 곡선 존재**  | 기존 CSS 방식과 달라 처음엔 낯설 수 있음  |
| **직관성 낮음**       | 클래스명만 보고 스타일을 파악하기 어려움     |
| **설정 및 최적화 필요**  | 테마 변경, Purge 설정 등 추가 작업 필요 |

- **Purge**: HTML/JS/TS 파일 등을 분석하여 실제 사용된 클래스만 CSS에 포함하고, 나머지는 제거함. 아래는 설정 방법 예시
```js
module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.ts',
    './src/**/*.tsx'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 2.3. Tailwind CSS가 컴포넌트 기반 프레임워크와 궁합 좋은 이유
- Tailwind는 **스타일을 유틸리티 클래스 형태로 직접 HTML에 작성**하므로, 컴포넌트 코드 내부에 **JSX/HTML + 스타일이 함께** 존재함
	```jsx
	// React 예시
	function Button() {
		return (
			<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
				Click me
			</button>
		);
	}
	```
  - **CSS 파일을 따로 만들 필요 없이**, 컴포넌트 내부에서 완결된 형태로 유지할 수 있어 **관리가 간결**해짐

- **재사용성과 유지보수에 유리**
  - 컴포넌트는 원래 **재사용을 위한 단위**이고, Tailwind는 클래스만으로 스타일을 제어할 수 있어 컴포넌트를 재사용할 때에도 별도 스타일 시트를 신경 쓸 필요가 없음  
  - 컴포넌트를 복사하거나 props만 바꿔도 다른 스타일 적용 가능
  - CSS 클래스 충돌 걱정 없이 독립적인 컴포넌트 유지 가능

- **스타일 범위 지정이 자연스러움**
  - 기존 CSS에서는 BEM이나 CSS Module, SCSS 등으로 **스타일의 범위(scope)** 를 조절해야 했으나, Tailwind는 클래스를 직접 요소에 지정하므로 **스타일이 자동으로 컴포넌트 범위 내에만 적용**됨

- **상태 기반 클래스 적용이 쉬움**
  - 컴포넌트는 상태(state)를 많이 사용하는데, Tailwind는 상태별 유틸리티 클래스(예: hover:, focus:, disabled: 등)를 쉽게 적용할 수 있어 **동적인 UI 구성에 매우 편리**함

```html
<button class="bg-gray-500 hover:bg-gray-700 disabled:opacity-50" disabled>
	Submit
</button>
```

- **빠른 UI 개발 → 생산성 향상**
  - 컴포넌트 단위로 빠르게 UI를 조립할 수 있어, 특히 디자인 시스템이 정해져 있는 경우에 **빠른 개발과 일관된 스타일 유지가 동시에 가능**함


# 3. 문법
- Tailwind CSS는 **유틸리티 클래스**를 사용하여 스타일을 적용합니다. 
- 각 유틸리티 클래스는 특정 속성(예: padding, margin, color, font-size)을 지정

예시:

```html
<!-- 텍스트 색상 적용 -->
<p class="text-blue-500">Hello, Tailwind!</p>

<!-- 배경 색상 적용 -->
<div class="bg-gray-200">Content</div>

<!-- 여백(margin) 적용 -->
<div class="m-4">Content</div>

<!-- 패딩(padding) 적용 -->
<div class="p-6">Content</div>
```

## 3.1. **컬러**

- Tailwind CSS에서는 다양한 색상을 쉽게 적용할 수 있음
- 색상은 `색상 이름-숫자` 형식으로 지정됨
- [**CORE CONCEPTS** 바로가기](https://tailwindcss.com/docs/colors)
```html
<!-- 텍스트 색상 -->
<p class="text-red-500">Red text</p>

<!-- 배경 색상 -->
<div class="bg-blue-200">Blue background</div>
```

## 3.2. **크기 (Size)**

- 다양한 크기 유틸리티를 제공
- [width](https://tailwindcss.com/docs/width), [height](https://tailwindcss.com/docs/height), [max-width](https://tailwindcss.com/docs/max-width), [max-height](https://tailwindcss.com/docs/max-height), [min-width](https://tailwindcss.com/docs/min-width), [min-height](https://tailwindcss.com/docs/min-height) 등에 대한 속성을 설정 가능

```html
<!-- 폭 설정 -->
<div class="w-1/2">50% width</div>

<!-- 높이 설정 -->
<div class="h-64">Height 16rem</div>

<!-- 최대 폭 설정 -->
<div class="max-w-xs">Max width 20rem</div>
```

## 3.3. **여백 (Spacing)**

- 여백([margin](https://tailwindcss.com/docs/margin), [padding](https://tailwindcss.com/docs/padding))은 숫자에 따라 크기를 설정할 수 있음
- 숫자는 Tailwind에서 미리 정의된 값으로 변환됨

* m: 모든 방향에 margin 적용
* p: 모든 방향에 padding 적용
* mt, mr, mb, ml: 각 방향에 개별적으로 margin 적용
* pt, pr, pb, pl: 각 방향에 개별적으로 padding 적용

```html
<!-- 마진(여백) 설정 -->
<div class="m-4">All sides margin</div>

<!-- 패딩 설정 -->
<div class="p-8">All sides padding</div>

<!-- 상단 여백만 설정 -->
<div class="mt-4">Margin top</div>

<!-- 좌우 여백 설정 -->
<div class="mx-4">Horizontal margin</div>
```

## 3.4. **폰트 및 텍스트**

- Tailwind에서는 텍스트 관련 속성도 유틸리티 클래스에 포함되어 있음

```html
<!-- 폰트 크기 설정 -->
<p class="text-xl">Large text</p>

<!-- 폰트 굵기 설정 -->
<p class="font-bold">Bold text</p>

<!-- 텍스트 색상 설정 -->
<p class="text-red-500">Red text</p>

<!-- 텍스트 정렬 -->
<p class="text-center">Centered text</p>
```

## 3.5. **디스플레이**

- Tailwind CSS에서는 display 속성을 쉽게 설정할 수 있음

```html
<!-- 블록 레벨 요소 -->
<div class="block">Block element</div>

<!-- 인라인 요소 -->
<span class="inline">Inline element</span>

<!-- 플렉스 박스 설정 -->
<div class="flex">Flex container</div>

<!-- 그리드 설정 -->
<div class="grid grid-cols-3">Grid with 3 columns</div>
```

## 3.6. **플렉스 박스 (Flexbox)**

- 플렉스 박스를 사용한 레이아웃을 Tailwind에서 쉽게 설정할 수 있음

```html
<!-- 플렉스 박스 컨테이너 -->
<div class="flex">
  <div class="flex-1">Item 1</div>
  <div class="flex-1">Item 2</div>
</div>

<!-- 수평 정렬 (가로 방향) -->
<div class="flex justify-between">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- 수직 정렬 (세로 방향) -->
<div class="flex items-center">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

## 3.7. **그리드 (Grid)**

- Tailwind CSS는 CSS Grid Layout을 사용하여 그리드 레이아웃을 설정할 수 있음

```html
<!-- 그리드 설정 -->
<div class="grid grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- 그리드 아이템 크기 설정 -->
<div class="grid grid-cols-3 gap-4">
  <div class="col-span-2">Span across two columns</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

## 3.8. **반응형 디자인**

- Tailwind CSS는 **반응형 디자인**을 위한 유틸리티 클래스를 제공합니다. 
- sm, md, lg, xl 등의 접두사를 사용하여 화면 크기별로 스타일을 조정할 수 있습니다.

#### 기본 브레이크포인트
- **sm** (640px 이상)
	- 작은 화면을 의미하며, 모바일 기기에 대한 스타일을 정의 
	- sm 접두사를 사용하면 640px 이상인 화면에서만 스타일을 적용

- **md** (768px 이상)
  - 태블릿 화면 크기를 위한 브레이크포인트
  - md 접두사는 768px 이상인 화면에서 스타일을 적용

- **lg** (1024px 이상)
	- 데스크탑 화면 크기를 의미하며, 1024px 이상인 화면에서 스타일을 적용

- **xl** (1280px 이상)
	- 대형 데스크탑 화면 크기로, 1280px 이상인 화면에서만 스타일을 적용


```html
<!-- 작은 화면에서는 텍스트를 왼쪽 정렬, 큰 화면에서는 가운데 정렬 -->
<p class="text-left md:text-center">Responsive text alignment</p>

<!-- 작은 화면에서는 2개의 컬럼, 큰 화면에서는 4개의 컬럼 -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

## 3.9. **커스터마이징**
- **tailwind.config.js** 파일을 통해 기본 테마나 유틸리티 클래스들을 쉽게 수정할 수 있음
- 색상, 간격, 폰트 등을 커스터마이즈할 수 있음

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        'custom-blue': '#1D4ED8',
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
}
```

## 3.10. **상태 클래스 (State Classes)**
- 상태에 따라 스타일을 적용할 수 있는 유틸리티 클래스를 제공
* hover: 마우스를 올렸을 때
* focus: 포커스를 받았을 때
* active: 클릭했을 때
* disabled: 비활성화 되었을 때

```html
<!-- hover 상태에서 색상 변경 -->
<button class="bg-blue-500 hover:bg-blue-700">Hover me</button>

<!-- focus 상태에서 테두리 색상 변경 -->
<input class="focus:ring-2 focus:ring-blue-500" type="text" />
```

## 3.11. **애니메이션 및 전환**

- 애니메이션 및 전환을 쉽게 설정할 수 있음

```html
<!-- 간단한 전환 효과 -->
<div class="transition-all duration-500 ease-in-out hover:bg-red-500">Hover me</div>

<!-- 애니메이션 설정 -->
<div class="animate-ping">Pinging...</div>
```

# 4. 결론
- Tailwind CSS는 **유틸리티 클래스**를 조합하여 빠르게 스타일을 적용할 수 있게 해주는 프레임워크임
- 여러 단점을 있음에도 불구하고 빠른 개발 속도, 디자인 일관성 유지, 반응형 디자인 용이, 컴포넌트 개발에 적합 등의 이유로 생산성과 일관성 면에서 얻는 이점이 큼
- 다양한 속성에 대한 클래스를 제공하며, 이를 사용하여 **반응형 디자인**이나 **애니메이션**까지 손쉽게 적용할 수 있습니다.
