# How to use buttons(버튼 사용하기)

이 가이드는 Codi:bit 보드의 내장 버튼을 사용하여 사용자 입력을 감지하는 방법을 보여줍니다.

## 사전 요구사항

- Python 기본 지식
- Codi:bit 보드
- MicroPython 환경 설정 완료

## 버튼 상태 감지

Codi:bit 버튼 클래스는 세 가지 주요 메서드를 제공하여 다양한 버튼 상태를 감지할 수 있습니다:

### 1. `is_pressed()` - 눌림 순간 감지

버튼이 눌리는 정확한 순간을 감지합니다 (한 번의 이벤트).

```python
from codibit import *
import time

while True:
    # 버튼 A가 눌리는 순간 감지
    if button_a.is_pressed():
        print("버튼 A가 눌렸습니다!")

    # 버튼 B가 눌리는 순간 감지
    if button_b.is_pressed():
        print("버튼 B가 눌렸습니다!")

    # 최적 성능을 위한 작은 지연
    time.sleep(0.01)
```

### 2. `is_holding()` - 계속 눌린 상태 감지

버튼이 계속 눌려있는 상태를 감지합니다.

```python
from codibit import *
import time

while True:
    # 버튼 A가 계속 눌려있는지 확인
    if button_a.is_holding():
        print("버튼 A가 눌려있습니다...")

    # 버튼 B가 계속 눌려있는지 확인
    if button_b.is_holding():
        print("버튼 B가 눌려있습니다...")

    time.sleep(0.01)
```

### 3. `is_released()` - 떼어짐 순간 감지

버튼이 떼어지는 정확한 순간을 감지합니다 (한 번의 이벤트).

```python
from codibit import *
import time

while True:
    # 버튼 A가 떼어지는 순간 감지
    if button_a.is_released():
        print("버튼 A가 떼어졌습니다!")

    # 버튼 B가 떼어지는 순간 감지
    if button_b.is_released():
        print("버튼 B가 떼어졌습니다!")

    time.sleep(0.01)
```

## 완전한 버튼 상태 모니터링

모든 버튼 상태를 동시에 모니터링할 수 있습니다:

```python
from codibit import *
import time

while True:
    # 눌림 감지
    if button_a.is_pressed():
        print("🔴 버튼 A: 눌렸습니다!")

    # 계속 눌린 상태
    if button_a.is_holding():
        print("🟡 버튼 A: 눌린 중...", end='\r')

    # 떼어짐 감지
    if button_a.is_released():
        print("🟢 버튼 A: 떼어졌습니다!")

    time.sleep(0.01)
```

## 버튼 눌림 횟수 세기

`get_presses()` 메서드는 총 버튼 눌림 횟수를 반환하고 카운터를 리셋합니다.

```python
from codibit import *
import time

print("버튼을 여러 번 누른 후 5초간 기다리면 카운트가 표시됩니다...")

while True:
    # 5초 대기
    time.sleep(5)

    # 버튼 A가 눌린 횟수 가져오기
    a_presses = button_a.get_presses()

    # 버튼 B가 눌린 횟수 가져오기
    b_presses = button_b.get_presses()

    # 카운트 표시
    if a_presses > 0:
        print(f"버튼 A가 {a_presses}번 눌렸습니다")

    if b_presses > 0:
        print(f"버튼 B가 {b_presses}번 눌렸습니다")
```

## 누적 버튼 눌림 횟수 추적

`get_press_count()` 메서드는 누적된 총 버튼 눌림 횟수를 반환하되 카운터를 리셋하지 않습니다.

```python
from codibit import *
import time

print("버튼을 눌러보세요. 실시간으로 누적 횟수가 표시됩니다...")

while True:
    # 누적된 버튼 A 눌림 횟수
    total_a = button_a.get_press_count()

    # 누적된 버튼 B 눌림 횟수
    total_b = button_b.get_press_count()

    # 실시간 표시
    print(f"\r총 누름 횟수 - A: {total_a}, B: {total_b}", end="")

    time.sleep(0.1)
```

## get_presses() vs get_press_count() 비교

두 메서드의 차이점을 이해하는 것이 중요합니다:

```python
from codibit import *
import time

print("버튼을 여러 번 눌러보세요...")
time.sleep(3)

# 첫 번째 확인
presses_a = button_a.get_presses()  # 카운터 리셋됨
count_a = button_a.get_press_count()  # 카운터 리셋되지 않음

print(f"get_presses(): {presses_a} (리셋됨)")
print(f"get_press_count(): {count_a} (누적)")

time.sleep(2)

# 두 번째 확인
presses_a2 = button_a.get_presses()  # 0 (이미 리셋됨)
count_a2 = button_a.get_press_count()  # 여전히 누적값

print(f"get_presses(): {presses_a2} (여전히 0)")
print(f"get_press_count(): {count_a2} (누적 유지)")
```

## 고급 버튼 패턴

### 상태 기반 버튼 처리

더 복잡한 상호작용을 위해 버튼 상태를 추적합니다:

```python
from codibit import *
import time

button_a_pressed = False
counter = 0

print("버튼 A: 증가, 버튼 B: 감소")
print(f"카운터: {counter}")

while True:
    # 버튼 A 눌림 감지
    if button_a.is_pressed():
        button_a_pressed = True
        counter += 1
        print(f"카운터: {counter}")

    # 버튼 A 떼어짐 감지
    if button_a.is_released():
        button_a_pressed = False
        print("버튼 A가 떼어졌습니다")

    # 버튼 B 눌림 감지
    if button_b.is_pressed():
        counter -= 1
        print(f"카운터: {counter}")

    # 버튼 B 떼어짐 감지
    if button_b.is_released():
        print("버튼 B가 떼어졌습니다")

    time.sleep(0.01)
```

### 동시 버튼 감지

여러 버튼이 동시에 눌렸을 때를 감지합니다:

```python
from codibit import *
import time

print("버튼 A와 B를 동시에 눌러주세요...")

while True:
    # 두 버튼이 동시에 눌려있는지 확인
    if button_a.is_holding() and button_b.is_holding():
        print("두 버튼이 모두 눌려있습니다!")

    # 개별 버튼 눌림 감지
    if button_a.is_pressed():
        print("버튼 A가 눌렸습니다")

    if button_b.is_pressed():
        print("버튼 B가 눌렸습니다")

    # 개별 버튼 떼어짐 감지
    if button_a.is_released():
        print("버튼 A가 떼어졌습니다")

    if button_b.is_released():
        print("버튼 B가 떼어졌습니다")

    time.sleep(0.01)
```

## 간단한 메뉴 시스템

버튼을 사용한 기본 메뉴 시스템을 만들어봅시다.

```python
from codibit import *
import time

menu_items = ["게임 시작", "설정", "종료"]
current_item = 0

def show_menu():
    print(f"메뉴: {menu_items[current_item]}")
    print("A: 선택, B: 다음")

# 초기 메뉴 표시
show_menu()

while True:
    # 메뉴 선택
    if button_a.is_pressed():
        print(f"선택됨: {menu_items[current_item]}")
        time.sleep(1)
        show_menu()

    # 메뉴 탐색
    if button_b.is_pressed():
        current_item = (current_item + 1) % len(menu_items)
        show_menu()

    time.sleep(0.01)
```

## 팁과 모범 사례

### 1. 적절한 메서드 선택

- **`is_pressed()`**: 버튼이 눌리는 순간 감지 (한 번의 이벤트)
- **`is_holding()`**: 버튼이 계속 눌린 상태 감지
- **`is_released()`**: 버튼이 떼어지는 순간 감지 (한 번의 이벤트)
- **`get_presses()`**: 주기적 카운팅 (카운터 리셋)
- **`get_press_count()`**: 실시간 누적 카운팅 (카운터 유지)

### 2. 성능 최적화

루프에 항상 작은 지연을 포함하세요:
```python
time.sleep(0.01)  # 10ms - 대부분의 경우 권장
time.sleep(0.05)  # 50ms - 안정성 중심 애플리케이션용
```

### 3. 버튼 상태 흐름

일반적인 버튼 상호작용 흐름:
1. `is_pressed()` - 버튼이 눌림
2. `is_holding()` - 버튼이 계속 눌려있음 (연속)
3. `is_released()` - 버튼이 떼어짐

### 4. 디바운싱

버튼은 50ms 지연으로 자동 디바운싱 처리됩니다. 조정 가능합니다:
```python
button_a = Button(BUTTON_A_PIN, debounce_ms=30)  # 더 빠른 반응
button_b = Button(BUTTON_B_PIN, debounce_ms=100)  # 더 안정적
```

### 5. 이벤트 처리 모범 사례

```python
# ✅ 좋은 예: 모든 상태를 순서대로 확인
if button_a.is_pressed():
    print("눌렸습니다!")

if button_a.is_holding():
    print("눌린 중...")

if button_a.is_released():
    print("떼어졌습니다!")

# ❌ 피해야 할 예: 상태 확인 누락
if button_a.is_holding():  # is_pressed()를 먼저 확인해야 함
    print("눌린 중...")
```

### 6. 카운터 관리

- **`get_presses()`**: 카운터 리셋, 주기적 카운팅에 적합
- **`get_press_count()`**: 카운터 유지, 누적 통계에 적합

### 7. 메모리 효율성

MicroPython 환경에서는 반응성과 CPU 사용량의 균형을 위해 적절한 sleep 간격을 사용하세요.