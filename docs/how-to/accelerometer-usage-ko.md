# 가속도계 사용 가이드

이 가이드는 Codi:bit 보드의 내장 가속도계를 사용하는 방법을 보여줍니다.

## 개요

Codi:bit 보드는 움직임과 방향을 감지할 수 있는 QMI8658 6축 IMU 가속도계를 포함하고 있습니다. 가속도계는 세 축(X, Y, Z)의 가속도 데이터를 제공하며, 제스처 감지, 모션 센싱, 방향 감지 등 다양한 응용 프로그램에 사용할 수 있습니다.

## 기본 사용법

### 가속도계 가져오기

```python
from codibit import Accelerometer

# 가속도계 인스턴스 생성
accelerometer = Accelerometer()
```

### 개별 축 읽기

각 축의 가속도 값을 개별적으로 읽을 수 있습니다:

```python
# X축 가속도 읽기
x_value = accelerometer.get_x()
print(f"X축: {x_value}")

# Y축 가속도 읽기
y_value = accelerometer.get_y()
print(f"Y축: {y_value}")

# Z축 가속도 읽기
z_value = accelerometer.get_z()
print(f"Z축: {z_value}")
```

### 모든 축을 한 번에 읽기

더 나은 성능을 위해 세 축을 한 번에 읽을 수 있습니다:

```python
# 모든 가속도 값을 튜플로 가져오기
x, y, z = accelerometer.get_values()
print(f"가속도: X={x}, Y={y}, Z={z}")
```

### 총 가속도 강도 가져오기

전체적인 움직임을 감지하려면 강도 메서드를 사용하세요:

```python
# 총 가속도 크기 가져오기
strength = accelerometer.get_strength()
print(f"총 가속도: {strength}")
```

## 실용적인 예제

### 1. 실시간 가속도 모니터링

```python
from codibit import Accelerometer
import time

accelerometer = Accelerometer()

print("실시간 가속도 모니터링")
print("Ctrl+C를 눌러 중지")

try:
    while True:
        x, y, z = accelerometer.get_values()
        strength = accelerometer.get_strength()

        print(f"X: {x:6d} | Y: {y:6d} | Z: {z:6d} | 강도: {strength:6d}")
        time.sleep(0.1)  # 초당 10회 업데이트

except KeyboardInterrupt:
    print("\n모니터링 중지됨")
```

### 2. 움직임 감지

```python
from codibit import Accelerometer
import time

accelerometer = Accelerometer()

# 기준값 설정
print("기준값 설정 중... 2초간 움직이지 마세요")
time.sleep(2)

baseline_strength = accelerometer.get_strength()
threshold = baseline_strength * 1.5  # 50% 증가 임계값

print(f"기준 강도: {baseline_strength}")
print(f"움직임 임계값: {threshold}")
print("보드를 움직여서 움직임을 감지하세요")

try:
    while True:
        current_strength = accelerometer.get_strength()

        if current_strength > threshold:
            print("움직임 감지됨!")
            time.sleep(0.5)  # 디바운스

        time.sleep(0.1)

except KeyboardInterrupt:
    print("\n감지 중지됨")
```

### 3. 방향 감지

```python
from codibit import Accelerometer, Display
import time

accelerometer = Accelerometer()
display = Display()

print("방향 감지")
print("Ctrl+C를 눌러 중지")

try:
    while True:
        # 내장 제스처 감지 API 사용
        orientation = accelerometer.get_gesture()

        # OLED에 표시
        display.clear()
        display.draw_text("방향:", 0, 0)
        display.draw_text(orientation, 0, 20)
        display.show()

        print(f"현재 방향: {orientation}")
        time.sleep(0.5)

except KeyboardInterrupt:
    print("\n감지 중지됨")
```

**사용 가능한 제스처 타입:**
- `"FACE_UP"`, `"FACE_DOWN"`, `"UP"`, `"DOWN"`, `"LEFT"`, `"RIGHT"`, `"SHAKE"`, `"FREE_FALL"`

각 제스처 타입에 대한 자세한 설명은 [가속도계 참조](../reference/builtin-ko#가속도계-accelerometer)를 참조하세요.

### 4. 제스처 감지

```python
from codibit import Accelerometer, Buzzer
import time

accelerometer = Accelerometer()
buzzer = Buzzer()

print("제스처 감지")
print("보드를 움직여서 제스처를 감지하세요")

try:
    while True:
        # was_gesture()를 사용하여 특정 제스처 확인
        if accelerometer.was_gesture("SHAKE"):
            print("흔들림 감지됨!")
            buzzer.play_tone(440, 100)  # 흔들림용 비프음

        elif accelerometer.was_gesture("FREE_FALL"):
            print("자유낙하 감지됨!")
            buzzer.play_tone(880, 200)  # 자유낙하용 높은 음

        elif accelerometer.was_gesture("FACE_UP"):
            print("보드가 위쪽으로 뒤집힘!")
            buzzer.play_tone(330, 50)

        elif accelerometer.was_gesture("FACE_DOWN"):
            print("보드가 아래쪽으로 뒤집힘!")
            buzzer.play_tone(330, 50)

        time.sleep(0.1)

except KeyboardInterrupt:
    print("\n감지 중지됨")
```

**`is_gesture()`를 사용한 연속 상태 확인:**

```python
from codibit import Accelerometer, RGBLed
import time

accelerometer = Accelerometer()
rgb_led = RGBLed()

print("연속 제스처 모니터링")
print("Ctrl+C를 눌러 중지")

try:
    while True:
        # 현재 제스처 상태 확인
        if accelerometer.is_gesture("FACE_UP"):
            rgb_led.set_color(0, 255, 0)  # 위쪽일 때 초록색
        elif accelerometer.is_gesture("FACE_DOWN"):
            rgb_led.set_color(255, 0, 0)  # 아래쪽일 때 빨간색
        elif accelerometer.is_gesture("SHAKE"):
            rgb_led.set_color(255, 255, 0)  # 흔들릴 때 노란색
        else:
            rgb_led.set_color(0, 0, 255)  # 다른 방향일 때 파란색

        time.sleep(0.1)

except KeyboardInterrupt:
    print("\n모니터링 중지됨")
    rgb_led.off()
```

## 문제 해결

### 일반적인 문제

1. **일관성 없는 읽기**
   - 보드가 제대로 연결되었는지 확인
   - 전자기 간섭 확인
   - 안정적인 환경에서 센서 배치 확인

2. **높은 노이즈 레벨**
   - 더 부드러운 읽기를 위해 저역 통과 필터링 사용
   - 샘플링 간격 증가
   - 진동 소스 확인

3. **잘못된 방향 감지**
   - 좌표계 이해 확인
   - 센서 배치 및 방향 확인
   - 자기 간섭 확인

### 성능 팁

1. **샘플링 속도**: 응용 프로그램 요구사항에 따라 조정
   - 높은 주파수 (100Hz): 실시간 응용 프로그램
   - 중간 주파수 (10Hz): 일반 모니터링
   - 낮은 주파수 (1Hz): 배터리 절약 응용 프로그램

2. **데이터 처리**: 더 나은 성능을 위해 배치로 데이터 처리 고려

3. **메모리 사용량**: 대량의 데이터를 로깅할 때 메모리 주의

## 하드웨어 사양

- **센서**: QMI8658 6축 IMU
- **인터페이스**: I2C (400kHz)
- **주소**: 0x6B
- **측정 범위**: ±2g, ±4g, ±8g, ±16g (설정 가능)
- **해상도**: 16-bit
- **업데이트 속도**: 최대 200Hz
- **전력 소모**: ~1.5mA (활성 모드)

## 좌표계

가속도계는 보드의 실제 물리적 방향을 기준으로 동작합니다:

### **축 방향**
- **X축**: 앞뒤 기울기 (Tilt forward and backward)
  - 앞으로 기울일 때 양수, 뒤로 기울일 때 음수
- **Y축**: 좌우 기울기 (Tilt left and right)
  - 왼쪽으로 기울일 때 양수, 오른쪽으로 기울일 때 음수
- **Z축**: 상하 뒤집기 (Flip up and down)
  - 평평한 상태에서 약 -1.0, 뒤집으면 약 +1.0

### **중력 기준**
- 보드가 평평하게 놓여있을 때 중력은 -Z 방향으로 작용
- 정지 상태에서 Z축은 약 -1.0 (중력과 반대 방향)
- 보드를 뒤집으면 Z축은 약 +1.0 (중력과 같은 방향)

### **측정값 범위**
- **일반 범위**: -2.0 ~ +2.0 (중력의 약 2배까지 측정)
- **정지 상태**: -1.0 ~ +1.0 (중력만 작용)
- **기울기 감지**: 각 축은 해당 방향의 기울기에 따라 중력 성분이 분해되어 측정