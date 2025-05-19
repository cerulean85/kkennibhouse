---
title: AWS SecretsManager 설정
date: 2025-05-17
tags: AWS SecretsManager
---
    

## 문제점

- 설정 파일에 AWS IAM 키 및 DB 접속 정보를 git에 업로드하면 해당 정보가 그대로 노출됨
- AWS IAM 키는 노출되는 순간 AWS에서 감지하여 폐기 처분시키므로 노출되어서는 안됨
g
- **.../src/main/resources/application.yml**

```bash
spring:
  servlet:
  ...
  datasource:
    url: jdbc:postgresql://...:.../...
    username: ..
    password: ...
    driver-class-name: org.postgresql.Driver
...
cloud:
  aws:
    credentials:
      access-key: ...
      secret-key: ...
    ...
```

- DB 접속 정보는 **AWS SecretesManager**에 저장
  - PostgreSQL를 사용한다면 기타데이터베이스를 선택


<img src="/images/dev/dev-26-1.png">

<img src="/images/dev/dev-26-2.png">


- **AWS Secrets Manager**는 유료서비스
  - 보안 정보 1건당 0.40$ 과금
  - API 호출 1만 건당 0.05$ 과금
  - 돈내고 쓸만한가? 그렇다. 보안정보 노출되면 시스템 불안정해지고, 그에 따른 불필요한 작업이 많아지는 상황을 예방할 수 있음

- **../src/main/java/.../config/AwsSecretsManagerConfig.java**

```java
...

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

- **../src/main/java/.../config/DataSourceConfig.java**
  - 아래와 같이 Secrets Manager로부터 런타임에 보안정보를 가져와 DB 접속 가능

```java
...

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

- **../src/main/java/.../config/AWSDynamoDBConfig.java**

  - DynamoDB 접속을 위해서는 IAM 키가 필요한데, 설정파일이 아니라 AWS IAM에서 직접 값을 가져와서 사용

```java
...

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
                        new AwsClientBuilder.EndpointConfiguration(awsDynamoDBEndPoint, awsRegion))
                .withCredentials(DefaultAWSCredentialsProviderChain.getInstance())
                .build();
    }
}
```


