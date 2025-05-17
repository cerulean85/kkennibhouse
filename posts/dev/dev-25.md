---
title: Python 모듈 AWS Lambda 배포 및 트리거 설정
date: 2025-05-17
tags: Python, Lambda, Trigger
---

## 1. 디렉토리 생성
- 배포할 디렉토리: **pyrss** 
- **pyrss/requirements.txt**
```    
asn1crypto==1.5.1
feedparser==6.0.11
pg8000==1.31.2
python-dateutil==2.9.0.post0
scramp==1.4.5
sgmllib3k==1.0.0
six==1.17.0
```

## 2. 패키지 설치
```bash
pip install -r ./requirements.txt -t .
```

## 3. Lambda 실행함수 생성
- **pyrss/python/lambda_function.py**에 **lambda_handler(event, context)** 함수 생성

## 4. Lambda로 배포할 디렉토리 압축
- 아래의 파일들을 zip으로 압축

<img src="/images/dev/dev-25-1.png">

## 5. Lambda 함수 생성

<img src="/images/dev/dev-25-2.png">

## 6. Lambda로 zip 업로드
- Lambda > 함수 > [생성한함수]

<img src="/images/dev/dev-25-3.png">

## 7. 런타임 설정
- Lambda > 함수 > [생성한함수] > 런타임 설정

<img src="/images/dev/dev-25-4.png">

- 런타임 버전 선택 및 핸들러 설정
  - 핸들러는 3에서 생성한 **Lambda 실행함수** 함수로 지정

<img src="/images/dev/dev-25-5.png">

## 8. 트리거 추가 및 규칙 편집
- 왼쪽 하단 트리거 추가 버튼을 눌러 트리거 구성(EventBridge)

<img src="/images/dev/dev-25-6.png">

<img src="/images/dev/dev-25-7.png">

- Cron식에 따라 핸들러 함수가 실행될 주기를 설정
  - Cron식 예시: cron(0 21 * * ? *) => 매일 9시 실행
    
<img src="/images/dev/dev-25-8.png">
