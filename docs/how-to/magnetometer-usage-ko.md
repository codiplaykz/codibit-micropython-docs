---
id: magnetometer-usage-ko
title: 자기장 센서 사용 가이드
sidebar_label: 자기장 센서
description: Codi:bit 자기장 센서를 사용하여 나침반과 자기장 감지 애플리케이션을 만드는 방법을 배워보세요
---

# How to use magnetometer(자기계 사용하기)

Codi:bit 자기장 센서를 사용하여 자기장을 감지하고 나침반 애플리케이션을 만들 수 있습니다. 이 가이드는 자기장 센서를 효과적으로 사용하는 방법을 보여줍니다.

## 개요

자기장 센서는 MMC5603 센서를 사용하여 3축(X, Y, Z) 자기장을 측정하고 나침반 기능을 제공합니다. 다음과 같은 용도에 완벽합니다:

- **나침반 애플리케이션**: 방향 결정 (북, 남, 동, 서)
- **자기장 감지**: 자기장 강도 측정
- **금속 감지**: 주변 금속 물체 감지
- **내비게이션**: 방향 찾기 애플리케이션 제작

## 기본 설정

### 임포트 및 초기화

```python
from codibit import *

# 자기장 센서 초기화
magnetometer = Magnetometer()
```

### 기본 읽기

```python
# 개별 축 값 읽기
x = magnetometer.get_x()
y = magnetometer.get_y()
z = magnetometer.get_z()

# 모든 값을 한 번에 읽기
x, y, z = magnetometer.get_values()

# 자기장 강도 가져오기
strength = magnetometer.get_strength()

# 나침반 방향 가져오기 (0-360도)
heading = magnetometer.get_heading()
```

## 실용적인 예제

### 예제 1: 간단한 나침반

현재 방향을 보여주는 기본 나침반 만들기:

```python
from codibit import *

magnetometer = Magnetometer()

# 정확한 측정을 위해 자기장 센서 보정
print("자기장 센서 보정을 시작합니다...")
print("보드를 공중에 들고 천천히 8자를 여러 번 그려주세요")
print("약 20초 동안 보정이 진행됩니다...")
magnetometer.calibrate()
print("보정 완료!")

def get_direction_name(heading):
    """각도를 방향 이름으로 변환"""
    if 315 <= heading < 45:
        return "북쪽"
    elif 45 <= heading < 135:
        return "동쪽"
    elif 135 <= heading < 225:
        return "남쪽"
    elif 225 <= heading < 315:
        return "서쪽"
    else:
        return "북쪽"

while True:
    heading = magnetometer.get_heading()
    direction = get_direction_name(heading)

    print(f"방향: {direction} ({heading:.1f}°)")
    sleep(0.5)
```

### 예제 2: 자기장 모니터

자기장 강도를 모니터링하고 강한 자기장을 감지:

```python
from codibit import *

magnetometer = Magnetometer()

# 정확한 측정을 위해 자기장 센서 보정
print("자기장 센서 보정을 시작합니다...")
print("보드를 공중에 들고 천천히 8자를 여러 번 그려주세요")
print("약 20초 동안 보정이 진행됩니다...")
magnetometer.calibrate()
print("보정 완료!")

while True:
    strength = magnetometer.get_strength()
    x, y, z = magnetometer.get_values()

    print(f"자기장 강도: {strength:.3f}")
    print(f"X: {x:.3f}, Y: {y:.3f}, Z: {z:.3f}")

    if strength > 100:
        print("⚠️ 강한 자기장 감지!")
    elif strength > 50:
        print("🔍 중간 자기장")
    else:
        print("✅ 정상 자기장")

    print("-" * 30)
    sleep(1)
```

### 예제 3: 보정

정확한 측정을 위해 자기장 센서 보정:

```python
from codibit import *

magnetometer = Magnetometer()

print("자기장 센서 보정을 시작합니다...")
print("보드를 공중에 들고 천천히 8자를 여러 번 그려주세요")
print("약 20초 동안 보정이 진행됩니다...")

# 보정 수행
magnetometer.calibrate()

print("보정 완료!")
print("자기장 센서가 정확한 측정을 위해 준비되었습니다")
```

### 예제 4: 디스플레이가 있는 나침반

OLED 디스플레이에 방향을 표시하는 나침반 애플리케이션 만들기:

```python
from codibit import *

magnetometer = Magnetometer()

# 정확한 측정을 위해 자기장 센서 보정
print("자기장 센서 보정을 시작합니다...")
print("보드를 공중에 들고 천천히 8자를 여러 번 그려주세요")
print("약 20초 동안 보정이 진행됩니다...")
magnetometer.calibrate()
print("보정 완료!")

def get_direction_name(heading):
    """각도를 방향 이름으로 변환"""
    if 315 <= heading < 45:
        return "NORTH"
    elif 45 <= heading < 135:
        return "EAST"
    elif 135 <= heading < 225:
        return "SOUTH"
    elif 225 <= heading < 315:
        return "WEST"
    else:
        return "NORTH"

while True:
    heading = magnetometer.get_heading()
    direction = get_direction_name(heading)

    # 디스플레이 지우고 나침반 표시
    display.clear()
    display.draw_text("COMPASS:", 0, 0)
    display.draw_text(f"{heading:.0f}°", 0, 15)
    display.draw_text(direction, 0, 30)
    display.show()

    sleep(0.5)
```

## 고급 기능

### 보정

정확한 나침반 측정을 위해 자기장 센서를 보정:

```python
# 사용 전 보정
magnetometer.calibrate()
```



### 자기장 강도 모니터링

전체 자기장 강도 모니터링:

```python
strength = magnetometer.get_strength()

if strength > 100:
    print("강한 자기장 감지")
elif strength > 50:
    print("중간 자기장")
else:
    print("정상 자기장")
```

## 좌표계

자기장 센서는 3축 좌표계를 사용합니다:

- **X축**: 좌우 방향
- **Y축**: 앞뒤 방향
- **Z축**: 상하 방향

### 나침반 방향

- **0°**: 북쪽
- **90°**: 동쪽
- **180°**: 남쪽
- **270°**: 서쪽

## 모범 사례

### 1. 보정

- 첫 사용 전 자기장 센서 보정
- 측정 전에 보정
- 측정값이 부정확할 때 보정

### 2. 환경 고려사항

- 보정 중 금속 물체에서 멀리 떨어뜨려 놓기
- 강한 전자기장 피하기
- 나침반 측정을 위해 안정적이고 수평한 위치 사용

### 3. 읽기 빈도

- 너무 자주 읽지 않기 (읽기 사이에 지연 사용)
- 센서의 업데이트 속도 고려 (최대 100Hz)

### 4. 오류 처리

```python
try:
    magnetometer = Magnetometer()
    heading = magnetometer.get_heading()
    print(f"방향: {heading}°")
except Exception as e:
    print(f"자기장 센서 오류: {e}")
```

## 문제 해결

### 일반적인 문제

1. **부정확한 측정**: 센서 보정
2. **응답 없음**: I2C 연결 확인
3. **불규칙한 값**: 금속 물체에서 멀리 떨어뜨려 놓기
4. **잘못된 방향**: 보드가 수평인지 확인

### 디버그 정보

```python
# 모든 센서 정보 출력
x, y, z = magnetometer.get_values()
strength = magnetometer.get_strength()
heading = magnetometer.get_heading()

print(f"원시 값: X={x:.3f}, Y={y:.3f}, Z={z:.3f}")
print(f"강도: {strength:.3f}")
print(f"방향: {heading:.1f}°")
```

## 애플리케이션

### 내비게이션
- 디지털 나침반 만들기
- 방향 찾기 애플리케이션 구축
- 내비게이션 시스템 구현

### 금속 감지
- 주변 금속 물체 감지
- 보안 애플리케이션 만들기
- 보물 찾기 게임 구축

### 과학 프로젝트
- 자기장 강도 측정
- 자기 특성 연구
- 교육용 시연 만들기

## 요약

Codi:bit 자기장 센서는 강력한 자기장 감지와 나침반 기능을 제공합니다. 적절한 보정과 사용으로 정확한 나침반 애플리케이션과 자기장 모니터링 시스템을 만들 수 있습니다.

기억할 점:
- 정확한 측정을 위해 측정 전에 보정
- 환경 요인 고려
- 오류를 우아하게 처리
- 적절한 읽기 빈도 사용

자기장 센서는 Codi:bit 플랫폼에서 내비게이션, 감지, 교육용 애플리케이션을 위한 많은 가능성을 열어줍니다.