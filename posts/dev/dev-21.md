---
title: Next.js Locale 적용
date: 2025-01-23
tags: Next.js, React.js
---

## 환경
- App Router

## 경로 및 파일 생성 
- root > middleware.ts
- root > lib > domain.ts
- root > app > locales
  - ko.json: 한국어
  - en.json: 영어
  - cn.json: 중국어

## 패키지 설치 
- i18n 라이브러리: Next.js 애플리케이션 다국어 지원 패키지
- 설치: ``` npm i next-intl```

## 도메인 구조
- [프로토콜]:[도메인]/[로케일경로]/[페이지경로]
- 로케일경로: ko, en, cn 등
- 페이지경로: App 라우터의 구조를 따름

## 리다이렉트 규칙
- 경로없이 도메인만 있는 주소는 기본 로케일의 기본 페이지로 리다이렉트
- 잘못된 경로와 페이지라면 not-found 페이지로 리다이렉트

## 리다이렉트 소스코드
``` js
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, defaultPage, notfoundPage } from './lib/domain';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathArr = pathname.split('/');
  const pathLocale = pathArr[1];

  // 로케일이 올바른지 확인
  const isValidLocale = locales.includes(pathLocale);

  // 올바른 로케일인 경우
  if (isValidLocale) {
    // 경로가 '/:locale'인 경우 리다이렉트
    if (pathArr.length === 2) {
      return NextResponse.redirect(new URL(`/${pathLocale}/${defaultPage}`, request.url));
    }
  } else {
    // 로케일이 없는 경우 기본 로케일로 리다이렉트
    if (pathLocale === '') {
      // http://xxx.yyy.zzz와 같이 Locale이 없는 도메인으로 접근 시 기본 Locale로 리다이렉트
      return NextResponse.redirect(new URL(`/${defaultLocale}/${defaultPage}`, request.url));
    } 

    // 잘못된 로케일인 경우 '/not-found'로 리다이렉트
    if (pathLocale !== notfoundPage) {
      return NextResponse.redirect(new URL(`/${notfoundPage}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 다음과 같이 시작하는 경로를 제외한 모든 요청 경로와 일치:
     * - api (API 라우트)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘 파일)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    // matcher: ['/', '/:locale'] // 루트 경로에서만 실행
  ],
};
```