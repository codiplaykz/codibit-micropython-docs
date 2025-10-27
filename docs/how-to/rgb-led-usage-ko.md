# How to use RGB LED(RGB LED 사용하기)

이 가이드는 Codi:bit 보드의 내장 RGB LED 스트립을 사용하는 방법을 보여줍니다.

## 기본 사용법

### RGB LED 가져오기

```python
from codibit import rgb_led
```

### 개별 LED 색상 설정

각 LED 스트립을 다른 색상으로 설정할 수 있습니다:

```python
# 각 스트립을 다른 색상으로 설정
rgb_led.set_color(0, 255, 0, 0)    # 스트립 0: 빨간색
rgb_led.set_color(1, 0, 255, 0)    # 스트립 1: 초록색
rgb_led.set_color(2, 0, 0, 255)    # 스트립 2: 파란색
  # 변경사항 적용
```

### 현재 색상 가져오기

어떤 스트립의 현재 색상도 가져올 수 있습니다:

```python
# 스트립 0의 현재 색상 가져오기
current_color = rgb_led.get_color(0)
print(f"스트립 0 색상: {current_color}")  # (r, g, b) 튜플 반환
```

### 모든 LED를 같은 색상으로 설정

모든 LED 스트립을 같은 색상으로 설정:

```python
# 모든 스트립을 흰색으로 설정
rgb_led.set_all_color(255, 255, 255)
```

### 밝기 제어

개별 스트립의 밝기를 조절:

```python
# 스트립 0을 빨간색으로 설정
rgb_led.set_color(0, 255, 0, 0)
# 스트립 0의 밝기를 50%로 설정
rgb_led.set_brightness(0, 0.5)
```

또는 모든 스트립을 한 번에 조절:

```python
# 각 스트립을 다른 색상으로 설정
rgb_led.set_color(0, 255, 0, 0)    # 빨간색
rgb_led.set_color(1, 0, 255, 0)    # 초록색
rgb_led.set_color(2, 0, 0, 255)    # 파란색
# 모든 스트립을 50% 밝기로 설정
rgb_led.set_all_brightness(0.5)
```

### LED 끄기

개별 스트립 끄기:

```python
# 스트립 1 끄기
rgb_led.turn_off(1)
```

또는 모든 스트립 끄기:

```python
# 모든 스트립 끄기
rgb_led.turn_off_all()
```

## 고급 예시

### 컬러 그라데이션 효과

부드러운 색상 전환 효과 만들기:

```python
import time

def color_gradient():
    """부드러운 컬러 그라데이션 효과 만들기"""

    # 그라데이션 색상 정의
    colors = [
        (255, 0, 0),    # 빨간색
        (255, 127, 0),  # 주황색
        (255, 255, 0),  # 노란색
        (0, 255, 0),    # 초록색
        (0, 255, 255),  # 시안
        (0, 0, 255),    # 파란색
        (127, 0, 255),  # 보라색
        (255, 0, 255),  # 마젠타
    ]

    # 색상 간 부드러운 전환
    for i in range(len(colors) - 1):
        color1 = colors[i]
        color2 = colors[i + 1]

        # 50단계로 부드럽게 전환
        for step in range(51):
            ratio = step / 50
            r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
            g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
            b = int(color1[2] * (1 - ratio) + color2[2] * ratio)

            rgb_led.set_all_color(r, g, b)
            sleep(0.05)

# 그라데이션 효과 실행
color_gradient()
```

### 숨쉬기 효과

대기모드용 숨쉬기 효과 만들기:

```python
import time

def breathing_effect():
    """파란색으로 숨쉬기 효과 만들기"""

    base_color = (0, 100, 255)  # 부드러운 파란색

    # 밝기 증가 (0% → 100%)
    for brightness in range(0, 101, 5):
        brightness_ratio = brightness / 100
        r = int(base_color[0] * brightness_ratio)
        g = int(base_color[1] * brightness_ratio)
        b = int(base_color[2] * brightness_ratio)
        rgb_led.set_all_color(r, g, b)
        sleep(0.05)

    # 밝기 감소 (100% → 0%)
    for brightness in range(100, -1, -5):
        brightness_ratio = brightness / 100
        r = int(base_color[0] * brightness_ratio)
        g = int(base_color[1] * brightness_ratio)
        b = int(base_color[2] * brightness_ratio)
        rgb_led.set_all_color(r, g, b)
        sleep(0.05)

# 숨쉬기 효과 실행
breathing_effect()
```

### 순차 LED 제어

LED를 하나씩 켜기:

```python
import time

def sequential_led():
    """LED를 순차적으로 켜기"""

    # 먼저 모든 LED 끄기
    rgb_led.turn_off_all()
    sleep(1)

    # 각 LED를 다른 색상으로 켜기
    colors = [
        (255, 0, 0),    # 빨간색
        (0, 255, 0),    # 초록색
        (0, 0, 255),    # 파란색
    ]

    for i in range(3):
        rgb_led.set_color(i, *colors[i])
        sleep(1)

# 순차 LED 효과 실행
sequential_led()
```

### 색상 기억 효과

색상을 기억하고 복원하기:

```python
import time

def color_memory_demo():
    """색상 기억 기능 데모"""

    # 각 스트립을 다른 색상으로 설정
    rgb_led.set_color(0, 255, 0, 0)    # 빨간색
    rgb_led.set_color(1, 0, 255, 0)    # 초록색
    rgb_led.set_color(2, 0, 0, 255)    # 파란색

    # 현재 색상 저장
    stored_colors = []
    for i in range(3):
        stored_colors.append(rgb_led.get_color(i))

    print("저장된 색상:", stored_colors)

    # 모든 스트립 끄기
    rgb_led.turn_off_all()
    sleep(2)

    # 색상 복원
    for i, color in enumerate(stored_colors):
        rgb_led.set_color(i, *color)

# 색상 기억 데모 실행
color_memory_demo()
```

## 일반적인 색상 값

사용할 수 있는 일반적인 RGB 색상 값들:

| 색상 | R | G | B | 설명 |
|------|---|---|---|------|
| 빨간색 | 255 | 0 | 0 | 순수한 빨간색 |
| 초록색 | 0 | 255 | 0 | 순수한 초록색 |
| 파란색 | 0 | 0 | 255 | 순수한 파란색 |
| 흰색 | 255 | 255 | 255 | 순수한 흰색 |
| 노란색 | 255 | 255 | 0 | 노란색 |
| 마젠타 | 255 | 0 | 255 | 마젠타 |
| 시안 | 0 | 255 | 255 | 시안 |
| 주황색 | 255 | 127 | 0 | 주황색 |
| 보라색 | 127 | 0 | 255 | 보라색 |
| 분홍색 | 255 | 20 | 147 | 분홍색 |

## 문제 해결

### LED가 켜지지 않음

1. **자동 업데이트**: 색상 설정 시 자동으로 적용됩니다
2. **핀 연결 확인**: GPIO17이 올바르게 연결되었는지 확인
3. **전원 공급 확인**: 보드에 충분한 전원이 공급되는지 확인
4. **neopixel 라이브러리 확인**: MicroPython 펌웨어에 neopixel 라이브러리가 있는지 확인

### LED가 너무 밝거나 어둠

1. **밝기 조절**: 밝기 매개변수(0.0-1.0) 사용
2. **전력 소모**: 낮은 밝기는 전력 소모를 줄임
3. **눈의 편안함**: 더 나은 눈의 편안함을 위해 낮은 밝기 사용

### 색상이 올바르게 표시되지 않음

1. **RGB 값 확인**: 값이 0-255 범위인지 확인
2. **색상 순서 확인**: RGB LED는 RGB 색상 순서 사용
3. **개별 스트립 테스트**: 각 스트립을 개별적으로 설정해보기

### 성능 문제

1. **업데이트 빈도 줄이기**: 업데이트 간 지연 시간 증가
2. **효과 단순화**: 색상 전환 단계 줄이기
3. **메모리 사용량**: 큰 색상 배열 생성 피하기

## 모범 사례

1. **자동 적용**: 설정 시 즉시 변경사항이 적용됩니다
2. **적절한 밝기 사용**: 낮은 밝기는 전력을 절약함
3. **부드러운 전환**: 부드러운 색상 변화를 위해 작은 단계 사용
4. **에러 처리**: LED 작업을 try-catch 블록으로 감싸기
5. **전력 관리**: 사용하지 않을 때 LED 끄기

## 예시 프로젝트

### 신호등 시뮬레이터

```python
import time

def traffic_light():
    """신호등 시뮬레이션"""

    while True:
        # 빨간불
        rgb_led.set_all_color(255, 0, 0)
        sleep(3)

        # 노란불
        rgb_led.set_all_color(255, 255, 0)
        sleep(1)

        # 초록불
        rgb_led.set_all_color(0, 255, 0)
        sleep(3)

# 신호등 실행 (Ctrl+C로 중단)
traffic_light()
```

### 무드 라이트

```python
import time

def mood_light():
    """무드 조명 효과 만들기"""

    colors = [
        (255, 0, 0),    # 빨간색 - 에너지
        (0, 255, 0),    # 초록색 - 차분함
        (0, 0, 255),    # 파란색 - 편안함
        (255, 255, 0),  # 노란색 - 행복
        (255, 0, 255),  # 마젠타 - 창의성
    ]

    for color in colors:
        rgb_led.set_all_color(*color)
        rgb_led.set_all_brightness(0.5)  # 50% 밝기
        sleep(2)

# 무드 라이트 실행
mood_light()
```

### 개별 스트립 밝기 제어

```python
import time

def individual_brightness_demo():
    """개별 스트립 밝기 제어 데모"""

    # 각 스트립을 다른 색상으로 설정
    rgb_led.set_color(0, 255, 0, 0)    # 빨간색
    rgb_led.set_color(1, 0, 255, 0)    # 초록색
    rgb_led.set_color(2, 0, 0, 255)    # 파란색

    # 각 스트립의 밝기를 다르게 설정
    rgb_led.set_brightness(0, 1.0)   # 스트립 0: 최대 밝기
    rgb_led.set_brightness(1, 0.5)   # 스트립 1: 50% 밝기
    rgb_led.set_brightness(2, 0.25)  # 스트립 2: 25% 밝기


# 개별 밝기 제어 데모 실행
individual_brightness_demo()
```