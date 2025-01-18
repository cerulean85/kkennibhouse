---
title: Git 명령어 정리
date: 2024-06-30
tags: Git
---

- [Git 저장소](#git-저장소)
  - [origin master](#origin-master)
- [Git 명령어](#git-명령어)
  - [스태시](#스태시)
    - [스태시 저장](#스태시-저장)
    - [스태시 내용 확인](#스태시-내용-확인)
    - [스태시 불러오기](#스태시-불러오기)
    - [스태시 제거](#스태시-제거)
  - [로그](#로그)
    - [기본 조회](#기본-조회)
    - [시간 기준 조회](#시간-기준-조회)
    - [요약 조회](#요약-조회)
    - [포맷 지정 조회](#포맷-지정-조회)
    - [아스키 그래프 조회](#아스키-그래프-조회)
  - [diff](#diff)
    - [Unstaged된 파일 비교](#unstaged된-파일-비교)
    - [Staging Area에 있는 파일 비교](#staging-area에-있는-파일-비교)
    - [브랜치간 비교](#브랜치간-비교)
    - [커밋 간 비교](#커밋-간-비교)
    - [커밋 사이를 비교](#커밋-사이를-비교)
  - [gitignore](#gitignore)
    - [작성 패턴](#작성-패턴)
    - [.gitignore 작성 예시](#gitignore-작성-예시)
  - [브랜치](#브랜치)
    - [생성](#생성)
    - [추가](#추가)
    - [병합](#병합)
    - [삭제](#삭제)
    - [사용예시](#사용예시)
  - [되돌리기](#되돌리기)
    - [특정 파일 되돌리기](#특정-파일-되돌리기)
    - [모두 되돌리기](#모두-되돌리기)
  - [HEAD 위치 변경](#head-위치-변경)
    - [reset](#reset)
  - [Tag](#tag)
    - [Lightweight 태그](#lightweight-태그)
    - [Annotated 태그](#annotated-태그)
    - [올리기](#올리기)
    - [삭제](#삭제-1)
  - [Cherry Pick](#cherry-pick)
    - [충돌 해결 후 재진행](#충돌-해결-후-재진행)
    - [중단](#중단)
    - [병합](#병합-1)
  - [Merge](#merge)
    - [Fast-Forward](#fast-forward)
    - [Recursive](#recursive)
    - [Squash \& Merge](#squash--merge)
    - [Rebase \& Merge](#rebase--merge)
    - [병합 취소](#병합-취소)
  - [참고한 사이트](#참고한-사이트)




# Git 저장소
## origin master
- origin: Remote Repo(Repository)의 URL에 대한 alias
- Remote Repo를 처음 생성하면 자동으로 별칭 origin, 초기 상태 브랜치 master가 만들어짐
- origin/master: Remote Repo의 master 브랜치
- master: 지역저장소의 브랜치
```bash
# Remote Repo에 master 브랜치를 생성하고,
# Local Repo의 master 브랜치 내용을 Remote Repo의 master 브랜치에 보냄
git push -u origin master

# Remote Repo의 origin/master의 내용을 Local Repo의 master로 Fetch
git fetch origin master

```
- Local Repo인 develop의 Remote Repo가 origin/develop이라 할 때,
  - origin/develop의 HEAD가 develop 보다 위에 있으면 Local Repo가 최신화 되지 않았음을 의미함 ▶ pull 땡기면 같아짐

# Git 명령어
## 스태시
- 진행중인 현재 Task에 대한 파일 변경 내용을 임시로 기록하는 영역
- 진행 중인 현재의 Task와는 연관성이 떨어지는 다른 Task가 발생하였을 때 현재 Task를 임시로 저장하는 용도로 사용
- [참고사이트](https://mine-it-record.tistory.com/651)

### 스태시 저장
``` bash
git stash push -m "message"
git stash save "message"
git stash # Save 생략
```

### 스태시 내용 확인
- 저장된 Task 목록 확인
``` bash
git stash show
git stash show -p
git stash show stash@{인덱스번호} # stash@{2}에서 2는 index를 의미 stash@{index}
git stash show stash@{인덱스번호} -p  # -p 상세한 내용 확인

git stash list
git stash clear
git stash pop
```

### 스태시 불러오기
- Pop
  - git stash pop stash@{인덱스번호}
  - 인덱스번호 지정하지 않으면 최근 저장된 Task를 불러옴
  - Task를 불러온 후 해당 Task는 목록에서 사라짐
``` bash
git stash pop
git stash pop stash@{인덱스번호}
```
- Apply
  - git stash apply stash@{인덱스번호}
  - Task를 불러온 후에도 해당 Task는 목록에 유지됨

``` bash
$ git stash apply
$ git stash apply stash@{인덱스번호}
```
- --index 옵션
  - 스태시 영역에 올라간 파일의 상태까지 불러옴
``` bash
git stash pop --index
git stash apply --index
```

### 스태시 제거
- git stash drop [stash@{index}]
- index 생략시 최근 Task만 삭제
``` bash
git stash drop
git stash drop stash@{인덱스번호}

# 목록 모두를 삭제
git stash clear
```

## 로그
### 기본 조회
``` bash
# 커밋 이력 상세 조회
git log

# 커밋 이력 중 커밋 ID와 타이틀 메시지만 조회
git log --oneline

# 모든 브랜치 커밋 이력 조회
git log --oneline --decorate --graph --all

# 특정 파일의 변경 커밋 조회
git log --index.html

# diff 를 보여줌
git log -p

# 최근 두 개의 diff를 보여줌
git log -p -2
```

### 시간 기준 조회
- 시간을 기준으로 특정 시점 이후에 생성된 커밋만 보여줌
```bash
git log --since=2.weeks
git log --since="2 years 1 day 3 minutes ago"
```

### 요약 조회
- 파일의 변경/추가/삭제 되었는지 요약
```bash
git log --stat
```

### 포맷 지정 조회
- 출력 내용 Commit 체크섬과 메시지만 출력
```bash
git log --pretty=oneline
# git log --pretty=oneline 출력 예시
# -------------------------------------------------------------
# ca82a6dff817ec66f44342007202690a93763949 changed the version number
# 085bb3bcb608e1e8451d4b2432f8ecbe6306e7e7 removed unnecessary test
# a11bef06a3f659402fe7563abf99ad00de2209e6 first commit
# -------------------------------------------------------------
```
- 출력  포맷 정의
```bash
git log --pretty=format:"%h - %an, %ar : %s" 
# --pretty=format:"%h - %an, %ar : %s"  출력 예시
# -------------------------------------------------------------
# ca82a6d - Scott Chacon, 6 years ago : changed the version number
# 085bb3b - Scott Chacon, 6 years ago : removed unnecessary test
# a11bef0 - Scott Chacon, 6 years ago : first commit
# -------------------------------------------------------------
```
  - 자주 쓰는 출력 포맷
    - **%H**: 커밋 해시
    - **%h**: 짧은 길이 커밋 해시
    - **%T**: 트리 해시
    - **%t**: 짧은 길이 트리 해시
    - **%P**: 부모 해시
    - **%p**: 짧은 길이 부모 해시
    - **%an**: 저자 이름
    - **%ae**: 저자 메일
    - **%ad**: 저자 시각. 형식은 –-date=옵션 참고
    - **%ar**: 저자 상대적 시각
    - **%cn**: 커밋한 사람(커미터) 이름
    - **%ce**: 커미터 메일
    - **%cd**: 커미터 시각
    - **%cr**: 커미터 상대적 시각
    - **%s**: 요약
 
### 아스키 그래프 조회
- --graph는 아스키 그래프 보여줌
  - 브랜치 여러 개일 때 직관적으로 이해할 수 있음
```bash
git log --pretty=format:"%h %s" --graph
```

## diff
### Unstaged된 파일 비교
```bash
git diff
```

### Staging Area에 있는 파일 비교
- git add로 변경사항을 추가하였다면 이것으로 비교해야 됨
```bash
git diff --staged
git diff --cached
```

### 브랜치간 비교
``` bash
git diff [브랜치명1] [브랜치명2]
git diff [브랜치명1] origin[브랜치명2]
```

### 커밋 간 비교
커밋 해시값은 git log로 확인 가능
```bash 
# git diff 531c1d06412a57ef050d6372e36d6921169495f4 af35084e7f9fce61ddcede3545f56802b30f3d62
git diff [커밋 해시값1] [커밋 해시값2]
```

### 커밋 사이를 비교
```bash
# git diff 531c1d06412a57ef050d6372e36d6921169495f4...af35084e7f9fce61ddcede3545f56802b30f3d62
git diff [커밋 해시값1]...[커밋 해시값2]
```

## gitignore
- .gitignore 파일에 적용
- 적용이 바로 안 되는 경우 ```git rm -r --cached .```

### 작성 패턴
- #로 시작하는 라인은 주석, 무시
- 표준 glob 패턴을 따름
- 디렉토리는 끝에 슬래시(/)를 사용해 표현
- 느낌표(!)로 시작하는 경우 예외로 처리

### .gitignore 작성 예시
```
# 파일 하나만 무시
fileName.txt

# 특정 디렉토리의 특정 파일 무시
fileDirectory/fileName.txt

# 특정 디렉토리의 모든 파일 무시
fileDirectory/

# 특정 확장자 가진 모든 파일 무시
*.txt

# 현재 경로의 fileName 무시
/fileName.txt

# 특정 경로의 모든 fileName 무시
fileDirectory/**/fileName.txt

# 예외
!fileName.txt

# 적용 안 되ㅏㄹ 때
git rm -r --cached .
```


## 브랜치
### 생성
``` bash
# 새 브랜치 생성하기
git branch [새로운 브랜치명]

# 생성된 브랜치로 전환하기
git checkout [새로운 브랜치명]
```

### 추가
- Remote Repo에 생성한 브랜치 추가
``` bash
# 파일 추가
touch new-file.js

# 수정사항 커밋
git add .
git commit -m "message"

# 생성한 브랜치에 최초 Push 할 때, git push로는 아래 메시지 발생
# fatal: The current branch master has no upstream branch.
# To push the current branch and set the remote as upstream#
# 아래 명령어로 새 원격 브랜치로 푸시
git push --set-upstream origin [새로운 브랜치명]

# 원격 브랜치로 Push
git push origin [새로운 브랜치명]
```

### 병합
- 모든 Remote Repo 가져오기
``` bash
git fetch origin
```
- 특정 브랜치들만 가져올 수 있음
``` bash
git fetch origin master stable oldstable
```
- 체크아웃 가능한 브랜치 목록 보기
  - 원격 브랜치에는 remotes/origin이라는 접두사가 붙음
``` bash
git branch -a
```
- -r: remotes를 줄여서 보여줌. Local Repo는 안 보여줌
``` bash
git branch -r
```
- Remote Repo 브랜치 변경이력 병함
  - 원격 브랜치에는 직접 작업할 수 없음
  - 변경사항 추가하기 위해서는 원격 브랜치의 복사본 필요
``` bash
# 1. [브랜치명]의 새로운 브랜치를 생성
# 2. 새 브랜치로 체크아웃
# 3. 변경 이력을 origin/[브랜치명]에서 가져옴
git checkout -b [새 브랜치명] origin/[브랜치명]
```
- 이후 커밋은 브랜치를 지정할 필요없이 git push 명령어로 실행 가능
``` bash
touch new-file.js
git add .
git commit -m "새 파일 추가"
git push
```
- Local Repo의 master 브랜치에서  Local Repo의 test 브랜치를 병합하려면,
``` bash
git checkout master
git merge test
```
- 여러 개의 브랜치 merge 가능
``` bash
# Local Repo의 master 브랜치에 origin/master, figure/v1.1, figure/v1.2, figure/v1.3 등의 4개 브랜치 병합
git checkout master
git merge origin/master figure/v1.1 figure/v1.2 figure/v1.3
```

### 삭제
``` bash
git branch -d [브랜치명]
```
- 원격 브랜치 삭제
``` bash
# git push <원격 저장소 이름> -d <원격 브랜치 이름>
# 예시
git push origin -d test2
git push origin -d feature/v1.8
```
- 강제 삭제(--delete --forece)를 위해서는 대문자D 입력 (-D)

### 사용예시
- Local Repo의 다른 브랜치로 체크아웃한 후 다시 돌아와도 내용 살아 있음
```bash
git checkout feature/v1.7
# 위의 브랜치로 체크아웃해서 내용을 변경하고

git checkout master
# 위의 브랜치로 체크아웃한 후

git checkout feature/v1.7
# 다시 돌아와도 feature/v1.7의 변경 내용은 살아있음
```
- 병합 예시
```bash
#master 브랜치에서 test 브랜치를 merge
git checkout master
git merge test
```

## 되돌리기
### 특정 파일 되돌리기
``` bash
git checkout -- [filename]
```
### 모두 되돌리기
``` bash
git restore .
```

## HEAD 위치 변경
### reset
- HEAD의 위치를 현재 커밋에서 과거나 미래로 이동할 수 있음
- reset 옵션: --soft, --mixed, --hard
  - -soft
    - HEAD가 특정 커밋(과거 또는 미래)을 새롭게 가리킴
    - working 디렉토리와 staging Area는 아무런 영향을 받지 않음
  - -mixed
    - staging area도 해당 커밋의 모습과 동일하게 변경
    - 현재 작업중인 working directory에 아무런 영향 받지 않음
  - -hard
    - staging area와 현재 작업 중인 working directory도 해당 커밋의 모습과 동일하게 변경

## Tag
### Lightweight 태그
- 특정 태그만 가리키는 역할만 함
``` bash
git tag v0.0.3
```
### Annotated 태그
- 태그 만든 사람, 이메일, 날짜, 메시지 저장
``` bash
git reset --hard origin/quality # Tag를 달고자 하는 Commit으로 HEAD 이동
git tag -a v0.0.3 -m "Build Version 0.0.3"  
```
### 올리기
``` bash
git push origin v0.0.3
```
### 삭제
``` bash
git tag -d v0.0.3
```

## Cherry Pick
- 다른 브랜치에 있는 커밋을 선택적으로 내 브린치에 적용시킬 때 사용하는 명령어
```bash
git cherry-pick <commit_hash_1> <commit_hash_2> ...
```
### 충돌 해결 후 재진행
- 충돌을 해결하고 cherry-pick 진행 <br>
  1. 충돌이 발생한 코드 수정
  2. ```git add <path>``` 명령어로 수정된 코드를 올림 (커밋 불필요)
  3. ```git cherry-pick --continue 명령어 사용하여 재진행```

### 중단
- ```git cherry-pick --abort``` 명령어로 체리픽 중단

### 병합
- Merge Commit을 cherry-pcik 하고 싶다면 다음 명령 사용
```bash
git cherry-pick -m 1 <merge_commit_hash>
```


## Merge
### Fast-Forward

<p align="center">
<img src="../images/git/merge_fast_forward.png" height="200" />
</p>

- main의 새로운 브랜치 my-branch가 분기된 후 main에 새로운 커밋이 없다면, my-branch가 main보다 최신의 브랜치
- Fast-Forward에서는 my-branch의 변경 이력을 그대로 main에 가져올 수 있음

### Recursive
<p align="center">
<img src="../images/git/merge_recursive.png" height="200" />
</p>

- my-branch가 분기된 후 main에 새로운 커밋이 생기면, my-bracnch와 main을 공통 부모로 새로운 Merge Commit이 생성
- Fast-Forward Merge가 가능한 상태에서 ```git merge``` 명령에 ```--no-ff``` 옵션을 주면 강제로 Merge Commit 생성

### Squash & Merge
<p align="center">
<img src="../images/git/merge_squash.png" height="200" />
</p>

- 여러 개의 커밋을 하나의 커밋으로 합침 
- 병합할 브랜치의 모든 커밋을 하나의 커밋으로 Squash한 후 새로운 커밋을 Base 브랜치에 추가하여 병합
- 모든 커밋 이력이 하나의 커밋으로 합쳐져 사라짐

```bash
git checkout main
git merge --squash my-branch
git commit -m "squash & merge"
```

### Rebase & Merge
<p align="center">
<img src="../images/git/merge_rebase.png" height="200" />
</p>

- my-branch가 main 브랜치의 A커밋에서 분기
- 이때 my-branch의 Base는 A 커밋
- 말 그대로 Base를 다시 설정하는 것으로, my-branch가 분기된 main의 최신 커밋으로 Base가 변경됨
- Rebase를 하면 커밋들의 Base가 변경되므로 Commit Hash가 변경될 수 있음
- Force Push를 해야 할 수도 있으니 주의

``` bash
git checkout my-branch
git rebase main
git checkout main
git merge my-branch
```
### 병합 취소
- 머지 작업 취소: ```git merge --abort```


## 참고한 사이트
https://mine-it-record.tistory.com/651
https://niklasjang.tistory.com/27
https://seonkyukim.github.io/git-tutorial/git-log/#google_vignette
https://www.freecodecamp.org/korean/news/git-remote-branch-checkout/
https://minsone.github.io/git/git-addtion-and-modified-delete-tag
https://jmjmjm.tistory.com/60
https://www.freecodecamp.org/korean/news/git-delete-local-or-remote-branch/
https://hudi.blog/git-merge-squash-rebase/
https://growingarchive.tistory.com/244