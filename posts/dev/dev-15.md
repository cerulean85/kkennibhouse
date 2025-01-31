---
title: "Gitlab 설치 및 사용"
date: "2025-01-01"
---

# Gitlab

Gitlab 설치 및 기본적인 사용과 관련된 글입니다.

설치는 우분투(ubuntu)에서 진행합니다.

- 현재 Gitlab이 설치된 위치 ⇒ /data/
- 현재 Gitlab의 Root계정:  root // theimc#10!

### Context

이 매뉴얼에서는 다음의 내용을 제공합니다.

- docker install
- gitlab install
- gitlab-ctl 명령어
- root 비밀번호 변경
- 회원가입과 로그인
- git clone
- migrate to gitlab from github
- gitlab ssl 설정

# **Docker Install**

- 포트 개방

```jsx
//$ iptables -I INPUT 1 -p tcp --dport 8088 -j ACCEPT << 8088: HTTP
$ iptables -I INPUT 1 -p tcp --dport 80 -j ACCEPT << 80: HTTP
$ iptables –I INPUT 1 –p tcp --dport 8443 -j ACCEPT << 8443: HTTPS
$ iptables -I INPUT 1 -p tcp --dport 2222 -j ACCEPT << 2222: SSH
```

> 포트번호는 매뉴얼 작업 당시 임시로 부여한 것이므로 설치할 때 변경해도 됨
> 

`iptables -A OUTPUT -p tcp -m tcp --dport 80 -j ACCEPT`

### Docker 설치

[Ubuntu 20.04 에 Docker, Docker-Compose 설치하는 법](https://velog.io/@dailylifecoding/ubuntu-20.04-docker-and-dockercompose-install)

- Docker Repository 접근 위한 키 생성

```jsx
$ curl –fsSL [https://download.docker.com/linux/ubuntu/gpg](https://download.docker.com/linux/ubuntu/gpg) | sudo apt-key add –
```

- 패키지 매니저가 도커 실치할 때 설치 위치를 알도록 Repository 추가

```jsx
$ add-apt-repository ＂deb [arch=amd64] [https://download.docker.com/linux/ubuntu](https://download.docker.com/linux/ubuntu) $(lsb_release -cs) stable“
```

- Repository Update

```jsx
$ apt-get update
```

- Docker 설치

```jsx
$ apt-get install docker-ce docker-ce-cli [containerd.io](http://containerd.io/)
$ docker –v
```

- Docker sudo 없이 이용

```jsx
$ usermod -aG docker ${USER}
```

- docker-compose install

```jsx
$ curl -L "[https://github.com/docker/compose/releases/download/1.28.5/docker-compose-$](https://github.com/docker/compose/releases/download/1.28.5/docker-compose-$)(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

> 다운로드 진행률이 나타나지 않는다면 진행이 안 되는 것이니, 중간에 ‘-’이 누실되지 않게 주의할 것
> 

- 실행 권한 부여 및 버전 확인

```jsx
$ chmod +x /usr/local/bin/docker-compose
$ docker-compose -v
```

### Gitlab 설치

[Docker Compose로 GitLab 설치 | DevSecOps 구축 컨설팅, 교육, 기술지원 서비스 제공](https://insight.infograb.net/docs/setup/install/install_with_docker_compose/)

> root로 작업하기
> 

- 경로 생성

```jsx
$ mkdir /data/gitlab
$ mkdir /data/gitlab/config
$ mkdir /data/gitlab/data
$ mkdir /data/gitlab/logs
```

- 소유권 및 권한 변경

```jsx
$ chown -R $USER:$USER /data/gitlab
$ chmod -R 755 /data/gitlab
```

- docker-compose.yml 파일 준비

```jsx
$ cd /data/gitlab
$ touch docker-compose.yml && vim docker-compose.yml
```

- 다음 장의 내용을 docker-compose.yml에 추가하기

```jsx
version: '3.9'
services:
  gitlab:
    image: 'gitlab/gitlab-ee:15.2.2-ee.0'
    restart: always
    container_name: 'gitlab'
    hostname: 'theimc-gitlab' # hostname
    environment:
      GITLAB_OMNIBUS_CONFIG: |
        external_url 'http://[서버IP]' # 외부 ip 혹은 접근할 ip
        gitlab_rails['gitlab_shell_ssh_port'] = [포트]
        # Add any other gitlab.rb configuration here, each on its own line
      TZ: 'Asia/Seoul'
    ports:
      - '8088:80' # http 접근포트 
      - '8443:443' # https 접근포트 
      - '2222:22' # ssh 접근포트
    volumes:
      - '/data/config:/etc/gitlab'
      - '/data/logs:/var/log/gitlab'
      - '/data/data:/var/opt/gitlab'
```

> gitlab에는 ce와 ee버전이 있는데, 향후 확장성을 고려하여 매뉴얼에서는 ee버전을 설치함
> 

- docker-compose 조작

```jsx
$ docker-compose up -d
```

> 이게 끝났다고 즉시 gitlab이 서비스가 시작되지 않으며, 모든 세팅이 완료되기 위해서는 5~10분 정도 시간 필요
> 

```jsx
$ docker-compose logs -f
```

> 이걸로 로그 켜서 올라오는 거 확인하자
정상적으로 올라오면 http://[서버IP]:[HTTP(s)_PORT]에서 확인가능
> 

```jsx
$ docker-compose down  << docker-compose 내리기
$ docker-compose ps  << docker-compose 목록 확인
```

### root 비밀번호 변경

> 처음 실행하면 root 비번 바꿔야 한다.
컨테이너 접근 후 아래 사이트 참고하여 변경할 수 있음
> 

[Gitlab root 패스워드 변경 방법](https://wiki.tistory.com/entry/gitlab-root-password-reset)

[GitLab root 초기 비밀번호, 그리고 비밀번호 초기화](https://oingdaddy.tistory.com/369)

- docker 컨테이너 접근 및 gitlab-rails 콘솔 실행

```jsx
$ docker ps    << docker 컨테이너 목록 조회
$ docker exec –it [컨테이너ID] /bin/bash   << gitlab docker 컨테이너 진입
$ gitlab-rails console –e production
```

> 실행에 시간이 오래 걸릴 수도 있으니 참고 기다려주자.
실행이 완료되면 irb(main):001:0> 커맨드가 나타남
> 

- root 비밀번호 변경

```jsx
irb(main):001:0> user = User.where(id: 1).first
irb(main):002:0> user.password = 'new_password’ << 변경하고자 하는 비밀번호
irb(main):003:0> user.password_confirmation = 'new_password'
irb(main):002:0> user.save
irb(main):002:0> exit
```

```jsx
$ gitlab-ctl reconfigure
```

> 이거 안 하면 적용이 안 되니 꼭 하자!
> 

## gitlab-ctl 명령어

[GitLab 설정 파일 및 명령어](https://abc2080.tistory.com/entry/GitLab-%EC%84%A4%EC%A0%95-%ED%8C%8C%EC%9D%BC-%EB%B0%8F-%EB%AA%85%EB%A0%B9%EC%96%B4)

```jsx
$ gitlab-ctl reconfigure
```

> 설정 적용
> 

```jsx
$ gitlab-ctl restart
```

> 서비스 재시작
> 

```jsx
$ gitlab-ctl status
```

> 서비스 상태 확인
> 

```jsx
$ gitlab-ctl stop
```

> 서비스 중지
> 

```jsx
$ gitlab-ctl uninstall
```

> 서비스 삭제
> 

```jsx
$ gitlab-ctl appt-get autoremove gitlab-ce
```

> 서비스 삭제
> 

### 회원가입과 로그인

![Untitled](Gitlab%20e32a59b9c7884da3bf63ea89c5ff4821/Untitled.png)

> Register now에서 회원가입을 한다고 로그인을 바로 할 수 없음
관리자의 승인이 필요하니 회원가입 후에는 반드시 관리자에게 승인해 달라고 해야함
> 

> Clone with HTTP, Clone with SSH 둘 중 아무 주소를 이용해도 되지만,
매뉴얼 상에서 HTTP는 80포트로 gitlab 주소가 바인딩 되어 있지 않으므로, 포트번호 8088을 주소에 포함시켜줘야 됨
> 

> 예시) [http://xxx.xxx.xxx.xxx/zhwan85/test-proj.git](http://221.157.125.41/zhwan85/test-proj.git) => [http://](http://221.157.125.41:8088/zhwan85/test-proj.git)[xxx.xxx.xxx.xxx](http://221.157.125.41/zhwan85/test-proj.git)[:8088/zhwan85/test-proj.git](http://221.157.125.41:8088/zhwan85/test-proj.git)
> 

- 아래 이슈로 git clone 안 될 때는 서버의 공개키를 등록할 것

<aside>
💡 Warning: Permanently added '[…]:…' (ECDSA) to the list of known hosts.
[git@](mailto:git@221.157.125.41)…: Permission denied (publickey).
fatal: Could not read from remote repository. 
Please make sure you have the correct access rights and the repository exists.

</aside>

- 공개키 등록 방법

```jsx
$ cat ~/.ssh/id_rsa.pub
```

> 나타나는 키를 그대로 복사해서 gitlab 페이지 우측 상단의 **profile 클릭 > settings > SSH keys** 에 등록하자.
> 

```jsx
$ ssh-keygen  
```

> 키가 없으면 새로 생성해서 위의 명령어를 다시 실행하자.
> 

### Migrate to gitlab from github

1. 마이그레이션 할 github 계정에 로그인 후, 아래 주소에서 인증 토큰 생성

[Build software better, together](https://github.com/settings/tokens/new)

2. [New Project] > [Import Project] > [Github] 이동 후 위에서 생성한 토큰을 입력하면 아래와 같이 Repo 목록이 나타남

![Untitled](Gitlab%20e32a59b9c7884da3bf63ea89c5ff4821/Untitled%201.png)

> import가 완료되면 github의 프로젝트와는 별개의 프로젝트가 생성되므로, github의 프로젝트와 연동이 안됨
gitlab에 올린 프로젝트를 다시 git clone 하여 사용해야 됨!!
> 

### SSL 설정하기

- Let’s Encrypt SSL 발급 받기
- 우분투 스냅패키지를 이용한 certbot 설치 및 Let's Encrypt 발급 ([https://www.woobi.net/board2/476](https://www.woobi.net/board2/476))

```
$ snap install --classic certbot
$ certbot certonly --nginx -d console.textom.co.kr
```

- 도커 컨테이너 접근

```bash
docker exec -it gitlab bash
cd /etc/gitlab/ssl/
mv /etc/gitlab/ssl/certs/ ../
```

- 파일 수정 및 설정 적용

```bash
vi /etc/gitlab/gitlab.rb
gitlab-ctl reconfigure
```

- 수정 내용

```bash
external_url '[https://gitlab.](https://gitlab.pli.com/)textom.co.kr'
nginx['redirect_http_to_https'] = true
nginx['redirect_http_to_https_port'] = 80
nginx['ssl_certificate'] = "/etc/letsencrypt/live/gitlab.textom.co.kr/fullchain.pem"  #"/etc/gitlab/ssl/gitlab.crt"
nginx['ssl_certificate_key'] = "/etc/letsencrypt/live/gitlab.textom.co.kr/privkey.pem"  #"/etc/gitlab/ssl/gitlab.key
```

- SSL 갱신 및 gitlab 적용

```bash
certbot renew --pre-hook "nginx -s stop" --post-hook "nginx" --renew-hook="sudo systemctl restart nginx"
docker cp /etc/letsencrypt/ gitlab:/etc/
docker exec gitlab gitlab-ctl reconfigure
```