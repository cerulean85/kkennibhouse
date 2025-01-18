---
title: Docker 명령어 정리
date: 2024-06-29
tags: Docker
---

- [Dockerfile 명령어](#dockerfile-명령어)
  - [FROM](#from)
  - [RUN](#run)
  - [COPY](#copy)
  - [CMD](#cmd)
  - [ENTRYPONT](#entrypont)
- [DockerFile 실행](#dockerfile-실행)
- [Docker 이미지 검색](#docker-이미지-검색)
- [Error : Cannot perform an interactive login from a non TTY device](#error--cannot-perform-an-interactive-login-from-a-non-tty-device)
- [Docker 이미지 목록 확인](#docker-이미지-목록-확인)
- [Docker 이미지 생성](#docker-이미지-생성)
- [Docker 이미지 배포](#docker-이미지-배포)
- [Docker 이미지 삭제](#docker-이미지-삭제)
- [Docker 컨테이너 목록 확인](#docker-컨테이너-목록-확인)
- [Docker 컨테이너 생성](#docker-컨테이너-생성)
- [Docker 컨테이너 시작/재시작/정지](#docker-컨테이너-시작재시작정지)
- [Docker 컨테이너 접속](#docker-컨테이너-접속)
- [Docker 컨테이너 백그라운드 실행 시 접속](#docker-컨테이너-백그라운드-실행-시-접속)
- [Docker 컨테이너 외부에서 명령 실행](#docker-컨테이너-외부에서-명령-실행)
- [Docker 컨테이너 삭제](#docker-컨테이너-삭제)
- [Docker 컨테이너 재시작](#docker-컨테이너-재시작)
- [Docker 이미지 최초 배포](#docker-이미지-최초-배포)
- [Docker 컨테이너 커밋](#docker-컨테이너-커밋)
- [Docker 이미지 태그 달기](#docker-이미지-태그-달기)
- [Docker Node.js 설정 참고](#docker-nodejs-설정-참고)
- [Docker 파라미터](#docker-파라미터)
  - [-i](#-i)
  - [-t](#-t)
  - [--rm](#--rm)
  - [-v](#-v)
  - [-d](#-d)
  - [-p](#-p)
  - [-c](#-c)
  - [-m](#-m)
  - [/bin/bash](#binbash)
  - [--privileged](#--privileged)
- [데이터 볼륨](#데이터-볼륨)
- [엔트리포인트(Entrypoint)](#엔트리포인트entrypoint)
- [커맨드(Command)](#커맨드command)
- [환경변수](#환경변수)
- [docker exec](#docker-exec)
- [docker network](#docker-network)
  - [Docker network driver bridge](#docker-network-driver-bridge)
- [expose vs. publish ?? 설명 부족](#expose-vs-publish--설명-부족)
- [docker volume](#docker-volume)
  - [호스트 볼륨](#호스트-볼륨)
  - [볼륨 컨테이너](#볼륨-컨테이너)
  - [도커 볼륨](#도커-볼륨)
  - [읽기전용 볼륨 연결](#읽기전용-볼륨-연결)
- [docker log](#docker-log)
  - [STDOUT / STDERR](#stdout--stderr)
  - [로그 확인하기](#로그-확인하기)
  - [로그 확인하기](#로그-확인하기-1)
  - [로그 용량 제한하기](#로그-용량-제한하기)
- [도커 이미지 다루기](#도커-이미지-다루기)
  - [도커 이미지 구조](#도커-이미지-구조)
  - [docker commit](#docker-commit)
  - [Dockerfile 이용하여 이미지 생성](#dockerfile-이용하여-이미지-생성)
  - [빌드 컨텍스트](#빌드-컨텍스트)
  - [.dockerignore](#dockerignore)
  - [이미지 압축파일로 저장](#이미지-압축파일로-저장)
- [도커허브를 이용한 컨테이너 관리](#도커허브를-이용한-컨테이너-관리)
  - [AEC(Amzon Elastic Container)](#aecamzon-elastic-container)
  - [이미지 경량화](#이미지-경량화)
  - [도커 데몬 디버깅](#도커-데몬-디버깅)
  - [도커 컴포즈: 명시적으로 여러 컨테이너 관리하기](#도커-컴포즈-명시적으로-여러-컨테이너-관리하기)
  - [도커 컴포즈 사용 목적](#도커-컴포즈-사용-목적)
- [Grafana 도커 가이드](#grafana-도커-가이드)
- [MySQL 도커 가이드](#mysql-도커-가이드)
- [도커 컴포즈 실습](#도커-컴포즈-실습)
  - [Grafana 도커 컴포즈](#grafana-도커-컴포즈)
- [Docker MariaDb 설치 및 외부 접속 허용](#docker-mariadb-설치-및-외부-접속-허용)


# Dockerfile 명령어
## FROM
- 도커 이미지의 바탕이 되는 베이스 이미지 지정
- Dockerfile로 이미지를 빌드할 때 먼저 FROM 명령에 지정된 이미지를 내려 받음
## RUN
- 도커 이미지를 실행할 때 컨테이너 안에서 실행할 명령어 정의
## COPY
- 도커 동작 중 호스트 머신의 파일이나 디렉터리를 도커 컨테이너로 복사
## CMD
- 도커 컨테이너 실행 시 컨테이너 안에서 실행할 프로세스 지정
## ENTRYPONT
- CMD와 마찬가지로 컨테이너 안에서 실행할 프로세스 지정


# DockerFile 실행
1. Dockerfile 경로 이동
2. docker build –t [tag_name] .

# Docker 이미지 검색
- 호스트 cmd에서 아래처럼 명령어 입력하여 검색
``` sh
docker search nodejs  # Node.js 이미지 검색
docker search openjdk  # OpenJDK 이미지 검색
docker search kafka  # Apache Kafka
docer search mysql --limit 5 # MySQL
```

# Error : Cannot perform an interactive login from a non TTY device
- 호스트 cmd에서 도커 명령어 실행 시 위의 오류가 발생하면 맨 앞에 winpty 입력
``` sh
winpty docker container run –p 5000:3000 –it zhwan85/goodwill
winpty docker container run –p 5000:3000 zhwan85/goodwill
```

# Docker 이미지 목록 확인
``` sh
docker image ls
```

# Docker 이미지 생성
``` sh
docker image build –t zhwan85/goodwill:latest .
```

# Docker 이미지 배포
``` sh
docker image push zhwan85/goodwill:latest
docker commit c33c299a3bd4 zhwan85/goodwill:lastest
# docker image tag [이미지명:현재태그] [이미지명:변경태그]
docker image tag zhwan85/goodwill:latest zhwan85/goodwill:0.0.1
docker push zhwan85/goodwill:0.0.1
```
- [참고사이트](https://nicewoong.github.io/development/2018/03/06/docker-commit-container/)

# Docker 이미지 삭제
- docker rmi [이미지아이디]

# Docker 컨테이너 목록 확인
- docker ps –a
- docker container ls –a

# Docker 컨테이너 생성
- winpty docker container run -it –p 5000:3000 zhwan85/goodwill
포트포워딩: [호스트포트번호:컨테이너포트번호]
- -it: Windows에서 커맨드창으로 컨테이너 실행 시 -it를 안 붙이면 실행 안됨  
- 포트 포워딩은 run에서만 가능하므로, 컨테이너를 commit 후 컨테이너를 재생성하여 포트포워딩 해야 함

- docker container run -it –p 5000:3000 –p 4000:2000 zhwan85/goodwill
- 포트포워딩은 여러 개 가능

- winpty docker container run -it –p 5000:3000 –p 3308:3306 —privileged zhwan85/goodwill

- docker container run -it  -v C:\Users\JHKIM\Desktop\GoodWill:/home/app -d -p 5000:3000 -p 5030:3030 -p 5306:3306 -p 5084:8084 -p 5181:2181 -p 5092:9092 --name goodwill  --privileged zhwan85/goodwill:0.0.2 init

# Docker 컨테이너 시작/재시작/정지
- docker start/restart/stop [컨테이너명or아이디]
- [참고사이트](https://snowdeer.github.io/docker/2018/01/03/docker-launch-container-from-image/)


# Docker 컨테이너 접속
- docker attach [컨테이너명or아이디]

# Docker 컨테이너 백그라운드 실행 시 접속
- docker exec -it [컨테이너명or아이디] bash

# Docker 컨테이너 외부에서 명령 실행
- docker exec [컨테이너명or아이디] [커맨드]
- docker exec zhwan85:goodwill:0.0.1 echo “Hello!!”

# Docker 컨테이너 삭제
- docker rm [컨테이너명or아이디]
- docker rm -f [컨테이너 아이디 일부]
- docker rm -f $(docker ps -a -q)
  - 불필요한 컨테이너 모두 삭제
 
# Docker 컨테이너 재시작
- docker container restart silly_heyrovsky

# Docker 이미지 최초 배포
- docker login –u zhwan85 –p 비밀번호
- docker image push zhwan85/goodwill:latest

# Docker 컨테이너 커밋
- docker commit [컨테이너ID] [이미지명]

# Docker 이미지 태그 달기
- docker image tag [이미지명:현재태그] [이미지명:변경태그]
- docker image tag zhwan85/goodwill:latest zhwan85/goodwill:0.0.1

# Docker Node.js 설정 참고
- [참고사이트](https://www.daleseo.com/docker-nodejs/)


# Docker 파라미터 

## -i
- 컨테이너 실행 시 컨테이너 쪽 표준 입력과의 연결을 그대로 유지
- 컨테이너 쉘에 들어가 명령 실행 가능 하며 –t 옵션과 함께 사용
## -t
- 유사 터미널 기능 활성화
- -i 옵션을 사용하지 않으면 유사 터미널을 실행해도 여기에 입력할 수 없으므로 –i와 –t옵션을 같이 사용하거나 이드옵션을 축약한 –it 옵션 사용
## --rm
- 컨테이너 종료 시 컨테이너 파기 옵션
- 한 번 실행 후 유지 않아도 되는 명령행 도구 컨테이너 실행할 때 유용
## -v
- 호스트와 컨테이너 간에 디렉터리나 파일 공유
## -d
- -i 옵션의 반대로 컨테이너를 백그라운드 실행
## -p
- 포트포워딩 [외부포트]:[내부포트]
- 여러 개 열려면 –p [외부포트]:[내부포트] -p [외부포트]:[내부포트] ... 형태로 반복 해주면 됨
## -c
- CPU 자원 분배 설정
## -m
- 메모리 한계 설정
## /bin/bash
- 리눅스의 경우 컨테이너에 bash 쉘 이용
## --privileged
- 기본적으로 실행되는 unprivileged모드에서는 시스템 자원에 대한 접근이 제한적이므로 거의 모든 커널 기능을 사용하기 위하여 privileged모드로 실행해야 함
- 아래는 발생 가능한 에러
- Failed to get D-Bus connection [관련글 참고](https://lsjsj92.tistory.com/415)
  - --privileged와 init 명령어를 사용하여 컨테이너를 생성해야 함

  - docker container run -it -d -p 5000:3000 -p 3308:3306 --privileged –d zhwan85/goodwill:0.0.1 init
    - I: 표준입력 연결, t: tty 활성화, d: 백그라운드 실행
    - p: 포트포워딩, privileged: 가용 시스템 자원 확장

  - docker container run -it -d -p 5000:3000 -p 3308:3306 --privileged  zhwan85/goodwill:0.0.1 init


# 데이터 볼륨
- 컨테이너에서 실행된 애플리케이션이 stateful 유형이라면 새로운 컨테이너가 배포되어도 사용 중인 파일이나 디렉터리의 상태가 유지되어야 된다. 데이터 볼륨은 호스트와 컨테이너 사이의 디렉터리 공유 및 재사용 기능을 제공하여 애플리케이션이 사용하는 파일이나 디렉터리를 보존한다.


# 엔트리포인트(Entrypoint)
- 도커 컨테이너가 실행할 때 고정적으로 실행되는 스크립트 혹은 명령어
- 생략 가능하며 생략 시 커맨드에 지정된 명령어로 수행
- docker run --entrypoint echo ubuntu:focal hello world

# 커맨드(Command)
- 도커 컨테이너가 실행할 때 수행할 명령어 혹은 엔트리포인트에 지정된 명령어에 대한 인자값

# 환경변수
- docker run -i -t -e MY_HOST=fastcampus.com ubuntu:focal bash
- -e, --env, --env-file 
- nginx, grafana 등 컨테이너의 환경변수 확인

# docker exec
- 실행 중인 컨테이너에 명령어 실행
``` sh
# docker exec [container] [command]
# my-nginx 컨테이너에 Bash 셀로 접속
docker exec -i -t my-nginx bash 

# my-nginx 컨테이너에 환경변수 확인
docker exec my-nginx env 

docker run -d --name my-nginx nginx
docker exec my-nginx env
docker exec -i -t my-nginx bash
```
  
# docker network
- Docker 컨테이너가 매우 강력한 이유 중 하나는 Docker 컨테이너 간 Network 연결을 할 수 있으며, Docker 컨테이너와 Docker 컨테이너가 아닌 워크로드에 연결결할 수 있기 때문
- Docker 컨테이너와 서비스는 연결하려는 것이 Docker 컨테이너인지 아닌지 알 필요가 없음
- Docker 호스트는 Docker를 이용해 플랫폼에 구애받지 않고 Docker 컨테이너들을 관리, 연결할 수 있음

## Docker network driver bridge
- Docker를 설치하면 자동으로 Host machine의 Network interface에 Docker0라는 Virtual interface가 생성
- Docker0는 Host machine의 네트워크에 생성되어 다음의 특징을 가짐
  - Gateway는 자동으로 172.17.0.1로 설정되고 16 bit netmask(255.255.0.0)로 설정됨
  - docker0는 일반적인 interface는 아니며, virtual ethernet bridge임
- 컨테이너가 생성될 때 사용자가 특정 Network driver를 설정한 것이 아니라면 Default로 Docker0라는 Network interface에 연결이 됨
- Docker0는 각 컨테이너의 veth 인터페이스와 바인딩되며, 호스트OS의 eth0 인터페이스와 이어주는 역할을 함

![Docker Network Bridge](../images/Docker/bridge.png)



- docker run -p [HOST IP:PORT]:[CONTAINER PORT] [container]
- docker run -d -p 80:80 nginx 
  - nginx 컨테이너의 80번 포트를 호스트 모든 IP의 80번 포트와 연결하여 실행
- docker run -d -p 127.0.0.1:80:80 nginx
  - nginx 컨테이너의 80번 포트를 호스트 127.0.0.1 IP의 80번 포트와 연결하여 실행
- docker run -d -p 80 nginx
  - nginx 컨테이너의 80번 포트를 호스트의 사용 가능한 포트와 연결하여 실행
  - 호스트의 port 번호가 특정되지 않고 컨테이너의 포트번호를 80번으로 특정

- docker run -d -p 3000:3000 --name metabase metabase/metabase
- docker run --name nginx -p 80:80 -p 443:443 -it -d nginx

- docker network ls
- docker network inspect bridge
- 리눅스 계열에서 Host machine에 생성된 Docker0 확인: ip link
- Docker Network 공식 문서 보기: Bridge, Host, None, Overlay, 3rd-Party Plugins
- Bridge, Host, None: 단일 호스트에서 동작
- Overlay: 멀티호스트. 오케스트레이션 시스템에서 많이 사용. Docker S warm
- Bridge: 포트를 연결하고 외부에 노출하는 방식
- None: 해당 컨테이너가 네트워크 기능이 필요 없거나 커스터마이징이 필요할 때 사용
- Host: 가상 네트워크 사용하지 않고 호스트 네트워크에 붙어서 사용. 호스트 바인딩하지 않아도 바로 접속 가능. grafana 이미지는 기본으로 3000번 포트 사용
- Bridge: 

# expose vs. publish ?? 설명 부족
- docker run -d --expose 80 --name nginx-expose nginx



# docker volume
- 호스트나 도커 볼륨 주로 사용
## 호스트 볼륨
- 호스트의 디렉토리를 컨테이너의 특정 경로에 마운트
- docker run -d --name nginx -v /opt/html:/usr/share/nginx/html nginx

- 실습 코드
  - docker run -d -it ubuntu:focal
  - docker exec -it angry_lehmann bash
  - cat > hello
  - exit
  - docker rm -f c73
  - docker run -d -it ubuntu:focal
  - docker exec -it angry_lehmann bash
    - 이렇게 해봤자 생성한 파일은 살아있지 않음

- docker run -d -v $(pwd)/html:/usr/share/nginx/html -p 80:80 nginx
  - 현재 경로의 html을 컨테이너의 /usr/share/nginx/html로 바인딩
  - 컨테이너에서 파일을 만들고 호스트에서 확인해보면 컨테이너 파일이 있음

## 볼륨 컨테이너
 - 특정 컨테이너의 볼륨 마운트를 공유할 수 있음
 ``` sh
 docker run -d --name my-volume -it -v /opt/html:/usr/share/nginx html ubuntu:focal
 docker run -d --name nginx --volumes-from my-volume nginx
 ```

 ![alt text](../images/Docker/volume-container.png)

 - 실습코드
``` sh
docker run \ 
-d \ 
-it \ 
-v $(pwd)/html:usr/share/nginx/html \ 
--name web-volume \ 
ubuntu:focal

docker run \ 
--name fastcampus-nginx \ 
--volumes-from web-volume \ 
-p 80:80 \ 
nginx

# 첫번째 명령에서 web-volume을 생성해서 
# 아래 두 개의 nginx의 Storage로 바인딩하고 있음
docker run \ 
-d \ 
--name fastcampus-nginx2 \ 
--volumes-from web-volume \ 
-p 8080: 80 \ 
nginx

```

## 도커 볼륨
- 도커가 제공하는 볼륨 관리 기능을 활용하여 데이터를 보존
- 기본적으로 /var/lib/docker/volumes/${volume-name}/_data에 데이터가 저장
``` sh
# db 도커 볼륨 생성
docker volume create --name db

# 도커의 db 볼륨을 mysql의 /var/lib/mysql 경로로 마운트
docker run -d \ 
--name fastcampus-mysql  \
-v db:/var/lib/mysql \ 
-p 3306:3306 \ 
mysql:5.7

docker volume inspect db

# 사용 중이면 제거 안됨 → 컨테이너 모두 제거 후 재실행해야 함
docker volume rm db 
```

## 읽기전용 볼륨 연결
- docker run -d \ --name nginx \ -v web-volume:/usr/share/nginx/html:ro \ nginx
- docker exec ro-nginx touch /usr/share/nginx/html/text
  - Read-only file system이라고 에러 메시지가 뜸

# docker log
## STDOUT / STDERR
- STDOUT, STDERR 표준으로 출력
## 로그 확인하기
- 전체 로그 확인
  - docker logs [container]
- 마지막 로그 10줄 확인
  - docker logs --tail 10 [container]
- 실시간 로그 스트림 확인
  - docker logs -f [container]
- 로그마다 타임스탬프 표시
  - docker logs -f -t [container]

## 로그 확인하기
``` sh
- cat /var/lib/docker/containers/${CONTAINER_ID}/${CONTAINER_ID}-json.log
```

## 로그 용량 제한하기
- 컨테이너 단위로 로그 용량 제한을 할 수 있지만, 도커 엔진에서 기본 설정을 진행할 수 있음 
- 운영 환경 필수 설정

- 한 로그 파일당 최대 크기를 3MB로 제한하고, 최대 로그 파일 3개로 로테이팅
``` sh
docker run \ 
-d \ 
--log-driver=json-file \ 
--log-opt max-size=3m \ 
--log-opt max-file=5 \ 
nginx
```

- 도커 로그 드라이버
![alt text](../images/Docker/log-driver.png)


# 도커 이미지 다루기
## 도커 이미지 구조


## docker commit
- docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]
- ubuntu 컨테이너의 현재 상태를 my_ubuntu:v1 이미지로 생성
``` sh
docker commit -a fastcampus -m "First Commit" ubuntu my_ubuntu:v1
docker run -it --name my_ubuntu ubuntu: focal
docker commit -a fastcampus -m "Add my_file" my_ubuntu my-ubuntu:v1
docker image inspect my-ubuntu
docker image inspect ubuntu:focal
 ```

 ## Dockerfile 이용하여 이미지 생성
- Dockerfile을 기반으로 새 이밎 생성
- ./ 디렉토리를 비륻 컨텍스트로 my_app:v1 이미지 빌드 (Dockerfile 이용)
  - docker build -t my_app:v1 ./
- ./ 디렉토리를 빌드 컨텍스트로 my_app:v1 이미지 빌드 (example/MyDockerfile 이용)
  - docker build -t my_app:v1 -f example/MyDockerfile ./
- Dockerfile Example1 <br>
``` sh
FROM node:12-alpine
RUN apk add --no-cache python3 g++ make
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]
```
- Dockerfile Example2
``` sh
FROM node:16
LABEL maintainer="FastCampus Park <fastcampus@fastcampus.com>"
LABEL description="Simple server with Node.js"
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . # 현재 디렉토리의 모든 것을 복사. 소스코드의 변경사항 등.
EXPOSE 8080
CMD ["node", "server.js"]
```

## 빌드 컨텍스트
- 도커 빌드 명령 수행 시 현재 디렉토리(Current Working Directory)를 빌드 컨텍스트라고 함
- Dockerfile로부터 이미지 빌드에 필요한 정보를 도커 데몬에게 전달하기 위한 목적

## .dockerignore
- .gitignore와 동일한 문법을 가짐
- 특정 디렉토리 혹은 파일 목록을 빌드 컨텍스트에서 제외하기 위한 목적 

``` sh
# comment
*/temp*
*/*/temp*
temp?
*.md
!README.md
```

## 이미지 압축파일로 저장
- 이미지를 tar 압축파일로 저장
- 인터넷 안 되는 환경에서 사용하기 용이
``` sh
# docker save -o [OUTPUT-FILE] IMAGE
# ubuntu:focal 이미지를 ubuntu_focal.tar 압축 파일로 저장
docker save -o ubuntu_focal.tar ubuntu:focal

# docker load -i [INPUT-FILE]
# ubuntu_focal.tar 압축 파일에서 ubuntu:focal 이미지 불러오기
docker load -i ubuntu_focal.tar
```

# 도커허브를 이용한 컨테이너 관리
- [도커허브](hub.docker.com)
``` sh
docker login -u zhwan85
cat /home/ubuntu/.docker/config.json # → 키값 확인. 안전하게 보관.
docker tag nginx:latest claudpark/my-nginx:v1.0.0
docker images
docker push claudpark/my-nginx:v1.0.0
docker rmi claudpark/my-nginx:v1.0.0
docker pull claudpark/my-nginx:v1.0.0
```

## AEC(Amzon Elastic Container)
- ECR 저장소. 도커 컨테이너 관리.
``` sh
aws sts get-caller-identity
aws ecr... 복사해서 사용
```

## 이미지 경량화
``` sh
# slacktee
# build:
#   docker build --force-rm -t slacktee .
# run:
#   docker run --rm -it --name slacktee slacktee

FROM alpine:3.14
LABEL maintainer="FastCampus Park <fastcampus@fastcampus.com>"
LABEL description="Simple utility to send slack message easily."

# Install needed packages
# 불필요한 캐시를 남기지 않는 것을 고려해야 함
RUN \
  apk add --no-cache bash curl git && \
  git clone https://github.com/course-hero/slacktee /slacktee && \
  pak del --no-cache git
RUN chmod 755 /slacktee/slacktee.sh

# Run
WORKDIR /slacktee
ENTRYPOINT ["/bin/bash", "-c", "./slacktee.sh"]
```

- 경량 베이스 이미지 선택
- node.js 16-slim, 16, 16-alpine → 용량 차이가 남
``` sh
# nodejs-server
# build:
#   docker build --force-rm -t nodejs-server .
# run:
#   docker run --rm -it --name nodejs-server nodejs-server

FROM node:16-slim
LABEL maintainer="FastCampus Park <fastcampus@fastcampus.com>"
LABEL description="Simple server with Node.js"

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "server.js"]
```

``` sh
docker build --force-rm -t nodejs-server:slim -f Dockerfile.slim .
```

``` sh
# nodejs-server
# build:
#   docker build --force-rm -t nodejs-server .
# run:
#   docker run --rm -it --name nodejs-server nodejs-server

FROM node:16-alpine
LABEL maintainer="FastCampus Park <fastcampus@fastcampus.com>"
LABEL description="Simple server with Node.js"

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "server.js"]
```

``` sh
docker build --force-rm -t nodejs-server:alpine -f Dockerfile.alpine .
```

- 멀티 스테이지
- 의존성 많아질수록 더 큰 효과를 누릴 수 있음
``` bash
# nodejs-server
# build:
#   docker build --force-rm -t nodejs-server .
# run:
#   docker run --rm -it --name nodejs-server nodejs-server

FROM node:16-alpine AS base
LABEL maintainer="FastCampus Park <fastcampus@fastcampus.com>"
LABEL description="Simple server with Node.js"

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

FROM base AS build
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

FROM base AS release
COPY --from=build /app/node_modules ./node_modules
# build 스테이지에서 node_modules 복사

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "server.js"]
```

``` bash
docker build --force-rm -t nodejs-server:alpine-multi -f Dockerfile.alpine-multi .
docker images
```


## 도커 데몬 디버깅
``` bash
docker system
docker system info
docker system events -h
docker events -h # alias
docker system events # Streaming log 확인 가능
docker events

# Shell 새로 띄워서 아래 명령어 치면 events 동작 중인 곳에서 로그 확인 가능
docker run --name my-nginx nginx:latest
```

``` bash
# Ubuntu에서는 아래 명령어러 도커 이벤트 확인 가능
$ journalctl
```

``` bash
# 이미지가 어떻게 볼륨을 사용하고 있는지 확인 가능
# RECLAIMABLE 회수할 수 있는 자원
docker system df 
docker system df  -v  # 자세한 값 확인 가능
docker system prune # 쓸모 없는 것들 제거. 저장 공간 확인
docker stats # 각 컨테이너별 컴퓨팅 자원 사용현황 확인 가능

docker run -it -d mysql:5.7
docker run -it -d nginx
docker run -it -d ubuntu
docker stats
```

## 도커 컴포즈: 명시적으로 여러 컨테이너 관리하기
- 도커 컴포즈(Docker Compose)
  - 단일 서버에서 여러 컨테이너를 프로젝트 단위로 묶어서 관리
  - docker-compose.yaml YAML 파일 통해 명시적 관리
  - 프로젝트
    - 도커 컴포즈에서 다루는 워크스페이스 단위
    - 함께 관리하는 서비스 컨테이너 묶음
    - 프로젝트 단위로 기본 도커 네트워크 생성
  - 서비스
    - 도커 컴포즈에서 컨테이너를 관리하기 위한 단위
    - scale을 통해 서비스 컨테이너의 수 확장 가능
  - 컨테이너
    - 서비스를 통해 컨테이너 관리
  - 도커 스왐(Docker Swarm)
    - 여러 서버를 기반으로 스왐 클러스터를 형성하여 컨테이너를 관리하는 컨테이너 오케스트레이션 시스템
    - 쿠버네티스와 동일한 목적으로 만들어졌지만 인기를 끌지는 못함

``` python
import redis
from flask import Flask

app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)

def get_hit_count():
  retries = 5
  while True:
    try:
      return cache.incr('hits')
    except redis.exceptions.ConnectionError as exc:
      if retries == 0:
        raise exc
      retries -= 1
      time.sleep(0.5)

@app.route('/')
def hello():
  count = get_hit_count()
  return 'Hello World! I have been seen {} times.\n'.format(count)
```

``` bash
FROM python:3.7-alpine
WORKDIR /code
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 5000
COPY . .
CMD ["flast", "run"]
```

``` yaml
version: "3.9"
services:
  web:
    build: .
    ports:
    - "5000"
  redis:
    image: "redis:alpine"
```

``` bash
docker-compose
docker-compose version

# 생성 시 브릿지 네트워크가 default로 생성됨 "build_default" > 프로젝트명 없으면 기본으로 들어가는 이름
# build_web1 > build: 프로젝트명, web1: 서비스명
docker-compose up  
docker-compose -p my-project up -d # -p: 프로젝트명 변경, -d: 백그라운드 모드
docker-compose ls
docker-compose ls -a # -a: all

# 프로젝트 내 컨테이너 및 네트워크 종료 및 제거
docker-compose down 

# 프로젝트 내 컨테이너, 네트워크 및 볼륨 종료 및 제거 (볼륨까지 제거)
docker-compose down -v
```


``` yaml
# wordpress

version: '3.9'
sevices:
  db:
    image: mysql:5.7
    volumes:
    - db:/var/lib/mysql
    restart: always  # 컨테이너가 실패하는 경우 재시작
    environment:
    - MYSQL_ROOT_PASSWORD=wordpress
    - MYSQL_DATABASE=wordpress
    - MYSQL_USER=wordpress
    - MYSQL_PASSWORD=wordpress
    networks:
    - wordpress
  
  wordpress:
    depends_on:
    -db
    image: wordpress:latest
    ports:
    - "8000:80"
    restart: always
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_DB_NAME: wordpress
    networks:
    - wordpress

  volumes:
    db: {}
  
  networks:
    wordpress: {} # 옵션 주지 않으면 bridge로 기본 사용
```

``` bash
docker-compose up -d
docker-compose down
docker-compose down -v
```

``` bash
# web 서비스를 3개로 확장
docker-compose up --scale web=3
```
``` yaml
version: "3.9"
services:
  web:
    build: .
    ports:
    - "5000"
  redis:
    image: "redis:alpine"
```
- scale 시 Host 포트, 컨테이너 네임 충돌할 수 있음
``` bash
docker-compose -p my-project ps
docker-compose -p my-project up --scale web=3 -d
docker-compose -p my-project ps
```
``` bash
docker-compose -p my-project logs
docker-compose -p my-project logs -h

# Streaming 형식
docker-compose -p my-project logs -f 

# 다른 터미널에서 진행되는 컴포즈 진행 현황 확인
docker-compose -p my-project logs events 

# 스케일 다운
docker-compose -p my-project up --scale web=1 -d

# 프로젝트 내 이미지 목록
docker-compose -p my-project images

# 프로젝트 내 컨테이너 목록
docker-compose -p my-project ps

# 프로젝트 실행중인 프로세스 목록
docker-compose -p my-project top

```

## 도커 컴포즈 사용 목적
- 로컬 개발 환경 구성
  - 특정 프로젝트의 로컬 개발 환경 구성 목적으로 사용
  - 프로젝트의 의존성(Redis, MySQL, Kafka 등)을 쉽게 띄울 수 있음
- 자동화된 테스트 환경 구성
  - CI/CD 파이프라인 중 쉽게 격리된 테스트 환경을 구성하여 테스트 수행 가능
- 단일 호스트 내 컨테이너를 선언적 관리
  - 단일 서버에서 컨테이너를 관리할 때 YAML 파일을 통해 선언적으로 관리 가능

# Grafana 도커 가이드
- Docker 공식 이미지 확인하기
# MySQL 도커 가이드
- Docker 공식 이미지 확인하기

# 도커 컴포즈 실습
## Grafana 도커 컴포즈
- 아래는 기본적으로 SQLite DB 사용
``` yaml
version: '3.9'

services:
  grafana:
    image: grafana/grafana:8.2.2
    restart: unless-stopped  # 서버가 재시작 되더라도 도커 컨테이너를 다시 띄움
    environment:
      GF_INSTALL_PLUGINS: grafana-clock-panel
    ports:
    - 3000:3000
    volums:
    - ./files/grafana.ini:/etc/grafana/grafana.ini:ro # Grafana 컨테이너가 기본적으로 불러들이는 Grafana 설정 파일(ro옵션. ReadOnly). 여기서 port, ip 지정 가능. db 옵션도 있음
    - grafana-data:/var/lib/grafana
    logging:
      driver: "json-file"
      options:
        max-size: "8m"
        max-file: "10"

volumes:
  grafana-data: {}
```

``` bash
docker-compose up -d
docker-compose ps
curl localhost:3000
ec2metadata # EC2의 경우.
docker-compose down -v # 볼륨까지 제거
```

- 3000번 포트로 브라우저(그라파나)로 들어가가서 계정 admin/admin 입력

``` yaml
version: '3.9'

services:
  db:
    image: mysql:5.7
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: grafana
      MYSQL_DATABASE: grafana
      MYSQL_USER: grafana
      MYSQL_PASSWORD: grafana
    volumes:
    - mysql-data:/var/lib/mysql
    logging:
      driver: "json-file"
      options:
        max-size: "8m"
        max-file: "10"
  
  grafana:
    depends_on:
    - db
    image: grafana/grafana:8.2.2
    restart: unless-stopped  # 서버가 재시작 되더라도 도커 컨테이너를 다시 띄움
    environment:
      GF_INSTALL_PLUGINS: grafana-clock-panel
    ports:
    - 3000:3000
    volums:
    - ./files/grafana.ini:/etc/grafana/grafana.ini:ro # Grafana 컨테이너가 기본적으로 불러들이는 Grafana 설정 파일(ro옵션. ReadOnly). 여기서 port, ip 지정 가능. db 옵션도 있음
    - grafana-data:/var/lib/grafana
    logging:
      driver: "json-file"
      options:
        max-size: "8m"
        max-file: "10"

volumes:
  mysql-data: {}
  grafana-data: {}
```
``` ini
[database]
type = mysql
host = db:3306
name = grafana
user = grafana
password = grafana
```
``` bash
docer-compose up -d
docker-compose ps
docker-compose down # 해도 살아있음. 비번 바꾼 후 껐다 켜도 바뀐 정보 유지됨
docker volume ls
docker-compose up -d
docker-compose ps
```


# Docker MariaDb 설치 및 외부 접속 허용

- Docker mariadb 설치 및 실행
```bash
docker pull mariadb
docker run -p 3306:3306 --name hobby_mariadb -e MARIADB_ROOT_PASSWORD=1234 -d mariadb
```

- 컨테이너 접속
```bash
# docker exec -it [컨테이너 아이디] bash
docker exec -it 714c bash
```


- vim 사용을 위해 아래 코드 실행하여 vim 설치
```bash
apt update
apt upgrade
apt install vim
```

- 외부접속 허용을 위해 다음 파일 내용 수정
- /etc/mysql/mariadb.conf.d/50-server.cnf
```bash
# 아래 주석 푼 후 0.0.0.0으로 변경
bind-address = 0.0.0.0
```

- 컨테이너 재시작
```bash
hdocker restart hobby_mariadb
```
