# How to use display(디스플레이 사용하기)

이 가이드는 새로운 버퍼 기반 API를 사용하여 Codi:bit 디스플레이를 사용하는 방법을 설명합니다.

## 개요

Codi:bit 디스플레이는 그리기 명령을 내부 버퍼에 저장한 후 `show()` 함수로 화면에 출력하는 버퍼 기반 방식을 사용합니다. 이 방식은 더 나은 성능과 디스플레이에 대한 더 많은 제어를 제공합니다.

## 기본 사용 패턴

```python
from codibit import display

# 1. 화면 지우기
display.clear()

# 2. 그리기 작업 수행
display.draw_text("Hello", 0, 0)
display.draw_circle(32, 32, 10)

# 3. 화면에 출력
display.show()
```

## 텍스트 그리기

### 기본 텍스트 그리기

```python
# 위치 (0, 0)에 텍스트 그리기
display.draw_text("Hello", 0, 0)
display.show()
```

### 여러 줄

```python
display.draw_text("첫 번째 줄", 0, 0)
display.draw_text("두 번째 줄", 0, 10)
display.draw_text("세 번째 줄", 0, 20)
display.show()
```

### 텍스트 위치 조정

```python
# 텍스트를 수평 중앙에 배치
text = "Hello"
x = (128 - len(text) * 6) // 2  # 대략적인 문자 너비
display.draw_text(text, x, 0)
display.show()
```

## 도형 그리기

### 사각형

```python
# 빈 사각형
display.draw_rectangle(10, 10, 20, 15)

# 채워진 사각형
display.draw_rectangle(40, 10, 20, 15, fill=True)
display.show()
```

### 원

```python
# 빈 원
display.draw_circle(32, 32, 10)

# 채워진 원
display.draw_circle(64, 32, 8, fill=True)
display.show()
```

### 선

```python
# 십자가 그리기
display.draw_line(0, 0, 50, 50)
display.draw_line(0, 50, 50, 0)
display.show()
```

### 삼각형

```python
# 빈 삼각형
display.draw_triangle(10, 10, 20, 40, 40, 40)

# 채워진 삼각형
display.draw_triangle(50, 10, 60, 40, 80, 40, fill=True)
display.show()
```

## 이미지 작업

### 내장 아이콘

```python
from codibit import Image, ICONS

# Image 객체를 사용한 내장 아이콘 그리기
display.draw_image(Image.HEART, 0, 0)
display.draw_image(Image.HAPPY, 20, 0)
display.draw_image(Image.SAD, 40, 0)
display.show()

# ICONS 상수를 사용한 내장 아이콘 그리기 (권장)
display.draw_icon(ICONS.HEART, 0, 0)
display.draw_icon(ICONS.HAPPY, 20, 0)
display.draw_icon(ICONS.SAD, 40, 0)
display.show()
```

### 아이콘 스케일링

```python
# ICONS 상수를 사용한 다양한 스케일로 아이콘 그리기
display.draw_icon(ICONS.HEART, 0, 0, scale=1)    # 5x5
display.draw_icon(ICONS.HAPPY, 20, 0, scale=2)   # 10x10
display.draw_icon(ICONS.SAD, 50, 0, scale=3)     # 15x15
display.show()
```

### 사용자 정의 이미지

```python
# 문자열에서 사용자 정의 이미지 생성
custom = Image('90009:09090:00900:09090:90009:')
display.draw_image(custom, 0, 20)
display.show()
```

## 픽셀 단위 제어

### 개별 픽셀 설정

```python
# 간단한 패턴 그리기
for i in range(0, 128, 2):
    display.set_pixel(i, 32, 1)
display.show()
```

### 픽셀 상태 읽기

```python
# 픽셀이 켜져 있는지 확인
if display.get_pixel(10, 20):
    print("픽셀이 켜져 있습니다")
else:
    print("픽셀이 꺼져 있습니다")
```

## 성능 최적화

### 배치 그리기 작업

```python
# 효율적: 여러 작업, 단일 show()
display.clear()
display.draw_text("Hello", 0, 0)
display.draw_circle(32, 32, 10)
display.draw_rectangle(10, 10, 20, 15)
display.show()  # 단일 출력 작업
```

### 성능을 위한 버퍼 제어

```python
# 성능 최적화: clear_buffer() + 여러 작업
display.clear_buffer()  # 버퍼만 지우기, 출력 없음
display.draw_text("Hello", 0, 0)
display.draw_circle(32, 32, 10)
display.draw_rectangle(10, 10, 20, 15)
display.show()  # 단일 출력 작업

# 즉시 피드백: 간단한 작업에는 clear()
display.clear()  # 지우고 즉시 출력
display.draw_text("상태", 0, 0)
display.show()
```

### 빈번한 업데이트 피하기

```python
# 비효율적: 여러 show() 호출
display.draw_text("Hello", 0, 0)
display.show()  # 이렇게 하지 마세요
display.draw_circle(32, 32, 10)
display.show()  # 이렇게 하지 마세요

# 효율적: 단일 show() 호출
display.draw_text("Hello", 0, 0)
display.draw_circle(32, 32, 10)
display.show()  # 이렇게 하세요
```

## 일반적인 패턴

### 상태 표시

```python
def show_status(message, value):
    display.clear()
    display.draw_text(message, 0, 0)
    display.draw_text(str(value), 0, 20)
    display.show()

# 사용법
show_status("온도:", "25C")
```

### 진행률 표시줄

```python
def draw_progress_bar(progress, x=10, y=30, width=100, height=10):
    # 배경
    display.draw_rectangle(x, y, width, height, fill=True)
    # 진행률
    progress_width = int(width * progress / 100)
    display.draw_rectangle(x, y, progress_width, height, fill=True)
    display.show()

# 사용법
draw_progress_bar(75)  # 75% 진행률
```

### 메뉴 표시

```python
def show_menu(items, selected_index):
    display.clear()
    y = 0
    for i, item in enumerate(items):
        if i == selected_index:
            display.draw_text(f"> {item}", 0, y)
        else:
            display.draw_text(f"  {item}", 0, y)
        y += 10
    display.show()

# 사용법
menu_items = ["옵션 1", "옵션 2", "옵션 3"]
show_menu(menu_items, 1)  # 두 번째 옵션 강조
```

## 애니메이션

### 간단한 애니메이션

```python
import time

# 움직이는 원 애니메이션
for x in range(0, 128, 5):
    display.clear()
    display.draw_circle(x, 32, 5)
    display.show()
    time.sleep(0.1)
```

### 깜빡이는 텍스트

```python
import time

# 깜빡이는 텍스트
for _ in range(5):
    display.clear()
    display.draw_text("Hello", 0, 0)
    display.show()
    time.sleep(0.5)

    display.clear()
    display.show()
    time.sleep(0.5)
```

## 에러 처리

### 안전한 그리기

```python
def safe_draw_text(text, x, y):
    try:
        display.draw_text(text, x, y)
        return True
    except:
        return False

# 사용법
if safe_draw_text("Hello", 0, 0):
    display.show()
else:
    print("텍스트 그리기 실패")
```

## 팁과 모범 사례

1. **항상 `show()` 호출**: 그리기 작업 후에는 항상 `show()`를 호출하여 내용을 표시하세요
2. **그리기 전 지우기**: 깨끗한 화면으로 시작하려면 `clear()`를 사용하세요
3. **배치 작업**: 여러 그리기 작업을 그룹화한 후 `show()`를 호출하세요
4. **좌표 확인**: 좌표가 디스플레이 경계 내에 있는지 확인하세요 (x: 0-127, y: 0-63)
5. **내장 아이콘 사용**: 타입 안전성과 IDE 지원을 위해 ICONS 상수를 사용하여 64개의 내장 아이콘을 활용하세요
6. **성능 고려**: 더 나은 성능을 위해 `show()` 호출 횟수를 최소화하세요
7. **가시성 테스트**: 텍스트와 그래픽이 배경에 대해 잘 보이는지 확인하세요
8. **지우기 방법 선택**: 여러 작업의 성능 최적화에는 `clear_buffer()`, 즉시 피드백에는 `clear()`를 사용하세요

## 하드웨어 제한사항

- **해상도**: 128x64 픽셀
- **색상**: 단색 (흰색/검은색만)
- **픽셀 값**: 0(꺼짐) 또는 1(켜짐)만 지원
- **메모리**: 제한된 버퍼 공간, 매우 큰 이미지 피하기
- **새로고침 속도**: 애니메이션의 경우 디스플레이의 새로고침 기능 고려