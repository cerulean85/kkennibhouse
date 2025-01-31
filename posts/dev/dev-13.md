---
title: "Aapache Kafka 설치"
date: "2024-12-27 00:00:00"
---

**요구사항**

- Ubuntu 18.04 LTS 이상
- Docker, Docker Compose

**도커 설치**

[[Docker] Ubuntu 18.04 도커 시작하기](https://soyoung-new-challenge.tistory.com/52)

**클러스터로 구성하려면 아래를 참고하자.**

[docker-compose를 이용하여 카프카 클러스터 구성하기](https://blog.naver.com/PostView.naver?blogId=sqlpro&logNo=222457487274&parentCategoryNo=7&categoryNo=&viewDate=&isShowPopularPosts=false&from=postView)

**여기서는 스탠드얼론으로 구성함**

[docker compose 로 kafka 서버 열어보기](https://www.kua.kr/86)

**docker-compose.yaml을 아래처럼 구성해주쟈.**

```jsx
$ mkdir /data/kafka && cd /data/kafka
$ vim docker-compose.yaml
```

```jsx
version: "3.8"
 
services:
  zookeeper:
    image: wurstmeister/zookeeper:3.4.6
    container_name: zookeeper
    ports:
      - "2181:2181"
 
  kafka:
    image: wurstmeister/kafka:2.13-2.7.0
    container_name: kafka
    environment:
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://211.195.9.228:9092
      KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:9092
      KAFKA_ADVERTISED_HOST_NAME: 211.195.9.228
      KAFKA_ADVERTISED_PORT: 9092
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_CREATE_TOPICS: "MC:1:1"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    ports:
      - "9092:9092"
    depends_on:
      - zookeeper
```

**시작해주쟈.**

```jsx
$ docker-compose up -d
$ docker-compose down ⇒ 중지
$ docker-compose logs -f ⇒ 로그확인
```

**테스트를 하기 위해 아래에 따라 모듈을 다운받자.**

```jsx
$ wget https://archive.apache.org/dist/kafka/2.7.1/kafka_2.13-2.7.1.tgz
$ tar xvzf [kafka_2.13-2.7.1.tgz](https://archive.apache.org/dist/kafka/2.7.1/kafka_2.13-2.7.1.tgz)
$ cd kafka_2.13-2.7.1.tgz
$ bin/kafka-topics.sh -create -zookeeper [localhost:2181](http://localhost:2181) -partitions 1 -topic test-topic
```

**토픽 생성하고 pub/sub하기**

```jsx
$ bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 4 --topic crawl
$ bin/kafka-console-consumer.sh --topic crawl_result --bootstrap-server localhost:9092 --from-beginning
$ bin/kafka-console-producer.sh --topic test --broker-list 211.195.9.228:9092
```

**참고 사이트**

- 카프카 명령어

[[kafka] 카프카 명령어 모음 Kafka Command Collection](https://pinggoopark.tistory.com/6)

- 카프카 파이썬 코드