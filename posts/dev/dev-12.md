---
title: "깬닙하우스 소개"
date: "2025-01-28 00:00:00"
---

## 1. 깬닙하우스(kkennib house)란?
- 포트폴리오겸 블로그 사이트
- 커리어(About.) 소개, 개발경험(Dev.)과 지식(Archive), 메모(memo), 통찰(insight) 글 공유

## 2. 배경 및 문제점

- **마크다운 에디터 기능이 약함**
  - 개인/회사 업무 중 문서를 주로 마크다운(md)으로 작성(VScode) 및 보관(Github)
  - 효율성을 위해 마크다운 방식으로 문서 작성을 통합하기를 원함
  - Tistory, Naver Blog, Velog 등 기존 서비스는 기능이 약하거나 버그가 있음

- **글의 시인성 저하**: 메모 위주로 블로그를 운영한 탓에 공유하고 싶은 글이 잘 드러나지 않음

- **불필요한 기능**: 기존 블로그의 경우 광고, 댓글, 뉴스기사 등 불필요한 기능이 포함

- **템플릿 수정의 어려움**: 메뉴 및 카테고리, 배치 변경을 위한 블로그 템플릿 수정 작업이 쉽지 않음

## 3. 시스템 구현
- 프론트엔드로 Next.js 기반으로 웹 페이지를 구현하고, [Vercel](https://namu.wiki/w/Vercel)을 통해 배포
    - 최초에는 pbulic 경로를 통해 정적 리소스로 모든 글을 서비스하였으나, 
    - 공유하고 싶은 글이 개수가 점차 많아지며 WAS 통한 동적 리소스로 글 제공
      - <a href='https://house.kkennib.net/post/archive/archive-8' target='_blank'>WAS 구성</a>: AWS Lambda + Spring Boot, DynamoDB(글 리스트 제공)
        - 글 목록 제공하는 [getPostList API](https://github.com/cerulean85/kkennibhouse-back/blob/main/src/main/java/net/kkennib/house/controllers/PostController.java)
            ```java
            ...
            public class PostController {

                ...
                @GetMapping("/posts/{articleType}/{pageNo}")
                public Mono<ResponseEntity<PostResponse>> getPostList(
                        @PathVariable("articleType") String articleType,
                        @PathVariable("pageNo") int pageNo)
                {
                    Mono<PostResponse> res = postService.getPosts(articleType, pageNo);
                    return res.map(ResponseEntity::ok)
                            .defaultIfEmpty(ResponseEntity.notFound().build());
                }
                ...
            }

            ```

- **마크다운 렌더링**: [react-markdown 컴포넌트](https://github.com/remarkjs/react-markdown) 사용([구현코드 보기](https://github.com/cerulean85/kkennibhouse/blob/main/app/post/%5Bcategory%5D/%5Bslug%5D/page.tsx))


## 4. 개선점
- **페이지 내비게이션(Page Navigation)**: 아직 글이 많지 않아 웹 페이지 상에서 페이지 내비게이션 미구현
- **콜드스타트(Cold Start)**: 최초 혹은 타임아웃 길어지면 콘텐츠 로딩 느림
- **리스트 항목 업데이트 기능**: 이 기능이 없어서 매번 AWS에서 아래와 같이 JSON을 입력해야 함
  - <img src='/images/dev/dev-12-1.png' width='50%'>
- **SNS 공유**: Threads에 포스팅을 위한 기능 고려중 