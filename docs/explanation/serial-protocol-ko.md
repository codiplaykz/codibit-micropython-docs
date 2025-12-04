---
sidebar_position: 1
---

# 시리얼 통신 프로토콜

이 문서는 Codi:bit 보드의 ESP32 MicroPython용 Serial 통신 인터페이스의 설계 및 구현 상세를 설명합니다.

## 개요

Serial 클래스는 ESP32 MicroPython에서 microbit과 유사한 시리얼 통신 인터페이스를 제공합니다. `sys.stdin`과 `sys.stdout`을 사용하여 클라이언트(웹앱, 시리얼 터미널 등)와 사용자 코드 간 통신을 가능하게 합니다. 구현은 2-way handshake 프로토콜을 사용하여 클라이언트와의 연결을 자동으로 수립합니다.

## 설계 제약사항

설계는 다음 제약사항을 기반으로 합니다:

- **하드웨어 UART 분리 불가능**: UART0만 사용 가능하며, REPL에 사용됨
- **stdin/stdout을 통한 통신만 가능**: 통신을 위해 `sys.stdin`과 `sys.stdout`을 사용해야 함
- **데이터는 일반 문자열로만 주고받음**: 바이너리 프로토콜이나 복잡한 데이터 구조 없음
- **이벤트 기반 인터페이스 불필요**: 간단한 읽기/쓰기 작업으로 충분함
- **비동기 연결 수립**: 어느 쪽이 먼저 시작되어도 동작

## 프로토콜 설계

### 동작 원리

프로토콜은 다음과 같이 동작합니다:

```
[클라이언트]                    [보드]                    [사용자 코드]
     │                            │                            │
     │─── ENQ (0x05) ────────────>│  연결 요청 (주기적)        │
     │                            │  (보드가 준비되면)         │
     │<── ACK (0x06) ─────────────│  준비 완료 응답            │
     │                            │                            │
     │─── "Hello" ───────────────>│                            │
     │                            │─── sys.stdin ─────────────>│
     │                            │                            │
     │                            │<── sys.stdout ─────────────│
     │<── "World" ────────────────│                            │
```

### 2-way Handshake 프로토콜

**프로토콜 흐름:**
```
클라이언트 → 보드: 0x05 (ENQ) - 연결 요청 (주기적)
보드 → 클라이언트: 0x06 (ACK) - 준비 완료 응답
```

**동작:**
- 클라이언트가 연결되면 주기적으로 ENQ(0x05) 전송
- 보드가 준비되면 ENQ를 받고 ACK(0x06) 응답
- 클라이언트가 ACK를 받으면 데이터 전송 시작
- 연결 수립 후 추가 heartbeat 없이 통신

**제어 문자 선택 이유:**
- `ENQ (0x05)`: "연결 요청" 또는 "준비되었나요?"를 의미하는 표준 제어 문자
- `ACK (0x06)`: "확인/준비됨"을 의미하는 표준 제어 문자
- 사용자 데이터와 완전히 분리됨 (일반 텍스트에 포함되지 않음)
- 단일 바이트로 효율적

### 왜 2-way Handshake인가?

TCP의 3-way handshake와 달리 시리얼 통신에서는 2-way handshake로 충분합니다:

1. **단방향 통신이 아님**: 시리얼 통신은 양방향이므로 추가 확인 단계가 불필요
2. **연결 수립 완료**: 보드가 ACK를 보내면 연결 수립이 완료됨
3. **데이터 전송으로 대체**: 클라이언트가 데이터를 보내는 것으로 "3번째" 단계를 대체
4. **간단하고 효율적**: 불필요한 단계를 제거하여 리소스 효율적

### 비동기 연결 수립 처리

**시나리오 1: 클라이언트가 먼저 실행**
- 클라이언트가 연결되면 주기적으로 ENQ 전송
- 보드가 부팅 중이면 ENQ는 UART 버퍼에 쌓임
- 보드가 준비되면 ENQ를 읽고 ACK 응답
- 클라이언트가 ACK를 받으면 데이터 전송 시작

**시나리오 2: 보드가 먼저 실행**
- 보드는 일반적인 read/write 동작 수행
- 클라이언트가 연결되면 ENQ 전송
- 보드가 ENQ를 받고 ACK 응답
- 클라이언트가 ACK를 받으면 데이터 전송 시작

**핵심**: 어느 쪽이 먼저 실행되어도 정상 동작하며, 클라이언트가 주도하여 연결을 수립합니다.

## 구현 상세

### 내부 동작

**초기화:**
- 라인 버퍼링을 위한 `_input_buffer` 초기화
- 연결 상태는 자동으로 처리됨

**읽기 동작:**
- `read()`: `select.select()`로 `sys.stdin` 확인, 비차단 읽기
  - ENQ(0x05) 감지 시 내부적으로 ACK(0x06) 응답 전송
  - ENQ 문자는 사용자에게 노출하지 않음 (필터링)
- `read_line()`: `_input_buffer`에 데이터 축적, 줄바꿈까지 대기
  - ENQ 문자 필터링
  - 줄바꿈을 받으면 완전한 라인 반환

**쓰기 동작:**
- `write()`: `sys.stdout`으로 직접 전송, `flush()` 호출로 즉시 전송 보장
- `write_line()`: `write()`에 `\n` 추가

**연결 수립:**
- `read()` 또는 `read_line()`에서 ENQ 감지 시 자동으로 ACK 응답
- 사용자 코드에서 명시적 호출 불필요

### 제어 문자 처리

**보드 측:**
- ENQ 수신 시 내부적으로 ACK 응답 전송
- ENQ/ACK 문자는 사용자 데이터에서 필터링하여 노출하지 않음
- 사용자 데이터는 그대로 전송

**클라이언트 측:**
- ENQ 전송 (연결 수립용)
- ACK 수신 (연결 확인)
- 수신 데이터에서 ENQ/ACK 필터링하여 사용자 데이터만 처리

### 에러 처리

- 예외 발생 시 빈 문자열 또는 0 반환
- 타입 변환 실패 시 기본값 반환
- 연결 수립 실패 시 조용히 처리 (사용자에게 노출하지 않음)

### 버퍼 및 메모리

- `_input_buffer`: 문자열로 관리 (동적 크기)
- 메모리 제한 고려 (ESP32 제약)
- 버퍼 오버플로우 시 경고 또는 자동 처리
- UART 버퍼는 충분히 크므로 (128-256 bytes) 일반적인 사용에서는 문제 없음

### 리소스 효율성

- **클라이언트 주도**: 클라이언트가 연결 요청을 주도하므로 보드 리소스 절약
- **연결 수립만**: 연결 수립 후 추가 heartbeat 없이 통신
- **자동 처리**: 사용자 코드에서 명시적 호출 불필요

## 클라이언트 구현

### 웹앱 (JavaScript)

Web Serial API를 사용하여 클라이언트를 구현하는 완전한 예제:

```javascript
// 1. 시리얼 포트 연결
const port = await navigator.serial.requestPort();
await port.open({ baudRate: 115200 });

// 2. 연결 수립 (2-way handshake)
const writer = port.writable.getWriter();
const reader = port.readable.getReader();
let connected = false;

// 연결 요청 전송 (주기적)
const connectInterval = setInterval(async () => {
  if (!connected) {
    await writer.write(new Uint8Array([0x05])); // ENQ
  }
}, 500); // 0.5초마다

// 연결 확인 대기
while (!connected) {
  const { value } = await reader.read();
  const bytes = new Uint8Array(value);
  for (let i = 0; i < bytes.length; i++) {
    if (bytes[i] === 0x06) {  // ACK 수신
      connected = true;
      clearInterval(connectInterval);
      break;
    }
  }
}

// 3. 데이터 송수신 시작
console.log("Connected!");
const decoder = new TextDecoder();
while (true) {
  const { value } = await reader.read();
  const bytes = new Uint8Array(value);

  // ENQ/ACK 필터링 (연결 수립 후에도 남아있을 수 있음)
  const userData = [];
  for (let i = 0; i < bytes.length; i++) {
    if (bytes[i] !== 0x05 && bytes[i] !== 0x06) {
      userData.push(bytes[i]);
    }
  }

  if (userData.length > 0) {
    const text = decoder.decode(new Uint8Array(userData));
    handleUserData(text);
  }
}
```

### Python 클라이언트 (pyserial)

```python
import serial
import time

# 시리얼 포트 열기
ser = serial.Serial('/dev/ttyUSB0', 115200, timeout=1)
connected = False

# 연결 요청 전송 (주기적)
while not connected:
    ser.write(bytes([0x05]))  # ENQ
    time.sleep(0.5)

    # ACK 확인
    if ser.in_waiting > 0:
        data = ser.read(ser.in_waiting)
        if 0x06 in data:  # ACK 수신
            connected = True
            print("Connected!")

# 데이터 송수신 시작
while True:
    # 데이터 전송
    ser.write(b"Hello\n")

    # 데이터 읽기 (ENQ/ACK 필터링)
    if ser.in_waiting > 0:
        data = ser.read(ser.in_waiting)
        # 제어 문자 필터링
        user_data = bytes([b for b in data if b not in [0x05, 0x06]])
        if user_data:
            print(f"Received: {user_data.decode('utf-8')}")

    time.sleep(0.1)
```

## 설계 결정

### 왜 REPL stdin/stdout인가?

- **단일 UART**: ESP32는 제한된 UART 리소스를 가지며, UART0는 REPL에 사용됨
- **단순성**: 별도의 하드웨어 UART 설정 불필요
- **호환성**: 표준 시리얼 터미널 및 도구와 작동
- **유연성**: 디버깅을 위해 REPL과 함께 사용 가능

### 왜 2-way Handshake인가?

- **효율성**: 연결 수립을 위한 최소 오버헤드
- **단순성**: 클라이언트와 보드 양쪽에서 구현이 쉬움
- **신뢰성**: 시리얼 통신 요구사항에 충분함
- **리소스 친화적**: 지속적인 heartbeat 불필요

### 왜 제어 문자를 필터링하는가?

- **투명성**: 사용자 코드가 프로토콜 세부사항을 처리할 필요 없음
- **단순성**: 프로토콜 복잡성 없는 깔끔한 API
- **호환성**: 일반 텍스트를 기대하는 기존 코드와 작동
- **오류 방지**: 제어 문자의 실수 처리 방지

### 왜 비차단 읽기인가?

- **반응성**: 데이터를 기다리는 동안 보드가 다른 작업 수행 가능
- **실시간**: 센서와 디스플레이를 지속적으로 업데이트 가능
- **효율성**: 데이터를 기다리며 낭비되는 CPU 사이클 없음
- **유연성**: 다양한 애플리케이션 패턴 지원

## 제한사항

1. **단일 연결**: 한 번에 하나의 클라이언트만 연결 가능
2. **일반 텍스트만**: 바이너리 프로토콜은 인코딩/디코딩 필요
3. **흐름 제어 없음**: 흐름 제어를 위해 UART 버퍼에 의존
4. **REPL 간섭**: REPL 입력이 시리얼 데이터와 간섭할 수 있음 (주의해서 사용)

## 모범 사례

1. **항상 반환값 확인**: 빈 문자열은 데이터가 없음을 나타냄
2. **지연 포함**: 루프에 작은 지연이 성능을 향상시킴
3. **제어 문자 필터링**: 클라이언트는 사용자 데이터에서 ENQ/ACK를 필터링해야 함
4. **에러 우아하게 처리**: 반환값을 확인하고 에러를 적절히 처리
5. **적절한 메서드 사용**: 프로토콜 요구사항에 따라 `read()` 또는 `read_line()` 선택
