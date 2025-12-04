---
sidebar_position: 12
---

# 시리얼 통신 사용하기

이 가이드는 Codi:bit 보드의 내장 시리얼 통신을 사용하여 외부 클라이언트(웹앱, 시리얼 터미널 등)와 통신하는 방법을 보여줍니다.

## 사전 요구사항

- Python 기본 이해
- Codi:bit 보드
- MicroPython 환경 설정
- 시리얼 클라이언트 (웹앱, 시리얼 터미널 등)

## 기본 사용법

Serial 클래스는 데이터 읽기와 쓰기를 위한 간단한 메서드를 제공합니다:

```python
from codibit import serial

# 데이터 전송
serial.write("Hello")
serial.write_line("World")

# 데이터 수신 (비차단)
data = serial.read()
if data:
    print(f"수신: {data}")
```

## 읽기 패턴

### 비차단 읽기

모든 읽기 작업은 비차단입니다. 즉, 데이터가 없어도 즉시 반환됩니다. 이를 통해 데이터를 기다리는 동안 다른 작업을 수행할 수 있습니다:

```python
from codibit import serial

while True:
    # 들어오는 데이터 확인
    data = serial.read()
    if data:
        print(f"수신: {data}")
        serial.write(f"Echo: {data}")

    # 여기서 다른 작업 수행 가능
    # 예: 센서 확인, 디스플레이 업데이트 등
    sleep(0.01)
```

### 라인 기반 통신

라인 기반 프로토콜의 경우 `read_line()`과 `write_line()`을 사용하세요:

```python
from codibit import serial

while True:
    # 완전한 라인 읽기 (\n까지)
    line = serial.read_line()
    if line:
        print(f"수신 라인: {line}")
        # 줄바꿈과 함께 응답 전송
        serial.write_line(f"Echo: {line}")

    sleep(0.01)
```

## 실전 예제

### Echo 서버

수신한 메시지에 응답하는 간단한 echo 서버:

```python
from codibit import serial

print("Echo 서버 시작")

while True:
    line = serial.read_line()
    if line:
        print(f"수신: {line}")
        serial.write_line(f"Echo: {line}")

    sleep(0.01)
```

### 명령 처리

클라이언트에서 보낸 명령을 처리합니다:

```python
from codibit import serial

print("명령 처리기 시작")

while True:
    line = serial.read_line()
    if line:
        # 명령 처리
        if line == "LED_ON":
            rgb_led.set_all_color(255, 0, 0)
            rgb_led.show()
            serial.write_line("LED 켜짐")

        elif line == "LED_OFF":
            rgb_led.turn_off_all()
            serial.write_line("LED 꺼짐")

        elif line.startswith("TEMP"):
            temp = get_board_temperature()
            serial.write_line(f"온도: {temp}°C")

        else:
            serial.write_line(f"알 수 없는 명령: {line}")

    sleep(0.01)
```

## 일반적인 패턴

### 요청-응답 패턴

```python
from codibit import serial

while True:
    line = serial.read_line()
    if line:
        # 요청 처리
        response = process_request(line)
        # 응답 전송
        serial.write_line(response)

    sleep(0.01)
```

### 다중 작업 통합

시리얼 통신을 다른 보드 기능과 통합합니다:

```python
from codibit import serial

while True:
    # 시리얼 통신 처리
    line = serial.read_line()
    if line:
        handle_command(line)

    # 디스플레이 업데이트
    display.clear()
    display.draw_text("실행 중", 0, 0)
    display.show()

    # 센서 확인
    if button_a.is_pressed():
        serial.write_line("버튼 A 눌림")

    sleep(0.01)
```

## 모범 사례

### 1. 항상 지연 포함

루프에 작은 지연을 포함하여 최적의 성능을 보장하세요:

```python
# ✅ 권장
while True:
    data = serial.read()
    if data:
        process_data(data)
    sleep(0.01)  # 10ms 지연

# ❌ 피해야 할 예: 지연 없이는 성능 문제 발생 가능
while True:
    data = serial.read()
    if data:
        process_data(data)
```

### 2. 빈 문자열 확인

처리하기 전에 항상 데이터가 비어있지 않은지 확인하세요:

```python
# ✅ 좋은 예
data = serial.read()
if data:  # 비어있지 않은지 확인
    process_data(data)

# ❌ 피해야 할 예: 빈 문자열 처리
data = serial.read()
process_data(data)  # 빈 문자열을 처리할 수 있음
```

### 3. 적절한 읽기 메서드 선택

프로토콜에 따라 적절한 메서드를 선택하세요:

- **`read()`**: 원시 데이터 또는 사용 가능한 모든 데이터를 즉시 필요할 때
- **`read_line()`**: 텍스트 기반 프로토콜 또는 명령 처리 시

### 4. 조용한 에러 처리

Serial 클래스는 빈 문자열 또는 0을 반환하여 에러를 조용히 처리합니다:

```python
data = serial.read()
if data:  # 빈 문자열은 데이터 없음 또는 에러를 나타냄
    process_data(data)

bytes_sent = serial.write("test")
if bytes_sent > 0:  # 0은 에러를 나타냄
    print("데이터 전송 성공")
```

### 5. 데이터 즉시 처리

MicroPython 메모리 효율성을 위해 데이터를 받으면 즉시 처리하세요:

```python
while True:
    line = serial.read_line()
    if line:
        # 즉시 처리, 축적하지 않음
        process_line(line)

    sleep(0.01)
```

## 연결 처리

Serial 클래스는 2-way handshake 프로토콜을 사용하여 연결 수립을 자동으로 처리합니다. 명시적인 연결 코드가 필요하지 않습니다. 프로토콜에 대한 자세한 내용은 [시리얼 통신 프로토콜](../explanation/serial-protocol-ko.md)을 참고하세요.

```python
from codibit import serial

# 클라이언트가 연결되면 자동으로 연결 수립됨
# 읽기/쓰기만 시작하면 됨
while True:
    line = serial.read_line()
    if line:
        serial.write_line(f"수신: {line}")

    sleep(0.01)
```

## 문제 해결

### 데이터 수신 안 됨

- 클라이언트가 연결되어 있는지 확인
- 보드레이트 확인 (115200)
- 클라이언트가 데이터를 보내는지 확인
- 제어 문자가 올바르게 필터링되는지 확인

### 불완전한 라인

- `read_line()`은 완전한 라인이 받을 때까지 빈 문자열을 반환합니다
- 이것은 정상적인 동작입니다 - 줄바꿈 문자를 기다리세요

### 연결 문제

- 연결은 자동으로 수립됩니다
- 명시적인 연결 코드가 필요하지 않습니다
- 문제가 지속되면 보드와 클라이언트를 모두 재시작하세요

### 성능 문제

- 루프에 항상 지연을 포함하세요 (`sleep(0.01)`)
- 빈 문자열 처리 피하기
- 데이터를 받으면 즉시 처리하기
