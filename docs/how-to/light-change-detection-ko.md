# How to detect light changes(조도 변화 감지하기)

이 가이드는 조도 레벨이 변화할 때 감지하고 그 변화에 반응하는 방법을 보여줍니다.

## 사전 준비

- Python 기본 이해
- 조도 센서가 있는 Codi:bit 보드
- MicroPython 환경 설정

## 기본 조도 변화 감지

조도 변화를 감지하는 가장 간단한 방법은 현재 읽기값과 이전 값을 비교하는 것입니다.

```python
from codibit import *

# 이전 조도 레벨 저장
previous_level = light.get_level()

while True:
    # 현재 조도 레벨 가져오기
    current_level = light.get_level()

    # 조도 레벨이 변화했는지 확인
    if current_level != previous_level:
        print(f"조도 변화: {previous_level} → {current_level}")

        # 이전 레벨 업데이트
        previous_level = current_level

    # 너무 자주 확인하지 않도록 작은 지연
    sleep(0.5)
```

## 조도 변화에 반응하기

변화 유형에 따라 다른 반응을 추가할 수 있습니다.

```python
from codibit import *

previous_level = light.get_level()

while True:
    current_level = light.get_level()

    if current_level != previous_level:
        # 변화 유형 결정
        if current_level > previous_level:
            print("조도가 증가했습니다!")
            display.draw_text("↑", 0, 0)  # 위쪽 화살표
            display.show()
        elif current_level < previous_level:
            print("조도가 감소했습니다!")
            display.draw_text("↓", 0, 0)  # 아래쪽 화살표
            display.show()

        previous_level = current_level

    sleep(0.5)
```

## 고급: 임계값 기반 감지

더 정밀한 제어를 위해 조도 변화에 대한 특정 임계값을 설정할 수 있습니다.

```python
from codibit import *

previous_level = light.get_level()
threshold = 2  # 감지를 트리거하는 최소 변화량

while True:
    current_level = light.get_level()

    # 변화가 임계값을 초과하는지 확인
    change = abs(current_level - previous_level)

    if change >= threshold:
        print(f"중요한 조도 변화: {previous_level} → {current_level}")

        # 변화 크기에 따른 다른 반응
        if change >= 4:
            print("큰 조도 변화 감지!")
            rgb_led.set_color(255, 0, 0)  # 큰 변화에는 빨간색
        else:
            print("작은 조도 변화 감지!")
            rgb_led.set_color(0, 255, 0)  # 작은 변화에는 초록색

        previous_level = current_level

    sleep(0.3)
```

## 실용적 응용

### 1. 자동 조도 모니터링

```python
from codibit import *

previous_level = light.get_level()
change_count = 0

while True:
    current_level = light.get_level()

    if current_level != previous_level:
        change_count += 1
        print(f"변화 #{change_count}: {previous_level} → {current_level}")

        # 타임스탬프와 함께 변화 기록
        print(f"시간: {running_time()}ms")

        previous_level = current_level

    sleep(0.5)
```

### 2. 조도 기반 알림

```python
from codibit import *

previous_level = light.get_level()

while True:
    current_level = light.get_level()

    if current_level != previous_level:
        # 조도 레벨에 따른 알림
        if current_level <= 2:
            print("경고: 매우 어두운 환경!")
            buzzer.play_tone(1000, 200)  # 200ms 동안 비프음
        elif current_level >= 7:
            print("경고: 매우 밝은 환경!")
            buzzer.play_tone(2000, 200)  # 더 높은 피치의 비프음

        previous_level = current_level

    sleep(0.5)
```

## 팁과 모범 사례

1. **적절한 지연 선택**: 너무 자주 확인(작은 지연)하면 리소스를 낭비하고, 너무 드물게 확인(큰 지연)하면 변화를 놓칠 수 있습니다.

2. **임계값 사용**: 노이즈가 많은 환경에서는 임계값 기반 감지를 사용하여 잘못된 트리거를 방지하세요.

3. **히스테리시스 고려**: 상태 간의 빠른 전환을 방지하기 위해 작은 버퍼를 추가하세요.

4. **변화 기록**: 디버깅과 분석을 위해 변화를 추적하세요.

5. **예외 상황 처리**: 센서가 실패하거나 예상치 못한 값을 반환할 때를 고려하세요.

## 문제 해결

**문제**: 너무 많은 잘못된 감지
- **해결책**: 임계값을 늘리거나 디바운스 메커니즘을 추가하세요

**문제**: 조도 변화를 놓침
- **해결책**: 읽기 간의 지연을 줄이세요

**문제**: 일관성 없는 읽기값
- **해결책**: 읽기값을 부드럽게 하기 위해 평균화나 필터링을 추가하세요

## 다음 단계

- 조도 변화 감지를 다른 센서와 결합해보세요
- 조도 변화 기록 시스템을 만들어보세요
- 조도 기반 보안 시스템을 구축해보세요
- 다양한 반응 메커니즘을 실험해보세요