# How to use microphone(마이크 사용하기)

이 가이드는 Codi:bit 보드의 내장 마이크 센서를 사용하여 소리를 감지하고 인터랙티브한 오디오 애플리케이션을 만드는 방법을 보여줍니다.

## 사전 요구사항

- MicroPython 펌웨어가 설치된 Codi:bit 보드
- Python 프로그래밍 기본 지식

## 기본 사용법

### 1. 임포트 및 초기화

먼저 마이크 모듈을 임포트하고 마이크 객체를 생성합니다:

```python
from codibit import *

# 마이크 객체 생성
mic = Microphone()
```

### 2. 소리 레벨 읽기

다양한 방법으로 현재 소리 레벨을 읽을 수 있습니다:

```python
# 원시 ADC 값 읽기 (0-4095)
raw_value = mic.read()
print(f"원시 값: {raw_value}")

# 정규화된 레벨 읽기 (0-9)
level = mic.get_level()
print(f"소리 레벨: {level}")
```

### 3. 소리 이벤트 감지

다양한 소리 조건을 확인합니다:

```python
# 소리가 감지되는지 확인
if mic.is_sound_detected():
    print("소리가 감지되었습니다!")

# 시끄러운지 확인
if mic.is_loud():
    print("너무 시끄럽습니다!")

# 조용한지 확인
if mic.is_quiet():
    print("매우 조용합니다.")
```

## 예시: 박수 감지

박수 소리를 감지하는 완전한 예시입니다:

```python
from codibit import *
import time

# 마이크 초기화
mic = Microphone()

print("박수 감지 시작!")
print("박수를 쳐서 감지되는지 확인해보세요...")
print("중지하려면 Ctrl+C를 누르세요")

try:
    while True:
        # 시끄러운 소리(박수 같은) 감지
        if mic.is_loud():
            print("👏 박수 감지!")
            # 여러 번 감지되는 것을 방지하기 위해 잠시 대기
            time.sleep(0.5)

        # 현재 소리 레벨 표시
        level = mic.get_level()
        if level > 0:
            print(f"소리 레벨: {level}")

        # 출력이 너무 많아지는 것을 방지하기 위한 짧은 대기
        time.sleep(0.1)

except KeyboardInterrupt:
    print("\n박수 감지가 중지되었습니다.")
```

## 작동 원리

1. **원시 읽기**: `read()` 메서드는 마이크 센서의 원시 ADC 값을 반환합니다
2. **레벨 변환**: `get_level()` 메서드는 원시 값을 정규화된 레벨(0-9)로 변환합니다
3. **이벤트 감지**: 센서는 주변 소음에 자동으로 보정되고 변화를 감지합니다
4. **임계값 확인**: `is_loud()`나 `is_quiet()` 같은 메서드는 미리 정의된 임계값을 사용합니다

## 팁

- 마이크는 주변 환경에 자동으로 보정됩니다
- 박수 같은 시끄러운 소리는 보통 레벨 7 이상으로 기록됩니다
- 센서는 소리 레벨의 갑작스러운 변화에 가장 민감합니다
- 최상의 결과를 위해 상대적으로 조용한 환경에서 먼저 테스트해보세요

## 문제 해결

- **소리가 감지되지 않음**: 조용한 환경에서 더 시끄러운 소리를 내보세요
- **너무 민감함**: 센서가 환경에 보정되는 데 시간이 필요할 수 있습니다
- **일관되지 않은 읽기**: 센서를 재보정하기 위해 프로그램을 재시작해보세요