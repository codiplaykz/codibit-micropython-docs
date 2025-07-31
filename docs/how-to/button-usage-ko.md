# How to Use Buttons(버튼 사용법)

이 가이드는 Codi:bit 보드의 내장 버튼을 사용하여 사용자 입력을 감지하는 방법을 보여줍니다.

## 사전 요구사항

- Python 기본 지식
- Codi:bit 보드
- MicroPython 환경 설정 완료

## 기본 버튼 눌림 감지

버튼 눌림을 감지하는 가장 간단한 방법은 `is_pressed()` 메서드를 사용하는 것입니다.

```python
from codibit import *

while True:
    # 버튼 A가 현재 눌려있는지 확인
    if button_a.is_pressed():
        print("버튼 A가 눌려있습니다!")

    # 버튼 B가 현재 눌려있는지 확인
    if button_b.is_pressed():
        print("버튼 B가 눌려있습니다!")

    # 너무 빈번한 확인을 피하기 위한 작은 지연
    sleep(0.1)
```

## 버튼 눌림 이벤트 감지

`was_pressed()`를 사용하여 버튼이 눌렸다가 뗀 이벤트를 감지합니다.

```python
from codibit import *

print("버튼 A 또는 B를 눌러주세요...")

while True:
    # 마지막 확인 이후 버튼 A가 눌렸는지 확인
    if button_a.was_pressed():
        print("버튼 A가 눌렸습니다!")

    # 마지막 확인 이후 버튼 B가 눌렸는지 확인
    if button_b.was_pressed():
        print("버튼 B가 눌렸습니다!")

    # 작은 지연
    sleep(0.1)
```

## 버튼 눌림 횟수 세기

`get_presses()` 메서드는 총 버튼 눌림 횟수를 반환하고 카운터를 리셋합니다.

```python
from codibit import *

print("버튼을 여러 번 누른 후 5초간 기다리면 카운트가 표시됩니다...")

while True:
    # 5초 대기
    sleep(5)

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

print("버튼을 눌러보세요. 실시간으로 누적 횟수가 표시됩니다...")

while True:
    # 누적된 버튼 A 눌림 횟수
    total_a = button_a.get_press_count()

    # 누적된 버튼 B 눌림 횟수
    total_b = button_b.get_press_count()

    # 실시간 표시
    print(f"\r총 누름 횟수 - A: {total_a}, B: {total_b}", end="")

    sleep(0.1)
```

## get_presses() vs get_press_count() 비교

두 메서드의 차이점을 이해하는 것이 중요합니다:

```python
from codibit import *

print("버튼을 여러 번 눌러보세요...")
sleep(3)

# 첫 번째 확인
presses_a = button_a.get_presses()  # 카운터 리셋됨
count_a = button_a.get_press_count()  # 카운터 리셋되지 않음

print(f"get_presses(): {presses_a} (리셋됨)")
print(f"get_press_count(): {count_a} (누적)")

sleep(2)

# 두 번째 확인
presses_a2 = button_a.get_presses()  # 0 (이미 리셋됨)
count_a2 = button_a.get_press_count()  # 여전히 누적값

print(f"get_presses(): {presses_a2} (여전히 0)")
print(f"get_press_count(): {count_a2} (누적 유지)")
```

## 각 버튼에 다른 동작 설정

각 버튼에 서로 다른 동작을 만들 수 있습니다.

```python
from codibit import *

counter = 0
print("버튼 A: 증가, 버튼 B: 감소")
print(f"카운터: {counter}")

while True:
    if button_a.was_pressed():
        counter += 1
        print(f"카운터: {counter}")

    if button_b.was_pressed():
        counter -= 1
        print(f"카운터: {counter}")

    sleep(0.1)
```

## 버튼 상태 조합

여러 버튼을 동시에 확인할 수 있습니다.

```python
from codibit import *

print("버튼 A와 B를 동시에 눌러주세요...")

while True:
    # 두 버튼이 동시에 눌렸는지 확인
    if button_a.is_pressed() and button_b.is_pressed():
        print("두 버튼이 모두 눌려있습니다!")

    # 어느 한 버튼이라도 눌렸는지 확인
    elif button_a.was_pressed() or button_b.was_pressed():
        if button_a.was_pressed():
            print("버튼 A만 눌렸습니다")
        if button_b.was_pressed():
            print("버튼 B만 눌렸습니다")

    sleep(0.1)
```

## 간단한 메뉴 시스템

버튼을 사용한 기본 메뉴 시스템을 만들어봅시다.

```python
from codibit import *

menu_items = ["게임 시작", "설정", "종료"]
current_item = 0

def show_menu():
    print(f"메뉴: {menu_items[current_item]}")
    print("A: 선택, B: 다음")

# 초기 메뉴 표시
show_menu()

while True:
    if button_a.was_pressed():
        # 현재 메뉴 항목 선택
        print(f"선택됨: {menu_items[current_item]}")
        sleep(1)
        show_menu()

    if button_b.was_pressed():
        # 다음 메뉴 항목으로 이동
        current_item = (current_item + 1) % len(menu_items)
        show_menu()

    sleep(0.1)
```

## 팁과 모범 사례

### 1. 적절한 메서드 선택

- `is_pressed()`: 연속적인 동작용 (예: 버튼을 계속 누르고 있을 때)
- `was_pressed()`: 단일 이벤트용 (예: 메뉴 선택)
- `get_presses()`: 주기적인 카운팅용 (예: 5초마다 누름 횟수 확인)
- `get_press_count()`: 실시간 누적 카운팅용 (예: 총 누름 횟수 추적)

### 2. 지연 추가

출력이 너무 많아지는 것을 방지하고 적절한 버튼 디바운싱을 위해 루프에 항상 작은 지연을 포함하세요.

### 3. 버튼 조합

`is_pressed()`는 현재 상태를 확인하고, `was_pressed()`는 마지막 호출 이후의 이벤트를 확인한다는 점을 기억하세요.

### 4. 디바운싱

버튼은 50ms 지연으로 자동 디바운싱 처리되므로 버튼 바운스에 대해 걱정할 필요가 없습니다.

### 5. 카운터 관리

- `get_presses()`: 카운터를 리셋하므로 주기적인 카운팅에 적합
- `get_press_count()`: 카운터를 리셋하지 않으므로 누적 통계에 적합