---
title: GitHub Actions를 활용한 AWS SAM 배포 자동화
date: 2025-05-17
tags: GitHub Actions, AWS, CI/CD, SAM, Spring Boot
---

## ✅ 문제점

- 기존 AWS SAM 배포 방식은 형상 관리(Git)와 배포 작업이 분리되어 관리가 복잡함
- 배포를 위한 소스 코드가 이원화될 경우, 버전 불일치로 인해 문제 발생 가능성 존재

## ✅ 해결 방법: GitHub Actions를 통한 자동 배포 파이프라인 구축

1. **.github/workflows/deploy.yml** 생성  
2. GitHub Secrets에 AWS 인증 정보 등록  
3. GitHub Actions를 통해 **main** 브랜치에 Push 시 자동으로 SAM을 통해 배포 수행  

---

## 🔧 GitHub Actions 설정 예시

```yaml
name: Deploy Spring Boot to Lambda via SAM

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout source
        uses: actions/checkout@v3

      - name: Set up Java
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'temurin'

      - name: Grant execute permission for gradlew
        run: chmod +x ./gradlew

      - name: Build with Gradle
        run: ./gradlew build

      - name: Install AWS SAM CLI
        uses: aws-actions/setup-sam@v2

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ap-northeast-2

      - name: SAM Build
        run: sam build

      - name: SAM Deploy
        run: |
          sam deploy --no-confirm-changeset --no-fail-on-empty-changeset \
            --stack-name kkennibApp \
            --capabilities CAPABILITY_IAM \
            --region ap-northeast-2
````

* **주의:** 위 설정을 사용하려면 GitHub 저장소에서 **Settings > Secrets and variables > Actions** 경로에 다음 정보를 등록해야 함

  * **AWS_ACCESS_KEY_ID**
  * **AWS_SECRET_ACCESS_KEY**

---

## 🔐 보안 정보 관리: AWS Secrets Manager 활용

* 기존 **application.yml**에 직접 DB 정보를 작성하는 방식은 보안상 취약함

```yaml
spring:
  datasource:
    url: jdbc:postgresql://...:...
    username: ...
    password: ...
```

* 대신, 보안 정보는 **AWS Secrets Manager**에 저장하고 런타임에 불러오는 방식 사용

* PostgreSQL을 사용한다면 "기타 데이터베이스" 유형으로 Secrets 생성

<img src="/images/dev/dev-26-1.png" />

<img src="/images/dev/dev-26-2.png" />

### 💰 비용

| 항목             | 가격         |
| -------------- | ---------- |
| 보안 정보 1건 저장    | \$0.40 / 월 |
| API 호출 10,000건 | \$0.05     |

> 💡 보안사고 예방 및 유지보수 시간 절감을 고려하면 충분히 투자할 가치가 있음

---

## ☕ Spring Boot에서 AWS Secrets Manager 사용 예시

### 📄 **AwsSecretsManagerConfig.java**

```java
@Configuration
public class AwsSecretsManagerConfig {

    @Bean
    public SecretsManagerClient secretsManagerClient() {
        return SecretsManagerClient.builder()
                .region(Region.AP_NORTHEAST_2)
                .build();
    }
}
```

### 📄 **DataSourceConfig.java**

```java
@Configuration
public class DataSourceConfig {

    private final SecretsManagerService secretsManagerService;

    public DataSourceConfig(SecretsManagerService secretsManagerService) {
        this.secretsManagerService = secretsManagerService;
    }

    @Bean
    public DataSource dataSource() {
        Map<String, String> secrets = secretsManagerService.getSecret("보안키이름");

        String url = String.format("jdbc:postgresql://%s:%s/%s",
                secrets.get("host"),
                secrets.get("port"),
                secrets.get("dbname"));

        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(url);
        config.setUsername(secrets.get("username"));
        config.setPassword(secrets.get("password"));
        config.setDriverClassName("org.postgresql.Driver");

        return new HikariDataSource(config);
    }
}
```

---

## 🗃️ DynamoDB 접근 설정: IAM 기반 접근

* 설정 파일에 Key를 직접 쓰지 않고, **DefaultAWSCredentialsProviderChain**을 통해 IAM 역할을 위임

### 📄 **AWSDynamoDBConfig.java**

```java
@Configuration
public class AWSDynamoDBConfig {

    @Value("${cloud.aws.dynamodb.endpoint}")
    private String awsDynamoDBEndPoint;

    @Value("${cloud.aws.region.static}")
    private String awsRegion;

    @Bean
    public DynamoDBMapper dynamoDBMapper() {
        return new DynamoDBMapper(buildAmazonDynamoDB());
    }

    private AmazonDynamoDB buildAmazonDynamoDB() {
        return AmazonDynamoDBClientBuilder
                .standard()
                .withEndpointConfiguration(
                    new AwsClientBuilder.EndpointConfiguration(
                        awsDynamoDBEndPoint, awsRegion))
                .withCredentials(DefaultAWSCredentialsProviderChain.getInstance())
                .build();
    }
}
```

---

## ✅ 정리

| 항목        | 적용 내용                                          |
| --------- | ---------------------------------------------- |
| CI/CD 자동화 | GitHub Actions로 **main** 브랜치 Push 시 SAM 배포 자동 실행 |
| 보안        | AWS Secrets Manager로 DB 정보 및 보안 키 관리           |
| 코드 일관성    | 배포와 형상관리 통합 → 버전 충돌 방지                         |
| 보안 유지     | IAM 및 CredentialsProviderChain을 활용한 보안 권한 위임   |

> 이 구조는 개인 프로젝트는 물론 팀 프로젝트 및 기업 환경에서도 적용할 수 있는 안전하고 유연한 배포 구조임
