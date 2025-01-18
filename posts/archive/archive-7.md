---
title: RabbitMQ 정리
date: 2024-04-30
tags: RabbitMQ
---

# RabbitMQ 사용하기

- 리소스 리스트  RabbitMQ 리파지토리를 추가 
```shell
sudo vi /etc/apt/sources.list

deb http://www.rabbitmq.com/debian/ testing main 
RabbitMQ의 public key를 ubuntu가 신뢰할 수 있도록 key 등록
 
wget http://www.rabbitmq.com/rabbitmq-signing-key-public.asc
sudo apt-key add rabbitmq-signing-key-public.asc
```

- RabbitMQ 설치
```shell
sudo apt-get install rabbitmq-server 
```
 
- Management Plugin 설치
  - Management Plugin도 활성화 통해 GUI환경 제공 (https://www.rabbitmq.com/management.html)

```shell
sudo rabbitmq-plugins enable rabbitmq_management
sudo service rabbitmq-server restart 
```

- 플러그인 설치 후 restart하면 반영된다.
- 웹브라우저로 http://serverip:15672/ 접속


- 관리자 계정  추가
```shell
sudo rabbitmqctl add_user rabbitmq password
sudo rabbitmqctl set_user_tags rabbitmq administrator 
```

- 사용자의 비번 변경
```shell
$ rabbitmqctl change_password <사용자> <신규비번>
```

- 사용자 권한 부여하기
```shell
rabbitmqctl set_permissions -p / "rabbitmq" ".*" ".*" ".*"
rabbitmqctl list_permissions
```

- cmd로 queue 삭제하기
  - RabbitMQ Management를 실행하였다면 브라우저를 통해 다음 경로로 접속하여 rabbitmqadmin 다운로드
  - 경로: http://localhost:15672/cli/rabbitmqadmin
  - 다운로드 받은 파일을 원하는 위치로 옮긴 후 다음 명령어로 실습

```shell

# CMD 실행 후 rabbitmqadmin을 옮긴 경로로 이동
cd C:\Program Files\RabbitMQ Server\rabbitmq_server-3.13.4\escript

# guest 계정으로, / 호스트의 celery 큐 삭제
python rabbitmqadmin -u guest -p guest -V / delete queue name=celery

# tos_admin 계정으로, / 호스트의 celery 큐 삭제
python rabbitmqadmin -u tos_admin -p <Any Pass> -V /TOS_SYSTEM delete queue name=celery

# tos_admin 계정으로, / 호스트의 TOS 큐 삭제
python rabbitmqadmin -u tos_admin -p <Any Pass> -V /TOS_SYSTEM delete queue name=TOS

```
- rabbitmqadmin은 파이썬으로 실행해야 함

## RabbitMQ 메시지 처리 과정
- RabbitMQ로 전달된 메시지는 Exchange를 통해 Queue로 전달됨
![alt text](../images/rabbitmq.png)

## Exhange 유형
### Direct Exchange
- 메시지의 라우팅 키를 기반으로 메시지 전달
- Exchange와 Queue가 특정키로 바인딩

### Fanout Exchange
- 연결된 모든 Queue에 메시지 전송
- Exchange에 N개의 Queue가 연결되어 있다면 N개 복사되어 각 Queue로 라우팅

### Topic Exchange
- Direct 방식과 마찬가지로 라우팅 키 사용
- Direct 방식과는 달리 특정 키가 아닌 패턴으로 바인딩
- 라우팅 키가 바인딩 규칙 중 일치하는 모든 패턴의 Queue에 메시지 라우팅

### Headers Exchange
- 헤더에 여러 속성 값을 사용하여 라우팅
- 헤더이 값과 바인딩 규칙 값이 일치하면 Queue로 메시지 라우팅


## References
- [출처1](https://experiences.tistory.com/2)
- [출처2](https://sarc.io/index.php/miscellaneous/1632-ubuntu-rabbitmq-apt)
- [사용자 비번 변경](https://bangcfactory.tistory.com/entry/rabbitmq-%EC%82%AC%EC%9A%A9%EC%9E%90-%EA%B4%80%EB%A6%AC)
- [사용자 권한 변경](https://heodolf.tistory.com/50)
- [RabbitMQ Mamangement-cli](https://www.rabbitmq.com/docs/management-cli)
- [[RabbitMQ] RabbitMQ의 동작과 Exchange Type](https://velog.io/@jaewan/RabbitMQ-RabbitMQ%EC%9D%98-%EB%8F%99%EC%9E%91%EA%B3%BC-Exchange-Type)