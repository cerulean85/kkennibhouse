---
title: '함수 인터페이스 변경에 대응하는 로깅'
date: '2025-01-14 00:00:00'
---

## 1. 배경
- 함수 호출 시 의도치 않은 파라미터 입력이나 결과 출력을 추적할 수 있는 로깅 기능이 필요함

## 2. 문제점
- 파이썬의 기본 로깅 모듈은 로그 형식과 파일 저장 기능은 제공하지만, 함수의 입출력값을 자동으로 추적하는 기능은 없음
- 함수 파라미터가 변경될 때마다 로깅 코드의 매개변수를 수정해야 함
- 수십 개의 함수에 로깅 코드를 삽입하면, 함수 인터페이스 변경에 따라 수정할 부분이 많아짐
- 로깅 코드 작성 시 타이핑 실수로 인해 잘못된 데이터를 기록할 위험이 큼

```python
# 로깅
def log(func_name, *args, **kwargs):
    cmm_logger.info("call: %s, args: %s, kwargs: %s", func_name, args, kwargs)

# 로깅을 호출하는 함수1
def test1(arg1, args2, args3):           
    log("test1", arg1, args2, args3)
    # 입력 I/F가 변경되면 수정 필요 

# 로깅을 호출하는 함수2
def test2(arg1, args2, args3, args4):
    log("test2", arg1, args2, args3, args4) 
    # 입력 I/F가 변경되면 수정 필요 

# 로깅을 호출하는 함수3
def test3(arg1, args2, args3, args4, args5):
    log("test2", arg1, args2, args3, args4, args5)
    # 입력 I/F가 변경되면 수정 필요     
```

## 3. 해결 방안
- 파이썬 데코레이터를 활용하여 로깅 패턴을 캡슐화
- 로깅 코드를 일관되게 작성하고, 최소한의 코드로 실행 가능하도록 구현

```python

class PyLogger:
    """Custom logging class to wrap and enhance logging functionality."""
    def __init__(self, func=None):
        self.func = func

    def __call__(self, *args, **kwargs):
        self.log(*args, **kwargs)
        return self.func(*args, **kwargs)

    def log(self, *args, **kwargs):
        """Log a message with function name and arguments."""
        func_name = getattr(self.func, "__name__", "-")
        cmm_logger.info("call: %s, args: %s, kwargs: %s", func_name, args, kwargs)
        
```

## 4. 결과
- 함수의 입력 인터페이스가 변경되어도 로깅 코드를 수정할 필요가 없음

```python
# 데코레이터를 이용한 로깅
@PyLogger
def test1(arg1, args2, args3):
    pass

@PyLogger
def test2(arg1, args2, args3, args4):
    pass

@PyLogger
def test3(arg1, args2, args3, args4, args5):
    pass
```