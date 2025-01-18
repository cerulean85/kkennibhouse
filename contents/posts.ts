

export const posts: any = [
    {
        articleType: 'about',
        postId: 'about-1',
        title: '빅데이터 분석 플랫폼 개발/운영',
        cover: '',
        contents: `

## 1. 주요업무 및 역할
- (주)더아이엠씨 AI, Big Data R&D 및 R&D 사업 기획
- 빅데이터 분석 플랫폼 기획 및 설계, 개발
        
## 2. 업무 성과
**1) <a href='https://theimc.co.kr/web/php/sub/ser_textom.php' target='_blank'>SaaS 빅데이터 분석 플랫폼(Textom) 시스템</a> 최적화**
- 데이터 처리 지연에 의한 월별 이슈 발생률 0.05% 이하 달성
- 사용자 요청의 처리 시간 최소화 → 데이터 수집 및 분석 목표 시간(24시간 이내) 달성
- 분산처리, 컨테이너화, 마이크로서비스 아키텍처 등 시스템 구조 개선

**2) AI 교육 학습관리 시스템(AI Edutom) 개발 및 최적화**
- 구글 Quick, Draw! 스케치 데이터 기반의 <a href='https://aiedutom.co.kr/views/_layout/intro/file/learn_sketch.pdf' target='_blank'>AI 교육 웹 서비스(쓱싹캐치)</a> 개발
- 전체 시스템 가용성 99.5% 달성, 트래픽 급증 기간 장애건수 0건 달성
- 클라우드 도입 및 로드밸런싱 솔루션 구현

**3) 부산시교육청 빅데이터 분석(부산에듀빅) 플랫폼 구축 및 운영**
- 데이터베이스 설계 및 웹 풀스택 개발
- 분산처리 시스템 구현, 동시 처리 성능 향상 → 트래픽 급증 기간 장애건수 0건 달성
- 중/고등학교 대상 서비스 시범 운영 성공
`
        
//         `

// ## 1. [빅데이터 분석 플랫폼 TEXTOM](https://textom.co.kr/about/overview) 개발


// ![텍스톰파이프라인](/images/textom_pipeline.png)

// - 방대하고 복잡한 텍스트 자료를 분석할 수 있는 빅데이터 분석 솔루션

// - 웹을 통해 데이터의 수집부터 정제, 매트릭스, 감성분석, 시각화 결과물까지 데이터를 간편하게 처리할 수 있는 서비스

// - **역할/성과**

//     - S/W 구조 개선, S/W 품질 개선

//     - MSA 도입, 수집/분산 네트워크 설계 및 구현

// ## 2. [AI 학습 플랫폼 AI Edutom](https://aiedutom.co.kr) 개발

// ![AI에듀톰파이프라인](/images/aiedutom_pipeline.png)

// - 학생들에게 재미있는 콘텐츠를 통해 AI를 어떻게 활용할 수 있는지 알려주는 단계적 플랫폼

// - 수학, 코딩, 통계에 대한 지식 없이 체계적으로 AI의 원리를 이해하고 나만의 인공지능을 만들 수 있음

// - **역할/성과**

//     - 신규 서비스 개발, S/W 고도화 및 품질 개선

//     - 로드밸런싱, 분산처리를 통한 병목 해결, 동시 수용 인원 증가

// ## 3. 부산시교육청 에듀빅 개발 및 운영
// -
// -

// ## 4. 한국잡월드 빅데이터랩 개발
// - 시스템 아키텍처 및 DB 설계
// - 데이터 분석 서버 개발

// ## 5. K-Data 글로벌 사업 과제 책임

//     `
    },
    {
        articleType: 'about',
        postId: 'about-2',
        title: `물류 자동화 및 효율화를 위한 프로젝트`,
        cover: '',
        contents: `

## 1. 주요업무 및 역할
- 한화모멘텀(주) 물류 제어 S/W 개발
- 물류(타이어, 이차전지 등) 모니터링 및 관제 시스템 설계
- 열 처리 장비 레시피 자동 추천 시스템 개발

## 2. 업무 성과
**1) 한화모멘텀(주) 열 장비 레시피 자동 추천 시스템 개발**
- 데이터 수집 및 가공, 적재를 위한 파이프라인 설계 및 구축
- AI 및 ML 기반의 레시피 자동 추천 시스템 개발

**2) (주)하림산업 온라인물류센터 적치 전략 고도화**
- <a href="http://localhost:3000/article?from=dev&postId=dev-7" target="_blank">자동창고 시스템(ASRS)</a>, <a href="http://localhost:3000/article?from=dev&postId=dev-8" target="_blank">겐트리(Gantry)</a> 등 3종의 창고 공간 효율성 극대화
- 효율적인 적치 룰 설계 및 소스코드 구현

**3) <a href="http://localhost:3000/article?from=dev&postId=dev-10" target="_blank">한화모멘텀(주) HES 솔루션 개발</a>**
  - OPCUA, gRPC 기반의 물류 시나리오 통신 미들웨어 개발
  - 운영 시나리오 생성을 위한 사용자 인터페이스 개발
`
    },
    {
        articleType: 'about',
        postId: 'about-3',
        title: `학습관리시스템 유지관리 및 고도화`,
        cover: '',
        contents: `

## 1. 주요업무 및 역할

<img src='/images/about/about-1-1.png'>

- 한국기술교육대학교 학습시스템 개발 및 유지관리
- 웹서버(apache), WAS서버(tomcat, weblogic) 운용 및 리소스 모니터링
- 시스템 민원 처리, 웹 보안 취약점 보완 및 대응
- 학습 소셜 네트워킹 서비스를 접목한 비형식 모바일 학습관리시스템 구축

<img src='/images/about/about-1-2.png'>

## 2. 업무 성과
**1) 학습관리시스템 2식 운영, 고객 만족도 향상**
- 원격평생교육원, 원격교육연수원 LMS의 풀스택(Full-Stack) 운용을 통한 빠른 장애 대응
- 트래픽 급증 기간 시스템 기능 오류 및 지연 문의 건수 0건 달성
- S/W 품질 향상으로 인한 사용자 3배 이상 증가

**2) 모바일 학습관리 애플리케이션(클립러닝) 개발, 신규 가입자 증가**
- 출시 후 20개월 동안 교육원 신규 가입자 1500명 증가
- 푸시 알람 서비스를 통한 자동화된 학습 독려 운영 모델 구현

`
    },
    {
        articleType: 'dev',
        subType: 'share',
        postId: 'dev-1',
        title: '분산의 필요성',
        cover: '/images/polling.png',
        fit: 'cover',
        createAt: '2024-12-27 00:00:00',
    },
    {
        articleType: 'dev',
        subType: 'share',
        postId: 'dev-2',
        title: '배포 방식의 결정',
        cover: '',
        fit: 'cover',
        createAt: '2024-12-28 00:00:00',     
    },
    
    {
        articleType: 'dev',
        subType: 'share',
        postId: 'dev-3',
        title: '컨테이너의 필요성',
        cover: '/images/symbol/25_docker.svg',
        fit: 'cover',
        createAt: '2024-12-29 00:00:00',     
    },

    {
        articleType: 'dev',
        subType: 'share',
        postId: 'dev-4',
        title: '형상 관리의 필요성',
        cover: '/images/symbol/26_git.svg',
        fit: 'hidden',
        createAt: '2024-12-31 00:00:00',
    },

    {
        articleType: 'dev',
        subType: 'share',
        postId: 'dev-5',
        title: '처리 지연 모니터링 시스템',
        cover: '/images/dev/dev-5-1.png',
        fit: 'cover',
        createAt: '2025-01-02 00:00:00',
    },
    
    {
        articleType: 'dev',
        subType: 'contribute',
        postId: 'dev-6',
        title: 'SKU 기반 Stacker Crane 적치 최적화',
        cover: '/images/dev/dev-6-1.png',
        fit: 'cover',
        createAt: '2025-01-12 00:00:00',
    },

    {
        articleType: 'dev',
        subType: 'contribute',
        postId: 'dev-7',
        title: 'SKU/LOT 기반 Gantry 적치 최적화',
        cover: '/images/dev/dev-7-1.png',
        fit: 'cover',
        createAt: '2025-01-13 00:00:00',
    },

    {
        articleType: 'dev',
        subType: 'share',
        postId: 'dev-8',
        title: '함수 인터페이스 변경에 대응하는 로깅',
        cover: '',
        fit: 'cover',
        createAt: '2025-01-14 00:00:00',
    },

    {
        articleType: 'dev',
        subType: 'contribute',
        postId: 'dev-9',
        title: `한화 ESG 스마트팩토리`,
        cover: '/images/dev/dev-9-1.jpg',
        fit: 'cover',
        createAt: '2025-01-14 00:00:00',
    },

    {
        articleType: 'dev',
        subType: 'share',
        postId: 'dev-10',
        title: `Message Orineted Middleware`,
        cover: '/images/dev/dev-10-1.png',
        fit: 'cover',
        createAt: '2025-01-15 00:00:00',
    },

    {
        articleType: 'essay',
        subType: '',
        postId: 'essay-1',
        title: '독서의 이유',
        cover: '/images/essay_post1.jpg',
        fit: 'cover',
        createAt: '2024-12-27 00:00:00',
    },
    
    {
        articleType: 'essay',
        subType: '',
        postId: 'essay-2',
        title: '비틀즈의 고독',
        cover: '/images/pepper.jpg',
        fit: 'cover',
        createAt: '2024-12-28 00:00:00',
    },

    {
        articleType: 'essay',
        subType: '',
        postId: 'essay-3',
        title: '아이디어에 대하여',
        cover: '/images/essay/idea.jfif',
        fit: 'cover',
        createAt: '2024-12-29 00:00:00',
    },

    {
        articleType: 'essay',
        subType: '',
        postId: 'essay-4',
        title: '이해와 창조에 대하여',
        cover:'',
        fit: 'cover',
        createAt: '2024-12-30 00:00:00',
    },
        
    {
        articleType: 'essay',
        subType: '',
        postId: 'essay-5',    
        title: '성취와 노력의 상관관계',
        cover: '/images/essay/essay-5-1.png',
        fit: 'hidden',
        createAt: '2025-01-01 00:00:00',
    },

    {
        articleType: 'books',
        subType: '',
        postId: 'books-1',    
        title: '허무주의에 대한 오해',
        cover: '/images/books/차라투스트라표지.jpg',
        fit: 'cover',
        createAt: '2025-01-01 00:00:00',
    },    
    
    {
        articleType: 'books',
        subType: '',
        postId: "books-2",
        title: '요리 본능을 읽고',
        cover: '/images/books/요리본능표지.jpg',
        fit: 'cover',
        createAt: '2025-01-02 00:00:00',
    },

    {
        articleType: 'books',
        subType: '',
        postId: "books-3",
        title: '데미안: 아프락사스',
        cover: '',
        fit: 'cover',
        createAt: '2025-01-05 00:00:00'
    },

    {
        articleType: 'archive',
        subType: '',
        postId: 'archive-1',
        title: 'Aapache Kafka 설치',
        cover: '/images/symbol/19_kafka.svg',
        fit: 'hidden',
        createAt: '2024-12-27 00:00:00'
    },

    {
        articleType: 'archive',
        subType: '',
        postId: 'archive-2',
        title: 'Python Schedule 등록',
        cover: '/images/symbol/4_python.svg',
        fit: 'hidden',
        createAt: '2024-12-27 00:00:00'
    },

    {
        articleType: 'archive',
        subType: '',
        postId: 'archive-3',
        title: 'Gitlab 설치 및 사용',
        cover: '/images/symbol/4_python.svg',
        fit: 'hidden',
        createAt: '2025-01-01 00:00:00'
    },

    {
        articleType: 'archive',
        subType: '',
        postId: 'archive-4',
        title: 'C# 문법 정리',
        cover: '/images/symbol/1_csharp.svg',
        fit: 'hidden',
        createAt: '2024-06-28 00:00:00'
    },

    {
        articleType: 'archive',
        subType: '',
        postId: 'archive-5',
        title: 'Docker 명령어 정리',
        cover: '/images/symbol/25_docker.svg',
        fit: 'hidden',
        createAt: '2024-06-29 00:00:00'
    },

    {
        articleType: 'archive',
        subType: '',
        postId: 'archive-6',
        title: 'Git 명령어 정리',
        cover: '/images/symbol/26_git.svg',
        fit: 'hidden',
        createAt: '2024-06-30 00:00:00'
    },

    {
        articleType: 'archive',
        subType: '',
        postId: 'archive-7',
        title: 'RabbitMQ 정리',
        cover: '/images/symbol/20_rabbitmq.svg',
        fit: 'hidden',
        createAt: '2024-06-30 00:00:00'
    },
]