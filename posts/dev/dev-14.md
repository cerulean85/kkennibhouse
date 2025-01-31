---
title: "Python Schedule 등록"
date: "2024-12-27 00:00:00"
---

- 특정 시간 주기나 특정 시각에 실행시키고 싶은 코드가 있다면 아래를 참고하자.
    
    [★schedule: 정해진 시간에 파이썬(Python) 스크립트 자동 실행](https://foss4g.tistory.com/1626)
    

```bash
$ pip3 install schedule  # schedule 패키지 설치
```

```python
def job():
	# 이곳에 원하는 동작을 구현하면 됨
	print("Workspace")

import schedule
schedule.every(3).seconds.do(job) # 3초마다 실행
schedule.every(3).minutes.do(job) # 3분마다 실행
schedule.every(3).hours.do(job)   # 3시간마다 실행
schedule.every(3).days.do(job)    # 3일마다 실행
schedule.every(3).weeks.do(job)   # 3주마다 실행
schedule.every().minute.at(":23").do(job)  # 매분 24초마다 실행
schedule.every().hour.at(":42").do(job)    # 매시간 42분마다 실행

schedule.every(5).hours.at("20:30").do(job)  # 5시간 20분 30초마다 실행

# 매일 특정 HH:MM 및 다음 HH:MM:SS에 실행
schedule.every().day.at("10:30").do(job)
schedule.every().day.at("10:30:42").do(job)

*# 주중 특정일에 실행*
schedule.every().monday.do(job)
schedule.every().wednesday.at("13:15").do(job)
while True:
    schedule.run_pending()
    time.sleep(1)
```